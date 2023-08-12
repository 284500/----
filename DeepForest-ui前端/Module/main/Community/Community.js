import { TextContent } from "./TextContent/TextContent.js";
import { TextList } from "./TextList/TextList.js";

export function Community(object) {

    let self_object=this;
    //定义父级dom对象
    let parent_object= object;
    let Community_dom = [];

    //子DOM元素
    let textList_dom=null;
    let textContent_dom=null;

    this.GetDomObject = function () {

        return Community_dom;
    }


    this.initModule = function () {


        //初始化
        Community_dom[0] = document.createElement("div");
        Community_dom[0].className = 'community';


        //初始化列表
        textList_dom=new TextList(this).GetDomObject();


        //转到文章列表
        this.GotoTextList();

        
    }

    this.GotoTextList = function () {
        Community_dom[0].innerHTML='';
        for(let i=0;i<textList_dom.length;i++){
            Community_dom[0].appendChild(textList_dom[i]);
        }
    }

    this.GotoTextContent = function (blog_id) {
        
        //定义URL
        let blog_id_Str = 'blog_id=' + blog_id;
        let url = '/api/GetBlogContent.php' + '?' + blog_id_Str;
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                if (xmlhttp.responseText != '00') {
                    Community_dom[0].innerHTML='';
                    textContent_dom=new TextContent(self_object,JSON.parse(xmlhttp.responseText)).GetDomObject();
                    for(let i=0;i<textContent_dom.length;i++){
                        Community_dom[0].appendChild(textContent_dom[i]);
                    }
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