var $productThumbnails = $('.slick-slide', '.product-images-carousel');
var $productGallery = $('.tt-mobile-product-slider');

$productThumbnails.click(function(e) {
  var clickedThumbnail = e.currentTarget;
  $productGallery.slick('slickGoTo', clickedThumbnail.dataset.slickIndex, true)
});

$(document).ready(function() {
  $('body').on('click', '[name="checkout"]', function() {
    if ($('#agree').is(':checked')) {
      $(this).submit();
    }
    else {
      alert("You must agree with the terms and conditions of sales to check out.");
      return false;
    }
  });
});