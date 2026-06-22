document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('celebrate-btn');
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Confetti physics
    let particles = [];
    let isCelebrating = false;
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#3b82f6', '#10b981'];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 10 + 5;
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 5 + 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = 1;
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (isCelebrating) {
            // continuously add particles to keep the party going
            for (let i = 0; i < 3; i++) {
                particles.push(new Particle());
            }
        }
        
        // Remove particles that have fallen off the screen
        particles = particles.filter(p => p.y < canvas.height + 20);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        if (particles.length > 0 || isCelebrating) {
            animationId = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationId);
        }
    }

    function toggleConfetti() {
        isCelebrating = true;
        if (!animationId) {
            animate();
        }
    }


    // Button Interaction
    btn.addEventListener('click', () => {
        toggleConfetti();
    });
});
