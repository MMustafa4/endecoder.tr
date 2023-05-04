<?php
if(!isset($_FILES["audio_video"]))
{
	header("Location: /en?error=nofile");
	exit();
}
if(!isset($_FILES["message"]))
{
	header("Location: /en?error=notext");
	exit();
}
	date_default_timezone_set('Europe/Istanbul');
	$uploads_dir = 'uploads';
	$date=date("YmdHis");
	$task="unsecured_encode_audio";
	
	$tmp_name = $_FILES['audio_video']["tmp_name"];
	$name_audio = $_FILES['audio_video']["name"];
	$path_audio= "$uploads_dir/".$date."_".$name_audio;
	move_uploaded_file($tmp_name, "$path_audio");
	
	$tmp_name = $_FILES['message']["tmp_name"];
	$name_msg = $_FILES['message']["name"];
	$path_msg= "$uploads_dir/".$date."_".$name_msg;
	move_uploaded_file($tmp_name, "$path_msg");
	
		if(preg_match('/video\/*/',$_FILES["audio_video"]["type"]))
			$filetype="Video File";
		elseif(preg_match('/audio\/*/',$_FILES["audio_video"]["type"]))
			$filetype="Audio File";
	
	
		$rmd=$name_audio;
	

	
	$command="java -jar java_files/projev3.jar $task en \"$path_audio\" \"$path_msg\"";

	/*
	echo $path_img."<br>";
	echo $width."<br>";;
	echo $height."<br>";;
	echo $path_msg."<br>";;
	echo $upass."<br>";;
	exit();
	*/
	
	//$out=shell_exec("java java/secured_encoder.java $path_img $width $height $path_msg $upass");
	
	
	$out=shell_exec($command);
		
		$myfile = fopen($uploads_dir."\\".$date."_operation-info.txt", "w");
		fwrite($myfile,"=====================================================\n");
		fwrite($myfile,"====================OPERATION INFO===================\n");
		fwrite($myfile,"=====================================================\n\n");
		fwrite($myfile,"Operation Date & Time:\t".date("d/m/Y H:i:s") ."\n");
		fwrite($myfile,"File Type:\t\t$filetype\n");
		fwrite($myfile,"Operation Type:\t\tEncode Operation (Plaintext)\n\n");
		fwrite($myfile,"Encoded $filetype:\t$name_audio\n");
		fwrite($myfile,"Embeded Text:\t\t$name_msg\n\n");

	if(empty($out)&&file_exists($uploads_dir."\\encoded-".$date."_".$rmd ))
	{
		fwrite($myfile,"Operation Status:\tSuccess");
		$zip = new ZipArchive();
		$zipname = "operation_".$date.".zip";
		if ($zip->open($uploads_dir."\\".$zipname, ZipArchive::CREATE)!==TRUE) {
		exit("Couldn't open <$filename> \n");
		}
		@$zip->addFile($uploads_dir."\\".$date."_operation-info.txt","Operation Info.txt");
		@$zip->addFile($uploads_dir."\\encoded-".$date."_".$rmd , "encoded-".$rmd);
		$zip->close();
		fclose($myfile);
		@unlink($uploads_dir."\\".$date."_operation-info.txt");
		@unlink($uploads_dir."\\encrypted-".$date."_".$name_msg);
		@unlink($uploads_dir."\\".$date."_".$name_msg);
		@unlink($path_audio);
		@unlink($path_audio.".txt");		
		@unlink($uploads_dir."\\encoded-".$date."_".$rmd);		
		header("Location:/enop?file=$zipname");
	}
	else
	{
		$out=empty($out)?"Unexpected Error!":$out;
		fwrite($myfile,"Operation Status:\tFail\n\n");
		fwrite($myfile,"Exception Message:\n$out");
		fclose($myfile);
		@unlink($uploads_dir."\\encrypted-".$date."_".$name_msg);
		@unlink($uploads_dir."\\".$date."_".$name_msg);
		@unlink($path_audio);
		@unlink($path_audio.".txt");		
		@unlink($uploads_dir."\\encoded-".$date."_".$rmd);		
		$msgname=$date."_operation-info.txt";
		header("Location:/enop?file=$msgname");
	}
		?>

