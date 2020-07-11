/**
 * @Author: GJS
 * @Date: 2020/7/6 0006
 * @Last Modified by: GJS
 * @Last Modified time: 2020/7/6 0006
 */

import Vue from 'vue';

export const isServer = Vue.prototype.$isServer;

export function isDef(val) {
    return val !== undefined && val !== null;
}

export function isFunction(val) {
    return typeof val === 'function';
}

export function isObject(val) {
    return val !== null && typeof val === 'object';
}

export function isPromise(val) {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function get(object, path) {
    let result = object;
    if (!isObject(result)) return '';
    if (typeof val !== 'string') return '';

    const keys = path.split('.');

    keys.forEach((key) => {
        result = isDef(result[key]) ? result[key] : '';
    });

    return result;
}