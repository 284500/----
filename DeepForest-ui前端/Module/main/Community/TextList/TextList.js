import { TextListItem } from "./TextListitem.js";

export function TextList(object) {


    //自身实例对象dom
    let self_dom = this;
    //定义父级dom对象
    let parent_object = object;
    let textList_dom = [];


    //数据
    let catagory = ['全部', '游戏', '旅行', '美食', '其他'];

    //子dom元素
    let catagoryListitem_dom = [];

    let blogList_dom = null;
    let selectedListitem_dom = null;
    //子集对象


    let img = null;
    let title = null;
    let description = null;



    this.registerEvents = function () {

        for (let i = 0; i < catagoryListitem_dom.length; i++) {
            catagoryListitem_dom[i].addEventListener('click', function () {

                if (selectedListitem_dom !== this) {
                    if (selectedListitem_dom != null) {

                        selectedListitem_dom.className = 'unselected';
                    }
                    this.className = 'selected';
                    selectedListitem_dom = this;
                    self_dom.GetCategoryDescription(catagory[i], img, title, description);

                    blogList_dom.innerHTML = '';
                    self_dom.GetCommunityBlogCover(blogList_dom, catagory[i]);
                }

            })
        }

    }

    this.GetDomObject = function () {
        return textList_dom;
    }
    this.initModule = function () {

        //专栏
        let topBar = document.createElement("div");
        topBar.className = 'topBar';
        let topbar_Img = document.createElement("img");
        topbar_Img.className = 'topBar-img';
        let topbar_content = document.createElement("div");
        topbar_content.className = 'topBar-content';
        let topbar_content_title = document.createElement("div");
        topbar_content_title.className = 'topBar-content-title';
        let topbar_content_description = document.createElement("div");
        topbar_content_description.className = 'topBar-content-description';
        topbar_content.appendChild(topbar_content_title);
        topbar_content.appendChild(topbar_content_description);
        topBar.appendChild(topbar_Img);
        topBar.appendChild(topbar_content);
        img = topbar_Img;
        title = topbar_content_title;
        description = topbar_content_description;


        //文章列表
        let textList = document.createElement("div");
        textList.className = 'textList';
        let catatoryList = document.createElement("ul");
        catatoryList.className = 'textList-catagoryList';
        for (let i = 0; i < catagory.length; i++) {
            let listitem = document.createElement("li");
            let listitem_Box = document.createElement("div");
            listitem_Box.innerHTML = catagory[i];
            listitem.appendChild(listitem_Box);
            catatoryList.appendChild(listitem);
            catagoryListitem_dom[i] = listitem;
            if (i == 0) {
                selectedListitem_dom = listitem
                selectedListitem_dom.className = 'selected';
            }
        }
        let blogList = document.createElement("div");

        blogList_dom = blogList;

        textList.appendChild(catatoryList);
        textList.appendChild(blogList);

        textList_dom[0]=topBar;
        textList_dom[1]=textList;

        this.registerEvents();



        //
        this.GetCategoryDescription(catagory[0], img, title, description);
        this.GetCommunityBlogCover(blogList_dom, catagory[0]);
    }




    //请求博客类型描述
    this.GetCategoryDescription = function (category, img, title, description) {
        if (category == '全部') {
            img.src = '../../../../Resource/DFbackground.png';
            title.innerHTML = '深林社区';
            description.innerHTML = '这是由hamabi创建的，小型网上社区（DeepForest）,社区目前有web端和windows10端，大家随意发文，友好互动';
        } else {
            let categoryStr = 'category=' + category;
            let url = '/api/GetCategoryDescription.php' + '?' + categoryStr;
            let xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    if (xmlhttp.responseText != '00') {
                        let data = JSON.parse(xmlhttp.responseText);

                        img.src = '/api/IMG/Community/' + data.hobby_img;
                        title.innerHTML = data.hobby;
                        description.innerHTML = data.hobby_desp;
                    }else{

                    }
                } else if (xmlhttp.readyState == 404) {
                    alert("请求失败");
                }
            }
            xmlhttp.open('GET', url, true);
            xmlhttp.send();


        }
    }


    //请求博客列表
    this.GetCommunityBlogCover = function (dom_object, category) {

        let targetStr = 'target=' + 'community';
        let categoryStr = 'category=' + category;
        let url = '/api/GetBlogCover.php' + '?' + targetStr + '&' + categoryStr;
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != '00') {

                    let data = JSON.parse(xmlhttp.responseText);
                    for (let i = 0; i < data.length; i++) {
                        dom_object.appendChild(new TextListItem(self_dom, data[i]).GetDomObject());
                    }


                } else {
                    
                }
            } else if (xmlhttp.readyState == 404) {
                alert("请求失败");
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send();


    }



    this.GotoTextContent = function (blog_id) {
        parent_object.GotoTextContent(blog_id);
    }
    this.initModule();




}