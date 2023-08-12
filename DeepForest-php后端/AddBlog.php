<?php
require('DBTools/DBConnect.php');

//获取数据
$admin=$_POST['admin'];
$title=$_POST['title'];
$subtitle=$_POST['subtitle'];
$content=$_POST['content'];
$img=$_POST['img'];
$category=$_POST['category'];



//sql语句
$sql="insert into `blog`(`admin`,`blog_title`,`blog_subtitle`,`blog_content`,`blog_date`,`blog_catagory`) values ('{$admin}','{$title}','{$subtitle}','{$content}',now(),'{$category}')";

if ($conn->exec($sql)) {
    echo '插入数据成功';
}else{
    echo '插入数据失败';
    exit();
}
$indexId=$conn->lastInsertId();

$img = str_replace(' ', '+', $img);
//图片处理
if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $img, $result)){
    //获取文件的后缀
    $type = $result[2];
    //指定文件存放的目录
    $new_file = "./IMG/Blog/";
    //检查是否有该文件夹
    if(!file_exists($new_file)){
        echo '文件夹不存在';
        exit();
    }
    //组合图片地址(图片存放地址+图片名+图片后缀)
    $new_file = $new_file.$indexId.".$type";

    $fileUrl=$indexId.".$type";
    //保存图片
    $img= explode(',', $img); //截取data:image/png;base64, 这个逗号后的字符
    $data= base64_decode($img[1]);
    file_put_contents($new_file, $data); //写入文件并保存

    $sql="update `blog` set `blog_img`='{$fileUrl}' where `blog_id`='{$indexId}'";

    if ($conn->exec($sql)) {
        echo '更新图片成功';
    }else{
        echo '更新图片失败';
        exit();
    }
}else{
    echo '图片处理出错';
    exit();
}

