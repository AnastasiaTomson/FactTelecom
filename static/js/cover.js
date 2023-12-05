var overlay = document.querySelector('.js-overlay-modal')

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$('#check').on('click', function () {
    let $city = $('input[name=city]')
    let $street = $('input[name=street]')
    let $house = $('input[name=house]')
    let address = $city.val() && $street.val() && $house.val() ? $city.val() + ' ' + $street.val() + ' д.' + $house.val() : false;
    if (address) {
        border_red([$city, $street, $house])
        $.ajax({
            url: '/cover_check/',
            type: 'POST',
            data: {'city': $city.val(), 'street': $street.val(), 'house': $house.val()},
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            success: function (data) {

                let $modalElem = $('.modal[data-modal="3"]')
                var modalElem = document.querySelector('.modal[data-modal="3"]');
                if (data.response) {
                    $modalElem.find('.no').hide()
                } else {
                    $modalElem.find('.no').show()
                }
                $modalElem.find('.address').text(data.address)
                $modalElem.find('input[name="connection-request-address"]').val(data.address)
                overlay.click()
                modalElem.classList.add('active');
                overlay.classList.add('active');
            }
        })
    } else {
        border_red([$city, $street, $house])
    }
});


function border_red(elem_list) {
    $.each(elem_list, function (index, $elem) {
        if ($elem.val() === '') {
            $(this).attr('placeholder', 'Поле не может быть пустым').css('border-color', 'red')
        } else {
            $(this).css('border-color', '#DBDCDE')
        }
    })
}
