/*
export function someAction (context) {
}
*/
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
