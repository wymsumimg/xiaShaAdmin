const actions = {
  setShow({commit},data){
    return new Promise((resolve,reject)=>{
      commit('SET_SHOW', data);
      resolve()
    })
  },
}
export default actions
