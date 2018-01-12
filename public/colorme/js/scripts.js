$(document).ready(function () {
    // $('#vue-nav').css("display", "block");

    function detectmob() {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
            return true;
        } else {
            return false;
        }
    }

    var t = {delay: 125, overlay: $(".fb-overlay"), widget: $(".fb-widget"), button: $(".fb-button")};
    setTimeout(function () {
        $("div.fb-livechat").fadeIn()
    }, 8 * t.delay);
    if (!detectmob()) {
        $(".ctrlq").on("click", function (e) {
            e.preventDefault(), t.overlay.is(":visible") ? (t.overlay.fadeOut(t.delay), t.widget.stop().animate({
                bottom: 0,
                opacity: 0
            }, 2 * t.delay, function () {
                $(this).hide("slow"), t.button.show()
            })) : t.button.fadeOut("medium", function () {
                t.widget.stop().show().animate({
                    bottom: "30px",
                    opacity: 1
                }, 2 * t.delay), t.overlay.fadeIn(t.delay)
            })
        })
    }


    // Detect ios 11_x_x affected
    // NEED TO BE UPDATED if new versions are affected
    var ua = navigator.userAgent,
        iOS = /iPad|iPhone|iPod/.test(ua),
        iOS11 = /OS 11_0_1|OS 11_0_2|OS 11_0_3|OS 11_1|OS 11_1_1|OS 11_1_2|OS 11_2|OS 11_2_1/.test(ua);

    // ios 11 bug caret position
    if (iOS && iOS11) {

        // Add CSS class to body
        $("body").addClass("iosBugFixCaret");

    }


});
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=1787695151450379";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// facebook pixel
!function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
        n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s)
}(window, document, 'script',
    'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '296964117457250');
fbq('track', 'PageView');

var google_conversion_id = 923433004;
var google_custom_params = window.google_tag_params;
var google_remarketing_only = true;

window.addEventListener('scroll', function () {
    var diff = $('#first-after-nav').offset().top - $(window).scrollTop();
    if (diff <= $('#bl-routing-wrapper').height()) {
        $('#bl-routing-wrapper').addClass('bl-fix-routing');
    } else {
        $('#bl-routing-wrapper').removeClass('bl-fix-routing');
    }

});