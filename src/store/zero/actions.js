/*
export function someAction (context) {
}
*/
// 得到树形结构
export function getZModules({ commit }) {
  return new Promise((resolve, reject) => {
    // console.log('in action:', this.$router.app.$http)
    this.$router.app.$http
      .get('/z_module/getMyMenu')
      .then(res => {
        if (res.data.success) {
          commit('setZModules', res.data.data)
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
  commit('setZModules', payload)
}
// 取得当前用户权限
export function reqThePermission({ commit, state }, payload) {
  const module = state.ZPermissions.modules.filter(function(el) {
    return el.name === payload.module
  })

  if (module[0] !== undefined) {
    const cfg = state.ZPermissions.data.filter(function(el) {
      return el.name === payload.module + '.' + payload.name
    })

    const ret = {
      cfg: cfg[0] === undefined ? null : cfg[0].pivot.usrcfg,
      module: module[0]
    }
    return new Promise((resolve, reject) => {
      resolve(ret)
    })
  } else {
    return new Promise((resolve, reject) => {
      this.$router.app.$http
        .post('/zero/reqThePermission', payload)
        .then(res => {
          if (res.data.success) {
            const ret = {
              cfg:
                res.data.data === null
                  ? null
                  : JSON.parse(res.data.data.pivot.usrcfg),
              module: res.data.module
            }
            resolve(ret)
          } else {
            reject(false)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}

export function getMyPermissions({ commit }, payload) {
  return new Promise((resolve, reject) => {
    this.$router.app.$http
      .post('/zero/getMyPermissions', payload)
      .then(res => {
        if (res.data.success) {
          commit('setZPermissions', res.data)
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
