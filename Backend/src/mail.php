<?
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require '../vendor/autoload.php';
  
  function sendMail($email, $url){

    $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
    try {
        //Server settings
        //$mail->SMTPDebug = 2;                                 // Enable verbose debug output
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'rednitkea@gmail.com';                 // SMTP username
        $mail->Password = 'qw12qw12';                           // SMTP password
        $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587;                                    // TCP port to connect to

        //Recipients
        $mail->setFrom('rednit@rednit.com', 'REDNIT');
        $mail->addAddress($email);     // Add a recipient
        $mail->addReplyTo('rednitkea@gmail.com', 'REDNIT');


        //Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'Activate Your account';
        $mail->Body    = "Activate your account by visiting: <a href='$url'>$url</a>";
        $mail->AltBody = "Activate your account by visiting: $url";

        $mail->send();
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }
  }