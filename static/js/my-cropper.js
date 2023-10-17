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
            viewMode: 2,
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
    var fileInputElement = $(window.location.hash).find('input[type=file]').get(0)
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
    $('form').each(function() { this.reset() });
}
