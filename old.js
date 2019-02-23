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


const timelineSlideOne = document.querySelector('.slide-one');
const timelineContainer = document.querySelector('.timeline-container');
const timeline = document.querySelector('.timeline');
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

timelineStickyIO.observe(timelineSlideOne);

// ==========================

// const timelineOptions = {
//     root: null,
//     rootMargin: '0px',
//     threshold: [...Array(10).keys()].map(num => (num + 1) / 10)
// }

// const timelineHandler = (entries) => {
//     entries.forEach(function(entry){
//         // console.log(entry.boundingClientRect);
//         // console.log(entry.intersectionRatio);
//         // console.log(entry.intersectionRect);
//         // console.log(entry.isIntersecting);
//         // console.log(entry.rootBounds);
//         // console.log(entry.target);
//         // console.log(entry.time);
//     });
//     entries.forEach(entry => pointerAnim.seek(pointerAnim.duration * entry.intersectionRatio));
// };

// const timelineIO = new IntersectionObserver(timelineHandler, timelineOptions);

// timelineIO.observe(pointer);

// const pointerAnim = anime({
//     targets: '.pointer',
//     translateX: timeline.getBoundingClientRect().width - pointer.getBoundingClientRect().width,
//     easing: 'easeOutQuad',
//     autoplay: false,
//     easing: 'linear'
// })

// console.log(timelineScrollArea.getBoundingClientRect().height);

// IO gives back the bottom attribute if the element.container is always 0 to the viewport, isn't there a gap between it and the section y position?
// but in which case id need to still figure out how much is left of the section to to scroll out of view in order to cupute the seek animation...?

// if the parent is the same size as the child in height than the ratio is always accurate 