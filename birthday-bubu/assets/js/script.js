
// ==============================
// MUSIC SYSTEM
// ==============================

const audio = document.getElementById("bgm");

let musicStarted = false;

// init audio
function initMusic() {
  if (!audio) return;

  audio.loop = true;
  audio.volume = 1.0;
  audio.muted = false;
  audio.load();
}

// play music
function playMusic() {
  if (!audio) return;

  audio.play()
    .then(() => {
      musicStarted = true;
      updateMusicButton();
    })
    .catch(err => {
      console.log("Play blocked:", err);
    });
}

// pause music
function pauseMusic() {
  if (!audio) return;

  audio.pause();
  updateMusicButton();
}

// toggle music
function toggleMusic() {
  if (!audio) return;

  if (audio.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
}

// start once on first interaction
function startMusicOnce() {
  if (musicStarted) return;
  playMusic();
}

// auto trigger on user interaction
document.addEventListener("click", startMusicOnce);
document.addEventListener("touchstart", startMusicOnce, { once: true });


// ==============================
// MUSIC BUTTON UI UPDATE
// ==============================

function updateMusicButton() {
  const btn = document.getElementById("musicBtn");
  if (!btn) return;

  btn.textContent = audio && audio.paused ? "▶️" : "⏸️";
}


// ==============================
// NAVIGATION
// ==============================

function goPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

  const target = document.getElementById("page" + page);
  if (target) target.classList.add("active");

  startMusicOnce();

  if (page === 2) startConfetti();
}



// ==============================
// CONFETTI (SOFT / LOW INTENSITY)
// ==============================

const canvas = document.getElementById("confetti");
const ctx = canvas ? canvas.getContext("2d") : null;

let pieces = [];
let running = false;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function startConfetti() {
  if (!canvas || !ctx) return;

  resizeCanvas();

  pieces = [];
  running = true;

  // 🔥 DIKURANGI: sebelumnya 120 -> sekarang 40 saja
  for (let i = 0; i < 40; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 4 + 2,   // lebih kecil
      speed: Math.random() * 1.2 + 0.5, // lebih lambat
      drift: Math.random() * 0.5 - 0.25  // gerakan samping halus
    });
  }

  animate();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 122, 162, 0.7)"; // lebih soft
    ctx.fill();
  });
}

function update() {
  pieces.forEach(p => {
    p.y += p.speed;
    p.x += p.drift;

    // reset pelan
    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });
}

function animate() {
  if (!running) return;

  draw();
  update();
  requestAnimationFrame(animate);
}


// ==============================
// INIT
// ==============================

window.addEventListener("load", () => {
  initMusic();
  resizeCanvas();
});