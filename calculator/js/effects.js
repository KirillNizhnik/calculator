(function ($) {


    var settings = {};
    var img = [];
    var methods = {
        init: function (options) {

            settings = {};
            img = [];

            settings = $.extend(
                {
                    'sepia': false,
                    'grayScale': false,
                    'mirror': false,
                    'img': [],
                    'onComplete': function (dataUrl) {

                    }
                }
                , options);

            //settings.ctx.clearRect(0, 0, settings.canvas.width, settings.canvas.height);
            settings.imagesLoaded = 0;
            $.each(settings['img'], function (index, item) {
                img.push(methods.loadImage(item, methods.main));
            });



            settings.canvas = this[0];

            settings.ctx = settings.canvas.getContext("2d");

            //methods.img2 = methods.loadImage(options.img2, methods.main);
        },
        main: function (onComplete) {
            settings.imagesLoaded += 1;

            if (settings.imagesLoaded === img.length) {

                //console.log(img[0].width + "," + img[0].height);
                settings.canvas.width = img[0].width;
                settings.canvas.height = img[0].height;

                var rect = methods.drawImageScaled(img[0]);



                for (var i = 1; i < settings.img.length; i++) {
                    var pattern = settings.ctx.createPattern(img[i], "repeat");
                    settings.ctx.rect(rect.centerShift_x, rect.centerShift_y, rect.w, rect.h);
                    settings.ctx.fillStyle = pattern;
                    settings.ctx.fill();
                }

                if (settings.mirror) {
                    methods.mirror();
                }

                if (settings.grayScale) {
                    methods.grayScale();
                }
                else if(settings.sepia){
                    methods.sepia();

                } else if(settings.contrast){
                    methods.contrast();

                } else {
                    var dataURL = settings.canvas.toDataURL('image/png');

                    settings.onComplete(dataURL);
                }
            }
        },
        loadImage: function (src, onload) {
            var imgLoad = new Image();
            imgLoad.onload = onload;
            imgLoad.src = src;
            return imgLoad;
        },
        drawImageScaled: function (img) {
            var ctx = settings.ctx;
            var canvas = ctx.canvas;
            var hRatio = canvas.width / img.width;
            var vRatio = canvas.height / img.height;
            var ratio = Math.min(hRatio, vRatio);
            var centerShift_x = (canvas.width - img.width * ratio) / 2;
            var centerShift_y = (canvas.height - img.height * ratio) / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);

            return {
                'centerShift_x': centerShift_x,
                'centerShift_y': centerShift_y,
                'w': img.width * ratio,
                'h': img.height * ratio
            }

        },
        mirror: function () {
            var context = settings.ctx;
            var canvas = settings.canvas;
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
            methods.drawImageScaled(img[0]);
            var dataURL = canvas.toDataURL('image/png');
            settings.onComplete(dataURL);
        },
        grayScale: function () {
            var context = settings.ctx;
            var canvas = settings.canvas;
            var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
            var pixels = imgData.data;
            for (var i = 0, n = pixels.length; i < n; i += 4) {
                var grayscale = pixels[i] * .3 + pixels[i + 1] * .59 + pixels[i + 2] * .11;
                pixels[i  ] = grayscale;        // red
                pixels[i + 1] = grayscale;        // green
                pixels[i + 2] = grayscale;        // blue
                //pixels[i+3]              is alpha
            }
            //redraw the image in black & white
            context.putImageData(imgData, 0, 0);
            var dataURL = canvas.toDataURL('image/png');
            settings.onComplete(dataURL);
        },
        sepia: function (imageData) {

            var context = settings.ctx;
            var canvas = settings.canvas;
            var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
            var pixels = imgData.data;

            for (var i = 0; i < pixels.length; i += 4) {
                var r = pixels[i];
                var g = pixels[i + 1];
                var b = pixels[i + 2];
                pixels[i] = ((r * 0.293) + (g * 0.569) + (b * 0.100))*1.2; // red
                pixels[i + 1] = ((r * 0.249) + (g * 0.486) + (b * 0.130)); // green
                pixels[i + 2] = ((r * 0.172) + (g * 0.334) + (b * 0.111))*0.7; // blue
            }

            context.putImageData(imgData, 0, 0);
            var dataURL = canvas.toDataURL('image/png');
            settings.onComplete(dataURL);
        },
        contrast: function (imageData) {

            var context = settings.ctx;
            var canvas = settings.canvas;
            var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
            var pixels = imgData.data;
            var contrast = 80;
            contrast = (contrast/100) + 1;
            var intercept = 128 * (1 - contrast);

            for (var i = 0; i < pixels.length; i += 4) {
                var r = pixels[i];
                var g = pixels[i + 1];
                var b = pixels[i + 2];
                pixels[i] = r*contrast + intercept;
                pixels[i + 1] = g*contrast + intercept;
                pixels[i + 2] = b*contrast + intercept;
            }
            context.putImageData(imgData, 0, 0);
            var dataURL = canvas.toDataURL('image/png');
            settings.onComplete(dataURL);
        }

    };

    $.fn.canvasLayout = function (method) {


        // логика вызова метода
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.canvas');
        }
    };

})(jQuery);