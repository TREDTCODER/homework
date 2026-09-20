"""maize.exe - a standalone retro maze game.

Run with:  python maize.py
Requires:  pygame-ce or pygame  (pip install pygame-ce)
"""

from __future__ import annotations

import hashlib
import math
import random
from pathlib import Path

import pygame


WIDTH, HEIGHT = 800, 600
TILE = 32
MAZE_COLS, MAZE_ROWS = 31, 23  # Odd sizes are required for maze carving.
PLAYER_SIZE = 22
PLAYER_WALK_SPEED = 145
PLAYER_SPRINT_SPEED = 255
ZOMBIE_SIZE = 24
ZOMBIE_SPEED = 58
ZOMBIE_AGGRO_SPEED = 94
ZOMBIE_SIGHT = 235
INTRO_SECONDS = 10.0
ASSETS = Path(__file__).resolve().parent / "assets"

INTRO_LINES = [
    "Microsoft(R) Maze Runtime [Version 1.0.0]",
    "(C) 2026 MAIZE LABS. All rights reserved.",
    "",
    "Loading voxel terrain driver... OK",
    "Mounting stonebrick texture pack... OK",
    "Synchronizing hostile entity protocol... OK",
    "Generating personal maze seed... READY",
    "",
    "SYSTEM READY. PRESS ANY KEY TO CONTINUE.",
]


def clamp(value: float, low: float, high: float) -> float:
    return max(low, min(value, high))


def stable_seed(name: str) -> int:
    """Return the same maze seed for the same supplied name."""
    return int(hashlib.sha256(name.encode("utf-8")).hexdigest()[:16], 16)


def load_texture(filename: str, fallback: tuple[int, int, int]) -> pygame.Surface:
    """Load a supplied texture and provide a readable fallback when absent."""
    try:
        image = pygame.image.load(str(ASSETS / filename)).convert_alpha()
    except pygame.error:
        image = pygame.Surface((16, 16), pygame.SRCALPHA)
        image.fill(fallback)
        pygame.draw.rect(image, tuple(max(0, c - 25) for c in fallback), image.get_rect(), 1)
    return pygame.transform.scale(image, (TILE, TILE))


def build_maze(seed: int) -> list[list[int]]:
    """Create a deterministic perfect maze: 1 = wall, 0 = open walkway."""
    rng = random.Random(seed)
    maze = [[1 for _ in range(MAZE_COLS)] for _ in range(MAZE_ROWS)]
    stack = [(1, 1)]
    maze[1][1] = 0

    while stack:
        x, y = stack[-1]
        choices = []
        for dx, dy in ((2, 0), (-2, 0), (0, 2), (0, -2)):
            nx, ny = x + dx, y + dy
            if 1 <= nx < MAZE_COLS - 1 and 1 <= ny < MAZE_ROWS - 1 and maze[ny][nx] == 1:
                choices.append((nx, ny, x + dx // 2, y + dy // 2))
        if not choices:
            stack.pop()
            continue
        nx, ny, wall_x, wall_y = rng.choice(choices)
        maze[wall_y][wall_x] = 0
        maze[ny][nx] = 0
        stack.append((nx, ny))

    # Guarantee both endpoints are comfortably open.
    maze[1][1] = maze[MAZE_ROWS - 2][MAZE_COLS - 2] = 0
    return maze


class Zombie:
    def __init__(self, x: float, y: float, rng: random.Random):
        self.rect = pygame.Rect(round(x), round(y), ZOMBIE_SIZE, ZOMBIE_SIZE)
        self.direction = pygame.Vector2(0, 1).rotate(rng.randrange(360))
        self.change_at = 0.0
        self.cooldown = 0.0
        self.aggressive = False


class MaizeGame:
    def __init__(self) -> None:
        pygame.init()
        pygame.display.set_caption("maize.exe")
        self.screen = pygame.display.set_mode((WIDTH, HEIGHT))
        self.clock = pygame.time.Clock()
        self.font = pygame.font.SysFont("consolas", 18)
        self.small_font = pygame.font.SysFont("consolas", 13)
        self.title_font = pygame.font.SysFont("consolas", 42, bold=True)
        self.texture_floor = load_texture("stonebrick.png", (100, 100, 100))
        self.texture_wall = load_texture("BlockSprite_bricks.png", (135, 63, 48))
        self.texture_leaves = load_texture("BlockSprite_oak-leaves.png", (38, 125, 42))
        self.zombie_image = load_texture("big-zombie-face.png", (97, 145, 77))
        self.state = "intro"
        self.intro_started = pygame.time.get_ticks() / 1000
        self.username = ""
        self.error = ""
        self.maze: list[list[int]] = []
        self.player = pygame.Rect(0, 0, PLAYER_SIZE, PLAYER_SIZE)
        self.end_cell = (MAZE_COLS - 2, MAZE_ROWS - 2)
        self.zombies: list[Zombie] = []
        self.trees: set[tuple[int, int]] = set()
        self.hearts = 10.0
        self.last_move_down = {pygame.K_w: -10.0, pygame.K_a: -10.0, pygame.K_s: -10.0, pygame.K_d: -10.0}
        self.sprint_until = 0.0
        self.paper_message = False
        self.rng = random.Random()

    def new_game(self, username: str) -> None:
        self.username = username
        seed = stable_seed(username)
        self.rng = random.Random(seed)
        self.maze = build_maze(seed)
        self.player = pygame.Rect(TILE + (TILE - PLAYER_SIZE) // 2, TILE + (TILE - PLAYER_SIZE) // 2, PLAYER_SIZE, PLAYER_SIZE)
        self.hearts = 10.0
        self.paper_message = False
        self.zombies = []
        self.trees = set()

        open_cells = [(x, y) for y in range(1, MAZE_ROWS - 1) for x in range(1, MAZE_COLS - 1) if self.maze[y][x] == 0]
        safe = {(1, 1), self.end_cell}
        spawn_cells = [cell for cell in open_cells if abs(cell[0] - 1) + abs(cell[1] - 1) > 8 and cell not in safe]
        self.rng.shuffle(spawn_cells)
        for x, y in spawn_cells[:11]:
            self.zombies.append(Zombie(x * TILE + 4, y * TILE + 4, self.rng))

        # Trees sit on selected wall blocks, adding scenery without closing paths.
        wall_cells = [(x, y) for y in range(1, MAZE_ROWS - 1) for x in range(1, MAZE_COLS - 1) if self.maze[y][x] == 1]
        self.rng.shuffle(wall_cells)
        self.trees = set(wall_cells[:58])
        self.state = "game"

    def is_wall_at(self, pixel_x: float, pixel_y: float) -> bool:
        cell_x = int(pixel_x // TILE)
        cell_y = int(pixel_y // TILE)
        return cell_x < 0 or cell_y < 0 or cell_x >= MAZE_COLS or cell_y >= MAZE_ROWS or self.maze[cell_y][cell_x] == 1

    def collides_wall(self, rect: pygame.Rect) -> bool:
        left = int(rect.left // TILE)
        right = int((rect.right - 1) // TILE)
        top = int(rect.top // TILE)
        bottom = int((rect.bottom - 1) // TILE)
        for y in range(top, bottom + 1):
            for x in range(left, right + 1):
                if x < 0 or y < 0 or x >= MAZE_COLS or y >= MAZE_ROWS or self.maze[y][x] == 1:
                    return True
        return False

    def move_rect(self, rect: pygame.Rect, dx: float, dy: float) -> None:
        rect.x += round(dx)
        if self.collides_wall(rect):
            step = -1 if dx > 0 else 1
            while self.collides_wall(rect):
                rect.x += step
        rect.y += round(dy)
        if self.collides_wall(rect):
            step = -1 if dy > 0 else 1
            while self.collides_wall(rect):
                rect.y += step

    def has_line_of_sight(self, origin: pygame.Vector2, target: pygame.Vector2) -> bool:
        delta = target - origin
        distance = delta.length()
        if distance > ZOMBIE_SIGHT or distance == 0:
            return False
        steps = max(1, int(distance / 7))
        for step in range(1, steps):
            point = origin.lerp(target, step / steps)
            if self.is_wall_at(point.x, point.y):
                return False
        return True

    def update_zombies(self, dt: float, now: float) -> None:
        player_center = pygame.Vector2(self.player.center)
        for zombie in self.zombies:
            center = pygame.Vector2(zombie.rect.center)
            zombie.aggressive = self.has_line_of_sight(center, player_center)
            if zombie.aggressive:
                direction = player_center - center
                if direction.length_squared() > 0:
                    direction = direction.normalize()
                speed = ZOMBIE_AGGRO_SPEED
            else:
                if now >= zombie.change_at:
                    zombie.direction = pygame.Vector2(1, 0).rotate(self.rng.randrange(360))
                    zombie.change_at = now + self.rng.uniform(.7, 2.1)
                direction = zombie.direction
                speed = ZOMBIE_SPEED
            before = zombie.rect.copy()
            self.move_rect(zombie.rect, direction.x * speed * dt, direction.y * speed * dt)
            if zombie.rect.topleft == before.topleft and not zombie.aggressive:
                zombie.change_at = 0
            zombie.cooldown = max(0, zombie.cooldown - dt)
            if zombie.rect.colliderect(self.player) and zombie.cooldown <= 0:
                self.hearts = max(0, self.hearts - .25)
                zombie.cooldown = .72
                if self.hearts <= 0:
                    self.state = "game_over"

    def update_game(self, dt: float, now: float) -> None:
        keys = pygame.key.get_pressed()
        direction = pygame.Vector2(keys[pygame.K_d] - keys[pygame.K_a], keys[pygame.K_s] - keys[pygame.K_w])
        if direction.length_squared() > 0:
            direction = direction.normalize()
            speed = PLAYER_SPRINT_SPEED if now < self.sprint_until else PLAYER_WALK_SPEED
            self.move_rect(self.player, direction.x * speed * dt, direction.y * speed * dt)
        self.update_zombies(dt, now)
        goal = pygame.Rect(self.end_cell[0] * TILE + 5, self.end_cell[1] * TILE + 5, TILE - 10, TILE - 10)
        if self.player.colliderect(goal) and self.state == "game":
            self.paper_message = True

    def camera(self) -> pygame.Vector2:
        return pygame.Vector2(self.player.centerx - WIDTH // 2, self.player.centery - HEIGHT // 2)

    def draw_world(self) -> None:
        camera = self.camera()
        self.screen.fill((10, 11, 13))
        start_x = max(0, int(camera.x // TILE) - 1)
        end_x = min(MAZE_COLS, int((camera.x + WIDTH) // TILE) + 2)
        start_y = max(0, int(camera.y // TILE) - 1)
        end_y = min(MAZE_ROWS, int((camera.y + HEIGHT) // TILE) + 2)
        for y in range(start_y, end_y):
            for x in range(start_x, end_x):
                destination = (round(x * TILE - camera.x), round(y * TILE - camera.y))
                self.screen.blit(self.texture_floor, destination)
                if self.maze[y][x] == 1:
                    self.screen.blit(self.texture_wall, destination)
                    if (x, y) in self.trees:
                        self.screen.blit(self.texture_leaves, destination)
        ex, ey = self.end_cell
        paper = pygame.Rect(round(ex * TILE + 8 - camera.x), round(ey * TILE + 7 - camera.y), TILE - 16, TILE - 14)
        pygame.draw.rect(self.screen, (246, 235, 184), paper, border_radius=2)
        pygame.draw.line(self.screen, (143, 92, 48), (paper.left + 4, paper.top + 5), (paper.right - 4, paper.top + 5), 1)
        pygame.draw.line(self.screen, (143, 92, 48), (paper.left + 4, paper.top + 9), (paper.right - 8, paper.top + 9), 1)
        for zombie in self.zombies:
            destination = zombie.rect.move(-round(camera.x), -round(camera.y))
            self.screen.blit(self.zombie_image, destination)
            if zombie.aggressive:
                pygame.draw.rect(self.screen, (255, 74, 66), destination.inflate(4, 4), 1)
        player = self.player.move(-round(camera.x), -round(camera.y))
        pygame.draw.rect(self.screen, (33, 135, 255), player)
        pygame.draw.rect(self.screen, (200, 240, 255), player, 2)
        self.draw_hud()
        if self.paper_message:
            self.draw_paper_overlay()

    def draw_hud(self) -> None:
        overlay = pygame.Surface((WIDTH, 50), pygame.SRCALPHA)
        overlay.fill((0, 0, 0, 160))
        self.screen.blit(overlay, (0, 0))
        label = self.small_font.render(f"USER: {self.username.upper()}    WASD MOVE    DOUBLE-TAP W SPRINT", True, (178, 255, 183))
        self.screen.blit(label, (14, 8))
        self.screen.blit(self.small_font.render("HEALTH", True, (255, 235, 235)), (14, 28))
        for heart in range(10):
            fill = clamp(self.hearts - heart, 0, 1)
            x = 75 + heart * 22
            pygame.draw.rect(self.screen, (74, 20, 22), (x, 30, 16, 12))
            if fill:
                pygame.draw.rect(self.screen, (237, 57, 63), (x + 1, 31, round(14 * fill), 10))
            pygame.draw.rect(self.screen, (255, 181, 181), (x, 30, 16, 12), 1)

    def draw_paper_overlay(self) -> None:
        shade = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)
        shade.fill((0, 0, 0, 175))
        self.screen.blit(shade, (0, 0))
        panel = pygame.Rect(135, 155, 530, 270)
        pygame.draw.rect(self.screen, (240, 229, 182), panel)
        pygame.draw.rect(self.screen, (100, 63, 35), panel, 4)
        self.draw_centered("FOUND PAPER", self.title_font, (58, 41, 27), 205)
        self.draw_centered("THE SECRET CODE IS", self.font, (79, 57, 37), 270)
        self.draw_centered("Ritam200+JEE", self.title_font, (53, 75, 48), 310)
        self.draw_centered("Press ENTER to complete the maze", self.font, (79, 57, 37), 375)

    def draw_centered(self, text: str, font: pygame.font.Font, color: tuple[int, int, int], y: int) -> None:
        image = font.render(text, True, color)
        self.screen.blit(image, image.get_rect(center=(WIDTH // 2, y)))

    def draw_intro(self, now: float) -> None:
        self.screen.fill((0, 0, 0))
        elapsed = now - self.intro_started
        visible = min(len(INTRO_LINES), int(elapsed / INTRO_SECONDS * len(INTRO_LINES)) + 1)
        for index, line in enumerate(INTRO_LINES[:visible]):
            text = self.font.render(line, True, (59, 255, 105))
            self.screen.blit(text, (45, 70 + index * 30))
        if elapsed >= INTRO_SECONDS:
            cursor = "_" if int(now * 2) % 2 else " "
            self.screen.blit(self.font.render(f"C:\\MAIZE>{cursor}", True, (59, 255, 105)), (45, 70 + len(INTRO_LINES) * 30))

    def draw_username(self) -> None:
        self.screen.fill((0, 0, 0))
        self.draw_centered("MAIZE.EXE", self.title_font, (67, 255, 116), 160)
        self.draw_centered("ENTER USERNAME (3-8 CHARACTERS)", self.font, (178, 255, 183), 235)
        box = pygame.Rect(230, 270, 340, 45)
        pygame.draw.rect(self.screen, (7, 28, 12), box)
        pygame.draw.rect(self.screen, (67, 255, 116), box, 2)
        cursor = "_" if int(pygame.time.get_ticks() / 450) % 2 else " "
        entry = self.font.render(self.username + cursor, True, (67, 255, 116))
        self.screen.blit(entry, (box.x + 12, box.y + 12))
        if self.error:
            self.draw_centered(self.error, self.small_font, (255, 90, 90), 350)
        self.draw_centered("ENTER: GENERATE MAZE     ESC: QUIT", self.small_font, (109, 180, 115), 410)

    def draw_end_screen(self, heading: str, subheading: str, color: tuple[int, int, int]) -> None:
        self.screen.fill((1, 10, 5))
        self.draw_centered(heading, self.title_font, color, 210)
        self.draw_centered(subheading, self.font, (206, 255, 210), 286)
        self.draw_centered("Press ENTER to play again", self.small_font, (130, 196, 136), 370)

    def handle_keydown(self, event: pygame.event.Event, now: float) -> bool:
        if event.key == pygame.K_ESCAPE:
            return False
        if self.state == "intro" and now - self.intro_started >= INTRO_SECONDS:
            self.state = "username"
        elif self.state == "username":
            if event.key == pygame.K_BACKSPACE:
                self.username = self.username[:-1]
                self.error = ""
            elif event.key in (pygame.K_RETURN, pygame.K_KP_ENTER):
                if 3 <= len(self.username) <= 8:
                    self.new_game(self.username)
                else:
                    self.error = "Username must contain 3 to 8 characters."
            elif event.unicode and len(self.username) < 8 and event.unicode.isprintable():
                self.username += event.unicode
                self.error = ""
        elif self.state == "game":
            if event.key in self.last_move_down:
                # Double-tapping any movement direction starts the sprint boost.
                if now - self.last_move_down[event.key] <= .28:
                    self.sprint_until = now + .92
                self.last_move_down[event.key] = now
            elif event.key in (pygame.K_RETURN, pygame.K_e) and self.paper_message:
                self.state = "win"
        elif self.state in ("win", "game_over") and event.key in (pygame.K_RETURN, pygame.K_KP_ENTER):
            self.state = "username"
            self.username = ""
            self.error = ""
        return True

    def run(self) -> None:
        running = True
        while running:
            dt = min(.05, self.clock.tick(60) / 1000)
            now = pygame.time.get_ticks() / 1000
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                elif event.type == pygame.KEYDOWN:
                    running = self.handle_keydown(event, now)
            if self.state == "game" and not self.paper_message:
                self.update_game(dt, now)
            if self.state == "intro":
                self.draw_intro(now)
            elif self.state == "username":
                self.draw_username()
            elif self.state == "game":
                self.draw_world()
            elif self.state == "win":
                self.draw_end_screen("CONGRATULATIONS", "You escaped the maize.", (74, 255, 121))
            else:
                self.draw_end_screen("YOU WERE CAUGHT", "The zombies found you. Keep moving.", (255, 83, 83))
            pygame.display.flip()
        pygame.quit()


if __name__ == "__main__":
    MaizeGame().run()
