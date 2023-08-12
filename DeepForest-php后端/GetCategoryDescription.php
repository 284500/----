<?php

include ('./DBTools/DBConnect.php');

$category=$_GET['category'];


$sql="select * from `hobby` where  `hobby`='$category'";

//
$result=$conn->query($sql);

$rowResult=$result->fetch(PDO::FETCH_ASSOC);//PDO处理结果集


$json=json_encode($rowResult,JSON_UNESCAPED_UNICODE);
if($rowResult){
    echo $json;
}else{
    //返回00状态码
    echo '00';
}

