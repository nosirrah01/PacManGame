const WIDTH = 27;
const HEIGHT = 31;

const maze = new Array(WIDTH);
for (let i = 0; i < WIDTH; i++) {
    maze[i] = new Array(HEIGHT).fill(true);
}

function generateMaze(x, y) {
    maze[x][y] = false;

    const directions = shuffle([
        { dx: -2, dy: 0 }, // left
        { dx: 2, dy: 0 },  // right
        { dx: 0, dy: -2 }, // up
        { dx: 0, dy: 2 },  // down
    ]);

    for (let d of directions) {
        const nx = x + d.dx;
        const ny = y + d.dy;

        // Skip if it's on the edge or if the next position is already visited
        if (nx <= 0 || nx >= WIDTH - 1 || ny <= 0 || ny >= HEIGHT - 1 || !maze[nx][ny]) {
            continue;
        }

        // Skip if it's the right edge (to keep thickness at 1)
        if (nx === WIDTH - 2 && x === WIDTH - 3) {
            continue;
        }

        const wallX = (nx + x) / 2;
        const wallY = (ny + y) / 2;

        maze[wallX][wallY] = false;

        generateMaze(nx, ny);
    }
}

//function initMaze() {
//    // Clear the maze array
//    for (let i = 0; i < WIDTH; i++) {
//        maze[i].fill(true);
//    }

//    // Generate a new maze
//    generateMaze(
//        Math.floor(Math.random() * ((WIDTH - 4) / 2)) * 2 + 3,
//        Math.floor(Math.random() * ((HEIGHT - 4) / 2)) * 2 + 3
//    );
//}

//function initMaze() {
//    generateMaze(Math.floor(Math.random() * ((WIDTH - 4) / 2)) * 2 + 3, Math.floor(Math.random() * ((HEIGHT - 4) / 2)) * 2 + 3);
//}

function clearMaze() {
    // Clear the maze array
    for (let i = 0; i < WIDTH; i++) {
        maze[i].fill(true);
    }
}

function initMaze() {
    // Generate a new maze
    generateMaze(
        Math.floor(Math.random() * ((WIDTH - 4) / 2)) * 2 + 3,
        Math.floor(Math.random() * ((HEIGHT - 4) / 2)) * 2 + 3
    );
}

initMaze();

function drawMaze(ctx) {
    // Fill the entire canvas with black first
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH * 32, HEIGHT * 32);

    ctx.fillStyle = 'rgb(0, 0, 110)';
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            if (maze[x][y]) {
                ctx.fillRect(x * 32, y * 32, 32, 32);
            }
        }
    }
}
