<?php
include ('./DBTools/DBConnect.php');

//获取博客ID
$blog_id=(int)$_GET['blog_id'];

//查询博客的作者
$sql_1="select `admin` from `blog` where  `blog_id`='$blog_id'";
$result_1=$conn->query($sql_1);
$rowResult_1=$result_1->fetch(PDO::FETCH_ASSOC);//PDO处理结果集

if($rowResult_1){
    //查询博客的作者
    $sql_2="select `admin`,`headImg` from `admin_infor` where  `admin`='{$rowResult_1['admin']}'";
    $result_2=$conn->query($sql_2);
    $rowResult_2=$result_2->fetch(PDO::FETCH_ASSOC);//PDO处理结果集

    $json=json_encode($rowResult_2,JSON_UNESCAPED_UNICODE);

    if($rowResult_2){
        echo $json;
    }else{
        //返回00状态码
        echo '00';
    }
}else{
    echo '00';
}

