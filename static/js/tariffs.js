$(function () {
    $("#" + $(".radio-tab:checked").val()).show();
    $(".radio-tab").change(function () {
        $(".tarif_tab").hide();
        $("#" + $(this).val()).show();
    });
});
