/*
export function someMutation (state) {
}
*/
export function storeZModules(state, value) {
  // state.ZModules = value
}
export function storeZPermissions(state, value) {
  // state.ZPermissions = value
}
export function storeZPermissionsPerms(state, value) {
  // state.ZPermissions.perms.push(value)
}

export function storeZUIcfg(state, value) {
  state.ZUIcfg = value
}

export function storeZOptHist(state, value) {
  // if (
  //   !state.ZOptHist.includes(value) &&
  //   value !== 'not-found' &&
  //   value !== 'dashboard'
  // ) {
  //   const index = state.ZOptHist.findIndex(text => text.name === value)
  //   if (index !== -1) {
  //     state.ZOptHist.splice(index, 1)
  //   }
  //   const histmodel = state.ZPermissions.modules.filter(
  //     obj => value === obj.name
  //   )
  //   if (histmodel[0] !== undefined) state.ZOptHist.unshift(histmodel[0])
  // }
}
