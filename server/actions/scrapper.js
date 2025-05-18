export async function getImageSrc(reelUrl) {
  try {
    // Ensure the server is running on localhost:3000 or your configured port
    const apiUrl = `http://localhost:8000/api/image-src?pageUrl=${encodeURIComponent(reelUrl)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.imageUrl; // This is the scraped image source URL

  } catch (error) {
    console.error('Failed to fetch image:', error);
    // Handle error appropriately in your frontend application
  }
}