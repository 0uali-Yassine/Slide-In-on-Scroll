// it will run debounce all the time when we scroll but it will actually only run the function-
// -checkSlide once every 20 milliseconds
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context,args);
        };
        var calllNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (calllNow) func.apply(context, args);
    };
};

let images = document.querySelectorAll('img');

images.forEach(image =>{
    image.style.transition = ' all 4s cubic-bezier(0.11, 0.21, 0.14, 1.04) 0s';
});

function checkSlide() {
    images.forEach(img =>{
        // half way throurgh the image
        const slideInAt = (window.scrollY + window.innerHeight) - 
                img.height / 2 ; 
        // the bottom of the image
        const imageBottom = img.offsetTop + img.height;
        const isHalfShow = slideInAt > img.offsetTop;
        const isNotScrollPast = window.scrollY < imageBottom;

        if (isHalfShow && isNotScrollPast){
            img.classList.add('active');
        } else {
            img.classList.remove('active');
        }

    });
}

window.addEventListener('scroll', debounce(checkSlide));