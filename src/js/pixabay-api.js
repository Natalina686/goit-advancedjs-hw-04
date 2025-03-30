const API_KEY = "49581187-5d65d3ee1f3e1ec6c0e5655f7";

const BASE_URL = "https://pixabay.com/api/";

export async function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}
