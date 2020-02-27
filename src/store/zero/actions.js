/*
export function someAction (context) {
}
*/
// 得到树形结构
export function getZModules({ commit }) {
  return new Promise((resolve, reject) => {
    this.$router.app.$http
      .get('/z_module/getMyMenu')
      .then(res => {
        if (res.data.success) {
          commit('storeZModules', res.data.data)
          resolve(res)
        } else {
          reject(res.data.errors)
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function setZModules({ commit }, payload) {
  commit('storeZModules', payload)
}

// 取得当前用户权限
export function reqThePermission({ commit, state }, payload) {
  let aReqs = []
  if (Array.isArray(payload)) {
    aReqs = payload
  } else {
    aReqs.push(payload)
  }
  const aCfgs = []
  // 判断库里是否有权限
  aReqs.forEach(function(iReq) {
    const perm = state.ZPermissions.perms.filter(function(el) {
      return el.name === iReq.name
    })

    if (perm[0] === undefined) {
      iReq.syscfg = JSON.stringify(iReq.syscfg)
      this.$router.app.$http
        .post('/zero/reqThePermission', iReq)
        .then(res => {
          if (res.data.success) {
            commit('storeZPermissionsPerms', res.data.data)
          } else {
          }
        })
        .catch(e => {})
    }
  }, this)

  aReqs.forEach(function(iReq) {
    const module = state.ZPermissions.modules.filter(function(el) {
      return el.name === iReq.module
    })

    const cfg = state.ZPermissions.data.filter(function(el) {
      return el.name === iReq.name
    })

    if (cfg[0] !== undefined) {
      const tCfg =
        cfg[0].pivot === undefined ? null : JSON.parse(cfg[0].pivot.usrcfg)
      aCfgs[cfg[0].name] = tCfg
    }
    if (module[0].name) {
      aCfgs[module[0].name] = module[0] === undefined ? null : module[0]
    }
  })

  return new Promise((resolve, reject) => {
    resolve(aCfgs)
  })
}

export function getMyPermissions({ commit }, payload) {
  return new Promise((resolve, reject) => {
    this.$router.app.$http
      .post('/zero/getMyPermissions', payload)
      .then(res => {
        if (res.data.success) {
          commit('storeZPermissions', res.data)
          resolve(res.data)
        } else {
          reject(false)
        }
      })
      .catch(e => {
        reject(e)
      })
  })
}

export function setZUIcfg({ commit }, payload) {
  return new Promise((resolve, reject) => {
    commit('storeZUIcfg', payload)
  })
}

export function setZOptHist({ commit }, payload) {
  return new Promise((resolve, reject) => {
    commit('storeZOptHist', payload)
  })
}
