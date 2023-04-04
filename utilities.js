function isWall(x, y) {
    // Check if the given position is inside the canvas
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
        return true;
    }

    // Check if it's a wall in the maze
    return maze[Math.floor(x / 32)][Math.floor(y / 32)];
}