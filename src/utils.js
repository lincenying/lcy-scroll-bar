import Vue from 'vue'

let scrollBarWidth

export const BAR_MAP = {
    vertical: {
        offset: 'offsetHeight',
        scroll: 'scrollTop',
        scrollSize: 'scrollHeight',
        size: 'height',
        key: 'vertical',
        axis: 'Y',
        client: 'clientY',
        direction: 'top'
    },
    horizontal: {
        offset: 'offsetWidth',
        scroll: 'scrollLeft',
        scrollSize: 'scrollWidth',
        size: 'width',
        key: 'horizontal',
        axis: 'X',
        client: 'clientX',
        direction: 'left'
    }
}

export function rafThrottle(fn) {
    let locked = false
    return function(...args) {
        if (locked) return
        locked = true
        window.requestAnimationFrame(_ => {
            fn.apply(this, args)
            locked = false
        })
    }
}

export default function() {
    if (Vue.prototype.$isServer) return 0
    if (scrollBarWidth !== undefined) return scrollBarWidth

    const outer = document.createElement('div')
    outer.className = 'el-scrollbar__wrap'
    outer.style.visibility = 'hidden'
    outer.style.width = '100px'
    outer.style.position = 'absolute'
    outer.style.top = '-9999px'
    document.body.appendChild(outer)

    const widthNoScroll = outer.offsetWidth
    outer.style.overflow = 'scroll'

    const inner = document.createElement('div')
    inner.style.width = '100%'
    outer.appendChild(inner)

    const widthWithScroll = inner.offsetWidth
    outer.parentNode.removeChild(outer)
    scrollBarWidth = widthNoScroll - widthWithScroll

    return scrollBarWidth
}

/* istanbul ignore next */
export const on = (function() {
    if (!isServer && document.addEventListener) {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler)
            }
        }
    }
})()

/* istanbul ignore next */
export const off = (function() {
    if (!isServer && document.removeEventListener) {
        return function(element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    } else {
        return function(element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler)
            }
        }
    }
})()

export function renderThumbStyle({ move, size, bar }) {
    const style = {}
    const translate = `translate${bar.axis}(${move}%)`

    style[bar.size] = size
    style.transform = translate
    style.msTransform = translate
    style.webkitTransform = translate

    return style
}

function extend(to, _from) {
    for (let key in _from) {
        to[key] = _from[key]
    }
    return to
}

export function toObject(arr) {
    var res = {}
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i])
        }
    }
    return res
}
