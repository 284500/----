


export function RegisterForm(object){

    /********父模块对象**********/
    let parent_object = object;

    /***********数据***************/
    let name=null;
    let phone=null;
    let ethnic=null;
    let origin=null;
    let admin=null;
    let password=null;
    let confirmation=null;
    /*************组件dom对象****************/
    let registerForm=null;
    /*************子组件对象*****************/

    let nameInput=null;
    let phoneInput=null;
    let ethnicInput=null;
    let originInput=null;
    let adminInput=null;
    let passwordInput=null;
    let confirmationInput=null;
    let comfirmRegisterButton=null;
    let backToLoginButton=null;



    this.GetDomObject=function(){
        return registerForm;
    }

    let registerEvents = function () {

        comfirmRegisterButton.addEventListener('click', function () {

            if(passwordInput.value!=confirmationInput.value){
                alert("密码与确认密码不匹配！");
            }else{
                parent_object.Register(nameInput.value,phoneInput.value,ethnicInput.value,originInput.value,
                    adminInput.value,passwordInput.value);
            }
        });

        backToLoginButton.addEventListener('click', function () {
            parent_object.GotoLoginForm();

        });
    }

    this.initModule=function(){


        let Form=document.createElement("div");
        Form.className='form-register';

        let Form_title=document.createElement("div");
        Form_title.className='form-title';
        Form_title.innerHTML='注册';
        let Form_inputBox_1=document.createElement("div");
        let Form_inputBox_2=document.createElement("div");
        let Form_inputBox_3=document.createElement("div");
        let Form_inputBox_4=document.createElement("div");
        let Form_inputBox_5=document.createElement("div");
        let Form_btnBox=document.createElement("div");
        Form_title.className='form-title';

        Form_inputBox_1.className='form-inputBox';
        Form_inputBox_2.className='form-inputBox';
        Form_inputBox_3.className='form-inputBox';
        Form_inputBox_4.className='form-inputBox';
        Form_inputBox_5.className='form-inputBox';
        Form_btnBox.className='form-buttonBox';



        let Form_inputBox_1_name=document.createElement("input");
        Form_inputBox_1_name.placeholder='姓名';
        Form_inputBox_1_name.type='text';
        Form_inputBox_1_name.className='input-short-left';
        let Form_inputBox_1_phone=document.createElement("input");
        Form_inputBox_1_phone.placeholder='电话';
        Form_inputBox_1_phone.type='text';
        Form_inputBox_1_phone.className='input-short-right';
        
        Form_inputBox_1.appendChild(Form_inputBox_1_name);
        Form_inputBox_1.appendChild(Form_inputBox_1_phone);

        let Form_inputBox_2_ethnic=document.createElement("input");
        Form_inputBox_2_ethnic.placeholder='民族';
        Form_inputBox_2_ethnic.type='text';
        Form_inputBox_2_ethnic.className='input-short-left';
        let Form_inputBox_2_origin=document.createElement("input");
        Form_inputBox_2_origin.placeholder='籍贯';
        Form_inputBox_2_origin.type='text';
        Form_inputBox_2_origin.className='input-short-right';

        Form_inputBox_2.appendChild(Form_inputBox_2_ethnic);
        Form_inputBox_2.appendChild(Form_inputBox_2_origin);

        let Form_inputBox_3_admin=document.createElement("input");
        Form_inputBox_3_admin.placeholder='用户名';
        Form_inputBox_3_admin.type='text';
        Form_inputBox_3_admin.className='input-long';

        Form_inputBox_3.appendChild(Form_inputBox_3_admin);


        let Form_inputBox_4_password=document.createElement("input");
        Form_inputBox_4_password.placeholder='密码';
        Form_inputBox_4_password.type='password';
        Form_inputBox_4_password.className='input-long';

        Form_inputBox_4.appendChild(Form_inputBox_4_password);


        let Form_inputBox_5_confirmation=document.createElement("input");
        Form_inputBox_5_confirmation.placeholder='确认密码';
        Form_inputBox_5_confirmation.type='password';
        Form_inputBox_5_confirmation.className='input-long';

        Form_inputBox_5.appendChild(Form_inputBox_5_confirmation);


        let Form_btnBox_comfirmRegister=document.createElement("input");
        Form_btnBox_comfirmRegister.type='button';
        Form_btnBox_comfirmRegister.value='已确认信息并注册';
        Form_btnBox_comfirmRegister.id='comfirmRegisterButton';
        Form_btnBox_comfirmRegister.className='button-middle-left';
        Form_btnBox.appendChild(Form_btnBox_comfirmRegister);



        let Form_btnBox_backToLogin=document.createElement("input");
        Form_btnBox_backToLogin.type='button';
        Form_btnBox_backToLogin.value='返回登录页面';
        Form_btnBox_backToLogin.id='backToLoginButton';
        Form_btnBox_backToLogin.className='button-middle-right';
        Form_btnBox.appendChild(Form_btnBox_backToLogin);


        
        Form.appendChild(Form_title);
        Form.appendChild(Form_inputBox_1);
        Form.appendChild(Form_inputBox_2);
        Form.appendChild(Form_inputBox_3);
        Form.appendChild(Form_inputBox_4);
        Form.appendChild(Form_inputBox_5);
        Form.appendChild(Form_btnBox);



        registerForm=Form;
        nameInput=Form_inputBox_1_name;
        phoneInput=Form_inputBox_1_phone
        ethnicInput=Form_inputBox_2_ethnic;
        originInput=Form_inputBox_2_origin
        adminInput=Form_inputBox_3_admin;
        passwordInput=Form_inputBox_4_password
        confirmationInput=Form_inputBox_5_confirmation;
        comfirmRegisterButton=Form_btnBox_comfirmRegister;
        backToLoginButton=Form_btnBox_backToLogin;

        //注册组件按钮事件
        registerEvents();
    }
    this.initModule();


}