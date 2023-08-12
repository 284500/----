import { FriendListitem } from "./FriendListItem.js";


export function FriendList(object) {


    let self_object = this;
    //父级组件对象
    let parent_object = object;
    //组件DOM元素对象
    let friendList_dom = [];
    //子元素

    //消息列表
    let message_list_dom = null;
    //列表被选中元素
    let selectedItem_com = null;
    let selectedItem_contact = null;
    let Items_com = [];


    //聊天框联系人头像
    let chat_contactHeadImg_dom = null;
    //聊天框联系人用户名
    let chat_contactAdmin_dom = null;

    let chat_messageBox_dom = null;



    let message_input_dom = null;
    let message_push_dom = null;






    this.GetDomObject = function () {
        return friendList_dom;
    }
    this.initMoudule = function () {

        //好友列表
        friendList_dom[0] = document.createElement("div");
        friendList_dom[0].className = 'friend-messageList';

        let friend_messageList_title = document.createElement("div");
        friend_messageList_title.className = 'friend-messageList-title';

        let friend_messageList_searchBox = document.createElement("div");
        friend_messageList_searchBox.className = 'friend-messageList-searchBox';

        let friend_messageList_searchBox_input = document.createElement("input");
        friend_messageList_searchBox_input.type = 'text';
        friend_messageList_searchBox.appendChild(friend_messageList_searchBox_input);

        let friend_messageList_friendList = document.createElement("ul");
        friend_messageList_friendList.className = 'friend-messageList-friendList';


        friend_messageList_title.innerHTML = '全部消息';
        friend_messageList_searchBox_input.placeholder = '搜索';



        friendList_dom[0].appendChild(friend_messageList_title);
        friendList_dom[0].appendChild(friend_messageList_searchBox);
        friendList_dom[0].appendChild(friend_messageList_friendList);

        message_list_dom = friend_messageList_friendList;





        /***********************************聊天页面****************************************** */

        friendList_dom[1] = document.createElement("div");
        friendList_dom[1].className = 'friend-chatBox';

        let chatWindows = document.createElement("div");
        chatWindows.className = 'chatWindows';
        let header = document.createElement("div");
        header.className = 'chatWindows-header';
        let main = document.createElement("div");
        main.className = 'chatWindows-main';
        let footer = document.createElement("div");
        footer.className = 'chatWindows-footer';

        //头像区域
        let header_headImg = document.createElement('img');
        header_headImg.className = 'chatWindows-header-headImg';
        //用户名区域
        let header_admin = document.createElement('div');
        header_admin.className = 'chatWindows-header-admin';
        //写入消息区域
        let footer_input = document.createElement('input');
        footer_input.type = 'text';
        footer_input.placeholder = '聊一点什么吧';
        footer_input.className = 'chatWindows-footer-input';
        //发送消息区域
        let footer_push = document.createElement('input');
        footer_push.type = 'button';
        footer_push.value = '发送';
        footer_push.className = 'chatWindows-footer-push';


        header.appendChild(header_headImg);
        header.appendChild(header_admin);
        footer.appendChild(footer_input);
        footer.appendChild(footer_push);

        chatWindows.appendChild(header);
        chatWindows.appendChild(main);
        chatWindows.appendChild(footer);
        friendList_dom[1].appendChild(chatWindows);


        chat_contactHeadImg_dom = header_headImg;
        chat_contactAdmin_dom = header_admin;
        chat_messageBox_dom = main;

        message_input_dom = footer_input;
        message_push_dom = footer_push;

        /***********************************信息页面****************************************** */


        // friendList_dom[2] = document.createElement("div");
        // friendList_dom[2].className = 'friend-introduce';

        // let introduceWindows = document.createElement("div");
        // introduceWindows.className = 'introduceWindows';



        // //头像区域
        // let infor_header_headImg = document.createElement('img');
        // infor_header_headImg.className = 'introduceWindows-headImg';
        // //用户名区域
        // let infor_header_admin = document.createElement('div');
        // infor_header_admin.className = 'introduceWindows-admin';



        // introduceWindows.appendChild(infor_header_headImg);
        // introduceWindows.appendChild(infor_header_admin);
        // friendList_dom[2].appendChild(introduceWindows);
        /***********************************信息页面****************************************** */

        this.GetMessageList();

        registerPushButtonEvent(message_input_dom, message_push_dom);

        PollMessage();

    }


    let PollMessage = function () {


        let time = setInterval(function () {
            if (selectedItem_contact != null) {
                chat_messageBox_dom.innerHTML = '';
                //定义URL
                let admin = document.cookie.split(";")[0].split("=")[1];
                let adminStr = 'admin=' + admin;
                let contactStr = 'contact=' + selectedItem_contact;
                let url = '/api/PollAllMessage.php';

                let postStr= adminStr + '&' + contactStr;
                let xmlhttp = new XMLHttpRequest();

                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        if (xmlhttp.responseText != '00') {
                            //初始化子模块dom对象
                            let data = JSON.parse(xmlhttp.responseText);
                            for (let i = 0; i < data.length; i++) {

                                let ms = document.createElement("div");
                                let ms_text = document.createElement("div");
                                // ms_text.className='chatWindows-main-Bubble';
                                if (data[i].message_sender != admin) {
                                    ms.className = 'chatWindows-main-leftBubbleBox';
                                } else {
                                    ms.className = 'chatWindows-main-rightBubbleBox';

                                }
                                ms_text.innerHTML = data[i].message_content;
                                ms.appendChild(ms_text);
                                let msBox = document.createElement('div');
                                msBox.appendChild(ms);
                                msBox.className = 'chatWindows-main-messageLine';
                                chat_messageBox_dom.appendChild(msBox);

                            }
                        } else {
                            alert("加载失败");
                        }
                    } else if (xmlhttp.readyState == 404) {
                        alert("请求失败");
                    }
                }
                xmlhttp.open('POST', url, true);
                xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xmlhttp.send(postStr);
            }
        }, 3000);

    }

    let PostMessage = function (content) {

        //定义URL
        let admin = document.cookie.split(";")[0].split("=")[1];
        let adminStr = 'admin=' + admin;
        let contactStr = 'contact=' + selectedItem_contact;
        let contentStr = 'content=' + content;
        let url = '/api/PostMessage.php' + '?' + adminStr + '&' + contactStr + '&' + contentStr;
        let xmlhttp = new XMLHttpRequest();



        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != '00') {

                    console.log("发送成功");

                } else {
                    console.log("发送失败");
                }
            } else if (xmlhttp.readyState == 404) {
                alert("请求失败");
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send();

    }

    let registerPushButtonEvent = function (input_dom, push_dom) {
        push_dom.addEventListener('click', function () {
            let content = input_dom.value;
            input_dom.value = '';
            PostMessage(content);

        });

    }

    let registerListitemEvent = function (object_dom, data) {
        object_dom.addEventListener('click', function () {
            if (selectedItem_com != this) {
                selectedItem_com.className = 'friend-messageList-friendList-unselectedListitem';
                this.className = 'friend-messageList-friendList-selectedListitem';
                selectedItem_com = this;
                selectedItem_contact = data.admin;
                self_object.GetAllMessages(data);
            }

        });

    }



    //获取全部消息集
    this.GetMessageList = function () {

        //定义URL
        let admin = document.cookie.split(";")[0].split("=")[1];
        let adminStr = 'admin=' + admin;
        let url = '/api/GetMessageList.php' + '?' + adminStr;
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != '00') {

                    let data = JSON.parse(xmlhttp.responseText);
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        let listItem_dom = new FriendListitem(self_object, data[i]).GetDomObject();
                        listItem_dom.className = 'friend-messageList-friendList-unselectedListitem';
                        message_list_dom.appendChild(listItem_dom);
                        if (i == 0) {
                            listItem_dom.className = 'friend-messageList-friendList-selectedListitem';
                            selectedItem_com = listItem_dom;
                            selectedItem_contact = data[i].admin;
                            self_object.GetAllMessages(data[i]);


                        }
                        Items_com[i] = listItem_dom;

                        registerListitemEvent(listItem_dom, data[i]);
                    }


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
    //获取全部消息集
    this.GetAllMessages = function (data) {


        chat_messageBox_dom.innerHTML = '';
        chat_contactHeadImg_dom.src = '/api/IMG/HeadIMG/' + data.headImg;
        chat_contactAdmin_dom.innerHTML = data.admin;

        //定义URL
        let admin = document.cookie.split(";")[0].split("=")[1];
        let adminStr = 'admin=' + admin;
        let contactStr = 'contact=' + selectedItem_contact;
        let url = '/api/GetAllMessage.php' + '?' + adminStr + '&' + contactStr;
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != '00') {
                    //初始化子模块dom对象
                    let data = JSON.parse(xmlhttp.responseText);
                    for (let i = 0; i < data.length; i++) {

                        let ms = document.createElement("div");
                        let ms_text = document.createElement("div");
                        // ms_text.className='chatWindows-main-Bubble';
                        if (data[i].message_sender != admin) {
                            ms.className = 'chatWindows-main-leftBubbleBox';
                        } else {
                            ms.className = 'chatWindows-main-rightBubbleBox';

                        }
                        ms_text.innerHTML = data[i].message_content;




                        ms.appendChild(ms_text);
                        let msBox = document.createElement('div');
                        msBox.appendChild(ms);
                        msBox.className = 'chatWindows-main-messageLine';
                        chat_messageBox_dom.appendChild(msBox);

                    }
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

    this.initMoudule();

}