function levelUp() {
    console.log('Level up!');

    // Regenerate the maze
    generateMaze(Math.floor(Math.random() * ((WIDTH - 4) / 2)) * 2 + 3, Math.floor(Math.random() * ((HEIGHT - 4) / 2)) * 2 + 3);

    // Recreate pellets and power pellets
    pellets = [];
    powerPellets = [];
    createPellets();

    // Reset Pac-Man's position
    pacmanStartPosition = getRandomOpenPosition();
    pacman.x = pacmanStartPosition.x;
    pacman.y = pacmanStartPosition.y;
    pacman.prevX = pacmanStartPosition.x;
    pacman.prevY = pacmanStartPosition.y;

    // Reset ghosts' positions
    for (let ghost of ghosts) {
        let startPosition = getRandomOpenPosition();
        ghost.x = startPosition.x;
        ghost.y = startPosition.y;
        ghost.mode = 'scatter';
    }
}
