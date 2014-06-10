requirejs.config({
    baseUrl: "/js",
    paths: {
        "jquery": "lib/jquery/jquery",
        "text": "lib/requirejs-text/text",
        "bootstrap": "lib/bootstrap/bootstrap",
        "backbone": "lib/backbone/backbone",
        "underscore": "lib/underscore/underscore"
    },
    shim: {
       "bootstrap": {
            deps: ["jquery"]
        },
        "backbone": {
            deps: ["underscore"]
        }
    }
});

require(["teji/lunch/view/ShopListView", "teji/lunch/collection/ShopCollection"], function(ShopListView, ShopCollection) {
    var shopCollection = new ShopCollection();
    var shopListView = new ShopListView({el: ".fnResultViewList", collection: shopCollection});
    // temp for demo data
    shopCollection.add([
        {name: "ほの字 渋谷店", address: "東京都渋谷区渋谷1-11-3 第一小山ビル　２Ｆ",　shopURL: "http://tabelog.com/tokyo/A1303/A130301/13007031/", imageURL: "http://image1-4.tabelog.k-img.com/restaurant/images/Rvw/27789/150x150_square_27789286.jpg"},
        {name: "恵み 渋谷ヒカリエ店", address: "東京都渋谷区渋谷2-21-1 渋谷ヒカリエ 6F", shopURL: "http://tabelog.com/tokyo/A1303/A130301/13140077/", imageURL: "http://image1-2.tabelog.k-img.com/restaurant/images/Rvw/21444/100x100_square_21444453.jpg"},
        {name: "shop 1", address: "shibuya-ku", shopURL: "", imageURL: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjE1MCIgeT0iMTAwIiBzdHlsZT0iZmlsbDojYWFhO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjE5cHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MzAweDIwMDwvdGV4dD48L3N2Zz4="}
    ]);
});