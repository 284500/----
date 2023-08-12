
import { EditModal } from "./EditModal/EditModal.js";
import { InforForm } from "./InforForm/InforForm.js";

export function Resume(object){
    //父级组件对象
    let parent_object = object;
    //组件DOM元素对象
    let resume_dom=[];

    let seft_object=this;


    this.GetDomObject=function(){
        return resume_dom;
    }
    this.initModule = function () {

        //构建个人资料页的header元素
        resume_dom[0] = document.createElement("div");
        resume_dom[0].className = 'resume-header';
        let resume_header_title = document.createElement("div");
        resume_header_title.className = 'resume-header-title';
        resume_header_title.innerHTML = '我的信息';
        resume_dom[0].appendChild(resume_header_title);
        //构建blog页面的main元素
        resume_dom[1] = document.createElement("div");
        resume_dom[1].className = 'resume-main';



        /***********绑定数据*************/

        this.GetBasicData(resume_dom[1]);
        this.GetEduData(resume_dom[1]);
                
    }

  

    this.GetBasicData=function(dom_object){
       //定义URL
       let admin = document.cookie.split(";")[0].split("=")[1];
       let adminStr = 'admin=' + admin;
       let url = '/api/GetBasicInfor.php' + '?' + adminStr;
       let xmlhttp = new XMLHttpRequest();

       xmlhttp.onreadystatechange = function () {
           if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
               if (xmlhttp.responseText != '00') {
                   //初始化子模块dom对象
                   dom_object.appendChild(new InforForm(seft_object,JSON.parse(xmlhttp.responseText),'基本信息').GetDomObject());

               } else {
                   alert("加载失败");
               }
           } else if (xmlhttp.readyState == 404) {
               alert("请求失败");
           }
       }
       xmlhttp.open('GET', url, true);
       xmlhttp.send();

    }

    this.GetEduData=function(dom_object){
       //定义URL
       let admin = document.cookie.split(";")[0].split("=")[1];
       let adminStr = 'admin=' + admin;
       let url = '/api/GetEduInfor.php' + '?' + adminStr;
       let xmlhttp = new XMLHttpRequest();

       xmlhttp.onreadystatechange = function () {
           if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
               if (xmlhttp.responseText != '00') {
                   //初始化子模块dom对象
                   dom_object.appendChild(new InforForm(seft_object,JSON.parse(xmlhttp.responseText),'教育/工作信息').GetDomObject());

               } else {
                   alert("加载失败");
               }
           } else if (xmlhttp.readyState == 404) {
               alert("请求失败");
           }
       }
       xmlhttp.open('GET', url, true);
       xmlhttp.send();
    }


    this.GetHobbyData=function(){
        
    }


    this.OpenEditModal=function(message){

        resume_dom[1].appendChild(new EditModal(this,message).GetDomObject());


    }
    this.CloseEditModal=function(dom_object){
        resume_dom[1].removeChild(dom_object);
        
    }


    this.initModule();

}