export interface categoryItf{
    id?:number,
    name?:string,
    status?:boolean
}

export interface categoryDataItf{
    pid?:number,
    name?:string,
    group?:string,
    level?:number
}

export interface detailItf{
    created_at?:string,
    group?:string,
    id?:number,
    level?:number,
    name?:string,
    seq?:number,
    status?:number,
    updated_at?:string
}