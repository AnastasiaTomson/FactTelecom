// Изменение картинки - для кастомизированного инпута изображения
var _URL = window.URL || window.webkitURL;

// Изменение картинки - для кастомизированного инпута изображения
function ChangeImage(input) {
    let url = $(input).val();
    let ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (input.files && input.files[0] && (ext === "svg" || ext === "gif" || ext === "png" || ext === "jpeg" || ext === "jpg")) {
        var img = new Image();
        img.onload = function () {
            if ((img.width === image_width && img.height === image_height) || (Math.round((img.width / img.height) * 100) / 100 >= 1.6 && Math.round((img.width / img.height) * 100) / 100 <= 1.7)) {
                $(input).parent().find('.default-image').hide()
                $(input).parent().find('.slide-image').attr('src', img.src)
                $(input).parent().find('.slide-image').show();
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
    document.getElementById("id_image").value = "";
    let $img = $(obj).parent().find('.default-image')
    let $imgSlide = $(obj).parent().find('.slide-image').attr('src', '')
    $imgSlide.hide()
    $img.show()
}

// Удаление картинки
function EditDeleteImage(obj, id_input) {
    document.getElementById(id_input).value = "";
    let $input_item = $('#'+id_input);
    let $parent_input = $input_item.parent();
    $input_item.attr('required', true)
    let $img = $parent_input.find('.default-image')
    let $imgSlide = $parent_input.find('.slide-image').attr('src', '')
    $imgSlide.hide()
    $img.show()
}
