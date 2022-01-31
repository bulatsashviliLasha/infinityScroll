const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
// Unsplash API
const count = 30;
const apiKey = "T3g_KysZqo9DMEVybdsq2MHNN99ng3YggnENDIzJiJA";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set attributes on DOM
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    /*  item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank"); */
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Event listener
    // Create <img> for photo
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener , check when each is finished loading
    img.addEventListener("load", imageLoaded);
    /*  put together img inside a */
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const responsve = await fetch(apiUrl);
    photosArray = await responsve.json();
    displayPhotos();
  } catch (error) {
    // Catch error
  }
}
getPhotos();
/* Check to see if scrolling near bottom of page */
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
