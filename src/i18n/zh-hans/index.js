// This is just an example,
// so you can safely delete all default props below
export default {
  failed: '操作失败',
  success: '操作成功',
  operation: {
    addsuccess: '添加成功！',
    addfailed: '添加失败！',
    delsuccess: '删除成功！',
    delfailed: '删除失败！',
    updatesuccess: '更新成功！',
    updatefailed: '更新失败！'
  },
  buttons: {
    home: '主页',
    close: '关闭',
    comfirmtitle: '确认操作',
    comfirmdialog: '<sapn class="text-negative">确认要做当前操作吗？</sapn>',
    send: '发送',
    confirm: '确定',
    cancel: '取消',
    tree: '树形',
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
    types: { A: '系统菜单', B: '个人菜单', C: '功能菜单', D: '扩展菜单' }
  },
  modules: {
    header: '模块管理',
    editmodeltree: '模块树编辑',
    searchall: '全局搜索值'
  },
  users: {
    header: '用户管理',
    adduser: '添加新用户'
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
        header: '修改用户个人信息',
        signpic: '更改用户图片',
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
        department: '部门',
        title: '职称',
        jobs: '岗位',
        remark: '备注',
        success: '用户资料更改成功！'
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
