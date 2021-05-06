<?php
  $name = $_POST['name'];
  $visitor_email = $_POST['email'];
  $message = $_POST['message'];

  $email_from = 'ucios@o2.pl';
  $email_subject = "New form submision";
  $email_body = "User name:  $name.\n".
                "User email: $visitor_email.\n".
                "User message: $message.\n";

  $to = 'a.leanid@gmail.com';
  $headers = "From $email_from \r\n";
  $headers = "Replay to: $visitor_email \r\n";

  mail($to, $email_subject, $email_body, $headers);
  header("Location: index.html");
?>
