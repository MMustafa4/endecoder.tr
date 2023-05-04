<?php
if(!isset($_FILES["message"]))
{
	header("Location: /en?error=notext");
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
	$task="decrypt_text";
		
	$tmp_name = $_FILES['message']["tmp_name"];
	$name_msg = $_FILES['message']["name"];
	$path_msg= "$uploads_dir/".$date."_".$name_msg;
	move_uploaded_file($tmp_name, "$path_msg");
	
	if ($_POST["user_pass"]==null)
		$upass="-NULL-";
	else
		$upass=$_POST["user_pass"];
	
	$base_key=$_POST["baseKey"];
	
	$command="java -jar java_files/projev3.jar $task en \"$path_msg\" $upass $base_key";
	/*
	echo $command;
	exit();
*/


	$out=shell_exec($command);
	
	$base_key=str_replace("key","Base Key ",$base_key);
	
		$myfile = fopen($uploads_dir."\\".$date."_operation-info.txt", "w");
		fwrite($myfile,"=====================================================\n");
		fwrite($myfile,"====================OPERATION INFO===================\n");
		fwrite($myfile,"=====================================================\n\n");
		fwrite($myfile,"Operation Date & Time:\t".date("d/m/Y H:i:s") ."\n");
		fwrite($myfile,"File Type:\t\tText File\n");
		fwrite($myfile,"Operation Type:\t\tŞifreli Metin Çözme\n\n");
		fwrite($myfile,"Base Key:\t\t$base_key\n");		
		fwrite($myfile,"User Password:\t\t$upass\n\n");
		fwrite($myfile,"Decrypted Text:\t\t$name_msg\n\n");

	if(empty($out)&&file_exists($uploads_dir."\\decrypted-".$date."_".$name_msg))
	{	
		fwrite($myfile,"Operation Status:\tSuccess");
		$zip = new ZipArchive();
		$zipname = "operation_".$date.".zip";
		if ($zip->open($uploads_dir."\\".$zipname, ZipArchive::CREATE)!==TRUE) {
		exit("Couldn't open <$filename> \n");
		}
		@$zip->addFile($uploads_dir."\\decrypted-".$date."_".$name_msg,"decrypted-".$name_msg);
		@$zip->addFile($uploads_dir."\\".$date."_operation-info.txt","Operation Info.txt");
		$zip->close();
		@unlink($uploads_dir."\\".$date."_operation-info.txt");
		@unlink($uploads_dir."\\encrypted-".$date."_".$name_msg);
		@unlink($uploads_dir."\\".$date."_".$name_msg);	
		header("Location:/enop?file=$zipname");		
	}
	else
	{
		$out=empty($out)?"Unexpected Error!":$out;
		if(str_contains($out,"IllegalBlockSizeException")) $out.="\nThis error might occur when wrong base or user key has submitted.";
		fwrite($myfile,"Operation Status:\tFail\n\n");
		fwrite($myfile,"Exception Message:\n$out");
		$msgname=$date."_operation-info.txt";
		@unlink($uploads_dir."\\decrypted-".$date."_".$name_msg);
		@unlink($uploads_dir."\\".$date."_".$name_msg);				
		header("Location:/enop?file=$msgname");
	}

		?>
		