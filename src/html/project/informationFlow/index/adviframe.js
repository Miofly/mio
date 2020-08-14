;"use strict";if(newuser!=null){newuser=true}else{newuser=false};var hexcase=0;var b64pad="";var chrsz=8;function hex_md5(s){return binl2hex(core_md5(str2binl(s),s.length*chrsz))}function core_md5(x,e){x[e>>5]|=0x80<<((e)%32);x[(((e+64)>>>9)<<4)+14]=e;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16){var f=a;var g=b;var h=c;var j=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,f);b=safe_add(b,g);c=safe_add(c,h);d=safe_add(d,j)}return Array(a,b,c,d)}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b)}function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t)}function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t)}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t)}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t)}function core_hmac_md5(a,b){var c=str2binl(a);if(c.length>16)c=core_md5(c,a.length*chrsz);var d=Array(16),opad=Array(16);for(var i=0;i<16;i++){d[i]=c[i]^0x36363636;opad[i]=c[i]^0x5C5C5C5C}var e=core_md5(d.concat(str2binl(b)),512+b.length*chrsz);return core_md5(opad.concat(e),512+128)}function safe_add(x,y){var a=(x&0xFFFF)+(y&0xFFFF);var b=(x>>16)+(y>>16)+(a>>16);return(b<<16)|(a&0xFFFF)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))}function str2binl(a){var b=Array();var c=(1<<chrsz)-1;for(var i=0;i<a.length*chrsz;i+=chrsz)b[i>>5]|=(a.charCodeAt(i/chrsz)&c)<<(i%32);return b}function binl2hex(a){var b=hexcase?"0123456789ABCDEF":"0123456789abcdef";var c="";for(var i=0;i<a.length*4;i++){c+=b.charAt((a[i>>2]>>((i%4)*8+4))&0xF)+b.charAt((a[i>>2]>>((i%4)*8))&0xF)}return c}function limitStorage(){function S4(){return(((1+Math.random())*0x10000)|0).toString(16).substring(1)}return(S4()+S4()+S4()+S4())}var limits=limitStorage();var s=Math.pow((1<<3)+3,2);var b=String.fromCharCode(s);var c=b+b;function getUrlParam(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)");var r=window.location.search.substr(1).match(b);if(r!=null)return unescape(r[2]);return null};var advcode=getUrlParam('advcode');function getCookie(a){var b=document.cookie;if(b!=""){var d=b.split("; ");for(var i=0;i<d.length;i++){var e=d[i].split("=");if(e[0]==a){return e[1]}}return""}else{if(localStorage.getItem(a)!=null){return localStorage.getItem(a)}else{if(a=="lmuid"){localStorage.setItem("lmuid",limits);return localStorage.getItem(a)}else if(a=="lmsign"){localStorage.setItem("lmsign",hex_md5(limits+c));return localStorage.getItem(a)}}}};window.addEventListener('message',function(e){var b=[];var c={"lmuid":getCookie("lmuid"),"lmsign":getCookie("lmsign"),"newuser":newuser,"dbdbsf":"1"};var d=[JSON.parse(e.data)];for(var i=0;i<d.length;i++){d[i].lmuid=getCookie("lmuid");d[i].lmsign=getCookie("lmsign");d[i].newuser=newuser;b.push(d[i])}var f=encodeURIComponent(JSON.stringify(b[0]));var g=new XMLHttpRequest();g.onreadystatechange=function(){if(g.readyState==4&&g.status==200){var a=eval("("+g.responseText+")");if(a.ret!="fail"){window.parent.postMessage(JSON.stringify(c),'*')}}};g.open("POST","//www.huashengzixun.cn/api/adv/show",true);g.setRequestHeader("Content-type","application/x-www-form-urlencoded");g.send("data="+encodeURIComponent(f))},false);;