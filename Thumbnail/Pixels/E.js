// This script makes performs a GET call on the Pexels API (https://www.pexels.com/api/documentation/?#photos-search)

// Define the API URL and the authorization key
const apiUrl = "https://api.pexels.com/v1/curated";
const apiKey = "6EdsN9H0AGKaO5qjDly59dWAJJpXaKZf2pc1AfbuaNeSzGyDGJQxcFqK";

// Function to make the GET request
const fetchCuratedPhotos = async () => {
    try {
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

        // Print the JSON data
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Call the function to execute the GET request
fetchCuratedPhotos();