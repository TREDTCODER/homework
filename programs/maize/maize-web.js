/* Playable browser edition of maize.exe, embedded in HW Shareware. */
(() => {
  "use strict";

  const W = 800, H = 600, TILE = 32, COLS = 31, ROWS = 23;
  const PLAYER_SIZE = 22, ZOMBIE_SIZE = 24;
  const WALK = 145, SPRINT = 255, ZOMBIE_WANDER = 58, ZOMBIE_CHASE = 94;
  const ASSET = "programs/maize/assets/";
  const INTRO = [
    "Microsoft(R) Maze Runtime [Version 1.0.0]",
    "(C) 2026 MAIZE LABS. All rights reserved.", "",
    "Loading voxel terrain driver... OK",
    "Mounting stonebrick texture pack... OK",
    "Synchronizing hostile entity protocol... OK",
    "Generating personal maze seed... READY", "",
    "SYSTEM READY. PRESS ANY KEY TO CONTINUE."
  ];

  const canvas = document.getElementById("maizeCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  const images = {};
  ["stonebrick.png", "BlockSprite_bricks.png", "BlockSprite_oak-leaves.png", "big-zombie-face.png"].forEach((name) => {
    const image = new Image();
    image.src = ASSET + name;
    images[name] = image;
  });

  let state = "intro", introStart = performance.now(), username = "", error = "";
  let maze = [], player, zombies = [], trees = new Set(), keys = new Set();
  let lastTap = { KeyW: -10, KeyA: -10, KeyS: -10, KeyD: -10 }, sprintUntil = 0;
  let paperFound = false, lastFrame = performance.now(), active = false, raf = 0;
  let random = Math.random;

  function hash(text) {
    let result = 2166136261;
    for (let i = 0; i < text.length; i += 1) result = Math.imul(result ^ text.charCodeAt(i), 16777619);
    return result >>> 0;
  }

  function seeded(seed) {
    let value = seed || 1;
    return () => {
      value |= 0; value = value + 0x6D2B79F5 | 0;
      let t = Math.imul(value ^ value >>> 15, 1 | value);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function makeMaze(seed) {
    random = seeded(seed);
    const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(1));
    const stack = [[1, 1]];
    grid[1][1] = 0;
    while (stack.length) {
      const [x, y] = stack[stack.length - 1];
      const choices = [[2, 0], [-2, 0], [0, 2], [0, -2]]
        .map(([dx, dy]) => [x + dx, y + dy, x + dx / 2, y + dy / 2])
        .filter(([nx, ny]) => nx > 0 && ny > 0 && nx < COLS - 1 && ny < ROWS - 1 && grid[ny][nx] === 1);
      if (!choices.length) { stack.pop(); continue; }
      const [nx, ny, wx, wy] = choices[Math.floor(random() * choices.length)];
      grid[wy][wx] = grid[ny][nx] = 0;
      stack.push([nx, ny]);
    }
    return grid;
  }

  function startGame(name) {
    username = name;
    maze = makeMaze(hash(name));
    player = { x: TILE + 5, y: TILE + 5, w: PLAYER_SIZE, h: PLAYER_SIZE, hearts: 10 };
    paperFound = false; zombies = []; trees = new Set();
    const open = [];
    for (let y = 1; y < ROWS - 1; y += 1) for (let x = 1; x < COLS - 1; x += 1) {
      if (maze[y][x] === 0) open.push([x, y]);
      else if (random() < .25) trees.add(`${x},${y}`);
    }
    open.sort(() => random() - .5);
    for (const [x, y] of open) {
      if (zombies.length === 11) break;
      if (Math.abs(x - 1) + Math.abs(y - 1) < 9 || (x === COLS - 2 && y === ROWS - 2)) continue;
      zombies.push({ x: x * TILE + 4, y: y * TILE + 4, w: ZOMBIE_SIZE, h: ZOMBIE_SIZE, dx: 0, dy: 1, change: 0, bite: 0, aggro: false });
    }
    state = "game";
  }

  function wallAt(px, py) {
    const x = Math.floor(px / TILE), y = Math.floor(py / TILE);
    return x < 0 || y < 0 || x >= COLS || y >= ROWS || maze[y][x] === 1;
  }

  function hitsWall(entity) {
    const left = Math.floor(entity.x / TILE), right = Math.floor((entity.x + entity.w - 1) / TILE);
    const top = Math.floor(entity.y / TILE), bottom = Math.floor((entity.y + entity.h - 1) / TILE);
    for (let y = top; y <= bottom; y += 1) for (let x = left; x <= right; x += 1) if (x < 0 || y < 0 || x >= COLS || y >= ROWS || maze[y][x]) return true;
    return false;
  }

  function move(entity, dx, dy) {
    entity.x += dx;
    if (hitsWall(entity)) { const step = dx > 0 ? -1 : 1; while (hitsWall(entity)) entity.x += step; }
    entity.y += dy;
    if (hitsWall(entity)) { const step = dy > 0 ? -1 : 1; while (hitsWall(entity)) entity.y += step; }
  }

  function lineOfSight(zombie) {
    const ox = zombie.x + zombie.w / 2, oy = zombie.y + zombie.h / 2;
    const tx = player.x + player.w / 2, ty = player.y + player.h / 2;
    const dx = tx - ox, dy = ty - oy, distance = Math.hypot(dx, dy);
    if (distance > 235) return false;
    for (let i = 7; i < distance; i += 7) if (wallAt(ox + dx * i / distance, oy + dy * i / distance)) return false;
    return true;
  }

  function intersects(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }

  function update(dt, now) {
    if (paperFound) return;
    let dx = (keys.has("KeyD") ? 1 : 0) - (keys.has("KeyA") ? 1 : 0);
    let dy = (keys.has("KeyS") ? 1 : 0) - (keys.has("KeyW") ? 1 : 0);
    if (dx || dy) {
      const length = Math.hypot(dx, dy); const speed = now < sprintUntil ? SPRINT : WALK;
      move(player, dx / length * speed * dt, dy / length * speed * dt);
    }
    for (const zombie of zombies) {
      zombie.aggro = lineOfSight(zombie);
      let vx = zombie.dx, vy = zombie.dy, speed = ZOMBIE_WANDER;
      if (zombie.aggro) {
        vx = player.x + player.w / 2 - (zombie.x + zombie.w / 2); vy = player.y + player.h / 2 - (zombie.y + zombie.h / 2);
        const length = Math.hypot(vx, vy) || 1; vx /= length; vy /= length; speed = ZOMBIE_CHASE;
      } else if (now > zombie.change) {
        const a = random() * Math.PI * 2; zombie.dx = Math.cos(a); zombie.dy = Math.sin(a); zombie.change = now + .7 + random() * 1.5; vx = zombie.dx; vy = zombie.dy;
      }
      const beforeX = zombie.x, beforeY = zombie.y;
      move(zombie, vx * speed * dt, vy * speed * dt);
      if (!zombie.aggro && beforeX === zombie.x && beforeY === zombie.y) zombie.change = 0;
      zombie.bite = Math.max(0, zombie.bite - dt);
      if (intersects(zombie, player) && zombie.bite === 0) {
        player.hearts = Math.max(0, player.hearts - .25); zombie.bite = .72;
        if (player.hearts <= 0) state = "dead";
      }
    }
    const goal = { x: (COLS - 2) * TILE + 5, y: (ROWS - 2) * TILE + 5, w: TILE - 10, h: TILE - 10 };
    if (intersects(player, goal)) paperFound = true;
  }

  function drawTexture(image, x, y, fallback) {
    if (image.complete && image.naturalWidth) ctx.drawImage(image, x, y, TILE, TILE);
    else { ctx.fillStyle = fallback; ctx.fillRect(x, y, TILE, TILE); }
  }

  function text(message, x, y, size = 16, color = "#fff", align = "left") {
    ctx.font = `${size}px "Courier New", monospace`; ctx.fillStyle = color; ctx.textAlign = align; ctx.fillText(message, x, y);
  }

  function centered(message, y, size, color) { text(message, W / 2, y, size, color, "center"); }

  function drawGame(now) {
    const cameraX = player.x + player.w / 2 - W / 2, cameraY = player.y + player.h / 2 - H / 2;
    ctx.fillStyle = "#070909"; ctx.fillRect(0, 0, W, H);
    const startX = Math.max(0, Math.floor(cameraX / TILE) - 1), endX = Math.min(COLS, Math.ceil((cameraX + W) / TILE) + 1);
    const startY = Math.max(0, Math.floor(cameraY / TILE) - 1), endY = Math.min(ROWS, Math.ceil((cameraY + H) / TILE) + 1);
    for (let y = startY; y < endY; y += 1) for (let x = startX; x < endX; x += 1) {
      const sx = Math.round(x * TILE - cameraX), sy = Math.round(y * TILE - cameraY);
      drawTexture(images["stonebrick.png"], sx, sy, "#606060");
      if (maze[y][x]) { drawTexture(images["BlockSprite_bricks.png"], sx, sy, "#8c4c3d"); if (trees.has(`${x},${y}`)) drawTexture(images["BlockSprite_oak-leaves.png"], sx, sy, "#287a34"); }
    }
    const paperX = (COLS - 2) * TILE + 8 - cameraX, paperY = (ROWS - 2) * TILE + 7 - cameraY;
    ctx.fillStyle = "#f3e7ba"; ctx.fillRect(paperX, paperY, TILE - 16, TILE - 14); ctx.strokeStyle = "#704a2e"; ctx.strokeRect(paperX, paperY, TILE - 16, TILE - 14);
    for (const zombie of zombies) {
      const sx = zombie.x - cameraX, sy = zombie.y - cameraY;
      if (images["big-zombie-face.png"].complete) ctx.drawImage(images["big-zombie-face.png"], sx, sy, zombie.w, zombie.h);
      else { ctx.fillStyle = "#61944d"; ctx.fillRect(sx, sy, zombie.w, zombie.h); }
      if (zombie.aggro) { ctx.strokeStyle = "#ff4b4b"; ctx.strokeRect(sx - 2, sy - 2, zombie.w + 4, zombie.h + 4); }
    }
    ctx.fillStyle = "#2187ff"; ctx.fillRect(player.x - cameraX, player.y - cameraY, player.w, player.h); ctx.strokeStyle = "#d8f2ff"; ctx.strokeRect(player.x - cameraX, player.y - cameraY, player.w, player.h);
    ctx.fillStyle = "rgba(0,0,0,.68)"; ctx.fillRect(0, 0, W, 50);
    text(`USER: ${username.toUpperCase()}    WASD MOVE    DOUBLE-TAP ANY WASD TO SPRINT`, 14, 18, 12, "#b2ffb7");
    text("HEALTH", 14, 40, 12, "#ffe8e8");
    for (let i = 0; i < 10; i += 1) { const fill = Math.max(0, Math.min(1, player.hearts - i)); ctx.fillStyle = "#4a1517"; ctx.fillRect(74 + i * 22, 30, 16, 12); if (fill) { ctx.fillStyle = "#ed393f"; ctx.fillRect(75 + i * 22, 31, 14 * fill, 10); } ctx.strokeStyle = "#ffbaba"; ctx.strokeRect(74 + i * 22, 30, 16, 12); }
    if (paperFound) drawPaper();
  }

  function drawPaper() {
    ctx.fillStyle = "rgba(0,0,0,.72)"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#f0e5b6"; ctx.fillRect(135, 155, 530, 270); ctx.strokeStyle = "#643f23"; ctx.lineWidth = 4; ctx.strokeRect(135, 155, 530, 270); ctx.lineWidth = 1;
    centered("FOUND PAPER", 210, 38, "#3b291c"); centered("THE SECRET CODE IS", 270, 17, "#4f3925"); centered("Ritam200+JEE", 320, 38, "#355c33"); centered("Press ENTER to complete the maze", 375, 16, "#4f3925");
  }

  function drawIntro(now) {
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
    const visible = Math.min(INTRO.length, Math.floor((now - introStart) / 10000 * INTRO.length) + 1);
    INTRO.slice(0, visible).forEach((line, i) => text(line, 45, 80 + i * 30, 18, "#3bff69"));
    if (now - introStart >= 10000) text("C:\\MAIZE>_", 45, 80 + INTRO.length * 30, 18, "#3bff69");
  }

  function drawUsername() {
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H); centered("MAIZE.EXE", 160, 42, "#43ff74"); centered("ENTER USERNAME (3-8 CHARACTERS)", 235, 18, "#b2ffb7");
    ctx.fillStyle = "#071c0c"; ctx.fillRect(230, 270, 340, 45); ctx.strokeStyle = "#43ff74"; ctx.lineWidth = 2; ctx.strokeRect(230, 270, 340, 45); ctx.lineWidth = 1;
    text(username + (Math.floor(performance.now() / 450) % 2 ? "_" : " "), 244, 299, 18, "#43ff74");
    if (error) centered(error, 350, 13, "#ff6666"); centered("ENTER: GENERATE MAZE     ESC: CLOSE", 410, 13, "#6db473");
  }

  function drawEnding(title, sub, color) { ctx.fillStyle = "#010a05"; ctx.fillRect(0, 0, W, H); centered(title, 220, 42, color); centered(sub, 290, 18, "#ceffd2"); centered("Press ENTER to play again", 370, 13, "#82c488"); }

  function loop(now) {
    const dt = Math.min(.05, (now - lastFrame) / 1000); lastFrame = now;
    if (!active) return;
    if (state === "intro") drawIntro(now); else if (state === "username") drawUsername(); else if (state === "game") { update(dt, now / 1000); drawGame(now); } else if (state === "win") drawEnding("CONGRATULATIONS", "You escaped the maize.", "#4aff79"); else drawEnding("YOU WERE CAUGHT", "The zombies found you. Keep moving.", "#ff5353");
    raf = requestAnimationFrame(loop);
  }

  function keyDown(event) {
    if (!active) return;
    const movement = ["KeyW", "KeyA", "KeyS", "KeyD"];
    if (movement.includes(event.code)) { keys.add(event.code); const now = performance.now() / 1000; if (now - lastTap[event.code] <= .28) sprintUntil = now + .92; lastTap[event.code] = now; event.preventDefault(); return; }
    if (event.key === "Escape") { window.closeMaize(); return; }
    if (state === "intro" && performance.now() - introStart >= 10000) { state = "username"; return; }
    if (state === "username") {
      if (event.key === "Backspace") { username = username.slice(0, -1); error = ""; }
      else if (event.key === "Enter") { if (username.length >= 3 && username.length <= 8) startGame(username); else error = "Username must contain 3 to 8 characters."; }
      else if (event.key.length === 1 && username.length < 8) { username += event.key; error = ""; }
    } else if (state === "game" && paperFound && (event.key === "Enter" || event.key.toLowerCase() === "e")) state = "win";
    else if ((state === "win" || state === "dead") && event.key === "Enter") { state = "username"; username = ""; error = ""; }
  }

  window.openMaize = function openMaize() {
    openWindow("maizeWindow", "task-maize");
    active = true; canvas.focus();
    if (!raf) { lastFrame = performance.now(); raf = requestAnimationFrame(loop); }
  };
  window.closeMaize = function closeMaize() { active = false; cancelAnimationFrame(raf); raf = 0; closeWindowById("maizeWindow", "task-maize"); };
  window.minimizeMaize = window.closeMaize;
  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", (event) => keys.delete(event.code));
})();
