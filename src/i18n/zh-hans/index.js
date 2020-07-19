// This is just an example,
// so you can safely delete all default props below
export default {
  p1s1techfile: {
    header: '技术文件',
    addfiles: '新增技术文件',
    filename: '文件名称',
    filenamenull: '请输入文件名称',
    fileno: '文件编号',
    filenonull: '请输入文件编号',
    filetype: '文件类型',
    devicename: '设备名称(仅指导书、说明书填写)',
    devicefac: '设备厂家(仅指导书、说明书填写)',
    issue: '发布日期',
    files: '上传附件',
    memooptions: {
      values: ['更新', '作废']
    },
    filetypeoptions: {
      values: [
        '技术规范',
        '规程规范',
        '报告范本',
        '作业指导书',
        '软件说明书',
        '仪器说明书'
      ]
    }
  },
  p1s1bidfile: {
    header: '招投标文件',
    addfiles: '新增招投标文件',
    name: '项目名称',
    namenull: '请输入项目名称',
    bfileno: '招标文件编号',
    filenonull: '请输入招标文件编号',
    bunit: '招标单位',
    bdunit: '中标单位',
    bdprice: '中标价格（万元）',
    ofprice: '我单位报价（万元）',
    ptype: '项目类别',
    biddate: '招投标日期',
    files: '招投标文件',
    ptypeoptions: {
      values: [
        '技术规范',
        '规程规范',
        '报告范本',
        '作业指导书',
        '软件说明书',
        '仪器说明书'
      ]
    }
  },
  p1s1contrm: {
    header: '合同管理',
    addfiles: '新增合同',
    pname: '合同名称',
    cno: '合同编号',
    fno: '财务编号',
    ofunit: '发包单位',
    impunit: '实施部门',
    pown: '项目负责人',
    presp: '项目责任人',
    ptype: '项目类别',
    ctype: '合同类别',
    cbdate: '合同开始日期',
    cedate: '合同结束日期',
    memo: '备注',
    ctypeoptions: {
      values: ['处室自营', '成本划拨', '其他类型']
    },
    ptypeoptions: {
      values: ['水利', '水电', '风电', '市政综合', '其他']
    }
  },
  failed: '操作失败',
  getlocationfailed: '获取定位信息失败',
  success: '操作成功',
  system: {
    name: '交通工程结构和病害智能分析平台'
  },
  operation: {
    addsuccess: '添加成功！',
    addfailed: '添加失败！',
    delsuccess: '删除成功！',
    delfailed: '删除失败！',
    updatesuccess: '更新成功！',
    updatefailed: '更新失败！',
    getdatasuccess: '数据获取成功！',
    rowserror: '数据选择有误！'
  },
  buttons: {
    home: '主页',
    close: '关闭',
    closethiswindow: '关闭此窗口',
    comfirmtitle: '确认操作',
    comfirmdialog:
      '确认要做当前操作吗？（<span class="text-negative">此操作不可逆！</span>）',
    send: '发送',
    confirm: '确定',
    setmodule: '设置模块',
    setrole: '设置角色',
    setuit: '设置单位',
    setpermission: '设置权限',
    cancel: '取消',
    tree: '树形',
    json: 'Json编辑器',
    navigation: '浏览',
    search: '搜索',
    back: '返回',
    submit: '提交',
    add: '添加',
    show: '显示',
    update: '更新',
    delete: '删除',
    save: '保存',
    import: '导入',
    export: '导出'
  },
  menu: {
    menuname: '菜单',
    types: { A: '系统菜单', B: '个人菜单', C: '功能菜单', D: '扩展菜单' },
    themeoptions: [
      {
        label: '蓝色（默认）',
        value: 'blue'
      },
      {
        label: '柔和爽朗',
        value: 'Bright'
      },
      {
        label: '简单洁净',
        value: 'simple'
      },
      {
        label: '粉红空间',
        value: 'fancy'
      }
    ]
  },
  jsoneditor: {
    header: 'JSON编辑器'
  },
  langs: {
    header: '语言',
    title: '支持的语言列表'
  },
  history: {
    title: '历史记录'
  },
  theme: {
    title: '主题颜色列表',
    shieldeye: '护眼模式'
  },
  comapplication: {
    header: '常用应用',
    addmodule: '添加应用',
    addmodulesuccess: '设置常用应用成功！（下次登陆生效）'
  },
  dataAGgrid: {
    created_at: '创建时间',
    updated_at: '更新时间'
  },
  modules: {
    header: '模块管理',
    editmodeltree: '模块树编辑',
    searchall: '全局搜索值',
    name: '模块名',
    title: '模块标题',
    icon: '图标',
    ismenu: '类型',
    url: '路径名',
    memo: '备注',
    badd: '[模块管理]是否有添加功能',
    bDelete: '[模块管理]是否有删除功能',
    bmodify: '[模块管理]是否有修改功能',
    bexport: '[模块管理]是否有导出功能',
    bimport: '[模块管理]是否有导入功能',
    bSetTree: '[模块管理]是否有调整树功能'
  },
  roles: {
    header: '角色管理',
    editroleltree: '角色树编辑',
    getrowssuccess: '角色数据加载成功！',
    rolelist: '角色',
    rolelistheader: '切换角色',
    name: '标识',
    title: '角色名称',
    badd: '[角色管理]是否有添加功能',
    bDelete: '[角色管理]是否有删除功能',
    bmodify: '[角色管理]是否有修改功能',
    bSetTree: '[角色管理]是否有模块设置功能'
  },
  article: {
    header: '文章列表',
    addarticle: '添加文章',
    user: '发布人',
    title: '标题',
    addattachment: '上传文件',
    attachment: '附件(<20M)',
    titlenull: '请输入标题！',
    createddate: '发布日期',
    createddatenull: '请输入发布日期',
    content: '内容',
    badd: '[文章列表]是否有添加功能',
    bDelete: '[文章列表]是否有删除功能',
    bmodify: '[文章列表]是否有修改功能',
    bexport: '[文章列表]是否有导出功能'
  },
  permission: {
    header: '权限管理',
    editpermissionltree: '权限树编辑',
    title: '标题',
    name: '权限名',
    syscfg: '配置',
    badd: '[权限管理]是否有添加功能',
    bDelete: '[权限管理]是否有删除功能',
    bmodify: '[权限管理]是否有修改功能',
    bexport: '[权限管理]是否有导出功能',
    bJsonedit: '[权限管理]是否有设置权限JSON树功能'
  },
  units: {
    header: '单位管理',
    editunittree: '机构树编辑',
    showunittree: '机构树',
    title: '单位名称',
    brief: '单位简介',
    badd: '[单位管理]是否有添加功能',
    bDelete: '[单位管理]是否有删除功能',
    bmodify: '[单位管理]是否有修改功能',
    bexport: '[单位管理]是否有导出功能',
    bSetTree: '[单位管理]是否有调整机构树功能'
  },
  users: {
    header: '用户管理',
    adduser: '添加新用户',
    name: '用户名',
    email: '用户邮箱',
    password: '用户密码',
    usercfg: '用户配置',
    rolelist: '角色列表',
    setpermission: '设置权限',
    badd: '[用户管理]是否有添加功能',
    bDelete: '[用户管理]是否有删除功能',
    bmodify: '[用户管理]是否有修改功能',
    bsetrole: '[用户管理]是否有设置用户角色功能',
    bsetpermission: '[用户管理]是否有设置用户权限功能'
  },
  auth: {
    network_error: '网络错误，请检查您的网络链接。',
    submit: '@:buttons.submit',
    home: '主界面',
    personprfile: '用户中心',
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
      offline_login: '离线登录',
      repeat_password: '重复密码'
    },
    errors: {
      namenull: '请输入用户名.',
      adderror: '增加用户失败（该用户已存在）.',
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
      offline_login: '@:auth.labels.offline_login',
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
      logout_confirmation: '您确定要退出当前账号吗？',
      confirm: '@:buttons.confirm',
      logout: '退出账号',
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
        newpwd: '请输入新密码',
        oldpwderror: '密码更改失败！当前（旧）密码不正确。',
        success: '密码更改成功！再次登陆请使用新密码。'
      },
      errors: {
        password_length: '@:auth.errors.password_length',
        password_match: '@:auth.errors.password_match'
      }
    },
    users: {
      profile: {
        sexoptions: {
          m: '男',
          f: '女'
        },
        pheader: '用户信息管理',
        header: '修改个人信息',
        signpic: '更改用户头像',
        avatar: '用户头像',
        no: '工号',
        nickname: '昵称',
        noerror: '请输入工号',
        sex: '性别',
        male: '男',
        female: '女',
        birthday: '出生日期',
        address: '家庭地址',
        phone1: '主要电话号码',
        phone2: '备用电话号码',
        position: '职务',
        department: '单位',
        title: '职称',
        jobs: '岗位',
        remark: '备注',
        success: '用户资料更改成功！',
        bsetunit: '[用户信息]是否有设置用户单位功能',
        bsetunitroot: '[用户信息]管理单位根节点'
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
  aggrid: {
    date: '选择日期',
    // for filter panel
    page: '页面',
    more: '更多',
    to: '至',
    of: '总计',
    next: '下一页',
    last: '上一页',
    first: '首页',
    previous: '上一页',
    loadingOoo: '加载中......',

    // for set filter
    selectAll: '查询全部',
    searchOoo: '查询...',
    blanks: '空白',

    // for number filter and text filter
    filterOoo: '筛选...',
    applyFilter: '正在筛选...',
    equals: '相等',
    notEqual: '不相等',

    // for number filter
    lessThan: '小于',
    greaterThan: '大于',
    lessThanOrEqual: '小于等于',
    greaterThanOrEqual: '大于等于',
    inRange: '范围',

    // for text filter
    contains: '包含',
    notContains: '不包含',
    startsWith: '开始于',
    endsWith: '结束于',

    // filter conditions
    andCondition: '和',
    orCondition: '或',

    // the header of the default group column
    group: '组',

    // tool panel
    columns: '列',
    filters: '筛选',
    rowGroupColumns: 'laPivot Cols',
    rowGroupColumnsEmptyMessage: 'la drag cols to group',
    valueColumns: 'laValue Cols',
    pivotMode: 'laPivot-Mode',
    groups: '组',
    values: '值',
    pivots: 'laPivots',
    valueColumnsEmptyMessage: 'la drag cols to aggregate',
    pivotColumnsEmptyMessage: 'la drag here to pivot',
    toolPanelButton: 'la tool panel',

    // other
    noRowsToShow: '数据为空',
    enabled: '启用',

    // enterprise menu
    pinColumn: 'laPin Column',
    valueAggregation: 'laValue Agg',
    autosizeThiscolumn: 'laAutosize Diz',
    autosizeAllColumns: 'laAutsoie em All',
    groupBy: '排序',
    ungroupBy: '不排序',
    resetColumns: '重置列',
    expandAll: '展开全部',
    collapseAll: '关闭',
    toolPanel: '工具面板',
    export: '导出',
    csvExport: '导出为CSV格式文件',
    excelExport: '导出为EXECL格式文件 (.xlsx)',
    excelXmlExport: '导出为XML格式文件 (.xml)',

    // enterprise menu (charts)
    pivotChartAndPivotMode: 'laPivot Chart & Pivot Mode',
    pivotChart: 'laPivot Chart',
    chartRange: 'laChart Range',

    columnChart: 'laColumn',
    groupedColumn: 'laGrouped',
    stackedColumn: 'laStacked',
    normalizedColumn: 'la100% Stacked',

    barChart: 'laBar',
    groupedBar: 'laGrouped',
    stackedBar: 'laStacked',
    normalizedBar: 'la100% Stacked',

    pieChart: 'laPie',
    pie: 'laPie',
    doughnut: 'laDoughnut',

    line: 'laLine',

    xyChart: 'laX Y (Scatter)',
    scatter: 'laScatter',
    bubble: 'laBubble',

    areaChart: 'laArea',
    area: 'laArea',
    stackedArea: 'laStacked',
    normalizedArea: 'la100% Stacked',

    // enterprise menu pinning
    pinLeft: '固定在左侧 <<',
    pinRight: '固定在右侧 >>',
    noPin: '不固定 <>',

    // enterprise menu aggregation and status bar
    sum: '总数',
    min: '最小值',
    max: '最大值',
    none: '无',
    count: '合计',
    average: '平均值',
    filteredRows: 'laFiltered',
    selectedRows: 'laSelected',
    totalRows: 'laTotal Rows',
    totalAndFilteredRows: 'laRows',

    // standard menu
    copy: '复制',
    copyWithHeaders: '携带表头复制',
    ctrlC: 'ctrl + C',
    paste: '粘贴',
    ctrlV: 'ctrl + V',

    // charts
    pivotChartTitle: 'laPivot Chart',
    rangeChartTitle: 'laRange Chart',
    settings: 'laSettings',
    data: 'laData',
    format: 'laFormat',
    categories: 'laCategories',
    series: 'laSeries',
    xyValues: 'laX Y Values',
    paired: 'laPaired Mode',
    axis: 'laAxis',
    color: 'laColor',
    thickness: 'laThickness',
    xRotation: 'laX Rotation',
    yRotation: 'laY Rotation',
    ticks: 'laTicks',
    width: '宽',
    length: '长',
    padding: '边距',
    chart: '图表',
    title: '标题',
    background: '背景',
    font: '字体',
    top: 'laTop',
    right: '右',
    bottom: '底',
    left: '左',
    labels: '标签',
    size: '大小',
    minSize: '最小尺寸',
    maxSize: '最大尺寸',
    legend: 'laLegend',
    position: '位置',
    markerSize: 'laMarker Size',
    markerStroke: 'laMarker Stroke',
    markerPadding: 'laMarker Padding',
    itemPaddingX: 'laItem Padding X',
    itemPaddingY: 'laItem Padding Y',
    strokeWidth: 'laStroke Width',
    offset: 'laOffset',
    offsets: 'laOffsets',
    tooltips: 'laTooltips',
    callout: 'laCallout',
    markers: 'laMarkers',
    shadow: '阴影',
    blur: 'laBlur',
    xOffset: 'laX Offset',
    yOffset: 'laY Offset',
    lineWidth: 'laLine Width',
    normal: 'laNormal',
    bold: '加粗',
    italic: 'laItalic',
    boldItalic: 'laBold Italic',
    predefined: 'laPredefined',
    fillOpacity: 'laFill Opacity',
    strokeOpacity: 'laLine Opacity',
    columnGroup: 'laColumn',
    barGroup: 'laBar',
    pieGroup: 'laPie',
    lineGroup: 'laLine',
    scatterGroup: 'laScatter',
    areaGroup: 'laArea',
    groupedColumnTooltip: 'laGrouped',
    stackedColumnTooltip: 'laStacked',
    normalizedColumnTooltip: 'la100% Stacked',
    groupedBarTooltip: 'laGrouped',
    stackedBarTooltip: 'laStacked',
    normalizedBarTooltip: 'la100% Stacked',
    pieTooltip: 'laPie',
    doughnutTooltip: 'laDoughnut',
    lineTooltip: 'laLine',
    groupedAreaTooltip: 'laGrouped',
    stackedAreaTooltip: 'laStacked',
    normalizedAreaTooltip: 'la100% Stacked',
    scatterTooltip: 'laScatter',
    bubbleTooltip: 'laBubble',
    noDataToChart: 'laNo data available to be charted.',
    pivotChartRequiresPivotMode: 'laPivot Chart requires Pivot Mode enabled.'
  },
  help: {
    header: '帮助中心',
    keylabel: '关键字',
    check_keylabel: '请输入关键字！',
    search: '@:buttons.search'
  }
}
