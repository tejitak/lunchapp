/**
 * teji.getPackage.js
 */
var teji = teji || {};

/**
 * @function teji.getPackage
 * @description
 *  ネームスペースストリングを利用してパッケージで使う空のオブジェクトあるいは既存のオブジェクトを返還
 *
 * @param $packageName {String} ネームスペースで使う名前
 * @param $object {Object} ネームスペースに宣言されるオブジェクト本体
 * @param $doOverride {Boolean} 該当のネームスペースがもう存在する場合宣言するオブジェクトで overrideするか可否
 */
teji.getPackage = function ($packageName, $object, $doOverride) {
    var parts = $packageName.split('.');
    var part = window;
    for (var i = 0, length = parts.length, lastIndex = parts.length - 1; i < length; i++){
        part = (part[parts[i]] === undefined) ?
            (part[parts[i]] = (i === lastIndex && $object) ? $object : {}) :
        ((i === lastIndex && $object && $doOverride) ? (part[parts[i]] = $object) : part[parts[i]]);
    }
    return part;
};
