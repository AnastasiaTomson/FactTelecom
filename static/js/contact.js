function PhoneAddHandler(obj) {
    let $this = $(obj).parent().find('.dynamic-phone p:last-child');
    let $input = $this.find("input[id$='-phone']")
    $input.mask("+7 (999) 999 99 99");

    // Клонируем текущее поле
    let $clonePhone = $this.clone();

    // Инкриминируем порядковый номер
    let id_phone = $clonePhone.find("input[id$='-phone']").attr('id');
    let id_description = $clonePhone.find("input[id$='-description']").attr('id');
    let parts_phone = id_phone.split('-');
    let parts_description = id_description.split('-');
    let n = parseInt(parts_phone[1]) + 1;
    id_phone = parts_phone[0] + '-' + n + '-' + parts_phone[2];
    id_description = parts_description[0] + '-' + n + '-' + parts_description[2];
    $clonePhone.find("input[id$='-phone']").attr('id', id_phone);
    $clonePhone.find("input[id$='-description']").attr('id', id_description);
    let name_phone = id_phone.substring(3);
    let name_description = id_description.substring(3);
    $clonePhone.find("input[id$='-phone']").attr('name', name_phone);
    $clonePhone.find("input[id$='-description']").attr('name', name_description);

    // Очищаем поле
    $clonePhone.find('input').val('');
    // Добавляем клон следом за текущим полем
    $clonePhone.insertAfter($this);
    $clonePhone.find("input[id$='-phone']").on('focus', function () {
        $(this).mask("+7 (999) 999 99 99");
    })

    // Изменяем количество полей на странице на +1
    let $totalForms = $('#id_form-TOTAL_FORMS');
    let totalFormsCount = parseInt($totalForms.val());
    $totalForms.val(totalFormsCount + 1);
}

$('#id_form-0-phone').mask("+7 (999) 999 99 99")