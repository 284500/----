import { Request } from "../../DeepForestSDK/Request.js";


export function Login(data,callback){

    let admin='admin='+data.admin;
    let password='password='+data.password;
    let url ='/api/Login.php'+'?'+admin+'&'+password;
    return Request(url,callback);
}

export function Register(data){

    let id='id='+data.id;
    let username='username='+data.username;
    let password='username'+data.password;
    let url ='/api/index.php'+'?'+id+'&'+username+'&'+password;
    return Request(url,data);
}