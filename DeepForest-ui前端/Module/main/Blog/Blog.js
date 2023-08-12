import { BlogCatagoryList } from "./BlogCatagoryList/BlogCatagoryList.js";
import { BlogContent } from "./BlogCatagoryList/BlogContent.js";


export function Blog(object) {


    let self_object=this;
    //父级组件对象
    let parent_object = object;
    //自身dom对象
    let blog_dom = [];
    //子模块


    let blog_header_title = null;
    let blogCatagoryListPage = null;
    let blogContentPage = null;




    let registerEvent = function () {

        blog_header_title.addEventListener('click', function () {
            self_object.GotoCategoryList();
        });

    }

    this.GetDomObject = function () {
        return blog_dom;
    }
    this.initModule = function () {

        /*********************************构建元素**************************************/
        //构建blog页的header元素
        blog_dom[0] = document.createElement("div");
        blog_dom[0].className = 'blog-header';
        blog_header_title = document.createElement("div");
        blog_header_title.className = 'blog-header-title';
        blog_header_title.innerHTML = '我的文章';
        blog_dom[0].appendChild(blog_header_title);
        //构建blog页面的main元素
        blog_dom[1] = document.createElement("div");
        blog_dom[1].className = 'blog-main';
        /**********************************绑定数据***************************************/
        this.GotoCategoryList();
        /**********************************绑定事件***************************************/
        registerEvent();
    }

    this.GotoCategoryList = function () {
        blogCatagoryListPage = new BlogCatagoryList(this);
        blog_dom[1].innerHTML='';
        for (let i = 0; i < blogCatagoryListPage.GetDomObject().length; i++) {
            blog_dom[1].appendChild(blogCatagoryListPage.GetDomObject()[i]);
        }
    }


    this.GotoBlogContent = function (blog_id) {
        //定义URL
        let blog_id_Str = 'blog_id=' + blog_id;
        let url = '/api/GetBlogContent.php' + '?' + blog_id_Str;
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != '00') {
                    blogContentPage = new BlogContent(self_object,JSON.parse(xmlhttp.responseText));
                    blog_dom[1].innerHTML='';
                    blog_dom[1].appendChild(blogContentPage.GetDomObject());
                }
            } else if (xmlhttp.readyState == 404) {
                alert("请求失败");
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send();


    }

    this.initModule();





}