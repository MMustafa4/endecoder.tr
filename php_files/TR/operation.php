<?php
	if(count($_GET)==0)
		header("Location: /");
	else if (!(isset($_GET["file"])))
		header("Location: /");
	else if(!file_exists("uploads/$_GET[file]") || str_starts_with($_GET["file"],".") || empty($_GET["file"]))
		header("Location: /?error=nosuchfile"); 
	$file=$_GET["file"];
	if (str_ends_with($file,"txt"))
		 $status=false;
	else $status=true;
	$url="uploads/".$file;
?>

<html lang="en-EN">
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
			<a href="/"><img src="contents/banner.png" alt="Logo" id="logo" class="centeredimg"></a>
		</div>	
		<div class="top">
			<img src="contents/en.png" alt="English" id="en" class="rightimg" title="English" onclick="selected_en()">
			<img src="contents/selected_tr.png" alt="Türkçe" id="tr" class="rightimg" title="[Seçildi]" onclick="selected_tr()">
		</div><span class="clear"></span>
		<div class="left-menu"><h1>Menu contents will be placed in here.</h1></div>
		<div class="container-inner">
		<div id="result">
		<div id="operation-result"></div>
		<div id="download-button"></div>
		</div>
			</div>
			
		
		<div class="bottom">
			<hr style="float:left; width:90%; margin-left:5%;"><span class="clear"></span>
			<footer style="text-align: center; color:#CCC;">EnDeCODER Photo/Video/Audio Encoder and Decoder | 2022 | Gazi University 218004832 Finishing Work</footer>
		</div>
	</div>	 
  </body>
  <script>
  $(window).on("load",function(){
	 <?php 
	 if($status){
		 echo "document.getElementById('operation-result').innerHTML='<b> İşlem Başarılı!</b>';";
	 }
	 else{
		  echo "document.getElementById('operation-result').innerHTML='<b> İşlem Başarısız!</b>';";
	 }
	 echo "document.getElementById('download-button').innerHTML=\"<a href=$url target='_blank' download ><button>Belgelerinizi İndirin</button></a>;\"";
	 ?>
});
  </script>
  </html>