/*
export function someMutation (state) {
}
*/
export function storeZModules(state, value) {
  state.ZModules = value
}
export function storeZPermissions(state, value) {
  state.ZPermissions = value
}

export function storeZUIcfg(state, value) {
  state.ZUIcfg = value
}

export function storeZOptHist(state, value) {
  if (
    !state.ZOptHist.includes(value) &&
    value !== 'not-found' &&
    value !== 'dashboard'
  ) {
    state.ZOptHist.push(value)
  }
}
