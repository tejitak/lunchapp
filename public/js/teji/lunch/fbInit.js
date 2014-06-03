function fbStatusChangeCallback(response) {
    if (response.status === 'connected') {
        // show logged in user name and logout button
        $("#loginBtnMenu").css({display: "none"});
        $("#loginUserMenu").css({display: ""});
        FB.api('/me', function(response) {
          $('#dropDownLoginName').html(response.name);
        });
    }else{
        // show login button
        $("#loginBtnMenu").css({display: ""});
        $("#loginUserMenu").css({display: "none"});
    }
}

function fbCheckLoginState() {
    FB.getLoginStatus(function(response) {
        fbStatusChangeCallback(response);
    });
}

function fbLogout(){
    FB.logout(function(response) {
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