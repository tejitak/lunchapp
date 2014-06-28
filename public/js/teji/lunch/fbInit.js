define("teji/lunch/fbInit", ["facebook", "jquery"], function(facebook, $){

    FB.init({
        appId      : '1437481033176694',
        cookie     : true, 
        xfbml      : true,
        version    : 'v2.0'
    });

    var fbInit = window.fbInit = {
        me: {},
        accessToken: "",
        loginSuccessCallback: null,
        loginFailCallback: null,
        logoutSuccesCallback: null,

        statusChangeCallback: function(response) {
            if(response.status === 'connected'){
                // show logged in user name and logout button
                $("#loginBtnMenu").css({display: "none"});
                $("#loginUserMenu").css({display: ""});
                FB.api('/me', $.proxy(function(res) {
                    fbInit.me = res;
                    $('#dropDownLoginName').html(res.name);
                    $('#loginUserImage').html(this.getImageHTML(res.id));
                }, this));
                this.accessToken = response.authResponse.accessToken;
                this.me = {id: response.authResponse.userID};
                if(this.loginSuccessCallback){
                    this.loginSuccessCallback(response);
                }
            }else{
                // show login button
                $("#loginBtnMenu").css({display: ""});
                $("#loginUserMenu").css({display: "none"});
                if(this.loginFailCallback){
                    this.loginFailCallback(response);
                }
            }
        },

        checkLoginState: function(onLoadCallback) {
            FB.getLoginStatus($.proxy(function(response) {
                this.statusChangeCallback(response);
                if(onLoadCallback){
                    onLoadCallback();
                }
            }, this));
        },

        logout: function(){
            FB.logout($.proxy(function(response) {
                this.statusChangeCallback(response);
                if(this.logoutCallback){
                    this.logoutCallback(response);
                }
            }, this));
        },

        getImageHTML: function(id, w, h){
            w = w || "20px", h = h || "20px";
            return "<img class='img-rounded' width='" + w + "' height='" + h + "' src='" + this.getImageURL(id) + "'/>";
        },

        getImageURL: function(id){
            return "http://graph.facebook.com/" + id + "/picture?type=square";
        },

        autoCompleteInit: function($input, $addBtn, addCallback){
            (function(){
                var _selectedItem = "";
                $input.autocomplete("https://graph.facebook.com/me/friends?access_token=" + fbInit.accessToken + "&callback=?", {
                    height: 400,
                    max: 10,
                    dataType: 'jsonp',
                    cacheLength: 10,
                    minChars: 1,

                    parse: function (data) {
                        console.log(data);
                        var rows = new Array();
                        data = data.data;
                        for (var i=0; i<data.length; i++) {
                            rows[i] = {data: data[i], value: data[i].name, result: data[i].name};
                        }
                        return rows;
                    },
                    
                    formatItem: function (data, i, n, value, text, a, b, c, d) {
                        return "<div class='fbFriendAutoCompleteItem'>" + fbInit.getImageHTML(data.id) + "<span>" + data.name + "</span></div>";
                    }
                }).result(function (evnet, item) {
                    _selectedItem = item;
                    $addBtn.removeAttr("disabled");
                });

                $input.on("change keyup", function(){
                    if(this.value !== "" && this.value === _selectedItem.name){
                        $addBtn.removeAttr("disabled");     
                    }else{
                        $addBtn.attr("disabled", "disabled");     
                    }
                });

                $addBtn.click(function(){
                    $input.val("");
                    $addBtn.attr("disabled", "disabled");     
                    if(addCallback){ addCallback(_selectedItem);}
                });
            })();
        },

        addAutoCompleteResult: function($resultContainer, person, removeCallback, administratorId){
            // add me as a member
            var $div = $("<div></div>").addClass("userContent");
            var $li = $("<li></li>").addClass("userPresentation").append($div);
            var $img = $(this.getImageHTML(person.id));
            var $a = $("<a></a>").attr("href", "https://www.facebook.com/app_scoped_user_id/" + person.id).attr("target", "_blank").html(person.name);
            if(removeCallback && person.id !== administratorId){
                var $deleteNode = $("<span></span>").addClass("deleteIcon").html("x").click(function(){
                    $li.remove();
                    removeCallback(person);
                });
            }
            $div.append($img).append($a).append($deleteNode);
            $resultContainer.append($li);
        }
    };
    return fbInit;
});