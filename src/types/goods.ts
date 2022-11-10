import { number } from "echarts"

export interface allgoodsItf{
    current?:number,
    title?:string,
    category_id?:string,
    is_on?:number,
    is_recommend?:number,
    include?:string
}

export interface goodsItf{
    id?:number,
    cover_url?:string,
    description?:string,
    title?:string
}
