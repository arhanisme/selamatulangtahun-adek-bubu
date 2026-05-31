function nextPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page" + page).classList.add("active");

  if (page === 2) startConfetti();
}

function playMusic() {
  const music = document.getElementById("bgMusic");
  music.play().catch(() => {
    console.log("User interaction required for audio autoplay");
  });
}

/* CONFETTI SIMPLE */
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = [];

  for (let i = 0; i < 100; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 10
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff4d6d";

    pieces.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    update();
    requestAnimationFrame(draw);
  }

  function update() {
    pieces.forEach(p => {
      p.y += Math.cos(p.d) + 2;
      if (p.y > canvas.height) {
        p.y = 0;
        p.x = Math.random() * canvas.width;
      }
    });
  }

  draw();
}