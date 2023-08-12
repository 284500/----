<?php
include ('./DBTools/DBConnect.php');

//查询全部博客
$admin =$_GET['admin'];

//$sql="select ai.admin,pm.message_sender,ai.headImg,pm.message_content,pm.sending_time from personal_message pm,admin_infor ai where (pm.message_sender='{$admin}'and ai.admin=pm.message_receiver) or (pm.message_receiver='{$admin}' and ai.admin=pm.message_sender)";
$sql="select distinct ai.admin,ai.headImg from personal_message pm,admin_infor ai where (pm.message_sender='{$admin}'and ai.admin=pm.message_receiver) or (pm.message_receiver='{$admin}' and ai.admin=pm.message_sender)";


$result=$conn->query($sql);
$rowResult=$result->fetchAll(PDO::FETCH_ASSOC);//PDO处理结果集
$json=json_encode($rowResult,JSON_UNESCAPED_UNICODE);
if($rowResult){
    echo $json;
}else{
    //返回00状态码
    echo '00';
}