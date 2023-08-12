
//导入需要的模块
import { Blog } from './Blog/Blog.js';
import { Resume } from './Resume/Resume.js';
import { Friends } from './Friends/Friend.js';
import { Community } from './Community/Community.js';


export function Main(object) {
    /*************父级组件对象***************************/
    let parent_object = object;
    /***************组件dom元素对象**********************/
    let main_dom = null;
    /***************main包含的子组件********************/
    let featurePages = [];
    /******************数据******************************/
    let featurePage_dom = null;
    let listitems_dom = [];
    let selectedlistitem_dom = null;
    let selectedlistitemIndex = -1;


    /*******************前端资源*******************************/
    let main_siderbar_list_title_src = '../../Resource/SVG/MainResource/Featurelist/func.svg';
    let main_siderbar_list_listitems_title = ['我的文章', '我的信息', '我的好友', '深林社区'];
    //unselectedlistitemd1logo的路径
    let main_siderbar_list_unselectedlistitems_logo_src = [
        '../../Resource/SVG/MainResource/Featurelist/Unselected/1.svg',
        '../../Resource/SVG/MainResource/Featurelist/Unselected/2.svg',
        '../../Resource/SVG/MainResource/Featurelist/Unselected/3.svg',
        '../../Resource/SVG/MainResource/Featurelist/Unselected/4.svg',
        
    ];
    //unselectedlistitemd1logo的路径
    let main_siderbar_list_selectedlistitems_logo_src = [
        '../../Resource/SVG/MainResource/Featurelist/Selected/1.svg',
        '../../Resource/SVG/MainResource/Featurelist/Selected/2.svg',
        '../../Resource/SVG/MainResource/Featurelist/Selected/3.svg',
        '../../Resource/SVG/MainResource/Featurelist/Selected/4.svg',
        
    ];
    //获取DOM元素
    this.GetDomObject = function () {
        return main_dom;
    }

    //组件构建
    this.initModule = function () {

        /**************************main元素构建************************************/
        //创建main元素
        main_dom = document.createElement("div");
        main_dom.classList.add('main');
        //创建main元素的子元素siderbar
        let main_siderbar = document.createElement("div");
        main_siderbar.classList.add('main-siderbar');
        //构建siderbar的子元素title
        let main_siderbar_title = document.createElement("div");
        main_siderbar_title.classList.add('main-siderbar-title');
        let main_siderbar_title_logo = document.createElement("img");
        main_siderbar_title_logo.src = main_siderbar_list_title_src;
        main_siderbar_title_logo.classList.add('main-siderbar-title-logo');
        main_siderbar_title.appendChild(main_siderbar_title_logo);
        main_siderbar_title.innerHTML += '我的功能';
        //构建siderbar的子元素list
        let main_siderbar_list = document.createElement("ul");
        main_siderbar_list.classList.add('main-siderbar-list');
        //listitem标题
        for (let i = 0; i < 4; i++) {
            let listitem = document.createElement("li");
            listitem.classList.add('main-siderbar-list-unselectedlistitem');
            let listitem_logo = document.createElement('img');
            listitem_logo.classList.add('main-siderbar-list-listitem-logo');
            listitem_logo.src = main_siderbar_list_unselectedlistitems_logo_src[i];
            listitem.appendChild(listitem_logo);
            listitem.innerHTML += main_siderbar_list_listitems_title[i];
            main_siderbar_list.appendChild(listitem);
            //添加listitem
            listitems_dom[i] = listitem;
        }
        //向siderbar元素添加title元素和list元素
        main_siderbar.appendChild(main_siderbar_title);
        main_siderbar.appendChild(main_siderbar_list);
        //构造main的子元素featurePage元素
        featurePage_dom = document.createElement("div");
        featurePage_dom.className = 'main-featurePage';
        //向main添加siderbar和feature元素
        main_dom.appendChild(main_siderbar);
        main_dom.appendChild(featurePage_dom);




        /******************初始化子组件*********************************/
        featurePages[0] = new Blog(featurePage_dom);
        featurePages[1] = new Resume(featurePage_dom);
        featurePages[2] = new Friends(featurePage_dom);
        featurePages[3] = new Community(featurePage_dom);
        /******************初始化页面数据*******************************/
        listitems_dom[0].className = 'main-siderbar-list-selectedlistitem';
        listitems_dom[0].firstChild.src = main_siderbar_list_selectedlistitems_logo_src[0];
        selectedlistitem_dom = listitems_dom[0];
        selectedlistitemIndex = 0;


        //加载子页面
        featurePage_dom.innerHTML = '';
        for (let i = 0; i < featurePages[0].GetDomObject().length; i++) {
            featurePage_dom.appendChild(featurePages[0].GetDomObject()[i]);

        }
        /**************************************************************/


        registerEvent();
    };

    //注册事件
    let registerEvent = function () {
        //必须使用let限定作用域
        for (let i = 0; i < 4; i++) {

            listitems_dom[i].addEventListener('click', function () {

                //切换之前被选中的样式
                selectedlistitem_dom.firstChild.src = main_siderbar_list_unselectedlistitems_logo_src[selectedlistitemIndex];
                selectedlistitem_dom.className = 'main-siderbar-list-unselectedlistitem';
                //切换当前选中的样式
                this.className = 'main-siderbar-list-selectedlistitem';
                this.firstChild.src = main_siderbar_list_selectedlistitems_logo_src[i];
                //替换为当前元素为选中的样式
                selectedlistitem_dom = this;
                selectedlistitemIndex = i;

                //加载子页面
                featurePage_dom.innerHTML = '';
                for (let j = 0; j < featurePages[i].GetDomObject().length; j++) {
                    featurePage_dom.appendChild(featurePages[i].GetDomObject()[j]);

                }

            });

        }
    }
    this.initModule();



}