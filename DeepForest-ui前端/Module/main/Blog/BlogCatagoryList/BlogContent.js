

export function BlogContent(object,data) {



    //父级组件对象
    let parent_object = object;
    //自身组件DOM对象
    let blogContent_dom = null;

    let module_data=data;


    this.GetDomObject = function () {
        return blogContent_dom;
    }
    this.initModule = function () {


        //构建Catagorylistitem元素
        blogContent_dom = document.createElement("div");
        blogContent_dom.className = 'blogContent';
        //添加类别标题


        let blogContent_img = document.createElement("img");
        blogContent_img.className='blogContent-img';
        blogContent_img.src = '/api/IMG/Blog/' + module_data.blog_img;
        let blogContent_title = document.createElement("div");
        blogContent_title.className='blogContent-title';
        blogContent_title.innerHTML = module_data.blog_title;
        let blogContent_content = document.createElement("div");
        blogContent_content.className='blogContent-content';
        blogContent_content.innerHTML = module_data.blog_content;

        blogContent_dom.appendChild(blogContent_img);
        blogContent_dom.appendChild(blogContent_title);
        blogContent_dom.appendChild(blogContent_content);


    }



    
    //组件入口
    this.initModule();
}