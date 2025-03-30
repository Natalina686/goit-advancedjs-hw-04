import { fetchImages } from "./js/pixabay-api.js";
import { renderGallery, clearGallery } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const searchForm = document.querySelector(".form"); // Виправлено
const loader = document.querySelector(".loader");
const galleryContainer = document.querySelector(".gallery");


searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = event.target.elements.query.value.trim();
  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search query!",
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const images = await fetchImages(query);
    if (images.length === 0) {
      iziToast.error({
        title: "Error",
        message: "Sorry, there are no images matching your search query. Please try again!",
      });
    } else {
      renderGallery(images);
    }
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later!",
    });
  } finally {
    hideLoader();
  }
});

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}


