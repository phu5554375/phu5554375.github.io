/////////// TAB

$(function () {
	'use strict';

	var $swipeTabsContainer = $('.swipe-tabs'),
		$swipeTabs = $('.swipe-tab'),
		$swipeTabsContentContainer = $('.swipe-tabs-container'),
		currentIndex = 0,
		activeTabClassName = 'active-tab';

	$swipeTabsContainer.on('init', function(event, slick) {
		$swipeTabsContentContainer.removeClass('invisible');
		$swipeTabsContainer.removeClass('invisible');

		currentIndex = slick.getCurrent();
		$swipeTabs.removeClass(activeTabClassName);
       	$('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
	});

	$swipeTabsContainer.slick({
		slidesToShow: 3.25,
		// slidesToShow: 4.85,
		slidesToScroll: 1,
		arrows: false,
		infinite: false,
		swipeToSlide: true,
        touchThreshold: 10,
        // responsiveClass: true,
        // responsive: {
        //     0: {
        //         items: 2
        //       },
          
        //       600: {
        //         items: 2
        //       },
          
        //       1024: {
        //         items: 2
        //       },
          
        //       1366: {
        //         items: 5
        //       },
        //       1600: {
        //         items: 5,
        //       }
        // }
	});

	$swipeTabsContentContainer.slick({
		asNavFor: $swipeTabsContainer,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		infinite: false,
		swipeToSlide: true,
    draggable: false,
		touchThreshold: 10
	});


	$swipeTabs.on('click', function(event) {
        // gets index of clicked tab
        currentIndex = $(this).data('slick-index');
        $swipeTabs.removeClass(activeTabClassName);
        $('.swipe-tab[data-slick-index=' + currentIndex +']').addClass(activeTabClassName);
        $swipeTabsContainer.slick('slickGoTo', currentIndex);
        $swipeTabsContentContainer.slick('slickGoTo', currentIndex);
    });

    //initializes slick navigation tabs swipe handler
    $swipeTabsContentContainer.on('swipe', function(event, slick, direction) {
    	currentIndex = $(this).slick('slickCurrentSlide');
		$swipeTabs.removeClass(activeTabClassName);
		$('.swipe-tab[data-slick-index=' + currentIndex + ']').addClass(activeTabClassName);
	});
});


////////// SWIPE PRODUCTS - PRODUCTS DETAILS

"use strict";
window.SwipeMenu = (()=>{
  return function SwipeMenu(container){
    var menu = container.querySelector("ul"), 
        prev = container.querySelector(".prev"), 
        next = container.querySelector(".next"), 
      
        wait = false, fps = 50, loop = 15, currentX, scrollLeft = 0;    
    ['mousedown', 'touchstart'].forEach(evt=> {
        menu.addEventListener(evt, e=>{
            currentX = e.type == "mousedown" ? e.pageX : e.targetTouches[0].pageX;
            scrollLeft = menu.scrollLeft;
        });
    });
    ['mouseup', 'touchend'].forEach(evt=>{
        document.addEventListener(evt,e=>{
            currentX = 0;
        });
    });
    ['mousemove', 'touchmove'].forEach(evt=>{
        document.addEventListener(evt, e=> {
            if (!currentX||wait) return;
            wait = true;//throttle 
            setTimeout(function () {
                wait = false;
            }, 1000 / fps);
            var offset = e.type == "mousemove" ? e.pageX : e.targetTouches[0].pageX;
            menu.scrollLeft = scrollLeft + currentX - offset;
        });
    });
    menu.addEventListener("scroll", e=>{
      updateControlStatus();
    });
    prev.addEventListener("click", e=>{
        anim(-menu.offsetWidth / loop, 0);
    });
    next.addEventListener("click",e=>{
        anim(+menu.offsetWidth / loop, 0);
    });

    var anim = (r, l)=>{
        if (l >= loop) return;
        menu.scrollLeft += r;
        requestAnimationFrame(()=>anim(r, l + 1));
    };
    var updateControlStatus = ()=>{
      prev.classList.toggle("disabled",menu.scrollLeft == 0);
      next.classList.toggle("disabled",menu.scrollLeft + menu.offsetWidth >= menu.scrollWidth);
    };    
  }
})();
new SwipeMenu(document.querySelector(".swipe"));


