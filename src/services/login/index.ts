// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 发送验证码 POST /code/note */
export async function getFakeCaptcha(options?: { [key: string]: any }) {
  return request('/code/note', {
    method: 'POST',
    data: options,
  });
}

/** 登录 POST /code/note */
export async function accountLogin(options?: { [key: string]: any }) {
  return request('/account/login', {
    method: 'POST',
    data: options,
  });
}
