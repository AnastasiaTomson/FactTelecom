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
    document.getElementById("id_image").value = "";
    let $img = $(obj).parent().find('.default-image')
    let $imgSlide = $(obj).parent().find('.slide-image').attr('src', '')
    $imgSlide.hide()
    $img.show()
}

var cropper;
window.addEventListener('DOMContentLoaded', function () {
    var cropBoxData;
    var canvasData;
    $('.modal-crop-image').on('shown.bs.modal', function () {
        var image = document.getElementById('image');
        cropper = new Cropper(image, {
            aspectRatio: aspect,
            dragMode: 'move',
            restore: false,
            movable: true,
            dragCrop: true,
            strict: true,
            resizable: false,
            zoomable: true,
            touchDragZoom: true,
            guides: false,
            viewMode: 1,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: true,
            data: {
                width: image_width,
                height: image_height,
            },
            ready: function () {
                cropper.reset();
                cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
            }
        });
    }).on('hidden.bs.modal', function () {
        cropBoxData = cropper.getCropBoxData();
        canvasData = cropper.getCanvasData();
        cropper.destroy();
    });
});

// Сохранение обрезанного изображения
function GetData() {
    var fileInputElement = $('#id_image').get(0)
    var croppedimage = cropper.getCroppedCanvas().toDataURL("image/png");
    const img_data = fileInputElement.files[0]
    var img = new Image();
    img.onload = function () {
        $('.default-image').hide()
        $('.slide-image').attr('src', img.src)
        $('.slide-image').show();
        $('.modal-crop-image').modal('hide')
    }
    img.src = window.URL.srcObject = croppedimage
    var d = new Date();
    var strDate = d.getFullYear() + (d.getMonth() + 1) + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds();
    cropper.getCroppedCanvas().toBlob((blob) => {
        let file = new File([blob], strDate + img_data.name, {type: "image/*", lastModified: new Date().getTime()});
        let container = new DataTransfer();
        container.items.add(file);
        fileInputElement.files = container.files;
    });
}

window.addEventListener('hashchange', hashchange);

function hashchange() {
    $('form').each(function () {
        this.reset()
    });
}