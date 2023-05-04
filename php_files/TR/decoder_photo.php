<?php
if(!isset($_FILES["image"]))
{
	header("Location: /?error=nofile");
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
	
	$command="java -jar java_files/projev3.jar $task tr \"$path_img\"";

	$out=shell_exec($command);
	
		$myfile = fopen($uploads_dir."\\".$date."_islem-bilgileri.txt", "w");
		fwrite($myfile,"=====================================================\n");
		fwrite($myfile,"===================İŞLEM BİLGİLERİ===================\n");
		fwrite($myfile,"=====================================================\n\n");
		fwrite($myfile,"İşlem Tarihi - Saati:\t".date("d/m/Y H:i:s") ."\n");
		fwrite($myfile,"Dosya Tipi:\t\tFotoğraf\n");
		fwrite($myfile,"İşlem Tipi\t\tŞifrelemesiz Decode\n");
		fwrite($myfile,"Çözümlenecek Fotoğraf:\t$name_img\n\n");

	if(empty($out)&&file_exists($uploads_dir."\\secret_message_from_".$date."_".$name_img.".txt"))
	{
		fwrite($myfile,"İşlem Durumu:\t\tBaşarılı");
		$zip = new ZipArchive();
		$zipname = "operation_".$date.".zip";
		if ($zip->open($uploads_dir."\\".$zipname, ZipArchive::CREATE)!==TRUE) {
		exit("<$filename> açılamadı\n");
		}
		@$zip->addFile($uploads_dir."\\secret_message_from_".$date."_".$name_img.".txt","secret_message_from_".$name_img.".txt");
		@$zip->addFile($uploads_dir."\\".$date."_islem-bilgileri.txt","İşlem Bilgileri.txt");
		$zip->close();
		@unlink($uploads_dir."\\".$date."_islem-bilgileri.txt");
		@unlink($path_img);
		@unlink($uploads_dir."\\secret_message_from_".$date."_".$name_img.".txt");		
		header("Location:/trop?file=$zipname");
	}
	else
	{
		$out=empty($out)?"Beklenmeyen Hata!":$out;
		if(str_contains($out,"IllegalBlockSizeException")) $out.="\n Bu hata seçtiğiniz anahtarla şifrelenmemiş bir belge göndermenizden kaynaklananmış olabilir.";
		fwrite($myfile,"İşlem Durumu:\t\tBaşarısız\n\n");
		fwrite($myfile,"Hata Mesajı:\n$out");
		@unlink($path_img);
		@unlink($uploads_dir."\\secret_message_from_".$date."_".$name_img.".txt");		
		$msgname=$date."_islem-bilgileri.txt";
		header("Location:/trop?file=$msgname");
	}
	?>