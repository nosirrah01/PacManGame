// Handle keyboard events to move Pac-Man
document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 37: // left arrow
            pacman.nextDirection = 'left';
            break;
        case 38: // up arrow
            pacman.nextDirection = 'up';
            break;
        case 39: // right arrow
            pacman.nextDirection = 'right';
            break;
        case 40: // down arrow
            pacman.nextDirection = 'down';
            break;
    }
});