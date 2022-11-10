import service from "./request";

type PromiseRes<T={}>=Promise<ManageResult<T>>
interface ManageResult<T={}>{
    code:number,
    data:T
}
interface categoryDataItf{
    pid?:number,
    name?:string,
    group?:string,
    level?:number
}
//获取分类列表

export const getList=():PromiseRes=>service.get('/api/admin/category')

//禁用或启用
export const updateCategoryStatus=(id:number):PromiseRes=>service.patch(`/api/admin/category/${id}/status`)

//详情获取
export const getDetail=(id:number):PromiseRes=>service.get(`/api/admin/category/${id}`)
//增加分类
export const addCategory=(data:categoryDataItf):PromiseRes=>service.post('/api/admin/category',data)