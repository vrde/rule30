rule30 = (function init (canvas) {
    'use strict';

    var RULES   = [0, 1, 1, 1, 1, 0, 0, 0],
        context = canvas.getContext('2d'),
        width   = canvas.width,
        height  = canvas.height,
        img     = context.getImageData(0, 0, width, height),
        methods = { img: img };

    methods.getBinaryPoint = function (x, y) {
        if (x < 0 || y < 0)
            return false;
        return img.data[(x + y * width) * 4] != 0;
    };

    methods.setBinaryPoint = function (x, y, val) {
        for (var i = (x + y * width) * 4, j = 0; j < 3; j++)
            img.data[i + j] = val ? 255 : 0;

        img.data[i + 3] = 255
    };

    methods.next = function (x, y) {
        var a = methods.getBinaryPoint(x - 1, y - 1),
            b = methods.getBinaryPoint(x, y - 1),
            c = methods.getBinaryPoint(x + 1, y - 1);

        methods.setBinaryPoint(x, y, RULES[2*2*a + 2*b + c]);
    };

    methods.update = function () {
        for (var i = 0; i < width; i++)
            methods.setBinaryPoint(i, 0, Math.random() > 0.995);

        for (var y = 1; y < height; y++)
            for (var x = 0, i = 0; x < width; i = (x + y * width) * 4, x++) {
                methods.next(x, y);
            }

        context.putImageData(img, 0, 0);
    };

    return methods;

}) (document.querySelector('canvas'));

rule30.update();

