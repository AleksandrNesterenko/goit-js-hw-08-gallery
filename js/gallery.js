import galleryItems from '../app.js'

const getImagesGallery = document.querySelector('.js-gallery');
const getLightBox = document.querySelector('.js-lightbox');
const getLightBoxImage = document.querySelector('.lightbox__image');

const btnClose = document.querySelector('[data-action="close-lightbox"]');
const getLightBoxOverlay = document.querySelector('.lightbox__overlay');
const imagesMarkup = createImagesMarkup(galleryItems);
getImagesGallery.insertAdjacentHTML('beforeend', imagesMarkup);

function createImagesMarkup(images) {
    return images.map(({ preview, original, description }, index) => {
        return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" data-index="${index}" />
  </a>
</li>`;  
     }).join('');
}

function onOpenBtnClick(event) {
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    event.preventDefault();
    getLightBox.classList.add('is-open');
    onOpenModal(event);
}

function onOpenModal(event) {
  getLightBoxImage.src = event.target.dataset.source;
  getLightBoxImage.alt = event.target.alt;
  getLightBoxImage.dataset.index = event.target.dataset.index;
}

function onCloseBtnClick(event) {
  getLightBox.classList.remove('is-open');
  getLightBoxImage.src = "";
    
    
}
function setNewSrc(step, index) {
  getLightBoxImage.dataset.index = `${index + step}`
  getLightBoxImage.src = galleryItems[index + step].original
}

function arrowLeft() {
  let index = Number(getLightBoxImage.dataset.index)
  if (index === 0) {
    setNewSrc(0, galleryItems.length - 1)
    return;
  }
  // console.log(index);
  setNewSrc(-1, index)
}

function arrowRight() {
  let index = +getLightBoxImage.dataset.index
  if (index === galleryItems.length - 1) {
    setNewSrc(0, 0)
    return;
  }
  // console.log(index);
  setNewSrc(1, index)
}

getImagesGallery.addEventListener('click', onOpenBtnClick);
btnClose.addEventListener('click', onCloseBtnClick);
getLightBoxOverlay.addEventListener('click', onCloseBtnClick);

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        onCloseBtnClick(event);
    }

    if (event.key === "ArrowLeft") {
    arrowLeft();
    }
    
    if (event.key === "ArrowRight") {
    arrowRight();
    }
})