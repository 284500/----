



export function LoginForm(object) {

    //父组件对象
    let parent_object = object;
    /***************数据*******************/
    let admin = null;
    let password = null;
    /*************组件Dom对象****************/
    let loginForm=null;
    /*************子Dom对象****************/
    let loginButton=null;
    let registerButton=null;
    let adminInput=null;
    let passwordInput=null;




    this.GetDomObject=function(){
        return loginForm;
    }




    //注册事件
    let registerEvents = function () {

        loginButton.addEventListener('click', function () {
            parent_object.Login(adminInput.value,passwordInput.value);
        });

        registerButton.addEventListener('click', function () {

            parent_object.GotoRegisterForm();

        });
    }

    //初始化组件
    this.initModule = function () {


        let Form = document.createElement("div");
        Form.className = 'form-login';

        let Form_title = document.createElement("div");
        Form_title.innerHTML = '登录';


        let Form_adminBox = document.createElement("div");
        let Form_passwordBox = document.createElement("div");
        let Form_btnBox = document.createElement("div");
        Form_title.className = 'form-title';
        Form_adminBox.className = 'form-inputBox';
        Form_passwordBox.className = 'form-inputBox';
        Form_btnBox.className = 'form-buttonBox';



        let Form_adminBox_admin = document.createElement("input");
        Form_adminBox_admin.placeholder = '用户名';
        Form_adminBox_admin.type = 'text';
        Form_adminBox_admin.className = 'input-long';
        Form_adminBox.appendChild(Form_adminBox_admin);

        let Form_passwordBox_pasword = document.createElement("input");
        Form_passwordBox_pasword.placeholder = '密码';
        Form_passwordBox_pasword.type = 'password';
        Form_passwordBox_pasword.className = 'input-long';
        Form_passwordBox.appendChild(Form_passwordBox_pasword);

        let Form_btnBox_login = document.createElement("input");
        Form_btnBox_login.type = 'button';
        Form_btnBox_login.value = '登录';
        Form_btnBox_login.id = 'LoginButton';
        Form_btnBox_login.className = 'button-short-left';
        Form_btnBox.appendChild(Form_btnBox_login);

        let Form_btnBox_register = document.createElement("input");
        Form_btnBox_register.type = 'button';
        Form_btnBox_register.value = '注册用户';
        Form_btnBox_register.id = 'RegisterButton';
        Form_btnBox_register.className = 'button-middle-right';
        Form_btnBox.appendChild(Form_btnBox_register);



        Form.appendChild(Form_title);
        Form.appendChild(Form_adminBox);
        Form.appendChild(Form_passwordBox);
        Form.appendChild(Form_btnBox);


        loginForm=Form;
        adminInput=Form_adminBox_admin;
        passwordInput=Form_passwordBox_pasword;
        loginButton=Form_btnBox_login;
        registerButton=Form_btnBox_register;

        //注册组件事件
        registerEvents();

    }


    this.initModule();

}