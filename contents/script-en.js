	/*TR Script File For EnDeCODER */

		function reset_form(){
			_('operation').innerHTML="<fieldset id='operation'>"
			+"<legend>OPERATION TYPE</legend>"
			+"<h3>Select File Type.</h3>"
			+"</fieldset>";
			_('details').innerHTML="<fieldset id='details'>"
			+"<legend>OPERATION INFO</legend>"
			+"<h3 id='messager'>Select File and Operation Type.</h3>"
			+"</fieldset>";
			_('btnreset').disabled=true;
		}
	
		function selected_text(){ 
		_('operation').innerHTML="	<form id='operation' target=''>"
		+"<fieldset id='operation'>"
		+"<legend>OPERATION TYPE</legend>"
		+"<input type='radio' id='entxt' name='operation' value='encrypt' onchange='encrypt()'><label for='entxt'>Encrypt Text</label><br> "
		+"<input type='radio' id='detxt' name='operation' value='decrypt' onchange='decrypt()'><label for='detxt'>Decrypt Text</label><br> "
		+"</fieldset>"
		+"</form> "; 
			_('details').innerHTML="<fieldset id='details'>"
			+"<legend>OPERATION INFO</legend>"
			+"<h3 id='messager'>Select Operation Type.</h3>"
			+"</fieldset>";	
			_('btnreset').removeAttribute('disabled');
		}

		function encrypt(){
		_('details').innerHTML="	<form id='operation_form' action='exec?lang=en&op=enctext' method='POST' enctype='multipart/form-data' >"
		+"<fieldset id='details'>"
		+"<legend>OPERATION INFO</legend><table><tbody><tr><td colspan='4'>"
		+"<label>Select Text File To Be Encrypted.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='msguploader' for='message'>Select.</label><span id='msgname' class='inputrow'></span><input type='file' name='message' id='message' accept='.txt' onchange = 'msgchanged(); if(text_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td><input type='radio' id='key1' name='baseKey' value='key1' checked required ><label for='key1'>Base Key-1</label> </td>"
		+"<td><input type='radio' id='key2' name='baseKey' value='key2'  ><label for='key2'>Base Key-2</label></td> "
		+"<td><input type='radio' id='key3' name='baseKey' value='key3'  ><label for='key3'>Base Key-3</label></td> "
		+"<td><input type='radio' id='key4' name='baseKey' value='key4'  ><label for='key4'>Base Key-4</label></td>"
		+"<td><input type='radio' id='key5' name='baseKey' value='key5'  ><label for='key5'>Base Key-5</label></td>"
		+"<td><input type='radio' id='key6' name='baseKey' value='key6'  ><label for='key6'>Base Key-6</label><span id='errorcatcher'></span> </td></tr>"
		+"<tr><td colspan='4'><label>Type User Password.</label></td>"
		+"<td colspan='2'><input type='text' name='user_pass' id='user_pass' maxlength='5'  onkeyup='alphanum(this.value)' placeholder='User Password'><br>"
		+"</fieldset>"
		+"</form> ";
		}
		
		function decrypt(){ 
		_('details').innerHTML="	<form id='operation_form'  	action='exec?lang=en&op=dectext' method='POST' enctype='multipart/form-data' >"
		+"<fieldset id='details'>"
		+"<legend>OPERATION INFO</legend><table><tbody><tr><td colspan='4'>"
		+"<label>Select Text File To Be Decrypted.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='msguploader' for='message'>Select.</label><span id='msgname' class='inputrow'></span><input type='file' name='message' id='message' accept='.txt' onchange = 'msgchanged(); if(text_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"		
		+"<tr><td><input type='radio' id='key1' name='baseKey' value='key1' checked required ><label for='key1'>Base Key-1</label> </td>"
		+"<td><input type='radio' id='key2' name='baseKey' value='key2'  ><label for='key2'>Base Key-2</label></td> "
		+"<td><input type='radio' id='key3' name='baseKey' value='key3'  ><label for='key3'>Base Key-3</label></td> "
		+"<td><input type='radio' id='key4' name='baseKey' value='key4'  ><label for='key4'>Base Key-4</label></td>"
		+"<td><input type='radio' id='key5' name='baseKey' value='key5'  ><label for='key5'>Base Key-5</label></td>"
		+"<td><input type='radio' id='key6' name='baseKey' value='key6'  ><label for='key6'>Base Key-6</label> </td></tr>"
		+"<tr><td colspan='4'><label>Type User Password.</label></td>"
		+"<td colspan='2'><input type='text' name='user_pass' id='user_pass' maxlength='5'  onkeyup='alphanum(this.value)' placeholder='User Password'><br>"
		+"</fieldset>"
		+"</form> ";
		}
		

		function selected_photo(){ 
		_('operation').innerHTML="	<form id='operation' target=''>"
		+"<fieldset id='operation'>"
		+"<legend>OPERATION TYPE</legend>"
		+"<input type='radio' id='senpht' name='operation' value='secured_encode' onchange='secured_encode()'><label for='senpht'>Encode Operation With DES Encryption</label><br> "
		+"<input type='radio' id='enpht' name='operation' value='encode' onchange='encode()'><label for='enpht'>Encode Operation (Plaintext)</label><br> "
		+"<input type='radio' id='sdepht' name='operation' value='secured_decode' onchange='secured_decode()'><label for='sdepht'>Decode Operation With DES Encryption</label><br> "
		+"<input type='radio' id='depht' name='operation' value='secured_encode' onchange='decode()'><label for='depht'>Decode Operation (Plaintext)</label><br> "
		+"</fieldset>"
		+"</form> "; 
			_('details').innerHTML="<fieldset id='details'>"
			+"<legend>OPERATION INFO</legend>"
			+"<h3 id='messager'>Select Operation Type.</h3>"
			+"</fieldset>";		
			_('btnreset').removeAttribute('disabled');
		} 

		function secured_encode(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?lang=en&op=sencpht' method='POST' enctype='multipart/form-data' >"
		+"<fieldset id='details'>"
		+"<legend>OPERATION INFO</legend><table><tbody><tr><td colspan='4'>"
		+"<label>Select Image To Be Operated.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='phtuploader' for='image'>Select.</label><span id='phtname' class='inputrow'></span><input type='file' name='image' id='image' accept='image/png, image/jpg, image/jpeg' required onchange = 'phtchanged(); if(photo_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td colspan='4'><label>Select Text File To Be Embeded.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='msguploader' for='message'>Select.</label><span id='msgname' class='inputrow'></span><input type='file' name='message' id='message' accept='.txt' onchange = 'msgchanged(); if(text_control()) accepted2(); else declined2();'><span id='result2' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td><input type='radio' id='key1' name='baseKey' value='key1' checked required ><label for='key1'>Base Key-1</label> </td>"
		+"<td><input type='radio' id='key2' name='baseKey' value='key2'  ><label for='key2'>Base Key-2</label></td> "
		+"<td><input type='radio' id='key3' name='baseKey' value='key3'  ><label for='key3'>Base Key-3</label></td> "
		+"<td><input type='radio' id='key4' name='baseKey' value='key4'  ><label for='key4'>Base Key-4</label></td>"
		+"<td><input type='radio' id='key5' name='baseKey' value='key5'  ><label for='key5'>Base Key-5</label></td>"
		+"<td><input type='radio' id='key6' name='baseKey' value='key6'  ><label for='key6'>Base Key-6</label> </td></tr>"
		+"<tr><td colspan='4'><label>Type User Password.</label></td>"
		+"<td colspan='2'><input type='text' name='user_pass' id='user_pass' maxlength='5'  onkeyup='alphanum(this.value)' placeholder='User Password'>"
		+"</fieldset>"
		+"</form> ";
		}
		

		function encode(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?lang=en&op=encpht' method='POST' enctype='multipart/form-data' >"
		+"<fieldset id='details'>"
		+"<legend>OPERATION INFO</legend><table><tbody><tr><td colspan='4'>"
		+"<label>Select Image To Be Operated.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='phtuploader' for='image'>Select.</label><span id='phtname' class='inputrow'></span><input type='file' name='image' id='image' accept='image/png, image/jpg, image/jpeg' required onchange = 'phtchanged(); if(photo_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td colspan='4'><label>Select Text File To Be Embeded.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='msguploader' for='message'>Select.</label><span id='msgname' class='inputrow'></span><input type='file' name='message' id='message' accept='.txt' onchange = 'msgchanged(); if(text_control()) accepted2(); else declined2();'><span id='result2' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"</fieldset>"
		+"</form> ";
		}
		

		function secured_decode(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?lang=en&op=sdecpht' method='POST' enctype='multipart/form-data' >"
		+"<fieldset id='details'>"
		+"<legend>OPERATION INFO</legend><table><tbody><tr><td colspan='4'>"
		+"<label>Select Image To Be Operated.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='phtuploader' for='image'>Select.</label><span id='phtname' class='inputrow'></span><input type='file' name='image' id='image' accept='image/png, image/jpg, image/jpeg' required onchange = 'phtchanged(); if(photo_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td><input type='radio' id='key1' name='baseKey' value='key1' checked required ><label for='key1'>Base Key-1</label> </td>"
		+"<td><input type='radio' id='key2' name='baseKey' value='key2'  ><label for='key2'>Base Key-2</label></td> "
		+"<td><input type='radio' id='key3' name='baseKey' value='key3'  ><label for='key3'>Base Key-3</label></td> "
		+"<td><input type='radio' id='key4' name='baseKey' value='key4'  ><label for='key4'>Base Key-4</label></td>"
		+"<td><input type='radio' id='key5' name='baseKey' value='key5'  ><label for='key5'>Base Key-5</label></td>"
		+"<td><input type='radio' id='key6' name='baseKey' value='key6'  ><label for='key6'>Base Key-6</label> </td></tr>"
		+"<tr><td colspan='4'><label>Type User Password.</label></td>"
		+"<td colspan='2'><input type='text' name='user_pass' id='user_pass' maxlength='5'  onkeyup='alphanum(this.value)' placeholder='User Password'><br>"
		+"</fieldset>"
		+"</form> ";
		}
		

		function decode(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?lang=en&op=decpht' method='POST' enctype='multipart/form-data' >"
		+"<fieldset id='details'>"
		+"<legend>OPERATION INFO</legend><table><tbody><tr><td colspan='4'>"
		+"<label>Select Image To Be Operated.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='phtuploader' for='image'>Select.</label><span id='phtname' class='inputrow'></span><input type='file' name='image' id='image' accept='image/png, image/jpg, image/jpeg' required onchange = 'phtchanged(); if(photo_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span>"
		+"</fieldset>"
		+"</form> ";
		}
		
		
		function selected_audio_video(){ 
		_('operation').innerHTML="	<form id='operation' target=''>"
		+"<fieldset id='operation'>"
		+"<legend>OPERATION TYPE</legend>"
		+"<input type='radio' id='senauvd' name='operation' value='secured_encode' onchange='secured_encode_audio_video()'><label for='senauvd'>Encode Operation With DES Encryption</label><br> "
		+"<input type='radio' id='enauvd' name='operation' value='encode' onchange='encode_audio_video()'><label for='enauvd'>Encode Operation (Plaintext)</label><br> "
		+"<input type='radio' id='sdeauvd' name='operation' value='secured_decode' onchange='secured_decode_audio_video()'><label for='sdeauvd'>Decode Operation With DES Encryption</label><br> "
		+"<input type='radio' id='deauvd' name='operation' value='secured_encode' onchange='decode_audio_video()'><label for='deauvd'>Decode Operation (Plaintext)</label><br> "
		+"</fieldset>"
		+"</form> "; 
			_('details').innerHTML="<fieldset id='details'>"
			+"<legend>OPERATION INFO</legend>"
			+"<h3 id='messager'>Select Operation Type.</h3>"
			+"</fieldset>";		 
			_('btnreset').removeAttribute('disabled');
		} 
		
		function secured_encode_audio_video(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?lang=en&op=sencauvd' method='POST' enctype='multipart/form-data' >"
		+"<fieldset id='details'>"
		+"<legend>OPERATION INFO</legend><table><tbody><tr><td colspan='4'>"
		+"<label>Select Audio or Video File To Be Operated.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='auvduploader' for='audio_video'>Select.</label><span id='auvdname' class='inputrow'></span><input type='file' name='audio_video' id='audio_video' accept='audio/* , video/*' required onchange = 'auvdchanged(); if(audio_video_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td colspan='4'><label>Select Text File To Be Embeded.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='msguploader' for='message'>Select.</label><span id='msgname' class='inputrow'></span><input type='file' name='message' id='message' accept='.txt' onchange = 'msgchanged(); if(text_control()) accepted2(); else declined2();'><span id='result2' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td><input type='radio' id='key1' name='baseKey' value='key1' checked required ><label for='key1'>Base Key-1</label> </td>"
		+"<td><input type='radio' id='key2' name='baseKey' value='key2'  ><label for='key2'>Base Key-2</label></td> "
		+"<td><input type='radio' id='key3' name='baseKey' value='key3'  ><label for='key3'>Base Key-3</label></td> "
		+"<td><input type='radio' id='key4' name='baseKey' value='key4'  ><label for='key4'>Base Key-4</label></td>"
		+"<td><input type='radio' id='key5' name='baseKey' value='key5'  ><label for='key5'>Base Key-5</label></td>"
		+"<td><input type='radio' id='key6' name='baseKey' value='key6'  ><label for='key6'>Base Key-6</label> </td></tr>"
		+"<tr><td colspan='4'><label>Type User Password.</label></td>"
		+"<td colspan='2'><input type='text' name='user_pass' id='user_pass' maxlength='5'  onkeyup='alphanum(this.value)' placeholder='User Password'><br>"
		+"</fieldset>"
		+"</form> ";
		}
		
		
		function encode_audio_video(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?lang=en&op=encauvd' method='POST' enctype='multipart/form-data' >"
		+"<fieldset id='details'>"
		+"<legend>OPERATION INFO</legend><table><tbody><tr><td colspan='4'>"
		+"<label>Select Audio or Video File To Be Operated.</label>"
		+"<td colspan='2'></span><label class='inputrow' id='auvduploader' for='audio_video'>Select.</label><span id='auvdname' class='inputrow'></span><input type='file' name='audio_video' id='audio_video' accept='audio/* , video/*' required onchange = 'auvdchanged(); if(audio_video_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td colspan='4'><label>Select Text File To Be Embeded.</label></td>"
		+"<td colspan='2'></span><label class='inputrow' id='msguploader' for='message'>Select.</label><span id='msgname' class='inputrow'></span><input type='file' name='message' id='message' accept='.txt' onchange = 'msgchanged(); if(text_control()) accepted2(); else declined2();'><span id='result2' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"</fieldset>"
		+"</form> ";
		}
		
		
		function secured_decode_audio_video(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?lang=en&op=sdecauvd' method='POST' enctype='multipart/form-data' >"
		+"<fieldset id='details'>"
		+"<legend>OPERATION INFO</legend><table><tbody><tr><td colspan='4'>"
		+"<label>Select Audio or Video File To Be Operated.</label>"
		+"<td colspan='2'></span><label class='inputrow' id='auvduploader' for='audio_video'>Select.</label><span id='auvdname' class='inputrow'></span><input type='file' name='audio_video' id='audio_video' accept='audio/* , video/*' required onchange = 'auvdchanged(); if(audio_video_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span></td></tr>"
		+"<tr><td><input type='radio' id='key1' name='baseKey' value='key1' checked required ><label for='key1'>Base Key-1</label> </td>"
		+"<td><input type='radio' id='key2' name='baseKey' value='key2'  ><label for='key2'>Base Key-2</label></td> "
		+"<td><input type='radio' id='key3' name='baseKey' value='key3'  ><label for='key3'>Base Key-3</label></td> "
		+"<td><input type='radio' id='key4' name='baseKey' value='key4'  ><label for='key4'>Base Key-4</label></td>"
		+"<td><input type='radio' id='key5' name='baseKey' value='key5'  ><label for='key5'>Base Key-5</label></td>"
		+"<td><input type='radio' id='key6' name='baseKey' value='key6'  ><label for='key6'>Base Key-6</label> </td></tr>"
		+"<tr><td colspan='4'><label>Type User Password.</label></td>"
		+"<td colspan='2'><input type='text' name='user_pass' id='user_pass' maxlength='5'  onkeyup='alphanum(this.value)' placeholder='User Password'></td></tr></tbody></table>"
		+"</fieldset>"
		+"</form> ";
		}
		

		function decode_audio_video(){ 
		_('details').innerHTML="	<form id='operation_form' action='exec?lang=en&op=decauvd' method='POST' enctype='multipart/form-data' >"
		+"<fieldset id='details'>"
		+"<legend>OPERATION INFO</legend><table><tbody><tr><td colspan='4'>"
		+"<label>Select Audio or Video File To Be Operated.</label>"
		+"<td colspan='2'></span><label class='inputrow' id='auvduploader' for='audio_video'>Select.</label><span id='auvdname' class='inputrow'></span><input type='file' name='audio_video' id='audio_video' accept='audio/* , video/*' required onchange = 'auvdchanged(); if(audio_video_control()) accepted1(); else declined1();'><span id='result1' class='inputrow'><b class='errormark' style='visibility:hidden;'>✘</b></span>"
		+"</fieldset>"
		+"</form> ";
		}

		function notSelected(){return "Not Selected!";}
		function unexpectedFormat(){return "Unexpected Format!";}
		function sizeError(){return "File Size Error!";}
		function unvalidUserPass(){return "Unvalid User Password!";}
		function unacceptedLength(){return "Unaccepted User Password Length!";}