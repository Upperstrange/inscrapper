export default defineEventHandler(async (event) => {
  const imageUrl = event.context.params?.url;

  if (!imageUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Image URL is required',
    });
  }

  try {
    // Decode the URL if it was encoded by the client
    const decodedImageUrl = decodeURIComponent(imageUrl);

    // Important: Validate the URL to prevent open proxy vulnerabilities
    // For example, only allow specific domains or check for valid image URLs
    if (!isValidImageUrl(decodedImageUrl)) { // You'll need to implement isValidImageUrl
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid image URL provided for proxying.',
        });
    }

    const response = await $fetch.raw(decodedImageUrl, {
      responseType: 'stream' // Fetch as a stream
    });

    // Get content type from the original response
    const contentType = response.headers.get('content-type');
    if (contentType) {
      setHeader(event, 'Content-Type', contentType);
    }
    
    // Set cache control headers if desired
    setHeader(event, 'Cache-Control', 'public, max-age=86400'); // Cache for 1 day

    return response._data; // Send the stream back
  } catch (error: any) {
    console.error('Error proxying image:', error);
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: 'Failed to proxy image',
    });
  }
});

// Example validation function (implement this according to your needs)
function isValidImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    // Example: Only allow images from specific domains
    // const allowedDomains = ['scontent.cdninstagram.com', 'another-trusted-domain.com'];
    // if (!allowedDomains.includes(parsedUrl.hostname)) {
    //   return false;
    // }
    // Check if it looks like an image URL (very basic check)
    return parsedUrl.protocol === 'https:' && /\.(jpeg|jpg|gif|png|webp)$/i.test(parsedUrl.pathname);
  } catch (e) {
    return false;
  }
}