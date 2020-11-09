var killErrors = function(value) {
    return true
};
window.onerror = null;
window.onerror = killErrors;
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F)
    }
    return out
}
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (i < len && c1 == -1);if (c1 == -1)
            break;
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (i < len && c2 == -1);if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3]
        } while (i < len && c3 == -1);if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4]
        } while (i < len && c4 == -1);if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
    }
    return out
}
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i)
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
        }
    }
    return out
}
function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                break
        }
    }
    return out
}
;eval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    }
    ;
    if (!''.replace(/^/, String)) {
        while (c--)
            r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }
        ];
        e = function() {
            return '\\w+'
        }
        ;
        c = 1
    }
    ;while (c--)
        if (k[c])
            p = p.replace(new RegExp('\\b' + e(c) + '\\b','g'), k[c]);
    return p
}('1d 6={\'D\':7(s,n){1e 3.E.m(\'{F}\',s).m(\'{F}\',s).m(\'{G}\',n).m(\'{G}\',n)},\'1f\':7(s,n){1g.1h=3.D(s,n)},\'1i\':7(){$(\'#b\').v(\'f\',3.H);1j(7(){6.I()},3.J*1k);$("#w").x(0).1l=3.1m+\'\'},\'1n\':7(){8($("#b").v(\'f\')!=3.y){$("#b").v(\'f\',3.y)}$("#b").K()},\'I\':7(){$(\'#b\').1o()},\'1p\':7(){3.L=1q;$(\'#M\').K()},\'N\':7(){O.P(\'<j>.6{1r: #1s;1t-1u:1v;1w:#1x;1y:Q;1z:Q;o:1A;1B:1C;g:\'+3.h+\';c:\'+3.i+\';1D-c:1E;}.6 A{g:9%;c:9%;}.6 #w{o:1F;!1G;g:9%;c:9%;}</j><R 1H="6">\'+\'<p B="b" f="" S="0" T="C" g="9%" c="9%" j="o:U;z-V:W;"></p><p B="M" f="" S="0" T="C" g="9%" c="9%" j="o:U;z-V:W;1I:1J;"></p>\'+\'<A 1K="0" 1L="0" 1M="0"><1N><X B="w" 1O="1P" j="">&1Q;</X></A></R>\');3.Y=$(\'.6\').x(0).Y;3.Z=$(\'.6\').x(0).Z;O.P(\'<10\'+\'11 f="\'+3.12+3.d+\'.1R"></10\'+\'11>\')},\'13\':7(){},\'1S\':7(){3.L=1T;3.14=\'\';8(4.15==\'1\'){4.k=q(4.k);4.l=q(4.l)}16 8(4.15==\'2\'){4.k=q(17(4.k));4.l=q(17(4.l))}3.e=1U.1V.1W();3.h=5.g;3.i=5.c;8(3.e.a("1X")>0||3.e.a("1Y")>0||3.e.a("1Z")>0||3.e.a("20")>0||3.e.a("21")>0||3.e.a("22")>0){3.h=5.23;3.i=5.24}8(3.h.a("18")==-1&&3.h.a("%")==-1){3.h=\'9%\'}8(3.i.a("18")==-1&&3.i.a("%")==-1){3.i=\'9%\'}3.H=5.25;3.y=5.b;3.J=5.26;3.19=4.27;3.28=4.29;3.2a=4.2b;3.E=2c(4.2d);3.d=4.2e;3.2f=4.2g;3.r=4.1a==\'C\'?\'\':4.1a;3.2h=4.k;3.2i=4.l;3.2j=4.2k;3.2l=4.2m;8(5.1b[3.r]!=1c){3.r=5.1b[3.r].2n}8(5.t[3.d]!=1c){8(5.t[3.d].2o=="1"){3.14=5.t[3.d].u==\'\'?5.u:5.t[3.d].u;3.d=\'u\'}}3.12=2p.2q+\'/2r/2s/\';8(3.19=="2t"){6.13()}16{6.N()}}};', 62, 154, '|||this|player_data|MacPlayerConfig|MacPlayer|function|if|100|indexOf|buffer|height|PlayFrom|Agent|src|width|Width|Height|style|url|url_next|replace||position|iframe|unescape|PlayServer||player_list|parse|attr|playleft|get|Buffer||table|id|no|GetUrl|Link|sid|nid|Prestrain|AdsEnd|Second|show|Status|install|Play|document|write|0px|div|frameBorder|scrolling|absolute|index|99998|td|offsetHeight|offsetWidth|scr|ipt|Path|Down|Parse|encrypt|else|base64decode|px|Flag|server|server_list|undefined|var|return|Go|location|href|Show|setTimeout|1000|innerHTML|Html|AdsStart|hide|Install|false|background|000000|font|size|14px|color|F6F6F6|margin|padding|relative|overflow|hidden|min|100px|inherit|important|class|display|none|border|cellpadding|cellspacing|tr|valign|top|nbsp|js|Init|true|navigator|userAgent|toLowerCase|android|mobile|ipod|ios|iphone|ipad|widthmob|heightmob|prestrain|second|flag|Trysee|trysee|Points|points|decodeURIComponent|link|from|PlayNote|note|PlayUrl|PlayUrlNext|PlayLinkNext|link_next|PlayLinkPre|link_pre|des|ps|maccms|path|static|player|down'.split('|'), 0, {}));
MacPlayer.Init();
