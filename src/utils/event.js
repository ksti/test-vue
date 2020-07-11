/**
 * @Author: GJS
 * @Date: 2020/7/6 0006
 * @Last Modified by: GJS
 * @Last Modified time: 2020/7/6 0006
 */

// 参考 [Vant](https://github.com/youzan/vant/blob/dev/src/utils/dom/event.ts)

import { isServer } from './';

export let supportsPassive = false;

if (!isServer) {
    try {
        const opts = {};
        Object.defineProperty(opts, 'passive', {
            // eslint-disable-next-line getter-return
            get() {
                /* istanbul ignore next */
                supportsPassive = true;
            },
        });
        window.addEventListener('test-passive', null, opts);
        // eslint-disable-next-line no-empty
    } catch (e) {}
}

export function on(
    target: EventTarget,
    event: string,
    handler: function,
    passive = false
) {
    if (!isServer) {
        target.addEventListener(
            event,
            handler,
            supportsPassive ? { capture: false, passive } : false
        );
    }
}

export function off(target: EventTarget, event: string, handler: function) {
    if (!isServer) {
        target.removeEventListener(event, handler);
    }
}

export function stopPropagation(event: Event) {
    event.stopPropagation();
}

export function preventDefault(event: Event, isStopPropagation?: boolean) {
    /* istanbul ignore else */
    if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault();
    }

    if (isStopPropagation) {
        stopPropagation(event);
    }
}