
import { FriendList } from "./FriendList/FriendList.js";

export function Friends(object){


    let self_object=this;
    //父级组件对象
    let parent_object = object;
    //组件DOM元素对象
    let friend_dom=[];



    this.GetDomObject=function(){

        return friend_dom;
    }
    this.initMoudule = function () {


        friend_dom=new FriendList(this).GetDomObject();

    }

    this.initMoudule();


}