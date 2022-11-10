import service from './request'
import {userData} from '../types/user'

type PromiseRes<T={}>=Promise<ManageResult<T>>
interface ManageResult<T={}>{
    code:number,
    data:T
}
interface searchDataItf{
    current:number,
    nameSearch:string,
    emailSearch:string,
    phoneSearch:string,
}
//获取首页数据
export const getUsersData=(searchData:searchDataItf):PromiseRes=> service.get('/api/admin/users',{params:searchData})

//获取
export const getUserDetail=(id:number):PromiseRes=> service.get(`/api/admin/users/${id}`)

//添加用户
export const addUser=(data:userData):PromiseRes=> service.post('/api/admin/users',data)

//更新用户信息
export const updateUserDetail=(id:number,data:userData):PromiseRes=> service.put(`/api/admin/users/${id}`,data)

//禁用或启用用户
export const lockUser=(id:number):PromiseRes=> service.patch(`/api/admin/users/${id}/lock`)