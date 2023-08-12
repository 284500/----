

export function Header(object) {


    //父级组件对象
    let parent_object=object;

    //组件Dom对象
    let header_dom=null;



    let admin_dom=null
    let img_dom=null;

    this.GetDomObject=function(){
        return header_dom;
    }
    this.registerEvent=function(){


    }

    this.initModule = function () {
        /************************header元素构建**************************************/
        header_dom = document.createElement("div");
        header_dom.classList.add('header');
        header_dom.classList.add('themecolor');
        let header_logo = document.createElement("img");
        header_logo.src = '../../Resource/SVG/MainResource/Logo/Logo.svg';
        header_logo.className = 'header-logo';
        let header_title = document.createElement("div");
        header_title.innerHTML = 'DeepForest';
        header_title.className = 'header-title';


        let header_user=document.createElement("div");
        header_user.className='header-user';
        let header_user_admin=document.createElement("div");
        header_user_admin.className='header-user-admin';
        admin_dom=header_user_admin;
        let header_user_img=document.createElement("img");
        header_user_img.className='header-user-img';
        img_dom=header_user_img;
        header_user.appendChild(header_user_img);

        header_user.appendChild(header_user_admin);





        header_dom.appendChild(header_logo);
        header_dom.appendChild(header_title);
        header_dom.appendChild(header_user);
        this.GetUser();

    }





    this.GetUser=function(){
        //定义URL
        let admin=document.cookie.split(";")[0].split("=")[1];
        let adminStr = 'admin=' + admin;
        let url = '/api/GetUser.php' + '?' + adminStr;
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != '00') {

                    admin_dom.innerHTML=JSON.parse(xmlhttp.responseText).admin;
                    img_dom.src='/api/IMG/HeadIMG/'+JSON.parse(xmlhttp.responseText).headImg;
                    }else {
                        alert("加载失败");
                }
            }else if (xmlhttp.readyState == 404) {
                alert("请求失败");
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send();


    }

    this.initModule();
}