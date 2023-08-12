
export function InforModal(object,data) {

    //父组件对象
    let parent_object = object;
    /***************数据*******************/
    let module_data=data;


    //自身DOM
    let inforModal_dom=null;


    let okButton=null;


    this.GetDomObject=function(){
        return inforModal_dom;
    }




    //注册事件
    let registerEvents = function () {

        okButton.addEventListener('click', function () {
            parent_object.CloseModal(inforModal_dom);
        });

    }

    //初始化组件
    this.initModule = function () {


        inforModal_dom=document.createElement("div");

        inforModal_dom.className='modal-layer';
        let window=document.createElement("div");
        window.className='inforModal';



        let title_box=document.createElement("div");
        title_box.className='inforModal-title-box';
        let message_box=document.createElement("div");
        message_box.className='inforModal-message-box';
        let button_box=document.createElement("div");
        button_box.className='inforModal-button-box'

        window.appendChild(title_box);
        window.appendChild(message_box);
        window.appendChild(button_box);

        inforModal_dom.appendChild(window);

        let title=document.createElement("div");
        title.className='inforModal-title-box-title';
        title.innerHTML='提示';
        let message=document.createElement("div");
        message.className='inforModal-message-box-message';
        message.innerHTML=module_data;

        okButton=document.createElement('input');
        okButton.className='inforModal-button-box-okButton';
        okButton.type='button'
        okButton.value='确认';
        title_box.appendChild(title);
        message_box.appendChild(message);
        button_box.appendChild(okButton);




        //注册组件事件
        registerEvents();

    }


    this.initModule();

}