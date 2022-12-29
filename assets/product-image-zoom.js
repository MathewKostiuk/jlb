class ProductClicktoZoom extends HTMLElement {
  constructor() {
    super();
    this.photoswipeDialog = document.querySelector('[data-photoswipe]');
    this.thumbContainer = this.photoswipeDialog.querySelector('[data-photoswipe-thumbs]');
    this.thumbScroller = this.photoswipeDialog.querySelector('[data-photoswipe-thumb-scroller]');
    this.thumbScrollerButtons = this.photoswipeDialog.querySelectorAll('[data-gallery-scroll-button]');
    this.closeButton = this.photoswipeDialog.querySelector('.pswp__button--close');
    const desktopSlides = document.querySelectorAll('[data-gallery-image-desktop]');
    const mobileSlides = document.querySelectorAll('[data-gallery-image-mobile]');
    const originalThumbnails = document.querySelectorAll('[data-image-thumbnail]');
    const startIndex = 0;
    this.isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    this.thumbScroller.innerHTML = '';
    this.thumbnails = [];
    const slides = this.isMobile ? mobileSlides : desktopSlides;
    this.selectedSlide = slides[startIndex];
    // Clone the original thumbnails into the photoswipe dialog
    originalThumbnails.forEach((thumb, thumbIndex) => {
      const newThumb = thumb.cloneNode(true);
      this.thumbScroller.appendChild(newThumb);
      this.thumbnails.push(newThumb);
    });

    this.selectedThumb = this.thumbContainer.querySelector('[data-gallery-selected="true"]');

    // Set up options for initializing PhotoSwipe
    const photoswipeSlides = [];

    slides.forEach(slide => {
      if (['video', 'external_video', 'model'].indexOf(slide.dataset.mediaType) > -1) return;
      photoswipeSlides.push({
        src: slide.dataset.zoom,
        msrc: slide.dataset.zoom,
        h: slide.dataset.imageHeight,
        w: slide.dataset.imageWidth,
      });

      slide.addEventListener('click', () => {
        this.selectedIndex = slide.dataset.galleryIndex;
        const photoswipeOptions = {
          index: parseInt(this.selectedIndex, 10),
          barsSize: { top: 0, bottom: 0 },
          fullscreenEl: false,
          zoomEl: false,
          shareEl: false,
          counterEl: false,
          arrowEl: false,
          preloaderEl: false,
          closeOnScroll: false,
          showHideOpacity: true,
          history: false,
          loop: true,
          clickToCloseNonZoomable: false,
          timeToIdle: false,
          timeToIdleOutside: false,
        };

        photoswipeOptions.getThumbBoundsFn = () => {
          const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          const bounds = this.selectedSlide.getBoundingClientRect();
          return { x: bounds.left, y: bounds.top + pageYScroll, w: bounds.width };
        };

        this.photoswipe = new PhotoSwipe(
          this.photoswipeDialog,
          PhotoSwipeUI_Default,
          photoswipeSlides,
          photoswipeOptions,
        );

        this.closeButton.addEventListener('click', () => this.photoswipe.close())

        // The following fixes an issue on iOS12 and below, where click events were not registering
        this.closeButton.addEventListener('touchstart', () => this.photoswipe.close())

        this.thumbnails.forEach((thumb, index) => {
          thumb.addEventListener('click', () => {
            console.log(thumb, index)
            this.photoswipe.goTo(index);
          })
        });

        this.thumbScroller.addEventListener('scroll', () => this._handleScrollButtonVisibility());
        this.thumbScrollerButtons[0].addEventListener('click', () => this._onScrollButtonClick(true))
        this.thumbScrollerButtons[1].addEventListener('click', () => this._onScrollButtonClick(false))

        // Photoswipe documentation claims that the closeOnVerticalDrag option is always false if
        // the mouse is used, which is what we want. Unfortunately that's not how it actually works,
        // so we need to dynamically update the setting when a mouse is detected.
        if (this.photoswipe.options.mouseUsed) {
          this.photoswipe.options.closeOnVerticalDrag = false;
        } else {
          this.photoswipe.listen('mouseUsed', () => {
            this.photoswipe.options.closeOnVerticalDrag = false;
          });
        }

        this.photoswipe.listen('afterChange', () => {
          const index = this.photoswipe.getCurrentIndex();
          if (this.selectedThumb) {
            this.selectedThumb.dataset.gallerySelected = false;
          }
          this.selectedThumb = this.thumbnails[index];
          this.selectedThumb.dataset.gallerySelected = true;

          const slideIndex = this.selectedThumb.getAttribute('data-gallery-index');
          const slide = slides[slideIndex];

          this._handleScrollButtonVisibility();
          this.selectedSlide = slide;
        });
        this.photoswipe.init()
      })
    });

  }

  _handleScrollButtonVisibility() {
    if (this.isMobile) {
      // We use 4px here just to ensure the user has scrolled a little bit before
      // showing the buttons.
      if (this.thumbScroller.scrollLeft > 4) {
        this.thumbScrollerButtons[0].classList.add('visible');
      } else {
        this.thumbScrollerButtons[0].classList.remove('visible');
      }

      if (this.thumbScroller.scrollLeft < this.thumbScroller.scrollWidth
        - this.thumbScroller.clientWidth) {
        this.thumbScrollerButtons[1].classList.add('visible');
      } else {
        this.thumbScrollerButtons[1].classList.remove('visible');
      }
    } else {
      this.thumbScrollerButtons[0].classList.remove('visible');
      this.thumbScrollerButtons[1].classList.remove('visible');
    }
  }

  _onScrollButtonClick(scrollRight) {
    if (scrollRight) {
      this.thumbScroller.scrollLeft = this.thumbScroller.scrollLeft - 100;
    } else {
      this.thumbScroller.scrollLeft = this.thumbScroller.scrollLeft + 100;
    }
  }

  unload() {
    if (this.photoswipe) {
      this.photoswipe.destroy();
      this.photoswipe = null;
    }
  }
}

if (!customElements.get('product-image-zoom')) {
  customElements.define('product-image-zoom', ProductClicktoZoom);
}
