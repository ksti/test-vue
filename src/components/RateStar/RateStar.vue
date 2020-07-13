<!-- author: kstain -->
<!-- date: 2020.7.12 -->
<template>
    <!-- the preventDefault of touchmove is to prevent any default action caused by any touchmove event associated with the same active touch point, such as scrolling. -->
    <ul ref="rateContainer"
        class="rate-container"
        :class="rateClass"
        @touchstart.stop.prevent="handleStart"
        @touchmove.stop.prevent="handleMove"
        @touchend.stop="handleEnd"
        @mousedown.stop="handleStart"
        @mousemove.stop="handleMove"
        @mouseup.stop="handleEnd">
        <slot>
            <ks-rate-item
                    v-for="n in max"
                    :key="n" :index="n"
                    :allow-decimal="allowDecimal"
                    :allow-half="allowHalf"
                    :active-color="activeColor"
                    :default-image="defaultImage"
                    :active-image="activeImage"
            />
        </slot>
    </ul>
</template>

<script type="text/ecmascript-6">
    import KsRateItem from './RateStarItem'
    const COMPONENT_NAME = 'ks-rate'
    const EVENT_INPUT = 'input'
    const EVENT_TYPE_MOUSE = 'mouse'
    export default {
        name: COMPONENT_NAME,
        props: {
            value: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 5
            },
            disabled: {
                type: Boolean,
                default: false
            },
            justify: {
                type: Boolean,
                default: false
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
        components: {
            KsRateItem
        },
        data() {
            return {
                tempValue: this.value
            }
        },
        created() {
            this.mousePressed = false
        },
        computed: {
            rateClass() {
                return this.justify && 'rate-justify'
            }
        },
        watch: {
            value(val) {
                if (val !== this.tempValue) {
                    this.tempValue = val
                }
            }
        },
        methods: {
            handleStart(e) {
                e.preventDefault()
                if (!this.disabled) {
                    if (e.type.indexOf(EVENT_TYPE_MOUSE) > -1) {
                        this.mousePressed = true
                        document.addEventListener('mouseup', this.handleEnd)
                        document.addEventListener('mousemove', this.handleMove)
                    }
                    const rect = this.$refs.rateContainer.getBoundingClientRect()
                    this.left = rect.left
                    this.containerWidth = rect.width
                }
            },
            handleMove(e) {
                if (!this.disabled && (e.type.indexOf(EVENT_TYPE_MOUSE) === -1 || this.mousePressed)) {
                    this.computeTempValue(e.type.indexOf(EVENT_TYPE_MOUSE) === -1 ? e.touches[0] : e)
                }
            },
            handleEnd(e) {
                if (!this.disabled && (e.type.indexOf(EVENT_TYPE_MOUSE) === -1 || this.mousePressed)) {
                    if (e.type.indexOf(EVENT_TYPE_MOUSE) > -1) {
                        this.mousePressed = false
                        document.removeEventListener('mouseup', this.handleEnd)
                        document.removeEventListener('mousemove', this.handleMove)
                    }
                    this.computeTempValue(e.type.indexOf(EVENT_TYPE_MOUSE) > -1 ? e : e.changedTouches[0])
                    this.$emit(EVENT_INPUT, this.tempValue)
                }
            },
            computeTempValue(touch) {
                // let leftAmount = Math.ceil((touch.clientX - this.left) / this.containerWidth * this.max)
                let leftAmount = (touch.clientX - this.left) / this.containerWidth * this.max
                if (leftAmount > 0 && leftAmount <= this.max) {
                    this.tempValue = leftAmount
                } else if (leftAmount <= 0) {
                    this.tempValue = 0
                } else {
                    this.tempValue = this.max
                }
                // 自定义触发事件, 更好的支持 v-model
                this.$emit('input', this.tempValue)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .rate-container {
        list-style: none;
        display: inline-flex;
        vertical-align: top;
        flex-wrap: nowrap;
        padding-left: 0%;
        max-width: 100%;
    }
    .rate-justify {
        width: 100%;
        justify-content: space-between;
    }
</style>