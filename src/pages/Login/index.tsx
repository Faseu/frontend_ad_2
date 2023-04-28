import { accountLogin, getFakeCaptcha } from '@/services/login';
import { setToken } from '@/utils/token';
import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, Helmet, history } from '@umijs/max';
import { Tabs, message } from 'antd';
import { useState } from 'react';
import styles from './index.less';

const LoginPage: React.FC = () => {
  const [type, setType] = useState<string>('mobile');

  const handleSubmit = async (value) => {
    let data = await accountLogin(value);
    setToken(data.token);
    history.replace('/');
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>登录页</title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" color="#ff8029" />}
          title="刘小白广告系统"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={handleSubmit}
        >
          <Tabs
            style={{
              marginTop: '30px',
            }}
            activeKey={type}
            onChange={setType}
            centered
            items={[
              // {
              //   key: 'account',
              //   label: '账户密码登录',
              // },
              {
                key: 'mobile',
                label: '手机号登录',
              },
            ]}
          />
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined />,
                }}
                name="phone"
                placeholder="手机号"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="phone"
                        defaultMessage="请输入手机号！"
                      />
                    ),
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: (
                      <FormattedMessage
                        id="phoneError"
                        defaultMessage="手机号格式错误！"
                      />
                    ),
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                phoneName="phone"
                captchaProps={{
                  size: 'large',
                }}
                placeholder="请输入验证码"
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} 获取验证码`;
                  }
                  return '获取验证码';
                }}
                name="code"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="captcha"
                        defaultMessage="请输入验证码！"
                      />
                    ),
                  },
                ]}
                onGetCaptcha={async (phone) => {
                  await getFakeCaptcha({
                    phone,
                  });
                  message.success('获取验证码成功！');
                }}
              />
            </>
          )}
        </LoginForm>
      </div>
    </div>
  );
};

export default LoginPage;
