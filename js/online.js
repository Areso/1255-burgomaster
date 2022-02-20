	reglogin  = "reg";
	session   = "";
	log_dom   = document.getElementById("console_n_chat");
	chat_dom  = document.getElementById("chat");
	mod_dom   = document.getElementById("moderation_area");
	nick_dom  = document.getElementById("inp_nickname");
	msg_dom   = document.getElementById("msg_out");
	btn_send  = document.getElementById("btnSend");
	btn_mod   = document.getElementById("mod_btn");
	//init timers
	if (config.online && config.pullMessages){
		setInterval(fpullMessages, config.pullMessagesMS);
		setInterval(pullPremodMessages, 5000);
		setInterval(getNearestEventTime, 10000);
		setInterval(pullAmber, 3000);
	}
	//functions
	function remoteRegLogin() {
		if (reglogin==="reg"){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState === 4 && this.status === 201) {
					if (config.debug){
						console.log(session);
						console.log(this.responseText)
					}
					resp_data = JSON.parse(this.responseText);
					session   = resp_data["session"];
					msg       = "registered successfully";
					postEventLog(msg);
					msg       = "you got a 'registered user' badge and 10 ambers";
					postEventLog(msg);
				}
			};
			fpullMessages();
			login     = document.getElementById("login").value;
			password  = document.getElementById("password").value;
			email     = document.getElementById("password").value;
			dataToParse  = login    + delimiter;
			dataToParse += password + delimiter;
			dataToParse += email;
			endpoint    = webserver + "/api/v1.1/register_user";
			xhttp.open("POST", endpoint, true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send(dataToParse);
		}
		if (reglogin==="login"){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState === 4 && this.status === 200) {
					if (config.debug){
						console.log(session);
						console.log(this.responseText);
					}
					resp_data = JSON.parse(this.responseText);
					session   = resp_data["session"];
					game.role = resp_data["role"];
					msg = "login successfull";
					postEventLog(msg);
					fpullMessages();
				}
				if (this.readyState === 4 && this.status !== 200) {
					if (config.debug){
						console.log(session);
						console.log(this.responseText);
					}
					resp_data = JSON.parse(this.responseText);
					msg = "login unsuccessfull, please try again";
					postEventLog(msg);
				}
			};
			login       = document.getElementById("login").value;
			password    = document.getElementById("password").value;
			dataToParse = login+delimiter+password;
			endpoint    = webserver + "/api/v1.1/login_user";
			xhttp.open("POST", endpoint, true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send(dataToParse);
		}
	}
	function fpullMessages() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				messages = JSON.parse(this.responseText);
				if (config.debug){
					console.log(messages);
				}
				document.getElementById("server-status").innerHTML="Up";
				chat_dom.innerHTML = "";
				messages.forEach(printToChat);
			}
			if (this.readyState === 4 && this.status !== 200) {
				document.getElementById("server-status").innerHTML="Down";
			}
		};
		endpoint  = webserver + "/api/v1.1/pull_messages";
		xhttp.open("GET", endpoint, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send();
	}
function pullPremodMessages() {
	if (game.role==="mod" || game.role==="admin"){
		console.log("the role is OK");
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			console.log(this.status);
			console.log(this.readyState);
			if (this.readyState === 4 && this.status === 200) {
				console.log("GOT THE ANSWER")
				messages = JSON.parse(this.responseText);
				console.log(messages)
				if (config.debug){
					console.log(messages);
				}
				mod_dom.innerHTML = "";
				messages.forEach(printToMod);
			}
		};
		endpoint  = webserver + "/api/v1.1/pull_premod_messages";
		dataToParse = session+delimiter;
		xhttp.open("POST", endpoint, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(dataToParse);
	}
}
	function printToMod(item) {
		mod_box = mod_dom;
		let tzoffset   = (new Date()).getTimezoneOffset() * 60000;
		let usertime   = new Date(item[2]*1000);
		usertime       = usertime.toLocaleTimeString();
		line_to_print  = "["+usertime+"] ";
		role           = item[4];
		nickname       = "<span id='"+item[0]+"' onclick='ruleOverUser(this.id)'>"+item[0]+"</span>";
		msg_id         = item[3];
		msg_text       = item[1];
		line_to_print += nickname+": ";
		if (role !=="admin" && role !=="mod") {
			line_to_print +="<span id='"+msg_id+"' onclick='ruleOverMsg(this.id)'>"+msg_text+"</span>";
		} else {
			line_to_print +=msg_text;
		}
		mod_box.innerHTML += line_to_print+"<br>";
	}
	function pullAmber() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				the_resp = JSON.parse(this.responseText);
				console.log(the_resp);
				document.getElementById("gems").innerHTML = the_resp.amber;
			}
			if (this.readyState === 4 && this.status !== 200) {
				document.getElementById("gems").innerHTML = 0
			}
		};
		endpoint    = webserver + "/api/v1.1/get_user_amber";
		dataToParse = session+delimiter;
		xhttp.open("POST", endpoint, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(dataToParse);
	}
function reloadSettings() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			the_resp = JSON.parse(this.responseText);
			console.log("settings reloaded");
		}
	};
	endpoint    = webserver + "/api/v1.1/reload_settings";
	dataToParse = session+delimiter;
	xhttp.open("POST", endpoint, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(dataToParse);
}
function reloadBanned() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			the_resp = JSON.parse(this.responseText);
			console.log("banned users reloaded");
		}
	};
	endpoint    = webserver + "/api/v1.1/reload_banned_users";
	dataToParse = session+delimiter;
	xhttp.open("POST", endpoint, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(dataToParse);
}
	function printToChat(item) {
		chat_box = chat_dom;
		let tzoffset   = (new Date()).getTimezoneOffset() * 60000;
		let usertime   = new Date(item[2]*1000);
		usertime       = usertime.toLocaleTimeString();
		line_to_print  = "["+usertime+"] ";
		role           = item[4];
		nickname       = "<span id='"+item[0]+"' onclick='banUser(this.id)'>"+item[0]+"</span>";
		if (role==="admin"){
			nickname = "<span style='color:#DCAA07'><abbr title='The Admin'>"+item[0]+"</abbr></span>";
		}
		if (role==="mod"){
			nickname ="<span style='color:#319F0D'><abbr title='A moderator'>"+item[0]+"</abbr></span>";
		}
		if (role==="bot"){
			nickname ="<span style='color:#133bd2'><abbr title='The bot'>"+item[0]+"</abbr></span>";
		}
		if (role==="contributor"){
			nickname ="<span style='color:#ff1100'><abrr title='A contibutor'>"+item[0]+"</abbr></span>";
		}
		msg_id         = item[3];
		msg_text       = item[1];
		line_to_print += nickname+": ";
		if (role !=="admin" && role !=="mod") {
			line_to_print +="<span id='"+msg_id+"' onclick='deleteMsg(this.id)'>"+msg_text+"</span>";
		} else {
			line_to_print +=msg_text;
		}
		chat_box.innerHTML += line_to_print+"<br>";
		//temporarily disabled
		/*
		var textarea = chat_box;
		if(textarea.selectionStart === textarea.selectionEnd) {
			textarea.scrollTop = textarea.scrollHeight;
		}*/
		if (game.role==="admin" || game.role==="mod") {
			if (btn_mod.style.visibility!=="visible"){
				btn_mod.style.visibility="visible";
				mod_dom.style.visibility="visible";
				console.log("make visible");
			}
		} else {
			if (btn_mod.style.visibility!=="hidden"){
				btn_mod.style.visibility="hidden";
				console.log("make it hidden");
			}
		}
	}
	function sendOnClick2() {
		send2();
	}
	msg_dom.onkeypress = function(e) {
		if(e.keyCode === 13) {
			send2();
		}
	}
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	allowMsg = 1;
	function cooldownMsg(){
		allowMsg = 1;
	}
	function send2(){
		if (allowMsg===1){
			sending_msg  = msg_dom.value;
			sending_msg  = sending_msg.replace(/[^a-zA-ZА-Яа-я0-9 .?-]/g, '');
			stop = false;
			if (sending_msg.length>0 && stop===false){
				allowMsg = 0;
				setInterval(cooldownMsg, 5000);
				sending_auth = nick_dom.value;
				msg_dom.value = "";
				console.log("the message out values is "+sending_msg);
				console.log("the author out values is "+sending_auth);
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState === 4 && this.status === 200) {
						console.log("message sent");
						answ_session = JSON.parse(this.responseText);
						answ_session = answ_session.session;
						if (session===""){
							session = answ_session;
						}
						fpullMessages();
					}
				};
				target = 0;
				dataToParse = sending_auth+delimiter+session+delimiter;
				dataToParse+= sending_msg+delimiter+target;
				endpoint  = webserver + "/api/v1.1/send_message";
				xhttp.open("POST", endpoint, true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(dataToParse);
			}
		} 
	}
	msgid_to_del = -1;
	function ruleOverUser(name){
		if (game.role==="admin" || game.role ==="mod"){
				console.log("we are deciding the further faith of ")
				console.log(name);
				user_to_allow = name;
				showModal(1, '', allowUser, "Do you allow this user write directly?", "Yes, allow", "No");
		}
	}
	function allowUser(){
		if (answer === 2) {
			if (game.role==="admin" || game.role ==="mod"){
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState === 4 && this.status === 200) {
						if (config.debug){
							console.log("user allowed");
						}
						fpullMessages();
					}
				};
				target      = 0;
				dataToParse = session+delimiter+user_to_allow;
				endpoint    = webserver + "/api/v1.1/allow_user";
				xhttp.open("POST", endpoint, true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(dataToParse);
			}
		}
	}
	function ruleOverMsg(msgid){
		if (game.role==="admin" || game.role ==="mod"){
				console.log("we are deciding the further faith of ")
				console.log(msgid);
				msgid_to_allow = msgid;
				showModal(1, '', allowMessage, "Do you allow this msg?", "Yes, allow", "No");
		}
	}
	function allowMessage(){
		if (answer === 2) {
			if (game.role==="admin" || game.role ==="mod"){
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState === 4 && this.status === 200) {
						if (config.debug){
							console.log("message deleted");
						}
						fpullMessages();
					}
				};
				console.log("POST query to allow with msgid_to_allow");
				console.log(msgid_to_del);
				dataToParse = session+delimiter+msgid_to_allow;
				endpoint    = webserver + "/api/v1.1/allow_message";
				xhttp.open("POST", endpoint, true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(dataToParse);
			}
		}
	}
	function deleteMsg(msgid){
		if (game.role==="admin" || game.role ==="mod"){
				console.log("we are deleting")
				console.log(msgid);
				msgid_to_del = msgid;
				showModal(1, '', deleteMsgPost, "Do you wanna delete the message?", "Yes", "No");
		}
	}
	function deleteMsgPost(){
		if (answer === 2) {
			if (game.role==="admin" || game.role ==="mod"){
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState === 4 && this.status === 200) {
						if (config.debug){
							console.log("message deleted");
						}
						fpullMessages();
					}
				};
				target = 0;
				console.log("POST query to delete with msgid_to_del");
				console.log(msgid_to_del);
				dataToParse = session+delimiter+msgid_to_del;
				endpoint    = webserver + "/api/v1.1/delete_message";
				xhttp.open("POST", endpoint, true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(dataToParse);
			}
		}
	}
	user_to_ban = "";
	function banUser(name){
		if (game.role==="admin" || game.role ==="mod"){
			user_to_ban = name;
			showModal(1, '', banUserPost, "Do you wanna ban the user?", "Yes", "No")
		}
	}
	function banUserPost(){
		if (answer === 2) {
			if (game.role==="admin" || game.role ==="mod"){
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState === 4 && this.status === 200) {
						if (config.debug){
							console.log("user banned");
						}
					}
				};
				target = 0;
				dataToParse = session+delimiter+user_to_ban;
				endpoint    = webserver + "/api/v1.1/ban_user";
				xhttp.open("POST", endpoint, true);
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhttp.send(dataToParse);
			}
		}
	}
	function getNearestEventTime () {
		back_response = null;
		eventHelpMsg  = null;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				back_response = JSON.parse(this.responseText);
				//console.log(back_response);
				cntdwn = back_response["countdown"];
				cntdwn = cntdwn.replace("(","");
				cntdwn = cntdwn.replace(")","");
				cntdwn = cntdwn.split(",");
				//console.log(cntdwn);
				flag_event_started = parseInt(back_response["event_started"]);
				event_timer_lbl = document.getElementById("event-label");
				event_timer_val = document.getElementById("event-value");
				eventTimerVal  =     cntdwn[0]+localeStrings[165][0];
				eventTimerVal += " "+cntdwn[1]+localeStrings[165][1];
				eventTimerVal += " "+cntdwn[2]+localeStrings[165][2];
				if (flag_event_started===0){
					event_timer_lbl.innerHTML="New Year event will start in ";
					event_timer_val.innerHTML=eventTimerVal;
					
				} else {
					//TODO THAT URGENT!
					//BUT NOT TODAY
					//game.getEventDetails();
					event_timer_lbl.innerHTML="New Year event will end in ";
					event_timer_val.innerHTML=eventTimerVal;
				}
				console.log(eventHelpMsg);
				//document.getElementById("lblEventCountdownValue").innerHTML = lblMsg;
				//document.getElementById("lblEventCountdownValue").disabled = false;
			} else {
				//document.getElementById("lblEventCountdownValue").disabled = true;
			}
		};
		endpoint    = webserver + "/api/v1.1/event_countdown";
		xhttp.open("GET", endpoint, true);
		xhttp.send();
	}
	users_online = document.getElementById("lbl_online_value");
	websocket = new WebSocket(ws_server);
	websocket.onmessage = function (event) {
		data = JSON.parse(event.data);
		switch (data.type) {
			case 'users':
				users_online.textContent = (
				data.count.toString() + " user" +
				(data.count == 1 ? "" : "s"));
				break;
			default:
				console.error("unsupported event", data);
		}
	}
function send_gen_items(items_no){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			console.log("items sent");
			answ_session = JSON.parse(this.responseText);
			answ_session = answ_session.session;
		}
	};
	dataToParse = session+delimiter;
	dataToParse+= items_no;
	endpoint  = webserver + "/api/v1.1/record_new_map_details";
	xhttp.open("POST", endpoint, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(dataToParse);
}
//TODO ToDo To Do
function save_to_cloud(savegame_to_cloud){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			console.log("game saved to the cloud successfully");
			msg       = "game saved to the cloud successfully";
			postEventLog(msg);
		}
		if (this.readyState === 4 && this.status !== 200) {
			msg       = "game didn't saved to the cloud. You should be logined to the game before you could save the game";
			postEventLog(msg);
		}
	};
	dataToParse = session+delimiter;
	dataToParse+= savegame_to_cloud;
	endpoint  = webserver + "/api/v1.1/save_game";
	xhttp.open("POST", endpoint, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(dataToParse);
}
function cloudQuickLoad(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			console.log("got the savegame, trying to load it");
			try {
				resp      = JSON.parse(this.responseText);
				save64    = resp.content;
				console.log(save64);
				console.log("we try to load the imported save");
				saveLine  = atob(save64);
				saveArray = saveLine.split(delimiter);
				gameTemp  = JSON.parse(saveArray[0]);
				overrideGame(gameTemp);
			} catch(err) {
				postEventLog(localeStrings[327],"bold,red");
				console.log(err);
			}
		}
		if (this.readyState === 4 && this.status !== 200) {
			msg       = "game didn't saved to the cloud. You should be logined to the game before you could save the game";
			postEventLog(msg);
		}
	};
	dataToParse = session+delimiter;
	endpoint    = webserver + "/api/v1.1/get_savegame";
	xhttp.open("POST", endpoint, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(dataToParse);
}
function getEventDetails () {
	/*
	back_response_evt_details = null;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			back_response_evt_details = JSON.parse(this.responseText);
			console.log(back_response_evt_details);
			textToTab = back_response_evt_details["msgToPlayer"];
			document.getElementById("lblEventDetails").innerHTML = textToTab;
		} else {
			//
		}
	};
	xhttp.open("GET", "http://armata.ga:5000/api/v1.0/get_event_details?uid="+game.UID, true);
	xhttp.send();
	*/
}
function getEventLeaderboard () {
	/*
	back_response_evt_details = null;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			back_response_evt_details = JSON.parse(this.responseText);
			console.log(back_response_evt_details);
			textToTab = back_response_evt_details["msgToPlayer"];
			document.getElementById("lblEventLBDetails").innerHTML = textToTab;
		} else {
			//
		}
	};
	xhttp.open("GET", "http://armata.ga:5000/api/v1.0/get_event_leaderboard?uid="+game.UID, true);
	xhttp.send();
	*/
}
function eventItemCollected () {
	console.log("item collected");
	back_response_ItemCollected = null;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			back_response_ItemCollected = JSON.parse(this.responseText);
			console.log(back_response_ItemCollected);
			postEventLog(localeStrings[58][1]);
		}
		if (this.readyState === 4 && this.status !== 200) {
			postEventLog(locObj.couldntRecordPledge.txt);
		}
	};
	endpoint  = webserver + "/api/v1.1/event_item_collected";
	dataToParse = session;
	xhttp.open("POST", endpoint, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(dataToParse);
}
function getEventHelp(){
	if (flag_event_started===1){
		showModal(0, '', getAck, locObj.eventNewYear.txt,  localeStrings[60], '')
	}
}


