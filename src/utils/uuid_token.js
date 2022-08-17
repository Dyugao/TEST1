import { v4 as uuidv4 } from 'uuid';

export const getUUID=()=>{
    //看本地有没有游客id
   let uuid_token=localStorage.getItem('UUIDTOKEN')
   if(!uuid_token){
    //没有就创建一个
    uuid_token=uuidv4()
    //并且保存在本地存储里面
    localStorage.setItem('UUIDTOKEN',uuid_token)
   }

   //必须返回值
   return uuid_token
}