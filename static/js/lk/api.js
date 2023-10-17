var overlay = document.querySelector('.js-overlay-modal')

let process = false;

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

function showLoadingModal() {
    process = true;
    let modalOld = document.querySelector('.modal.active');
    modalOld.classList.remove('active');
    let modalNew = document.querySelector('.modal[data-modal="service_progress"]');
    modalNew.classList.add('active');
}

function hideLoadingModal(id) {
    process = false;
    let modalOld = document.querySelector('.modal.active');
    modalOld.classList.remove('active');
    let modalElem = document.querySelector('.modal[data-modal="' + id.toString() + '"]');
    modalElem.classList.add('active');
}

function state_status_internet(state) {
    if (process) {
        return;
    }
    if (state) {
        showLoadingModal();
        let data = {
            'state': state
        }
        if (state === 6) {
            let creditDaysSelect = document.getElementById('creditDays');
            data['credit_days'] = creditDaysSelect.selectedIndex + 1;
        }
        $.ajax({
            url: '/api/customer/internet/',
            type: 'PATCH',
            data: JSON.stringify(data),
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'User-Agent': UserAgentHeader
            },
            contentType: 'application/json',
            error: function (data) {
                hideLoadingModal(28);
            },
            success: function (data) {
                hideLoadingModal(10);
                location.reload()
            }
        })
    }
}

let settingState = null;

function state_status_tv(state) {
    if (state) {
        if (process) {
            return;
        }
        settingState = state;
        showLoadingModal();
        $.ajax({
            url: '/api/customer/iptv/',
            type: 'PATCH',
            data: JSON.stringify({
                'state': state
            }),
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'User-Agent': UserAgentHeader
            },
            contentType: 'application/json',
            error: function (data) {
                if (settingState === 3) {
                    hideLoadingModal(28);
                }
                else {
                    hideLoadingModal(7);
                }
            },
            success: function (data) {
                hideLoadingModal(10);
                location.reload()
            }
        })
    }
}

function Deferred_Internet_Tariff_Delete() {
    if (process) {
        return;
    }
    showLoadingModal();
    $.ajax({
        url: "/api/customer/internet/tariffs/deferred/",
        type: 'DELETE',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        error: function (data) {
            hideLoadingModal(7);
        },
        success: function (data) {
            hideLoadingModal(10);
            location.reload()
        }
    })
}

function transfer() {
    if (process) {
        return;
    }
    let $amountInput = $('#amountToTransfer');
    let to = $('.schet_nachislit #internet-balance').length === 1 ? 1 : 2;
    let $submitBtn = $('#PerformTransfer');
    if ($amountInput.val() !== '' && parseFloat($amountInput.val()) !== 0) {
        process = true;
        $submitBtn.text('Переводим...');
        $.ajax({
            url: '/api/customer/deposits/transfer/',
            type: 'POST',
            data: JSON.stringify({
                "amount": $amountInput.val(),
                "destination": to
            }),
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'User-Agent': UserAgentHeader
            },
            contentType: 'application/json',
            error: function (data) {
                process = false;
                $submitBtn.text('Произошла ошибка.');
            },
            success: function (data) {
                process = false;
                $submitBtn.text('Готово!');
                $amountInput.val('')
                location.reload();
            }
        })
    } else {
        if ($amountInput.val() === '') {
            $amountInput.keyup()
        }
    }
}


function Deferred_Internet_Tariff_Set() {
    if (process) {
        return;
    }
    showLoadingModal();
    $.ajax({
        url: "/api/customer/internet/tariffs/deferred/",
        type: 'POST',
        data: JSON.stringify({
            "tariff": tariff_id
        }),
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        error: function (data) {
            if (data.responseJSON.code === 'tariff_error') {
                hideLoadingModal(41);
            }
            else {
                hideLoadingModal(7);
            }
        },
        success: function (data) {
            hideLoadingModal(8);
            location.reload()
        }
    })
}


function Internet_Tariff_Set() {
    if (process) {
        return;
    }
    showLoadingModal();
    $.ajax({
        url: "/api/customer/internet/",
        type: 'PATCH',
        data: JSON.stringify({
            "tariff": tariff_id
        }),
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        error: function (data) {
            hideLoadingModal(7);
        },
        success: function (data) {
            hideLoadingModal(8);
            location.reload()
        }
    })
}

function add_iptv_subscription() {
    if (process) {
        return;
    }
    showLoadingModal();
    $.ajax({
        url: '/api/customer/iptv/subscriptions/',
        type: 'POST',
        data: JSON.stringify({
            "packet": packet_id
        }),
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        error: function (data) {
            hideLoadingModal(7);
        },
        success: function (data) {
            hideLoadingModal(8);
            location.reload()
        }
    })
}

function marking_for_delete_iptv_sub() {
    if (process) {
        return;
    }
    showLoadingModal();
    $.ajax({
        url: '/api/customer/iptv/subscriptions/' + sub_id + '/',
        type: 'PATCH',
        data: JSON.stringify({
            "for_deletion": for_deletion
        }),
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        error: function (data) {
            hideLoadingModal(7);
        },
        success: function (data) {
            let num;
            if (for_deletion) {
                num = 9
            }else{
                num = 10
            }
            hideLoadingModal(num);
            location.reload()
        }
    })
}

function delete_iptv_sub() {
    if (process) {
        return;
    }
    showLoadingModal();
    $.ajax({
        url: '/api/customer/iptv/subscriptions/' + sub_id + '/',
        type: 'DELETE',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        error: function (data) {
            hideLoadingModal(7);
        },
        success: function (data) {
            hideLoadingModal(9);
            location.reload()
        }
    })
}


function synchronize_tv() {
    if (process) {
        return;
    }
    showLoadingModal();
    $.ajax({
        url: '/api/customer/iptv/synchronization/synchronize/',
        type: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        error: function (data) {
            hideLoadingModal(7);
        },
        success: function (data) {
            hideLoadingModal(10);
            location.reload()
        }
    })
}


function set_static_ip() {
    if (process) {
        return;
    }
    showLoadingModal();
    $.ajax({
        url: '/api/customer/internet/services/static-ip/',
        type: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        error: function (data) {
            hideLoadingModal(7);
        },
        success: function (data) {
            hideLoadingModal(8);
            location.reload()
        }
    })
}


function marking_for_delete_static_ip(for_deletion) {
    if (process) {
        return;
    }
    showLoadingModal();
    $.ajax({
        url: '/api/customer/internet/services/static-ip/',
        type: 'PATCH',
        data: JSON.stringify({
            "for_deletion": for_deletion
        }),
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        error: function (data) {
            hideLoadingModal(7);
        },
        success: function (data) {
            hideLoadingModal(9);
            location.reload()
        }
    })
}

function delete_static_ip() {
    if (process) {
        return;
    }
    showLoadingModal();
    $.ajax({
        url: '/api/customer/internet/services/static-ip/',
        type: 'DELETE',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        error: function (data) {
            hideLoadingModal(7);
        },
        success: function (data) {
            hideLoadingModal(9);
            location.reload()
        }
    })
}

function change_phone_sms_info(phone_id) {
    if (process) {
        return;
    }
    $.ajax({
        url: '/api/customer/internet/services/sms-info/',
        type: 'PATCH',
        data: JSON.stringify({'phone_id': phone_id}),
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        error: function (data) {
            hideLoadingModal(7);
        },
        success: function (data) {
            hideLoadingModal(8);
            location.reload(true)
        }
    })
}


function set_sms_info(phone_id) {
    if (process) {
        return;
    }
    showLoadingModal();
    $.ajax({
        url: '/api/customer/internet/services/sms-info/',
        type: 'POST',
        data: JSON.stringify({'phone_id': phone_id}),
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        error: function (data) {
            hideLoadingModal(7);
        },
        success: function (data) {
            hideLoadingModal(8);
            location.reload()
        }
    })
}

function marking_for_delete_sms_info(for_deletion) {
    if (process) {
        return;
    }
    showLoadingModal();
    $.ajax({
        url: '/api/customer/internet/services/sms-info/',
        type: 'PATCH',
        data: JSON.stringify({
            "for_deletion": for_deletion
        }),
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        error: function (data) {
            hideLoadingModal(7);
        },
        success: function (data) {
            hideLoadingModal(9);
            location.reload()
        }
    })
}

function delete_sms_info() {
    if (process) {
        return;
    }
    showLoadingModal();
    $.ajax({
        url: '/api/customer/internet/services/sms-info/',
        type: 'DELETE',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'User-Agent': UserAgentHeader
        },
        contentType: 'application/json',
        error: function (data) {
            hideLoadingModal(7);
        },
        success: function (data) {
            hideLoadingModal(9);
            location.reload()
        }
    })
}