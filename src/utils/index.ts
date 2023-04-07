import cloneDeep from "clone-deep";
import flat from "array.prototype.flat";
import merge from "merge";
import { mergeProps } from "vue";

export function isArray(value: any) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

export function isObject(value: any) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export function isNumber(value: any) {
  return !isNaN(Number(value));
}

export function isFunction(value: any) {
  return typeof value === "function";
}

export function isString(value: any) {
  return typeof value === "string";
}

export function isNull(value: any) {
  return !value && value !== 0;
}

export function isBoolean(value: any) {
  return typeof value === "boolean";
}

export function isEmpty(value: any) {
  if (isArray(value)) {
    return value.length === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return value === "" || value === undefined || value === null;
}

export function clone(obj: any) {
  return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
