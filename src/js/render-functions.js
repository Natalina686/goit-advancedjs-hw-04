import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector(".gallery");

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function renderGallery(images) {
  clearGallery();

  if (!images.length) {
    return;
  }

  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery__item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>❤️ Likes:</b> ${likes}</p>
          <p><b>👁 Views:</b> ${views}</p>
          <p><b>💬 Comments:</b> ${comments}</p>
          <p><b>⬇️ Downloads:</b> ${downloads}</p>
        </div>
      </li>
    `
    )
    .join("");

  galleryContainer.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}


export function clearGallery() {
  galleryContainer.innerHTML = "";
}
