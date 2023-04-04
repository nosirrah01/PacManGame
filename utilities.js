function isWall(x, y) {
    // Check if the given position is inside the canvas
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
        return true;
    }

    // Check if it's a wall in the maze
    return maze[Math.floor(x / 32)][Math.floor(y / 32)];
}

// Helper function to calculate the distance between two points
function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}