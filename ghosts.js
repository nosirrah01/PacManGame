const GHOST_SPEED = 2;
const ghostColors = ['red', 'pink', 'cyan', 'orange'];
let ghosts = [];

// Create the ghosts and their movement patterns
function createGhosts() {
    for (let i = 0; i < ghostColors.length; i++) {
        ghosts.push({
            x: (i + 1) * 64,
            y: 3 * 64,
            color: ghostColors[i],
            targetX: null,
            targetY: null,
            direction: 'left',
            mode: 'scatter',
            scaredTimer: 0,
        });
    }
}

// Update the ghosts' position and draw them on the canvas
function updateGhosts() {
    for (let ghost of ghosts) {
        // Choose the ghost's target tile based on its mode
        if (ghost.mode === 'scatter') {
            ghost.targetX = 0;
            ghost.targetY = 0;
        } else {
            // Implement other modes, such as chase or frightened
        }

        // Calculate the ghost's movement direction
        const dx = ghost.targetX - ghost.x;
        const dy = ghost.targetY - ghost.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
            const vx = dx / dist;
            const vy = dy / dist;
            ghost.direction = getDirection(vx, vy);
        }

        // Update the ghost's position based on its direction and speed
        switch (ghost.direction) {
            case 'left':
                ghost.x -= GHOST_SPEED;
                break;
            case 'up':
                ghost.y -= GHOST_SPEED;
                break;
            case 'right':
                ghost.x += GHOST_SPEED;
                break;
            case 'down':
                ghost.y += GHOST_SPEED;
                break;
        }

        // Draw the ghost on the canvas
        ctx.fillStyle = ghost.color;
        ctx.beginPath();
        ctx.arc(ghost.x + 16, ghost.y + 16, 16, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}

// Helper function to get the movement direction from a velocity vector
function getDirection(vx, vy) {
    if (vx < 0 && Math.abs(vx) > Math.abs(vy)) return 'left';
    if (vx > 0 && Math.abs(vx) > Math.abs(vy)) return 'right';
    if (vy < 0 && Math.abs(vy) > Math.abs(vx)) return 'up';
    if (vy > 0 && Math.abs(vy) > Math.abs(vx)) return 'down';
}
