import anime from 'animejs';

const timelineSlideOne = document.querySelector('.slide-one');
const timelineSlideTwo = document.querySelector('.slide-two');
const timelineSlideThree = document.querySelector('.slide-three');
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
function range(start, end, steps) {
    let arr = [];
    let incrament = end / steps;
    incrament = Math.round(incrament);
    for (let i = start; i <= end; i += incrament) {
        arr.push(i);
    }
    return arr;
}


// Timeline: Setup Anim
const timelineWidth = timeline.getBoundingClientRect().width;
const timelineSteps = range(0, timelineWidth, 5);

const startAnim = anime({
    targets: '.pointer',
    translateX: timelineSteps[0],
    easing: 'linear',
    duration: 0
});

const slideOptions = {
    root: null,
    rootMargin: '0px',
    threshold: buildThresholdList(100)
}

// Timeline: Slide One Anim
const slideOneHandler = (entries) => {
    entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.boundingClientRect.top <= entry.rootBounds.bottom && entry.boundingClientRect.top >= entry.rootBounds.top) {
            console.log('✅ S1 animating');
            slideOneAnim.seek(slideTwoAnim.duration * entry.intersectionRatio);
        } else if (entry.isIntersecting == false) {
            console.log('🚫 S1 isnt showing!');
        }
    });
};

const slideOneIO = new IntersectionObserver(slideOneHandler, slideOptions);

slideOneIO.observe(timelineSlideOne);

const slideOneAnim = anime.timeline({
    autoplay: false,
    easing: 'linear'
});

slideOneAnim.add({
    targets: timelineContainer,
    opacity: [0, 1],
    translateX: [-300, 0]
})
.add({
    targets: '.pointer',
    height: [0, 200],
    opacity: [0, 1]
}, 200)



// Timeline: Slide Two Anim
const slideTwoHandler = (entries) => {
    entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.boundingClientRect.top <= entry.rootBounds.bottom && entry.boundingClientRect.top >= entry.rootBounds.top) {
            console.log('✅ S2 animating');
            timelineContainer.classList.remove("sticky-child");
            timelineContainer.classList.add('sticky-vp');
            slideTwoAnim.seek(slideTwoAnim.duration * entry.intersectionRatio);
        } else if (entry.isIntersecting == false) {
            console.log('🚫 S2 isnt showing!');
        }
    });
};

const slideTwoIO = new IntersectionObserver(slideTwoHandler, slideOptions);

slideTwoIO.observe(timelineSlideTwo);
 
const slideTwoAnim = anime({
    targets: '.pointer',
    translateX: [timelineSteps[0], timelineSteps[1]],
    autoplay: false,
    easing: 'linear'
});



// Timeline: Slide Three Anim
const slideThreeHandler = (entries) => {
    entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.boundingClientRect.top <= entry.rootBounds.bottom && entry.boundingClientRect.top >= entry.rootBounds.top) {
            console.log('✅ S3 animating');
            // timelineContainer.classList.remove("sticky-child");
            // timelineContainer.classList.add('sticky-vp');
            slideThreeAnim.seek(slideThreeAnim.duration * entry.intersectionRatio);
        } else if (entry.isIntersecting == false) {
            console.log('🚫 S3 isnt showing!');
        } 
    });
};

const slideThreeIO = new IntersectionObserver(slideThreeHandler, slideOptions);

slideThreeIO.observe(timelineSlideThree);

const slideThreeAnim = anime({
    targets: '.pointer',
    translateX: [timelineSteps[1], timelineSteps[2]],
    autoplay: false,
    easing: 'linear'
});