<?php
include ('./DBTools/DBConnect.php');

//查询全部博客
$admin =$_GET['admin'];
$contact =$_GET['contact'];

$sql="select message_sender,message_content  from personal_message where (message_sender='{$admin}'and message_receiver='{$contact}') or (message_receiver='{$admin}' and message_sender='{$contact}')";


$result=$conn->query($sql);
$rowResult=$result->fetchAll(PDO::FETCH_ASSOC);//PDO处理结果集
$json=json_encode($rowResult,JSON_UNESCAPED_UNICODE);
if($rowResult){
    echo $json;
}else{
    //返回00状态码
    echo '00';
}