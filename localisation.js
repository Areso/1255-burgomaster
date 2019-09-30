include = function (url, fn) {
	var e = document.createElement("script");
	e.onload = fn;
	e.src = url;
	e.async=true;
	document.getElementsByTagName("head")[0].appendChild(e);
};
//entry point
//document.onload = loadStartLocale();
//now we need some language for start
function loadStartLocale(){
		//check whether browser support localStorage
		isLocalStorageSupport = checkLocalStorageSupport();
		if (isLocalStorageSupport===true) { //for all modern browsers, including IE8 and newer
			language = localStorage.getItem("areso-lang"); //try load
			if (language === null) {
				language = getBrowserLanguage();
			}
		} else {
			//read cookies and find language
			language = document.cookie.replace(/(?:(?:^|.*;\s*)areso-lang\s*\=\s*([^;]*).*$)|^.*$/, "$1");
			if (language === null) {
				language = getBrowserLanguage();
			}
		}
		if (language.indexOf('en')!==-1) {
			language = 'en-US';
		}
		if (language.indexOf('ru')!==-1) {
			language = 'ru-RU';
		}
		if (language.indexOf('de')!==-1) {
			language = 'de-DE';
		}
		if (language.indexOf('fr')!==-1) {
			language = 'fr-FR';
		}
		if (language.indexOf('fi')!==-1) {
			language = 'fi-FI';
		}
		locales = ['en-US','ru-RU','de-DE','eo','fr-FR','fi-FI'];
		default_locale = 'en-US';
		if (checkValue(language, locales)===1) {
			loadLocale(language);
		} else {
			loadLocale(default_locale);
		}
	}
function checkValue(value,arr){
		var status = -1;
		for(var i=0; i<arr.length; i++){
			var name = arr[i];
			if(name == value){
				status = 1;
				break;
			}
		}
		return status;
	}
function getBrowserLanguage() {
		//if not set, then
		try { //try to get the browser language
			language = navigator.language;
		} catch(e) { //in case we use IE9, IE8
			language = navigator.userLanguage;
		}
		if (language===null) {//just to be sure about IE9, IE8
			language = navigator.userLanguage;
		}
		return language;
	}
function checkLocalStorageSupport() {
		var test = 'test';
		try {
			localStorage.setItem(test, test);
			localStorage.removeItem(test);
			return true;
		} catch(e) {
			return false;
		}
	}
function loadLocale(language){
	file = 'langs/'+language+'.js';
	include(file,function(){
		//document.getElementById('lblPlayGame').innerHTML=localeStrings[0];
		console.log('we are in second level include');
		localeCallback(language);
	});
	isLocalStorageSupport = checkLocalStorageSupport();
	if (isLocalStorageSupport===true) { //for all modern browsers, including IE8 and newer
		localStorage.setItem("areso-lang", language); //try save
	} else {
		document.cookie = "areso-lang="+language;
	}
};
