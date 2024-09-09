"use strict";

var $document = $(document),
  $window = $(window),
  $body = $("body"),
  $html = $("html"),
  $ttPageContent = $("#tt-pageContent"),
  $ttFooter = $("footer"),
  $ttHeader = $("header"),
  $ttLeftColumnAside = $ttPageContent.find(".leftColumn.aside"),
  $ttFilterOptions = $ttPageContent.find(".tt-filters-options"),
  /* menu setting*/
  header_menu_timeout = 200,
  header_menu_delay = 200,
  //header
  $ttTopPanel = $(".tt-top-panel"),
  //header stuck
  $stucknav = $ttHeader.find(".tt-stuck-nav"),
  //header menu
  $ttDesctopMenu = $ttHeader.find(".tt-desctop-menu"),
  $ttDesctopParentMenu = $ttHeader.find(".tt-desctop-parent-menu"),
  $ttMobileParentMenu = $ttHeader.find(".tt-mobile-parent-menu"),
  $ttMobileParentMenuChildren = $ttMobileParentMenu.children(),
  $ttStuckParentMenu = $ttHeader.find(".tt-stuck-parent-menu"),
  //header search
  $ttSearchObj = $ttHeader.find(".tt-search"),
  $ttDesctopParentSearch = $ttHeader.find(".tt-desctop-parent-search"),
  $ttMobileParentSearch = $ttHeader.find(".tt-mobile-parent-search"),
  $ttStuckParentSearch = $ttHeader.find(".tt-stuck-parent-search"),
  //header cart
  $ttcartObj = $ttHeader.find(".tt-cart"),
  $ttDesctopParentCart = $ttHeader.find(".tt-desctop-parent-cart"),
  $ttMobileParentCart = $ttHeader.find(".tt-mobile-parent-cart"),
  $ttStuckParentCart = $ttHeader.find(".tt-stuck-parent-cart"),
  //header account
  $ttAccountObj = $ttHeader.find(".tt-account"),
  $ttDesctopParentAccount = $ttHeader.find(".tt-desctop-parent-account"),
  $ttMobileParentAccount = $ttHeader.find(".tt-mobile-parent-account"),
  $ttStuckParentAccount = $ttHeader.find(".tt-stuck-parent-account"),
  //header langue and currency(*all in one module)
  $ttMultiObj = $ttHeader.find(".tt-multi-obj"),
  $ttDesctopParentMulti = $ttHeader.find(".tt-desctop-parent-multi"),
  $ttMobileParentMulti = $ttHeader.find(".tt-mobile-parent-multi"),
  $ttStuckParentMulti = $ttHeader.find(".tt-stuck-parent-multi"),
  // Template Blocks
  blocks = {
    ttCalendarDatepicker: $ttPageContent.find(".calendarDatepicker"),
    ttSliderBlog: $ttPageContent.find(".tt-slider-blog"),
    ttSlickMain: $ttPageContent.find(".tt-slick-main"),
    ttSliderBlogSingle: $ttPageContent.find(".tt-slider-blog-single"),
    ttVideoBlock: $(".tt-video-block"),
    ttBlogMasonry: $ttPageContent.find(".tt-blog-masonry"),
    ttPortfolioMasonry: $ttPageContent.find(".tt-portfolio-masonry"),
    ttProductMasonry: $ttPageContent.find(".tt-product-listing-masonry"),
    ttInputCounter: $(".tt-input-counter"),
    ttCollapseBlock: $(".tt-collapse-block"),
    modalVideoProduct: $("#modalVideoProduct"),
    modalAddToCart: $("#modalAddToCartProduct"),
    ttMobileProductSlider: $(".tt-mobile-product-slider"),
    ttMobileProductSliderNav: $(".tt-mobile-product-slider__nav"),
    ttCollapse: $ttPageContent.find(".tt-collapse"),
    ttProductListing: $ttPageContent.find(".tt-product-listing"),
    ttBtnColumnClose: $ttLeftColumnAside.find(".tt-btn-col-close"),
    ttBtnToggle: $ttFilterOptions.find(".tt-btn-toggle a"),
    ttBtnAddProduct: $ttPageContent.find(".tt_product_showmore"),
    ttProductItem: $ttPageContent.find(".tt-product, .tt-product-design02"),
    ttProductDesign02: $ttPageContent.find(".tt-product-design02"),
    ttProductDesign01: $ttPageContent.find(".tt-product"),
    ttFilterDetachOption: $ttLeftColumnAside.find(".tt-filter-detach-option"),
    ttFilterSort: $ttFilterOptions.find(".tt-sort"),
    ttShopCart: $ttPageContent.find(
      ".tt-shopcart-table, .tt-shopcart-table-02"
    ),
    ttSliderLookbook: $ttPageContent.find(".tt-slider-lookbook"),
    ttPortfolioContent: $ttPageContent.find(".tt-portfolio-content"),
    ttLookbook: $ttPageContent.find(".tt-lookbook"),
    ttAirSticky: $ttPageContent.find(".airSticky"),
    ttfooterMobileCollapse: $ttFooter.find(".tt-collapse-title"),
    ttBackToTop: $(".tt-back-to-top"),
    ttHeaderDropdown: $ttHeader.find(".tt-dropdown-obj"),
    mobileMenuToggle: $(".tt-menu-toggle"),
    ttCarouselProducts: $(".tt-carousel-products"),
    ttItemsCategories: $ttPageContent.find(".tt-items-categories"),
    ttDotsAbsolute: $ttPageContent.find(".tt-dots-absolute"),
    ttAlignmentImg: $ttPageContent.find(".tt-alignment-img"),
    ttProductSingleBtnZomm: $ttPageContent.find(
      ".tt-product-single-img .tt-btn-zomm"
    ),
    ttRevolutionPromo: $ttPageContent.find(".tt-revolution-promo"),
  };

var ttwindowWidth = window.innerWidth || $window.width();

if (blocks.ttRevolutionPromo.length) {
  setTimeout(function () {
    blocks.ttRevolutionPromo.fadeTo("90", 1);
  }, 2300);
  blocks.ttRevolutionPromo.on("click", ".tt-btn-close", function () {
    $(this).closest(".tt-revolution-promo").hide();
  });
}

if (blocks.ttItemsCategories.length) {
  ttItemsCategories();
}
if (blocks.modalAddToCart.length) {
  modalAddToCart();
}
// Mobile Menu
if ($(".mainmenumob-js").length) {
  $(".mainmenumob-js").initMM({
    enable_breakpoint: true,
    mobile_button: true,
    breakpoint: 1025,
    menu_class: "mobile-main-menu",
  });
}
//header top panel
if ($ttTopPanel.length) {
  ttTopPanel();
}
// add product item
if (blocks.ttBackToTop.length) {
  ttBackToTop();
}
// Slide Column *listing-left-column.html
if ($ttLeftColumnAside && blocks.ttBtnColumnClose && blocks.ttBtnToggle) {
  ttToggleCol();
}
if (blocks.ttCollapse.length) {
  ttCollapse();
}
//modal video on page product
if (blocks.modalVideoProduct.length) {
  ttVideoPopup();
}
//tt-collapse-block(pages product single)
if (blocks.ttCollapseBlock.length) {
  ttCollapseBlock();
}
//calendarDatepicker(blog)
if (blocks.ttCalendarDatepicker.length) {
  blocks.ttCalendarDatepicker.datepicker();
}
//video(blog listing)
if (blocks.ttVideoBlock.length) {
  ttVideoBlock();
}
// determination ie
if (getInternetExplorerVersion() !== -1) {
  $html.addClass("ie");
}
// inputCounter
if (blocks.ttInputCounter.length) {
  ttInputCounter();
}
// header
initStuck();
if ($ttDesctopParentSearch.length) {
  mobileParentSearch();
}
if ($ttcartObj.length) {
  mobileParentCart();
}
if ($ttDesctopParentAccount.length) {
  mobileParentAccount();
}
if ($ttDesctopParentMulti.length) {
  mobileParentMulti();
}
// product item Design01
if (blocks.ttProductDesign01.length) {
  ttProductHover();
}
if (blocks.ttfooterMobileCollapse.length) {
  ttFooterCollapse();
}
// lookbook.html
if (blocks.ttLookbook.length) {
  ttLookbook(ttwindowWidth);
}
// shopping_cart.html
if (blocks.ttShopCart.length) {
  ttShopCart(ttwindowWidth);
}
// carusel
if (blocks.ttCarouselProducts.length) {
  blocks.ttCarouselProducts.each(function () {
    var slick = $(this),
      item = $(this).data("item");
    slick.slick({
      dots: false,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: item || 4,
      slidesToScroll: item || 4,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 791,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    });
  });
}
// lookbook.html
// slider
if (blocks.ttSliderLookbook.length) {
  blocks.ttSliderLookbook.slick({
    dots: true,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
  });
}

//blog listing slider
if (blocks.ttMobileProductSlider.length) {
  blocks.ttMobileProductSlider.slick({
    lazyLoad: "progressive",
    dots: false,
    arrows: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    asNavFor: ".tt-mobile-product-slider__nav",
  });
}
if (blocks.ttMobileProductSliderNav.length) {
  blocks.ttMobileProductSliderNav.slick({
    lazyLoad: "progressive",
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    focusOnSelect: true,
    infinite: true,
    variableWidth: true,
    adaptiveHeight: true,
    asNavFor: ".tt-mobile-product-slider",
  });
}
//slick main (* index-14.html)
if (blocks.ttSlickMain.length) {
  blocks.ttSlickMain.slick({
    dots: true,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          dots: false,
        },
      },
    ],
  });
}
//blog listing slider
if (blocks.ttSliderBlog.length) {
  blocks.ttSliderBlog.slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
  });
}
//blog single post slider
if (blocks.ttSliderBlogSingle.length) {
  blocks.ttSliderBlogSingle.slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
  });
  //total slides
  var ttSlickQuantity = $(".tt-slick-quantity");
  if (ttSlickQuantity.length) {
    ttSlickQuantity
      .find(".total")
      .html(blocks.ttSliderBlogSingle.slick("getSlick").slideCount);
    blocks.ttSliderBlogSingle.on(
      "afterChange",
      function (event, slick, currentSlide) {
        var currentIndex = $(".slick-current").attr("data-slick-index");
        currentIndex++;
        ttSlickQuantity.find(".account-number").html(currentIndex);
      }
    );
  }
  //button
  var ttSlickButton = $(".tt-slick-button");
  if (ttSlickButton.length) {
    ttSlickButton.find(".slick-next").click(function () {
      blocks.ttSliderBlogSingle.slick("slickNext");
    });
    ttSlickButton.find(".slick-prev").click(function () {
      blocks.ttSliderBlogSingle.slick("slickPrev");
    });
  }
}

// portfolio mobile click
if (blocks.ttPortfolioContent.length && is_touch_device()) {
  ttPortfolioContentMobile();
}
if (blocks.ttDotsAbsolute.length) {
  ttSlickDots();
}
//sticky(product-05.html)
if (blocks.ttAirSticky.length) {
  ttAirSticky(ttwindowWidth);
}
// header - tt-dropdown-obj
if (blocks.ttHeaderDropdown.length) {
  ttHeaderDropdown();
}

// product single tt-btn-zomm(*magnific popup)
if (blocks.ttProductSingleBtnZomm.length) {
  ttProductSingleBtnZomm();
}

$window.on("load", function () {
  var ttwindowWidth = window.innerWidth || $window.width();
  if ($body.length) {
    $body.addClass("loaded");
  }
  // filters options product(definition layout)
  if ($ttFilterOptions.length) {
    ttFilterLayout(ttwindowWidth);
  }
  if (blocks.ttProductItem.length) {
    ttProductSmall(ttwindowWidth);
  }
  if (blocks.ttProductDesign02.length) {
    ttOverflowProduct();
  }
  // centering arrow
  if (blocks.ttAlignmentImg.length) {
    alignmentArrowValue();
  }
  if (blocks.ttProductMasonry.length) {
    gridProductMasonr();
  }
  if (blocks.ttBlogMasonry.length) {
    gridGalleryMasonr();
  }
  if (blocks.ttPortfolioMasonry.length) {
    gridPortfolioMasonr();
    initPortfolioPopup();
  }
});

var ttCachedWidth = $window.width();
$window.on("resize", function () {
  var newWidth = $window.width();
  if (newWidth !== ttCachedWidth) {
    ttCachedWidth = newWidth;

    var ttwindowWidth = window.innerWidth || $window.width();

    // shopping_cart.html
    if (blocks.ttShopCart.length) {
      ttShopCart(ttwindowWidth);
    }
    // filters options product(definition layout)
    if ($ttFilterOptions.length) {
      ttFilterLayout(ttwindowWidth);
    }
    if (blocks.ttProductItem.length) {
      ttProductSmall();
    }
    if (blocks.ttProductDesign02.length) {
      ttOverflowProduct();
    }
    // portfolio mobile click
    if (blocks.ttPortfolioContent.length && is_touch_device()) {
      ttPortfolioContentMobile();
    }
    //sticky(product-05.html)
    if (blocks.ttAirSticky.length) {
      ttAirSticky(ttwindowWidth);
    }
    if (
      $ttLeftColumnAside.hasClass("column-open") &&
      $ttLeftColumnAside.length
    ) {
      $ttLeftColumnAside.find(".tt-btn-col-close a").trigger("click");
    }

    //header init stuck and detach
    if ($ttDesctopParentSearch.length) {
      mobileParentSearch();
    }
    if ($ttcartObj.length) {
      mobileParentCart();
    }
    if ($ttDesctopParentAccount.length) {
      mobileParentAccount();
    }
    if ($ttDesctopParentMulti.length) {
      mobileParentMulti();
    }
    if (blocks.ttDotsAbsolute.length) {
      ttSlickDots();
    }
    // centering arrow
    if (blocks.ttAlignmentImg.length) {
      alignmentArrowValue();
    }
  }
});
// Functions
var cssFix = (function () {
  var u = navigator.userAgent.toLowerCase(),
    is = function (t) {
      return u.indexOf(t) != -1;
    };
  $html.addClass(
    [
      !/opera|webtv/i.test(u) && /msie (\d)/.test(u)
        ? "ie ie" + RegExp.$1
        : is("firefox/2")
        ? "gecko ff2"
        : is("firefox/3")
        ? "gecko ff3"
        : is("gecko/")
        ? "gecko"
        : is("opera/9")
        ? "opera opera9"
        : /opera (\d)/.test(u)
        ? "opera opera" + RegExp.$1
        : is("konqueror")
        ? "konqueror"
        : is("applewebkit/")
        ? "webkit safari"
        : is("mozilla/")
        ? "gecko"
        : "",
      is("x11") || is("linux")
        ? " linux"
        : is("mac")
        ? " mac"
        : is("win")
        ? " win"
        : "",
    ].join("")
  );
})();

function ttTopPanel() {
  $ttTopPanel.on("click", function (e) {
    e.preventDefault;
    var target = e.target;
    if ($(".tt-btn-close").is(target)) {
      $(this).slideUp(200);
    }
  });
}

//tabs init carusel
$('a[data-toggle="tab"]').length &&
  $("body").on("shown.bs.tab", 'a[data-toggle="tab"]', function (e) {
    $(".slick-slider").each(function () {
      $(this).slick("getSlick").refresh();
    });
    if (blocks.ttAlignmentImg.length) {
      alignmentArrowValue();
    }
  });
$(".modal").on("shown.bs.modal", function (e) {
  var objSlickSlider = $(this).find(".slick-slider");
  if (objSlickSlider.length) {
    objSlickSlider.each(function () {
      $(this).slick("getSlick").refresh();
    });
  }
});
function ttItemsCategories() {
  blocks.ttItemsCategories.hover(function () {
    $(this).toggleClass("active");
  });
}
function ttHeaderDropdown() {
  var dropdownPopup = $(".header-popup-bg");
  if (!dropdownPopup.length) {
    $body.append('<div class="header-popup-bg"></div>');
  }
  $("header").on("click", ".tt-dropdown-obj", function (e) {
    var ttwindowWidth = window.innerWidth || $window.width(),
      $this = $(this),
      target = e.target,
      objSearch = $(".tt-search"),
      objSearchInput = objSearch.find(".tt-search-input");

    // search
    if ($this.hasClass("tt-search") && $(".tt-dropdown-toggle").is(target)) {
      searchPopup();
    }
    function searchPopup() {
      $this.addClass("active");
      objSearchInput.focus();
      return false;
    }
    if (objSearch.find(".tt-btn-close").is(target)) {
      objSearchClose();
      return false;
    }
    function objSearchClose() {
      $this.removeClass("active");
      objSearchInput.blur();
      return false;
    }

    // cart, account, multi-ob
    if (!$(this).hasClass("tt-search") && $(".tt-dropdown-toggle").is(target)) {
      ttwindowWidth <= 1024 ? popupObjMobile($this) : popupObjDesctop($this);
    }
    function popupObjMobile(obj) {
      $("header").find(".tt-dropdown-obj.active").removeClass("active");
      obj.toggleClass("active").find(".tt-dropdown-menu").removeAttr("style");
      $body.toggleClass("tt-popup-dropdown");
    }
    function popupObjDesctop(obj) {
      var $this = obj,
        target = e.target;

      if ($this.hasClass("active")) {
        $this.toggleClass("active").find(".tt-dropdown-menu").slideToggle(200);
        return;
      }
      $(".tt-desktop-header .tt-dropdown-obj").each(function () {
        var $this = $(this);
        if ($this.hasClass("active")) {
          $this
            .removeClass("active")
            .find(".tt-dropdown-menu")
            .css("display", "none");
        }
      });
      if ($(".tt-dropdown-toggle").is(target)) {
        toggleDropdown($this);
      }
    }
    function toggleDropdown(obj) {
      obj.toggleClass("active").find(".tt-dropdown-menu").slideToggle(200);
    }

    $(document).mouseup(function (e) {
      var ttwindowWidth = window.innerWidth || $window.width();

      if (!$this.is(e.target) && $this.has(e.target).length === 0) {
        $this.each(function () {
          if ($this.hasClass("active") && $this.hasClass("tt-search")) {
            objSearch.find(".tt-btn-close").trigger("click");
          }
          if ($this.hasClass("active") && !$this.hasClass("tt-search")) {
            if (ttwindowWidth <= 1024) {
              closeObjPopupMobile();
            } else {
              $(".tt-dropdown-obj").each(function () {
                if ($(this).hasClass("active")) {
                  $(this)
                    .removeClass("active")
                    .find(".tt-dropdown-menu")
                    .css("display", "none");
                }
              });
            }
          }
        });
      }
      if ($this.find(".tt-mobile-add .tt-close").is(e.target)) {
        closeObjPopupMobile();
      }
    });
    function closeObjPopupMobile() {
      $(".tt-dropdown-obj.active").removeClass("active");
      $body.removeClass("tt-popup-dropdown");
      return false;
    }
  });
}

// button back to top
function ttBackToTop() {
  blocks.ttBackToTop.on("click", function (e) {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });
  $window.scroll(function () {
    $window.scrollTop() > 500
      ? blocks.ttBackToTop.stop(true.false).addClass("tt-show")
      : blocks.ttBackToTop.stop(true.false).removeClass("tt-show");
  });
}

// modal Add ToCart(*close)
function modalAddToCart() {
  blocks.modalAddToCart.on("click", ".btn-close-popup", function (e) {
    $(this)
      .closest(".modal-content")
      .find(".modal-header .close")
      .trigger("click");
    return false;
  });
}

// Mobile footer collapse
function ttFooterCollapse() {
  blocks.ttfooterMobileCollapse.on("click", function (e) {
    e.preventDefault;
    $(this).toggleClass("tt-open");
  });
}

//slick slider functional for dots
function ttSlickDots() {
  blocks.ttDotsAbsolute.each(function () {
    var $this = $(this).find(".slick-dots");
    if ($this.is(":visible")) {
      var upperParent = $this.closest("[class ^= container]");
      if (upperParent.length) {
        upperParent.css({
          paddingBottom:
            parseInt($this.height(), 10) + parseInt($this.css("marginTop"), 10),
        });
      }
    }
  });
}
// product item Design01 hover (*desctope)
function ttProductHover() {
  $document.on(
    "mouseenter mouseleave",
    "#tt-pageContent .tt-product",
    function (e) {
      if (
        $(".tt-product-listing").length &&
        $(".tt-product-listing").hasClass("tt-col-one")
      )
        return false;

      var $this = $(this),
        windW = window.innerWidth,
        objLiftUp01 = $this.find(".tt-description"),
        objLiftUp02 = $this.find(".tt-product-inside-hover"),
        objHeight02 = parseInt(objLiftUp02.height()) + 3,
        objCountdown = $this.find(".tt-countdown_box"),
        target = e.target;

      if ($this.hasClass("product-nohover")) return false;

      if (e.type === "mouseenter" && windW > 1024) {
        ttOnHover();
      } else if (e.type === "mouseleave" && e.relatedTarget && windW > 1024) {
        ttOffHover();
      }

      function ttOnHover(e) {
        $this
          .stop()
          .css({
            height: $this.innerHeight(),
          })
          .addClass("hovered");
        objLiftUp01.stop().animate({ top: "-" + objHeight02 }, 200);
        objLiftUp02.stop().animate({ opacity: 1 }, 400);
        objCountdown.stop().animate({ bottom: objHeight02 }, 200);
        return false;
      }
      function ttOffHover(e) {
        $this.stop().removeClass("hovered").removeAttr("style");
        objLiftUp01.stop().animate({ top: "0" }, 200, function () {
          $(this).removeAttr("style");
        });
        objLiftUp02.stop().animate({ opacity: 0 }, 100, function () {
          $(this).removeAttr("style");
        });
        objCountdown.stop().animate({ bottom: 0 }, 200, function () {
          $(this).removeAttr("style");
        });
        return false;
      }
    }
  );
}

// shopping_cart.html
function ttShopCart(ttwindowWidth) {
  var desctopQuantity = blocks.ttShopCart.find(".detach-quantity-desctope"),
    mobileQuantity = blocks.ttShopCart.find(".detach-quantity-mobile");

  ttwindowWidth <= 789 ? insertDesctopeObj() : insertMobileObj();

  function insertDesctopeObj() {
    desctopQuantity.each(function () {
      var objDesctope = $(this).find(".tt-input-counter").detach().get(0);
      $(this).closest("tr").find(".detach-quantity-mobile").append(objDesctope);
    });
  }
  function insertMobileObj() {
    mobileQuantity.each(function () {
      var objMobile = $(this).find(".tt-input-counter").detach().get(0);
      $(this).closest("tr").find(".detach-quantity-desctope").append(objMobile);
    });
  }
}

// product Small
function ttProductSmall() {
  var currentW = parseInt(blocks.ttProductItem.width(), 10),
    objProduct = $(".tt-product, .tt-product-design02");
  currentW <= 210
    ? objProduct.addClass("tt-small")
    : objProduct.removeClass("tt-small");
}

function debouncer(func, timeout) {
  var timeoutID,
    timeout = timeout || 500;
  return function () {
    var scope = this,
      args = arguments;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function () {
      func.apply(scope, Array.prototype.slice.call(args));
    }, timeout);
  };
}

// centering arrow
function alignmentArrowValue() {
  var ttwindowWidth = window.innerWidth || $window.width();

  if (ttwindowWidth > 1024) {
    setTimeout(function () {
      blocks.ttAlignmentImg.each(function () {
        $(this).find(".slick-arrow").removeAttr("style");
      });
    }, 225);
  } else {
    setTimeout(function () {
      blocks.ttAlignmentImg.each(function () {
        var ttObj = $(this),
          $objParentArrow = ttObj.find(".slick-arrow");
        if (
          ttObj.find(".tt-image-box").length == 0 ||
          $objParentArrow.length == 0
        )
          return;
        var $obj = ttObj.find(".tt-image-box").first();
        $objParentArrow.css({
          top:
            $obj.findHeight() -
            $objParentArrow.findHeight() -
            parseInt(ttObj.css("marginTop"), 10) +
            "px",
        });

        ttObj.find(".tt-product").length && ttProductSmall();
      });
    }, 225);
  }
}
$.fn.findHeight = function () {
  var $blocks = $(this),
    maxH = $blocks.eq(0).innerHeight();

  $blocks.each(function () {
    maxH = $(this).innerHeight() > maxH ? $(this).innerHeight() : maxH;
  });

  return maxH / 2;
};
// tt-hotspot
function ttLookbook(ttwindowWidth) {
  //add lookbook popup
  var objPopup = $(".tt-lookbook-popup");
  if (!objPopup.length) {
    $body.append(
      '<div class="tt-lookbook-popup"><div class="tt-lookbook-container"></div></div>'
    );
  }

  var events = "ontouchstart" in window ? "click" : "click mouseenter";
  blocks.ttLookbook.on(events, ".tt-hotspot", function (e) {
    var $this = $(this),
      target = e.target,
      ttHotspot = $(".tt-hotspot"),
      ttwindowWidth = window.innerWidth || $window.width(),
      ttCenterBtn = $(".tt-btn").innerHeight() / 2,
      ttWidthPopup = $(".tt-hotspot-content").innerWidth();

    ttwindowWidth <= 789 ? ttLookbookMobile($this) : ttLookbookDesktop($this);

    //ttLookbookDesktop
    function ttLookbookDesktop($this) {
      if ($this.hasClass("active")) return;

      var objTop = $this.offset().top + ttCenterBtn,
        objLeft = $this.offset().left,
        objContent = $this.find(".tt-hotspot-content").detach();

      //check if an open popup
      var checkChildren = $(".tt-lookbook-container").children().size();
      if (checkChildren > 0) {
        if (ttwindowWidth <= 789) {
          closePopupMobile();
        } else {
          closePopupDesctop();
        }
      }

      //open popup
      popupOpenDesktop(objContent, objTop, objLeft);
    }
    function popupOpenDesktop(objContent, objTop, objLeft) {
      //check out viewport(left or right)
      var halfWidth = ttwindowWidth / 2,
        objLeftFinal = 0;

      if (halfWidth < objLeft) {
        objLeftFinal = objLeft - ttWidthPopup - 7;
        popupShowLeft(objLeftFinal);
      } else {
        objLeftFinal = objLeft + 45;
        popupShowRight(objLeftFinal);
      }

      $(".tt-lookbook-popup").find(".tt-lookbook-container").append(objContent);
      $this.addClass("active").siblings().removeClass("active");

      function popupShowLeft(objLeftFinal) {
        $(".tt-lookbook-popup")
          .css(
            {
              top: objTop,
              left: objLeftFinal,
              display: "block",
            },
            300
          )
          .animate(
            {
              marginLeft: 26 + "px",
              opacity: 1,
            },
            300
          );
      }
      function popupShowRight(objLeftFinal) {
        $(".tt-lookbook-popup")
          .css({
            top: objTop,
            left: objLeftFinal,
            display: "block",
          })
          .animate({
            marginLeft: -26 + "px",
            opacity: 1,
          });
      }
    }
    //ttLookbookMobile
    function ttLookbookMobile($this) {
      var valueTop = $this.attr("data-top") + "%",
        valueLeft = $this.attr("data-left") + "%";

      $this.find(".tt-btn").css({
        top: valueTop,
        left: valueLeft,
      });
      $this.css({
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
      });
      $this.addClass("active").siblings().removeClass("active");
      $this.find(".tt-content-parent").fadeIn(200);
    }
    //Close mobile
    if (ttwindowWidth <= 789) {
      if ($(".tt-btn-close").is(e.target)) {
        closePopupMobile();
        return false;
      }
      if ($(".tt-hotspot").is(e.target)) {
        closePopupMobile();
      }
      $(document).mouseup(function (e) {
        if (
          !$(".tt-lookbook-popup").is(e.target) &&
          $(".tt-lookbook-popup").has(e.target).length === 0 &&
          !$(".tt-hotspot").is(e.target) &&
          $(".tt-hotspot").has(e.target).length === 0
        ) {
          closePopupDesctop();
        }
      });
    }
    //Close desctope
    if (ttwindowWidth > 789) {
      //ttLookbookClose
      $(document).mouseup(function (e) {
        var ttwindowWidth = window.innerWidth || $window.width();
        if ($(".tt-btn-close").is(e.target)) {
          closePopupDesctop();
          return false;
        }
        if (
          !$(".tt-lookbook-popup").is(e.target) &&
          $(".tt-lookbook-popup").has(e.target).length === 0 &&
          !$(".tt-hotspot").is(e.target) &&
          $(".tt-hotspot").has(e.target).length === 0
        ) {
          closePopupDesctop();
        }
      });
    }

    function closePopupDesctop() {
      //detach content popup
      var detachContentPopup = $(".tt-lookbook-popup")
        .removeAttr("style")
        .find(".tt-hotspot-content")
        .detach();
      $(".tt-hotspot.active")
        .removeClass("active")
        .find(".tt-content-parent")
        .append(detachContentPopup);
    }
    function closePopupMobile() {
      if ($(".tt-lookbook-container").is(":has(div)")) {
        var checkPopupContent = $(".tt-lookbook-container")
          .find(".tt-hotspot-content")
          .detach();
        $(".tt-hotspot.active")
          .find(".tt-content-parent")
          .append(checkPopupContent);
      }
      $(".tt-lookbook")
        .find(".tt-hotspot.active")
        .each(function (index) {
          var $this = $(this),
            valueTop = $this.attr("data-top") + "%",
            valueLeft = $this.attr("data-left") + "%";

          $this
            .removeClass("active")
            .removeAttr("style")
            .css({
              top: valueTop,
              left: valueLeft,
            })
            .find(".tt-btn")
            .removeAttr("style")
            .next()
            .removeAttr("style");
        });
    }
    function checkclosePopupMobile() {
      $(".tt-hotspot")
        .find(".tt-content-parent")
        .each(function () {
          var $this = $(this);
          if ($this.css("display") == "block") {
            var $thisParent = $this.closest(".tt-hotspot"),
              valueTop = $thisParent.attr("data-top") + "%",
              valueLeft = $thisParent.attr("data-left") + "%";

            $this.removeAttr("style").prev().removeAttr("style");
            $thisParent.removeAttr("style").css({
              top: valueTop,
              left: valueLeft,
            });
          }
        });
    }
    $(window).resize(
      debouncer(function (e) {
        var ttwindowWidth = window.innerWidth || $window.width();
        if (ttwindowWidth <= 789) {
          closePopupMobile();
        } else {
          closePopupDesctop();
          checkclosePopupMobile();
        }
      })
    );
    // return false;
  });
}
// Overflow Product
function ttOverflowProduct() {
  blocks.ttProductDesign02.hover(
    function () {
      if (
        $(".tt-product-listing").length &&
        $(".tt-product-listing").hasClass("tt-col-one")
      )
        return false;

      if (window.innerWidth < 1024) return;
      var objImgHeight = $(this).find(".tt-image-box").height(),
        objScroll = $(this).find(".tt-description"),
        objScrollHeight = objScroll.height() + 25;

      if (objImgHeight > objScrollHeight) return;
      $(this).addClass("tt-small");
      objScroll.height(objImgHeight).perfectScrollbar();
    },
    function () {
      if (window.innerWidth < 1024) return;
      $(this)
        .removeClass("tt-small")
        .find(".tt-description")
        .removeAttr("style")
        .perfectScrollbar("destroy");
    }
  );
}
function ttReinitflowProduct() {
  if (
    window.innerWidth < 1024 ||
    $ttPageContent.find(".tt-product-design02").length == 0
  )
    return;
  $ttPageContent.find(".tt-product-design02").each(function () {
    $(this).perfectScrollbar("destroy");
    var objImgHeight = $(this).find(".tt-image-box").height(),
      objScroll = $(this).find(".tt-description"),
      objScrollHeight = objScroll.height() + 25;

    if (objImgHeight > objScrollHeight) return;
    $(this).addClass("tt-small");
    objScroll.height(objImgHeight).perfectScrollbar();
  });
}

// portfolio mobile click
function ttPortfolioContentMobile() {
  blocks.ttPortfolioContent.on("click", "figure img", function () {
    $(this)
      .closest(".tt-portfolio-content")
      .find("figure")
      .removeClass("gallery-click");
    $(this).closest("figure").addClass("gallery-click");
  });
}

//toggle col (listing-left-column.html)
function ttToggleCol() {
  var $btnClose = $ttLeftColumnAside.find(".tt-btn-col-close a");

  $(".tt-btn-toggle").on("click", function (e) {
    e.preventDefault();
    var ttScrollValue = $body.scrollTop() || $html.scrollTop();
    $ttLeftColumnAside.toggleClass("column-open").perfectScrollbar();
    $body
      .css("top", -ttScrollValue)
      .addClass("no-scroll")
      .append('<div class="modal-filter"></div>');
    var modalFilter = $(".modal-filter").fadeTo("fast", 1);
    if (modalFilter.length) {
      modalFilter.click(function () {
        $btnClose.trigger("click");
      });
    }
    return false;
  });
  blocks.ttBtnColumnClose.on("click", function (e) {
    e.preventDefault();
    $ttLeftColumnAside.removeClass("column-open").perfectScrollbar("destroy");
    var top = parseInt($body.css("top").replace("px", ""), 10) * -1;
    $body.removeAttr("style").removeClass("no-scroll").scrollTop(top);
    $html.removeAttr("style").scrollTop(top);
    $(".modal-filter").unbind().remove();
  });
}

function ttCollapseBlock() {
  blocks.ttCollapseBlock.each(function () {
    var obj = $(this),
      objOpen = obj.find(".tt-item.active"),
      objItemTitle = obj.find(".tt-item .tt-collapse-title");

    objOpen.find(".tt-collapse-content").slideToggle(200);

    objItemTitle.on("click", function () {
      $(this).next().slideToggle(200).parent().toggleClass("active");
    });
  });
}
function getInternetExplorerVersion() {
  var rv = -1;
  if (navigator.appName === "Microsoft Internet Explorer") {
    var ua = navigator.userAgent;
    var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
    if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
  } else if (navigator.appName === "Netscape") {
    var ua = navigator.userAgent;
    var re = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
    if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
  }
  return rv;
}
// identify touch device
function is_touch_device() {
  return !!("ontouchstart" in window) || !!("onmsgesturechange" in window);
}
if (is_touch_device()) {
  $body.addClass("touch-device");
  $html.addClass("touch-device");
}
if (/Edge/.test(navigator.userAgent)) {
  $html.addClass("edge");
}
//video
function ttVideoBlock() {
  $(".tt-video-block").on("click", function (e) {
    e.preventDefault();
    var myVideo = $(this).find(".movie")[0];
    if (myVideo.paused) {
      myVideo.play();
      $(this).addClass("play");
    } else {
      myVideo.pause();
      $(this).removeClass("play");
    }
  });
}
// Blog Masonr
function gridGalleryMasonr() {
  // init Isotope
  var $grid = blocks.ttBlogMasonry.find(".tt-blog-init").isotope({
    itemSelector: ".element-item",
    layoutMode: "masonry",
  });
  // layout Isotope after each image loads
  $grid.imagesLoaded().progress(function () {
    $grid.isotope("layout").addClass("tt-show");
  });
  // filter functions
  var ttFilterNav = blocks.ttBlogMasonry.find(".tt-filter-nav");
  if (ttFilterNav.length) {
    var filterFns = {
      ium: function () {
        var name = $(this).find(".name").text();
        return name.match(/ium$/);
      },
    };
    // bind filter button click
    ttFilterNav.on("click", ".button", function () {
      var filterValue = $(this).attr("data-filter");
      filterValue = filterFns[filterValue] || filterValue;
      $grid.isotope({
        filter: filterValue,
      });
      $(this).addClass("active").siblings().removeClass("active");
    });
  }
}
// Product Masonr (listing-metro.html)
function gridProductMasonr() {
  // init Isotope
  var $grid = blocks.ttProductMasonry.find(".tt-product-init").isotope({
    itemSelector: ".element-item",
    layoutMode: "masonry",
  });
  // layout Isotope after each image loads
  $grid.imagesLoaded().progress(function () {
    $grid.isotope("layout");
  });
  // filter functions
  var ttFilterNav = blocks.ttProductMasonry.find(".tt-filter-nav");
  if (ttFilterNav.length) {
    var filterFns = {
      ium: function () {
        var name = $(this).find(".name").text();
        return name.match(/ium$/);
      },
    };
    // bind filter button click
    ttFilterNav.on("click", ".button", function () {
      var filterValue = $(this).attr("data-filter");
      filterValue = filterFns[filterValue] || filterValue;
      $grid.isotope({
        filter: filterValue,
      });
      $(this).addClass("active").siblings().removeClass("active");
    });
  }
}
// collapseBlock(pages listing) *listing-left-column.html
function ttCollapse() {
  var item = blocks.ttCollapse,
    itemTitle = item.find(".tt-collapse-title"),
    itemContent = item.find(".tt-collapse-content");

  item.each(function () {
    if ($(this).hasClass("open")) {
      $(this).find(itemContent).slideDown();
    } else {
      $(this).find(itemContent).slideUp();
    }
  });
  itemTitle.on("click", function (e) {
    e.preventDefault();
    var speed = 300;
    var thisParent = $(this).parent(),
      nextLevel = $(this).next(".tt-collapse-content");
    if (thisParent.hasClass("open")) {
      thisParent.removeClass("open");
      nextLevel.slideUp(speed);
    } else {
      thisParent.addClass("open");
      nextLevel.slideDown(speed);
    }
  });
}
// ttFiltersOptions
(function ($) {
  $.fn.removeClassFirstPart = function (mask) {
    return this.removeClass(function (index, cls) {
      var re = mask.replace(/\*/g, "\\S+");
      return (cls.match(new RegExp("\\b" + re + "", "g")) || []).join(" ");
    });
  };
})(jQuery);

function ttFilterLayout(ttwindowWidth) {
  if ($(".tt-product-listing").hasClass("only-row")) return false;
  // detach filter aside left
  if (
    $ttFilterOptions.hasClass("desctop-no-sidebar") &&
    !$ttFilterOptions.hasClass("filters-detach-mobile")
  ) {
    ttwindowWidth <= 1024 ? insertMobileCol() : insertFilter();
  }
  if ($ttFilterOptions.hasClass("filters-detach-mobile")) {
    ttwindowWidth <= 1024 ? insertMobileCol() : insertFilter();
  }
  if (!$ttFilterOptions.hasClass("desctop-no-sidebar")) {
    ttwindowWidth <= 1024 ? insertMobileCol() : insertFilter();
  }

  function insertMobileCol() {
    var objFilterOptions = blocks.ttFilterSort.find("select").detach();
    blocks.ttFilterDetachOption
      .find(".filters-row-select")
      .append(objFilterOptions);
  }
  function insertFilter() {
    var objColFilterOptions = blocks.ttFilterDetachOption
      .find(".filters-row-select select")
      .detach();
    blocks.ttFilterSort.append(objColFilterOptions);
  }

  //active filter detection
  blocks.ttProductListing.removeClassFirstPart("tt-col-*");

  var ttQuantity = $ttFilterOptions.find(".tt-quantity"),
    ttProductItem = blocks.ttProductListing.find(".tt-col-item:first"),
    ttProductItemValue = (function () {
      if (ttQuantity.length && ttProductItem.length) {
        var ttValue =
          parseInt(
            ttProductItem.css("flex").replace("0 0", "").replace("%", ""),
            10
          ) || parseInt(ttProductItem.css("max-width"), 10);
        return ttValue;
      }
    })();

  if (ttProductItemValue == 16) {
    ttСhangeclass(ttQuantity, ".tt-col-six");
  } else if (ttProductItemValue == 25) {
    ttСhangeclass(ttQuantity, ".tt-col-four");
  } else if (ttProductItemValue == 33) {
    ttСhangeclass(ttQuantity, ".tt-col-three");
  } else if (ttProductItemValue == 50) {
    ttСhangeclass(ttQuantity, ".tt-col-two");
  } else if (ttProductItemValue == 100) {
    ttСhangeclass(ttQuantity, ".tt-col-one");
  }

  function ttСhangeclass(ttObj, ttObjvalue) {
    ttwindowWidth <= 1024
      ? ttShowIconMobile(ttObj, ttObjvalue)
      : ttShowIconDesctop(ttObj, ttObjvalue);
    if (
      ttObj.find(".active").length == 0 ||
      !ttObj.find(".active").hasClass("tt-show-siblings")
    )
      ttObj
        .find(ttObjvalue)
        .addClass("active")
        .siblings()
        .removeClass("active");
  }

  function ttShowIconDesctop(ttObj, ttObjvalue) {
    ttObj.find(".tt-show").removeClass("tt-show");
    ttObj.find(".tt-show-siblings").removeClass("tt-show-siblings");

    var $this = ttObj.find(ttObjvalue);
    $this.addClass("tt-show");

    $this.next().addClass("tt-show-siblings");
    $this.prev().addClass("tt-show-siblings");
    var quantitySiblings = $(".tt-quantity .tt-show-siblings").length;
    if (quantitySiblings === 1) {
      ttObj.find(".tt-show-siblings").prev().addClass("tt-show-siblings");
    }

    if (!Boolean($(".tt-product-listing").data("onerow"))) return false;
    $(".tt-col-one").addClass("tt-show-siblings");
    var _ca = ttObj.find(".active").data("value");
    $(".tt-product-listing").addClass(_ca);
  }
  function ttShowIconMobile(ttObj, ttObjvalue) {
    ttObj.find(".tt-show").removeClass("tt-show");
    ttObj.find(".tt-show-siblings").removeClass("tt-show-siblings");

    var $this = ttObj.find(ttObjvalue);
    $this.addClass("tt-show");
    $this.prev().addClass("tt-show-siblings");

    if ($(".tt-product-listing").data("onerow") == "false") return false;
    $(".tt-col-one").addClass("tt-show-siblings");
    var _ca = ttObj.find(".active").data("value");
    $(".tt-product-listing").addClass(_ca);
  }

  //click buttons filter
  $("body").on("click", ".tt-filters-options a", function (e) {
    e.preventDefault();
    ttQuantity.find("a").removeClass("active");
    var ttActiveValue = $(this).addClass("active").attr("data-value");
    $ttPageContent
      .find(".tt-product-listing")
      .removeClassFirstPart("tt-col-*")
      .addClass(ttActiveValue);
    ttProductSmall();
  });
}

// Portfolio
function gridPortfolioMasonr() {
  // init Isotope
  var $grid = blocks.ttPortfolioMasonry.find(".tt-portfolio-content").isotope({
    itemSelector: ".element-item",
    layoutMode: "masonry",
  });
  // layout Isotope after each image loads
  $grid.imagesLoaded().progress(function () {
    $grid.isotope("layout").addClass("tt-show");
  });
  // filter functions
  var ttFilterNav = blocks.ttPortfolioMasonry.find(".tt-filter-nav");
  if (ttFilterNav.length) {
    var filterFns = {
      ium: function () {
        var name = $(this).find(".name").text();
        return name.match(/ium$/);
      },
    };
    // bind filter button click
    ttFilterNav.on("click", ".button", function () {
      var filterValue = $(this).attr("data-filter");
      filterValue = filterFns[filterValue] || filterValue;
      $grid.isotope({
        filter: filterValue,
      });
      $(this).addClass("active").siblings().removeClass("active");
    });
  }
}
function initPortfolioPopup() {
  var objZoom = $ttPageContent.find(".tt-portfolio-masonry .tt-btn-zomm");
  objZoom.magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });
}
//input-counter
function ttInputCounter() {
  blocks.ttInputCounter.find(".minus-btn, .plus-btn").click(function (e) {
    var $input = $(this).parent().find("input");
    var count =
      parseInt($input.val(), 10) +
      parseInt(e.currentTarget.className === "plus-btn" ? 1 : -1, 10);
    $input.val(count).change();
  });
  blocks.ttInputCounter
    .find("input")
    .change(function () {
      var _ = $(this);
      var min = 1;
      var val = parseInt(_.val(), 10);
      var max = parseInt(_.attr("size"), 10);
      val = Math.min(val, max);
      val = Math.max(val, min);
      _.val(val);
    })
    .on("keypress", function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    });
}
//popup on pages product single
function ttVideoPopup() {
  blocks.modalVideoProduct
    .on("show.bs.modal", function (e) {
      var relatedTarget = $(e.relatedTarget),
        attr = relatedTarget.attr("data-value"),
        attrPoster = relatedTarget.attr("data-poster"),
        attrType = relatedTarget.attr("data-type");

      if (
        attrType === "youtube" ||
        attrType === "vimeo" ||
        attrType === undefined
      ) {
        $('<iframe src="' + attr + '" allowfullscreen></iframe>').appendTo(
          $(this).find(".modal-video-content")
        );
      }

      if (attrType === "video") {
        $(
          '<div class="tt-video-block"><a href="#" class="link-video"></a><video class="movie" src="' +
            attr +
            '" poster="' +
            attrPoster +
            '" allowfullscreen></video></div>'
        ).appendTo($(this).find(".modal-video-content"));
      }
      ttVideoBlock();
    })
    .on("hidden.bs.modal", function () {
      $(this).find(".modal-video-content").empty();
    });
}
//product pages
var elevateZoomWidget = {
  scroll_zoom: true,
  class_name: ".zoom-product",
  thumb_parent: $("#smallGallery"),
  scrollslider_parent: $(".slider-scroll-product"),
  checkNoZoom: function () {
    return $(this.class_name).parent().hasClass("no-zoom");
  },
  init: function (type) {
    var _ = this;
    var currentW = window.innerWidth || $(window).width();
    var zoom_image = $(_.class_name);
    var _thumbs = _.thumb_parent;
    _.initBigGalleryButtons();
    _.scrollSlider();

    if (zoom_image.length == 0) return false;
    if (!_.checkNoZoom()) {
      var attr_scroll = zoom_image.parent().parent().attr("data-scrollzoom");
      attr_scroll = attr_scroll ? attr_scroll : _.scroll_zoom;
      _.scroll_zoom = attr_scroll == "false" ? false : true;
      currentW > 575 && _.configureZoomImage();
      _.resize();
    }

    if (_thumbs.length == 0) return false;
    var thumb_type =
      _thumbs.parent().attr("class").indexOf("-vertical") > -1
        ? "vertical"
        : "horizontal";
    _[thumb_type](_thumbs);
    _.setBigImage(_thumbs);
  },
  configureZoomImage: function () {
    var _ = this;
    $(".zoomContainer").remove();
    var zoom_image = $(this.class_name);
    zoom_image.each(function () {
      var _this = $(this);
      var clone = _this.removeData("elevateZoom").clone();
      _this.after(clone).remove();
    });
    setTimeout(function () {
      $(_.class_name).elevateZoom({
        gallery: _.thumb_parent.attr("id"),
        zoomType: "inner",
        scrollZoom: Boolean(_.scroll_zoom),
        cursor: "crosshair",
        zoomWindowFadeIn: 300,
        zoomWindowFadeOut: 300,
      });
    }, 100);
  },
  resize: function () {
    var _ = this;
    $(window).resize(function () {
      var currentW = window.innerWidth || $(window).width();
      if (currentW <= 575) return false;
      _.configureZoomImage();
    });
  },
  horizontal: function (_parent) {
    _parent.slick({
      lazyLoad: "progressive",
      infinite: false,
      dots: false,
      arrows: true,
      slidesToShow: 10,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 0,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
      ],
    });
  },
  vertical: function (_parent) {
    _parent.slick({
      lazyLoad: "progressive",
      vertical: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      verticalSwiping: true,
      arrows: true,
      dots: false,
      centerPadding: "0px",
      customPaging: "0px",
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
      ],
    });
  },
  initBigGalleryButtons: function () {
    var bigGallery = $(".bigGallery");
    if (bigGallery.length == 0) return false;
    $("body")
      .on("mouseenter", ".zoomContainer", function () {
        bigGallery.find("button").addClass("show");
      })
      .on("mouseleave", ".zoomContainer", function () {
        bigGallery.find("button").removeClass("show");
      });
  },
  scrollSlider: function () {
    var _scrollslider_parent = this.scrollslider_parent;
    if (_scrollslider_parent.length == 0) return false;
    _scrollslider_parent.on("init", function (event, slick) {
      _scrollslider_parent.css({ opacity: 1 });
    });
    _scrollslider_parent
      .css({ opacity: 0 })
      .slick({
        infinite: false,
        vertical: true,
        verticalScrolling: true,
        dots: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      })
      .mousewheel(function (e) {
        e.preventDefault();
        e.deltaY < 0 ? $(this).slick("slickNext") : $(this).slick("slickPrev");
      });
  },
  setBigImage: function (_parent) {
    var _ = this;
    _parent.find("a").click(function (e) {
      _.checkNoZoom() && e.preventDefault();
      var zoom_image = $(_.class_name);
      var getParam = _.checkNoZoom() ? "data-image" : "data-zoom-image";
      var setParam = _.checkNoZoom() ? "src" : "data-zoom-image";
      var big_image = $(this).attr(getParam);
      zoom_image.attr(setParam, big_image);

      if (!_.checkNoZoom()) return false;
      _parent.find(".zoomGalleryActive").removeClass("zoomGalleryActive");
      $(this).addClass("zoomGalleryActive");
    });
  },
};
elevateZoomWidget.init();

// product single tt-btn-zomm(*magnific popup)
function ttProductSingleBtnZomm() {
  $body.on("click", ".tt-product-single-img .tt-btn-zomm", function (e) {
    var objSmallGallery = $("#smallGallery");
    objSmallGallery.find("a").each(function () {
      var dataZoomImg = $(this).attr("data-zoom-image");
      if (dataZoomImg.length) {
        $(this)
          .closest("li")
          .append("<a class='link-magnific-popup' href='#'></a>")
          .find(".link-magnific-popup")
          .attr("href", dataZoomImg);
        if ($(this).hasClass("zoomGalleryActive")) {
          $(this)
            .closest("li")
            .find(".link-magnific-popup")
            .addClass("zoomGalleryActive");
        }
      }
    });
    objSmallGallery
      .addClass("tt-magnific-popup")
      .find(".link-magnific-popup")
      .magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
          tCounter: '<span class="mfp-counter"></span>',
        },
        callbacks: {
          close: function () {
            setTimeout(function () {
              objSmallGallery
                .removeClass("tt-magnific-popup")
                .find(".link-magnific-popup")
                .remove();
            }, 200);
          },
        },
      });
    objSmallGallery
      .find(".link-magnific-popup.zoomGalleryActive")
      .trigger("click");
  });
}

//sticky(product-05.html)
function ttAirSticky(ttwindowWidth) {
  var airStickyObj = blocks.ttAirSticky,
    tabObj = blocks.ttCollapseBlock.find(".tt-collapse-title");

  if (ttwindowWidth >= 1024) {
    airStickyObj.airStickyBlock({
      debug: false,
      stopBlock: ".airSticky_stop-block",
      offsetTop: 70,
    });
  } else if (airStickyObj.hasClass("airSticky_absolute")) {
    airStickyObj.removeClass("airSticky_absolute");
  }
  $document.on("resize scroll", tabObj, function () {
    airStickyObj.trigger("render.airStickyBlock");
  });
  tabObj.on("click", function () {
    setTimeout(function () {
      airStickyObj.trigger("render.airStickyBlock");
    }, 170);
  });
}
// img for ratio > 1
if (window.devicePixelRatio > 1) {
  var ttImgToReplace = $(".tt-retina");
  for (var i = 0, l = ttImgToReplace.length; i < l; i++) {
    var src = ttImgToReplace[i].src;
    src = src.replace(/\.(png|jpg|gif)+$/i, "@2x.$1");
    ttImgToReplace[i].src = src;
  }
}

/**
 * Stuck init. Properties: on/off
 * @value = 'off', default empty
 */
function initStuck(value) {
  if ($stucknav.hasClass("disabled")) return;

  var value = value || false,
    ie = getInternetExplorerVersion() !== -1 ? true : false;

  if (value === "off") return false;
  var n = 0;
  triggerStuck();
  $window.scroll(function () {
    var HeaderTop = 0;
    if ($window.scrollTop() >= HeaderTop) {
      if ($stucknav.hasClass("stuck")) return false;
      $stucknav.hide();
      $stucknav.addClass("stuck");
      $("body").trigger("showStuck");
      window.innerWidth < 1025
        ? $ttStuckParentMenu.append($ttMobileParentMenuChildren.detach())
        : $ttStuckParentMenu.append($ttDesctopMenu.detach());
      $ttStuckParentCart.append($ttcartObj.detach());
      $ttStuckParentMulti.append($ttMultiObj.detach());
      $ttStuckParentAccount.append($ttAccountObj.detach());
      $ttStuckParentSearch.append($ttSearchObj.detach());

      if (
        $stucknav
          .find(".tt-stuck-cart-parent > .tt-cart > .dropdown")
          .hasClass("open") ||
        ie
      )
        $stucknav.stop().show();
      else $stucknav.stop().fadeIn(300);
    } else {
      if (!$stucknav.hasClass("stuck")) return false;
      $stucknav.hide();
      $stucknav.removeClass("stuck");
      $("body").trigger("hideStuck");
      if (window.innerWidth < 1025) {
        $ttMobileParentMenu.append($ttMobileParentMenuChildren.detach());
        $ttMobileParentCart.append($ttcartObj.detach());
        $ttMobileParentMulti.append($ttMultiObj.detach());
        $ttMobileParentAccount.append($ttAccountObj.detach());
        $ttMobileParentSearch.append($ttSearchObj.detach());
        return false;
      }
      $ttDesctopParentMenu.append($ttDesctopMenu.detach());
      $ttDesctopParentCart.append($ttcartObj.detach());
      $ttDesctopParentMulti.append($ttMultiObj.detach());
      $ttDesctopParentAccount.append($ttAccountObj.detach());
      $ttDesctopParentSearch.append($ttSearchObj.detach());
    }
  });
  $window.resize(function () {
    if (!$stucknav.hasClass("stuck")) return false;
    if (window.innerWidth < 1025) {
      $ttDesctopParentMenu.append($ttDesctopMenu.detach());
      $ttStuckParentMenu.append($ttMobileParentMenuChildren.detach());
    } else {
      $ttMobileParentMenu.append($ttMobileParentMenuChildren.detach());
      $ttStuckParentMenu.append($ttDesctopMenu.detach());
    }
  });
}

function triggerStuck() {
  var ie = getInternetExplorerVersion() !== -1 ? true : false;
  $stucknav.hide();
  $stucknav.addClass("stuck");
  $("body").trigger("showStuck");
  window.innerWidth < 1025
    ? $ttStuckParentMenu.append($ttMobileParentMenuChildren.detach())
    : $ttStuckParentMenu.append($ttDesctopMenu.detach());
  $ttStuckParentCart.append($ttcartObj.detach());
  $ttStuckParentMulti.append($ttMultiObj.detach());
  $ttStuckParentAccount.append($ttAccountObj.detach());
  $ttStuckParentSearch.append($ttSearchObj.detach());

  if (
    $stucknav
      .find(".tt-stuck-cart-parent > .tt-cart > .dropdown")
      .hasClass("open") ||
    ie
  )
    $stucknav.stop().show();
  else $stucknav.stop().fadeIn(300);
}
//header search
function mobileParentSearch() {
  if (window.innerWidth < 1025) {
    if ($ttMobileParentSearch.children().lenght) return false;
    if ($(".stuck").length) return false;
    $ttMobileParentSearch.append($ttSearchObj.detach());
  } else {
    if ($ttDesctopParentSearch.children().lenght) return false;
    if ($(".stuck").length) return false;
    $ttDesctopParentSearch.append($ttSearchObj.detach());
  }
}
//header cart
function mobileParentCart() {
  if (window.innerWidth < 1025) {
    if ($ttMobileParentCart.children().lenght) return false;
    if ($(".stuck").length) return false;
    $ttMobileParentCart.append($ttcartObj.detach());
  } else {
    if ($ttDesctopParentCart.children().lenght) return false;
    if ($(".stuck").length) return false;
    $ttDesctopParentCart.append($ttcartObj.detach());
  }
}
//header account
function mobileParentAccount() {
  if (window.innerWidth < 1025) {
    if ($ttMobileParentAccount.children().lenght) return false;
    if ($(".stuck").length) return false;
    $ttMobileParentAccount.append($ttAccountObj.detach());
  } else {
    if ($ttDesctopParentAccount.children().lenght) return false;
    if ($(".stuck").length) return false;
    $ttDesctopParentAccount.append($ttAccountObj.detach());
  }
}
//header langue and currency(*all in one module)
function mobileParentMulti() {
  if (window.innerWidth < 1025) {
    if ($ttMobileParentMulti.children().lenght) return false;
    if ($(".stuck").length) return false;
    $ttMobileParentMulti.append($ttMultiObj.detach());
  } else {
    if ($ttDesctopParentMulti.children().lenght) return false;
    if ($(".stuck").length) return false;
    $ttDesctopParentMulti.append($ttMultiObj.detach());
  }
}

/*
      header menu
    */
// header menu(hover)
(function toggle_header_menu() {
  var delay = header_menu_timeout,
    hoverTimer = header_menu_delay,
    timeout1 = false;

  var set_dropdown_maxH = function () {
    var wind_H = window.innerHeight,
      $ttDesctopMenu = $(this).find(".dropdown-menu"),
      menu_top = $ttDesctopMenu.get(0).getBoundingClientRect().top,
      menu_max_H = wind_H - menu_top,
      $ttDesctopMenu_H = $ttDesctopMenu.innerHeight(),
      $btn_top = blocks.ttBackToTop;

    if ($ttDesctopMenu_H > menu_max_H) {
      var $body = $("body"),
        $stuck = $(".tt-stuck-nav");
      $ttDesctopMenu.css({
        maxHeight: menu_max_H - 20,
        overflow: "auto",
      });

      var scrollWidth = function () {
        var $div = $("<div>").css({
          overflowY: "scroll",
          width: "50px",
          height: "50px",
          visibility: "hidden",
        });

        $body.append($div);
        var scrollWidth = $div.get(0).offsetWidth - $div.get(0).clientWidth;
        $div.remove();

        return scrollWidth;
      };

      $body.css({
        overflowY: "hidden",
        paddingRight: scrollWidth(),
      });

      $stuck.css({
        paddingRight: scrollWidth(),
      });

      $btn_top.css({
        right: scrollWidth(),
      });

      $(".tt-header-static").length &&
        $(".tt-header-static").css({ "padding-right": scrollWidth() });
    }
  };

  if ($ttDesctopMenu.length > 0) {
    $(".tt-megamenu-submenu li").each(function () {
      if ($(this).find("img").length) {
        $(this).closest("ul").addClass("tt-sub-img");
      }
    });
    $ttDesctopMenu.find(".dropdown-menu").each(function () {
      if ($(this).length) {
        $(this).closest(".dropdown").addClass("tt-submenu");
      }
    });

    $(document).on(
      {
        mouseenter: function () {
          var $this = $(this),
            that = this,
            windowW = window.innerWidth || $(window).width();

          if (windowW > 1025 && $body.hasClass("touch-device")) {
            $ttDesctopMenu.find(".dropdown.tt-submenu > a").one("click", false);
          }

          timeout1 = setTimeout(function () {
            var $carousel = $this.find(".tt-menu-slider"),
              $ttDesctopMenu = $this.find(".dropdown-menu");

            $this
              .addClass("active")
              .find(".dropdown-menu")
              .stop()
              .addClass("hover")
              .fadeIn(hoverTimer);

            if ($ttDesctopMenu.length & !$ttDesctopMenu.hasClass("one-col")) {
              set_dropdown_maxH.call(that);
            }

            if ($carousel.length) {
              if (!$carousel.hasClass("slick-initialized")) {
                $carousel.slick({
                  dots: false,
                  arrows: true,
                  infinite: true,
                  speed: 300,
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  adaptiveHeight: true,
                });
              }
            }
            $carousel.slick("setPosition");
          }, delay);
        },
        mouseleave: function (e) {
          var $this = $(this),
            $dropdown = $this.find(".dropdown-menu");

          if (
            $(e.target).parents(".dropdown-menu").length &&
            !$(e.target).parents(".tt-megamenu-submenu").length &&
            !$(e.target).parents(".one-col").length
          )
            return;

          if (timeout1 !== false) {
            clearTimeout(timeout1);
            timeout1 = false;
          }

          if ($dropdown.length) {
            $dropdown.stop().fadeOut({
              duration: 0,
              complete: function () {
                $this
                  .removeClass("active")
                  .find(".dropdown-menu")
                  .removeClass("hover");
              },
            });
          } else {
            $this
              .removeClass("active")
              .find(".dropdown-menu")
              .removeClass("hover");
          }

          $dropdown.removeAttr("style");
          $(".tt-header-static").length &&
            $(".tt-header-static").removeAttr("style");

          $body.removeAttr("style");

          $(".tt-stuck-nav").css({
            paddingRight: "inherit",
          });

          blocks.ttBackToTop.css({
            right: 0,
          });
        },
      },
      ".tt-desctop-menu li"
    );

    $(".multicolumn ul li").hover(
      function () {
        var $ul = $(this).find("ul:first");

        if ($ul.length) {
          var windW = window.innerWidth,
            windH = window.innerHeight,
            ulW = parseInt($ul.css("width"), 10),
            thisR = this.getBoundingClientRect().right,
            thisL = this.getBoundingClientRect().left;

          if (windW - thisR < ulW) {
            $ul.removeClass("left").addClass("right");
          } else if (thisL < ulW) {
            $ul.removeClass("right").addClass("left");
          } else {
            $ul.removeClass("left right");
          }
          $ul.stop(true, true).fadeIn(300);
        }
      },
      function () {
        $(this)
          .find("ul:first")
          .stop(true, true)
          .fadeOut(300)
          .removeAttr("style");
      }
    );

    $ttDesctopMenu.find(".tt-megamenu-submenu li").hover(
      function () {
        var $ul = $(this).find("ul:first");

        if ($ul.length) {
          var $dropdownMenu = $(this)
              .parents(".dropdown")
              .find(".dropdown-menu"),
            dropdown_left = $dropdownMenu.get(0).getBoundingClientRect().left,
            dropdown_Right = $dropdownMenu.get(0).getBoundingClientRect().right,
            dropdown_Bottom = $dropdownMenu
              .get(0)
              .getBoundingClientRect().bottom,
            ulW = parseInt($ul.css("width"), 10),
            thisR = this.getBoundingClientRect().right,
            thisL = this.getBoundingClientRect().left;

          if (dropdown_Right - 20 - thisR < ulW) {
            $ul.removeClass("left").addClass("right");
          } else if (thisL - ulW - 20 < dropdown_left) {
            $ul.removeClass("right").addClass("left");
          } else {
            $ul.removeClass("left right");
          }

          $ul.stop(true, true).delay(150).fadeIn(300);

          var ul_bottom = $ul.get(0).getBoundingClientRect().bottom;

          if (dropdown_Bottom < ul_bottom) {
            var move_top = dropdown_Bottom - ul_bottom;
            $ul.css({
              top: move_top,
            });
          }
        }
      },
      function () {
        $(this)
          .find("ul:first")
          .stop(true, true)
          .fadeOut(300)
          .removeAttr("style");
      }
    );

    $(".megamenu div").hover(
      function () {
        $(this).children(".tt-title-submenu").addClass("active");
      },
      function () {
        $(this).children(".tt-title-submenu").removeClass("active");
      }
    );
  }

  function onscroll_dropdown_hover() {
    var $dropdown_active = $(".dropdown.hover");

    if (!$dropdown_active.find(".dropdown-menu").not(".one-col").length) return;

    if ($dropdown_active.length) set_dropdown_maxH.call($dropdown_active);
  }
  $(window).on("scroll", function () {
    onscroll_dropdown_hover();
  });
})();

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
})(function ($) {
  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    }

    try {
      s = decodeURIComponent(s.replace(pluses, " "));
      return config.json ? JSON.parse(s) : s;
    } catch (e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }

  var config = ($.cookie = function (key, value, options) {
    if (arguments.length > 1 && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === "number") {
        var days = options.expires,
          t = (options.expires = new Date());
        t.setMilliseconds(t.getMilliseconds() + days * 864e5);
      }

      return (document.cookie = [
        encode(key),
        "=",
        stringifyCookieValue(value),
        options.expires ? "; expires=" + options.expires.toUTCString() : "", // use expires attribute, max-age is not supported by IE
        options.path ? "; path=" + options.path : "",
        options.domain ? "; domain=" + options.domain : "",
        options.secure ? "; secure" : "",
      ].join(""));
    }

    var result = key ? undefined : {},
      cookies = document.cookie ? document.cookie.split("; ") : [],
      i = 0,
      l = cookies.length;

    for (; i < l; i++) {
      var parts = cookies[i].split("="),
        name = decode(parts.shift()),
        cookie = parts.join("=");

      if (key === name) {
        result = read(cookie, value);
        break;
      }

      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  });

  config.defaults = {};

  $.removeCookie = function (key, options) {
    $.cookie(key, "", $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
  };
});

function subscribeErrorHandler() {
  if ($(".errors").length == 0) return false;
  $('[type="email"]').on("focus", function () {
    $(this).unbind().closest("form").find(".errors").length &&
      $(this).closest("form").find(".errors").remove();
  });
}
subscribeErrorHandler();

/* Sections */
var hoverColors = {
  params: {
    baseColor: "data-c",
    activeColor: "data-ac",
    bgBaseColor: "data-bgc",
    bgActiveColor: "data-abgc",
    borderBaseColor: "data-borc",
    borderActiveColor: "data-aborc",
  },
  init: function () {
    var attrName = this.params;
    var he = $("[data-hovercolors]");
    if (he.length == 0) return false;
    he.each(function () {
      hoverColors.getCurrentColors(
        $(this),
        attrName.baseColor,
        attrName.bgBaseColor,
        attrName.borderBaseColor
      );
    });
  },
  initEvents: function () {
    var attrName = this.params;
    $("body").on(
      {
        mouseenter: function () {
          hoverColors.getCurrentColors(
            $(this),
            attrName.activeColor,
            attrName.bgActiveColor,
            attrName.borderActiveColor
          );
        },
        mouseleave: function () {
          hoverColors.getCurrentColors(
            $(this),
            attrName.baseColor,
            attrName.bgBaseColor,
            attrName.borderBaseColor
          );
        },
      },
      "[data-hovercolors]"
    );
  },
  getCurrentColors: function (_, attr1, attr2, attr3) {
    hoverColors.setCurrentColors(_, attr1, attr2, attr3);
    var attr = false;

    var ac = _.find("[" + attr1 + "]");
    if (ac.length > 0) {
      ac.each(function () {
        attr = $(this).attr("use-on-hover");
        if (typeof attr !== typeof undefined && attr !== false && _ != $(this))
          return true;
        var c = $(this).attr(attr1);
        $(this).css("color", c);
      });
    }

    ac = _.find("[" + attr2 + "]");
    if (ac.length > 0) {
      ac.each(function () {
        attr = $(this).attr("use-on-hover");
        if (typeof attr !== typeof undefined && attr !== false && _ != $(this))
          return true;
        hoverColors.setCurrentBgColor($(this), attr2);
      });
    }

    ac = _.find("[" + attr3 + "]");
    if (ac.length > 0) {
      ac.each(function () {
        attr = $(this).attr("use-on-hover");
        if (typeof attr !== typeof undefined && attr !== false && _ != $(this))
          return true;
        hoverColors.setCurrentBorderColor($(this), attr3);
      });
    }
  },
  setCurrentBgColor: function (_, attr) {
    var a = _.attr(attr);
    _.css({ background: a });
  },
  setCurrentBorderColor: function (_, attr) {
    var a = _.attr(attr);
    if (typeof a !== typeof undefined && a !== false) {
      _.css("border-color", a);
    }
  },
  setCurrentColors: function (_, attr1, attr2, attr3) {
    var c = _.attr(attr1);
    _.css("color", c);

    hoverColors.setCurrentBgColor(_, attr2);
    hoverColors.setCurrentBorderColor(_, attr3);

    return false;
  },
};
hoverColors.initEvents();

// Countdown
function countDown(showZero) {
  if ($(".tt-countdown").length) {
    var showZero = showZero || false;

    $(".tt-countdown").each(function () {
      var $this = $(this),
        date = $this.data("date"),
        nextYear = false,
        tz = $("[name=timezone]");

      if (typeof moment === "function" && tz.length)
        nextYear = moment.tz($this.data("date"), tz.attr("content"));

      if ((date = date.split("-"))) {
        date = date.join("/");
      } else return;

      var timezone = nextYear ? nextYear.toDate() : date;

      $this.countdown(timezone, function (e) {
        var format = '<span class="countdown-row">';

        function addFormat(func, timeNum, showZero) {
          if (timeNum === 0 && !showZero) return;

          func(format);
        }

        addFormat(
          function () {
            format +=
              '<span class="countdown-section">' +
              '<span class="countdown-amount">' +
              e.offset.totalDays +
              "</span>" +
              '<span class="countdown-period">' +
              set_day +
              "</span>" +
              "</span>";
          },
          e.offset.totalDays,
          showZero
        );

        addFormat(
          function () {
            format +=
              '<span class="countdown-section">' +
              '<span class="countdown-amount">' +
              e.offset.hours +
              "</span>" +
              '<span class="countdown-period">' +
              set_hour +
              "</span>" +
              "</span>";
          },
          e.offset.hours,
          showZero
        );

        addFormat(
          function () {
            format +=
              '<span class="countdown-section">' +
              '<span class="countdown-amount">' +
              e.offset.minutes +
              "</span>" +
              '<span class="countdown-period">' +
              set_minute +
              "</span>" +
              "</span>";
          },
          e.offset.minutes,
          showZero
        );

        addFormat(
          function () {
            format +=
              '<span class="countdown-section">' +
              '<span class="countdown-amount">' +
              e.offset.seconds +
              "</span>" +
              '<span class="countdown-period">' +
              set_second +
              "</span>" +
              "</span>";
          },
          e.offset.seconds,
          showZero
        );

        format += "</span>";

        $(this).html(format);
      });
    });
  }
}

$(document).ready(function () {
  "use strict";

  countDown(true);

  initProductOptions();
});

/* products options */
function initProductOptions() {
  $("body").on("change", ".productitem-option1-combo-js select", function (e) {
    var $this = $(this).find("option:selected");
    setNewData($this, true);
    var val = $this.attr("data-tag") + "-js";
    var _parent = $this.closest(".tt-option-block");
    val = _parent.optionsSetParams(val, ".productitem-option2-js");
    _parent.optionsSetParams(val, ".productitem-option3-js");
  });
  $("body").on("click", ".productitem-option1-js a", function (e) {
    var $this = $(this);
    optionsHandler(e, $this);
    var val = $this.parent().attr("data-tag") + "-js";
    var _parent = $this.closest(".tt-option-block");
    val = _parent.optionsSetParams(val, ".productitem-option2-js");
    _parent.optionsSetParams(val, ".productitem-option3-js");
  });
  $("body").on("click", ".productitem-option2-js a", function (e) {
    var $this = $(this);
    optionsHandler(e, $this);
    var val = $this.parent().attr("data-tag") + "-js";
    var _parent = $this.closest(".tt-option-block");
    _parent.optionsSetParams(val, ".productitem-option3-js");
  });
  $("body").on("click", ".productitem-option3-js a", function (e) {
    optionsHandler(e, $(this));
  });
}
function optionsHandler(e, $this) {
  e.preventDefault();
  if ($this.parent().hasClass("active")) return false;
  setNewData($this);
}
$.fn.optionsSetParams = function (val, str) {
  var _opt = this.find(str);
  if (_opt.length == 0) return false;
  _opt
    .show()
    .find("li")
    .each(function () {
      $(this).hide().removeClass("active");
    });
  if (_opt.find('[data-current-option="' + val + '"]').length == 0)
    return false;
  _opt
    .find('[data-current-option="' + val + '"]')
    .show()
    .first()
    .addClass("active");
  return _opt.find(".active").find("a").parent().attr("data-tag") + "-js";
};
function setNewData($this, combobox) {
  if (combobox === undefined) {
    combobox = false;
  }
  var _parent = combobox ? $this : $this.parent();
  if (!combobox) {
    _parent.parent().find(".active").removeClass("active");
    _parent.addClass("active");
  }

  var availability = Boolean(_parent.data("variant_availability"));
  var $pr_parent = $this.closest(".options-js");

  $pr_parent.find("input").val(_parent.attr("data-var_id"));

  var img_src = _parent.attr("data-img");
  if (img_src != "") {
    if (
      $(window).width() > "1024" &&
      $pr_parent.find(".tt-img-roll-over").length
    ) {
      $pr_parent
        .find(".tt-img-roll-over img")
        .attr("src", img_src)
        .removeAttr("srcset data-src data-srcset")
        .removeClass("lazyload");
    } else {
      $pr_parent
        .find(".tt-img img")
        .attr("src", img_src)
        .removeAttr("srcset data-src data-srcset")
        .removeClass("lazyload");
    }
  }

  var $btn = $pr_parent.find(".addtocart-item-js");
  $btn.attr(
    "href",
    "/cart/add.js?quantity=1&id=" + _parent.attr("data-var_id")
  );

  if ($pr_parent.find(".compare-js").length) {
    $pr_parent
      .find(".compare-js")
      .attr("data-compareid", _parent.attr("data-var_id"));
    $(window).trigger("compareevent");
  }

  availability
    ? $btn.html(addtocart_text).removeClass("disable")
    : $btn.html(unavailable_text).addClass("disable");

  var labelsale = $pr_parent.find(".tt-label-sale");
  var mainprice = $pr_parent.find(".tt-price span:first-child");
  var oldprice = $pr_parent.find(".old-price");
  mainprice.html(Shopify.formatMoney(_parent.attr("data-price"), money_format));
  var compprice = String(_parent.attr("data-compprice"));
  oldprice.html(Shopify.formatMoney(compprice, money_format));
  if (!compprice) {
    !oldprice.hasClass("hide") && oldprice.addClass("hide");
    mainprice.hasClass("new-price") && mainprice.removeClass("new-price");
    labelsale.length && labelsale.hide();
  } else {
    var _mainprice = Number(_parent.attr("data-price"));
    compprice = Number(compprice);
    if (_mainprice >= compprice) {
      !oldprice.hasClass("hide") && oldprice.addClass("hide");
      mainprice.hasClass("new-price") && mainprice.removeClass("new-price");
      labelsale.length && labelsale.hide();
    } else {
      oldprice.hasClass("hide") && oldprice.removeClass("hide");
      !mainprice.hasClass("new-price") && mainprice.addClass("new-price");
      var per = Math.round(100 - (_mainprice / compprice) * 100) + "%";
      labelsale.length && labelsale.show().find(".thumb_percent").html(per);
    }
  }

  /*  variant_price = labelsale.data('price')
      percent = Math.round(100 - (variant.price / variant.compare_at_price)*100);*/

  $("body").trigger("refreshCurrency");
}

/* Section */
$(document)
  .on("shopify:section:load", eventHandler)
  .ready(function () {
    $("[data-sectionname]").each(function () {
      $(this).initSection();
    });
    lazyload();
    initSkrollr();
  });

function eventHandler(e) {
  $("#" + e.target.id)
    .find("[data-sectionname]")
    .initSection();
  lazyload();
  initSkrollr();
}
function initSkrollr() {
  if (
    $("[data-bottom-top]").length &&
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    skrollr.init();
  }
}

$.fn.initSection = function () {
  var _ = this;
  var n = _.data("sectionname");
  switch (n) {
    case "index_sectionproducts":
      _.find(".tt-carousel-products-js").initSlick(3, 2, 2);
      break;
    case "index_instagram":
      _.index_instagram();
      break;
    case "index_horizontaltabs":
      _.find(".tt-carousel-products-js").initSlick(3, 2, 2);
      break;
    case "index_sectionlookbook":
      _.find(".tt-carousel-lookbook").initSlickLookbook(3, 2, 1);
      break;
    case "index_sectionlookbookmasonry":
      _.find(".tt-lookbook-init").initMasonryLookbook();
      break;
    case "index_sectionmasonry_products":
      _.find(".tt-product-index-init").initMasonryLookbook();
      break;
    case "index_brands":
      _.find(".tt-carousel-brands").initSlickBrands(6, 4, 3, 2, 1);
      break;
    case "index_testimonials":
      _.find(".tt-slider-fullwidth").initSlick(1, 1, 1);
      break;
    case "index_revolution":
      _.find(".slider-revolution").initRevolution();
      break;
    default:
      break;
  }
};

$.fn.initSlick = function (md, sm, xs) {
  this.slick({
    dots: false,
    arrows: true,
    infinite: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: md,
          slidesToScroll: md,
        },
      },
      {
        breakpoint: 791,
        settings: {
          slidesToShow: sm,
          slidesToScroll: sm,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: xs,
          slidesToScroll: xs,
        },
      },
    ],
  });
};

$.fn.initSlickBrands = function (md, sm, sm2, xs, xs2) {
  this.slick({
    dots: false,
    arrows: true,
    infinite: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: md,
          slidesToScroll: md,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: sm,
          slidesToScroll: sm,
        },
      },
      {
        breakpoint: 790,
        settings: {
          slidesToShow: sm2,
          slidesToScroll: sm2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: xs,
          slidesToScroll: xs,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: xs2,
          slidesToScroll: xs2,
        },
      },
    ],
  });
};

// carusel
$.fn.initSlickLookbook = function (md, sm, xs) {
  this.slick({
    dots: true,
    arrows: true,
    infinite: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: sm,
          slidesToScroll: sm,
        },
      },
      {
        breakpoint: 790,
        settings: {
          slidesToShow: xs,
          slidesToScroll: xs,
        },
      },
    ],
  });
};
$.fn.initMasonryLookbook = function () {
  if ($("body").find(".isotope_included").length == 0) {
    this.replaceWith(
      '<span class="text-center" style="display: inherit;">Save and reload page.</span>'
    );
    return false;
  }

  var _ = this;

  var iso = _.isotope({
    itemSelector: ".element-item",
    layoutMode: "masonry",
    gutter: 0,
  });
  // layout Isotope after each image loads
  iso.imagesLoaded().progress(function (index) {
    iso.addClass("tt-show").isotope("layout");
  });
};

$.fn.index_instagram = function () {
  var m = this.find("[data-userid]");
  if (!(typeof Instafeed === "function")) {
    m.replaceWith(
      '<span class="text-center" style="display: inherit;">Save and reload page.</span>'
    );
    return false;
  }

  var a = m.attr("id");
  var userid = m.data("userid");
  var clientId = m.data("clientid");
  var accesstoken = m.data("accesstoken");
  var count = m.data("count");

  var feed = new Instafeed({
    target: a,
    get: "user",
    userId: userid,
    clientId: clientId,
    limit: count,
    sortBy: "most-liked",
    resolution: "standard_resolution",
    accessToken: accesstoken,
    template:
      '<a href="{{link}}" target="_blank"><img class="lazyload" src="' +
      small_image +
      '" data-src="{{image}}" /></a>',
  });
  feed.run();

  setTimeout(function () {
    m.find(".lazyload").lazyload();
  }, 1500);
};

//REVOLUTION SLIDER (function to reset the plug on the breakpoints)

$.fn.initRevolution = function () {
  if ($("body").find(".revolution_included").length == 0) {
    this.replaceWith(
      '<span class="text-center" style="display: inherit;">Save and reload page.</span>'
    );
    return false;
  }

  function click_to_play_video() {
    var $this = $(this),
      $video = $this.find("li video");

    if (!$video.length) return;

    $video.on("play", function () {
      var $btn = $(this).parents("li").find(".video-play");

      $btn.addClass("pause");
      $(this).parents(".tp-caption.fullscreenvideo").addClass("click-video");
    });

    $video.on("pause ended", function () {
      var $btn = $(this).parents("li").find(".video-play");

      $btn.removeClass("pause");
    });

    $this.find(".video-play").on("click", function (e) {
      var $video = $(this).parents("li").find("video");

      $video.trigger("click");
      e.preventDefault();
      e.stopPropagation();
      return false;
    });

    $this.on("revolution.slide.onbeforeswap", function (event, data) {
      $(this).find(".tp-caption.fullscreenvideo").removeClass("click-video");
    });
  }

  function autoplay_video(elem) {
    var $get_sliders = $(this);

    $get_sliders.each(function () {
      var $slider = $(this);

      var set_event = function () {
        $slider.on("revolution.slide.onchange", function (event, data) {
          var $this = $(this),
            $active_slide = $this.find("li").eq(data.slideIndex - 1),
            $video = $active_slide.find("video"),
            autoplay = $active_slide.find(".tp-caption").attr("data-autoplay");

          if ($video.length && autoplay === "true") {
            var video = $video.get(0);

            video.currentTime = 0;

            $slider.one("revolution.slide.onafterswap", function (event, data) {
              if (video.paused) {
                video.play();
              }
            });
          }
        });
      };

      if ($slider.hasClass("revslider-initialised")) {
        set_event();
      } else {
        $slider.one("revolution.slide.onloaded", function () {
          set_event();
        });
      }
    });
  }

  $.fn.resizeRevolution = function (options, new_rev_obj, bp_arr, revdelay) {
    if (!$(this).length || !$(options.slider).length || !options.breakpoints)
      return false;

    var wrapper = this,
      slider = options.slider,
      breakpoints = options.breakpoints,
      fullscreen_BP = options.fullscreen_BP || false,
      new_rev_obj = new_rev_obj || {},
      bp_arr = bp_arr || [],
      rev_obj = {
        dottedOverlay: "none",
        delay: revdelay,
        startwidth: 1920,
        hideThumbs: 200,
        hideTimerBar: "on",

        thumbWidth: 100,
        thumbHeight: 50,
        thumbAmount: 5,

        navigationArrows: "none",

        touchenabled: "on",
        onHoverStop: "on",

        swipe_velocity: 0.7,
        swipe_min_touches: 1,
        swipe_max_touches: 1,
        drag_block_vertical: false,

        parallax: "mouse",
        parallaxBgFreeze: "on",
        parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],

        keyboardNavigation: "off",

        navigationHAlign: "center",
        navigationVAlign: "bottom",
        navigationHOffset: 0,
        navigationVOffset: 20,

        soloArrowLeftHalign: "left",
        soloArrowLeftValign: "center",
        soloArrowLeftHOffset: 20,
        soloArrowLeftVOffset: 0,

        soloArrowRightHalign: "right",
        soloArrowRightValign: "center",
        soloArrowRightHOffset: 20,
        soloArrowRightVOffset: 0,

        shadow: 0,

        spinner: "",
        h_align: "left",

        stopLoop: "off",
        stopAfterLoops: -1,
        stopAtSlide: -1,

        shuffle: "off",

        autoHeight: "off",
        forceFullWidth: "off",

        hideThumbsOnMobile: "off",
        hideNavDelayOnMobile: 1500,
        hideBulletsOnMobile: "off",
        hideArrowsOnMobile: "off",
        hideThumbsUnderResolution: 0,

        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        startWithSlide: 0,
        fullScreenOffsetContainer: "",
      };

    $.extend(rev_obj, new_rev_obj);

    var get_Slider = function ($sliderWrapp) {
      return $sliderWrapp.find(slider);
    };

    var get_current_bp = function () {
      var wind_W = window.innerWidth;

      for (var i = 0; i < breakpoints.length; i++) {
        var bp = breakpoints[i];

        if (!breakpoints.length) return false;

        if (wind_W <= bp) {
          if (i === 0) {
            return bp;
          } else {
            if (bp > breakpoints[i - 1]) return bp;
          }
        } else if (wind_W > bp && i === breakpoints.length - 1) return Infinity;
      }
      return false;
    };

    var $sliderWrappers = $(wrapper);

    $sliderWrappers.each(function () {
      var $sliderWrapp = $(this),
        $sliderInit = get_Slider($sliderWrapp),
        $sliderCopy = $sliderWrapp.clone(),
        bp = get_current_bp();

      if (!$sliderInit.length) return false;

      var start_Rev = function ($sliderInit, bp) {
        var wind_W = window.innerWidth,
          rev_settings_obj = {},
          rev_screen_obj = {},
          set_rev_obj = {};

        if (fullscreen_BP) {
          var full_width = wind_W >= fullscreen_BP ? "off" : "on",
            full_screen = wind_W >= fullscreen_BP ? "on" : "off";

          rev_screen_obj = {
            fullWidth: full_width,
            fullScreen: full_screen,
          };
        }

        if (bp_arr.length) {
          for (var i = 0; i < bp_arr.length; i++) {
            var this_obj = bp_arr[i];

            if (
              this_obj.bp &&
              this_obj.bp.length === 2 &&
              this_obj.bp[0] < this_obj.bp[1]
            ) {
              var from = this_obj.bp[0],
                to = this_obj.bp[1];

              if (from <= bp && to >= bp) {
                for (var key in this_obj) {
                  if (key !== "bp") rev_settings_obj[key] = this_obj[key];
                }
              }
            }
          }
        }

        $.extend(set_rev_obj, rev_obj, rev_settings_obj, rev_screen_obj);

        $($sliderInit).show().revolution(set_rev_obj);

        $(options.functions).each(function () {
          this.call($sliderInit);
        });
      };

      start_Rev($sliderInit, bp);

      var restart_Rev = function (current_bp) {
        if (!$($sliderInit).hasClass("revslider-initialised")) return;
        bp = current_bp || 0;
        $sliderInit.revkill();
        $sliderWrapp.replaceWith($sliderCopy);
        $sliderWrapp = $sliderCopy;
        $sliderCopy = $sliderWrapp.clone();
        $sliderInit = get_Slider($sliderWrapp);
        start_Rev($sliderInit, bp);
      };

      function endResize(func) {
        var windWidth = window.innerWidth,
          interval;

        interval = setInterval(function () {
          var windWidthInterval = window.innerWidth;
          if (windWidth === windWidthInterval) {
            setTimeout(function () {
              func();
            }, 200);
          }
          clearInterval(interval);
        }, 100);
      }

      $(window).on("resize", function () {
        endResize(function () {
          var current_bp = get_current_bp();
          if (current_bp !== bp) restart_Rev(current_bp);
        });
      });
    });
  };

  var delay = this.data("speed"),
    fullscreen = this.attr("data-fullscreen") == "false" ? false : 768,
    width = this.attr("data-width"),
    height = this.attr("data-height");

  if (this.hasClass("revolution-default")) {
    console.log("hasClass", fullscreen, height);
    this.resizeRevolution(
      {
        slider: ".tp-banner",
        breakpoints: [414, 767, 1025],
        fullscreen_BP: fullscreen,
        functions: [click_to_play_video, autoplay_video],
      },
      {
        fullScreenOffsetContainer: "header",
        navigationArrows: "true",
        startwidth: width || 1920,
        startheight: height || 800,
      },
      [
        {
          bp: [0, 768],
          startheight: height || 1200,
        },
      ],
      delay
    );
  } else {
    this.resizeRevolution(
      {
        slider: ".tp-banner",
        breakpoints: [414, 767, 1025],
        fullscreen_BP: 768,
        functions: [click_to_play_video, autoplay_video],
      },
      {
        fullScreenOffsetContainer: "header-static",
      },
      [
        {
          bp: [0, 768],
          startheight: 1300,
        },
        {
          bp: [0, 1025],
          fullScreenOffsetContainer: "header",
        },
      ],
      delay
    );
  }
};

$("body").on("click", ".tt-review, .tt-rating", function (e) {
  if ($(this).closest(".tt-review").length) {
    $("#tab_review").length && findAndViewReviews();
  } else {
    window.location = $(this).closest(".tt-rating").data("url") + "?tab_review";
  }
});
$(document).ready(function () {
  var s = window.location.search;
  if (s.indexOf("tab_review") == -1 || $("#tab_review").length == 0)
    return false;
  setTimeout(findAndViewReviews, 2000);
});
function findAndViewReviews() {
  var y = $("#tab_review").offset().top;
  var d =
    $(".tt-stuck-nav").length && $(".tt-stuck-nav.disabled").length == 0
      ? $(".tt-stuck-nav").height()
      : 0;
  $("html, body").animate(
    {
      scrollTop: y - d,
    },
    500
  );
  if ($("#tab_review").hasClass("nav-link")) {
    $("#tab_review").trigger("click");
  } else {
    !$("#tab_review").hasClass("active") &&
      $("#tab_review").find(".tt-collapse-title").trigger("click");
  }
}

/* Search autocomplite */
$(function () {
  // Current Ajax request.
  var currentAjaxRequest = null;
  // Grabbing all search forms on the page, and adding a .search-results list to each.
  var searchForms = $('form[action="/search"]').each(function () {
    // Grabbing text input.
    var input = $(this).find('input[name="q"]');
    // Adding a list for showing search results.
    var offSet = input.position().top + input.innerHeight() + 1;
    $('<div class="search-results"></div>').appendTo($(this)).hide();
    // Listening to keyup and change on the text field within these search forms.
    input.attr("autocomplete", "off").bind("keyup change", function () {
      // What's the search term?
      var term = $(this).val();
      // What's the search form?
      var form = $(this).closest("form");
      // What's the search URL?
      var searchURL = "/search?type=product&q=" + term;
      // What's the search results list?
      var resultsList = form.find(".search-results");
      // If that's a new term and it contains at least 3 characters.
      if (term.length > 3 && term != $(this).attr("data-old-term")) {
        // Saving old query.
        $(this).attr("data-old-term", term);
        // Killing any Ajax request that's currently being processed.
        if (currentAjaxRequest != null) currentAjaxRequest.abort();
        // Pulling results.
        currentAjaxRequest = $.getJSON(
          searchURL + "&view=json",
          function (data) {
            // Reset results.
            resultsList.empty();
            // If we have no results.
            if (data.results_count == 0) {
              resultsList.hide();
            } else {
              var resultsList_ul = resultsList.append("<ul></ul>");
              resultsList_ul = resultsList_ul.find("ul");
              // If we have results.
              $.each(data.results, function (index, item) {
                if (index >= 6) return false;
                var link = $("<a></a>").attr("href", item.url);
                link.append(
                  '<div class="thumbnail"><img src="' +
                    item.thumbnail +
                    '" /></div>'
                );
                link.append(
                  '<div class="tt-description"><div class="tt-title">' +
                    item.title +
                    "</div></div>"
                );
                link.wrap("<li></li>");
                resultsList_ul.append(link.parent());
              });
              // The Ajax request will return at the most 10 results.
              // If there are more than 10, let's link to the search results page.
              if (data.results_count > 6) {
                resultsList.append(
                  '<div class="tt-view-all"><a href="' +
                    searchURL +
                    '">See all results (' +
                    data.results_count +
                    ")</a></div>"
                );
              }
              resultsList.fadeIn(200);
            }
          }
        );
      }
    });
  });
  // Clicking outside makes the results disappear.
  $("body").bind("click", function () {
    $(".search-results").hide();
  });
});

$(".tt-carousel-products-js").length ||
  ($(".tt-carousel-products").length && initProductsSlickResize());
function initProductsSlickResize() {
  $(window).resize(function () {
    $(".tt-carousel-products").length &&
      $(".tt-carousel-products").slick("setPosition");
    $(".tt-carousel-products-js").length &&
      $(".tt-carousel-products-js").slick("setPosition");
    alignmentArrowValue();
  });
}

$(document).ready(function () {
  if ($(".menu_language_holder").length == 0) return false;
  setTimeout(wgDefault, 100);
});
function wgDefault() {
  if ($(".wg-default").length == 0) return false;
  var css_link = $(".menu_language_holder").data("css");
  var wgDefault = $(".wg-default").detach().addClass("menu_language_holder");
  var $ul = $(".menu_language_holder");
  $ul.replaceWith(wgDefault);
  $(
    '<link href="' +
      css_link +
      '" rel="stylesheet" type="text/css" media="all">'
  ).appendTo("body");
}

var tooltip = {
  html_i: "#tt-tooltip-popup",
  html_s: '<div id="tt-tooltip-popup"><span>',
  html_e: "</span><i></i></div>",
  tp_attr: "[data-tooltip]",
  tp_mod: false,
  init: function () {
    this.tp_mod = this.get_tp_mod();
    if (
      !this.tp_mod.length ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    )
      return false;
    this.handler();
  },
  get_tp_attr: function () {
    return this.tp_attr;
  },
  get_tp_mod: function () {
    return $(this.get_tp_attr());
  },
  get_w_width: function () {
    return window.innerWidth || $window.width();
  },
  get_html_obj: function (name) {
    return this.html_s + name + this.html_e;
  },
  check_pr_page_swatches: function ($obj) {
    var swc = $obj.closest(".tt-swatches-container");
    var search = $obj.closest(".tt-search");
    var qv = $obj.closest(".tt-btn-quickview");
    var cc = $obj.closest(".tt-collapse-content");
    var wl = $obj.closest(".wlbutton-js");
    var co = $obj.closest(".compare-js");
    if (
      !swc.length &&
      !search.length &&
      !qv.length &&
      !cc.length &&
      !wl.length &&
      !co.length
    )
      return false;
    return true;
  },
  handler: function () {
    var _ = this;
    $("body").on("mouseenter mouseleave", this.get_tp_attr(), function (e) {
      var ww = _.get_w_width();
      if (ww <= 1024) return false;
      if (e.type === "mouseenter") _.onHover($(this));
      if (e.type === "mouseleave") _.offHover($(this));
    });
  },
  onHover: function ($obj) {
    var _ = this,
      value = $obj.attr("data-tooltip"),
      $o = $(this.get_html_obj(value)),
      tposition = $obj.attr("data-tposition"),
      ftag = $obj.attr("data-findtag");

    if (value == "") return false;

    $body.append($o);

    var $objforsize =
        typeof ftag != "undefined" ? $obj.find(ftag).first() : $obj,
      th = $o.innerHeight(),
      tw = $o.innerWidth(),
      oh = $objforsize.innerHeight(),
      ow = $objforsize.innerWidth(),
      v = $objforsize.offset().top,
      h = $objforsize.offset().left;

    tposition = typeof tposition != "undefined" ? tposition : "top";

    if (tposition == "top") {
      v += -th - 20;
      h += parseInt((ow - tw) / 2);
    }
    if (tposition == "bottom") {
      v += oh + 24;
      h += parseInt((ow - tw) / 2);
    }
    if (tposition == "left") {
      v += parseInt((oh - th) / 2);
      h += -tw - 24;
    }
    if (tposition == "right") {
      v += parseInt((oh - th) / 2);
      h += ow + 24;
    }

    this.showTooltip($o, h, v, tposition);

    if (!this.check_pr_page_swatches($obj)) return false;
    $obj.on("click.closeTooltip", function () {
      _.offHover($(this));
      $(this).unbind("click.closeTooltip");
    });
  },
  offHover: function ($obj) {
    $body.find(this.html_i).remove();

    if (!this.check_pr_page_swatches($obj)) return false;
    $obj.unbind("click.closeTooltip");
  },
  showTooltip: function ($o, h, v, p) {
    p = p || "top";
    var a = { opacity: 1 },
      k = p;
    if (k == "bottom") k = "top";
    if (k == "right") k = "left";

    a[k] = p == "bottom" || p == "right" ? "-=10px" : "+=10px";

    $o.css({ top: v, left: h })
      .addClass("tooltip-" + p)
      .animate(a, 200);
  },
};
$(document).ready(function () {
  tooltip.init();
});

var wl_handler = {
  action_r: "wk-remove",
  action_a: "wk-add",
  loader_t: "Be patient",
  tooltip: "#tt-tooltip-popup",
  noevents: "wkapp_load",
  init: function () {
    if (!$(".wlbutton-js").length) return false;

    var _ = this;

    $("body").on("click", ".wlbutton-js", function (e) {
      e.preventDefault();
      if ($(this).hasClass(_.noevents)) return false;

      if (_.getcustomerid() == "") {
        $("#ModalMessage").modal("show");
        return false;
      }

      var $this = $(this),
        data = {
          action: $this.attr("data-action"),
          text_a: $this.attr("data-add"),
          text_r: $this.attr("data-remove"),
          namespace: $this.attr("data-type"),
          key: $this.attr("data-productid"),
          value: $this.attr("data-producth"),
        };

      $this
        .addClass(_.noevents)
        .attr("data-tooltip", _.loader_t)
        .trigger("mouseenter");
      data.action == _.action_a
        ? _.add_handler($this, data)
        : _.remove_handler($this, data);
    });
  },
  getcustomerid: function () {
    return wokiee_app.main_info.customerid;
  },
  getloadertext: function () {
    return wokiee_app.loader_text;
  },
  getappurl: function () {
    return "https://" + wokiee_app.url;
  },
  add_handler: function ($el, obj) {
    var _ = this;

    $.ajax({
      type: "POST",
      url: _.getappurl() + "/api/add",
      data: $.extend({}, wokiee_app.main_info, {
        namespace: obj.namespace,
        key: obj.key,
        value: obj.value,
      }),
      cache: false,
      success: function (data) {
        $el
          .removeClass(_.noevents)
          .attr("data-action", _.action_r)
          .attr("data-tooltip", obj.text_r);

        if ($el.hasClass("prpagebtn-js")) {
          var s = $el.attr("data-prpage-rem");
          $el.find("span").text(s);
        }

        $el.is(":hover") && $el.trigger("mouseleave").trigger("mouseenter");
      },
      error: function (XMLHttpRequest, textStatus) {
        alert("error");
        $el.removeClass(_.noevents);
      },
    });
  },
  remove_handler: function ($el, obj) {
    var _ = this;

    $.ajax({
      type: "POST",
      url: _.getappurl() + "/api/delete",
      data: $.extend({}, wokiee_app.main_info, {
        namespace: obj.namespace,
        key: obj.key,
        _method: "DELETE",
      }),
      cache: false,
      success: function (data) {
        if ($el.closest(".wkpageinfo").length) {
          $el
            .closest(".product-parent")
            .parent()
            .fadeOut(400, function () {
              $el.is(":hover") && $el.trigger("mouseleave");
              var $p = $(this).parent();
              $(this).remove();
              if (!$p.children().length) {
                $p.closest(".wkpageinfo")
                  .parent()
                  .find(".wkpagenoinfo")
                  .removeClass("hide")
                  .parent()
                  .find(".wkpageinfo")
                  .remove();
              }
            });
        } else {
          $el
            .removeClass(_.noevents)
            .attr("data-action", _.action_a)
            .attr("data-tooltip", obj.text_a);

          $el.is(":hover") && $el.trigger("mouseleave").trigger("mouseenter");

          if ($el.hasClass("prpagebtn-js")) {
            var s = $el.attr("data-prpage-add");
            $el.find("span").text(s);
          }
        }
      },
      error: function (XMLHttpRequest, textStatus) {
        alert("error");
        $el.removeClass(_.noevents);
      },
    });
  },
};
wl_handler.init();

var ct = {
  mainc: ".tt-compare-table-js",
  slider: $("#tt-compare-table").find(".compare-init-slider"),
  init: function () {
    if (!$(this.mainc).length) return false;
    $(window).resize(ct.resizeHandler);
  },
  handler: function () {
    var a = this.getSizes();
    this.setSizes(a);
    this.slider.slick("slickGoTo", 0);
    $(".tt-compare-table").removeAttr("style");
    a = false;
    setTimeout(function () {
      ct.replaceSliderArrows($(".tt-image-box-last").first().position().top);
    }, 200);
  },
  setSizes: function (a) {
    $(this.mainc).each(function () {
      $(this)
        .children()
        .each(function (index) {
          $(this).outerHeight(a[index]);
        });
    });
  },
  getSizes: function () {
    var a = [];
    $(this.mainc).each(function () {
      $(this)
        .children()
        .each(function (index) {
          a[index] = typeof a[index] != "undefined" ? a[index] : 0;
          a[index] = Math.max(a[index], $(this).outerHeight());
        });
    });
    return a;
  },
  resizeHandler: function (t) {
    t = t || 100;
    $(".tt-compare-table").css({ opacity: 0 });
    $(ct.mainc).children().removeAttr("style");
    $(ct.mainc).find(".tt-btn-addtocart").removeAttr("style");
    setTimeout(function () {
      ct.handler();
    }, t);
  },
  replaceSliderArrows: function (h) {
    var prev = $(".compare-init-slider").find(".slick-prev"),
      next = $(".compare-init-slider").find(".slick-next"),
      bh = prev.height(),
      c = parseInt((h - bh) / 2);

    prev.addClass("showarr").css({ top: c });
    next.addClass("showarr").css({ top: c });
  },
  sliderinit: function () {
    this.slider.slick({
      dots: false,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 790,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  },
  sliderunslick: function () {
    this.slider.slick("unslick");
  },
};
var compare = {
  search: "&view=getproduct",
  a_a: "wk-add",
  a_d: "wk-remove",
  space: "comparedata",
  com_json: {},
  com_count: 0,
  com_limit: 0,
  init: function () {
    var _ = this;
    this.comparepage();

    if (!$(".compare-js").length) return false;

    this.selected();
    $(window).on("compareevent", function () {
      var o = $(".compare-js");
      o.length &&
        o.attr("data-action", _.a_a).attr("data-tooltip", o.attr("data-add"));
      _.setPageButtonText(o, "data-prpage-add");
      compare.selected();
    });

    $("body").on("click", ".compare-js", function (e) {
      e.preventDefault();
      var $this = $(this);
      $this.attr("data-action") == _.a_a
        ? compare.setdata($this)
        : compare.deletedata($this);
    });
  },
  comparepage: function () {
    if (!$(".comparepage").length || !this.checkEmptyPage()) return false;

    $(".comparepage").removeClass("hide");

    var _ = this,
      l = $.parseJSON(localStorage[compare.space]);

    this.com_limit = _.getjsonsize(l);

    $.each(l, function (index, value) {
      _.getproduct(index, value);
    });
  },
  createcomparepage: function (l) {
    var _ = this,
      p = $(".compare-init-slider"),
      b = $(".compareitemhtml").find(".tt-item");

    this.setOptionsTable(l, b);

    var count = Object.keys(l).length;
    $(".tt-col-item").attr("data-grid", count);

    $.each(l, function (index, value) {
      var o = b.clone();
      o.find(".tt-remove-item").attr("data-compareid", index);
      o.find(".tt-img")
        .find("a")
        .attr("href", value.url)
        .find("img")
        .attr("src", value.image);
      o.find(".tt-title").find("a").text(value.title).attr("href", value.url);

      if (value.price < value["compare price"]) {
        o.find(".tt-price").find(".new-price").html(value.price);
        o.find(".tt-price").find(".old-price").html(value["compare price"]);
      } else {
        o.find(".tt-price")
          .find(".new-price")
          .html(value.price)
          .removeClass("new-price");
        o.find(".tt-price").find(".old-price").remove();
      }

      if (!Boolean(value.available)) {
        o.find(".tt-btn-addtocart").closest("form").remove();
        o.find(".tt-label-location").children().first().remove();
      }

      o.find("form").find("input").val(index);

      $.each(value.data, function (index, value) {
        var o2 = o.find('[data-val="' + index + '"]');
        o2.length && o2.html(value);
      });

      $.each(value.options, function (index, value) {
        var o2 = o.find('[data-val="' + index + '"]');
        o2.length && o2.html(value);
      });

      p.append(o);
    });

    $("body").trigger("refreshCurrency");
    setTimeout(function () {
      $(window).trigger("resize");
      ct.sliderinit();
    }, 500);
  },
  checkEmptyPage: function () {
    var d = localStorage[compare.space];
    if ((d = d === undefined || d === "undefined")) {
      $(".comparepageempty").removeClass("hide");
      $(".comparepage").remove();
      return false;
    }
    return true;
  },
  setOptionsTable: function (l, $obj) {
    var t = $('.tt-value[data-val="empty"]');
    var tmp = $(".tt-col-title.tt-compare-table-js");
    var tm = $('.title-item[data-val="maintable"]');
    var a = [];

    if (!tm.length) return false;

    $.each(l, function (index, value) {
      $.each(value.options, function (index, value) {
        index != "Title" && !a.includes(index) && a.push(index);
      });
    });
    if (a.length == 0) return false;
    for (var i = 0; i < a.length; i++) {
      $obj.append(t.clone().attr("data-val", a[i]));
      tmp.append(tm.clone().text(a[i]));
    }
  },
  selected: function () {
    var d = localStorage[compare.space];
    if ((d = d === undefined || d === "undefined")) return false;

    var _ = this,
      l = $.parseJSON(localStorage[compare.space]);
    $.each(l, function (index, value) {
      var o = $('[data-compareid="' + index + '"]');
      o.length &&
        o
          .attr("data-action", _.a_d)
          .attr("data-tooltip", o.attr("data-remove"));
      _.setPageButtonText(o, "data-prpage-rem");
    });
  },
  setPageButtonText: function (o, attr) {
    if (o.hasClass("prpagebtn-js")) {
      var s = o.attr(attr);
      o.find("span").text(s);
    }
  },
  getproduct: function (id, url) {
    var _ = this,
      u = url + "?variant=" + id + this.search;
    var params = {
      type: "get",
      url: u,
      success: function (data) {
        compare.com_json[id] = $.parseJSON(data);

        if (compare.com_json[id].hasOwnProperty("url")) {
          compare.com_json[id]["url"] = url + "?variant=" + id;
        }

        compare.checkloadwnd();
      },
      error: function (XMLHttpRequest, textStatus) {
        compare.deleteitem(id);
        compare.checkloadwnd();
        console.log("product not found");
      },
    };
    jQuery.ajax(params);
  },
  checkloadwnd: function () {
    compare.com_count += 1;
    if (compare.com_limit <= compare.com_count) {
      compare.createcomparepage(compare.com_json);
    }
  },
  getjsonsize: function (value) {
    return Object.keys(value).length;
  },
  setdata: function ($obj) {
    var _ = this,
      d = localStorage[compare.space],
      da = $obj.attr("href"),
      value = this.getid($obj);

    d = d === undefined || d === "undefined" ? false : d;

    if (d) {
      d = $.parseJSON(d);
      d[value] = da;
      d = JSON.stringify(d);
    } else {
      var d = '{"' + value + '": "' + da + '"}';
    }

    localStorage[compare.space] = d;

    this.setPageButtonText($obj, "data-prpage-rem");
    $obj
      .attr("data-action", _.a_d)
      .attr("data-tooltip", $obj.attr("data-remove"));
    $obj.is(":hover") && $obj.trigger("mouseleave").trigger("mouseenter");
  },
  getid: function ($obj) {
    return $obj.attr("data-compareid");
  },
  deletedata: function ($obj) {
    var value = this.getid($obj),
      l = localStorage[compare.space];

    if (l === undefined || l === "undefined") {
      $obj.attr("data-action", this.a_a);
      return false;
    }
    l = $.parseJSON(l);

    this.deleteitem(value);
    var count = compare.getjsonsize(l);
    if (l.hasOwnProperty(value) && $(".comparepage").length) {
      count -= 1;
      $obj.closest(".tt-item").fadeOut(function () {
        ct.sliderunslick();
        $('[data-compareid="' + value + '"]').each(function () {
          $(this).closest(".tt-item").remove();
        });
        $(".tt-col-item").attr("data-grid", count);
        ct.sliderinit();
        ct.resizeHandler(0);
        compare.checkEmptyPage();
      });
      return false;
    }

    this.setPageButtonText($obj, "data-prpage-add");
    $obj
      .attr("data-action", this.a_a)
      .attr("data-tooltip", $obj.attr("data-add"));
    $obj.is(":hover") && $obj.trigger("mouseleave").trigger("mouseenter");
  },
  deleteitem: function (value) {
    var l = $.parseJSON(localStorage[compare.space]);
    if (l.hasOwnProperty(value)) {
      var count = compare.getjsonsize(l);
      if (count > 1) {
        delete l[value];
        l = JSON.stringify(l);
        localStorage[compare.space] = l;
      } else {
        localStorage.removeItem(compare.space);
      }
    }
  },
};
$(document).ready(function () {
  compare.init();
  ct.init();
});

if ($(".categories-btn").length) {
  $("body")
    .on("click", ".categories-btn button", function (e) {
      e.preventDefault();
      $(this)
        .parent()
        .toggleClass("opened")
        .find(".tt-dropdown-menu")
        .slideToggle(200);
      $(".categories-btn nav > ul > li").each(function () {
        catbtnsubposition($(this));
        alignicon($(this));
      });
    })
    .on("showStuck hideStuck", function (e) {
      if (e.type == "showStuck") {
        $(".tostuck-det-js").each(function () {
          var n = $(this).attr("data-stuckparent");
          var m = $(this).attr("data-parent");
          transfer(n, m, $(this));
        });
      } else {
        $(".fromstuck-det-js").each(function () {
          var n = $(this).attr("data-parent");
          transfer(n, n, $(this));
        });
      }

      function transfer(n, m, $this) {
        if ($("." + n).length) {
          var o = $this.children().first().detach();
          $("." + n)
            .attr("data-parent", m)
            .append(o);
        }
      }
    })
    .on("mouseenter", ".categories-btn nav > ul > li", function () {
      catbtnsubposition($(this));
    });
  function catbtnsubposition($this) {
    var t = $this.position().top,
      p = $this.find(".dropdown-menu");
    if (!p.length) return false;

    var ph = p.closest("nav").height(),
      h = p.height();

    if (h >= ph) return false;

    p.css({ top: t - 28 });
  }
  function alignicon($this, d) {
    d = d || 1;
    if (!$this.find("svg").length) return false;
    var sh = $this.find("svg").height(),
      th = $this.find("span").height(),
      tp = $this.find("span").position().top - d,
      p = (th - sh) / 2 + tp;
    $this.find("svg").css({ top: p });
  }
  $(document).ready(function () {
    if ($(".catmenumob-js").length) {
      $(".catmenumob-js").initMM({
        enable_breakpoint: true,
        mobile_button: true,
        breakpoint: 1025,
        menu_class: "mobile-caterorie-menu",
      });
    }
    $(".mobile-caterorie-menu #mm0 ul li").each(function () {
      alignicon($(this), 2);
    });
  });
}
function initStickPrLeft() {
  var stickprcol = $(".stickprcol-js"),
    stickprcolheight = $(".stickprcolheight-js"),
    o = stickprcol.attr("data-o", stickprcol.offset().top);
  $("body").on("click", ".tt-collapse-title", function () {
    setTimeout(function () {
      setPosition();
    }, 200);
  });
  setTimeout(function () {
    setPosition();
  }, 500);
  $(window)
    .resize(function () {
      stickprcol.css({ top: 0 });
      o = stickprcol.attr("data-o", stickprcol.offset().top);
      setTimeout(function () {
        setPosition();
      }, 100);
    })
    .scroll(function () {
      setPosition();
    });
  function setPosition() {
    typeof stickprcol.attr("css") !== typeof undefined &&
      stickprcol.removeAttr("css");
    var h =
      stickprcol.children().length == 1
        ? stickprcol.children().height()
        : stickprcol.height();
    if (h > $(window).height()) return false;
    if (h > stickprcolheight.height()) return false;

    if ($(window).width() < 768) return false;
    var m = 68,
      o = stickprcol.attr("data-o"),
      p = stickprcol.position().top,
      w = $(window).scrollTop(),
      mh = stickprcolheight.height() - h - 10,
      ow = Math.max(0, w - o + m);
    ow = Math.min(mh, ow);

    stickprcol.css({ top: ow });
    $(".zoomContainer").length && $(".zoomContainer").css({ top: ow + m * 2 });
  }
}

function onerowActiontoInit() {
  if ($(".tt-quantity").find(".tt-col-one").length) {
    $(".tt-quantity")
      .find("a")
      .click(function () {
        console.log($(this).hasClass("tt-col-one"));
        $(this).hasClass("tt-col-one")
          ? onerowActiontoRight()
          : onerowActiontoBack();
      });
  }

  $(window).resize(function () {
    $(window).width() < 791 ? onerowActiontoBack() : onerowActiontoRight();
  });
  $("body").on("listingpageajax", function () {
    if (!$(".tt-product-listing").hasClass("tt-col-one")) return false;
    onerowActiontoRight();
  });
  if (!$(".tt-product-listing").hasClass("tt-col-one")) return false;
  onerowActiontoRight();
}
function onerowActiontoRight() {
  if ($(window).width() < 791) return false;
  $(".product-parent").each(function () {
    var o = $(this).find(".onerowactions");
    if (o.children().length) return true;
    var p = $(this)
      .find(".tt-price")
      .attr("data-par", "backtottprice")
      .wrap('<div class="backtottprice"/>')
      .detach();
    $(this).find(".onerowactions").append(p);
    p = $(this)
      .find(".tt-product-inside-hover")
      .attr("data-par", "backtorphov")
      .wrap('<div class="backtorphov"/>')
      .detach();
    $(this).find(".onerowactions").append(p);
  });
}
function onerowActiontoBack() {
  $(".product-parent").each(function () {
    var o = $(this).find(".onerowactions");
    if (!o.children().length) return true;
    var p = $(this).find(".tt-price"),
      c = p.attr("data-par");
    $(this)
      .find("." + c)
      .append(p.detach());
    $(this).find(".tt-price").unwrap();

    p = $(this).find(".tt-product-inside-hover");
    c = p.attr("data-par");
    $(this)
      .find("." + c)
      .append(p.detach());
    $(this).find(".tt-product-inside-hover").unwrap();
  });
}

$(document).ready(function () {
  $(".tt-col-one").length && onerowActiontoInit();
  $(".stickprcol-js").length && initStickPrLeft();
});
