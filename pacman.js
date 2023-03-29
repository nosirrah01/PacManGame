const PACMAN_SPEED = 2;
let pacman = { x: 0, y: 0, direction: 'right' };

// Handle keyboard events to move Pac-Man
document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 37: // left arrow
            pacman.direction = 'left';
            break;
        case 38: // up arrow
            pacman.direction = 'up';
            break;
        case 39: // right arrow
            pacman.direction = 'right';
            break;
        case 40: // down arrow
            pacman.direction = 'down';
            break;
    }
});

// Update Pac-Man's position and draw it on the canvas
function updatePacman() {
    switch (pacman.direction) {
        case 'left':
            pacman.x -= PACMAN_SPEED;
            break;
        case 'up':
            pacman.y -= PACMAN_SPEED;
            break;
        case 'right':
            pacman.x += PACMAN_SPEED;
            break;
        case 'down':
            pacman.y += PACMAN_SPEED;
            break;
    }

    // Prevent Pac-Man from going out of bounds
    if (pacman.x < 0) pacman.x = 0;
    if (pacman.y < 0) pacman.y = 0;
    if (pacman.x > canvas.width - 32) pacman.x = canvas.width - 32;
    if (pacman.y > canvas.height - 32) pacman.y = canvas.height - 32;

    // Draw Pac-Man on the canvas
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(pacman.x + 16, pacman.y + 16, 16, 0.25 * Math.PI, 1.75 * Math.PI);
    ctx.lineTo(pacman.x + 16, pacman.y + 16);
    ctx.closePath();
    ctx.fill();
}
