	/*Script File For EnDeCODER */
	
function _(el) {
  return document.getElementById(el);
}	
	
$(document).on("keydown", "form", function(event) { 
	if (event.key == "Enter"){
		$("#btnsubmit").click();
		event.preventDefault();
	}});
	
window.addEventListener( "pageshow", function ( event ) {
var perfEntries = performance.getEntriesByType("navigation");


if (perfEntries[0].type === "back_forward") {
	_('btnreset').removeAttribute('disabled');
    _("btnreset").click();
	_('btnreset').disabled=true;
}
});
		
		function reset_form(){
			_('operation').innerHTML="<fieldset>"
			+"<legend>İŞLEM TİPİ</legend>"
			+"<h3>Dosya Tipini Seçiniz.</h3>"
			+"</fieldset>";
			_('details').innerHTML="<fieldset>"
			+"<legend>İŞLEM BİLGİLERİ</legend>"
			+"<h3 id='messager'>Dosya ve İşlem Tipini Seçiniz.</h3>"
			+"</fieldset>";
			_('btnreset').disabled=true;
		}
	
		function selected_text(){ 
		_('operation').innerHTML="	<form id='operation' target=''>"
		+"<fieldset>"
		+"<legend>İŞLEM TİPİ</legend>"
		+"<input type='radio' id='entxt' name='operation' value='encrypt' onchange='encrypt()'><label for='entxt'>Metin Şifreleme</label><br> "
		+"<input type='radio' id='detxt' name='operation' value='decrypt' onchange='decrypt()'><label for='detxt'>Şifreli Metin Çözme</label><br> "
		+"</fieldset>"
		+"</form> "; 
			_('details').innerHTML="<fieldset>"
			+"<legend>İŞLEM BİLGİLERİ</legend>"
			+"<h3 id='messager'>İşlem Tipini Seçiniz.</h3>"
			+"</fieldset>";	
			_('btnreset').removeAttribute('disabled');
		}

		function encrypt(){
		_('details').innerHTML="	<form id='operation_form' action='exec?op=enctext' method='POST' enctype='multipart/form-data' >"
		+"<fieldset>"
		+"<legend>İŞLEM BİLGİLERİ</legend><table><tbody><tr><td colspan='4'>"
		+"<label>Şifrelenecek Metin Belgesini Seçiniz.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='msguploader' for='message'>Seçiniz.</label><span id='msgname' class='inputrow'></span><input type='file' name='message' id='message' accept='.txt' onchange = 'msgchanged(); if(text_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td><input type='radio' id='key1' name='baseKey' value='key1' checked required ><label for='key1'>Temel Anahtar-1</label> </td>"
		+"<td><input type='radio' id='key2' name='baseKey' value='key2'  ><label for='key2'>Temel Anahtar-2</label></td> "
		+"<td><input type='radio' id='key3' name='baseKey' value='key3'  ><label for='key3'>Temel Anahtar-3</label></td> "
		+"<td><input type='radio' id='key4' name='baseKey' value='key4'  ><label for='key4'>Temel Anahtar-4</label></td>"
		+"<td><input type='radio' id='key5' name='baseKey' value='key5'  ><label for='key5'>Temel Anahtar-5</label></td>"
		+"<td><input type='radio' id='key6' name='baseKey' value='key6'  ><label for='key6'>Temel Anahtar-6</label><span id='errorcatcher'></span> </td></tr>"
		+"<tr><td colspan='4'><label>Kullanıcı Şifresi Giriniz.</label></td>"
		+"<td colspan='2'><input type='text' name='user_pass' id='user_pass' maxlength='5' onchange='alphanum(this.value)' onkeyup='remove_nonalphanum(this.value)' placeholder='Kullanıcı Şifresi'><br>"
		+"</fieldset>"
		+"</form> ";
		}
		
		function loader(){
			/*
			_("container").style.visibility="hidden";
			_("loader-wrapper").removeAttribute('style');*/
			$("#container").fadeOut("slow");
			$("#loader-wrapper").fadeIn("slow");
		}
		
		function decrypt(){ 
		_('details').innerHTML="	<form id='operation_form'  	action='exec?op=dectext' method='POST' enctype='multipart/form-data' >"
		+"<fieldset>"
		+"<legend>İŞLEM BİLGİLERİ</legend><table><tbody><tr><td colspan='4'>"
		+"<label>Çözümlenecek Metin Belgesini Seçiniz.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='msguploader' for='message'>Seçiniz.</label><span id='msgname' class='inputrow'></span><input type='file' name='message' id='message' accept='.txt' onchange = 'msgchanged(); if(text_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"		
		+"<tr><td><input type='radio' id='key1' name='baseKey' value='key1' checked required ><label for='key1'>Temel Anahtar-1</label> </td>"
		+"<td><input type='radio' id='key2' name='baseKey' value='key2'  ><label for='key2'>Temel Anahtar-2</label></td> "
		+"<td><input type='radio' id='key3' name='baseKey' value='key3'  ><label for='key3'>Temel Anahtar-3</label></td> "
		+"<td><input type='radio' id='key4' name='baseKey' value='key4'  ><label for='key4'>Temel Anahtar-4</label></td>"
		+"<td><input type='radio' id='key5' name='baseKey' value='key5'  ><label for='key5'>Temel Anahtar-5</label></td>"
		+"<td><input type='radio' id='key6' name='baseKey' value='key6'  ><label for='key6'>Temel Anahtar-6</label> </td></tr>"
		+"<tr><td colspan='4'><label>Kullanıcı Şifresi Giriniz.</label></td>"
		+"<td colspan='2'><input type='text' name='user_pass' id='user_pass' maxlength='5' onchange='alphanum(this.value)' onkeyup='remove_nonalphanum(this.value)' placeholder='Kullanıcı Şifresi'><br>"
		+"</fieldset>"
		+"</form> ";
		}
		

		function selected_photo(){ 
		_('operation').innerHTML="	<form id='operation' target=''>"
		+"<fieldset>"
		+"<legend>İŞLEM TİPİ</legend>"
		+"<input type='radio' id='senpht' name='operation' value='secured_encode' onchange='secured_encode()'><label for='senpht'>DES Şifrelemeli Encode İşlemi</label><br> "
		+"<input type='radio' id='enpht' name='operation' value='encode' onchange='encode()'><label for='enpht'>Şifrelemesiz Encode İşlemi</label><br> "
		+"<input type='radio' id='sdepht' name='operation' value='secured_decode' onchange='secured_decode()'><label for='sdepht'>DES Şifrelemeli Decode İşlemi</label><br> "
		+"<input type='radio' id='depht' name='operation' value='secured_encode' onchange='decode()'><label for='depht'>Şifrelemesiz Decode İşlemi</label><br> "
		+"</fieldset>"
		+"</form> "; 
			_('details').innerHTML="<fieldset>"
			+"<legend>İŞLEM BİLGİLERİ</legend>"
			+"<h3 id='messager'>İşlem Tipini Seçiniz.</h3>"
			+"</fieldset>";		
			_('btnreset').removeAttribute('disabled');
		} 

		function secured_encode(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?op=sencpht' method='POST' enctype='multipart/form-data' >"
		+"<fieldset>"
		+"<legend>İŞLEM BİLGİLERİ</legend><table><tbody><tr><td colspan='4'>"
		+"<label>İşlem Yapılacak Fotoğrafı Seçiniz.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='phtuploader' for='image'>Seçiniz.</label><span id='phtname' class='inputrow'></span><input type='file' name='image' id='image' accept='image/png, image/jpg, image/jpeg' required onchange = 'phtchanged(); if(photo_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td colspan='4'><label>İşlenecek Metin Belgesini Seçiniz.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='msguploader' for='message'>Seçiniz.</label><span id='msgname' class='inputrow'></span><input type='file' name='message' id='message' accept='.txt' onchange = 'msgchanged(); if(text_control()) accepted2(); else declined2();'><span id='result2' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td><input type='radio' id='key1' name='baseKey' value='key1' checked required ><label for='key1'>Temel Anahtar-1</label> </td>"
		+"<td><input type='radio' id='key2' name='baseKey' value='key2'  ><label for='key2'>Temel Anahtar-2</label></td> "
		+"<td><input type='radio' id='key3' name='baseKey' value='key3'  ><label for='key3'>Temel Anahtar-3</label></td> "
		+"<td><input type='radio' id='key4' name='baseKey' value='key4'  ><label for='key4'>Temel Anahtar-4</label></td>"
		+"<td><input type='radio' id='key5' name='baseKey' value='key5'  ><label for='key5'>Temel Anahtar-5</label></td>"
		+"<td><input type='radio' id='key6' name='baseKey' value='key6'  ><label for='key6'>Temel Anahtar-6</label> </td></tr>"
		+"<tr><td colspan='4'><label>Kullanıcı Şifresi Giriniz.</label></td>"
		+"<td colspan='2'><input type='text' name='user_pass' id='user_pass' maxlength='5' onchange='alphanum(this.value)' onkeyup='remove_nonalphanum(this.value)' placeholder='Kullanıcı Şifresi'>"
		+"</fieldset>"
		+"</form> ";
		}
		

		function encode(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?op=encpht' method='POST' enctype='multipart/form-data' >"
		+"<fieldset>"
		+"<legend>İŞLEM BİLGİLERİ</legend><table><tbody><tr><td colspan='4'>"
		+"<label>İşlem Yapılacak Fotoğrafı Seçiniz.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='phtuploader' for='image'>Seçiniz.</label><span id='phtname' class='inputrow'></span><input type='file' name='image' id='image' accept='image/png, image/jpg, image/jpeg' required onchange = 'phtchanged(); if(photo_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td colspan='4'><label>İşlenecek Metin Belgesini Seçiniz.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='msguploader' for='message'>Seçiniz.</label><span id='msgname' class='inputrow'></span><input type='file' name='message' id='message' accept='.txt' onchange = 'msgchanged(); if(text_control()) accepted2(); else declined2();'><span id='result2' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"</fieldset>"
		+"</form> ";
		}
		

		function secured_decode(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?op=sdecpht' method='POST' enctype='multipart/form-data' >"
		+"<fieldset>"
		+"<legend>İŞLEM BİLGİLERİ</legend><table><tbody><tr><td colspan='4'>"
		+"<label>İşlem Yapılacak Fotoğrafı Seçiniz.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='phtuploader' for='image'>Seçiniz.</label><span id='phtname' class='inputrow'></span><input type='file' name='image' id='image' accept='image/png, image/jpg, image/jpeg' required onchange = 'phtchanged(); if(photo_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td><input type='radio' id='key1' name='baseKey' value='key1' checked required ><label for='key1'>Temel Anahtar-1</label> </td>"
		+"<td><input type='radio' id='key2' name='baseKey' value='key2'  ><label for='key2'>Temel Anahtar-2</label></td> "
		+"<td><input type='radio' id='key3' name='baseKey' value='key3'  ><label for='key3'>Temel Anahtar-3</label></td> "
		+"<td><input type='radio' id='key4' name='baseKey' value='key4'  ><label for='key4'>Temel Anahtar-4</label></td>"
		+"<td><input type='radio' id='key5' name='baseKey' value='key5'  ><label for='key5'>Temel Anahtar-5</label></td>"
		+"<td><input type='radio' id='key6' name='baseKey' value='key6'  ><label for='key6'>Temel Anahtar-6</label> </td></tr>"
		+"<tr><td colspan='4'><label>Kullanıcı Şifresi Giriniz.</label></td>"
		+"<td colspan='2'><input type='text' name='user_pass' id='user_pass' maxlength='5' onchange='alphanum(this.value)' onkeyup='remove_nonalphanum(this.value)' placeholder='Kullanıcı Şifresi'><br>"
		+"</fieldset>"
		+"</form> ";
		}
		

		function decode(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?op=decpht' method='POST' enctype='multipart/form-data' >"
		+"<fieldset>"
		+"<legend>İŞLEM BİLGİLERİ</legend><table><tbody><tr><td colspan='4'>"
		+"<label>İşlem Yapılacak Fotoğrafı Seçiniz.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='phtuploader' for='image'>Seçiniz.</label><span id='phtname' class='inputrow'></span><input type='file' name='image' id='image' accept='image/png, image/jpg, image/jpeg' required onchange = 'phtchanged(); if(photo_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span>"
		+"</fieldset>"
		+"</form> ";
		}
		
		
		function selected_audio_video(){ 
		_('operation').innerHTML="	<form id='operation' target=''>"
		+"<fieldset>"
		+"<legend>İŞLEM TİPİ</legend>"
		+"<input type='radio' id='senauvd' name='operation' value='secured_encode' onchange='secured_encode_audio_video()'><label for='senauvd'>DES Şifrelemeli Encode İşlemi</label><br> "
		+"<input type='radio' id='enauvd' name='operation' value='encode' onchange='encode_audio_video()'><label for='enauvd'>Şifrelemesiz Encode İşlemi</label><br> "
		+"<input type='radio' id='sdeauvd' name='operation' value='secured_decode' onchange='secured_decode_audio_video()'><label for='sdeauvd'>DES Şifrelemeli Decode İşlemi</label><br> "
		+"<input type='radio' id='deauvd' name='operation' value='secured_encode' onchange='decode_audio_video()'><label for='deauvd'>Şifrelemesiz Decode İşlemi</label><br> "
		+"</fieldset>"
		+"</form> "; 
			_('details').innerHTML="<fieldset>"
			+"<legend>İŞLEM BİLGİLERİ</legend>"
			+"<h3 id='messager'>İşlem Tipini Seçiniz.</h3>"
			+"</fieldset>";		 
			_('btnreset').removeAttribute('disabled');
		} 
		
		function secured_encode_audio_video(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?op=sencauvd' method='POST' enctype='multipart/form-data' >"
		+"<fieldset>"
		+"<legend>İŞLEM BİLGİLERİ</legend><table><tbody><tr><td colspan='4'>"
		+"<label>İşlem Yapılacak Ses Dosyasını Seçiniz.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='auvduploader' for='audio_video'>Seçiniz.</label><span id='auvdname' class='inputrow'></span><input type='file' name='audio_video' id='audio_video' accept='audio/* , video/*' required onchange = 'auvdchanged(); if(audio_video_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td colspan='4'><label>İşlenecek Metin Belgesini Seçiniz.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='msguploader' for='message'>Seçiniz.</label><span id='msgname' class='inputrow'></span><input type='file' name='message' id='message' accept='.txt' onchange = 'msgchanged(); if(text_control()) accepted2(); else declined2();'><span id='result2' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td><input type='radio' id='key1' name='baseKey' value='key1' checked required ><label for='key1'>Temel Anahtar-1</label> </td>"
		+"<td><input type='radio' id='key2' name='baseKey' value='key2'  ><label for='key2'>Temel Anahtar-2</label></td> "
		+"<td><input type='radio' id='key3' name='baseKey' value='key3'  ><label for='key3'>Temel Anahtar-3</label></td> "
		+"<td><input type='radio' id='key4' name='baseKey' value='key4'  ><label for='key4'>Temel Anahtar-4</label></td>"
		+"<td><input type='radio' id='key5' name='baseKey' value='key5'  ><label for='key5'>Temel Anahtar-5</label></td>"
		+"<td><input type='radio' id='key6' name='baseKey' value='key6'  ><label for='key6'>Temel Anahtar-6</label> </td></tr>"
		+"<tr><td colspan='4'><label>Kullanıcı Şifresi Giriniz.</label></td>"
		+"<td colspan='2'><input type='text' name='user_pass' id='user_pass' maxlength='5' onchange='alphanum(this.value)' onkeyup='remove_nonalphanum(this.value)' placeholder='Kullanıcı Şifresi'><br>"
		+"</fieldset>"
		+"</form> ";
		}
		
		
		function encode_audio_video(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?op=encauvd' method='POST' enctype='multipart/form-data' >"
		+"<fieldset>"
		+"<legend>İŞLEM BİLGİLERİ</legend><table><tbody><tr><td colspan='4'>"
		+"<label>İşlem Yapılacak Ses Dosyasını Seçiniz.</label>"
		+"<td colspan='2'></span><label class='inputrow' id='auvduploader' for='audio_video'>Seçiniz.</label><span id='auvdname' class='inputrow'></span><input type='file' name='audio_video' id='audio_video' accept='audio/* , video/*' required onchange = 'auvdchanged(); if(audio_video_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td colspan='4'><label>İşlenecek Metin Belgesini Seçiniz.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='msguploader' for='message'>Seçiniz.</label><span id='msgname' class='inputrow'></span><input type='file' name='message' id='message' accept='.txt' onchange = 'msgchanged(); if(text_control()) accepted2(); else declined2();'><span id='result2' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"</fieldset>"
		+"</form> ";
		}
		
		
		function secured_decode_audio_video(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?op=sdecauvd' method='POST' enctype='multipart/form-data' >"
		+"<fieldset>"
		+"<legend>İŞLEM BİLGİLERİ</legend><table><tbody><tr><td colspan='4'>"
		+"<label>İşlem Yapılacak Ses Dosyasını Seçiniz.</label>"
		+"<td colspan='2'></span><label class='inputrow' id='auvduploader' for='audio_video'>Seçiniz.</label><span id='auvdname' class='inputrow'></span><input type='file' name='audio_video' id='audio_video' accept='audio/* , video/*' required onchange = 'auvdchanged(); if(audio_video_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td><input type='radio' id='key1' name='baseKey' value='key1' checked required ><label for='key1'>Temel Anahtar-1</label> </td>"
		+"<td><input type='radio' id='key2' name='baseKey' value='key2'  ><label for='key2'>Temel Anahtar-2</label></td> "
		+"<td><input type='radio' id='key3' name='baseKey' value='key3'  ><label for='key3'>Temel Anahtar-3</label></td> "
		+"<td><input type='radio' id='key4' name='baseKey' value='key4'  ><label for='key4'>Temel Anahtar-4</label></td>"
		+"<td><input type='radio' id='key5' name='baseKey' value='key5'  ><label for='key5'>Temel Anahtar-5</label></td>"
		+"<td><input type='radio' id='key6' name='baseKey' value='key6'  ><label for='key6'>Temel Anahtar-6</label> </td></tr>"
		+"<tr><td colspan='4'><label>Kullanıcı Şifresi Giriniz.</label></td>"
		+"<td colspan='2'><input type='text' name='user_pass' id='user_pass' maxlength='5' onchange='alphanum(this.value)' onkeyup='remove_nonalphanum(this.value)' placeholder='Kullanıcı Şifresi'></td></tr></tbody></table>"
		+"</fieldset>"
		+"</form> ";
		}
		

		function decode_audio_video(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?op=decauvd' method='POST' enctype='multipart/form-data' >"
		+"<fieldset>"
		+"<legend>İŞLEM BİLGİLERİ</legend><table><tbody><tr><td colspan='4'>"
		+"<label>İşlem Yapılacak Ses Dosyasını Seçiniz.</label>"
		+"<td colspan='2'></span><label class='inputrow' id='auvduploader' for='audio_video'>Seçiniz.</label><span id='auvdname' class='inputrow'></span><input type='file' name='audio_video' id='audio_video' accept='audio/* , video/*' required onchange = 'auvdchanged(); if(audio_video_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span>"
		+"</fieldset>"
		+"</form> ";
		}
		
		//10485760 5242880
		function audio_video_control(){  
		const format=[".webm", ".mkv", ".flv", ".flv", ".vob", ".ogv", ".ogg", ".drc", ".gif", ".gifv", ".mng", ".avi", ".mov", ".qt", ".wmv", ".yuv", ".rm", ".rmvb", ".asf", ".amv", ".mp4", ".m4p", ".m4v", ".mpg", ".mp2", ".mpeg", ".mpe", ".mpv", ".mpg", ".mpeg", ".m2v", ".m4v", ".svi", ".3gp", ".3g2", ".mxf", ".roq", ".nsv", ".flv", "waw", "aiff", "flac", "alac", "ape", "mp3", "aac", "wma"];
		var val = _('audio_video'); 
		var fresult=false;
		if (val.value=="") return false;
		for(let i=0; i<format.length; i++){
			if(val.value.endsWith(format[i])){
				fresult=true;
				break;
			}
		}

		if(!fresult){
			alert("Geçersiz Format");
			
			_('audio_video').value=null;
			return false;
		}		
		
		if(val.files[0].size>10485760 || val.files[0].size<102400){
			alert("Dosya Boyut Hatası");
			_('audio_video').value=null;
			return false;
		}
		return true;
		}
		
		function photo_control(){
		var val = _('image'); 
		if (val.value=="") return false;		
		if (!(val.value.endsWith(".jpg") || val.value.endsWith(".png") || val.value.endsWith(".jpeg"))){ 
			alert("Geçersiz Format!");
			_('image').value=null;
			return false;
		}
		if(val.files[0].size>2097152){
			alert("Dosya Boyut Hatası");
			_('image').value=null;
			return false;
		}
		return true;
		}

		function text_control(){ 
		var val = _('message'); 
		if(val.value=="") return;
		if (!(val.value.endsWith(".txt"))){ 
			alert("Geçersiz Format!");
			_('message').value=null;
			return false;
		}
		return true;
		}

		function alphanum(val){ 
		let letterNumber = "0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
       const myArray = val.split(""); 

		for (let i = 0; i < myArray.length; i++){
		if (!(letterNumber.includes(myArray[i]))){ 
			alert("Geçersiz Kullanıcı Anahtarı!");
			_('user_pass').value=null;
			break;
		}
		}
		}

		function remove_nonalphanum(val){
		let result = val;			
		let letterNumber = "0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
       const myArray = val.split(""); 

		for (let i = 0; i < myArray.length; i++){
		if (!(letterNumber.includes(myArray[i]))){ 
			result = result.replace(myArray[i], "");
		}
		}
		_('user_pass').value=result;
		}
		
		function checkKeys(){
			if($("#key1").is(':checked') || $("#key2").is(':checked') || $("#key3").is(':checked') || $("#key4").is(':checked') || $("#key5").is(':checked') || $("#key6").is(':checked') ){
				return true;
			}
			else{
				_("key1").required=true;
				return false;}
			
		}
		
		function checkSubmit(){
			if($(".baseKey").length) if(!checkKeys()){ errorReminder(); if(_("key1").required!=true) return;}
		if (_("messager")!=null) alert(_('messager').textContent); else if( $(".errormark").length ) errorReminder(); else {_('operation_form').submit(); loader(); }
		}
		
		function selected_en(){
			if(_("en").src=="contents/selected_en.png") return;
			_("en").src="contents/selected_en.png";
			_("en").title="[Selected]";
			_("tr").src="contents/tr.png";
			_("tr").title="Türkçe";
		}
		
		function selected_tr(){
			if(_("tr").src=="contents/selected_tr.png") return;
			_("tr").src="contents/selected_tr.png";
			_("tr").title="[Seçildi]";
			_("en").src="contents/en.png";
			_("en").title="English";
		}

		function accepted1(){
			_("result1").innerHTML= "<b class='checkmark' >✓</b>" ;
		}
		function declined1(){
			_("result1").innerHTML="<b class='errormark' >✘</b>";
		}
		
		function accepted2(){
			_("result2").innerHTML="<b class='checkmark' >✓</b>";
		}
		function declined2(){
			_("result2").innerHTML="<b class='errormark' >✘</b>";
		}
		
		function msgchanged(){
			var fname=_("message").value.substring(_("message").value.lastIndexOf("\\")+1);
			if (fname=="") fname="Dosya Seçilmedi!";
			else if(fname.length>20) 
			{
				var fullname=fname;
				fname=fname.substring(0,8)+"..."+fname.substring(fname.length-8,fname.length);
				_("msgname").innerHTML="<b title='"+fullname+"'>"+fname+"</b>";
				_("msguploader").innerHTML="<img src='contents/reupload.png'/ style='height:20px;'>";
				return;
			}
			_("msgname").innerHTML="<b>"+fname+"</b>";
			_("msguploader").innerHTML="<img src='contents/reupload.png'/ style='height:20px;'>";
		}

		function phtchanged(){
			var fname=_("image").value.substring(_("image").value.lastIndexOf("\\")+1);
			if (fname=="") fname="Dosya Seçilmedi!";
			else if(fname.length>20) 
			{
				var fullname=fname;
				fname=fname.substring(0,8)+"..."+fname.substring(fname.length-8,fname.length);
				_("phtname").innerHTML="<b title='"+fullname+"'>"+fname+"</b>";
				_("phtuploader").innerHTML="<img src='contents/reupload.png'/ style='height:20px;'>";
				return;
			}			_("phtname").innerHTML="<b>"+fname+"</b>";
			_("phtuploader").innerHTML="<img src='contents/reupload.png'/ style='height:20px;'>";
		}

		function auvdchanged(){
			var fname=_("audio_video").value.substring(_("audio_video").value.lastIndexOf("\\")+1);
			if (fname=="") fname="Dosya Seçilmedi!";
			else if(fname.length>20) 
			{
				var fullname=fname;
				fname=fname.substring(0,8)+"..."+fname.substring(fname.length-8,fname.length);
				_("auvdname").innerHTML="<b title='"+fullname+"'>"+fname+"</b>";
				_("auvduploader").innerHTML="<img src='contents/reupload.png'/ style='height:20px;'>";
				return;
			}			_("auvdname").innerHTML="<b>"+fname+"</b>";
			_("auvduploader").innerHTML="<img src='contents/reupload.png'/ style='height:20px;'>";
		}
		
		function errorReminder(){
		var val=document.getElementsByClassName("errormark");
		switch (val.length){
			case 3:
				reminder(val[2]);
			case 2:
				reminder(val[1]);	
			case 1:	
				reminder(val[0]);
			
		}
		}
		async function reminder(val){
			if(val.style.visibility=="hidden") val.style.visibility="visible";
			for(let i=0; i<2; i++)
				for (let j=0; j<2; j++){
					val.style.color="white";
					val.style.background="black";
					await sleep(500);
					val.style.color="red";
					val.style.background="black";
					await sleep(500);
					}
		val.style="";
		}
		
		function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}