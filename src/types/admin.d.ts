interface adminItf{
    id?:number,
    nickName?:string,
    username?:string,
    email?:string,
    password?:string,
    note?:string,
    status?:string,
}

interface roleItem{
    id?:number,
    name:string
}

interface role{
    roleUser:number[] ,
    roleList?:roleItem[],
    id?:number
}