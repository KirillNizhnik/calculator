function getURLVar(t) {
    var e = [], o = String(document.location).split("?");
    if (o[1]) {
        var a = o[1].split("&");
        for (i = 0; i < a.length; i++) {
            var n = a[i].split("=");
            n[0] && n[1] && (e[n[0]] = n[1])
        }
        return e[t] ? e[t] : ""
    }
}
var getAllUrlParams = function (url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = typeof url === 'undefined' ? window.location.href : url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};
function animateCall(t) {
    $(t).delay(200).animate({opacity: "toggle"}, 1e3, function () {
        animateCall(t)
    })
}
function get_popup_view(t, m) {
    $(window).width() > 768 && $.magnificPopup.open({
        tLoading: '<img src="catalog/view/theme/storeset/stylesheet/popup_view/ring-alt.svg" />',
        items: {src: "index.php?route=extension/module/popup_view&product_id=" + t +'&mod_type='+ m, type: "ajax"}
    })
}
function getCartMobile() {
    $.getJSON("index.php?route=common/cart/mobileinfo", function (t) {
        var e = t.mobile_total;
        $(".cart-cols").html(e), $(".cart-cols").fadeIn("fast")
    })
}
function cartremove(t) {
    var e = t;
    $.post("index.php?route=checkout/cart/remove", {key: e}, function (t) {
        $("#cart-total").html(t.total)
    }), $("#partcont").append('<div id="loading-mask"></div>'), setTimeout(function () {
        $("#partcont").load("index.php?route=common/cart/info #cart > *"), getCartMobile()
    }, 400)
}
function getURLVar(t) {
    var e = [], o = String(document.location).split("?");
    if (o[1]) {
        var a = o[1].split("&");
        for (i = 0; i < a.length; i++) {
            var n = a[i].split("=");
            n[0] && n[1] && (e[n[0]] = n[1])
        }
        return $("#partcont").load("index.php?route=module/cart #cart > *"), e[t] ? e[t] : ""
    }
}
function addToCart(t, e, mod) {
    e = "undefined" != typeof e ? e : 1, $.ajax({
        url: "index.php?route=checkout/cart/add",
        type: "post",
        data: 'product_id=' + t + '&quantity=' + e + '&data_mod_type=' + mod,
        dataType: "json",
        success: function (t) {
            $(".success, .warning, .attention, .information, .error").remove(), t.redirect && (location = t.redirect), t.success && ($("#partcont").html('<div class="mcartdiv"><div class="mcartok">' + t.text_ok + '</div><div class="mcarti"><div class="imagesd"><div class="iconer ' + t.lang + '"></div><img class="mcartimage" src="' + t.image + '"><br /><div class="mcartproductname">' + t.name + '</div></div></div><div class="mcartright">' + t.cart_text1 + ' <br /><br /><a class="testbutton" href="' + t.checkoutlink + '">' + t.cart_button1 + '</a> <div class="mcarthr">&nbsp;</div> ' + t.cart_text2 + ' <br/><br/><button class="testbutton" id="cls">' + t.cart_button2 + '</button></div><div class="clearfix"></div></div>'), $("#part").fadeIn("slow"), $("#cart-total").html(t.total), getCartMobile())
        }
    })
}
function addToWishList(t, m) {
    $.ajax({
        url: "index.php?route=account/wishlist/add",
        type: "post",
        data: "product_id=" + t + '&mod_type=' + m,
        dataType: "json",
        success: function (t) {
            $(".success, .warning, .attention, .information").remove(), t.success && ($("#partcont").html('<div class="mcartdivatem">' + t.success + "</div>"), $("#part").fadeIn("slow"), $("#wishlist-total").html(t.total)), t.info && ($("#partcont").html('<div class="mcartdivatem">' + t.info + "</div>"), $("#part").fadeIn("slow"), $("#wishlist-total").html(t.total))
        }
    })
}
function addToCompare(t) {
    $.ajax({
        url: "index.php?route=product/compare/add",
        type: "post",
        data: "product_id=" + t,
        dataType: "json",
        success: function (t) {
            $(".success, .warning, .attention, .information").remove(), t.success && ($("#partcont").html('<div class="mcartdivatem">' + t.success + "</div>"), $("#part").fadeIn("slow"), $("#compare-total").html(t.total))
        }
    })
}
$(document).ready(function () {
    $("#megamenu-menu a.dropdown-toggle").bind("click", function () {
        "javascript:void(0);" != $(this).attr("href") && $(document).width() > 1024 && (window.document.location = $(this).attr("href"))
    }), getCartMobile(), $(".category-slide").delay(240).css({
        opacity: "1",
        background: "transparent"
    }), $(".sb-search-submit").bind("click", function () {
        e = $("base").attr("href") + "index.php?route=product/search";
        var t = $("#story").val(), o = $("#story").val().length;
        o > 0 && (e += "&search=" + encodeURIComponent(t), location = e)
    }), $("#search input[name='search']").bind("keydown", function (t) {
        if (13 == t.keyCode) {
            e = $("base").attr("href") + "index.php?route=product/search";
            var o = $("#story").val(), a = $("#story").val().length;
            a > 0 && (e += "&search=" + encodeURIComponent(o), location = e)
        }
    }), $(".language a").on("click", function (t) {
        t.preventDefault(), $(".language input[name='code']").attr("value", $(this).attr("href")), $(".language").submit()
    }), $(".top-search-submit").bind("click", function () {
        e = $("base").attr("href") + "index.php?route=product/search";
        var t = $("#story-top").val();
        t && (e += "&search=" + encodeURIComponent(t)), location = e
    }), $(".search-box-top input[name='search']").bind("keydown", function (t) {
        if (13 == t.keyCode) {
            e = $("base").attr("href") + "index.php?route=product/search";
            var o = $("#story-top").val();
            o && (e += "&search=" + encodeURIComponent(o)), location = e
        }
    }), $("#cls").on("click", function (t) {
        $("#part").fadeOut("slow")
    }), $("#part").on("click", function (t) {
        t.stopPropagation(), "" != t.target.id && $("#part").fadeOut("slow")
    }), $("#part").on("touchstart click", function (t) {
        t.stopPropagation(), "" != t.target.id && $("#part").fadeOut("slow")
    }), $("#modaltrigger").leanModal({
        top: 130,
        overlay: .99,
        closeButton: ".hidemodal"
    }), $(".manufacturer-logo").on("mouseover", function (t) {
        $(".manufacturer-description").fadeIn("fast"), $(".manufacturer-description").on("mouseleave", function () {
            $(".manufacturer-description").fadeOut("slow")
        })
    }), $("#header input[name='search']").bind("keydown", function (t) {
        if (13 == t.keyCode) {
            e = $("base").attr("href") + "index.php?route=product/search";
            var o = $("input[name='search']").attr("value");
            o && (e += "&search=" + encodeURIComponent(o)), location = e
        }
    }), $("#cart, #right-block .fa-shopping-bag").on("click", function () {
        $("#partcont").load("index.php?route=common/cart/info #cart > *"), $("#part").fadeIn("slow")
    }), $(".cart-top-mobile").on("click", function () {
        return $("#partcont").load("index.php?route=common/cart/info #cart > *"), $("#part").fadeIn("slow"), event.stopPropagation(), !1
    });
    var t = $(".slideshow-box .owl-carousel");
    t.owlCarousel({
        items: 1,
        autoplay: !0,
        autoplayHoverPause: !0,
        singleItem: !0,
        navigation: !0,
        navText: ['<i class="fa fa-angle-left fa-5x" aria-hidden="true"></i>', '<i class="fa fa-angle-right fa-5x" aria-hidden="true"></i>'],
        pagination: !0,
        loop: 1
    }), t.on("translated.owl.carousel", function (t) {
        $(t.target).find(".owl-item .element-animation-fi").removeAttr("style"), $(t.target).find(".owl-item .element-animation-bi").removeAttr("style"), $(t.target).find(".owl-item.active .element-animation-fi").css("display", "block"), $(t.target).find(".owl-item.active .element-animation-bi").css("display", "block")
    }), $(".slideshow-box .owl-carousel .owl-item.active .element-animation-fi").css("display", "block"), $(".slideshow-box .owl-carousel .owl-item.active .element-animation-bi").css("display", "block"), $("#sidebar-toggle").click(function () {
        return $("#sidebar").toggleClass("hero"), $("#sidebar-toggle").toggleClass("rotate-burger"), $(".sidebar-box").toggleClass("clicked"), !1
    }), $("#show-categories").click(function () {
        return $(".mobile-category").slideToggle("slow"), $("#show-categories > i:last-child").hasClass("fa-caret-down") ? ($("#show-categories > i:last-child").removeClass("fa-caret-down"), $("#show-categories > i:last-child").addClass("fa-caret-up")) : $("#show-categories > i:last-child").hasClass("fa-caret-up") && ($("#show-categories > i:last-child").removeClass("fa-caret-up"), $("#show-categories > i:last-child").addClass("fa-caret-down")), !1
    }), $(".search-top").click(function () {
        return $(this).toggleClass("open"), $(".search-box-top").slideToggle("slow"), !1
    }), $(".category-button").click(function () {
        return $(this).toggleClass("active-submenu"), $(this).parent().find(".submenu").toggleClass("active-submenu-items"), !1
    }), $(".settings").click(function () {
        $(".settings-list").slideDown("fast", function () {
        })
    }), $(".settings").on("mouseleave", function () {
        $(".settings-list").fadeOut("slow")
    }), $(".currency .currency-select").on("click", function (t) {
        t.preventDefault(), $(".currency input[name='code']").attr("value", $(this).attr("name")), $(".currency").submit()
    }), /*$("#sstore-3-level li.active").addClass("open").children("ul").show(),*/ $("#sstore-3-level li.has-sub>a.toggle-a").on("click", function () {
        $(this).removeAttr("href");
        var t = $(this).parent("li");
        t.hasClass("open") ? (t.removeClass("open"), t.find("li").removeClass("open"), t.find("ul").slideUp(200)) : (t.addClass("open"), t.children("ul").slideDown(200), t.siblings("li").children("ul").slideUp(200), t.siblings("li").removeClass("open"), t.siblings("li").find("li").removeClass("open"), t.siblings("li").find("ul").slideUp(200))
    }), $(".parent-title-toggle").on("click", function (t) {
        $(this).toggleClass("opened"), $(this).next().toggleClass("megamenu-ischild-opened"), t.preventDefault(), t.stopPropagation()
    }), $("#megamenu-menu .navbar-header").on("click", function (t) {
        $(this).next().toggleClass("in"), t.preventDefault(), t.stopPropagation()
    });
    var e = document.location.toString();
    $("a").filter(function () {
        return -1 != e.indexOf(this.href)
    }).addClass("current-link"), $(window).width() <= "992" && $(".sidebar-box").on("click touchstart", function (t) {
        $("#sidebar").removeClass("hero"), $(this).removeClass("clicked"), t.preventDefault(), t.stopPropagation()
    })
}), document.documentElement.addEventListener("touchstart", function (t) {
    t.touches.length > 1 && t.preventDefault()
}, !1);
var cart = {
    add: function (t, e) {
        $.ajax({
            url: "index.php?route=checkout/cart/add",
            type: "post",
            data: "product_id=" + t + "&quantity=" + ("undefined" != typeof e ? e : 1),
            dataType: "json",
            beforeSend: function () {
                $("#cart > button").button("loading")
            },
            complete: function () {
                $("#cart > button").button("reset")
            },
            success: function (t) {
                $(".alert, .text-danger").remove(), t.redirect && (location = t.redirect), t.success && ($("#content").parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + t.success + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>'), setTimeout(function () {
                    $("#cart > button").html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + t.total + "</span>")
                }, 100), $("html, body").animate({scrollTop: 0}, "slow"), $("#cart > ul").load("index.php?route=common/cart/info ul li"))
            },
            error: function (t, e, o) {
                alert(o + "\r\n" + t.statusText + "\r\n" + t.responseText)
            }
        })
    }, update: function (t, e) {
        $.ajax({
            url: "index.php?route=checkout/cart/edit",
            type: "post",
            data: "key=" + t + "&quantity=" + ("undefined" != typeof e ? e : 1),
            dataType: "json",
            beforeSend: function () {
                $("#cart > button").button("loading")
            },
            complete: function () {
                $("#cart > button").button("reset")
            },
            success: function (t) {
                setTimeout(function () {
                    $("#cart > button").html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + t.total + "</span>")
                }, 100), "checkout/cart" == getURLVar("route") || "checkout/checkout" == getURLVar("route") ? location = "index.php?route=checkout/cart" : $("#cart > ul").load("index.php?route=common/cart/info ul li")
            },
            error: function (t, e, o) {
                alert(o + "\r\n" + t.statusText + "\r\n" + t.responseText)
            }
        })
    }, remove: function (t) {
        $.ajax({
            url: "index.php?route=checkout/cart/remove",
            type: "post",
            data: "key=" + t,
            dataType: "json",
            beforeSend: function () {
                $("#cart > button").button("loading")
            },
            complete: function () {
                $("#cart > button").button("reset")
            },
            success: function (t) {
                setTimeout(function () {
                    $("#partcont").load("index.php?route=common/cart/info #cart > *"), getCartMobile()
                }, 400), location = "index.php?route=checkout/cart"
            },
            error: function (t, e, o) {
                alert(o + "\r\n" + t.statusText + "\r\n" + t.responseText)
            }
        })
    }
}, voucher = {
    add: function () {
    }, remove: function (t) {
        $.ajax({
            url: "index.php?route=checkout/cart/remove",
            type: "post",
            data: "key=" + t,
            dataType: "json",
            beforeSend: function () {
                $("#cart > button").button("loading")
            },
            complete: function () {
                $("#cart > button").button("reset")
            },
            success: function (t) {
                $("#partcont").append('<div id="loading-mask"></div>'), setTimeout(function () {
                    $("#partcont").load("index.php?route=common/cart/info #cart > *"), getCartMobile()
                }, 400)
            },
            error: function (t, e, o) {
                alert(o + "\r\n" + t.statusText + "\r\n" + t.responseText)
            }
        })
    }
};
$(document).delegate(".agree", "click", function (t) {
    t.preventDefault(), $("#modal-agree").remove();
    var e = this;
    $.ajax({
        url: $(e).attr("href"), type: "get", dataType: "html", success: function (t) {
            html = '<div id="modal-agree">', html += " <div>", html += " <div>", html += " <div>", html += " <h4>" + $(e).text() + "</h4>", html += " </div>", html += " <div>" + t + "</div>", html += " </div", html += " </div>", html += "</div>", $("#partcont").html('<div class="mcartdivatem">' + html + "</div>"), $("#part").fadeIn("slow")
        }
    })
}), function (t) {
    function e(e, o) {
        this.element = e, this.options = o, this.timer = null, this.items = new Array, t(e).attr("autocomplete", "off"), t(e).on("focus", t.proxy(this.focus, this)), t(e).on("blur", t.proxy(this.blur, this)), t(e).on("keydown", t.proxy(this.keydown, this)), t(e).after('<ul class="dropdown-menu"></ul>'), t(e).siblings("ul.dropdown-menu").delegate("a", "click", t.proxy(this.click, this))
    }

    e.prototype = {
        focus: function () {
            this.request()
        }, blur: function () {
            setTimeout(function (t) {
                t.hide()
            }, 200, this)
        }, click: function (e) {
            e.preventDefault(), value = t(e.target).parent().attr("data-value"), value && this.items[value] && this.options.select(this.items[value])
        }, keydown: function (t) {
            switch (t.keyCode) {
                case 27:
                    this.hide();
                    break;
                default:
                    this.request()
            }
        }, show: function () {
            var e = t(this.element).position();
            t(this.element).siblings("ul.dropdown-menu").css({
                top: e.top + t(this.element).outerHeight(),
                left: e.left
            }), t(this.element).siblings("ul.dropdown-menu").show()
        }, hide: function () {
            t(this.element).siblings("ul.dropdown-menu").hide()
        }, request: function () {
            clearTimeout(this.timer), this.timer = setTimeout(function (e) {
                e.options.source(t(e.element).val(), t.proxy(e.response, e))
            }, 200, this)
        }, response: function (e) {
            if (html = "", e.length) {
                for (i = 0; i < e.length; i++)this.items[e[i].value] = e[i];
                for (i = 0; i < e.length; i++)e[i].category || (html += '<li data-value="' + e[i].value + '"><a href="#">' + e[i].label + "</a></li>");
                var o = new Array;
                for (i = 0; i < e.length; i++)e[i].category && (o[e[i].category] || (o[e[i].category] = new Array, o[e[i].category].name = e[i].category, o[e[i].category].item = new Array), o[e[i].category].item.push(e[i]));
                for (i in o)for (html += '<li class="dropdown-header">' + o[i].name + "</li>", j = 0; j < o[i].item.length; j++)html += '<li data-value="' + o[i].item[j].value + '"><a href="#">&nbsp;&nbsp;&nbsp;' + o[i].item[j].label + "</a></li>"
            }
            html ? this.show() : this.hide(), t(this.element).siblings("ul.dropdown-menu").html(html)
        }
    }, t.fn.autocomplete = function (o) {
        return this.each(function () {
            var a = t(this).data("autocomplete");
            a || (a = new e(this, o), t(this).data("autocomplete", a))
        })
    }
}(window.jQuery);