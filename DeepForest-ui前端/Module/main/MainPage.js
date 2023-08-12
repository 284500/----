import { Header } from "./Header.js";
import { Main } from "./Main.js";



export function MainPage(object){

    /*************父级组件对象***************************/
    let parent_object = object;
    /***************组件dom元素对象**********************/
    let mainPage_dom=[];
    /***************main包含的子组件********************/

    this.initModule=function(){

        mainPage_dom[0]=new Header(this).GetDomObject();
        mainPage_dom[1]=new Main(this).GetDomObject();

    }

    this.GetDomObject=function(){
        return mainPage_dom;
    }


    this.GotoOuter=function(){

        parent_object.GotoOuter();
    }
    this.initModule();
    
}