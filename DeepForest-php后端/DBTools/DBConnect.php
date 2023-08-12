<?php

header('Content-type:text/html; charset=utf-8');

$dbms='mysql';//数据库类型
$host='10.0.12.5';//主机地址
$username = 'root';//账号
$password = 'lcj123456?';//密码
$dbName='deepforest';//要连接的数据库名称
$dsn="$dbms:host=$host;dbname=$dbName";
try {
    $conn = new PDO($dsn, $username, $password);
    $conn->exec('SET NAMES utf8');
}
catch(PDOException $e)
{
    echo $e->getMessage();
}



