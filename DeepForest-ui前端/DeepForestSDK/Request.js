
//Ajax请求
export function Request(url){


    let xmlhttp=new XMLHttpRequest();

    xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
            
		}
        else if(xmlhttp.readyState==404)
        {
            return '-11';
        }
	}
    xmlhttp.open('GET',url,true);
    xmlhttp.send();

}