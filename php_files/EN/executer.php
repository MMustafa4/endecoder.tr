<?php
	if(count($_GET)!=1)
		header("Location: /en");
	else if (!(isset($_GET["op"])))
		header("Location: /en");
		
	switch($_GET["op"]){
		case "enctext":
			include "encrypt_text.php";
			break;
		case "dectext":	
			include "decrypt_text.php";
			break;
		case "sencpht":
			include "secured_encoder_photo.php";
			break;
		case "sdecpht":
			include "secured_decoder_photo.php";
			break;
		case "encpht":
			include "encoder_photo.php";
			break;
		case "decpht":
			include "decoder_photo.php";
			break;
		case "sencauvd":
			include "secured_encoder_audio_video.php";
			break;
		case "sdecauvd":
			include "secured_decoder_audio_video.php";
			break;
		case "encauvd":
			include "encoder_audio_video.php";
			break;
		case "decauvd":
			include "decoder_audio_video.php";
			break;
		default:			
			header("Location: /en?error=nosuchoperation");
	}
?>