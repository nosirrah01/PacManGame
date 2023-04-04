function isWall(x, y) {
    // Check if the given position is inside the canvas
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
        return true;
    }

    // Check if it's a wall in the maze
    return maze[Math.floor(x / 32)][Math.floor(y / 32)];
}

function getRandomOpenPosition() {
    let x, y;
    do {
        x = Math.floor(Math.random() * WIDTH);
        y = Math.floor(Math.random() * HEIGHT);
    } while (maze[x][y]);
    return { x: x * 32, y: y * 32 };
}

// Helper function to calculate the distance between two points
function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}