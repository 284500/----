<?php


require('DBTools/DBConnect.php');

//获取数据
$admin=$_POST['admin'];
$blog_id=$_POST['blog_id'];
$comment=$_POST['comment'];




//sql语句
$sql="insert into `blog_comments`(`blog_id`,`comment_admin`,`content`,`sending_time`) values ('{$blog_id}','{$admin}','{$comment}',now())";

if ($conn->exec($sql)) {
    echo '插入评论成功';
}else{
    echo '插入评论失败';
    exit();
}