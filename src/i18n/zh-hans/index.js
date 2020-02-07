// This is just an example,
// so you can safely delete all default props below
export default {
  failed: '操作失败',
  success: '操作成功',
  buttons: {
    send: '发送',
    confirm: '确定',
    navigation: '浏览',
    search: '搜索',
    back: '返回',
    submit: '提交',
    cancel: '取消'
  },
  menu: {
    menuname: '菜单'
  },
  auth: {
    network_error: '网络错误，请检查您的网络链接。',
    submit: '@:buttons.submit',
    home: '主界面',
    navigation: '@:buttons.navigation',
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
      name: '用户名',
      password: '密码',
      remember_me: '记住我',
      repeat_password: '重复密码'
    },
    errors: {
      password_length: '密码最少8位.',
      password_match: '密码不匹配.',
      password: '需要输入密码',
      email: '需要一个有效的邮件地址'
    },
    login: {
      login: '登录',
      password_forgot: '忘记密码了吗?',
      verification_required: '请先检查您的邮件和账号.',
      invalid_credentials: '用户名或密码不正确.',
      email: '@:auth.labels.email',
      password: '@:auth.labels.password',
      remember_me: '@:auth.labels.remember_me'
    },
    register: {
      register: '注册',
      registernew: '注册新用户',
      invalid_data: '服务器不能处理请求，请检查数据.',
      already_registered: '用户名已存在，请检查用户名.',
      account_created: '账号注册成功！',
      email: '@:auth.labels.email',
      name: '@:auth.labels.name',
      password: '@:auth.labels.password',
      repeat_password: '@:auth.labels.repeat_password',
      cencel: '@:auth.logout.cancel',
      autologin: '注册后登录',
      errors: {
        password_length: '@:auth.errors.password_length',
        password_match: '@:auth.errors.password_match',
        email: '@:auth.errors.email'
      },
      check_email: '您想使用电子邮件地址{email}注册，这是正确的吗？'
    },
    verification: {
      verification_success: '您的电子邮件已通过验证。 您现在可以登录。',
      verification_failed: '验证失败。'
    },
    logout: {
      logout_confirmation: '您确定要注销吗？',
      confirm: '@:buttons.confirm',
      logout: '注销',
      cancel: '@:buttons.cancel'
    },
    password: {
      forgot: {
        header: '申请新密码',
        send: '@:buttons.send',
        back: '@:buttons.back',
        check_email: '请检查您的电子邮件以重置密码。',
        success: '发送成功！请注意查收邮件',
        email: '@:auth.labels.email'
      },
      reset: {
        header: '重置您的密码',
        key: '输入校验码',
        confirm: '重置',
        newpwd: '新密码',
        success: '您的密码已重置。 您现在可以使用新密码登录。',
        keyfail: '您的校验码已过期， 请重新获取。'
      },
      change: {
        header: '修改密码',
        currentpwd: '请输入当前密码',
        showpwd: '显示/隐藏密码',
        newpwd: '请输入新密码'
      },
      errors: {
        password_length: '@:auth.errors.password_length',
        password_match: '@:auth.errors.password_match'
      }
    },
    users: {
      profile: {
        header: '修改用户个人信息',
        nickname: '昵称',
        nicknameerror: '请输入昵称',
        sex: '性别',
        birthday: '出生日期',
        address: '家庭地址',
        phone1: '电话号码',
        phone2: '备用电话号码',
        position: '职务',
        department: '部门',
        title: '职称',
        jobs: '岗位',
        remark: '备注'
      },
      labels: {
        email: '邮箱',
        name: '名称'
      },
      edit_label: '修改',
      verify_label: '验证',
      verify_message: '您确定要验证吗 {user}?'
    }
  },
  help: {
    header: '帮助中心',
    keylabel: '关键字',
    check_keylabel: '请输入关键字！',
    search: '@:buttons.search'
  }
}
