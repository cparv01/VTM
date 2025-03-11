<?php

$host = 'smtp.mailtrap.io';
$port = 2525;

$connection = @fsockopen($host, $port, $errno, $errstr, 10);

if (is_resource($connection)) {
    echo "Connection to $host:$port successful!";
    fclose($connection);
} else {
    echo "Connection to $host:$port failed. Error: $errstr ($errno)";
}

// require 'vendor/autoload.php';

// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// $mail = new PHPMailer(true);

// try {
//     //Server settings
//     $mail->isSMTP();
//     $mail->Host       = 'smtp.mailtrap.io';
//     $mail->SMTPAuth   = true;
//     $mail->Username   = '53db9ff9f2160a'; // Replace with your Mailtrap username
//     $mail->Password   = '451cd119974b2b'; // Replace with your Mailtrap password
//     $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
//     $mail->Port       = 2525;

//     //Recipients
//     $mail->setFrom('hello@example.com', 'Mailer');
//     $mail->addAddress('parvc01@gmail.com', 'Parv');

//     //Content
//     $mail->isHTML(true);
//     $mail->Subject = 'Here is the subject';
//     $mail->Body    = 'This is the HTML message body <b>in bold!</b>';

//     $mail->send();
//     echo 'Message has been sent';
// } catch (Exception $e) {
//     echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
// }
