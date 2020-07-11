<!-- author: kstain -->
<!-- date: 2020.7.12 -->
<template>
    <div class="rate-bar">
        <RateStar
                v-model="tempScore"
                :max="max"
                :disabled="readOnly"
                :allowDecimal="decimal"
                :allowHalf="allowHalf"
                :activeColor="activeColor"
                :defaultImage="defaultImage"
                :activeImage="activeImage"
        />
        <div class="rate-score" v-if="showScore" :style="textStyle">{{finalScore}}</div>
    </div>
</template>

<script>
    import RateStar from './RateStar'

    const COMPONENT_NAME = 'ks-rate-bar'
    export default {
        name: COMPONENT_NAME,
        props: {
            value: Number,
            max: {
                type: Number,
                default: 5
            },
            readOnly: {
                type: Boolean,
                default: false
            },
            showScore: {
                type: Boolean,
                default: true
            },
            accuracy: {
                type: Number,
                default: 1
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
            RateStar
        },
        data: function () {
            return {
                textStyle: {
                    color: this.activeColor || 'orange',
                },
                tempScore: this.value
            };
        },
        computed: {
            finalScore() {
                let score = this.decimal ? this.tempScore.toFixed(Math.ceil(this.accuracy)) : this.tempScore
                // console.log('score:', score)
                return score
            },
            decimal() {
                const r = /^[+-]?((0|([1-9]\d*))\.\d+)?$/
                return this.allowDecimal || r.test(this.value)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .rate-bar {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .rate-score {
        display: inline-block;
        text-align: center;
        font-size: 1.2rem;
        padding: 4px 16px 0;
    }
</style>
