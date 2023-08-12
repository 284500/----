<?php
include ('./DBTools/DBConnect.php');

$admin=$_POST['admin'];
$graduate_school=$_POST['graduate_school'];
$position=$_POST['position'];
$degree=$_POST['ethnic'];
$company=$_POST['company'];

$sql="update `admin_infor` set `graduate_school`='{$graduate_school}',`position`='{$position}',`degree`='{$degree}',`company`='{$company}' where `admin`='{$admin}'";

if ($conn->exec($sql)) {
    echo '更新教育/工作信息成功';
}else{
    echo '更新教育/工作信息失败';
}