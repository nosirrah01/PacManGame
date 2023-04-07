function levelUp() {
    console.log('Level up!');

    // Clear the old maze
    clearMaze();

    // Regenerate the maze
    initMaze();

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

    // Respawn ghosts
    respawnGhosts();
}
