import anime from 'animejs';

const timelineSlideOne = document.querySelector('.slide-one');
const timelineSlideTwo = document.querySelector('.slide-two');
const timelineSlideThree = document.querySelector('.slide-three');
const timelineContainer = document.querySelector('.timeline-container');
const timeline = document.querySelector('.timeline');
// const pointer = document.querySelector('.pointer');


// TODOS
// 1. How do you make sure that as you translateX the text container that if its on mobile the text doesn't go off the screen?
// 2. Need to figure out how to make the timeline track in JS
// 3. Need to make the timeline stick to the right parent depending on scroll poisition of the page (currently it only sticks to the top on the way down)


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

            slideOneAnim.seek(slideOneAnim.duration * entry.intersectionRatio);
        } else if (entry.isIntersecting == false) {
            console.log('🚫 S1 isnt showing!');
        }
    });
};

const slideOneIO = new IntersectionObserver(slideOneHandler, slideOptions);

slideOneIO.observe(timelineSlideOne);



// Timeline: Slide Two Anim
const slideTwoHandler = (entries) => {
    entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.boundingClientRect.top <= entry.rootBounds.bottom && entry.boundingClientRect.top >= entry.rootBounds.top) {
            console.log('✅ S2 animating');
            timelineContainer.classList.remove("sticky-child");
            timelineContainer.classList.add('sticky-vp');

            const slideTwoAnim = anime({
                targets: '.pointer',
                translateX: [timelineSteps[0], timelineSteps[1]],
                autoplay: false,
                easing: 'linear'
            });

            slideTwoAnim.seek(slideTwoAnim.duration * entry.intersectionRatio);
        } else if (entry.isIntersecting == false) {
            console.log('🚫 S2 isnt showing!');
        }
    });
};

const slideTwoIO = new IntersectionObserver(slideTwoHandler, slideOptions);

slideTwoIO.observe(timelineSlideTwo);



// Timeline: Slide Three Anim


const slideThreeHandler = (entries) => {

    entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.boundingClientRect.top <= entry.rootBounds.bottom && entry.boundingClientRect.top >= entry.rootBounds.top) {
            console.log('✅ S3 animating');
            const slideThreeAnim = anime({
                targets: '.pointer',
                translateX: [timelineSteps[1], timelineSteps[2]],
                autoplay: false,
                easing: 'linear'
            });


            slideThreeAnim.seek(slideThreeAnim.duration * entry.intersectionRatio);
        } else if (entry.isIntersecting == false) {
            console.log('🚫 S3 isnt showing!');
        } 
    });
};

const slideThreeIO = new IntersectionObserver(slideThreeHandler, slideOptions);

slideThreeIO.observe(timelineSlideThree);



