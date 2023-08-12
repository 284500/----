import { Outer } from './login/Outer.js'
import { MainPage } from './main/MainPage.js';

export function App() {

    //顶级元素
    let mainbody = null;
    //数据
    let outerPage_dom = null;
    let mainPage_dom = null;



    this.GotoOuter = function () {

        outerPage_dom=new Outer(this).GetDomObject();
        mainbody.innerHTML = '';
        mainbody.appendChild(outerPage_dom);
        mainPage_dom=null;


    }
    this.GotoMainPage = function () {

        mainPage_dom = new MainPage(this).GetDomObject();
        mainbody.innerHTML = '';
        for(let i=0;i<mainPage_dom.length;i++){
            mainbody.appendChild(mainPage_dom[i]);
        }
        outerPage_dom=null;

    }

    //初始化函数
    this.initApp = function () {


        //初始化顶级dom元素
        mainbody = document.getElementById("mainbody");



        //
        this.GotoOuter();
    
    }
}