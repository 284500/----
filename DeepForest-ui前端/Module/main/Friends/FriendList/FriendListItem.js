export function FriendListitem(object,data){

    //父级组件对象
    let parent_object = object;
    //组件DOM元素对象
    let friendListitem_dom;
    //子级组件对象
    let module_data=data;





    this.GetModuleData=function(){
        return module_data;
    }


    this.GetDomObject=function(){
        return friendListitem_dom;
    }
    this.initMoudule = function () {

        friendListitem_dom=document.createElement("li");

        //头像区域
        let Box_1=document.createElement('div');
        Box_1.className='friendListitem-head';
        let Box_1_headImg=document.createElement('img');
        Box_1_headImg.src='/api/IMG/HeadIMG/'+module_data.headImg;
        Box_1.appendChild(Box_1_headImg);


        //用户/消息区域
        let Box_2=document.createElement('div');
        Box_2.className='friendListitem-middle';

        let Box_2_admin=document.createElement('div');
        Box_2_admin.innerHTML=module_data.admin;
        Box_2_admin.className='friendListitem-middle-admin';

        // let Box_2_message=document.createElement('div');
        // Box_2_message.innerHTML=module_data.get('message');
        // Box_2_message.className='friendListitem-middle-message';

        Box_2.appendChild(Box_2_admin);
        // Box_2.appendChild(Box_2_message);

        //状态区域
        // let Box_3=document.createElement('div');
        // Box_3.className='friendListitem-tail';
        
        // let Box_3_time=document.createElement('div');
        // Box_3_time.className='friendListitem-tail-time';
        // let Box_3_bubble=document.createElement('div');
        // Box_3_bubble.className='friendListitem-tail-bubble';

        // Box_3_time.innerHTML=module_data.get('time');
        // Box_3_bubble.innerHTML=module_data.get('status');
        // Box_3.appendChild(Box_3_time);
        // Box_3.appendChild(Box_3_bubble);


        friendListitem_dom.appendChild(Box_1);
        friendListitem_dom.appendChild(Box_2);
        // friendListitem_dom.appendChild(Box_3);

    }

    this.initMoudule();
}