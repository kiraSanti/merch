// This script makes a GET call on the Pexels API (https://www.https://www.pexels.com/api/documentation)
// Filters the results to have only the 'id' 'large2x' and 'url' fields
// Automatically downloads a .json file into the local machine with the results
// removes the '[' ']' symbols from the downloaded/printed json, and adds a ',' at the end of it


//Calls
//curated: https://api.pexels.com/v1/curated?page=10&per_page=80
//search: https://api.pexels.com/v1/search?page=100&per_page=80&query=animals 

// Define the API URL and the authorization key
//change only the '?page' (eq or > 100), and the 'query', as changing the 'per_page' (80) doesn't really make a difference (the # of photos retrieved won't ever be higher than 80)



const apiKey = "6EdsN9H0AGKaO5qjDly59dWAJJpXaKZf2pc1AfbuaNeSzGyDGJQxcFqK";

let page = 1;
const perPage = 80;
const query = 'sea animals';
const numberOfPagesToCall = 100;

// Initialize photoLinks to accumulate formatted results
let photoLinks = '';

// Function to make the GET request
const fetchPhotos = async () => {
    try {
        // Construct the API URL using the current page value
        const apiUrl = `https://api.pexels.com/v1/search?page=${page}&per_page=${perPage}&query=${encodeURIComponent(query)}`;
        
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': apiKey
            }
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Map through the photos and extract the id, large2x URL, and url
        const photosArray = data.photos.map(photo => ({
            id: photo.id,
            large2x: photo.src.large2x,
            url: photo.url
        }));

        // Create the desired format without brackets
        const formattedPhotos = photosArray.map(photo => JSON.stringify(photo, null, 2)).join(',\n');

        // Accumulate the formatted photos into photoLinks variable
        photoLinks += formattedPhotos + ',\n'; // Adding a comma and newline for readability

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Function to download the JSON file
const downloadJsonFile = (data) => {
    // Create a Blob from the JSON string
    const jsonBlob = new Blob([data], { type: 'application/json' });

    // Create a link and set the URL to the Blob
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'photoLinks.json'; // Set the filename

    // Append to body, click the link to trigger download, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke the object URL after download
    URL.revokeObjectURL(url);
};

// Main function to fetch photos multiple times
const fetchNDownloadPhotos = async () => {
    while (page <= numberOfPagesToCall) {
        await fetchPhotos(); // Fetch the photos for the current page
        page++; // Increment page for the next call
    }
    
    // Print the accumulated results after all pages have been fetched
    console.log(photoLinks);

    // Automatically download photoLinks as a JSON file
    downloadJsonFile(photoLinks);
};



// Call the main function to execute the fetching
fetchNDownloadPhotos();