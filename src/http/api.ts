import service from './request'
interface adminData{
    email:string,
    password:string
}
interface adminList{
    keyword:string,
    pageNum:number,
    pageSize:number
}
type PromiseRes<T={}>=Promise<ManageResult<T>>
interface ManageResult<T={}>{
    code:number,
    data:T
}
//获取首页数据
export const getHomeData=():PromiseRes=> service.get('/api/admin/index')
export function getCategoriesData(name:string,page:number,category_id:number) {
    return service({
      url: `/api/goods?${name}=1&page=${page}&category_id=${category_id}`,
      method: "get"
    });
  }
export const login=(data:adminData)=> service.post('/api/auth/login',data)
//获取菜单列表
export const getData=():PromiseRes=> service.get('/api/admin/menus')
//根据用户名或姓名分页获取用户列表
export const getAdminList=(data:adminList)=>service.get('/admin/list',{params:data})
export const updateAdmin=(id:number,data:adminItf):PromiseRes=>service.post('/admin/update/'+id,data)

//获取所有角色
export const getRoleList=()=>service.get('/role/listAll')

//获取指定用户的角色

export const getAdminRole =(id:number)=>service.get('/admin/role/'+id)
//用户分配角色
export const updateAdminRole =(data:{adminId:number,roleIds:string})=>service.post('/admin/role/update',null,{params:data})

//获取首页数据

export const getAdminStat = ()=>service.get('http://kumanxuan1.f3322.net:8360/admin/stat')