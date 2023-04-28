// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
// 更多信息见文档：https://procomponents.ant.design/components/layout
// export async function getInitialState(): Promise<{ name: string }> {
//   return { name: '1' };
// }
import { getToken } from './utils/token';

import { history } from '@umijs/max';

import { API_VERSION } from '../config/proxy';

export const layout = () => {
  return {
    logo: 'https://upload-1257946076.cos.ap-shanghai.myqcloud.com/favicon.png',
    menu: {
      locale: false,
    },
    siderWidth: 250,
  };
};
export const request = {
  timeout: 1000,
  request: {
    dataField: 'data',
  },
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  // 请求拦截
  requestInterceptors: [
    (url, options) => {
      return {
        url: `${API_VERSION}${url}`,
        options: {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${getToken()}`,
          },
        },
      };
    },
  ],
  // 相应拦截
  responseInterceptors: [
    [
      (response) => {
        const { data: resData = {} as any } = response;
        const { code, data, error } = resData;
        // 服务端捕获 错误信息。   todo  具体实现 可根据接口重写
        if (code !== 0) {
          switch (code) {
            case 1001:
            case 1002:
              history.replace('/login');
              return error;
            case 1003:
              throw new Error('对不起，您没有操作权限');
            default:
              throw new Error(error);
          }
        } else {
          return { ...response, data: response.data.data };
        }
      },
      (error) => {
        return Promise.reject(error);
      },
    ],
  ],
};
