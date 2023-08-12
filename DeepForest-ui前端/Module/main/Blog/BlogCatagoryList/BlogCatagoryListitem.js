import { BlogBox } from "./BlogBox.js";
import { DeleteModal } from "../Modal/DeleteModal.js";

export function BlogCatagoryListitem(object, title,data) {


    //父级组件对象
    let parent_object = object;
    //自身组件DOM对象
    let blogCatagoryListitem_dom = null;
    //数据
    let module_data = data;

    let list_title=title;

    this.GetDomObject = function () {
        return blogCatagoryListitem_dom;
    }
    this.initModule = function () {


        //构建Catagorylistitem元素
        blogCatagoryListitem_dom = document.createElement("li");
        blogCatagoryListitem_dom.className = 'catagoryListitem';
        //添加类别标题
        let catagoryListitem_title = document.createElement("div");
        catagoryListitem_title.className = 'catagoryListitem-title';
        catagoryListitem_title.innerHTML =list_title;
        //构建Blogbox列表元素
        let blogBoxList = document.createElement("div");
        blogCatagoryListitem_dom.appendChild(catagoryListitem_title);
        blogCatagoryListitem_dom.appendChild(blogBoxList);



        //绑定数据
        for (let i = 0; i < module_data.length; i++) {

            //添加BlogBox
            blogBoxList.appendChild(new BlogBox(this, module_data[i]).GetDomObject());
        }
    }


    //删除操作提示框
    this.OpenDeleteModal = function (message,id) {
        blogCatagoryListitem_dom.appendChild(new DeleteModal(this, message,id).GetDomObject());
    }
    this.CloseDeleteModal = function (dom_obejct) {
        blogCatagoryListitem_dom.removeChild(dom_obejct);
    }


    this.GotoBlogContent=function(blog_id){
        parent_object.GotoBlogContent(blog_id);
    }


    //删除博文
    this.DeleteBlog = function (blog_id) {
        //定义URL
        let blogid_Str = 'blog_id=' + blog_id;
        let url = '/api/DeleteBlog.php' + '?' + blogid_Str;
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != '00') {
                    console.log('删除成功');
                } else {
                    console.log('删除失败');
                    
                }
            } else if (xmlhttp.readyState == 404) {
                alert("请求失败");
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send();

    }

    //组件入口
    this.initModule();
}