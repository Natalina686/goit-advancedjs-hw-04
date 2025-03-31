import axios from "axios";

const API_KEY = "49581187-5d65d3ee1f3e1ec6c0e5655f7";
const BASE_URL = "https://pixabay.com/api/";
let page = 1;
const perPage = 15;
let totalHits = 0;

export async function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    totalHits = response.data.totalHits;
    return response.data.hits;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

export function setPage(newPage) {
  page = newPage;
}

export function getPage() {
  return page;
}


export function getTotalHits() {
  return totalHits;
}
