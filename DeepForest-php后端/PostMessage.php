<?php

require('DBTools/DBConnect.php');

//获取数据
$admin=$_GET['admin'];
$contact=$_GET['contact'];
$content=$_GET['content'];



//sql语句
$sql="insert into `personal_message`(`message_sender`,`message_receiver`,`message_content`,`sending_time`) values ('{$admin}','{$contact}','{$content}',now())";

if ($conn->exec($sql)) {
    echo '发送消息成功';
}else{
    echo '00';
    exit();
}