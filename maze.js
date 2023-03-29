const WIDTH = 20;
const HEIGHT = 15;

// Create a 2D array to represent the maze
const maze = new Array(WIDTH);
for (let i = 0; i < WIDTH; i++) {
    maze[i] = new Array(HEIGHT).fill(true);
}

// Recursive backtracking algorithm to generate the maze
function generateMaze(x, y) {
    maze[x][y] = false;

    const directions = shuffle([
        { dx: -1, dy: 0 }, // left
        { dx: 1, dy: 0 },  // right
        { dx: 0, dy: -1 }, // up
        { dx: 0, dy: 1 },  // down
    ]);

    for (let d of directions) {
        const nx = x + d.dx;
        const ny = y + d.dy;

        if (nx < 0 || nx >= WIDTH || ny < 0 || ny >= HEIGHT || !maze[nx][ny]) {
            continue;
        }

        const wallX = (nx + x + 1) / 2;
        const wallY = (ny + y + 1) / 2;

        maze[wallX][wallY] = false;

        generateMaze(nx, ny);
    }
}

// Helper function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start the maze generation at a random position
generateMaze(Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT));

// Add a function to draw the maze
function drawMaze(ctx) {
    ctx.fillStyle = 'blue';
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            if (maze[x][y]) {
                ctx.fillRect(x * 32, y * 32, 32, 32);
            }
        }
    }
}