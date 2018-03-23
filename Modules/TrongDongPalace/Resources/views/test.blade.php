<!doctype html>
<html lang="en" class="no-js">
<head>

    <style>
        .carousel-3d-slide {
            height: auto !important;
            background-color: rgba(0, 0, 0, 0.25) !important;
        }
    </style>
</head>
<body>
<div id="carousel">
    <carousel-3d :autoplay='true' :autoplay-timeout='2400'>
        <slide :index='0'>
            <img src='https://res.cloudinary.com/ameo/image/upload/v1498843587/kTcPaQR_x77hor.jpg'/>
        </slide>
        <slide :index='1'>
            <img src='https://unsplash.it/400/300?image=456'/>
        </slide>
        <slide :index='2'>
            <img src='https://unsplash.it/400/300?image=222'/>
        </slide>
        <slide :index='3'>
            <img src='https://unsplash.it/400/300?image=1003'/>
        </slide>
        <slide :index='4'>
            <img src='https://unsplash.it/400/300?image=940'/>
        </slide>
        <slide :index='5'>
            <img src='https://unsplash.it/400/300?image=944'/>
        </slide>
        <slide :index='6'>
            <img src='https://unsplash.it/400/300?image=219'/>
        </slide>
        <slide :index='7'>
            <img src='https://unsplash.it/400/300?image=1041'/>
        </slide>
    </carousel-3d>
</div>
</body>
<script src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/vue.min.js"></script>
{{--<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.7/vue.js"></script>--}}
<script src="https://rawgit.com/Wlada/vue-carousel-3d/master/dist/vue-carousel-3d.min.js"></script>
<script type="text/javascript">
    new Vue({
        el: '#carousel',
        data: {
            slides: 7
        },
        components: {
            'carousel-3d': Carousel3d.Carousel3d,
            'slide': Carousel3d.Slide
        }
    })
</script>
</html>
