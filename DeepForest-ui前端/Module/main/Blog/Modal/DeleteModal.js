export function DeleteModal(object, data, id) {

    //父组件对象
    let parent_object = object;
    /***************数据*******************/
    let module_data = data;

    let deleteblog_id = id;

    //自身DOM
    let deleteModal_dom = null;


    let okButton = null;
    let quitButton = null;


    this.GetDomObject = function () {
        return deleteModal_dom;
    }




    //删除博文
    let DeleteBlog = function (blog_id) {
        //定义URL
        //定义URL
        let admin = document.cookie.split(";")[0].split("=")[1];
        let adminStr = 'admin=' + admin;
        let blogid_Str = 'blog_id=' + blog_id;
        let url = '/api/DeleteBlog.php' + '?' +adminStr+'&'+ blogid_Str;
        let xmlhttp = new XMLHttpRequest();
        console.log(blog_id);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log(xmlhttp.responseText);
            } else if (xmlhttp.readyState == 404) {
                alert("请求失败");
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send();

    }
    //注册事件
    let registerEvents = function () {

        okButton.addEventListener('click', function () {
            DeleteBlog(deleteblog_id);
            parent_object.CloseDeleteModal(deleteModal_dom);
        });
        quitButton.addEventListener('click', function () {
            parent_object.CloseDeleteModal(deleteModal_dom);
        });

    }

    //初始化组件
    this.initModule = function () {


        deleteModal_dom = document.createElement("div");

        deleteModal_dom.className = 'modal-layer';
        let window = document.createElement("div");
        window.className = 'inforModal';



        let title_box = document.createElement("div");
        title_box.className = 'inforModal-title-box';
        let message_box = document.createElement("div");
        message_box.className = 'inforModal-message-box';
        let button_box = document.createElement("div");
        button_box.className = 'inforModal-button-box'

        window.appendChild(title_box);
        window.appendChild(message_box);
        window.appendChild(button_box);

        deleteModal_dom.appendChild(window);

        let title = document.createElement("div");
        title.className = 'inforModal-title-box-title';
        title.innerHTML = '删除';
        let message = document.createElement("div");
        message.className = 'inforModal-message-box-message';
        message.innerHTML = '确定要删除<b>#' + module_data + '#</b>吗？';

        okButton = document.createElement('input');
        okButton.className = 'inforModal-button-box-okButton';
        okButton.type = 'button'
        okButton.value = '确认';

        quitButton = document.createElement('input');
        quitButton.className = 'inforModal-button-box-quitButton';
        quitButton.type = 'button'
        quitButton.value = '取消';
        title_box.appendChild(title);
        message_box.appendChild(message);
        button_box.appendChild(okButton);
        button_box.appendChild(quitButton);







        //注册组件事件
        registerEvents();

    }


    this.initModule();

}