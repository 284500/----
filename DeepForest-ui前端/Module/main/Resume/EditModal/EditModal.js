import { EditItem } from "./EditItem.js";

export function EditModal(object,data) {

    //父组件对象
    let parent_object = object;
    /***************数据*******************/
    let module_data=data;


    //自身DOM
    let editModal_dom=null;


    let okButton=null;
    let quitButton=null;


    this.GetDomObject=function(){
        return editModal_dom;
    }




    //注册事件
    let registerEvents = function () {

        okButton.addEventListener('click', function () {
            parent_object.CloseEditModal(editModal_dom);
        });
        quitButton.addEventListener('click', function () {
            parent_object.CloseEditModal(editModal_dom);
        });

    }

    //初始化组件
    this.initModule = function () {


        editModal_dom=document.createElement("div");

        editModal_dom.className='modal-layer';
        let window=document.createElement("div");
        window.className='editModal';



        let title_box=document.createElement("div");
        title_box.className='editModal-title-box';
        let form_box=document.createElement("div");
        form_box.className='editModal-form-box';
        let button_box=document.createElement("div");
        button_box.className='editModal-button-box'

        window.appendChild(title_box);
        window.appendChild(form_box);
        window.appendChild(button_box);
        editModal_dom.appendChild(window);



        let title=document.createElement("div");
        title.className='editModal-title-box-title';
        title.innerHTML='编辑';
        for(let key in module_data){

            let data=[key,module_data[key]];

            form_box.appendChild(new EditItem(this,data).GetDomObject());
        }
        okButton=document.createElement('input');
        okButton.className='editModal-button-box-okButton';
        okButton.type='button'
        okButton.value='确认';
        quitButton=document.createElement('input');
        quitButton.className='editModal-button-box-quitButton';
        quitButton.type='button'
        quitButton.value='取消';
        title_box.appendChild(title);
        button_box.appendChild(okButton);
        button_box.appendChild(quitButton);
        //注册组件事件
        registerEvents();

    }


    this.initModule();

}