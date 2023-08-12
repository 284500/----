

export function EditItem(object, data) {


    //父级组件对象
    let parent_object = object;
    //组件DOM元素对象
    let inforItem_dom = null;

    //数据
    let module_data = data;


    this.GetDomObject = function () {
        return inforItem_dom;
    }

    this.initModule = function () {
        inforItem_dom = document.createElement("div");
        inforItem_dom.className = 'editModal-form-box-listitem';
        let item_key = document.createElement('span');
        let item_value = document.createElement('input');
        item_value.type = 'text';
        inforItem_dom.appendChild(item_key);
        inforItem_dom.appendChild(item_value);

        if (module_data[0] == 'admin') {
            module_data[0] = '账号:';
        } else if (module_data[0] == 'name') {
            module_data[0] = '姓名:';
        } else if (module_data[0] == 'phone') {
            module_data[0] = '电话:';
        } else if (module_data[0] == 'ethnic') {
            module_data[0] = '民族:';
        } else if (module_data[0] == 'orgin') {
            module_data[0] = '籍贯:';
        } else if (module_data[0] == 'graduate_school') {
            module_data[0] = '毕业院校:';
        } else if (module_data[0] == 'company') {
            module_data[0] = '公司:';
        } else if (module_data[0] == 'degree') {
            module_data[0] = '学历:';
        } else if (module_data[0] == 'position') {
            module_data[0] = '职务:';
        }
        item_key.innerHTML = module_data[0];
        item_value.value = module_data[1];

    }

    this.initModule();




}