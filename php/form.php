<?php
//数据库
$servername = "localhost";
$username = "root";
$password = "";
$dbname = 'fanyiphone1';
$conn = new mysqli($servername,$username,$password,$dbname);
if($conn->error){
    echo json_encode([
        'code'=>404,
        'msg'=>'数据库连接失败'.$conn->error
    ]);
}
$conn->set_charset("utf8");

$type=$_GET['type'];

switch ($type){
    case 'insert':
        //接收参数
        $name = $_POST['name'];
        $sex = $_POST['sex'];
        $mobile = $_POST['mobile'];
        $wchart = $_POST['wchart'];
        $Admission = $_POST['Admission'];
        $Graduation = $_POST['Graduation'];
        $minzu = $_POST['minzu'];
        $class = $_POST['class'];
        $birthday = $_POST['birthday'];
        $mianmao = $_POST['mianmao'];
        $major=$_POST['major'];
        if (empty($name)||empty($sex)||empty($mobile)||empty($Admission)||empty($Graduation)||empty($class)) {
            echo json_encode([
                'code'=>404,
                "msg"=>'数据未填写完成'
            ]);
            exit();
        }
        if(!empty($mobile)){
            $shuju="SELECT mobile FROM fanyiphone where fanyiphone.mobile = $mobile";
            $num = $conn->query($shuju);
            if($num->num_rows==1){
                echo json_encode([
                    'code'=>404,
                    "msg"=>'手机号重复'
                ]);
                exit();
            }else{
                $query="INSERT INTO fanyiphone(name,sex,mobile,wchart,Admission,Graduation,class,mianmao,birthday,minzu,major) VALUES ('$name','$sex','$mobile','$wchart','$Admission','$Graduation','$class','$mianmao','$birthday','$minzu','$major')";
                $result=$conn->query($query);
                if($result){
                    echo json_encode([
                        'code'=>200,
                        'msg'=>"信息提交成功",
                        'mobile'=>$mobile
                    ]);
                }else{
                    echo json_encode([
                        'code'=>404,
                        'msg'=>"信息提交失败".$conn->error
                    ]);
                };
            }
        }
        break;
    case 'update':
        $mobile=$_GET['mobile'];
        if(empty($mobile)||$mobile===''||$mobile==='undefined'){
            echo json_encode([
                'code'=>404,
                "msg"=>'请先填写上一页信息'
            ]);
            exit();
        }
        $Headmaster = $_POST['Headmaster'];
        $work=$_POST['work'];
        $Native=$_POST['Native'];
        $Provinces=$_POST['Provinces'];
        $duties=$_POST['duties'];
        $telephone=$_POST['telephone'];
        $Monitor=$_POST['Monitor'];
        $email=$_POST['email'];
        $address=$_POST['address'];
        $resume=$_POST['resume'];
        $Speciality=$_POST['Speciality'];
        $degree=$_POST['degree'];
        if(empty($Headmaster)&&empty($work)&&empty($Native)&&empty($Provinces)&&empty($duties)&&empty($telephone)&&empty($Monitor)&&empty($email)&&empty($address)&&empty($resume)&&empty($Speciality)&&empty($degree)){
            echo json_encode([
                'code'=>404,
                'msg'=>'至少填写一项'
            ]);
        }else{
            $update="update fanyiphone set Headmaster='$Headmaster',work='$work',Native='$Native',Provinces='$Provinces',duties='$duties',telephone='$telephone',Monitor='$Monitor',email='$email',address='$address',resume='$resume',Speciality='$Speciality',degree='$degree' where mobile='$mobile'";
            $result=$conn->query($update);
            if($result){
                echo json_encode([
                    'code'=>200,
                    'msg'=>'信息提交成功'
                ]);
            }else{
                echo json_encode([
                    'code'=>404,
                    'msg'=>'信息提交失败'.$conn->error
                ]);
            }
        }
        break;
}




