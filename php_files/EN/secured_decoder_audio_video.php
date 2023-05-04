<?php
if(!isset($_FILES["audio_video"]))
{
	header("Location: /en?error=nofile");
	exit();
}

if(!isset($_POST["baseKey"]))
{
	header("Location: /en?error=nobasekey");
	exit();
}

	date_default_timezone_set('Europe/Istanbul');
	$uploads_dir = 'uploads';
	$date=date("YmdHis");
	$task="secured_decode_audio";
	
	$tmp_name = $_FILES['audio_video']["tmp_name"];
	$name_audio = $_FILES['audio_video']["name"];
	$path_audio= "$uploads_dir/".$date."_".$name_audio;
	move_uploaded_file($tmp_name, "$path_audio");
	
		if(preg_match('/video\/*/',$_FILES["audio_video"]["type"]))
			$filetype="Video File";
		elseif(preg_match('/audio\/*/',$_FILES["audio_video"]["type"]))
			$filetype="Audio File";
		
	
	
	if ($_POST["user_pass"]==null)
		$upass="-NULL-";
	else
		$upass=$_POST["user_pass"];
	
	$base_key=$_POST["baseKey"];
	
	$command="java -jar java_files/projev3.jar $task en \"$path_audio\" $upass $base_key";

	$out=shell_exec($command);
	
	$base_key=str_replace("key","Base Key ",$base_key);
	
		$myfile = fopen($uploads_dir."\\".$date."_operation-info.txt", "w");
		fwrite($myfile,"=====================================================\n");
		fwrite($myfile,"====================OPERATION INFO===================\n");
		fwrite($myfile,"=====================================================\n\n");
		fwrite($myfile,"Operation Date & Time:\t".date("d/m/Y H:i:s") ."\n");
		fwrite($myfile,"File Type:\t\t$filetype\n");
		fwrite($myfile,"Operation Type:\t\tDecode Operation With DES Encryption\n\n");
		fwrite($myfile,"Base Key:\t\t$base_key\n");		
		fwrite($myfile,"User Password:\t\t$upass\n\n");
		fwrite($myfile,"Decoded $filetype:\t$name_audio\n\n");
		
	if(empty($out)&&file_exists($uploads_dir."\\secret_message_from_".$date."_".$name_audio.".txt"))
	{
		fwrite($myfile,"Operation Status:\tSuccess");
		$zip = new ZipArchive();
		$zipname = "operation_".$date.".zip";
		if ($zip->open($uploads_dir."\\".$zipname, ZipArchive::CREATE)!==TRUE) {
		exit("Couldn't open <$filename> \n");
		}
		@$zip->addFile($uploads_dir."\\decrypted-secret_message_from_".$date."_".$name_audio.".txt","decrypted-secret_message_from_".$date."_".$name_audio.".txt");
		@$zip->addFile($uploads_dir."\\".$date."_operation-info.txt","Operation Info.txt");
		$zip->close();
		fclose($myfile);
		@unlink($uploads_dir."\\".$date."_operation-info.txt");
		@unlink($uploads_dir."\\secret_message_from_".$date."_".$name_audio.".txt");
		@unlink($uploads_dir."\\decrypted-secret_message_from_".$date."_".$name_audio.".txt");
		@unlink($path_audio);
		@unlink($path_audio.".txt");
		header("Location:/enop?file=$zipname");		
	}
	else
	{
		$out=empty($out)?"Unexpected Error!":$out;
		if(str_contains($out,"IllegalBlockSizeException")) $out.="\nThis error might occur when wrong base or user key has submitted.";
		fwrite($myfile,"Operation Status:\tFail\n\n");
		fwrite($myfile,"Exception Message:\n$out");
		fclose($myfile);
		@unlink($uploads_dir."\\secret_message_from_".$date."_".$name_audio.".txt");
		@unlink($uploads_dir."\\decrypted-secret_message_from_".$date."_".$name_audio.".txt");
		@unlink($path_audio);
		@unlink($path_audio.".txt");	
		$msgname=$date."_operation-info.txt";
		header("Location:/enop?file=$msgname");		
	}
	?>