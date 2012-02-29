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

});