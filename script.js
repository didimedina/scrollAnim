import anime from 'animejs';

// Intersection Observer
// const target = document.querySelector('.element-container');

// const options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: [...Array(100).keys()].map(num => (num + 1) / 100)
// }

// const animation = anime({
//     targets: target,
//     scale: .5,
//     // translateX: 400,
//     //loop: true,
//     autoplay: false,
//     easing: 'linear'
// });

// const intersectionHandler = (entries) => {
//     entries.forEach(entry => animation.seek(animation.duration * entry.intersectionRatio));
//     // entries.forEach(entry => console.log('💩'));
// };

// const io = new IntersectionObserver(intersectionHandler, options);

// io.observe(target);


const timelineScrollArea = document.querySelector('.section-two');
const timelineContainer = document.querySelector('.element-container');
const timeline = document.querySelector('.element');
const pointer = document.querySelector('.pointer');

const timelineStickyOptions = {
    root: null,
    rootMargin: '0px',
    threshold: [...Array(10).keys()].map(num => (num + 1) / 10)
}

const timelineStickyHandler = (entries) => {
    entries.forEach(function(entry) {
        if (entry.boundingClientRect.top <= entry.rootBounds.top && entry.boundingClientRect.bottom > entry.rootBounds.bottom) {
            timelineContainer.classList.add('sticky');
            timelineContainer.classList.remove("sticky-bottom");
            console.log(timelineContainer.classList.value);
        } else if (entry.boundingClientRect.bottom <= entry.rootBounds.bottom && entry.boundingClientRect.top < entry.rootBounds.top) {
            timelineContainer.classList.remove('sticky');
            timelineContainer.classList.add('sticky-bottom');
            console.log(timelineContainer.classList.value);
        } else {
            timelineContainer.classList.remove("sticky");
            timelineContainer.classList.remove("sticky-bottom");
            console.log(timelineContainer.classList.value);
        }
    });
};

const timelineStickyIO = new IntersectionObserver(timelineStickyHandler, timelineStickyOptions);

timelineStickyIO.observe(timelineScrollArea);

anime({
    targets: '.pointer',
    translateX: timeline.getBoundingClientRect().width - pointer.getBoundingClientRect().width,
    loop: true,
    easing: 'easeOutQuad',
    duration: 2000
})

// console.log(timelineScrollArea.getBoundingClientRect().height);

// IO gives back the bottom attribute