// ===============================
// EDIT THESE SETTINGS
// ===============================

// Set your 4-digit code here.
// Numbers only, exactly 4 characters.
const UNLOCK_CODE = "1111";

// Add up to 8 photo filenames.
// Put those files inside the /assets folder.
// Example: "photo1.jpg", "photo2.jpg", etc.
const PHOTOS = [
  "photo1.jpg",
  "photo2.jpg",
  "photo3.jpg",
  "photo4.jpg",
  "photo5.jpg",
  "photo6.jpg",
  "photo7.jpg",
  "photo8.jpg"
];

// Lantern count. Increase/decrease if you want.
const LANTERN_COUNT = 26;

// ===============================
// APP
// ===============================

const giftButton = document.getElementById("giftButton");
const lockModal = document.getElementById("lockModal");
const closeLock = document.getElementById("closeLock");
const pinDots = document.getElementById("pinDots");
const pinError = document.getElementById("pinError");
const sceneGift = document.getElementById("sceneGift");
const sceneLetter = document.getElementById("sceneLetter");
const lanternLayer = document.getElementById("lanternLayer");
const photoStrip = document.getElementById("photoStrip");

let entered = "";
let drag = null;

// Lanterns
function makeLanterns() {
  lanternLayer.innerHTML = "";

  for (let i = 0; i < LANTERN_COUNT; i++) {
    const img = document.createElement("img");
    img.className = "lantern";
    img.src = "assets/lantern.png";
    img.alt = "";
    img.draggable = false;

    const size = 38 + Math.random() * 78;
    const left = Math.random() * 100;
    const duration = 16 + Math.random() * 25;
    const delay = -(Math.random() * duration);
    const sway = `${-50 + Math.random() * 100}px`;
    const opacity = .35 + Math.random() * .55;

    img.style.setProperty("--size", `${size}px`);
    img.style.setProperty("--left", `${left}%`);
    img.style.setProperty("--duration", `${duration}s`);
    img.style.setProperty("--delay", `${delay}s`);
    img.style.setProperty("--sway", sway);
    img.style.setProperty("--opacity", opacity.toFixed(2));

    img.addEventListener("pointerdown", startDrag);
    lanternLayer.appendChild(img);
  }
}

function startDrag(e) {
  const el = e.currentTarget;
  el.setPointerCapture?.(e.pointerId);
  el.classList.add("dragging");

  const rect = el.getBoundingClientRect();
  drag = {
    el,
    pointerId: e.pointerId,
    offsetX: e.clientX - rect.left,
    offsetY: e.clientY - rect.top
  };
  el.style.position = "fixed";
  el.style.left = `${rect.left}px`;
  el.style.top = `${rect.top}px`;
  el.style.bottom = "auto";
}

function moveDrag(e) {
  if (!drag || e.pointerId !== drag.pointerId) return;
  const el = drag.el;
  el.style.left = `${e.clientX - drag.offsetX}px`;
  el.style.top = `${e.clientY - drag.offsetY}px`;
}

function endDrag(e) {
  if (!drag || e.pointerId !== drag.pointerId) return;
  drag.el.classList.remove("dragging");
  drag.el.releasePointerCapture?.(e.pointerId);
  drag = null;
}

window.addEventListener("pointermove", moveDrag);
window.addEventListener("pointerup", endDrag);
window.addEventListener("pointercancel", endDrag);

// Lock modal
function openLock() {
  entered = "";
  updateDots();
  pinError.textContent = "";
  lockModal.classList.remove("hidden");
}

function closeLockModal() {
  lockModal.classList.add("hidden");
}

giftButton.addEventListener("click", openLock);
closeLock.addEventListener("click", closeLockModal);

lockModal.addEventListener("click", (e) => {
  if (e.target === lockModal) closeLockModal();
});

function updateDots() {
  pinDots.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    const dot = document.createElement("span");
    dot.className = "pin-dot" + (i < entered.length ? " filled" : "");
    pinDots.appendChild(dot);
  }
}

function pressKey(key) {
  pinError.textContent = "";

  if (key === "clear") {
    entered = "";
    updateDots();
    return;
  }

  if (key === "ok") {
    checkCode();
    return;
  }

  if (!/^\d$/.test(key)) return;
  if (entered.length >= 4) return;

  entered += key;
  updateDots();

  if (entered.length === 4) {
    setTimeout(checkCode, 120);
  }
}

function checkCode() {
  if (entered === UNLOCK_CODE) {
    unlock();
  } else {
    pinError.textContent = "Not quite, sweetheart ♡";
    entered = "";
    updateDots();
  }
}

document.querySelectorAll(".key").forEach(btn => {
  btn.addEventListener("click", () => pressKey(btn.dataset.key));
});

function unlock() {
  lockModal.classList.add("hidden");
  sceneGift.classList.remove("active");
  sceneLetter.classList.add("active");
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  buildPhotos();
}

// Photos
function buildPhotos() {
  photoStrip.innerHTML = "";

  PHOTOS.forEach((filename, index) => {
    const frame = document.createElement("div");
    frame.className = "photo-frame";
    frame.style.setProperty("--rot", `${index % 2 === 0 ? -1.4 : 1.4}deg`);

    const img = document.createElement("img");
    img.src = `assets/${filename}`;
    img.alt = `Memory photo ${index + 1}`;
    img.loading = "lazy";

    frame.appendChild(img);
    photoStrip.appendChild(frame);
  });
}

makeLanterns();
buildPhotos();
