<!-- author: kstain -->
<!-- date: 2020.7.12 -->
<!-- 采用了两种状态图片的方案来实现的，外部自定义图片时传 require('path') 后的地址，自定义图片的话，maskImage 不再生效还是第一次默认蛇者的五角星。。 -->
<!-- 去掉第一行的 { maskImage: activeImage && `url(${activeImage})` } 就知道后面设置的 maskImage 没能覆盖前面的 -->
<template>
    <li ref="rateItemContainer" class="rate-item">
        <slot>
            <div class="rate-item-def" :style="{backgroundImage: defaultImage && `url(${defaultImage})`}">
                <div class="rate-item"
                     :class="{ 'rate-item-active': isActive }">
                    <div :class="[ integral ? 'rate-item-def' : 'active-container', { 'rate-item-mask': activeColor } ]"
                         v-bind:style="{ width: integral ? (isActive ? '100%' : '0%') : `${widthPercent}%`, backgroundColor: activeColor, backgroundImage: defaultImage && `url(${defaultImage})`, maskImage: activeImage && `url(${activeImage})` }">
                        <div :class="[ activeColor ? 'rate-item-mask' : 'rate-item-act' ]"
                             v-bind:style="{ width: integral ? '100%' : `${containerWidth}px`, backgroundColor: activeColor, backgroundImage: activeImage && `url(${activeImage})`, maskImage: activeImage && `url(${activeImage})` }"></div>
                    </div>
                </div>
            </div>
        </slot>
    </li>
</template>

<script type="text/ecmascript-6">
    const COMPONENT_NAME = 'ks-rate-item'
    export default {
        name: COMPONENT_NAME,
        props: {
            index: {
                type: Number,
                default: 0
            },
            allowDecimal: {
                type: Boolean,
                default: false
            },
            allowHalf: {
                type: Boolean,
                default: false
            },
            activeColor: {
                type: String,
                default: null
            },
            defaultImage: {
                type: String,
                default: null
            },
            activeImage: {
                type: String,
                default: null
            }
        },
        data: function () {
            // https://doc.vue-js.com/v2/guide/class-and-style.html#对象语法-1
            // 直接绑定到一个样式对象通常更好，这会让模板更清晰：
            // <div v-bind:style="styleObject"></div>
            // 然而这样绑定内联样式并没有起作用，直接用样式字符串倒是起作用了：
            // <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
            return {
                activeStyle: {
                    width: `${this.widthPercent}%`
                },
                containerWidth: 32
            };
        },
        computed: {
            widthPercent() {
                let percent = (this.$parent.tempValue + 1 - this.index);
                // console.log(`percent:${percent}`)
                let result = percent > 1 ? 100 : Math.max(0, percent) * 100;
                if (this.allowHalf && !this.allowDecimal) {
                    if (result > 0) {
                        result = result > 50 ? 100 : 50
                    }
                }
                // console.log(`widthPercent:${result}`)
                return result;
            },
            integral() { // 整数的
                return !(this.allowDecimal || this.allowHalf)
            },
            isActive() {
                return this.$parent.tempValue > 0 && (this.index - 1) < this.$parent.tempValue
            }
        },
        mounted() {
            const rect = this.$refs.rateItemContainer.getBoundingClientRect()
            this.left = rect.left
            this.containerWidth = rect.width
            // console.log('this.defaultImage:', this.defaultImage)
        },
        updated() {
            // console.log(`this.$parent.tempValue:${this.$parent.tempValue}`)
        }
    }
</script>

<style scoped>

    .rate-item {
        position: relative;
        width: 32px;
        flex: 0 1 auto;
        margin-right: 6px
    }

    .rate-item::after {
        content: "";
        display: block;
        padding: 50% 0
    }

    .rate-item:last-child {
        margin-right: 0
    }

    .rate-item-def {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url("icon_star_gray.png");
        /*background-color: antiquewhite;*/
    }

    .active-container {
        position: absolute;
        /*width: 0%;*/
        height: 100%;
        overflow: hidden;
        /*background-color: green;*/
    }

    .rate-item-act {
        width: 100%;
        height: 100%;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url("icon_star.png");
    }

    .rate-item-mask {
        width: 100%;
        height: 100%;
        /*-webkit-mask-image: url(icon_star.png);*/
        mask-image: url("icon_star.png");
        mask-size: cover;
        background-color: purple;
    }
</style>
