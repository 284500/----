<?php
require('DBTools/DBConnect.php');

//接收GET数据
$admin=$_GET['admin'];
$blog_id=(int)$_GET['blog_id'];


//验证用户博客否存在有数据并返回图片路径
$sql_1="select `blog_img` from `blog` where  `admin`='$admin' and `blog_id`='$blog_id'";
$verification=$conn->query($sql_1);
$row=$verification->fetch(PDO::FETCH_ASSOC);

if($row){
    //删除行数据
    $sql_2="delete from `blog` where `blog_id`='{$blog_id}'";
    //删除博客目录下的图片文件
    $blogImgName=$row['blog_img'];
    $blogImgName_path='./IMG/Blog/';
    $deleteImgResult=unlink($blogImgName_path.$blogImgName);
    if ($conn->exec($sql_2)&&$deleteImgResult) {
        echo '删除数据成功';
    }else{
        echo '删除数据失败';
    }
}else{
    echo '查询不到结果集合!';
    exit();
}


