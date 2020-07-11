/**
 * @Author: GJS
 * @Date: 2020/7/5 0005
 * @Last Modified by: GJS
 * @Last Modified time: 2020/7/5 0005
 */

// 参考[超轻量级Vue手势库](https://blog.csdn.net/weixin_34290096/article/details/88020229)

import Vue from 'vue'

const MIN_DISTANCE = 10;

function vueTouch(el, binding, type) {
    var _this = this;
    this.obj = el;
    this.binding = binding;
    this.touchType = type;
    this.vueTouches = {
        x: 0,
        y: 0
    };
    this.moved = false;
    this.ended = false;
    this.longTouch = false;

    this.vueCallBack = typeof(binding.value) === "object" ? binding.value.fn : binding.value;

    this.obj.addEventListener("touchstart", function(e) {
        _this.start(e);
    }, false);

    this.obj.addEventListener("touchmove", function(e) {
        _this.move(e);
    }, false);

    this.obj.addEventListener("touchend", function(e) {
        _this.end(e);
    }, false);
}
vueTouch.prototype = {
    start(e) {
        this.moved = false;
        this.ended = false;
        this.longTouch = false;
        this.vueTouches = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        };
        this.time = setTimeout(function() {
            this.longTouch = (!this.ended) && (!this.moved);
            if(this.longTouch) {
                this.touchType === "longtap" && this.vueCallBack(this.binding.value, e);
            }
        }.bind(this), 1000);
    },
    end(e) {
        var disX = e.changedTouches[0].pageX - this.vueTouches.x;
        var disY = e.changedTouches[0].pageY - this.vueTouches.y;
        clearTimeout(this.time);
        if(Math.abs(disX) > MIN_DISTANCE || Math.abs(disY) > MIN_DISTANCE) {
            this.touchType === "swipe" && this.vueCallBack(this.binding.value, e);
            if(Math.abs(disX) > Math.abs(disY)) {
                if(disX > MIN_DISTANCE) {
                    this.touchType === "swiperight" && this.vueCallBack(this.binding.value, e);
                }
                if(disX < -MIN_DISTANCE) {
                    this.touchType === "swipeleft" && this.vueCallBack(this.binding.value, e);
                }
            } else {
                if(disY > MIN_DISTANCE) {
                    this.touchType === "swipedown" && this.vueCallBack(this.binding.value, e);
                }
                if(disY < -MIN_DISTANCE) {
                    this.touchType === "swipeup" && this.vueCallBack(this.binding.value, e);
                }
            }
        } else {
            if(!this.longTouch && !this.moved) {
                this.touchType === "tap" && this.vueCallBack(this.binding.value, e);
                this.ended = true
            }
        }
    },
    // eslint-disable-next-line no-unused-vars
    move(e) {
        this.moved = true;
        this.touchType === "touchMove" && this.vueCallBack(this.binding.value, e);
    }
};

export default vueTouch;

Vue.directive("touchMove", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "touchMove");
    }
});
Vue.directive("tap", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "tap");
    }
});
Vue.directive("swipe", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "swipe");
    }
});
Vue.directive("swipeleft", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "swipeleft");
    }
});
Vue.directive("swiperight", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "swiperight");
    }
});
Vue.directive("swipedown", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "swipedown");
    }
});
Vue.directive("swipeup", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "swipeup");
    }
});
Vue.directive("longtap", {
    bind: function(el, binding) {
        new vueTouch(el, binding, "longtap");
    }
});