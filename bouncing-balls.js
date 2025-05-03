class Ball {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.radius = Math.random() * 20 + 10;
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
        this.dx = (Math.random() - 0.5) * 8;
        this.dy = (Math.random() - 0.5) * 8;
        this.colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    update() {
        if (this.x + this.radius > this.canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > this.canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

function init() {
    const canvas = document.getElementById('bouncingCanvas');
    const ctx = canvas.getContext('2d');
    const balls = [];
    const numBalls = 10;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 200;

    // Create balls
    for (let i = 0; i < numBalls; i++) {
        balls.push(new Ball(canvas));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw border
        ctx.strokeStyle = '#ff00ff';
        ctx.lineWidth = 3;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        balls.forEach(ball => ball.update());
        requestAnimationFrame(animate);
    }

    animate();
}

// Start animation when the page loads
window.onload = init; 