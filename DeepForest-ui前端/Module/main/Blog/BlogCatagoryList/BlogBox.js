

export function BlogBox(object, data) {




    //父级组件对象
    let parent_object = object;
    //自身组件对象
    let blogBox_dom = null;
    //数据
    let module_data = data;


    let delete_dom = null;


    let registerEvent = function () {

        blogBox_dom.addEventListener('click', function () {
            parent_object.GotoBlogContent(module_data.blog_id);
        });

        delete_dom.addEventListener('click', function (e) {
            parent_object.OpenDeleteModal(module_data.blog_title,module_data.blog_id);
            //阻止事件冒泡
            e.stopPropagation();
        });
    }


    this.GetDomObject = function () {
        return blogBox_dom;
    }

    this.initModule = function () {

        //构建Blogbox元素
        blogBox_dom = document.createElement("div");
        blogBox_dom.className = 'blogBox';
        let blogBox_heading = document.createElement("div");
        blogBox_heading.className = 'blogBox-heading';






        let blogBox_posters = document.createElement("img");
        blogBox_posters.className = 'blogBox-posters';
        let blogBox_subheading = document.createElement("div");
        blogBox_subheading.className = 'blogBox-subheading';
        blogBox_dom.appendChild(blogBox_heading);
        blogBox_dom.appendChild(blogBox_posters);
        blogBox_dom.appendChild(blogBox_subheading);


        //绑定数据
        blogBox_heading.innerHTML = '#'+module_data.blog_title+'#';
        delete_dom = document.createElement("img");
        delete_dom.src = '../../../Resource/SVG/ResumeResource/delete.svg';
        delete_dom.className = 'blogBox-heading-delete';
        blogBox_heading.appendChild(delete_dom);



        blogBox_posters.src = '/api/IMG/Blog/' + module_data.blog_img;
        blogBox_subheading.innerHTML = module_data.blog_subtitle;


        registerEvent();
    }

    this.initModule();
}