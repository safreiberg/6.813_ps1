// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to = "English";
	var lang_from = "Spanish";
	var current_dict = dicts[lang_to][lang_from]; // keys: words in @lang_to,
													// values: corresponding
													// words in @lang_from

	get_lang_from = function(){
		return lang_from;
	};
	get_lang_to = function(){
		return lang_to;
	};
	
	random_word = function(){
		var element_count = 0;
		for (e in current_dict) { element_count++; }
		var j = Math.floor(Math.random()*element_count);
		for (var i in current_dict){
			if (j == 0){
				$('div.from_word').html('<span style="color:black">'+current_dict[i]+'</span>');
				return i;
			}
			j = j-1;
		}
	};
	
	see_answer = function(){
		document.getElementById('guess').value = '';
		random_word();
		document.getElementById('guess').focus();
	};

});