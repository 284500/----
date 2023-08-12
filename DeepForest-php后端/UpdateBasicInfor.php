<?php

include ('./DBTools/DBConnect.php');

$admin=$_POST['admin'];
$name=$_POST['name'];
$phone=$_POST['phone'];
$ethnic=$_POST['ethnic'];
$origin=$_POST['origin'];


$sql="update `admin_infor` set `name`='{$name}',`phone`='{$phone}',`othnic`='{$othnic}',`origin`='{$origin}' where `admin`='{$admin}'";


if ($conn->exec($sql)) {
    echo '更新基础信息成功';
}else{
    echo '更新基础信息失败';
}