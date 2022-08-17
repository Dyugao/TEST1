//持久存储token
export const setToken=(token)=>{
    localStorage.setItem('TOKEN',token)
}

//删除后台的token
export const removeToken=()=>{
    localStorage.removeItem('TOKEN')
}