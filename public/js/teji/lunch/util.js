define("teji/lunch/util", ["jquery"], function($){
    return {
        showPage: function(mainPages, pageIndex){
            // hide other pages
            $.each(mainPages, function(i, selector){
                $(selector).hide().css({opacity: 0});
            });
            $(mainPages[pageIndex]).show().velocity({opacity: 1});
        }
    };
});