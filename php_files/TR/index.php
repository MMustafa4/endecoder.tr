<?php 
	if(count($_GET)>0)
	{
		echo "<script> window.onload=alert(";
		if(isset($_GET["error"]))
		{
			switch($_GET["error"])
			{
				case "nofile":
					echo "'Programa dosya gönderilmedi. Anasayfaya Yönlendirildiniz.'";
					break;
				case "notext":
					echo "'Programa mesaj gönderilmedi. Anasayfaya Yönlendirildiniz.'";			
					break;
				case "nobasekey":
					echo "'Programa temel anahtar gönderilmedi. Anasayfaya Yönlendirildiniz.'";			
					break;
				case "nosuchfile":
					echo "'İndirmek istediğiniz dosya bulunamadı. Anasayfaya Yönlendirildiniz.'";			
					break;
				case "nosuchoperation":
					echo"'Hatalı İşlem Talebinde Bulunuldu. Anasayfaya Yönlendirildiniz.'";
					break;
				default:
					echo"'Hatalı Parametre! Lütfen manuel giriş yapmayınız.'";
			}
		}
		else echo"'Hatalı Parametre! Lütfen manuel giriş yapmayınız.'";
		echo "); window.location.replace('/');</script>\n";
	}	
?>
<!DOCTYPE html>

<html lang="tr-TR">
<head>
	<title>EnDeCo</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta charset = "utf-8">
	<meta http-equiv="content-type" content="text/html; charset=UTF-8" />

	<link rel="icon" href="favicon.ico"/>
	<link rel="stylesheet" href="contents/style.css"/>
	<script type="text/javascript" src="https://code.jquery.com/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="contents/script-tr.js"></script>
	<script type="text/javascript" src="contents/script-default.js"></script>
</head>

<body>
	<div class='loader-wrapper' id="loader-wrapper" > <span class='loader'><span class='loader-inner'></span></span></div>
	<div class="container" id="container">
		<div class="topleft">
			<img src="contents/banner.png" alt="Logo" id="logo" class="centeredimg">
		</div>	
		<div class="top">
			<img src="contents/en.png" alt="English" id="en" class="rightimg" title="English" onclick="selected_en()">
			<img src="contents/selected_tr.png" alt="Türkçe" id="tr" class="rightimg" title="[Seçildi]" onclick="selected_tr()">
		</div><span class="clear"></span>
		<div class="left-menu"><h1>Menu contents will be placed in here.</h1></div>
		<div class="container-inner">
			<div class="file_type">
				<form id="file_type_form" target="" onreset= "reset_form()">
					<fieldset id="filetype">
						<legend>DOSYA TİPİ</legend>
						<input type="radio"	name="file_type" 	id ="txt"	value="text" 		onchange="selected_text()">			<label for="txt">Metin Belgesi</label><br>
						<input type="radio" name="file_type"	id ="pht"	value="photo" 		onchange="selected_photo()">		<label for="pht">Fotoğraf</label><br>
						<input type="radio"	name="file_type"	id ="auvd"	value="audio_video" onchange="selected_audio_video()" >	<label for="auvd">Ses/Video</label>
					</fieldset>
				</form>	
			</div>
			
			<div class='operation' id='operation'>
				<fieldset id="operation">
					<legend>İŞLEM TİPİ</legend>
					<h3>Dosya Tipini Seçiniz.</h3>
				</fieldset>
			</div>
			<span class="clear"></span>
			<div class='details' id='details'>
				<fieldset id="details">
					<legend>İŞLEM BİLGİLERİ</legend>
					<h3 id='messager'>Dosya ve İşlem Tipini Seçiniz.</h3>
				</fieldset>
			</div>
			<span class="clear"></span>			
			<button id="btnsubmit" onclick="checkSubmit()">Gönder</button>
			<button type="reset" id="btnreset" value="reset" form="file_type_form" disabled >Sıfırla</button>
		</div><span class="clear"></span>
		<div class="bottom">
			<hr style="float:left; width:90%; margin-left:5%;"><span class="clear"></span>
			<footer style="text-align: center; color:#CCC;">EnDeCODER Photo/Video/Audio Encoder and Decoder | 2022 | Gazi University 218004832 Finishing Work</footer>
		</div>
	</div>	 
  </body>
  </html>