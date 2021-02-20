# scroll-bar

包裹一层自动隐藏滚动条

##### install

```bash
yarn add lcy-scroll-bar
# or
npm install lcy-scroll-bar --save
```

```
prop:
    native: 是否使用原生滚动条
    wrapStyle: 包裹层样式
    wrapClass: 包裹层class
    viewClass: 内容层样式
    viewStyle: 内容层class
    noresize: 是否调整大小, 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: 使用何种标签 (如: div, ul)

event:
    @scroll="onScroll"

需要给 :class 和 :wrap-class 定义的样式 设置高度
```

```javascript
import scrollBar from 'lcy-scroll-bar'
Vue.use(scrollBar)
```

```html
<scroll-bar
    tag="div" wrap-class="scrollbar__wrap" view-class="scrollbar__list" ref="scrollbar"
    :class="`scrollbar__demo`"
    @scroll="onScroll"
>
    <div>高度很高</div>
</scroll-bar>
```

```javascript
export default {
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {
        onScroll(dom) {
            console.log(dom)
        }
    }
}
```

License

MIT
