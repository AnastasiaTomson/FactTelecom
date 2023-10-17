var overlay = document.querySelector('.js-overlay-modal')

// ФУНКЦИЯ ДЛЯ ОТПРАВКИ ЗАЯВКИ С ДАТОЙ ПОДКЛЮЧЕНИЯ
function SendApplicationForConnectionMessage(obj) {
    let selectedDate = `${calendar.selectedDate.Day > 9 ? calendar.selectedDate.Day : '0' + calendar.selectedDate.Day}.${calendar.selectedDate.Month > 9 ? calendar.selectedDate.Month : '0' + calendar.selectedDate.Month}.${calendar.selectedDate.Year}`
    let name = $('input[name="connection_name"]').val()
    let phone = $('input[name="connection_phone"]').val()
    let $form = $('#connection-form')[0]
    $('#connection-form .error').remove()
    if (name.length < 1 || phone.length < 1) {
        if (name.length < 1) {
            $('input[name="connection_name"]').before('<span class="error">Обязательное поле</span>');
        }
        if (phone.length < 1) {
            $('input[name="connection_phone"]').before('<span class="error">Обязательное поле</span>');
        } else {
            if (phone.length < 18) {
                $('input[name="connection_phone"]').before('<span class="error">Неверный формат номера телефона</span>');
            }
        }
    } else {
        $.ajax({
            url: '/feedback/application_for_connection/',
            type: 'POST',
            headers: {
                "X-CSRFToken": getCookie('csrftoken'),
            },
            data: {'selected_date': selectedDate, 'name': name, 'phone': phone},
            success: function (data) {
                let $modalElem = $('.modal[data-modal="2"]')
                var modalElem = document.querySelector('.modal[data-modal="2"]');
                $modalElem.find('.title_2').text(data.title)
                $modalElem.find('.modal_text').text(data.message)
                overlay.click()
                modalElem.classList.add('active');
                overlay.classList.add('active');
                $form.reset()
                $('.connectivity_form').each(function () {
                    $(this)[0].reset()
                })
            }
        })
    }
}

// ФУНКЦИЯ ДЛЯ ОТПРАВКИ ЗАЯВКИ С ТЕЛЕФОНОМ
function SendSupportMessage(obj) {
    let phone = $('input[name="support-phone"]').val()
    let $form = $('#support-form')[0]
    $('#support-form .error').remove()
    if (phone.length < 1) {
        $('input[name="support-phone"]').before('<span class="error">Обязательное поле</span>');
    } else {
        if (phone.length < 18) {
            $('input[name="support-phone"]').before('<span class="error">Неверный формат номера телефона</span>');
        } else {
            $.ajax({
                url: '/feedback/submit_your_application/',
                type: 'POST',
                headers: {
                    "X-CSRFToken": getCookie('csrftoken'),
                },
                data: {'phone': phone},
                success: function (data) {
                    let $modalElem = $('.modal[data-modal="2"]')
                    var modalElem = document.querySelector('.modal[data-modal="2"]');
                    $modalElem.find('.title_2').text(data.title)
                    $modalElem.find('.modal_text').text(data.message)
                    overlay.click()
                    modalElem.classList.add('active');
                    overlay.classList.add('active');
                    $form.reset()
                }
            })
        }
    }
}

// ФУНКЦИЯ ДЛЯ ОТПРАВКИ ЗАЯВКИ С ТЕЛЕФОНОМ
function SendSupportMessagePhoneName(obj, page) {
    let name = $('input[name="connection_name"]').val()
    let phone = $('input[name="connection_phone"]').val()
    let $form = $('#connection-form')[0]
    $('#connection-form .error').remove()
    if (name.length < 1 || phone.length < 1) {
        if (name.length < 1) {
            $('input[name="connection_name"]').before('<span class="error">Обязательное поле</span>');
        }
        if (phone.length < 1) {
            $('input[name="connection_phone"]').before('<span class="error">Обязательное поле</span>');
        } else {
            if (phone.length < 18) {
                $('input[name="connection_phone"]').before('<span class="error">Неверный формат номера телефона</span>');
            }
        }
    } else {
        $.ajax({
            url: '/feedback/application_for_connection_phone_name/',
            type: 'POST',
            headers: {
                "X-CSRFToken": getCookie('csrftoken'),
            },
            data: {'name': name, 'phone': phone, 'page': page},
            success: function (data) {
                let $modalElem = $('.modal[data-modal="2"]')
                var modalElem = document.querySelector('.modal[data-modal="2"]');
                $modalElem.find('.title_2').text(data.title)
                $modalElem.find('.modal_text').text(data.message)
                overlay.click()
                modalElem.classList.add('active');
                overlay.classList.add('active');
                $form.reset()
                $('.connectivity_form').each(function () {
                    $(this)[0].reset()
                })
            }
        })
    }
}

// ФУНКЦИЯ ДЛЯ ОТПРАВКИ ЗАЯВКИ С АДРЕСОМ
function SendSupportMessageConnection(obj) {
    let phone = $('input[name="connection-request-phone"]').val()
    let name = $('input[name="connection-request-name"]').val()
    let address = $('input[name="connection-request-address"]').val()
    let comment = $('input[name="connection-request-comment"]').val()
    let $form = $('#connection-request-form')[0]
    $('#connection-request-form .error').remove()
    if (name.length < 1) {
        $('input[name="connection-request-name"]').before('<span class="error">Обязательное поле</span>');
    } else {
        if (phone.length < 1) {
            $('input[name="connection-request-phone"]').before('<span class="error">Обязательное поле</span>');
        } else {
            if (phone.length < 18) {
                $('input[name="support-phone"]').before('<span class="error">Неверный формат номера телефона</span>');
            } else {
                $.ajax({
                    url: '/feedback/connection_request/',
                    type: 'POST',
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken'),
                    },
                    data: {'name': name, 'phone': phone, 'comment': comment, 'address': address,},
                    success: function (data) {
                        let $modalElem = $('.modal[data-modal="2"]')
                        var modalElem = document.querySelector('.modal[data-modal="2"]');
                        $modalElem.find('.title_2').text(data.title)
                        $modalElem.find('.modal_text').text(data.message)
                        overlay.click()
                        modalElem.classList.add('active');
                        overlay.classList.add('active');
                        $form.reset()
                        $('.connectivity_form')[0].reset()
                    }
                })
            }
        }
    }
}


// ФУНКЦИЯ ДЛЯ ОТПРАВКИ ЗАЯВКИ С ВЫБРАННЫМ ТАРИФОМ
function SendSupportMessageConnectionWithTariff(obj) {
    let $parent = $(obj).closest('.internet_1')
    let phone = $parent.find('input[name="phone"]').val()
    let name = $parent.find('input[name="name"]').val()
    let address = $parent.find('input[name="address"]').val()
    let $form = $parent[0]
    $parent.find('.error').remove()
    if (name.length < 1) {
        $parent.find('input[name="name"]').attr('placeholder', 'Поле не может быть пустым')
    } else {
        if (phone.length < 1) {
            $parent.find('input[name="phone"]').attr('placeholder', 'Поле не может быть пустым')
        } else {
            if (phone.length < 18) {
                $parent.find('input[name="phone"]').attr('placeholder', 'Неверный формат номера телефона')
            } else {
                if (address.length < 1) {
                    $parent.find('input[name="address"]').attr('placeholder', 'Поле не может быть пустым')
                } else {
                    $.ajax({
                        url: '/feedback/connection_request_with_tariff/',
                        type: 'POST',
                        headers: {
                            'X-CSRFToken': getCookie('csrftoken'),
                        },
                        data: {'name': name, 'phone': phone, 'address': address, 'tariff_id': tariff_id},
                        success: function (data) {
                            let $modalElem = $('.modal[data-modal="2"]')
                            var modalElem = document.querySelector('.modal[data-modal="2"]');
                            $modalElem.find('.title_2').text(data.title)
                            $modalElem.find('.modal_text').text(data.message)
                            overlay.click()
                            modalElem.classList.add('active');
                            overlay.classList.add('active');
                            $form.reset()
                            $('.connectivity_form')[0].reset()
                        }
                    })
                }
            }
        }
    }
}


// ФУНКЦИЯ ДЛЯ ОТПРАВКИ ЗАЯВКИ С ВЫБРАННЫМ ТВ-ТАРИФОМ
function SendSupportMessageConnectionWithTVTariff(obj) {
    let $parent = $(obj).closest('.internet_1')
    let phone = $parent.find('input[name="phone"]').val()
    let name = $parent.find('input[name="name"]').val()
    let address = $parent.find('input[name="address"]').val()
    let $form = $parent[0]
    $parent.find('.error').remove()
    if (name.length < 1) {
        $parent.find('input[name="name"]').attr('placeholder', 'Поле не может быть пустым')
    } else {
        if (phone.length < 1) {
            $parent.find('input[name="phone"]').attr('placeholder', 'Поле не может быть пустым')
        } else {
            if (phone.length < 18) {
                $parent.find('input[name="phone"]').attr('placeholder', 'Неверный формат номера телефона')
            } else {
                if (address.length < 1) {
                    $parent.find('input[name="address"]').attr('placeholder', 'Поле не может быть пустым')
                } else {
                    $.ajax({
                        url: '/feedback/connection_request_with_tv_tariff/',
                        type: 'POST',
                        headers: {
                            'X-CSRFToken': getCookie('csrftoken'),
                        },
                        data: {'name': name, 'phone': phone, 'address': address, 'tv_id': tv_id},
                        success: function (data) {
                            let $modalElem = $('.modal[data-modal="2"]')
                            var modalElem = document.querySelector('.modal[data-modal="2"]');
                            $modalElem.find('.title_2').text(data.title)
                            $modalElem.find('.modal_text').text(data.message)
                            overlay.click()
                            modalElem.classList.add('active');
                            overlay.classList.add('active');
                            $form.reset()
                            $('.connectivity_form')[0].reset()
                        }
                    })
                }
            }
        }
    }
}