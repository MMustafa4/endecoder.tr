<?php
if(!isset($_FILES["image"]))
{
	header("Location: /en?error=nofile");
	exit();
}

	date_default_timezone_set('Europe/Istanbul');
	$uploads_dir = 'uploads';
	$date=date("YmdHis");
	$task="unsecured_decode_photo";
	
	$tmp_name = $_FILES['image']["tmp_name"];
	$name_img = $_FILES['image']["name"];
	$path_img= "$uploads_dir/".$date."_".$name_img;
	move_uploaded_file($tmp_name, "$path_img");
	$width=getimagesize("$path_img")[0];
	$height=getimagesize("$path_img")[1];
	
	$command="java -jar java_files/projev3.jar $task en \"$path_img\"";

	$out=shell_exec($command);
	
		$myfile = fopen($uploads_dir."\\".$date."_operation-info.txt", "w");
		fwrite($myfile,"=====================================================\n");
		fwrite($myfile,"====================OPERATION INFO===================\n");
		fwrite($myfile,"=====================================================\n\n");
		fwrite($myfile,"Operation Date & Time:\t".date("d/m/Y H:i:s") ."\n");
		fwrite($myfile,"File Type:\t\tImage\n");
		fwrite($myfile,"Operation Type:\t\tDecode Operation (Plaintext)\n");
		fwrite($myfile,"Decoded Image:\t\t$name_img\n\n");

	if(empty($out)&&file_exists($uploads_dir."\\secret_message_from_".$date."_".$name_img.".txt"))
	{
		fwrite($myfile,"Operation Status:\tSuccess");
		$zip = new ZipArchive();
		$zipname = "operation_".$date.".zip";
		if ($zip->open($uploads_dir."\\".$zipname, ZipArchive::CREATE)!==TRUE) {
		exit("Couldn't open <$filename> \n");
		}
		@$zip->addFile($uploads_dir."\\secret_message_from_".$date."_".$name_img.".txt","secret_message_from_".$name_img.".txt");
		@$zip->addFile($uploads_dir."\\".$date."_operation-info.txt","Operation Info.txt");
		$zip->close();
		@unlink($uploads_dir."\\".$date."_operation-info.txt");
		@unlink($path_img);
		@unlink($uploads_dir."\\secret_message_from_".$date."_".$name_img.".txt");		
		header("Location:/enop?file=$zipname");
	}
	else
	{
		$out=empty($out)?"Unexpected Error!":$out;
		if(str_contains($out,"IllegalBlockSizeException")) $out.="\nThis error might occur when wrong base or user key has submitted.";
		fwrite($myfile,"Operation Status:\tFail\n\n");
		fwrite($myfile,"Exception Message:\n$out");
		@unlink($path_img);
		@unlink($uploads_dir."\\secret_message_from_".$date."_".$name_img.".txt");		
		$msgname=$date."_operation-info.txt";
		header("Location:/enop?file=$msgname");
	}
	?>