
import { LoginForm } from "./form/LoginForm.js";
import { RegisterForm } from "./form/RegisterForm.js";
import { InforModal } from "./InforModal/InforModal.js";

export function Outer(object) {


    let self_object = this;
    //父组件对象
    let parent_object = object;

    /*************自身dom对象************ */
    let outer = null;

    /*****************子组件*******************/
    let loginForm = null;
    let registerForm = null;

    /*****************数据*******************/
    let loginForm_dom = null;
    let registerForm_dom = null;




    //构建函数
    this.initModule = function () {
        //初始化自身组件
        outer = document.createElement("div");
        outer.className = 'outer';


        //初始化子组件
        loginForm = new LoginForm(this);
        registerForm = new RegisterForm(this);


        //初始化数据
        loginForm_dom = loginForm.GetDomObject();
        registerForm_dom = registerForm.GetDomObject();



        //初始化界面
        this.GotoLoginForm();


    }


    this.Login = function (admin, password) {

        //定义URL
        let adminStr = 'admin=' + admin;
        let passwordStr = 'password=' + password;
        let url = '/api/Login.php' + '?' + adminStr + '&' + passwordStr;
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                if (xmlhttp.responseText == '11') {
                    //存入cookies当中
                    document.cookie = "admin=" + admin;
                    parent_object.GotoMainPage();



                } else {
                    self_object.OpenModal('账号或密码错误');
                }
            }
            else if (xmlhttp.readyState == 404) {
                self_object.OpenModal('404错误！！！');
            }
        }
        xmlhttp.open('GET', url, true);
        xmlhttp.send();

    }

    this.Register = function () {


    }

    //获取组件dom对象
    this.GetDomObject = function () {
        return outer;
    }

    //转到登录页面
    this.GotoLoginForm = function () {

        outer.innerHTML = '';
        outer.appendChild(loginForm_dom);
    }

    //转到注册页面
    this.GotoRegisterForm = function () {
        outer.innerHTML = '';
        outer.appendChild(registerForm_dom);
    }



    this.OpenModal = function (message) {
        outer.appendChild(new InforModal(this, message).GetDomObject());
    }
    this.CloseModal = function (dom_object) {
        outer.removeChild(dom_object);
    }


    this.initModule();
}