<template>
    <li ref="rateItemContainer" class="rate-item">
        <slot>
            <div class="rate-item-def">
                <div class="rate-item"
                     :class="{ 'rate-item-active': $parent.tempValue > 0 && (index - 1) <= $parent.tempValue }">
<!--                    <div :class="[allowDecimal ? 'active-container' : 'rate-item-def']" v-bind:style="activeStyle">-->
<!--                        <div class="rate-item-act" v-if="allowDecimal" v-bind:style="{width: `${this.widthPercent}%`}" ></div>-->
<!--                    </div>-->
                    <div :class="[allowDecimal ? 'active-container' : 'rate-item-def']" v-bind:style="activeStyle">
                        <div class="rate-item-act" v-if="allowDecimal" v-bind:style="{width: `${this.widthPercent}%`}" ></div>
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
            }
        },
        data: function () {
            return {
                activeStyle: {
                    width: `${this.widthPercent}%`
                }
            };
        },
        computed: {
            widthPercent() {
                let percent = (this.$parent.tempValue + 1 - this.index);
                console.log(`percent:${percent}`)
                let result = percent > 1 ? 100 : Math.max(0, percent) * 100;
                console.log(`widthPercent:${result}`)
                return result;
            },
            widthPercent2() {
                let result = Math.min(100, 100 / this.widthPercent * 100);
                console.log(`widthPercent2:${result}`)
                return result;
            }
        },
        updated() {
            console.log(`this.$parent.tempValue:${this.$parent.tempValue}`)
            const rect = this.$refs.rateItemContainer.getBoundingClientRect()
            this.left = rect.left
            this.containerWidth = rect.width
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
        background-image: url("icon_star_gray.png")
    }

    .rate-item-active .rate-item-def {
        background-image: url("icon_star.png");
    }

    .active-container {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        /*background-color: green;*/
    }

    .rate-item-act {
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url("icon_star.png");
        -webkit-mask-image: url(icon_star.png);
        mask-image: url("icon_star.png");
        mask-size: cover;
        background-color: red;
        overflow: hidden;
    }

    .rate-item-active .active-container .rate-item-act {
        width: 100%;
        height: 100%;
        background-color: purple;
    }
</style>
