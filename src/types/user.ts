export interface userData{
    id?:number,
    name?:string,
    email?:string,
    updated_at?:string,
    is_locked?:boolean,
    avatar_url?:string,
    created_at?:string,
    password?:string
}
export interface searchDataItf{
    current:number,
    nameSearch:string,
    emailSearch:string,
    phoneSearch:string,
}