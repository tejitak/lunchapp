 (function(global, $)  {
    "use strict";

    teji.getPackage("teji.lunch.common.util", {

        escapeHTML: function(text){
            return text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        },

        isMobileScreen: function(){
            return $(window).width() < 768;
        }
    });
})(window, jQuery);