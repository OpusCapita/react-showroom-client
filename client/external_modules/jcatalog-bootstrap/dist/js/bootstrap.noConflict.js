(function ($) {
    $(function () {
        //resolve conflict between jquery-ui.button and bootstrap.button
        //in case if jquery-ui is loaded
        if (typeof $.ui != 'undefined' && typeof $.ui.button != 'undefined') {
            $.fn.button.noConflict();
        }
    });
})(jQuery);