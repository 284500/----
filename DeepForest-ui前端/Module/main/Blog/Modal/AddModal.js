
export function AddModal(object) {

    //父组件对象
    let parent_object = object;
    /***************数据*******************/
    let module_data = null;


    //自身DOM
    let addModal_dom = null;

    //子控件dom
    let blogtitle_box_value = null
    let blogsubtitle_box_value = null;
    let blogcontent_box_value = null;
    let blogimg_box_value = null
    let blogcategory_box_value = null;
    let submitButton = null;
    let quitButton = null;
    //图片
    let img_data=null;


    this.GetDomObject = function () {
        return addModal_dom;
    }




    let getData=function(){

        let data=[];

        data[0]= blogtitle_box_value.value;
        data[1]=blogsubtitle_box_value.value;
        data[2]=blogcontent_box_value.value;
        data[3]=img_data;
        data[4]=blogcategory_box_value.options[blogcategory_box_value.selectedIndex].text;

        return data;
    }

    let addBlog = function (title,subtitle,content,img,category) {
        let admin = document.cookie.split(";")[0].split("=")[1];

        let postStr='admin='+admin+'&'+'title='+title+'&'+'subtitle='+subtitle+'&'+'content='+content+'&'+'img='+img+'&'+'category='+category;
        //定义URL
        let url = '/api/AddBlog.php';
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log(xmlhttp.responseText);
            } else if (xmlhttp.readyState == 404) {
                alert("请求失败");
            }
        }
        xmlhttp.open('POST', url, true);
        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xmlhttp.send(postStr);


    }

    //注册事件
    let registerEvents = function () {

        blogimg_box_value.addEventListener("change",function(){
            var reader = new FileReader();
            reader.readAsDataURL(this.files[0]);//发起异步请求
            reader.onload = function(){
              //读取完成后，数据保存在对象的result属性中
              img_data=this.result;
            }
          })
        submitButton.addEventListener('click', function () {
            let data=getData();
            addBlog(data[0],data[1],data[2],data[3],data[4]);
            parent_object.CloseAddModal(addModal_dom);
        });
        quitButton.addEventListener('click', function () {
            parent_object.CloseAddModal(addModal_dom);
        });

    }

    //初始化组件
    this.initModule = function () {


        addModal_dom = document.createElement("div");

        addModal_dom.className = 'modal-layer';
        let window = document.createElement("div");
        window.className = 'addModal';



        let title_box = document.createElement("div");
        title_box.className = 'addModal-title-box';
        let form_box = document.createElement("div");
        form_box.className = 'addModal-form-box';
        let button_box = document.createElement("div");
        button_box.className = 'addModal-button-box'

        window.appendChild(title_box);
        window.appendChild(form_box);
        window.appendChild(button_box);
        addModal_dom.appendChild(window);



        let title = document.createElement("div");
        title.className = 'addModal-title-box-title';
        title.innerHTML = '添加博文';



        let blogtitle_box = document.createElement("div");
        blogtitle_box.className = 'addModal-form-box-listitem';
        let blogtitle_box_key = document.createElement("span");
        blogtitle_box_key.innerHTML = '文章主标题：';
        blogtitle_box_value = document.createElement("input");

        blogtitle_box.appendChild(blogtitle_box_key);
        blogtitle_box.appendChild(blogtitle_box_value);


        let blogsubtitle_box = document.createElement("div");
        blogsubtitle_box.className = 'addModal-form-box-listitem';

        let blogsubtitle_box_key = document.createElement("span");
        blogsubtitle_box_key.innerHTML = '文章副标题：';
        blogsubtitle_box_value = document.createElement("input");

        blogsubtitle_box.appendChild(blogsubtitle_box_key);
        blogsubtitle_box.appendChild(blogsubtitle_box_value);


        let blogcontent_box = document.createElement("div");
        blogcontent_box.className = 'addModal-form-box-listitem';

        let blogcontent_box_key = document.createElement("span");
        blogcontent_box_key.innerHTML = '文章内容：';
        blogcontent_box_value = document.createElement("textarea");

        blogcontent_box.appendChild(blogcontent_box_key);
        blogcontent_box.appendChild(blogcontent_box_value);

        let blogimg_box = document.createElement("div");
        blogimg_box.className = 'addModal-form-box-listitem';

        let blogimg_box_key = document.createElement("span");
        blogimg_box_key.innerHTML = '背景图片：';
        blogimg_box_value = document.createElement("input");
        blogimg_box_value.type = 'file';

        blogimg_box.appendChild(blogimg_box_key);
        blogimg_box.appendChild(blogimg_box_value);

        let blogcategory_box = document.createElement("div");
        blogcategory_box.className = 'addModal-form-box-listitem';

        let blogcategory_box_key = document.createElement("span");
        blogcategory_box_key.innerHTML = '文章分类：';
        blogcategory_box_value = document.createElement("select");

        let option_1 = document.createElement("option");
        let option_2 = document.createElement("option");
        let option_3 = document.createElement("option");
        let option_4 = document.createElement("option");
        option_1.innerHTML = '旅行';
        option_2.innerHTML = '美食';
        option_3.innerHTML = '游戏';
        option_4.innerHTML = '其他';

        blogcategory_box_value.appendChild(option_1);
        blogcategory_box_value.appendChild(option_2);
        blogcategory_box_value.appendChild(option_3);
        blogcategory_box_value.appendChild(option_4);


        blogcategory_box.appendChild(blogcategory_box_key);
        blogcategory_box.appendChild(blogcategory_box_value);


        submitButton = document.createElement('input');
        submitButton.className = 'addModal-button-box-submitButton';
        submitButton.type = 'button'
        submitButton.value = '提交';
        quitButton = document.createElement('input');
        quitButton.className = 'addModal-button-box-quitButton';
        quitButton.type = 'button'
        quitButton.value = '取消';


        title_box.appendChild(title);
        form_box.appendChild(blogtitle_box);
        form_box.appendChild(blogsubtitle_box);
        form_box.appendChild(blogcontent_box);
        form_box.appendChild(blogimg_box);
        form_box.appendChild(blogcategory_box);
        button_box.appendChild(submitButton);
        button_box.appendChild(quitButton);





        //注册组件事件
        registerEvents();

    }


    this.initModule();

}
