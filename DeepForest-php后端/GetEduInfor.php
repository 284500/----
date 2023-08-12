<?php
include ('./DBTools/DBConnect.php');


$admin=$_GET['admin'];

$sql="select `graduate_school`,`company`,`degree`,`position` from `admin_infor` where  `admin`='$admin'";
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