// This is just an example,
// so you can safely delete all default props below
export default {
  failed: '操作失败',
  success: '操作成功',
  buttons: {
    send: '发送'
  },
  auth: {
    network_error: '网络错误，请检查您的网络链接。',
    submit: '提交',
    home: '主界面',
    navigation: '浏览',
    my_account: '我的账号',
    administrator: {
      title: '超级管理员'
    },
    superuser: {
      title: '超级用户',
      users: {
        users: '用户'
      }
    },
    labels: {
      email: '邮箱地址',
      name: '姓名',
      password: '密码',
      remember_me: '记住我',
      repeat_password: '重复密码'
    },
    errors: {
      password_length: '密码最少{length}位.',
      password_match: '密码不匹配.',
      email: '需要一个有效的邮件地址'
    },
    login: {
      login: '登录',
      password_forgot: '忘记密码了吗?',
      verification_required: '请先检查你的邮件和账号.',
      invalid_credentials: 'Email address or password is incorrect.',
      email: '@:auth.labels.email',
      password: '@:auth.labels.password',
      remember_me: '@:auth.labels.remember_me'
    },
    register: {
      register: 'Register',
      invalid_data:
        'Server could not process the request. Please correct the sent data.',
      already_registered:
        'Email address is already registered. Please check your email for verification.',
      account_created:
        'Please check your email to verify your registration. This sometimes can take up to 10 minutes. Please check the spam folder if the email has not been received.',
      email: '@:auth.labels.email',
      name: '@:auth.labels.name',
      password: '@:auth.labels.password',
      repeat_password: '@:auth.labels.repeat_password',
      errors: {
        password_length: '@:auth.errors.password_length',
        password_match: '@:auth.errors.password_match',
        email: '@:auth.errors.email'
      },
      check_email:
        'You want to register with the email address {email}, is this correct?'
    },
    verification: {
      verification_success: 'Your e-mail has been verified. You can now login.',
      verification_failed: 'Verification has failed.'
    },
    logout: {
      logout_confirmation: 'Are you sure you want to log out?',
      confirm: 'Confirm',
      logout: 'Logout',
      cancel: 'Cancel'
    },
    password: {
      forgot: {
        header: 'Request a new password',
        check_email: 'Please check your email to reset your password.',
        email: '@:auth.labels.email'
      },
      reset: {
        header: 'Reset your password',
        success:
          'Your password has been reset. You can now login with the new password.'
      },
      errors: {
        password_length: '@:auth.errors.password_length',
        password_match: '@:auth.errors.password_match'
      }
    },
    users: {
      labels: {
        email: 'Email',
        name: 'Name'
      },
      edit_label: 'Edit',
      verify_label: 'Verify',
      verify_message: 'Are you sure you want to verify {user}?'
    }
  }
}
