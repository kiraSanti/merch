// This script takes the json response from Pexels and returns a json with only the "large2x" URLs

const jsonData = `INSERT REPONSE FROM PEXELS API`;

const data = JSON.parse(jsonData); // Parse the JSON string into a JavaScript object

// Map through the photos and extract the large2x URLs
const large2xUrls = data.photos.map(photo => photo.src.large2x);

// Print the result as a JSON array
console.log(JSON.stringify(large2xUrls, null, 2));