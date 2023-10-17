$('input[name="phone"]').attr('disabled', '')
$('input[name="phone"]').mask("+7 (999) 999 99 99")

function AddPhoneRow(obj){
    let $parent = $('.hide_block:first')
    $('.hide_block:first').removeClass('hide_block')
    let $input = $parent.find('input')
    $parent.find('.save_tel_btn').show()
    $input.mask("+7 (999) 999 99 99")
    $parent.find('input').removeAttr('disabled')
    $parent.find('input').css('border', '1px solid #6B6B6B')
    $(obj).hide()
}

function EditPhone(obj, num, class_name) {
    let $parent = $(obj).parent()
    $(obj).hide()
    $parent.find('input').removeAttr('disabled')
    $parent.find('input').css('border', '1px solid #6B6B6B')
    $parent.find(class_name).show()
}

function CleanPhone(phone) {
    phone = phone.replaceAll('(', '');
    phone = phone.replaceAll(')', '');
    phone = phone.replaceAll(' ', '');
    return phone;
}

function SavePhone(obj, num, class_name) {
    let $parent = $(obj).parent()
    let $input = $parent.find('input')
    $(obj).hide()
    $input.attr('disabled', '')
    $input.css('border-color', 'transparent')
    let new_phone = CleanPhone($input.val())
    let old_phone = $input.attr('data-phone')
    $parent.find(class_name).show()
    $.ajax({
        url: '/api/customer/',
        type: 'PATCH',
        data: JSON.stringify({
            ['phone' + num]: new_phone
        }),
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        async: false,
        error: function (data) {
            var modalElem = document.querySelector('.modal[data-modal="7"]');
            overlay.click()
            modalElem.classList.add('active');
            overlay.classList.add('active');
            $input.val(old_phone).mask("+7 (999) 999 99 99")
        },
        success: function (data) {
            var modalElem = document.querySelector('.modal[data-modal="5"]');
            overlay.click()
            modalElem.classList.add('active');
            overlay.classList.add('active');
            location.reload(true)
        }
    })
}

function AddPhone(obj, num) {
    let $parent = $(obj).parent()
    let $input = $parent.find('input')
    let new_phone = CleanPhone($input.val())
    $.ajax({
        url: '/api/customer/',
        type: 'PATCH',
        data: JSON.stringify({
            ['phone' + num]: new_phone
        }),
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        async: false,
        error: function (data) {
            var modalElem = document.querySelector('.modal[data-modal="7"]');
            overlay.click()
            modalElem.classList.add('active');
            overlay.classList.add('active');
        },
        success: function (data) {
            var modalElem = document.querySelector('.modal[data-modal="3"]');
            overlay.click()
            modalElem.classList.add('active');
            overlay.classList.add('active');
            location.reload(true)
        }
    })
}

function DeletePhone(obj, num) {
    $.ajax({
        url: '/api/customer/',
        type: 'PATCH',
        data: JSON.stringify({
            ['phone' + num]: null
        }),
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        async: false,
        error: function (data) {
            var modalElem = document.querySelector('.modal[data-modal="7"]');
            overlay.click()
            modalElem.classList.add('active');
            overlay.classList.add('active');
        },
        success: function (data) {
            var modalElem = document.querySelector('.modal[data-modal="4"]');
            overlay.click()
            modalElem.classList.add('active');
            overlay.classList.add('active');
            location.reload(true)
        }
    })
}