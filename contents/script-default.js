	/*Script File For EnDeCODER */
$(window).on("load",function(){loaderOut()});
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
	loaderIn();
	_('btnreset').removeAttribute('disabled');
    _("btnreset").click();
	_('btnreset').disabled=true;
	loaderOut();
}
});
		function loaderIn(){
			$("#container").fadeOut();
			$("#loader-wrapper").fadeIn();
		}
		
		function loaderOut(){
			$("#container").fadeIn();
			$("#loader-wrapper").fadeOut();
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
			alert(unexpectedFormat());
			
			_('audio_video').value=null;
			return false;
		}		
		
		if(val.files[0].size>10485760 || val.files[0].size<800000){
			alert(sizeError());
			_('audio_video').value=null;
			return false;
		}
		return true;
		}
		
		function photo_control(){
		var val = _('image'); 
		if (val.value=="") return false;		
		if (!(val.value.endsWith(".jpg") || val.value.endsWith(".png") || val.value.endsWith(".jpeg"))){ 
			alert(unexpectedFormat());
			_('image').value=null;
			return false;
		}
		if(val.files[0].size>2097152){
			alert(sizeError());
			_('image').value=null;
			return false;
		}
		return true;
		}

		function text_control(){ 
		var val = _('message'); 
		if(val.value=="") return;
		if (!(val.value.endsWith(".txt"))){ 
			alert(unexpectedFormat());
			_('message').value=null;
			return false;
		}
		return true;
		}

		function alphanum(val){
		if(val.length>5) {alert(unacceptedLength()); _("user_pass").value=""; $("#user_pass").attr('maxlength','5');}
		let letterNumber = "0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
       const myArray = val.split(""); 

		for (let i = 0; i < myArray.length; i++){
		if (!(letterNumber.includes(myArray[i]))){ 
			remove_nonalphanum(val);
			return false;
		}
		}
		return true;
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
			if(_("baseKey")!=null) if(!checkKeys()){ errorReminder(); if(_("key1").required!=true) return;}
			if(_("user_pass")!=null) if(!(alphanum(_("user_pass").value))){	alert(unvalidUserPass()); return;}
		if (_("messager")!=null) alert(_('messager').textContent); else if( $(".errormark").length ) errorReminder(); else {_('operation_form').submit(); loaderIn(); }
		}
		
		function selected_en(){
			if(_("en").title=="[Selected]") return;
			_("en").src="contents/selected_en.png";
			_("en").title="[Selected]";
			_("tr").src="contents/tr.png";
			_("tr").title="Türkçe";
			window.location.replace('/en');
		}
		
		function selected_tr(){
			if(_("tr").title=="[Seçildi]") return;
			_("tr").src="contents/selected_tr.png";
			_("tr").title="[Seçildi]";
			_("en").src="contents/en.png";
			_("en").title="English";
			window.location.replace('/');
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
			if (fname=="") fname=notSelected();
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
			if (fname=="") fname=notSelected();
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
			if (fname=="") fname=notSelected();
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
		let l=val.length;
		if(l>3) l=3;
		switch (l){
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