// Declare the variable outside of the fetch call.
let imageUrls = []; 

// Fetch the JSON file
fetch('photoLinks.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON data
    })
    .then(data => {
        imageUrls = data; // Assign the parsed data to imageUrls
        console.log(imageUrls); // Now you can use imageUrls in your code
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

// //START PHOTOS
// // Do not delete this first image id 800330 as it is Kirita!
// const imageUrls = [
//     // Do not delete this first image as it is shown as the first image always
//   {
//     "id": 800330,
//     "large2x": "https://images.pexels.com/photos/800330/pexels-photo-800330.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//     "url": "https://www.pexels.com/photo/dog-with-brown-faux-fur-headband-800330/"
//   },
//     // Add images...
// ];
// //FINISH PHOTOS



let currentIndex = 0;
const imageElement = document.getElementById('pexelsThumbnail');
const displayDuration = 3000; // 3 seconds

function shuffleArrayExceptFirst(array) {
    for (let i = array.length - 1; i > 1; i--) {
        const j = Math.floor(Math.random() * (i - 1)) + 1;
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

function showNextImage() {
    if (currentIndex >= imageUrls.length) {
        currentIndex = 1;
        shuffleArrayExceptFirst(imageUrls); // Shuffle the array items except the first one when starting over
    }
    const nextImage = imageUrls[currentIndex];
    imageElement.src = nextImage.large2x;
    imageElement.onclick = () => {
        window.open(nextImage.url, '_blank'); // Opens the URL in a new tab
    };
    currentIndex++;
}

window.onload = () => {
    shuffleArrayExceptFirst(imageUrls); // Shuffle once when the page loads, except for the first item
    showNextImage(); // Show the first image immediately
    setInterval(showNextImage, displayDuration);
};