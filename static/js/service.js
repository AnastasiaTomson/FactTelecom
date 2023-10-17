// Изменение картинки - для кастомизированного инпута изображения
var _URL = window.URL || window.webkitURL;

// Изменение картинки - для кастомизированного инпута изображения
function ChangeImage(obj) {
    let input = obj;
    let url = $(obj).val();
    let ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (input.files && input.files[0] && (ext === "svg" || ext === "gif" || ext === "png" || ext === "jpeg" || ext === "jpg")) {
        var img = new Image();
        img.onload = function () {
            if ((img.width === image_width && img.height === image_height) || (Math.round((img.width / img.height) * 100) / 100 === 1)) {
                $(obj).parent().find('.default-image').hide()
                $(obj).parent().find('.slide-image').attr('src', img.src)
                $(obj).parent().find('.slide-image').show();
            } else {
                aspect = ((image_width / image_height) * 100) / 100
                $('#image').attr('src', img.src)
                $('.modal-crop-image').modal()
            }
        }
        img.src = _URL.createObjectURL(input.files[0]);
    }
}

// Удаление картинки
function DeleteImage(obj) {
    document.getElementById("id_img").value = "";
    let $img = $(obj).parent().find('.default-image')
    let $imgSlide = $(obj).parent().find('.slide-image').attr('src', '')
    $imgSlide.hide()
    $img.show()
}

// Удаление картинки
function EditDeleteImage(obj, id_input) {
    document.getElementById(id_input).value = "";
    $('#' + id_input).attr('required', true)
    let $img = $('#' + id_input).parent().find('.default-image')
    let $imgSlide = $('#' + id_input).parent().find('.slide-image').attr('src', '')
    $imgSlide.hide()
    $img.show()
}
