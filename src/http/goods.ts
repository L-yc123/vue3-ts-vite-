import request from './request'
type PromiseRes<T={}>=Promise<ManageResult<T>>
interface ManageResult<T={}>{
    code:number,
    data:T,
}

interface allgoodsItf{
    current?:number,
    title?:string,
    category_id?:string,
    is_on?:number,
    is_recommend?:number,
    include?:string
}

//获取所有商品优选

export const getGoods =(data:allgoodsItf)=>request.get('/api/admin/goods',{params:data})

//获取商品详情
export const getGoodsDetail =(good:number)=>request.get(`/api/admin/goods/${good}`)