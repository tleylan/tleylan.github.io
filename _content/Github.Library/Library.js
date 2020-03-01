window.jsUtils = {

    href: function () {

        return window.location.href;
    },

    print: function () {

        return window.print();
    }
};

window.jsMoment = {

    getCurrentTime: function (format) {

        return window.moment().format(format);
    }
};

window.jsMap = {

    map: {},

    newMap: function (id, lon, lat, zoom) {

        this.map = new ol.Map({
            target: id,
            layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
            view: new ol.View({ center: ol.proj.fromLonLat([lon, lat]), zoom: zoom })
        });
    },

    setView: function (lon, lat, zoom) {
        this.map.setView(new ol.View({ center: ol.proj.fromLonLat([lon, lat]), zoom: zoom }));
        console.debug(this.map.getTarget());
        console.debug(this.map.getSize());
    },

    newMap2: function (id) {

        this.map = new ol.Map({
            target: id,
            layers: [new ol.layer.Vector({ source: new ol.source.Vector({ format: new ol.format.GeoJSON(), url: "./data/countries.json" }) })],
            view: new ol.View({ center: ol.proj.fromLonLat([37.41, 8.82]), zoom: 4 })
        });
    }
};

window.jsCanvas = {

    mandelbrot: function (ele, magnificationFactor, panX, panY, maxIterations, bgColor, hue) {

        // https://progur.com/2017/02/create-mandelbrot-fractal-javascript.html

        const ctx = ele.getContext("2d");

        for (let x = 0; x < ele.width; x++) {
            for (let y = 0; y < ele.height; y++) {

                const inSet = this.inMandelbrotSet(maxIterations, x / magnificationFactor - panX, y / magnificationFactor - panY);

                ctx.fillStyle = (inSet === 0) ? bgColor : `hsl(${hue}, 100%, ${inSet}%)`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    },

    inMandelbrotSet: function (maxIterations, x, y) {

        let realComponentOfResult = x;
        let imaginaryComponentOfResult = y;

        for (let i = 0; i < maxIterations; i++) {
            const tempRealComponent = realComponentOfResult * realComponentOfResult - imaginaryComponentOfResult * imaginaryComponentOfResult + x;
            const tempImaginaryComponent = 2.0 * realComponentOfResult * imaginaryComponentOfResult + y;

            realComponentOfResult = tempRealComponent;
            imaginaryComponentOfResult = tempImaginaryComponent;

            if (realComponentOfResult * imaginaryComponentOfResult > 5) {
                return (i / maxIterations * 100);
            }
        }

        return 0;
    }
};

window.jsClipboard = {

    copyToById: function (id) {

        this.copyTo(document.getElementById(id));
    },

    copyTo: function (data) {

        const el = document.createElement("textarea");
        el.value = data;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    }
};

window.jsElement = {

    getStatsById: function (id) {

        return this.getStats(document.getElementById(id));
    },

    getStats: function (ele) {

        const r = ele.getBoundingClientRect();
        return { T: r.top, L: r.left, B: r.bottom, R: r.right, H: r.height, W: r.width };
    }
};

window.jsHowl = {

    howls: {},
    keys: -1,

    init: function (file) {

        this.keys++;

        this.howls[this.keys.toString()] = new window.Howl({ src: [file], preload: true, autoplay: false, loop: false, html5: true, volume: 1.0, rate: 1.0 });

        return this.keys.toString();
    },

    play: function (key) {

        const h = this.howls[key];

        if (h) {
            if (!h.playing()) {
                h.play();
            }
        }
    },

    pause: function (key) {

        const h = this.howls[key];

        if (h) {
            if (h.playing()) {
                h.pause();
            }
        }
    },

    stop: function (key) {

        const h = this.howls[key];

        if (h) {
            if (h.playing()) {
                h.stop();
            }
        }
    },

    delete: function (key) {

        const h = this.howls[key];

        if (h) {
            if (h.playing()) {
                h.stop();
            }
            delete this.howls[key];
        }
    }
};