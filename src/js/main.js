/**
*  Gravity library v1.0.0
*  by Josbert Muria 
*  
*  License MIT 
**/

export default class Gravity {

  constructor(element, removeClass) {
      this.elements = document.querySelectorAll(element);
      this.className = element.replace(/^.|^#/, '');
      this.removeClass = removeClass;
  }

  // offset method
  // gets the offset of an element 
  // relative to the top and bottom of the body
  offset(e) {
    let top = 0;
    let left = 0;

    if (e.offsetParent) {
      do {
        top += e.offsetTop;
        left += e.offsetLeft;

      } while (e = e.offsetParent);
    }
    return {
      top: parseInt(top),
      left: parseInt(left)
    }
  }
  // gets the actual height and width 
  // of the viewport
  viewport() {
    let x = 0;
    let y = 0;

    if (typeof window.innerHeight != 'undefined') {
      x = window.innerWidth
      y = window.innerHeight
    }
    else if (typeof document.documentElement != 'undefined'
     && typeof document.documentElement.clientWidth != 'undefined'
     && document.documentElement.clientWidth != 0) {
      x = document.documentElement.clientWidth;
      y = document.documentElement.clientHeight;
    }
    else {
      x = document.getElementsByTagName('body')[0].clientWidth;
      y = document.getElementsByTagName('body')[0].clientHeight;
    }
    return {
      width: x,
      height: y
    }
  }
  // gets top scroll
  scrollTop() {
    let s = 0;
    if (window.pageYOffset) {
      s = window.pageYOffset;
    }
    else {
      s = document.documentElement.scrollTop;
    }
    return s;
  }
  // gets left scroll
  scrollLeft() {
    let s = 0;
    if (window.pageXOffset) {
      s = window.pageXOffset;
    }
    else {
      s = document.documentElement.scrollLeft;
    }
    return s;
  }
  // gets the distance of an element with respect
  // to the parts (top and left) of it, 
  // to the parts (top, right, bottom and left) of the viewport
  inViewport(e) {
    let top, left, right, bottom;

    if (e.getBoundingClientRect()) {
      top = e.getBoundingClientRect().top;
      left = e.getBoundingClientRect().left
    }
    else {
      top = this.offset(e).top - this.scrollTop();
      left = this.offset(e).left - this.scrollLeft()
    }
    bottom = (this.scrollTop() + this.viewport().height) - this.offset(e).top;
    right = (this.scrollLeft() + this.viewport().width) - this.offset(e).left;

    return {
      top: parseInt(top),
      left: parseInt(left),
      right: parseInt(right),
      bottom: parseInt(bottom)
    }
  }
  // if the element is visible, according to the preset options, 
  // it starts the reveal or animation
  start(options) {
    this.elements.forEach(item => {
      let offset = item.dataset.gravityIn ? item.dataset.gravityIn : options.offset ? options.offset : this.viewport().height / 5;
      let animation = item.dataset.gravityAnimation ? item.dataset.gravityAnimation : options.animation ? options.animation : 'upward';
      let duration = item.dataset.gravityDuration ? item.dataset.gravityDuration : options.duration ? options.duration : 700;
      let delay = item.dataset.gravityDelay ? item.dataset.gravityDelay : options.delay ? options.delay : 50;

      if (this.inViewport(item).top > offset && this.inViewport(item).bottom > offset) {
        item.style.animationName = animation;
        item.style.animationDuration = duration + 'ms';
        item.style.animationDelay = delay + 'ms';
        item.style.animationTimingFunction = 'linear';
        item.style.animationFillMode = 'forwards';

        if (this.removeClass) {
          setTimeout(()=>{
            item.classList.remove(this.className);
          }, 100 + parseInt(delay));
        }
      }
    });
  }
  // add the event handler to launch animations when 
  // scrolling or loading the DOM, 
  // if the required parameters are met
  ready(options = {}) {
    document.addEventListener('DOMContentLoaded', () => {
      this.start(options);
    })
    window.addEventListener('scroll', () => {
      this.start(options);
    })
  }
}

window.Gravity = Gravity;

var gravity = new Gravity('.gravity', true);

gravity.ready()
