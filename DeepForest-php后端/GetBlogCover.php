<?php
include ('./DBTools/DBConnect.php');

//查询全部博客
$category =$_GET['category'];
$target=$_GET['target'];


if($target=='community'){
    if($category=='全部'){
        $sql="select `blog_id`,`blog_title`,`blog_subtitle`,`blog_img` from `blog`";

    }else{
        $sql="select `blog_id`,`blog_title`,`blog_subtitle`,`blog_img` from `blog` where blog_catagory='{$category}'";

    }
}else {
    $sql="select `blog_id`,`blog_title`,`blog_subtitle`,`blog_img` from `blog` where blog_catagory='{$category}' and admin='{$target}'";

}

$result=$conn->query($sql);
$rowResult=$result->fetchAll(PDO::FETCH_ASSOC);//PDO处理结果集
$json=json_encode($rowResult,JSON_UNESCAPED_UNICODE);
if($rowResult){
    echo $json;
}else{
    //返回00状态码
    echo '00';
}