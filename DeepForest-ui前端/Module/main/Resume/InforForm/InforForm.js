import { InforItem } from "./InforItem.js";


export function InforForm(object,data,title){


    //父级组件对象
    let parent_object=object;
    //组件DOM元素对象
    let inforForm_dom=null;

    //数据
    let module_data=data;

    let write_dom=null;

    let data_title=title;

    let registerEvents=function(){

        write_dom.addEventListener('click', function () {

            parent_object.OpenEditModal(data);
        })
    }

    this.GetDomObject=function(){
        return inforForm_dom;
    }



    this.initModule=function(){
        inforForm_dom=document.createElement("div");
        inforForm_dom.className='inforForm';
        let inforForm_title=document.createElement("div");
        inforForm_title.className='inforForm-title';
        inforForm_title.innerHTML=data_title;

        let inforForm_write=document.createElement("img");
        inforForm_write.src='../../../Resource/SVG/BlogResource/BlogBox/write.svg';
        inforForm_write.className='inforForm-write';
        inforForm_title.appendChild(inforForm_write);

        write_dom=inforForm_write;


        let inforForm_list=document.createElement("ul");
        inforForm_list.className='inforForm-list';


        for(let key in module_data){

            let data=[key,module_data[key]];
            let listitem=new InforItem(this,data);
            inforForm_list.appendChild(listitem.GetDomObject());

        }
        inforForm_dom.appendChild(inforForm_title);
        inforForm_dom.appendChild(inforForm_list);
        

        registerEvents();
    }

    this.initModule();
}