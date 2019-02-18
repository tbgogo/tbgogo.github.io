function getParams() {
    var a = decodeURI(location.href);
    var b = a.substring(a.indexOf("key=") + 4, a.length);
    return b
}
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array( - 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
function base64decode(h) {
    var g, f, d, b;
    var e, a, c;
    a = h.length;
    e = 0;
    c = "";
    while (e < a) {
        do {
            g = base64DecodeChars[h.charCodeAt(e++) & 255]
        } while ( e < a && g == - 1 );
        if (g == -1) {
            break
        }
        do {
            f = base64DecodeChars[h.charCodeAt(e++) & 255]
        } while ( e < a && f == - 1 );
        if (f == -1) {
            break
        }
        c += String.fromCharCode((g << 2) | ((f & 48) >> 4));
        do {
            d = h.charCodeAt(e++) & 255;
            if (d == 61) {
                return c
            }
            d = base64DecodeChars[d]
        } while ( e < a && d == - 1 );
        if (d == -1) {
            break
        }
        c += String.fromCharCode(((f & 15) << 4) | ((d & 60) >> 2));
        do {
            b = h.charCodeAt(e++) & 255;
            if (b == 61) {
                return c
            }
            b = base64DecodeChars[b]
        } while ( e < a && b == - 1 );
        if (b == -1) {
            break
        }
        c += String.fromCharCode(((d & 3) << 6) | b)
    }
    return c
}
$(function() {
    var c = getParams();
    var b = base64decode(c);
    var a = JSON.parse(b);
    a.Title = decodeURI(a.Title);
    $("title").text("预计返现" + a.bonus + "元，付费价" + a.Pay + "元");
    $("#taokey").text("￥" + a.tkl + "￥");
    $("#img").attr("src", a.picture);
    $("#coupons").attr("href", a.url);
    $("#copy").attr("data-clipboard-text", "￥" + a.tkl + "￥")
});
var clipboard = new Clipboard(".itemCopy");
clipboard.on("success",
function(a) {
    if (a.trigger.disabled == false || a.trigger.disabled == undefined) {
        a.trigger.innerHTML = "复制成功";
        a.trigger.style.backgroundColor = "#9ED29E";
        a.trigger.style.borderColor = "#9ED29E";
        a.trigger.disabled = true;
        setTimeout(function() {
            a.trigger.innerHTML = "一键复制";
            a.trigger.style.backgroundColor = "#f54d23";
            a.trigger.style.borderColor = "#f54d23";
            a.trigger.disabled = false
        },
        3000)
    }
});
clipboard.on("error",
function(a) {
    a.trigger.innerHTML = "复制失败";
    a.trigger.style.backgroundColor = "#8f8f8f";
    a.trigger.style.borderColor = "#8f8f8f"
});
$(function() {
    var a = 0;
    var b = navigator.userAgent.toLowerCase();
    if (b.match(/iphone/i) == "iphone" || b.match(/ipad/i) == "ipad") {
        $("#copy_tip").text("长按框内 > 拷贝 > 打开手淘");
        var c = b.match(/iphone os (\d{1,})/i);
        var f = c[1];
        if (f >= 10 || b.match(/ipad/i) == "ipad") {
            $(".itemCopy").show();
            $("#coupons").show()
        }
    } else {
        $(".itemCopy").show();
        $("#coupons").show()
    }
    var d = document.querySelector(".beatWord");
    var e = document.querySelector(".itemWord");
    var g = document.querySelector(".itemCopy");
    document.addEventListener("selectionchange",
    function(h) {
        window.getSelection().selectAllChildren(e)
    },
    false)
});
