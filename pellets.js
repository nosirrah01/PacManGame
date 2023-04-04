let pellets = [];
let powerPellets = [];

// Create the pellets and power pellets
function createPellets() {
    for (let x = 1; x < maze.length - 1; x++) {
        for (let y = 1; y < maze[0].length - 1; y++) {
            if (!maze[x][y]) {
                if ((x + y) % 10 === 0) {
                    powerPellets.push({ x: x * 32 + 8, y: y * 32 + 8, eaten: false });
                } else {
                    pellets.push({ x: x * 32 + 8, y: y * 32 + 8, eaten: false });
                }
            }
        }
    }
}



// Check if Pac-Man has collected a pellet or power pellet
function checkPellets() {
    for (let pellet of pellets) {
        if (!pellet.eaten && distance(pacman.x + 16, pacman.y + 16, pellet.x, pellet.y) < 16) {
            pellet.eaten = true;
            score += 10;
        }
    }

    for (let powerPellet of powerPellets) {
        if (!powerPellet.eaten && distance(pacman.x + 16, pacman.y + 16, powerPellet.x, powerPellet.y) < 16) {
            powerPellet.eaten = true;
            score += 50;
            scareGhosts();
        }
    }
}

// Scare the ghosts for a short period of time
function scareGhosts() {
    for (let ghost of ghosts) {
        ghost.mode = 'frightened';
        ghost.scaredTimer = 1000;
    }
}

// Update the scared timer for the ghosts
function updateScaredTimer() {
    for (let ghost of ghosts) {
        if (ghost.mode === 'frightened') {
            ghost.scaredTimer--;
            if (ghost.scaredTimer === 0) {
                ghost.mode = 'scatter';
            }
        }
    }
}

// Helper function to calculate the distance between two points
function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

function drawPellets() {
    ctx.fillStyle = 'white';

    for (let pellet of pellets) {
        if (!pellet.eaten) {
            ctx.beginPath();
            ctx.arc(pellet.x + 8, pellet.y + 8, 4, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }
    }

    for (let powerPellet of powerPellets) {
        if (!powerPellet.eaten) {
            ctx.beginPath();
            ctx.arc(powerPellet.x + 8, powerPellet.y + 8, 8, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }
    }
}
