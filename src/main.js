import { fetchImages, setPage, getTotalHits, getPage } from "./js/pixabay-api.js";
import { renderGallery, clearGallery } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const searchForm = document.querySelector(".form"); 
const loader = document.querySelector(".loader");
const galleryContainer = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

let currentQuery = "";

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

  currentQuery = query;
  setPage(1);
  clearGallery();
  loadMoreBtn.classList.add("hidden");
  showLoader();

  try {
    const images = await fetchImages(currentQuery);
    if (images.length === 0) {
      iziToast.error({
        title: "Error",
        message: "Sorry, there are no images matching your search query. Please try again!",
      });
    } else {
      renderGallery(images);
      loadMoreBtn.classList.toggle("hidden", images.length < 15);
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

loadMoreBtn.addEventListener("click", async () => {
  setPage(getPage() + 1);
  showLoader();

  try {
    const images = await fetchImages(currentQuery);
    renderGallery(images);
    const totalHits = getTotalHits();
    const loadedImages = document.querySelectorAll(".gallery__item").length;

    if (loadedImages >= totalHits) {
      loadMoreBtn.classList.add("hidden");
      iziToast.info({
        title: "Info",
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    smoothScroll();
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

function smoothScroll() {
  const cardHeight = document.querySelector(".gallery__item")?.getBoundingClientRect().height || 0;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}
