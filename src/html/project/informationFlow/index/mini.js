var Waf = {
  key: ['a', 'I', 'o', 'l', 'v', 'r', 'u', 'q', 'c', 'x'],
  encode:function (token) {
      return ((token) + '').split('').map(function (v) {
          return Waf.key[v]
      }).join('')
  },
  decode: function (token) {
      var i, index = {}
      for (i in this.key) {
          index[this.key[i]] = i
      }
      return ((token) + '').split('').map(function (v) {
          return index[v]
      }).join('')
  }
};

function getParam (variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
};


var EGEE_CODE = getParam('mm');
console.log(EGEE_CODE);

var EGEE_TIMI = Waf.decode(EGEE_CODE);
console.log('time', EGEE_TIMI * 1);


var EGEE_NOW = new Date().getTime();

var PHONE_NOW = Math.round(EGEE_NOW / 1000);
console.log('date', PHONE_NOW);

// if (EGEE_CODE) {
  if ((PHONE_NOW - (EGEE_TIMI * 1)) > 90) {
    window.location.href = 'http://www.baidu.com'
  }
// }