<?php
if(!isset($_FILES["message"]))
{
	header("Location: /?error=notext");
	exit();
}

if(!isset($_POST["baseKey"]))
{
	header("Location: /?error=nobasekey");
	exit();
}
	date_default_timezone_set('Europe/Istanbul');
	$uploads_dir = 'uploads';
	$date=date("YmdHis");
	$task="encrypt_text";
		
	$tmp_name = $_FILES['message']["tmp_name"];
	$name_msg = $_FILES['message']["name"];
	$path_msg= "$uploads_dir/".$date."_".$name_msg;
	move_uploaded_file($tmp_name, "$path_msg");
	
	if ($_POST["user_pass"]==null)
		$upass="-NULL-";
	else
		$upass=$_POST["user_pass"];

	$base_key=$_POST["baseKey"];
	
	$command="java -jar java_files/projev3.jar $task tr \"$path_msg\" $upass $base_key";
	/*
	echo $command;
	exit();
*/


	$out=shell_exec($command);
	
	$base_key=str_replace("key","Temel Anahtar ",$base_key);

	
		$myfile = fopen($uploads_dir."\\".$date."_islem-bilgileri.txt", "w");
		fwrite($myfile,"=====================================================\n");
		fwrite($myfile,"===================İŞLEM BİLGİLERİ===================\n");
		fwrite($myfile,"=====================================================\n\n");
		fwrite($myfile,"İşlem Tarihi - Saati:\t".date("d/m/Y H:i:s") ."\n");
		fwrite($myfile,"Dosya Tipi:\t\tMetin Belgesi\n");
		fwrite($myfile,"İşlem Tipi\t\tMetin Belgesi Şifreleme\n\n");
		fwrite($myfile,"Temel Anahtar:\t\t$base_key\n");
		fwrite($myfile,"Kullanıcı Şifresi:\t$upass\n\n");
		fwrite($myfile,"Şifrelenecek Belge:\t$name_msg\n\n");

	if(empty($out)&&file_exists($uploads_dir."\\encrypted-".$date."_".$name_msg))
	{
		fwrite($myfile,"İşlem Durumu:\t\tBaşarılı");
		$zip = new ZipArchive();
		$zipname = "operation_".$date.".zip";
		if ($zip->open($uploads_dir."\\".$zipname, ZipArchive::CREATE)!==TRUE) {
		exit("<$filename> açılamadı\n");
		}
		@$zip->addFile($uploads_dir."\\encrypted-".$date."_".$name_msg,"encrypted-".$name_msg);
		@$zip->addFile($uploads_dir."\\".$date."_islem-bilgileri.txt","İşlem Bilgileri.txt");
		$zip->close();
		@unlink($uploads_dir."\\".$date."_islem-bilgileri.txt");
		@unlink($uploads_dir."\\encrypted-".$date."_".$name_msg);
		@unlink($uploads_dir."\\".$date."_".$name_msg);	
		header("Location:/trop?file=$zipname");		
	}
	else
	{
		$out=empty($out)?"Beklenmeyen Hata!":$out;
		fwrite($myfile,"İşlem Durumu:\t\tBaşarısız\n\n");
		fwrite($myfile,"Hata Mesajı:\n$out");
		@unlink($uploads_dir."\\encrypted-".$date."_".$name_msg);
		@unlink($uploads_dir."\\".$date."_".$name_msg);				
		$msgname=$date."_islem-bilgileri.txt";
		header("Location:/trop?file=$msgname");
	}
?>