function slideShow(img_array, img_duration, cur_index) {
    let $image = $(imgArray[curIndex])
    $(".slider-image").addClass('fadeOut');
    // setTimeout(function () {
    $image.removeClass('fadeOut')
    // }, 700);

    curIndex++;
    if (curIndex === imgArray.length) {
        curIndex = 0;
    }
    setTimeout(slideShow, img_duration, img_array, img_duration, cur_index);
}
