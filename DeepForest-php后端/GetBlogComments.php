<?php
include ('./DBTools/DBConnect.php');

//获取博客ID
$blog_id=(int)$_GET['blog_id'];


//查询博客的作者
$sql="select bc.content,bc.comment_admin,a.headImg,bc.sending_time from blog_comments bc,admin_infor a where  bc.blog_id='$blog_id' and bc.comment_admin=a.admin";
$result=$conn->query($sql);
$rowResult=$result->fetchAll(PDO::FETCH_ASSOC);//PDO处理结果集
$json=json_encode($rowResult,JSON_UNESCAPED_UNICODE);

if($rowResult){
    echo $json;
}else{
    //返回00状态码
    echo '00';
}
