import anime from 'animejs';

const timelineSlideOne = document.querySelector('.slide-one');
const timelineSlideTwo = document.querySelector('.slide-two');
const timelineContainer = document.querySelector('.timeline-container');
const timeline = document.querySelector('.timeline');
// const pointer = document.querySelector('.pointer');


// HELPER FUNCTIONS
function buildThresholdList(steps) {
    var thresholds = [];
    var numSteps = steps;

    for (var i = 1.0; i <= numSteps; i++) {
        var ratio = i / numSteps;
        thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
}
function setParent(el, newParent) {
    newParent.appendChild(el);
}

// Timeline slide two anim

const slideTwoOptions = {
    root: null,
    rootMargin: '0px',
    threshold: buildThresholdList(100)
}

const timelineStickyHandler = (entries) => {
    entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.boundingClientRect.top <= entry.rootBounds.bottom && entry.boundingClientRect.top >= entry.rootBounds.top) {
            console.log('✅ S2 animating');
            timelineContainer.classList.remove("sticky-child");
            timelineContainer.classList.add('sticky-vp');
            slideTwoAnim.seek(slideTwoAnim.duration * entry.intersectionRatio);
        } else if (entry.isIntersecting == false) {
            console.log('🚫 S2 isnt showing!');
        } else {
            console.log('S2 animation over')
        }
    });
};

const slideTwoAnim = anime({
    targets: '.pointer',
    translateX: timeline.getBoundingClientRect().width / 4,
    easing: 'easeOutQuad',
    autoplay: false,
    easing: 'linear'
});

const slideTwoIO = new IntersectionObserver(timelineStickyHandler, slideTwoOptions);

slideTwoIO.observe(timelineSlideTwo);