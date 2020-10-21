(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.main = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties(Constructor, staticProps); } return Constructor; }

  /**
  *  Gravity library v1.0.0
  *  by Josbert Muria 
  *  
  *  License MIT 
  **/
  var Gravity = /*#__PURE__*/function () {
    function Gravity(element, removeClass) {
      _classCallCheck(this, Gravity);

      this.elements = document.querySelectorAll(element);
      this.className = element.replace(/^.|^#/, '');
      this.removeClass = removeClass;
    } // offset method
    // gets the offset of an element 
    // relative to the top and bottom of the body


    _createClass(Gravity, [{
      key: "offset",
      value: function offset(e) {
        var top = 0;
        var left = 0;

        if (e.offsetParent) {
          do {
            top += e.offsetTop;
            left += e.offsetLeft;
          } while (e = e.offsetParent);
        }

        return {
          top: parseInt(top),
          left: parseInt(left)
        };
      } // gets the actual height and width 
      // of the viewport

    }, {
      key: "viewport",
      value: function viewport() {
        var x = 0;
        var y = 0;

        if (typeof window.innerHeight != 'undefined') {
          x = window.innerWidth;
          y = window.innerHeight;
        } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
          x = document.documentElement.clientWidth;
          y = document.documentElement.clientHeight;
        } else {
          x = document.getElementsByTagName('body')[0].clientWidth;
          y = document.getElementsByTagName('body')[0].clientHeight;
        }

        return {
          width: x,
          height: y
        };
      } // gets top scroll

    }, {
      key: "scrollTop",
      value: function scrollTop() {
        var s = 0;

        if (window.pageYOffset) {
          s = window.pageYOffset;
        } else {
          s = document.documentElement.scrollTop;
        }

        return s;
      } // gets left scroll

    }, {
      key: "scrollLeft",
      value: function scrollLeft() {
        var s = 0;

        if (window.pageXOffset) {
          s = window.pageXOffset;
        } else {
          s = document.documentElement.scrollLeft;
        }

        return s;
      } // gets the distance of an element with respect
      // to the parts (top and left) of it, 
      // to the parts (top, right, bottom and left) of the viewport

    }, {
      key: "inViewport",
      value: function inViewport(e) {
        var top, left, right, bottom;

        if (e.getBoundingClientRect()) {
          top = e.getBoundingClientRect().top;
          left = e.getBoundingClientRect().left;
        } else {
          top = this.offset(e).top - this.scrollTop();
          left = this.offset(e).left - this.scrollLeft();
        }

        bottom = this.scrollTop() + this.viewport().height - this.offset(e).top;
        right = this.scrollLeft() + this.viewport().width - this.offset(e).left;
        return {
          top: parseInt(top),
          left: parseInt(left),
          right: parseInt(right),
          bottom: parseInt(bottom)
        };
      } // if the element is visible, according to the preset options, 
      // it starts the reveal or animation

    }, {
      key: "start",
      value: function start(options) {
        var _this = this;

        var _a = this.elements;

        var _f = function _f(item) {
          var offset = item.dataset.gravityIn ? item.dataset.gravityIn : options.offset ? options.offset : _this.viewport().height / 5;
          var animation = item.dataset.gravityAnimation ? item.dataset.gravityAnimation : options.animation ? options.animation : 'upward';
          var duration = item.dataset.gravityDuration ? item.dataset.gravityDuration : options.duration ? options.duration : 700;
          var delay = item.dataset.gravityDelay ? item.dataset.gravityDelay : options.delay ? options.delay : 50;

          if (_this.inViewport(item).top > offset && _this.inViewport(item).bottom > offset) {
            item.style.animationName = animation;
            item.style.animationDuration = duration + 'ms';
            item.style.animationDelay = delay + 'ms';
            item.style.animationTimingFunction = 'linear';
            item.style.animationFillMode = 'forwards';

            if (_this.removeClass) {
              setTimeout(function () {
                item.classList.remove(_this.className);
              }, 100 + parseInt(delay));
            }
          }
        };

        for (var _i = 0; _i < _a.length; _i++) {
          _f(_a[_i], _i, _a);
        }

        undefined;
      } // add the event handler to launch animations when 
      // scrolling or loading the DOM, 
      // if the required parameters are met

    }, {
      key: "ready",
      value: function ready() {
        var _this2 = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        document.addEventListener('DOMContentLoaded', function () {
          _this2.start(options);
        });
        window.addEventListener('scroll', function () {
          _this2.start(options);
        });
      }
    }]);

    return Gravity;
  }();

  _exports.default = Gravity;
  window.Gravity = Gravity;
  var gravity = new Gravity('.gravity', true);
  gravity.ready();
});