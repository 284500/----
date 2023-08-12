
export function TextListItem(object,data) {

    //定义父级dom对象
    let parent_object = object;
    let textListitem_dom = null;
    let module_data = data;




    let registerEvent=function(){

        textListitem_dom.addEventListener('click', function () {
            parent_object.GotoTextContent(module_data.blog_id);
        });
    }

    this.GetDomObject=function(){
        return textListitem_dom;
    }

    this.initModule = function () {

        textListitem_dom=document.createElement("li");
        textListitem_dom.className='blog';
        
        let img=document.createElement("img");
        img.className='blog-img';
        let content=document.createElement("div");
        content.className='blog-content';
        let content_title=document.createElement("div");
        content_title.className='blog-content-title';
        let content_subtitle=document.createElement("div");
        content_subtitle.className='blog-content-subtitle';






        img.src='/api/IMG/Blog/'+module_data.blog_img;
        content_title.innerHTML=module_data.blog_title;
        content_subtitle.innerHTML=module_data.blog_subtitle;


        content.appendChild(content_title);
        content.appendChild(content_subtitle);
        textListitem_dom.append(img);
        textListitem_dom.append(content);


        registerEvent();
    }
    this.initModule();
}