
    @include('upcoworkingspace::vi.vi-nav')
    @yield('vi-content')
    @include('upcoworkingspace::vi.vi-nav')


<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/jquery-3.2.1.min.js" type="text/javascript"></script>
<script>$(document).ready(function () {
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
    });
</script>


<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/jquery-ui-1.12.1.custom.min.js"
        type="text/javascript"></script>
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/tether.min.js" type="text/javascript"></script>
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/bootstrap.min.js"
        type="text/javascript"></script>
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/paper-kit.js?v=2.0.0"></script>
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/demo.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>

<!--  Plugins for presentation page -->
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/presentation-page/main.js"></script>
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/presentation-page/jquery.sharrre.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/vue.min.js"></script>
<script async defer src="https://buttons.github.io/buttons.js"></script>

<script type="text/javascript">
    (function () {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        new IsoGrid(document.querySelector('.isolayer--deco1'), {
            transform: 'translateX(33vw) translateY(-340px) rotateX(45deg) rotateZ(45deg)',
            stackItemsAnimation: {
                properties: function (pos) {
                    return {
                        translateZ: (pos + 1) * 30,
                        rotateZ: getRandomInt(-4, 4)
                    };
                },
                options: function (pos, itemstotal) {
                    return {
                        type: dynamics.bezier,
                        duration: 500,
                        points: [{"x": 0, "y": 0, "cp": [{"x": 0.2, "y": 1}]}, {
                            "x": 1,
                            "y": 1,
                            "cp": [{"x": 0.3, "y": 1}]
                        }],
                        delay: (itemstotal - pos - 1) * 40
                    };
                }
            }
        });
    })();

    function paginator(currentPageData, totalPagesData) {
        var page = [];
        var currentPage = currentPageData;
        var totalPages = totalPagesData;

        var startPage = (currentPage - 2 > 0 ? currentPage - 2 : 1);
        for (var i = startPage; i <= currentPage; i++) {
            page.push(i);
        }

        var endPage = (5 - page.length + currentPage >= totalPages ? totalPages : 5 - page.length + currentPage);

        for (var i = currentPage + 1; i <= endPage; i++) {
            page.push(i);
        }

        if (page && page.length < 5) {
            var pageData = Object.assign(page);
            for (var i = page[0] - 1; i >= (page[0] - (5 - page.length) > 0 ? page[0] - (5 - page.length) : 1); i--) {
                pageData.unshift(i);
            }
            page = pageData;
        }

        return page;
    }

    $('.dropdown-menu').after().css('right','');
    $('.dropdown-menu').before().css('right','');
    
</script>
@stack('scripts')
</body>

</html>


