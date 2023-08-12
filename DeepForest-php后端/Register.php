<?php


require('DBTools/DBConnect.php');

//获取数据
$name=$_POST['name'];
$phone=$_POST['phone'];
$ethnic=$_POST['ethnic'];
$origin=$_POST['origin'];

$admin=$_POST['admin'];
$password=$_POST['password'];

//sql语句
$sql="insert into `user_infor`(admin,name,ethnic,origin,admin,password) values ('$admin','$name','$ethnic','$origin','$admin','$password')";


if ($conn->exec($sql)) {
    echo '11';
}else{
    echo '00';
}