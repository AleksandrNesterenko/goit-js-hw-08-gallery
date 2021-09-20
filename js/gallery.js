import galleryItems from '../app.js'


const getImagesGallery = document.querySelector('.js-gallery');
const lightBox = document.querySelector('.js-lightbox');
const lightBoxImage = document.querySelector('.lightbox__image');

const btnClose = document.querySelector('[data-action="close-lightbox"]');
const lightBoxOverlay = document.querySelector('.lightbox__overlay');
const imagesMarkup = createImagesMarkup(galleryItems);
imagesContainer.insertAdjacentHTML('beforeend', imagesMarkup);

function createImagesMarkup(images) {
    return images.map(({ preview, original, description }, index) => {
        return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      data-index="${index}"
    />
  </a>
</li>`;
         
     }).join('');
}



function onOpenBtnClick(e) {
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    e.preventDefault();
    lightBox.classList.add('is-open');
    onOpenModal(e);
}

function onOpenModal(e) {
    lightBoxImage.src = e.target.dataset.source;
    lightBoxImage.alt = e.target.alt;
    lightBoxImage.dataset.index = e.target.dataset.index;
}

function onCloseBtnClick(e) {
    lightBox.classList.remove('is-open');
    lightBoxImage.src = "";
    
    
}
function setNewSrc(step, index) {
  lightBoxImage.dataset.index = `${index + step}`
  lightBoxImage.src = galleryItems[index + step].original
}

function arrowLeft() {
  let index = Number(lightBoxImage.dataset.index)
  if (index === 0) {
    setNewSrc(0, galleryItems.length - 1)
    return
  }
  console.log(index);
  setNewSrc(-1, index)
}

function arrowRight() {
  let index = +lightBoxImage.dataset.index
  if (index === galleryItems.length - 1) {
    setNewSrc(0, 0)
    return
  }
  console.log(index);
  setNewSrc(1, index)
}


getImagesGallery.addEventListener('click', onOpenBtnClick);
btnClose.addEventListener('click', onCloseBtnClick);
lightBoxOverlay.addEventListener('click', onCloseBtnClick);
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        onCloseBtnClick(e);
    }

    if (e.key === "ArrowLeft") {
    arrowLeft()
    }
    
    if (e.key === "ArrowRight") {
    arrowRight()
    }
})