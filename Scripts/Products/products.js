const imageElement = document.getElementById('dogImage');
let currentIndex = 1;
const totalImages = 8;
let timeElapsed = 0; // Timer to track time since last update

function updateImage() {
    // If '1.png' is currently displayed, wait for 2 seconds
    if (currentIndex === 1) {
        timeElapsed += 150; // Increment elapsed time by 0.5 sec
        if (timeElapsed < 450) { // 2000ms for '1.png'
            return; // Don't change the image
        } else {
            // Reset the timer for subsequent images
            timeElapsed = 0;
        }
    } else {
        timeElapsed = 0; // Reset timer for other images
    }

    currentIndex++;
    if (currentIndex > totalImages) {
        currentIndex = 1; // Reset index after 8
    }
    imageElement.src = `https://raw.githubusercontent.com/kiraSanti/kirasanart.com/refs/heads/main/Assets/Perrito/${currentIndex}.png`;
}

setInterval(updateImage, 150); // Call updateImage every 0.5 seconds