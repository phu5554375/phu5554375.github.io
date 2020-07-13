(function($, undefined) {
    "use strict";
    var doc = $(document), body = $("body"), win = $(window), breaks = {
        xs: 576,
        sm: 768,
        md: 992,
        lg: 1200
    };
    $.fn.ui_navbar = function() {
        var navbar = this;
        var toggle = $(".ui-mobile-nav-toggle");
        var navbar_nav = $(".ui-navigation");
        win.scroll(function() {
            var scroll_top = $(this).scrollTop();
            if (body.hasClass("ui-transparent-nav") && !body.hasClass("mobile-nav-active")) {
                if (scroll_top >= 24) {
                    navbar.removeClass("transparent");
                } else {
                    navbar.addClass("transparent");
                }
            }
        });
        toggle.html("<div><span></span><span></span><span></span><span></span></div>");
        var toggle_nav = function() {
            var win_top = win.scrollTop();
            if (!body.hasClass("mobile-nav-active")) {
                body.addClass("mobile-nav-active");
                toggle.addClass("active");
                navbar_nav.slideDown(250, function() {
                    navbar_nav.find("li").animate({
                        opacity: 1
                    }, 350);
                });
                if (body.hasClass("ui-transparent-nav")) {
                    navbar.removeClass("transparent");
                }
            } else {
                body.removeClass("mobile-nav-active");
                toggle.removeClass("active");
                navbar_nav.find("li").animate({
                    opacity: 0
                }, 100, function() {
                    navbar_nav.slideUp(200);
                });
                if (body.hasClass("ui-transparent-nav")) {
                    if (win_top < 24) {
                        navbar.addClass("transparent");
                    }
                }
            }
        };
        toggle.on("click", function(e) {
            e.preventDefault();
            toggle_nav();
        });
        win.resize(function() {
            var w = $(this).width();
            var win_top = win.scrollTop();
            if (w >= breaks.md) {
                navbar_nav.find("li").css({
                    opacity: 1
                });
                if (body.hasClass("mobile-nav-active")) {
                    body.removeClass("mobile-nav-active");
                    toggle.removeClass("active");
                    if (body.hasClass("ui-transparent-nav")) {
                        if (win_top < 24) {
                            navbar.addClass("transparent");
                        }
                    }
                }
                navbar_nav.show();
            } else {
                if (!body.hasClass("mobile-nav-active")) {
                    navbar_nav.hide();
                }
                navbar_nav.find("[data-scrollto]").on("click", function() {
                    navbar_nav.hide();
                });
            }
            if (w >= breaks.md) {
                navbar_nav.insertAfter(".navbar-brand");
            } else {
                navbar_nav.appendTo(navbar);
            }
            $(".ui-variable-logo").css({
                width: $(".ui-variable-logo img").width() + 32 + "px"
            });
        });
    };
    
    $.fn.ui_app_showcase = function() {
        var showcase = this;
        var col_txt_a = this.find('[data-col="text_a"]').get(0).outerHTML;
        var col_txt_b = this.find('[data-col="text_b"]').get(0).outerHTML;
        var col_img = this.find('[data-col="img"]').get(0).outerHTML;
        win.on("resize", function() {
            if ($(this).width() >= breaks.sm) {
                showcase.html(col_txt_a + col_img + col_txt_b);
            } else {
                showcase.html(col_img + '<div class="col-xs-8" data-vertical_center="true"><div class="row">' + col_txt_a + col_txt_b + "</div></div>");
            }
        });
    };
    $.fn.ui_app_screens = function() {
        this.owlCarousel({
            center: true,
            loop: true,
            margin: 16,
            autoWidth: true
        });
    };
    $.fn.ui_device_slider = function() {
        var id = this.attr("id");
        var items = this.find(".item").length;
        var z = false;
        var y = false;
        var owl = this.owlCarousel({
            loop: true,
            margin: 0,
            nav: false,
            dots: true,
            items: 1,
            autoWidth: true
        });
        owl.on("changed.owl.carousel", function(event) {
            z = true;
            if (!y) {
                var slide = event.relatedTarget.normalize(event.item.index, true) - 2;
                if (slide < 0) {
                    slide = items + slide + 1;
                } else {
                    slide = slide + 1;
                }
                $('[data-toggle_slider="' + id + '"][data-toggle_screen="' + slide + '"]').trigger("click");
            }
            z = false;
        });
        $('[data-toggle_slider="' + id + '"][data-toggle_screen]').on("click", function() {
            y = true;
            if (!z) {
                var i = $(this).data("toggle_screen") - 1;
                owl.trigger("to.owl.carousel", i);
            }
            y = false;
        });
    };
 
  
    $.fn.ui_scroll_to = function() {
        var link = $("[data-scrollto]");
        link.on("click", function(e) {
            e.preventDefault();
            var scroll_to = $(this).attr("data-scrollto");
            if ($("#" + scroll_to + ".section").length > 0 && scroll_to !== undefined) {
                var pos = $("#" + scroll_to).offset().top;
                $("html, body").animate({
                    scrollTop: pos
                }, 500, function() {
                    window.location.hash = scroll_to;
                });
            }
        });
    };
    $.fn.ui_action_card = function() {
        var card = this;
        card.on("click", function() {
            window.location.href = $(this).data("target");
        });
    };
  
    images_loaded();
    function images_loaded() {
        var images = doc.find("img");
        var total = images.length;
        var loaded = 0;
        var dummy = $("<img/>");
        images.each(function() {
            var img_src = $(this).attr("src");
            dummy.attr("src", img_src).on("load", function() {
                loaded++;
                if (loaded >= total) {
                    setTimeout(function() {
                        doc.trigger("images_did_load");
                    }, 300);
                }
            });
        });
    }
    $("[data-max_width]").each(function() {
        $(this).css({
            "max-width": $(this).attr("data-max_width") + "px"
        });
    });
    $.fn.isOnScreen = function() {
        var viewport = {
            top: win.scrollTop()
        };
        viewport.bottom = viewport.top + win.height();
        var bounds = this.offset();
        bounds.bottom = bounds.top + this.outerHeight();
        var winWidth = win.width();
        if (winWidth > breaks.lg) {
            return !(viewport.bottom < bounds.top + 200 || viewport.top > bounds.bottom + 60);
        } else {
            return !(viewport.bottom < bounds.top + 20 || viewport.top > bounds.bottom + 20);
        }
    };
    win.scroll(function() {
        $("[data-show]").not(".animated").each(function() {
            var el = $(this);
            var show_animation = $(this).attr("data-show");
            var animation_delay = $(this).attr("data-delay");
            if (el.isOnScreen()) {
                if (!animation_delay) {
                    el.addClass(show_animation);
                } else {
                    setTimeout(function() {
                        el.addClass(show_animation);
                    }, animation_delay);
                }
                el.addClass("animated");
            }
        });
    });
   
   
    if ($(".ui-turncate-text").length) {
        var txtElements = $(".ui-turncate-text");
        var resizeThreshold2;
        txtElements.each(function() {
            var el = $(this);
            var originalText = el.children("p").text();
            win.on("resize", function() {
                clearTimeout(resizeThreshold2);
                resizeThreshold2 = setTimeout(function() {
                    el.children("p").text(originalText);
                }, 200);
                resizeThreshold2 = setTimeout(function() {
                    txtElements.dotdotdot();
                }, 250);
            });
        });
    }
    if ($(".ui-logos-cloud").length) {
        var cloud_wrapper = $(".ui-logos-cloud");
        var logos = cloud_wrapper.children();
        logos.each(function() {
            var el = $(this);
            var size = el.attr("data-size");
            el.css({
                width: 10 * size + "px",
                height: 10 * size + "px"
            });
        });
    }
    win.on("scroll", function() {
        var cur_pos = $(this).scrollTop();
        $(".section").each(function() {
            var section = $(this);
            var section_id = $(this).attr("id");
            var top = section.offset().top - 60, bottom = top + section.outerHeight();
            if (cur_pos >= top && cur_pos <= bottom) {
                $('[data-scrollto="' + section_id + '"]').parent().addClass("active").siblings().removeClass("active");
            } else {
                $('[data-scrollto="' + section_id + '"]').parent().removeClass("active");
            }
        });
    });
    win.on("resize", function() {
        if (win.width() >= 740) {
            $(".pricing-sidebar .pricing-header").height($(".pricing-block .pricing-header").outerHeight());
        } else {
            $(".pricing-sidebar .pricing-header").height("auto");
        }
    });
    $(".price-toggle").on("click", function() {
        var btn = $(this);
        var target = btn.attr("data-toggle");
        var btn_class = btn.attr("class");
        var sibling_class = btn.siblings().attr("class");
        btn.attr("class", sibling_class);
        btn.siblings().attr("class", btn_class);
        if (target === "monthly_price") {
            $(".price-wrapper[data-price_mo]").each(function() {
                var price = $(this).attr("data-price_mo");
                var price_arr = price.split(".");
                $(this).children(".price").text(price_arr[0]);
                $(this).children(".price-postfix").text("." + price_arr[1]);
            });
        } else {
            $(".price-wrapper[data-price_ann]").each(function() {
                var price = $(this).attr("data-price_ann");
                var price_arr = price.split(".");
                $(this).children(".price").text(price_arr[0]);
                $(this).children(".price-postfix").text("." + price_arr[1]);
            });
        }
    });
    $(".navbar").ui_navbar();
    // if ($("[data-uhd]").length) {
    //     $("[data-uhd]").ui_uhd_images();
    // }
    if ($("[data-scrollto]").length) {
        $("[data-scrollto]").ui_scroll_to();
    }
    if ($(".ui-hero-slider").length) {
        $(".ui-hero-slider").ui_hero_slider();
    }
    if ($(".ui-app-showcase").length) {
        $(".ui-app-showcase").ui_app_showcase();
    }
    if ($(".ui-accordion-panel").length) {
        $(".ui-accordion-panel").each(function() {
            $(this).ui_accordion();
        });
    }
    if ($(".ui-device-slider").length) {
        $(".ui-device-slider .screens").each(function() {
            $(this).ui_device_slider();
        });
    }
    if ($(".ui-pricing-cards").length) {
        $(".ui-pricing-cards").ui_pricing_cards();
    }
    if ($(".ui-testimonials").length) {
        $(".ui-testimonials").ui_testimonials();
    }
    if ($(".ui-stats").length) {
        $(".ui-stats").ui_stats();
    }
    if ($(".ui-app-screens").length) {
        $(".ui-app-screens").ui_app_screens();
    }
    if ($(".ui-video-toggle").length) {
        $(".ui-video-toggle").ui_video_player();
    }
    if ($(".ui-collapsible-nav").length) {
        doc.ui_collapsible_nav();
    }
    if ($(".ui-action-card").length) {
        $(".ui-action-card").ui_action_card();
    }
    if ($(".ui-instagram-widget .insta-feed").length) {
        $(".ui-instagram-widget .insta-feed").ui_instagram_feed();
    }
    win.trigger("scroll");
    win.trigger("resize");
    doc.imagesLoaded(function() {
        win.trigger("resize");
        $('[data-fade_in="on-load"]').animate({
            opacity: 1
        }, 450);
    });
})(jQuery);