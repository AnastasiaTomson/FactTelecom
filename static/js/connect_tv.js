let tv_id
function ConnectTariff(obj, id) {
    let $parent = $(obj).closest('.tv_pack')
    let title = $parent.find('.pack_name:visible').text()
    let channels = $parent.find('.tv_list:visible').text()
    tv_id = id
    let $modal = $(`.modal[data-modal="5"]`)
    $modal.find('.modal_title_name').text(title)
    $modal.find('.speed').text(channels)
}