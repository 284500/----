<?php
include ('./DBTools/DBConnect.php');

$admin=$_GET['admin'];
$password=$_GET['password'];

$sql="select * from `admin_infor` where  `admin`='$admin' and `password`='$password'";
//
$result=$conn->query($sql);
$rowResult=$result->fetch(PDO::FETCH_BOTH);//PDO处理结果集

if($rowResult){
    echo '11';
}else{
    echo '00';
}

