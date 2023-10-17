function ConnectTariff(obj) {
    let $parent = $(obj).closest('.item_body_content')
    let title = $parent.find('.tarif_name:visible').text()
    let speed = $parent.find('.tarif_name:visible').attr('data-speed')
    tariff_id = $parent.find('.tab_name:visible').attr('id')
    let $modal = $(`.modal[data-modal="4"]`)
    $modal.find('.modal_title_name').text(title)
    $modal.find('.speed').text(speed)
}