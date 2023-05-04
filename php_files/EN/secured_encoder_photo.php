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

if(!isset($_POST["baseKey"]))
{
	header("Location: /en?error=nobasekey");
	exit();
}
	date_default_timezone_set('Europe/Istanbul');
	$uploads_dir = 'uploads';
	$date=date("YmdHis");
	$task="secured_encode_photo";
	
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
	
	if ($_POST["user_pass"]==null)
		$upass="-NULL-";
	else
		$upass=$_POST["user_pass"];
	$base_key=$_POST["baseKey"];
	
	$command="java -jar java_files/projev3.jar $task en \"$path_img\" $width $height \"$path_msg\" $upass $base_key";

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
	
		$base_key=str_replace("key","Base Key ",$base_key);
		
		$myfile = fopen($uploads_dir."\\".$date."_operation-info.txt", "w");
		fwrite($myfile,"=====================================================\n");
		fwrite($myfile,"====================OPERATION INFO===================\n");
		fwrite($myfile,"=====================================================\n\n");
		fwrite($myfile,"Operation Date & Time:\t".date("d/m/Y H:i:s") ."\n");
		fwrite($myfile,"File Type:\t\tImage\n");
		fwrite($myfile,"Operation Type:\t\tEncode Operation With DES Encryption\n\n");
		fwrite($myfile,"Base Key:\t\t$base_key\n");
		fwrite($myfile,"User Password:\t\t$upass\n\n");
		fwrite($myfile,"Encoded Image:\t\t$name_img\n");
		fwrite($myfile,"Embeded Text:\t\t$name_msg\n\n");

	if(empty($out)&&file_exists($uploads_dir."\\encrypted-".$date."_".$name_msg)&&file_exists($uploads_dir."\\encoded-".$date."_".$rmd ))
	{
		fwrite($myfile,"Operation Status:\tSuccess");
		$zip = new ZipArchive();
		$zipname = "operation_".$date.".zip";
		if ($zip->open($uploads_dir."\\".$zipname, ZipArchive::CREATE)!==TRUE) {
		exit("Couldn't open <$filename> \n");
		}
		@$zip->addFile($uploads_dir."\\encrypted-".$date."_".$name_msg,"encrypted-".$name_msg);
		@$zip->addFile($uploads_dir."\\".$date."_operation-info.txt","Operation Info.txt");
		@$zip->addFile($uploads_dir."\\encoded-".$date."_".$rmd , "encoded-".$rmd);
		$zip->close();
		@unlink($uploads_dir."\\".$date."_operation-info.txt");
		@unlink($uploads_dir."\\encrypted-".$date."_".$name_msg);
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
		@unlink($uploads_dir."\\encrypted-".$date."_".$name_msg);
		@unlink($uploads_dir."\\".$date."_".$name_msg);
		@unlink($path_img);
		@unlink($uploads_dir."\\encoded-".$date."_".$rmd);	
		$msgname=$date."_operation-info.txt";
		header("Location:/enop?file=$msgname");		
	}
		?>

