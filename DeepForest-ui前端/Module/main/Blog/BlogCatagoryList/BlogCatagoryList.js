import { AddModal } from "../Modal/AddModal.js";
import { BlogCatagoryListitem } from "./BlogCatagoryListitem.js";



export function BlogCatagoryList(object) {


    let self_object=this;

    //父级组件对象
    let parent_object = object;
    //自身组件对象
    let blogCatagoryList_dom = [];


    let registerEvent = function () {
        blogCatagoryList_dom[0].addEventListener('click', function () {
            self_object.OpenAddModal(this);
        });
    }
    this.GetDomObject = function () {
        return blogCatagoryList_dom;
    }

    this.initModule = function () {


        blogCatagoryList_dom[0] = document.createElement("button");
        blogCatagoryList_dom[0].className = 'blog-main-addBlogButton';
        blogCatagoryList_dom[0].innerHTML = '新建博客';
        blogCatagoryList_dom[1] = document.createElement("ul");

        this.GetUserBlogCover('游戏');
        this.GetUserBlogCover('旅行');
        this.GetUserBlogCover('美食');
        this.GetUserBlogCover('其他');

        registerEvent();
    }



    //测试获取博客列表
    this.GetUserBlogCover = function (category) {

        //定义URL
        let admin = document.cookie.split(";")[0].split("=")[1];
        let targetStr = 'target=' + admin;
        let categoryStr = 'category=' + category;
        let url = '/api/GetBlogCover.php' + '?' + targetStr+'&'+categoryStr;
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != '00') {
                    blogCatagoryList_dom[1].appendChild(new BlogCatagoryListitem(self_object,category,
                         JSON.parse(xmlhttp.responseText)).GetDomObject());
                }
            } else if (xmlhttp.readyState == 404) {
                alert("请求失败");
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send();

    }

    this.GotoBlogContent=function(blog_id){
        parent_object.GotoBlogContent(blog_id);
    }



    this.OpenAddModal=function(){

        blogCatagoryList_dom[1].appendChild(new AddModal(this).GetDomObject());
    }

    this.CloseAddModal=function(dom_obejct){
        blogCatagoryList_dom[1].removeChild(dom_obejct);
    }
    this.initModule();
}