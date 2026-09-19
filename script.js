/* ============================================================
   HW SHAREWARE - Ritam's Rizz Corp. desktop
   ============================================================ */

/* ---------- Retro pixel-style icon set (inline SVG) ---------- */
const ICONS = {
  folder: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8 L12 8 L14 10 L29 10 L29 24 A2 2 0 0 1 27 26 L5 26 A2 2 0 0 1 3 24 Z" fill="#ffcc4d" stroke="#8a6d00" stroke-width="1.2" stroke-linejoin="round"/>
    <path d="M3 24 L3 8 L11 8 L13 10" fill="none" stroke="#8a6d00" stroke-width="1.2"/>
    <path d="M4 11 L28 11" stroke="#fff0b3" stroke-width="1.2" opacity="0.85"/>
  </svg>`,

  pdf: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 2 H20 L26 8 V29 A1 1 0 0 1 25 30 H7 A1 1 0 0 1 6 29 V3 A1 1 0 0 1 7 2 Z" fill="#ffffff" stroke="#7a7a7a" stroke-width="1"/>
    <path d="M20 2 L20 8 L26 8 Z" fill="#d9d9d9" stroke="#7a7a7a" stroke-width="1"/>
    <rect x="9" y="12" width="14" height="2" fill="#000080"/>
    <rect x="9" y="16" width="14" height="2" fill="#000080"/>
    <rect x="9" y="20" width="9" height="2" fill="#000080"/>
    <rect x="6" y="23" width="20" height="7" fill="#c00000"/>
    <text x="16" y="28.5" font-family="Arial, sans-serif" font-size="6.5" font-weight="bold" fill="#fff" text-anchor="middle">PDF</text>
  </svg>`,

  terminal: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="28" height="21" rx="1" fill="#3a3a3a" stroke="#000" stroke-width="1"/>
    <rect x="5" y="7" width="22" height="15" fill="#000"/>
    <text x="7" y="18" font-family="Courier New, monospace" font-size="8.5" fill="#00ff00">C:\\&gt;_</text>
    <rect x="10" y="27" width="12" height="2" fill="#6b6b6b"/>
    <rect x="6" y="29" width="20" height="2" fill="#8a8a8a"/>
  </svg>`,

  internet: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="14" r="11" fill="#3a8ee0" stroke="#0d3c6e" stroke-width="1.2"/>
    <path d="M5 14 H27 M16 3 C11 8 11 20 16 25 C21 20 21 8 16 3 Z M7.5 8 C11 11 21 11 24.5 8 M7.5 20 C11 17 21 17 24.5 20" fill="none" stroke="#bfe1ff" stroke-width="1"/>
    <rect x="12" y="24" width="8" height="6" rx="1" fill="#d9d9d9" stroke="#555" stroke-width="1"/>
    <rect x="14" y="29" width="4" height="2" fill="#777"/>
  </svg>`,

  computer: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="26" height="17" rx="1" fill="#d9d9d9" stroke="#555" stroke-width="1.2"/>
    <rect x="5" y="6" width="22" height="12" fill="#1084d0"/>
    <rect x="11" y="22" width="10" height="3" fill="#b5b5b5" stroke="#555" stroke-width="1"/>
    <rect x="7" y="25" width="18" height="2" fill="#8a8a8a" stroke="#555" stroke-width="1"/>
  </svg>`,

  recycle: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 11 H23 L21.5 29 A2 2 0 0 1 19.5 31 H12.5 A2 2 0 0 1 10.5 29 Z" fill="#e8e8e8" stroke="#555" stroke-width="1.2"/>
    <rect x="7" y="8" width="18" height="3" fill="#1084d0" stroke="#0d3c6e" stroke-width="1"/>
    <rect x="12" y="5" width="8" height="3" fill="#1084d0" stroke="#0d3c6e" stroke-width="1"/>
    <path d="M13 13 L14 28 M16 13 L16 28 M19 13 L18 28" stroke="#8899aa" stroke-width="1"/>
  </svg>`,

  error: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="#d33" stroke="#7a0000" stroke-width="1"/>
    <path d="M11 11 L21 21 M21 11 L11 21" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/>
  </svg>`,

  warn: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3 L30 27 H2 Z" fill="#ffd83d" stroke="#7a5c00" stroke-width="1" stroke-linejoin="round"/>
    <rect x="14.5" y="12" width="3" height="8" fill="#000"/>
    <rect x="14.5" y="22" width="3" height="3" fill="#000"/>
  </svg>`,

  info: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="#1e6fd6" stroke="#0d3c6e" stroke-width="1"/>
    <rect x="14.5" y="13" width="3" height="10" fill="#fff"/>
    <rect x="14.5" y="8" width="3" height="3" fill="#fff"/>
  </svg>`,

  modem: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="10" width="26" height="13" rx="1.5" fill="#d9d9d9" stroke="#555" stroke-width="1.2"/>
    <circle cx="8" cy="16.5" r="2" fill="#2bd12b"/>
    <circle cx="14" cy="16.5" r="2" fill="#ffd83d"/>
    <circle cx="20" cy="16.5" r="2" fill="#3a8ee0"/>
    <path d="M26 10 V6 M26 23 V27" stroke="#555" stroke-width="1.4"/>
  </svg>`
};


const files = {
  Physics: [
    { name: "physics_practical.pdf", path: "pdfs/physics/physics_practical.pdf" },
    { name: "DocScanner Aug 19, 2026 7-35 AM.pdf", path: "pdfs/physics/DocScanner%20Aug%2019%2C%202026%207-35%20AM.pdf" },
    { name: "Rotational_Dynamics_Theory_Formula_Derivation_Book .pdf", path: "pdfs/physics/Rotational_Dynamics_Theory_Formula_Derivation_Book%20.pdf" }
  ],
  Chemistry: [
    { name: "chemistry_practical.pdf", path: "pdfs/chemistry/chemistry_practical.pdf" },
    { name: "Thermodynamics_Formula_Derivation_Book_IMPROVED.pdf", path: "pdfs/chemistry/Thermodynamics_Formula_Derivation_Book_IMPROVED.pdf" },
    { name: "Salt_Analysis_Comprehensive_Guide.pdf", path: "pdfs/chemistry/Salt_Analysis_Comprehensive_Guide.pdf" }
  ],
  Mathematics: [
    { name: "Linear Inequalities Formula Sheet.pdf", path: "pdfs/mathematics/Linear%20Inequalities%20Formula%20Sheet.pdf" },
    { name: "Permutations and Combinations Formula.pdf", path: "pdfs/mathematics/Permutations%20and%20Combinations%20Formula.pdf" },
    { name: "Quadratic Eqns and Imaginary Numbers.pdf", path: "pdfs/mathematics/Quadratic%20Eqns%20and%20Imaginary%20Numbers.pdf" },
    { name: "Sequences and Series Formulas.pdf", path: "pdfs/mathematics/Sequences%20and%20Series%20Formulas.pdf" },
    { name: "Straight Lines Formulas.pdf", path: "pdfs/mathematics/Straight%20Lines%20Formulas.pdf" },
    { name: "Trigonometry Formulas.pdf", path: "pdfs/mathematics/Trigonometry%20Formulas.pdf" },
    { name: "logarithm_formulas_class11.pdf", path: "pdfs/mathematics/logarithm_formulas_class11.pdf" }
  ],
  English: [
    { name: "NONE.pdf", path: "pdfs/english/NONE.pdf" }
  ]
};
async function loadPdfIndex() {
  const sources = ["/api/pdfs", "pdfs/index.php", "pdfs/manifest.json"];

  for (const source of sources) {
    try {
      const response = await fetch(source, { cache: "no-store" });
      if (!response.ok) continue;
      const index = await response.json();
      Object.keys(files).forEach((subject) => {
        files[subject] = Array.isArray(index[subject]) ? index[subject] : [];
      });
      return;
    } catch (error) {
      // Try the next source. This also supports a plain static web host.
    }
  }
}

const FOLDER_SWITCH = {
  p: "Physics",
  c: "Chemistry",
  e: "English",
  m: "Mathematics"
};


let current = "root";
let maximized = false;
let iconSize = "large";
let zTop = 10;


const $ = (id) => document.getElementById(id);
const win = () => $("window");


/* ============================================================
   GENERIC WINDOW MANAGEMENT
   ============================================================ */

function bringToFront(el) {
  if (!el) return;
  zTop += 1;
  el.style.zIndex = zTop;
}


function openWindow(id, taskId) {
  const el = $(id);

  if (!el) return;

  el.classList.remove("window-closing");
  el.classList.remove("hidden");
  bringToFront(el);

  const task = $(taskId);
  if (task) {
    task.classList.remove("hidden");
    task.classList.add("active");
  }

  const startMenu = $("startMenu");
  if (startMenu) {
    startMenu.classList.add("hidden");
  }
}


function closeWindowById(id, taskId) {
  const el = $(id);

  if (el) {
    if (document.body.classList.contains("advanced-tech")) {
      el.classList.add("window-closing");
      setTimeout(() => {
        el.classList.add("hidden");
        el.classList.remove("window-closing");
      }, 180);
    } else {
      el.classList.add("hidden");
    }
  }

  const task = $(taskId);

  if (task) {
    task.classList.add("hidden");
    task.classList.remove("active");
  }
}


function makeDraggable(windowEl, handleEl) {
  if (!windowEl || !handleEl) return;

  let dragging = false;
  let offX = 0;
  let offY = 0;

  handleEl.addEventListener("mousedown", (e) => {
    if (e.target.closest(".title-btn")) return;

    dragging = true;
    bringToFront(windowEl);

    const rect = windowEl.getBoundingClientRect();

    offX = e.clientX - rect.left;
    offY = e.clientY - rect.top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    windowEl.style.left =
      Math.max(0, e.clientX - offX) + "px";

    windowEl.style.top =
      Math.max(0, e.clientY - offY) + "px";
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });
}


/* ============================================================
   EXPLORER WINDOW
   ============================================================ */

function openRoot() {
  current = "root";
  render();
  openWindow("window", "task-explorer");
}


function openFolder(name) {
  if (!Object.prototype.hasOwnProperty.call(files, name)) {
    return;
  }

  current = name;
  render();
  openWindow("window", "task-explorer");
}


function closeWindow() {
  closeWindowById("window", "task-explorer");
}


function minimizeWindow() {
  closeWindowById("window", "task-explorer");
}


function maximizeWindow() {
  const explorerWindow = win();

  if (!explorerWindow) return;

  maximized = !maximized;

  explorerWindow.style.left =
    maximized ? "0" : "140px";

  explorerWindow.style.top =
    maximized ? "0" : "55px";

  explorerWindow.style.width =
    maximized ? "100vw" : "760px";

  explorerWindow.style.height =
    maximized ? "calc(100vh - 30px)" : "510px";
}


function goBack() {
  if (current !== "root") {
    current = "root";
    render();
  }
}


function goUp() {
  goBack();
}


function openPdf(path) {
  if (!path) return;

  window.open(
    path,
    "_blank",
    "noopener,noreferrer"
  );
}


function render() {
  const explorer = $("explorer");

  if (!explorer) return;

  explorer.innerHTML = "";
  explorer.className = "explorer icons-" + iconSize;

  const title =
    current === "root"
      ? "HW Shareware - My Computer"
      : `HW Shareware - ${current}`;

  const windowTitle = $("windowTitle");

  if (windowTitle) {
    windowTitle.textContent = title;
  }

  const addressPath = $("addressPath");

  if (addressPath) {
    addressPath.textContent =
      current === "root"
        ? ""
        : current + "\\";
  }


  if (current === "root") {

    Object.keys(files).forEach((name) => {
      addItem(
        name,
        ICONS.folder,
        () => openFolder(name),
        true
      );
    });

    const statusText = $("statusText");

    if (statusText) {
      statusText.textContent =
        `${Object.keys(files).length} object(s)`;
    }

    return;
  }


  const folderFiles = files[current];

  if (!Array.isArray(folderFiles)) {
    current = "root";
    render();
    return;
  }


  folderFiles.forEach((file) => {
    addItem(
      file.name,
      ICONS.pdf,
      () => openPdf(file.path),
      false,
      file
    );
  });


  const statusText = $("statusText");

  if (statusText) {
    statusText.textContent =
      `${folderFiles.length} object(s)`;
  }
}


function addItem(
  name,
  iconSvg,
  onOpen,
  isFolder,
  fileObj
) {
  const el = document.createElement("div");

  el.className = "item";
  el.tabIndex = 0;

  el.innerHTML =
    `<div class="item-icon">${iconSvg}</div>` +
    `<div class="item-name">${escapeHtml(name)}</div>`;

  el.ondblclick = onOpen;

  el.onclick = () => {
    select(el);
  };

  el.oncontextmenu = (e) => {
    e.preventDefault();

    select(el);

    showItemContextMenu(
      e,
      name,
      onOpen,
      isFolder
    );
  };

  const explorer = $("explorer");

  if (explorer) {
    explorer.appendChild(el);
  }

  return el;
}


function select(el) {
  if (!el) return;

  document
    .querySelectorAll(".item")
    .forEach((x) =>
      x.classList.remove("selected")
    );

  el.classList.add("selected");
}


/* ============================================================
   MENU BAR
   ============================================================ */

function toggleMenu(name, evt) {
  if (!evt) return;

  evt.stopPropagation();

  const dd = $("dd-" + name);

  if (!dd) return;

  const isOpen =
    !dd.classList.contains("hidden");

  closeAllMenus();

  if (!isOpen) {
    dd.classList.remove("hidden");

    if (evt.target) {
      evt.target.classList.add("active");
    }
  }
}


function closeAllMenus() {
  document
    .querySelectorAll(".dropdown")
    .forEach((d) =>
      d.classList.add("hidden")
    );

  document
    .querySelectorAll(".menubar span")
    .forEach((s) =>
      s.classList.remove("active")
    );
}


document.addEventListener(
  "click",
  closeAllMenus
);


function adminDenied() {
  closeAllMenus();

  showMessageBox({
    title: "Access Denied",
    icon: ICONS.error,

    text:
      "Admin Permission Denied.\n\n" +
      "You do not have sufficient privileges " +
      "to perform this operation. Please contact " +
      "your system administrator.",

    buttons: [
      {
        label: "OK",
        primary: true
      }
    ]
  });
}


function setIconSize(size) {
  const validSizes = [
    "large",
    "medium",
    "small"
  ];

  if (!validSizes.includes(size)) {
    return;
  }

  iconSize = size;

  render();

  closeAllMenus();
}


async function refreshExplorer() {
  await loadPdfIndex();
  render();
  closeAllMenus();
}


function showAbout() {
  closeAllMenus();

  showMessageBox({
    title: "About HW Shareware",
    icon: ICONS.info,

    text:
      "HW Shareware Explorer\n" +
      "Version 4.00.950\n\n" +
      "(c) Ritam's Rizz Corp. All rights reserved.\n" +
      "Running on a simulated Windows NT-style shell.",

    buttons: [
      {
        label: "OK",
        primary: true
      }
    ]
  });
}


/* ============================================================
   RIGHT-CLICK CONTEXT MENU ON ITEMS
   ============================================================ */

function showItemContextMenu(
  evt,
  name,
  onOpen,
  isFolder
) {
  removeCtxMenu();

  const menu =
    document.createElement("div");

  menu.className = "ctx-menu";
  menu.id = "activeCtxMenu";

  menu.innerHTML = `
    <div class="ctx-item bold" data-act="open">
      Open
    </div>

    <div class="ctx-item" data-act="edit">
      Edit
    </div>

    <div class="dropdown-sep"></div>

    <div class="ctx-item" data-act="props">
      Properties
    </div>
  `;

  document.body.appendChild(menu);

  positionMenu(
    menu,
    evt.clientX,
    evt.clientY
  );


  const openItem =
    menu.querySelector('[data-act="open"]');

  if (openItem) {
    openItem.onclick = (e) => {
      e.stopPropagation();

      removeCtxMenu();

      onOpen();
    };
  }


  const editItem =
    menu.querySelector('[data-act="edit"]');

  if (editItem) {
    editItem.onclick = (e) => {
      e.stopPropagation();

      removeCtxMenu();

      adminDenied();
    };
  }


  const propsItem =
    menu.querySelector('[data-act="props"]');

  if (propsItem) {
    propsItem.onclick = (e) => {
      e.stopPropagation();

      removeCtxMenu();

      showMessageBox({
        title: name + " Properties",

        icon:
          isFolder
            ? ICONS.folder
            : ICONS.pdf,

        text:
          `Name: ${name}\n` +
          `Type: ${
            isFolder
              ? "File Folder"
              : "Adobe Acrobat Document"
          }\n` +
          `Location: C:\\HW_SHAREWARE\\${
            current === "root"
              ? ""
              : current
          }`,

        buttons: [
          {
            label: "OK",
            primary: true
          }
        ]
      });
    };
  }
}


function positionMenu(menu, x, y) {
  if (!menu) return;

  menu.style.left = x + "px";
  menu.style.top = y + "px";

  requestAnimationFrame(() => {
    const r =
      menu.getBoundingClientRect();

    if (r.right > window.innerWidth) {
      menu.style.left =
        Math.max(
          4,
          window.innerWidth -
            r.width -
            4
        ) + "px";
    }

    if (r.bottom > window.innerHeight) {
      menu.style.top =
        Math.max(
          4,
          window.innerHeight -
            r.height -
            34
        ) + "px";
    }
  });
}


function removeCtxMenu() {
  $("activeCtxMenu")?.remove();
}


document.addEventListener(
  "click",
  removeCtxMenu
);


document.addEventListener(
  "contextmenu",
  (e) => {

    if (
      e.target.closest(".item") ||
      e.target.closest(".desktop-icon")
    ) {
      return;
    }


    if (
      e.target.closest(".desktop") &&
      !e.target.closest(".window") &&
      !e.target.closest(".taskbar") &&
      !e.target.closest(".start-menu")
    ) {
      e.preventDefault();

      showDesktopContextMenu(e);
    } else {
      removeCtxMenu();
    }
  }
);


/* ============================================================
   RIGHT-CLICK CONTEXT MENU ON DESKTOP
   ============================================================ */

const WALLPAPER_LABELS = {
  solid: "Solid Color",
  blue: "Blue Matrix",
  green: "Green Matrix",
  red: "Red Matrix",
  space: "Space",
  jupiter: "Jupiter Footage",
  advanced: "Advanced Tech"
};


function showDesktopContextMenu(evt) {
  removeCtxMenu();

  const menu =
    document.createElement("div");

  menu.className = "ctx-menu";
  menu.id = "activeCtxMenu";


  const items =
    Object.keys(WALLPAPER_LABELS)
      .map(
        (key) =>
          `<div class="ctx-item${
            currentWallpaper === key
              ? " checked"
              : ""
          }" data-wp="${key}">
            ${escapeHtml(WALLPAPER_LABELS[key])}
          </div>`
      )
      .join("");


  menu.innerHTML = `
    <div class="ctx-item submenu-anchor">
      <span>Wallpaper</span>
      <span class="arrow">&#9656;</span>

      <div class="submenu">
        ${items}
      </div>
    </div>
  `;


  document.body.appendChild(menu);

  positionMenu(
    menu,
    evt.clientX,
    evt.clientY
  );


  menu
    .querySelectorAll("[data-wp]")
    .forEach((el) => {

      el.onclick = (e) => {
        e.stopPropagation();

        const mode =
          el.dataset.wp;

        removeCtxMenu();

        setWallpaper(mode);
      };
    });
}


/* ============================================================
   DESKTOP ICONS
   ============================================================ */

function selectDesktopIcon(el) {
  if (!el) return;

  document
    .querySelectorAll(".desktop-icon")
    .forEach((x) =>
      x.classList.remove("selected")
    );

  el.classList.add("selected");
}


document.addEventListener(
  "click",
  (e) => {

    if (
      !e.target.closest(".desktop-icon")
    ) {
      document
        .querySelectorAll(".desktop-icon")
        .forEach((x) =>
          x.classList.remove("selected")
        );
    }
  }
);


/* ============================================================
   START MENU / CLOCK
   ============================================================ */

function toggleStart() {
  const sm = $("startMenu");
  const startBtn = $("startBtn");

  if (!sm) return;

  sm.classList.toggle("hidden");

  if (startBtn) {
    startBtn.classList.toggle(
      "open",
      !sm.classList.contains("hidden")
    );
  }
}


function updateClock() {
  const clock = $("clock");

  if (!clock) return;

  clock.textContent =
    new Date().toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );
}


/* ============================================================
   MESSAGE BOX
   ============================================================ */

function showMessageBox({
  title,
  icon,
  text,
  buttons
}) {
  removeMessageBox();

  const overlay =
    document.createElement("div");

  overlay.className =
    "msgbox-overlay";

  overlay.id =
    "activeMsgOverlay";


  const box =
    document.createElement("div");

  box.className = "msgbox";
  box.id = "activeMsgBox";


  box.innerHTML = `
    <div class="titlebar">
      <div class="title-left">
        <span>${escapeHtml(title || "")}</span>
      </div>

      <div class="window-buttons">
        <button
          class="title-btn"
          id="msgboxClose"
          type="button"
        >
          ×
        </button>
      </div>
    </div>

    <div class="msgbox-body">
      <div>${icon || ""}</div>

      <div
        style="
          white-space:pre-line;
          line-height:16px;
          padding-top:2px
        "
      >${escapeHtml(text || "")}</div>
    </div>

    <div class="msgbox-buttons"></div>
  `;


  const btnWrap =
    box.querySelector(
      ".msgbox-buttons"
    );


  (
    buttons ||
    [
      {
        label: "OK",
        primary: true
      }
    ]
  ).forEach((b) => {

    const btn =
      document.createElement("button");

    btn.type = "button";
    btn.textContent =
      b.label || "OK";

    if (b.primary) {
      btn.classList.add("primary");
    }

    btn.onclick = () => {
      removeMessageBox();

      if (
        typeof b.onClick ===
        "function"
      ) {
        b.onClick();
      }
    };

    btnWrap.appendChild(btn);
  });


  const closeButton =
    box.querySelector(
      "#msgboxClose"
    );

  if (closeButton) {
    closeButton.onclick =
      () => removeMessageBox();
  }


  document.body.appendChild(
    overlay
  );

  document.body.appendChild(
    box
  );
}


function removeMessageBox() {
  $("activeMsgOverlay")?.remove();
  $("activeMsgBox")?.remove();
}


/* ============================================================
   SHUTDOWN / RESTART
   ============================================================ */

function doRestart() {
  location.reload();
}


function doShutdown() {
  const scr =
    document.createElement("div");

  scr.className =
    "shutdown-screen";

  scr.innerHTML = `
    <div>It's now safe to close this tab.</div>
    <small>Windows is shutting down...</small>
  `;

  document.body.appendChild(scr);

  setTimeout(() => {
    try {
      window.close();
    } catch (e) {
      /* Browser may block window.close(). */
    }
  }, 400);
}


/* ============================================================
   TERMINAL
   ============================================================ */

function openTerminal() {
  openWindow(
    "terminalWindow",
    "task-terminal"
  );

  const input = $("termInput");

  if (input) {
    input.focus();
  }
}


function closeTerminal() {
  closeWindowById(
    "terminalWindow",
    "task-terminal"
  );
}


function minimizeTerminal() {
  closeWindowById(
    "terminalWindow",
    "task-terminal"
  );
}


function termPrint(html) {
  const body = $("termBody");
  const inputLine = $("termInputLine");

  if (!body || !inputLine) return;

  const line =
    document.createElement("div");

  line.innerHTML = html;

  body.insertBefore(
    line,
    inputLine
  );

  body.scrollTop =
    body.scrollHeight;
}


/* FIXED:
   Terminal now correctly displays the current folder. */
function termPromptText() {
  return (
    "C:\\HW_SHAREWARE" +
    (
      current !== "root" &&
      current
        ? "\\" + current
        : ""
    ) +
    ">"
  );
}


function handleTermCommand(raw) {
  const cmd =
    String(raw ?? "").trim();

  termPrint(
    `<span class="term-cmd">${
      escapeHtml(termPromptText())
    } ${
      escapeHtml(cmd)
    }</span>`
  );


  const lower =
    cmd.toLowerCase();


  if (lower === "") {
    return;
  }


  if (lower === "help") {

    termPrint(
      `Available commands:\n` +
      `  help        - shows this list of commands\n` +
      `  shutdown    - closes this tab\n` +
      `  restart     - reloads this tab\n` +
      `  dir/p       - lists contents of the Physics folder\n` +
      `  dir/c       - lists contents of the Chemistry folder\n` +
      `  dir/e       - lists contents of the English folder\n` +
      `  dir/m       - lists contents of the Mathematics folder\n` +
      `  cls         - clears the screen`
    );

  } else if (
    lower === "cls"
  ) {

    document
      .querySelectorAll(
        "#termBody > div:not(#termInputLine)"
      )
      .forEach((n) => n.remove());

  } else if (
    lower === "shutdown"
  ) {

    termPrint(
      `<span class="term-ok">
        Shutting down HW Shareware...
      </span>`
    );

    setTimeout(
      doShutdown,
      500
    );

  } else if (
    lower === "restart"
  ) {

    termPrint(
      `<span class="term-ok">
        Restarting system...
      </span>`
    );

    setTimeout(
      doRestart,
      500
    );

  } else if (
    /^dir\/[pcem]$/.test(lower)
  ) {

    const key =
      lower.split("/")[1];

    const folderName =
      FOLDER_SWITCH[key];

    termDir(folderName);

  } else {

    termPrint(
      `<span class="term-err">'${
        escapeHtml(cmd)
      }' is not recognized as an internal or external command,\noperable program or batch file.</span>`
    );
  }
}


function termDir(folderName) {
  const list =
    files[folderName] || [];


  termPrint(
    ` Volume in drive C is HW_SHAREWARE\n` +
    ` Directory of C:\\HW_SHAREWARE\\${folderName}\n`
  );


  if (list.length === 0) {

    termPrint(
      `File Not Found`
    );

  } else {

    list.forEach((f) => {

      const fakeSize =
        Math.floor(
          Math.random() * 900
        ) + 100;

      termPrint(
        `${new Date().toLocaleDateString()}  ` +
        `${fakeSize} KB  ` +
        `${escapeHtml(f.name)}`
      );
    });


    termPrint(
      `       ${list.length} File(s)`
    );
  }
}


function escapeHtml(s) {
  return String(s ?? "").replace(
    /[&<>"']/g,
    (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c])
  );
}


function initTerminalInput() {
  const input =
    $("termInput");

  const terminalWindow =
    $("terminalWindow");


  if (!input) {
    return;
  }


  input.addEventListener(
    "keydown",
    (e) => {

      if (e.key === "Enter") {

        const val =
          input.value;

        input.value = "";

        handleTermCommand(
          val
        );
      }
    }
  );


  if (terminalWindow) {
    terminalWindow.addEventListener(
      "click",
      () => input.focus()
    );
  }
}


/* ============================================================
   RITAM'S RIZZ CORP. INTERNET EXPLORER
   ============================================================ */

let dialupRunning = false;
let dialupTimeouts = [];
let audioCtx = null;


function getAudioCtx() {
  if (!audioCtx) {

    const AC =
      window.AudioContext ||
      window.webkitAudioContext;

    if (AC) {
      audioCtx =
        new AC();
    }
  }

  return audioCtx;
}


function playTone(
  freq,
  duration,
  delay = 0,
  type = "sine",
  gainVal = 0.05
) {
  const ctx =
    getAudioCtx();

  if (!ctx) return;


  const t0 =
    ctx.currentTime +
    delay;


  const osc =
    ctx.createOscillator();

  const gain =
    ctx.createGain();


  osc.type = type;

  osc.frequency.setValueAtTime(
    freq,
    t0
  );


  gain.gain.setValueAtTime(
    0,
    t0
  );

  gain.gain.linearRampToValueAtTime(
    gainVal,
    t0 + 0.02
  );

  gain.gain.linearRampToValueAtTime(
    0,
    t0 + duration
  );


  osc
    .connect(gain)
    .connect(ctx.destination);


  osc.start(t0);

  osc.stop(
    t0 +
    duration +
    0.05
  );
}


function playDialTone() {
  playTone(
    350,
    1.6,
    0,
    "sine",
    0.04
  );

  playTone(
    440,
    1.6,
    0,
    "sine",
    0.04
  );
}


function playDtmf() {

  for (
    let i = 0;
    i < 9;
    i++
  ) {

    playTone(
      600 +
        Math.random() *
          500,
      0.12,
      i * 0.18,
      "square",
      0.03
    );
  }
}


function playHandshakeScreech() {

  const sweeps = [
    1200,
    2100,
    1800,
    2400,
    900,
    2600,
    1500,
    2000
  ];


  sweeps.forEach(
    (f, i) => {

      playTone(
        f,
        0.35,
        i * 0.45,
        i % 2
          ? "square"
          : "sawtooth",
        0.035
      );
    }
  );
}


const DIALUP_STEPS = [
  {
    duration: 2000,
    text:
      "Initializing modem device..."
  },

  {
    duration: 5000,
    text:
      "Dialing Internet Service Provider... ATDT 1-800-555-0199",

    sound: () => {
      playDialTone();

      setTimeout(
        playDtmf,
        900
      );
    }
  },

  {
    duration: 8000,
    text:
      "Handshaking at 33600 bps...",

    sound:
      playHandshakeScreech
  },

  {
    duration: 10000,
    text:
      "Verifying username and password..."
  },

  {
    duration: 10000,
    text:
      "Logging onto network..."
  },

  {
    duration: 10000,
    text:
      "Negotiating DNS server address..."
  },

  {
    duration: 15000,
    text:
      "Establishing dial-up connection..."
  }
];


const DIALUP_TOTAL =
  DIALUP_STEPS.reduce(
    (a, s) =>
      a + s.duration,
    0
  );


function openInternetEngine() {
  openWindow(
    "dialupWindow",
    "task-internet"
  );

  resetDialupUI();
}


function closeInternetEngine() {
  stopDialup();

  closeWindowById(
    "dialupWindow",
    "task-internet"
  );
}


function minimizeInternetEngine() {
  closeWindowById(
    "dialupWindow",
    "task-internet"
  );
}


function resetDialupUI() {
  stopDialup();

  const statusBox =
    $("dialupStatusBox");

  const pct =
    $("dialupPct");

  const connectBtn =
    $("dialupConnectBtn");

  const cancelBtn =
    $("dialupCancelBtn");


  if (statusBox) {
    statusBox.innerHTML =
      `<div>
        Ready to connect. Click "Connect" to access the Internet.
      </div>`;
  }


  if (pct) {
    pct.textContent = "0%";
  }


  buildProgressSegments(
    0
  );


  if (connectBtn) {
    connectBtn.disabled = false;
  }


  if (cancelBtn) {
    cancelBtn.disabled = true;
  }
}


function buildProgressSegments(pct) {
  const wrap =
    $("dialupProgress");

  if (!wrap) return;

  wrap.innerHTML = "";

  const totalSegs = 20;

  const filledSegs =
    Math.round(
      (pct / 100) *
      totalSegs
    );


  for (
    let i = 0;
    i < totalSegs;
    i++
  ) {

    const seg =
      document.createElement("div");

    seg.className =
      "dialup-progress-seg" +
      (
        i < filledSegs
          ? " filled"
          : ""
      );

    wrap.appendChild(seg);
  }
}


function startDialup() {
  if (dialupRunning) {
    return;
  }


  const connectBtn =
    $("dialupConnectBtn");

  const cancelBtn =
    $("dialupCancelBtn");

  const statusBox =
    $("dialupStatusBox");


  dialupRunning = true;


  if (connectBtn) {
    connectBtn.disabled = true;
  }

  if (cancelBtn) {
    cancelBtn.disabled = false;
  }

  if (statusBox) {
    statusBox.innerHTML = "";
  }


  document.body.classList.add(
    "cursor-wait"
  );


  let elapsed = 0;


  DIALUP_STEPS.forEach(
    (step, idx) => {

      const t =
        setTimeout(
          () => {

            if (!dialupRunning) {
              return;
            }

            markStepCurrent(
              idx
            );


            if (step.sound) {
              try {
                step.sound();
              } catch (e) {
                /* Audio failure should not stop the dial-up simulation. */
              }
            }

          },
          elapsed
        );


      dialupTimeouts.push(t);

      elapsed +=
        step.duration;
    }
  );


  const startTime =
    Date.now();


  const progressTimer =
    setInterval(() => {

      if (!dialupRunning) {

        clearInterval(
          progressTimer
        );

        return;
      }


      const pct =
        Math.min(
          100,
          Math.round(
            (
              (Date.now() -
                startTime) /
              DIALUP_TOTAL
            ) *
            100
          )
        );


      const pctEl =
        $("dialupPct");

      if (pctEl) {
        pctEl.textContent =
          pct + "%";
      }


      buildProgressSegments(
        pct
      );


      if (pct >= 100) {
        clearInterval(
          progressTimer
        );
      }

    }, 200);


  dialupTimeouts.push(
    progressTimer
  );


  const finalTimeout =
    setTimeout(
      () => {

        if (!dialupRunning) {
          return;
        }

        finishDialupFailure();

      },
      DIALUP_TOTAL + 300
    );


  dialupTimeouts.push(
    finalTimeout
  );
}


function markStepCurrent(idx) {
  const box =
    $("dialupStatusBox");

  if (!box) return;


  Array.from(
    box.children
  ).forEach((c) => {

    c.classList.replace(
      "step-current",
      "step-done"
    );
  });


  const line =
    document.createElement("div");

  line.className =
    "step-current";


  line.innerHTML =
    `${escapeHtml(
      DIALUP_STEPS[idx].text
    )}<span class="dots"></span>`;


  box.appendChild(line);

  box.scrollTop =
    box.scrollHeight;
}


function stopDialup() {
  dialupRunning = false;


  dialupTimeouts.forEach(
    (t) => {
      clearTimeout(t);
      clearInterval(t);
    }
  );


  dialupTimeouts = [];


  document.body.classList.remove(
    "cursor-wait"
  );
}


function cancelDialup() {
  stopDialup();


  const statusBox =
    $("dialupStatusBox");

  if (statusBox) {
    statusBox.innerHTML +=
      `<div class="step-done">
        Connection cancelled by user.
      </div>`;
  }


  const connectBtn =
    $("dialupConnectBtn");

  const cancelBtn =
    $("dialupCancelBtn");


  if (connectBtn) {
    connectBtn.disabled = false;
  }

  if (cancelBtn) {
    cancelBtn.disabled = true;
  }
}


function finishDialupFailure() {
  stopDialup();


  const box =
    $("dialupStatusBox");


  if (box) {

    Array.from(
      box.children
    ).forEach((c) => {

      c.classList.replace(
        "step-current",
        "step-done"
      );
    });


    box.innerHTML +=
      `<div
        class="step-done"
        style="color:#a00"
      >
        Connection failed.
      </div>`;
  }


  const connectBtn =
    $("dialupConnectBtn");

  const cancelBtn =
    $("dialupCancelBtn");


  if (connectBtn) {
    connectBtn.disabled = false;
  }

  if (cancelBtn) {
    cancelBtn.disabled = true;
  }


  showMessageBox({
    title: "Ritam's Rizz Corp. Internet Explorer",
    icon: ICONS.error,

    text:
      "Failed Accessing the Internet. " +
      "Please Upgrade Software or Try Again Later.",

    buttons: [
      {
        label: "OK",
        primary: true
      }
    ]
  });
}


/* ============================================================
   LIVE WALLPAPER
   ============================================================ */

const MATRIX_CHARS =
  "アイウエオカキクケコサシスセソタチツテト" +
  "ナニヌネノハヒフヘホマミムメモヤユヨ" +
  "ラリルレロワヲン0123456789<>/\\[]{}=+*";


const MATRIX_THEMES = {

  blue: [
    "#cfeeff",
    "#8fd3ff",
    "#5ab4e8",
    "#3a8ee0",
    "#1e6fd6",
    "#1084d0",
    "#0d3c6e"
  ],

  green: [
    "#e2ffe4",
    "#a6ff9e",
    "#6dff5e",
    "#33e02c",
    "#1fae1c",
    "#158515",
    "#0a4a0a"
  ],

  red: [
    "#ffe6e0",
    "#ffb0a3",
    "#ff7a63",
    "#ff4530",
    "#d6231e",
    "#a11712",
    "#5c0c0a"
  ]
};


let mx = {};
let sp = {};

let currentWallpaper =
  "blue";

let wallpaperRAF =
  null;


function stopWallpaperAnimation() {
  if (
    wallpaperRAF !== null
  ) {
    cancelAnimationFrame(
      wallpaperRAF
    );

    wallpaperRAF = null;
  }
}


/* ============================================================
   MATRIX WALLPAPER
   ============================================================ */

function matrixResize() {
  const canvas =
    $("matrixCanvas");

  if (!canvas) return;


  mx.canvas =
    canvas;

  mx.ctx =
    canvas.getContext("2d");


  if (!mx.ctx) return;


  mx.w =
    canvas.width =
      window.innerWidth;

  mx.h =
    canvas.height =
      window.innerHeight;


  mx.fontSize = 16;


  mx.diag =
    Math.ceil(
      Math.hypot(
        mx.w,
        mx.h
      )
    ) +
    mx.fontSize * 6;


  mx.cols =
    Math.floor(
      mx.diag /
      mx.fontSize
    );


  mx.drops =
    new Array(mx.cols)
      .fill(0)
      .map(
        () =>
          Math.random() *
          mx.diag
      );


  mx.speeds =
    new Array(mx.cols)
      .fill(0)
      .map(
        () =>
          (
            0.5 +
            Math.random() *
              1.6
          ) *
          mx.fontSize *
          0.22
      );
}


function matrixFrame() {
  const {
    ctx,
    w,
    h,
    diag,
    cols,
    fontSize,
    drops,
    speeds,
    theme
  } = mx;


  if (
    !ctx ||
    !drops ||
    !speeds ||
    !theme
  ) {
    return;
  }


  ctx.setTransform(
    1,
    0,
    0,
    1,
    0,
    0
  );


  ctx.fillStyle =
    "rgba(1,5,9,0.15)";

  ctx.fillRect(
    0,
    0,
    w,
    h
  );


  ctx.translate(
    w / 2,
    h / 2
  );


  ctx.rotate(
    (135 * Math.PI) /
      180
  );


  ctx.font =
    fontSize +
    "px 'Courier New', monospace";

  ctx.textAlign =
    "center";


  for (
    let i = 0;
    i < cols;
    i++
  ) {

    const x =
      -diag / 2 +
      i * fontSize;

    const y =
      drops[i] -
      diag / 2;


    const isLead =
      Math.random() <
      0.05;


    ctx.fillStyle =
      isLead
        ? theme[0]
        : theme[
            2 +
            Math.floor(
              Math.random() * 5
            )
          ];


    ctx.fillText(
      MATRIX_CHARS[
        Math.floor(
          Math.random() *
            MATRIX_CHARS.length
        )
      ],
      x,
      y
    );


    drops[i] +=
      speeds[i];


    if (
      drops[i] >
      diag
    ) {

      drops[i] =
        -Math.random() *
        diag *
        0.25;


      speeds[i] =
        (
          0.5 +
          Math.random() *
            1.6
        ) *
        fontSize *
        0.22;
    }
  }


  wallpaperRAF =
    requestAnimationFrame(
      matrixFrame
    );
}


function startMatrixWallpaper(
  themeName
) {
  mx.theme =
    MATRIX_THEMES[
      themeName
    ] ||
    MATRIX_THEMES.blue;


  matrixResize();


  wallpaperRAF =
    requestAnimationFrame(
      matrixFrame
    );
}


/* ============================================================
   SPACE WALLPAPER
   ============================================================ */

function spaceResize() {
  const canvas =
    $("matrixCanvas");

  if (!canvas) return;


  sp.canvas =
    canvas;

  sp.ctx =
    canvas.getContext("2d");


  if (!sp.ctx) return;


  sp.w =
    canvas.width =
      window.innerWidth;

  sp.h =
    canvas.height =
      window.innerHeight;


  const area =
    sp.w * sp.h;


  const starCount =
    Math.max(
      90,
      Math.round(
        area / 5500
      )
    );


  const galaxyCount =
    Math.max(
      6,
      Math.round(
        starCount / 9
      )
    );


  sp.stars =
    Array.from(
      {
        length:
          starCount
      },
      () => ({
        x:
          Math.random() *
          sp.w,

        y:
          Math.random() *
          sp.h,

        size:
          1 +
          Math.random() *
            2,

        angle:
          Math.random() *
          Math.PI *
          2,

        rotSpeed:
          (
            Math.random() <
            0.5
              ? -1
              : 1
          ) *
          (
            0.0006 +
            Math.random() *
              0.0018
          ),

        phase:
          Math.random() *
          Math.PI *
          2,

        twinkleSpeed:
          0.0015 +
          Math.random() *
            0.0035
      })
    );


  sp.galaxies =
    Array.from(
      {
        length:
          galaxyCount
      },
      () => ({
        x:
          Math.random() *
          sp.w,

        y:
          Math.random() *
          sp.h,

        size:
          7 +
          Math.random() *
            11,

        tilt:
          Math.random() *
          Math.PI,

        hue:
          [
            "170,150,255",
            "255,255,255",
            "150,195,255",
            "255,200,235"
          ][
            Math.floor(
              Math.random() *
                4
            )
          ],

        phase:
          Math.random() *
          Math.PI *
          2,

        twinkleSpeed:
          0.0005 +
          Math.random() *
            0.001
      })
    );


  sp.meteors = [];
}


function drawStar(
  ctx,
  s,
  t
) {
  const alpha =
    0.3 +
    0.7 *
      (
        0.5 +
        0.5 *
          Math.sin(
            t *
              s.twinkleSpeed +
              s.phase
          )
      );


  const angle =
    s.angle +
    t *
      s.rotSpeed;


  ctx.save();


  ctx.translate(
    s.x,
    s.y
  );


  ctx.rotate(
    angle
  );


  ctx.strokeStyle =
    `rgba(255,255,255,${alpha})`;

  ctx.lineWidth = 1;


  const len =
    s.size *
    2.8;


  ctx.beginPath();


  ctx.moveTo(
    0,
    -len
  );

  ctx.lineTo(
    0,
    len * 0.45
  );


  ctx.moveTo(
    -len * 0.55,
    0
  );

  ctx.lineTo(
    len * 0.55,
    0
  );


  ctx.stroke();


  ctx.fillStyle =
    `rgba(255,255,255,${
      Math.min(
        1,
        alpha + 0.25
      )
    })`;


  ctx.beginPath();

  ctx.arc(
    0,
    0,
    s.size * 0.55,
    0,
    Math.PI * 2
  );

  ctx.fill();


  ctx.restore();
}


function drawGalaxy(
  ctx,
  g,
  t
) {
  const alpha =
    0.12 +
    0.33 *
      (
        0.5 +
        0.5 *
          Math.sin(
            t *
              g.twinkleSpeed +
              g.phase
          )
      );


  const grad =
    ctx.createRadialGradient(
      g.x,
      g.y,
      0,
      g.x,
      g.y,
      g.size
    );


  grad.addColorStop(
    0,
    `rgba(${g.hue},${alpha})`
  );


  grad.addColorStop(
    1,
    `rgba(${g.hue},0)`
  );


  ctx.save();


  ctx.translate(
    g.x,
    g.y
  );


  ctx.rotate(
    g.tilt
  );


  ctx.fillStyle =
    grad;


  ctx.beginPath();


  ctx.ellipse(
    0,
    0,
    g.size,
    g.size * 0.5,
    0,
    0,
    Math.PI * 2
  );


  ctx.fill();


  ctx.restore();
}


function maybeSpawnMeteor() {

  if (
    sp.meteors.length < 2 &&
    Math.random() < 0.006
  ) {

    const fromLeft =
      Math.random() < 0.5;


    const startX =
      fromLeft
        ? -20
        : sp.w + 20;


    const startY =
      Math.random() *
      sp.h *
      0.55;


    const speed =
      6 +
      Math.random() *
        5;


    const dir =
      fromLeft
        ? 1
        : -1;


    sp.meteors.push({
      x: startX,
      y: startY,
      vx:
        dir * speed,
      vy:
        speed * 0.5,
      trail: []
    });
  }
}


function drawMeteors(ctx) {
  maybeSpawnMeteor();


  sp.meteors.forEach(
    (m) => {

      m.trail.push({
        x: m.x,
        y: m.y
      });


      if (
        m.trail.length >
        14
      ) {
        m.trail.shift();
      }


      m.x += m.vx;
      m.y += m.vy;
    }
  );


  sp.meteors =
    sp.meteors.filter(
      (m) =>
        m.x > -40 &&
        m.x <
          sp.w + 40 &&
        m.y <
          sp.h + 40
    );


  sp.meteors.forEach(
    (m) => {

      for (
        let i = 0;
        i <
          m.trail.length -
            1;
        i++
      ) {

        const p1 =
          m.trail[i];

        const p2 =
          m.trail[i + 1];


        const alpha =
          (
            i /
            m.trail.length
          ) *
          0.8;


        ctx.strokeStyle =
          `rgba(255,255,255,${alpha})`;

        ctx.lineWidth =
          1.6;


        ctx.beginPath();

        ctx.moveTo(
          p1.x,
          p1.y
        );

        ctx.lineTo(
          p2.x,
          p2.y
        );

        ctx.stroke();
      }


      ctx.fillStyle =
        "#ffffff";


      ctx.beginPath();


      ctx.arc(
        m.x,
        m.y,
        1.6,
        0,
        Math.PI * 2
      );


      ctx.fill();
    }
  );
}


function spaceFrame(t) {
  const {
    ctx,
    w,
    h,
    stars,
    galaxies
  } = sp;


  if (
    !ctx ||
    !stars ||
    !galaxies
  ) {
    return;
  }


  ctx.setTransform(
    1,
    0,
    0,
    1,
    0,
    0
  );


  ctx.fillStyle =
    "#01030f";


  ctx.fillRect(
    0,
    0,
    w,
    h
  );


  galaxies.forEach(
    (g) =>
      drawGalaxy(
        ctx,
        g,
        t
      )
  );


  stars.forEach(
    (s) =>
      drawStar(
        ctx,
        s,
        t
      )
  );


  drawMeteors(
    ctx
  );


  wallpaperRAF =
    requestAnimationFrame(
      spaceFrame
    );
}


function startSpaceWallpaper() {
  spaceResize();

  wallpaperRAF =
    requestAnimationFrame(
      spaceFrame
    );
}


/* ============================================================
   WALLPAPER SWITCHER
   ============================================================ */

function setWallpaper(mode) {
  const validModes =
    Object.prototype.hasOwnProperty.call(
      WALLPAPER_LABELS,
      mode
    );

  if (!validModes) {
    mode = "solid";
  }


  currentWallpaper =
    mode;


  stopWallpaperAnimation();


  const canvas =
    $("matrixCanvas");

  const video =
    $("jupiterVideo");

  const desktop =
    document.querySelector(
      ".desktop"
    );


  if (!desktop) {
    return;
  }

  document.body.classList.toggle("advanced-tech", mode === "advanced");


  if (video) {
    video.classList.add(
      "hidden"
    );

    try {
      video.pause();
    } catch (e) {
      /* Ignore media errors. */
    }
  }


  if (mode === "solid") {

    if (canvas) {
      canvas.classList.add(
        "hidden"
      );
    }

    desktop.style.background =
      "#008080";


  } else if (mode === "advanced") {

    if (canvas) {
      canvas.classList.add("hidden");
    }

    desktop.style.background = "";

  } else if (
    mode === "jupiter"
  ) {

    if (canvas) {
      canvas.classList.add(
        "hidden"
      );
    }

    desktop.style.background =
      "#000";


    if (video) {

      video.classList.remove(
        "hidden"
      );

      try {
        video.currentTime = 0;
      } catch (e) {
        /* Ignore media seek errors. */
      }


      const playPromise =
        video.play();

      if (
        playPromise &&
        typeof playPromise.catch ===
          "function"
      ) {
        playPromise.catch(
          () => {}
        );
      }
    }


  } else {

    desktop.style.background =
      "";


    if (!canvas) {
      return;
    }


    canvas.classList.remove(
      "hidden"
    );


    if (
      mode === "space"
    ) {

      startSpaceWallpaper();

    } else {

      startMatrixWallpaper(
        mode
      );
    }
  }
}


function initWallpaperResize() {

  window.addEventListener(
    "resize",
    () => {

      if (
        currentWallpaper ===
        "space"
      ) {

        spaceResize();

      } else if (
        currentWallpaper !==
        "solid" &&
        currentWallpaper !==
        "jupiter" &&
        currentWallpaper !==
        "advanced"
      ) {

        matrixResize();
      }
    }
  );
}


/* ============================================================
   INITIALIZATION
   ============================================================ */

async function initializeHWShare() {

  initWallpaperResize();

  setWallpaper("solid");

  await loadPdfIndex();

  render();

  // A newly uploaded PDF appears without editing this script or reloading the tab.
  setInterval(async () => {
    await loadPdfIndex();
    if (current !== "root") render();
  }, 15000);

  updateClock();

  setInterval(
    updateClock,
    1000
  );

  initTerminalInput();


  document.addEventListener(
    "keydown",
    (e) => {

      if (
        e.key ===
        "Escape"
      ) {

        closeWindow();

        closeAllMenus();

        removeCtxMenu();

        removeMessageBox();
      }
    }
  );


  const explorerWindow =
    $("window");

  if (explorerWindow) {

    const titlebar =
      explorerWindow.querySelector(
        ".titlebar"
      );

    makeDraggable(
      explorerWindow,
      titlebar
    );
  }


  const terminalWindow =
    $("terminalWindow");

  if (terminalWindow) {

    const titlebar =
      terminalWindow.querySelector(
        ".titlebar"
      );

    makeDraggable(
      terminalWindow,
      titlebar
    );
  }


  const dialupWindow =
    $("dialupWindow");

  if (dialupWindow) {

    const titlebar =
      dialupWindow.querySelector(
        ".titlebar"
      );

    makeDraggable(
      dialupWindow,
      titlebar
    );
  }
}


/* Start only after the DOM exists. */
if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeHWShare,
    { once: true }
  );

} else {

  initializeHWShare();
}
