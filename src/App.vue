<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <div>
            <RateStar :value='2'/>
        </div>
        <div>
            <RateStar :value='1' activeColor="palevioletred"/>
        </div>
        <div>
            <RateStar :value='.5' allowHalf/>
        </div>
        <div>
            <RateStar :value='.3' allowDecimal/>
        </div>
        <div>
            <RateStar allowDecimal allowHalf activeColor="cyan"/>
        </div>
        <div>
            <RateStarBar v-model="score" />
        </div>
        <div>
            <RateStarBar :value="3.2" :readOnly="true" />
        </div>
        <div>
            <RateStarBar :value="3.2" :readOnly="false" activeColor="cyan" :defaultImage="require('./assets/heart.svg')" :activeImage="require('./assets/heart2.svg')" :maskImage="require('./assets/heart2.svg')" />
        </div>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import RateStar from './components/RateStar/RateStar.vue'
    import RateStarBar from './components/RateStar/RateStarBar'

    export default {
        name: 'App',
        components: {
            HelloWorld,
            RateStar,
            RateStarBar
        },
        data: function () {
            return {
                score: 2.7
            };
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
