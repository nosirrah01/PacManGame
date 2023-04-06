document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const randomNumber = Math.floor(Math.random() * 10); // Generate a random number between 0 and 9.
    body.style.backgroundImage = `url('backgrounds/image${randomNumber}.jpeg')`;
    body.style.backgroundSize = '728px 408px';
});
