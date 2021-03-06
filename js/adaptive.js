;
(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }
    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        if (dpr === 2){
            scale = 1;
        } else {
            scale = 1/dpr;
        }
    }
    //为html标签添加data-dpr属性
    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        // 动态设置meta
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }
    //根据dpr和物理像素设置rem
    function refreshRem() {
        //getBoundingClientRect().width相当于物理像素
        var width = docEl.getBoundingClientRect().width;
        // width / dpr > 540等于独立像素
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        if (width === 750) {
            width = 750/dpr;
        }
        var rem = width / 10; // 将屏幕宽度分成10份， 1份为1rem. rem转化px计算公式=d*(width/10)
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }
    // 监听窗口变化，重新设置尺寸
    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    // 当重新载入页面时，判断是否是缓存，如果是缓存，执行refreshRem()
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);
    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }
    refreshRem();
    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }
})(window, window['lib'] || (window['lib'] = {}));

// !function () {
//     var a = "@charset \"utf-8\";html{color:#000;background:#fff;overflow-y:scroll;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}html *{outline:0;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}html,body{font-family:sans-serif}body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{margin:0;padding:0}input,select,textarea{font-size:100%}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}abbr,acronym{border:0;font-variant:normal}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:500}ol,ul{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:500}q:before,q:after{content:''}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a:hover{text-decoration:underline}ins,a{text-decoration:none}",
//         b = document.createElement("style");
//     if (document.getElementsByTagName("head")[0].appendChild(b), b.styleSheet) b.styleSheet.disabled || (b.styleSheet.cssText = a); else try {
//         b.innerHTML = a
//     } catch (c) {
//         b.innerText = a
//     }
// }();
// !function (a, b) {
//     function c() {
//         var b = f.getBoundingClientRect().width;
//         b / i > 540 && (b = 540 * i);
//         var c = b / 10;
//         f.style.fontSize = c + "px", k.rem = a.rem = c
//     }
//
//     var d, e = a.document, f = e.documentElement, g = e.querySelector('meta[name="viewport"]'),
//         h = e.querySelector('meta[name="flexible"]'), i = 0, j = 0, k = b.flexible || (b.flexible = {});
//     if (g) {
//         console.warn("将根据已有的meta标签来设置缩放比例");
//         var l = g.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
//         l && (j = parseFloat(l[1]), i = parseInt(1 / j))
//     } else if (h) {
//         var m = h.getAttribute("content");
//         if (m) {
//             var n = m.match(/initial\-dpr=([\d\.]+)/), o = m.match(/maximum\-dpr=([\d\.]+)/);
//             n && (i = parseFloat(n[1]), j = parseFloat((1 / i).toFixed(2))), o && (i = parseFloat(o[1]), j = parseFloat((1 / i).toFixed(2)))
//         }
//     }
//     if (!i && !j) {
//         var p = (a.navigator.appVersion.match(/android/gi), a.navigator.appVersion.match(/iphone/gi)),
//             q = a.devicePixelRatio;
//         i = p ? q >= 3 && (!i || i >= 3) ? 3 : q >= 2 && (!i || i >= 2) ? 2 : 1 : 1, j = 1 / i
//     }
//     if (f.setAttribute("data-dpr", i), !g)if (g = e.createElement("meta"), g.setAttribute("name", "viewport"), g.setAttribute("content", "initial-scale=" + j + ", maximum-scale=" + j + ", minimum-scale=" + j + ", user-scalable=no"), f.firstElementChild) f.firstElementChild.appendChild(g); else {
//         var r = e.createElement("div");
//         r.appendChild(g), e.write(r.innerHTML)
//     }
//     a.addEventListener("resize", function () {
//         clearTimeout(d), d = setTimeout(c, 300)
//     }, !1), a.addEventListener("pageshow", function (a) {
//         a.persisted && (clearTimeout(d), d = setTimeout(c, 300))
//     }, !1), "complete" === e.readyState ? e.body.style.fontSize = 12 * i + "px" : e.addEventListener("DOMContentLoaded", function () {
//         e.body.style.fontSize = 12 * i + "px"
//     }, !1), c(), k.dpr = a.dpr = i, k.refreshRem = c, k.rem2px = function (a) {
//         var b = parseFloat(a) * this.rem;
//         return "string" == typeof a && a.match(/rem$/) && (b += "px"), b
//     }, k.px2rem = function (a) {
//         var b = parseFloat(a) / this.rem;
//         return "string" == typeof a && a.match(/px$/) && (b += "rem"), b
//     }
// }(window, window.lib || (window.lib = {}));