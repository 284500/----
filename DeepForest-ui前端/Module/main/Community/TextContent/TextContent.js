
export function TextContent(object, data) {



    //父级组件对象
    let parent_object = object;
    //自身组件DOM对象
    let textContent_dom = [];

    let module_data = data;

    let header_title_dom = null;

    //作者栏DOM原素
    let blogger_img_dom = null;
    let blogger_admin_dom = null;
    let blogger_pmBtn_dom = null;

    //评论DOM元素

    let comments_input_dom=null;
    let comments_push_dom=null;
    let comments_list_dom=null;
    let comments_reflesh_dom=null;




    let registerEvent = function () {
        header_title_dom.addEventListener('click', function () {

            parent_object.GotoTextList();
        })
        comments_push_dom.addEventListener('click', function () {

            PostComment(module_data.blog_id,comments_input_dom.value);
            comments_input_dom.value='';
        })
        comments_reflesh_dom.addEventListener('click', function () {
            comments_list_dom.innerHTML='';
            GetBlogCommments(module_data.blog_id);
        })
    }

    this.GetDomObject = function () {
        return textContent_dom;
    }
    this.initModule = function () {



        let header = document.createElement("div");
        header.className = 'blog-header';
        let header_title = document.createElement("div");
        header_title.className = 'blog-header-title';
        header_title.innerHTML = '返回社区';
        header.appendChild(header_title);

        header_title_dom = header_title;
        //构建Catagorylistitem元素
        let textContent = document.createElement("div");
        textContent.className = 'textContent';
        //添加类别标题


        let TextContent_img = document.createElement("img");
        TextContent_img.className = 'textContent-img';
        TextContent_img.src = '/api/IMG/Blog/' + module_data.blog_img;
        let TextContent_title = document.createElement("div");
        TextContent_title.className = 'textContent-title';
        TextContent_title.innerHTML = module_data.blog_title;
        let TextContent_content = document.createElement("div");
        TextContent_content.className = 'textContent-content';
        TextContent_content.innerHTML = module_data.blog_content;

        textContent.appendChild(TextContent_img);
        textContent.appendChild(TextContent_title);
        textContent.appendChild(TextContent_content);


        let bloggerInfor = document.createElement("div");
        bloggerInfor.className = 'bloggerInfor';

        blogger_img_dom = document.createElement("img");
        blogger_admin_dom = document.createElement("div");
        blogger_admin_dom.className = 'bloggerInfor-name';
        blogger_pmBtn_dom = document.createElement("input");
        blogger_pmBtn_dom.type = 'button';
        blogger_pmBtn_dom.className = 'bloggerInfor-pmBtn';
        blogger_pmBtn_dom.value = '发消息';


        bloggerInfor.appendChild(blogger_img_dom);
        bloggerInfor.appendChild(blogger_admin_dom);
        bloggerInfor.appendChild(blogger_pmBtn_dom);


        let comments = document.createElement("div");
        comments.className = 'comments';

        let comments_commentBox = document.createElement("div");
        comments_commentBox.className = 'comments-commentBox'
        let comments_commentBox_input = document.createElement('input');
        comments_commentBox_input.placeholder = '快来输入你的评论吧';
        comments_commentBox_input.type = 'text';
        comments_commentBox_input.className = 'comments-commentBox-input';
        let comments_commentBox_push = document.createElement('input');
        comments_commentBox_push.type = 'button';
        comments_commentBox_push.value = '发布评论';
        comments_commentBox_push.className = 'comments-commentBox-push';
        comments_commentBox.appendChild(comments_commentBox_input);
        comments_commentBox.appendChild(comments_commentBox_push);


        let comments_commentList = document.createElement("ul");
        comments_commentList.className = 'comments-commentList';
        let comments_reflesh = document.createElement("div");
        comments_reflesh.className = 'comments-reflesh';
        let comments_reflesh_text=document.createElement("div");
        comments_reflesh_text.innerHTML='刷新评论';
        comments_reflesh.appendChild(comments_reflesh_text);
        
        comments.appendChild(comments_commentBox);
        comments.appendChild(comments_commentList);
        comments.appendChild(comments_reflesh);

        textContent_dom[0] = header;
        textContent_dom[1] = textContent;
        textContent_dom[2] = bloggerInfor;
        textContent_dom[3] = comments;


        comments_input_dom=comments_commentBox_input;
        comments_push_dom=comments_commentBox_push;
        comments_list_dom=comments_commentList;
        comments_reflesh_dom=comments_reflesh;

        registerEvent();
        GetBloggerInfor(module_data.blog_id);
        GetBlogCommments(module_data.blog_id);
    }





    let GetBlogCommments = function (blog_id) {
        //定义URL
        let blog_id_Str = 'blog_id=' + blog_id;
        let url = '/api/GetBlogComments.php' + '?' + blog_id_Str;
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != '00') {

                    let data = JSON.parse(xmlhttp.responseText);
                    console.log(data);
                    for(let i=0;i<data.length;i++){

                        let img='/api/IMG/HeadIMG/'+data[i].headImg;
                        let admin=data[i].comment_admin;
                        let content=data[i].content;
                        let time=data[i].sending_time;

                        let listitem=document.createElement("li");
                        let listitem_img=document.createElement("img");
                        let listitem_admin=document.createElement("div");
                        listitem_admin.className='comments-commentList-commentListitem-admin';
                        let listitem_comment=document.createElement("div");
                        listitem_comment.className='comments-commentList-commentListitem-comment';
                        let listitem_time=document.createElement("div");
                        listitem_time.className='comments-commentList-commentListitem-time';

                        listitem_img.src=img;
                        listitem_admin.innerHTML=admin+':';
                        listitem_comment.innerHTML=content;
                        listitem_time.innerHTML=time;

                        listitem.appendChild(listitem_img);
                        listitem.appendChild(listitem_admin);
                        listitem.appendChild(listitem_comment);
                        listitem.appendChild(listitem_time);


                        comments_list_dom.appendChild(listitem);
                    }

                } else {
                    console.log("获取评论失败")
                }
            } else if (xmlhttp.readyState == 404) {
                alert("请求失败");
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
    }




    let PostComment=function(blog_id,comment){
        let admin = document.cookie.split(";")[0].split("=")[1];

        let postStr='admin='+admin+'&'+'blog_id='+blog_id+'&'+'comment='+comment;
        //定义URL
        let url = '/api/PostComment.php';
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

    let GetBloggerInfor = function (blog_id) {

        //定义URL
        let blog_id_Str = 'blog_id=' + blog_id;
        let url = '/api/GetBloggerInfor.php' + '?' + blog_id_Str;
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != '00') {

                    let data = JSON.parse(xmlhttp.responseText);
                    blogger_img_dom.src = '/api/IMG/HeadIMG/' + data.headImg;
                    blogger_admin_dom.innerHTML = data.admin;

                } else {
                    console.log("获取作者信息失败")
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