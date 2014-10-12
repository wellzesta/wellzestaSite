<?php
if(strlen($_POST['email'])) {
$email_me = "john.robinson@wellzesta.com";     
$email_subject = "New Paleo Recipe";

// extract data
$email_name = $_POST['name']; // required
$email_from = $_POST['email']; // required
$json = $_POST['jstr'];
$email_message =  "// ".$email_subject." submitted by ".$email_name." <".$email_from.">\n";
$email_message .= $json."\n";   

$email_to = $email_me.",".$email_from; // CC to sender

// create email headers
$headers = 'From: '.$email_from."\n".
'Reply-To: '.$email_from."\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);
$response = "Email sent to: ".$email_me." and CC to ".$email_name." <".$email_from.">";
echo "$response";
}
else {
echo "Email send failure." ;
}
?>