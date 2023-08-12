<?php
include ('./DBTools/DBConnect.php');

//查询全部博客
$blog_id =(int)$_GET['blog_id'];



$sql="select `blog_id`,`blog_title`,`blog_subtitle`,`blog_img`,`blog_content`from `blog` where blog_id='{$blog_id}'";

$result=$conn->query($sql);
$rowResult=$result->fetch(PDO::FETCH_ASSOC);//PDO处理结果集
$json=json_encode($rowResult,JSON_UNESCAPED_UNICODE);
if($rowResult){
    echo $json;
}else{
    //返回00状态码
    echo '00';
}