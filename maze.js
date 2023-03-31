const WIDTH = 20;
const HEIGHT = 15;

const maze = new Array(WIDTH);
for (let i = 0; i < WIDTH; i++) {
    maze[i] = new Array(HEIGHT).fill(false);
}

// Initialize the outer edges with walls
for (let i = 0; i < WIDTH; i++) {
    maze[i][0] = true;
    maze[i][HEIGHT - 1] = true;
}
for (let i = 0; i < HEIGHT; i++) {
    maze[0][i] = true;
    maze[WIDTH - 1][i] = true;
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

        if (nx <= 0 || nx >= WIDTH - 1 || ny <= 0 || ny >= HEIGHT - 1 || !maze[nx][ny]) {
            continue;
        }

        const wallX = (nx + x) / 2;
        const wallY = (ny + y) / 2;

        maze[wallX][wallY] = false;

        generateMaze(nx, ny);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start the maze generation at a random even position that's not on the edges
generateMaze(Math.floor(Math.random() * ((WIDTH - 4) / 2)) * 2 + 2, Math.floor(Math.random() * ((HEIGHT - 4) / 2)) * 2 + 2);

function drawMaze(ctx) {
    // Fill the entire canvas with black first
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH * 32, HEIGHT * 32);

    ctx.fillStyle = 'blue';
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            if (maze[x][y]) {
                ctx.fillRect(x * 32, y * 32, 32, 32);
            }
        }
    }
}

function getRandomOpenPosition() {
    let x, y;
    do {
        x = Math.floor(Math.random() * WIDTH);
        y = Math.floor(Math.random() * HEIGHT);
    } while (maze[x][y]);
    return { x: x * 32, y: y * 32 };
}
