document.addEventListener('DOMContentLoaded', function () {

    mejs.i18n.language("en");

    var mediaElements = document.querySelectorAll('video, audio'), i, total = mediaElements.length;

    for (i = 0; i < total; i++) {
        new MediaElementPlayer(mediaElements[i], {
            stretching: 'auto',
            // pluginPath: '../build/',
            success: function (media) {
                var renderer = document.getElementById(media.id + '-rendername');

                media.addEventListener('loadedmetadata', function () {
                    var src = media.originalNode.getAttribute('src').replace('&amp;', '&');
                });

                media.addEventListener('error', function (e) {
                    renderer.querySelector('.error').innerHTML = '<strong>Error</strong>: ' + e.message;
                });
            }
        });
    }
});