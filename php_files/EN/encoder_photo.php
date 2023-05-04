<?php
if(!isset($_FILES["image"]))
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
	$task="unsecured_encode_photo";
	
	$tmp_name = $_FILES['image']["tmp_name"];
	$name_img = $_FILES['image']["name"];
	$path_img= "$uploads_dir/".$date."_".$name_img;
	move_uploaded_file($tmp_name, "$path_img");
	$width=getimagesize("$path_img")[0];
	$height=getimagesize("$path_img")[1];
	
	$tmp_name = $_FILES['message']["tmp_name"];
	$name_msg = $_FILES['message']["name"];
	$path_msg= "$uploads_dir/".$date."_".$name_msg;
	move_uploaded_file($tmp_name, "$path_msg");
	
	if(str_ends_with($name_img,".jpg"))
		$rmd=str_replace(".jpg" , ".png" , $name_img);
	elseif(str_ends_with($name_img,".jpeg"))
		$rmd=str_replace(".jpeg" , ".png" , $name_img);
	else
		$rmd=$name_img;
	
	$command="java -jar java_files/projev3.jar $task en \"$path_img\" $width $height \"$path_msg\"";

	$out=shell_exec($command);
	
	
		$myfile = fopen($uploads_dir."\\".$date."_operation-info.txt", "w");
		fwrite($myfile,"=====================================================\n");
		fwrite($myfile,"====================OPERATION INFO===================\n");
		fwrite($myfile,"=====================================================\n\n");
		fwrite($myfile,"Operation Date & Time:\t".date("d/m/Y H:i:s") ."\n");
		fwrite($myfile,"File Type:\t\tImage\n");
		fwrite($myfile,"Operation Type:\t\tEncode Operation (Plaintext)\n\n");
		fwrite($myfile,"Encoded Image:\t\t$name_img\n");
		fwrite($myfile,"Embeded Text:\t\t$name_msg\n\n");

	if(empty($out)&&file_exists($path_msg)&&file_exists($path_img))
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
		@unlink($uploads_dir."\\".$date."_operation-info.txt");
		@unlink($uploads_dir."\\".$date."_".$name_msg);
		@unlink($path_img);
		@unlink($uploads_dir."\\encoded-".$date."_".$rmd);		
		header("Location:/enop?file=$zipname");
	}
	else
	{
		$out=empty($out)?"Unexpected Error!":$out;
		fwrite($myfile,"Operation Status:\tFail\n\n");
		fwrite($myfile,"Exception Message:\n$out");
		@unlink($uploads_dir."\\".$date."_".$name_msg);
		@unlink($path_img);
		@unlink($uploads_dir."\\encoded-".$date."_".$rmd);		
		$msgname=$date."_operation-info.txt";
		header("Location:/enop?file=$msgname");
	}
		?>

