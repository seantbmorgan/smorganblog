<?php
 header("Access-Control-Allow-Origin: *");

 // Error Checking
if(!isset($_POST['visitorname']) || $_POST['visitorname'] === '' || is_null($_POST['visitorname'])){
	echo json_encode(array("success"=>2), JSON_FORCE_OBJECT);
	exit;
}
if(!isset($_POST['visitoremail']) || $_POST['visitoremail'] === '' || is_null($_POST['visitoremail'])){
	echo json_encode(array("success"=>3), JSON_FORCE_OBJECT);
	exit;
}
if (!filter_var($_POST['visitoremail'], FILTER_VALIDATE_EMAIL)) {
	echo json_encode(array("success"=>3), JSON_FORCE_OBJECT);
	exit;
}
if(!isset($_POST['visitorcomment']) || $_POST['visitorname'] === '' || is_null($_POST['visitorname'])){
	echo json_encode(array("success"=>4), JSON_FORCE_OBJECT);
	exit;
}
if(!isset($_POST['g-recaptcha-response'])){
	echo json_encode(array("success"=>5), JSON_FORCE_OBJECT);;
	exit;
}

 $visitorName;$visitorEmail;$visitorComment;$captcha;
 if(isset($_POST['visitorname'])){
	 $visitorName=$_POST['visitorname'];
 }if(isset($_POST['visitoremail'])){
	 $visitorEmail=$_POST['visitoremail'];
 }if(isset($_POST['visitorcomment'])){
	 $visitorComments=$_POST['visitorcomment'];
 }if(isset($_POST['g-recaptcha-response'])){
	 $captcha=$_POST['g-recaptcha-response'];
 }



$response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6Ld7kV0UAAAAAJRLnSWu9btJ_Z_iBgRhoLCFHuS4&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']);
$googleobj = json_decode($response);

 //$json = json_decode($output);
 //print_r(curl_setopt_array);
	//echo json_encode($googleobj);
	//die();
 //
 $to  = 'seantbmorgan@gmail.com, smorgan@cornerstonediscovery.com';
 $subject = 'Seantbmorgan.com Website Inquiry';

 $customRequest = '
 <i>Message from www.seantbmorgan.com begins:
 <hr/>
 <table>
	 <tbody>
		 <tr>
			 <td>From: </td>
			 <td>'.$visitorName.'</td>
		 </tr>
		 <tr>
			 <td>eMail: </td>
			 <td>'.$visitorEmail.'</td>
		 </tr>
		 <tr>
			 <td>Inquiry: </td>
			 <td>'.$visitorComments.'</td>
		 </tr>
	 </tbody>
 </table>
 ';

 // Always set content-type when sending HTML email
 $headers = "MIME-Version: 1.0" . "\r\n";
 $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

 // More headers
 $headers .= 'From: <noreply@seantbmorgan.com>' . "\r\n";
 //$headers .= 'Bcc: smorgan@cornerstonediscovery.com' . "\r\n";

 $sent = mail($to,$subject,$customRequest,$headers);
 //
 if(!$sent){
	 // Not Sent
	 echo json_encode(array("success"=>6), JSON_FORCE_OBJECT);
 }
 if(!$googleobj->success) {
	 // Google Failure
	 echo json_encode(array("success"=>7), JSON_FORCE_OBJECT);
 } else {
	 // Success
	 echo json_encode(array("success"=>1), JSON_FORCE_OBJECT);
 }


?>
