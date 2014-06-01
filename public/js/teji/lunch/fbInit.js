function fbCheckLoginState() {
    FB.getLoginStatus(function(response) {
        fbStatusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '1437481033176694',
        cookie     : true, 
        xfbml      : true,
        version    : 'v2.0'
    });

    FB.getLoginStatus(function(response) {
        fbStatusChangeCallback(response);
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));