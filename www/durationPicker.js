! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.HtmlDurationPicker = e() : t.HtmlDurationPicker = e()
}(this, (function () {
    return function (t) {
        var e = {};

        function r(n) {
            if (e[n]) return e[n].exports;
            var a = e[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return t[n].call(a.exports, a, a.exports, r), a.l = !0, a.exports
        }
        return r.m = t, r.c = e, r.d = function (t, e, n) {
            r.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: n
            })
        }, r.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, r.t = function (t, e) {
            if (1 & e && (t = r(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var n = Object.create(null);
            if (r.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & e && "string" != typeof t)
                for (var a in t) r.d(n, a, function (e) {
                    return t[e]
                }.bind(null, a));
            return n
        }, r.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return r.d(e, "a", e), e
        }, r.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, r.p = "", r(r.s = 0)
    }([function (t, e, r) {
        "use strict";
        r.r(e),
            /**
             * @preserve
             * html-duration-picker.js
             *
             * @description Turn an html input box to a duration picker, without jQuery
             * @version 2.2.12
             * @author Chif <nadchif@gmail.com>
             * @license Apache-2.0
             *
             */
            e.default = function () {
                window.NodeList && !window.NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach);
                var t = ".pickerStyles {  text-align: right;  padding-right: 20px;  box-sizing: border-box;  width: 100%;  margin: 0;  cursor: text;}.scrollStyle {  text-align: center;  width: 16px;  padding: 0 4px;  border: none;  cursor: default;  position: absolute;}.caretStyle {  width: 0;  height: 0;  border-style: solid;}.caretUpStyle {  border-width: 0 4px 5px 4px;  border-color: transparent transparent #000 transparent;}.caretDownStyle {  border-width: 5px 4px 0 4px;  border-color: #000 transparent transparent transparent;}.controlsDivStyle {  display: inline-block;  position: absolute;  top: 1px;  padding: 2px 0;}.controlWrapperStyle {  display: inline-block;  position: relative;  background: transparent;  padding: 0;}",
                    e = function (t, e) {
                        var r, n = t.target,
                            a = n.selectionStart,
                            o = n.value,
                            i = o.indexOf(":"),
                            u = o.lastIndexOf(":");
                        return a <= i ? r = "hours" : e || a <= u ? r = "minutes" : !e && a > u && (r = "seconds"), {
                            cursorSelection: r,
                            hideSeconds: e,
                            hourMarker: i,
                            minuteMarker: u
                        }
                    },
                    r = function (t) {
                        var r = n(t.target),
                            a = e(t, r),
                            o = a.cursorSelection,
                            i = a.hourMarker,
                            u = a.minuteMarker;
                        if (o) {
                            if ("hours" === o) return t.target.setAttribute("data-adjustment-mode", 3600), void t.target.setSelectionRange(0, i);
                            if ("minutes" === o) {
                                var s = r ? 3 : 0;
                                return t.target.setAttribute("data-adjustment-mode", 60), void t.target.setSelectionRange(i + 1, u + s)
                            }
                            if ("seconds" === o) return t.target.setAttribute("data-adjustment-mode", 1), void t.target.setSelectionRange(u + 1, u + 3);
                            t.target.setAttribute("data-adjustment-mode", "ss"), t.target.setSelectionRange(u + 1, u + 3)
                        }
                    },
                    n = function (t) {
                        return void 0 !== t.dataset.hideSeconds && "false" !== t.dataset.hideSeconds
                    },
                    a = function (t, e) {
                        var r = Math.floor(e / 3600);
                        e %= 3600;
                        var a = Math.floor(e / 60),
                            o = e % 60,
                            i = String(r).padStart(2, "0"),
                            u = String(a).padStart(2, "0"),
                            s = String(o).padStart(2, "0"),
                            d = "".concat(i, ":").concat(u);
                        t.value = n(t) ? d : "".concat(d, ":").concat(s), t.dispatchEvent(function (t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                                bubbles: !1,
                                cancelable: !1
                            };
                            if ("function" == typeof Event) return new Event(t);
                            var r = document.createEvent("Event");
                            return r.initEvent(t, e.bubbles, e.cancelable), r
                        }("input"))
                    },
                    o = function (t, e) {
                        var r = t.value.indexOf(":"),
                            a = t.value.lastIndexOf(":"),
                            o = n(t);
                        t.focus(), t.select(), e >= 3600 ? (t.selectionStart = 0, t.selectionEnd = r) : !o && e < 60 ? (t.selectionStart = a + 1, t.selectionEnd = a + 3) : (t.selectionStart = r + 1, t.selectionEnd = r + 3, e = 60), e >= 1 && e <= 3600 && t.setAttribute("data-adjustment-mode", e)
                    },
                    i = function (t) {
                        var e = 1;
                        return Number(t.getAttribute("data-adjustment-mode")) > 0 && (e = Number(t.getAttribute("data-adjustment-mode"))), e
                    },
                    u = function (t, e) {
                        var r = i(t),
                            n = l(t.value);
                        switch (e) {
                            case "up":
                                n += r;
                                break;
                            case "down":
                                (n -= r) < 0 && (n = 0)
                        }
                        var o = c(t, n);
                        a(t, o)
                    },
                    s = function (t, e) {
                        var r = i(t);
                        switch (e) {
                            case "left":
                                o(t, 60 * r);
                                break;
                            case "right":
                                o(t, r / 60)
                        }
                    },
                    d = function (t, e) {
                        return RegExp(e ? "^[0-9]{2,3}:[0-5][0-9]$" : "^[0-9]{2,3}:[0-5][0-9]:[0-5][0-9]$").test(t)
                    },
                    c = function (t, e) {
                        var r = b(t),
                            n = r.maxDuration,
                            a = r.minDuration;
                        return Math.min(Math.max(e, a), n)
                    },
                    l = function (t) {
                        var e = t.split(":");
                        return e.length < 2 ? 0 : Number(e[2] || 0) + Number(60 * e[1]) + Number(60 * e[0] * 60)
                    },
                    p = function (t) {
                        var r = n(t.target),
                            a = e(t, r).cursorSelection,
                            o = t.target.value.split(":");
                        t.target.dataset.duration && d(t.target.dataset.duration, r) && (r && 2 !== o.length || !r && 3 !== o.length) ? t.target.value = t.target.dataset.duration : r || 3 === o.length ? r && 2 !== o.length ? t.target.value = "00:00" : (isNaN(o[0]) && (o[0] = "00"), (isNaN(o[1]) || o[1] < 0) && (o[1] = "00"), (o[1] > 59 || o[1].length > 2) && (o[1] = "59"), r || 2 !== o[1].length || o[1].slice(-1) !== t.key || "minutes" !== a || s(t.target, "right"), r || ((isNaN(o[2]) || o[2] < 0) && (o[2] = "00"), (o[2] > 59 || o[2].length > 2) && (o[2] = "59")), t.target.value = o.join(":")) : t.target.value = "00:00:00"
                    },
                    f = function (t) {
                        var e = t.target,
                            r = e.value || e.dataset.duration,
                            n = l(r);
                        a(e, c(e, n))
                    },
                    g = function (t) {
                        if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Enter"].includes(t.key)) {
                            switch (t.key) {
                                case "ArrowDown":
                                    u(t.target, "down");
                                    break;
                                case "ArrowUp":
                                    u(t.target, "up");
                                    break;
                                case "ArrowLeft":
                                    s(t.target, "left");
                                    break;
                                case "ArrowRight":
                                    s(t.target, "right");
                                    break;
                                case "Enter":
                                    f(t), t.target.blur()
                            }
                            t.preventDefault()
                        }
                        if ("Tab" === t.key) {
                            var e = i(t.target),
                                r = n(t.target) ? 3600 : 60,
                                a = t.shiftKey ? "left" : "right";
                            s(t.target, a), ("left" === a && e < 3600 || "right" === a && e >= r) && t.preventDefault()
                        }
                        if (isNaN(t.key) && !["Backspace", "ArrowDown", "ArrowUp", "Tab"].includes(t.key)) return t.preventDefault(), !1
                    },
                    v = function (t, e, r) {
                        var a = t.dataset[e];
                        return d(a, n(t)) ? l(a) : r
                    },
                    b = function (t) {
                        return {
                            minDuration: v(t, "durationMin", 0),
                            maxDuration: v(t, "durationMax", 1 / 0)
                        }
                    },
                    m = function (e) {
                        if (e) {
                            var s = document.head || document.getElementsByTagName("head")[0],
                                l = document.createElement("style");
                            s.appendChild(l), l.styleSheet ? l.styleSheet.cssText = t : l.appendChild(document.createTextNode(t))
                        }
                        return document.querySelectorAll("input.html-duration-picker").forEach((function (t) {
                            if ("true" != t.getAttribute("data-upgraded")) {
                                var e = t.currentStyle || window.getComputedStyle(t),
                                    s = e.marginRight,
                                    l = e.marginLeft,
                                    b = e.width;
                                t.setAttribute("data-upgraded", !0), t.value && d(t.value, n(t)) || a(t, function (t) {
                                    var e = v(t, "duration", 0);
                                    return c(t, e)
                                }(t)), t.classList.add("pickerStyles"), t.setAttribute("aria-label", "Duration Picker"), t.addEventListener("keydown", g), t.addEventListener("focus", r), t.addEventListener("mouseup", r), t.addEventListener("change", p), t.addEventListener("blur", f), t.addEventListener("keyup", p), t.addEventListener("drop", (function (t) {
                                    return t.preventDefault()
                                }));
                                var m = document.createElement("button"),
                                    h = document.createElement("button"),
                                    y = [m, h];
                                m.setAttribute("type", "button"), m.setAttribute("aria-label", "Increase duration"), m.setAttribute("class", "scrollStyle"), m.setAttribute("style", "height:".concat(t.offsetHeight / 2 - 1, "px !important; top: 1px;")), m.classList.add("scroll-up"), h.setAttribute("type", "button"), h.setAttribute("aria-label", "Decrease duration"), h.setAttribute("class", "scrollStyle"), h.setAttribute("style", "height:".concat(t.offsetHeight / 2 - 1, "px !important; top: ").concat(t.offsetHeight / 2 - 1, "px;")), h.classList.add("scroll-down");
                                var S = document.createElement("div"),
                                    w = document.createElement("div");
                                S.setAttribute("class", "caretStyle caretUpStyle"), w.setAttribute("class", "caretStyle caretDownStyle"), h.appendChild(w), m.appendChild(S), y.forEach((function (e) {
                                    var r;
                                    e.addEventListener("mousedown", (function (n) {
                                        n.target.style.transform = "translateY(1px)", n.preventDefault(), e == m ? (u(t, "up"), r = setInterval(u, 200, t, "up")) : (u(t, "down"), r = setInterval(u, 200, t, "down"))
                                    })), e.addEventListener("keypress", (function (r) {
                                        r.target.style.transform = "translateY(1px)", "Enter" == r.key && (r.preventDefault(), u(t, e == m ? "up" : "down"))
                                    })), e === m && e.addEventListener("keydown", (function (e) {
                                        "Tab" === e.key && e.shiftKey && (o(t, 1), e.preventDefault())
                                    })), e.addEventListener("keyup", (function (e) {
                                        if ("Enter" == e.key) {
                                            var r = i(t);
                                            o(t, r)
                                        }
                                    })), e.addEventListener("mouseup", (function (e) {
                                        e.target.style.transform = "translateY(0)";
                                        var n = i(t);
                                        o(t, n), clearInterval(r)
                                    })), e.addEventListener("mouseleave", (function (e) {
                                        if (e.target.style.transform = "translateY(0)", r) {
                                            clearInterval(r);
                                            var n = i(t);
                                            o(t, n)
                                        }
                                    }))
                                }));
                                var x = document.createElement("div");
                                x.setAttribute("class", "controlsDivStyle"), x.setAttribute("style", "left: ".concat(parseFloat(b) - 20, "px; height:").concat(t.offsetHeight, "px;")), x.classList.add("controls"), x.appendChild(m), x.appendChild(h);
                                var E = document.createElement("div");
                                E.setAttribute("class", "controlWrapperStyle"), E.setAttribute("style", "width: ".concat(b, "; margin-left: ").concat(l, "; margin-right: ").concat(s, ";")), E.classList.add("html-duration-picker-wrapper"), t.parentNode.insertBefore(E, t), E.appendChild(t), E.appendChild(x)
                            }
                        })), !0
                    };
                return window.addEventListener("DOMContentLoaded", (function () {
                    return m(!0)
                })), {
                    init: function () {
                        return m(!0)
                    },
                    refresh: function () {
                        return m(!1)
                    }
                }
            }()
    }]).default
}));