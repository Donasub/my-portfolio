// ============================================================
//  PARTICLE BACKGROUND — Portfolio Theme (Red Accent)
// ============================================================

(function() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // ---- CONFIG (matches portfolio red theme) ----
    const PARTICLE_COUNT  = 80;
    const CONNECTION_DIST = 130;
    const CURSOR_DIST     = 160;
    const SPEED           = 0.5;
    const DOT_COLOR       = '#b74b4b';
    const LINE_COLOR      = '183,75,75';  // r,g,b for #b74b4b
    const DOT_RADIUS      = 2.5;
    const LINE_WIDTH      = 0.8;

    let particles = [];
    let mouse = { x: -9999, y: -9999 };
    let W, H;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', () => { resize(); init(); });
    resize();

    function init() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * SPEED,
                vy: (Math.random() - 0.5) * SPEED,
            });
        }
    }
    init();

    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    function draw() {
        ctx.clearRect(0, 0, W, H);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, DOT_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = DOT_COLOR;
            ctx.fill();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DIST) {
                    const alpha = 1 - dist / CONNECTION_DIST;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${LINE_COLOR},${alpha * 0.6})`;
                    ctx.lineWidth = LINE_WIDTH;
                    ctx.stroke();
                }
            }

            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CURSOR_DIST) {
                const alpha = 1 - dist / CURSOR_DIST;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(${LINE_COLOR},${alpha})`;
                ctx.lineWidth = LINE_WIDTH * 1.5;
                ctx.stroke();
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
})();