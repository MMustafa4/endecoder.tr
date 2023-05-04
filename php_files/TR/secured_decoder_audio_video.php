<?php
if(!isset($_FILES["audio_video"]))
{
	header("Location: /?error=nofile");
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
	$task="secured_decode_audio";
	
	$tmp_name = $_FILES['audio_video']["tmp_name"];
	$name_audio = $_FILES['audio_video']["name"];
	$path_audio= "$uploads_dir/".$date."_".$name_audio;
	move_uploaded_file($tmp_name, "$path_audio");
	
		if(preg_match('/video\/*/',$_FILES["audio_video"]["type"]))
			$filetype="Video Dosyası";
		elseif(preg_match('/audio\/*/',$_FILES["audio_video"]["type"]))
			$filetype="Ses Dosyası";
		
	
	
	if ($_POST["user_pass"]==null)
		$upass="-NULL-";
	else
		$upass=$_POST["user_pass"];
	
	$base_key=$_POST["baseKey"];
	
	$command="java -jar java_files/projev3.jar $task tr \"$path_audio\" $upass $base_key";

	$out=shell_exec($command);
	
	$base_key=str_replace("key","Temel Anahtar ",$base_key);
	
		$myfile = fopen($uploads_dir."\\".$date."_islem-bilgileri.txt", "w");
		fwrite($myfile,"=====================================================\n");
		fwrite($myfile,"===================İŞLEM BİLGİLERİ===================\n");
		fwrite($myfile,"=====================================================\n\n");
		fwrite($myfile,"İşlem Tarihi - Saati:\t".date("d/m/Y H:i:s") ."\n");
		fwrite($myfile,"Dosya Tipi:\t\t$filetype\n");
		fwrite($myfile,"İşlem Tipi:\t\tDES Şifrelemeli Decode\n\n");
		fwrite($myfile,"Temel Anahtar:\t\t$base_key\n");		
		fwrite($myfile,"Kullanıcı Şifresi:\t$upass\n\n");
		fwrite($myfile,"Çözümlenecek Ses Dosyası:\t$name_audio\n\n");
		
	if(empty($out)&&file_exists($uploads_dir."\\secret_message_from_".$date."_".$name_audio.".txt"))
	{
		fwrite($myfile,"İşlem Durumu:\t\tBaşarılı");
		$zip = new ZipArchive();
		$zipname = "operation_".$date.".zip";
		if ($zip->open($uploads_dir."\\".$zipname, ZipArchive::CREATE)!==TRUE) {
		exit("<$filename> açılamadı\n");
		}
		@$zip->addFile($uploads_dir."\\decrypted-secret_message_from_".$date."_".$name_audio.".txt","decrypted-secret_message_from_".$date."_".$name_audio.".txt");
		@$zip->addFile($uploads_dir."\\".$date."_islem-bilgileri.txt","İşlem Bilgileri.txt");
		$zip->close();
		fclose($myfile);
		@unlink($uploads_dir."\\".$date."_islem-bilgileri.txt");
		@unlink($uploads_dir."\\secret_message_from_".$date."_".$name_audio.".txt");
		@unlink($uploads_dir."\\decrypted-secret_message_from_".$date."_".$name_audio.".txt");
		@unlink($path_audio);
		@unlink($path_audio.".txt");
		header("Location:/trop?file=$zipname");		
	}
	else
	{
		$out=empty($out)?"Beklenmeyen Hata!":$out;
		if(str_contains($out,"IllegalBlockSizeException")) $out.="\n Bu hata seçtiğiniz anahtarla şifrelenmemiş bir belge göndermenizden kaynaklananmış olabilir.";
		fwrite($myfile,"İşlem Durumu:\t\tBaşarısız\n\n");
		fwrite($myfile,"Hata Mesajı:\n$out");
		fclose($myfile);
		@unlink($uploads_dir."\\secret_message_from_".$date."_".$name_audio.".txt");
		@unlink($uploads_dir."\\decrypted-secret_message_from_".$date."_".$name_audio.".txt");
		@unlink($path_audio);
		@unlink($path_audio.".txt");	
		$msgname=$date."_islem-bilgileri.txt";
		header("Location:/trop?file=$msgname");		
	}
	?>