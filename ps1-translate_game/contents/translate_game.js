// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to = "English";
	var lang_from = "Spanish";
	var actual;
	var current_dict = dicts[lang_to][lang_from]; // keys: words in @lang_to,
	// values: corresponding
	// words in @lang_from

	var element_count = 0;
	for (e in current_dict) {
		element_count++;
	}

	keys = [];

	for ( var i in current_dict) {
		keys.push(i);
	}

	/**
	 * Getters for lang_to and lang_from
	 */
	get_lang_from = function() {
		return lang_from;
	};
	get_lang_to = function() {
		return lang_to;
	};

	random_word = function() {
		var j = Math.floor(Math.random() * element_count);
		for ( var i in current_dict) {
			if (j == 0) {
				$('div.from_word').html(
						'<span style="color:black">' + current_dict[i]
								+ '</span>');
				return i;
			}
			j = j - 1;
		}
	};

	/**
	 * Called on each submit.
	 */
	see_answer = function(guess) {
		$("#guess").autocomplete("close");
		update_first(actual, guess);
		actual = random_word();
		document.getElementById('guess').focus();
		$('#guess').val('');
	};

	/**
	 * Credit here:
	 * http://www.tek-tips.com/viewthread.cfm?qid=1523454
	 * For this stub.
	 */
	handle_enter = function(inField, e) {
		var charCode = 0;

		if (e && e.which) {
			charCode = e.which;
		} else if (window.event) {
			e = window.event;
			charCode = e.keyCode;
		}

		if (charCode == 13) {
			if (document.getElementById('guess').value == ''){
				document.getElementById('guess').value = '(no guess)';
			}
			document.getElementById('submit_button').click();
		}
	};

	/**
	 * Should be run once at page load.
	 */
	set_langs = function() {
		$("h1:first").html(
				'Translate from <span style="color:black">' + get_lang_from()
						+ '</span> to <span style="color:black">'
						+ get_lang_to() + '</span>');
		$('#from_lang').html(lang_from);
		$('#to_lang').html(lang_to);
	};

	/**
	 * Called once at page load.
	 */
	start = function() {
		set_langs();
		actual = random_word();
		document.getElementById('guess').focus();
	};		

	/**
	 * Updates the top entry for correctness.
	 */
	update_first = function(actual, guess) {
		if (guess == ''){
			guess = '(no guess)';
		}
		update_rest();
		if (actual == guess) {
			// correct
			$('div.first_question').html(
					'<span style="color:blue">' + current_dict[actual]
							+ '</span>');
			$('div.first_answer').html(
					'<span style="color:blue">' + actual + '</span>');
			$('div.first_correct').html( '<span style="font-size:20"> &#x2713 </span>' +
					'<span style="visibility:hidden; font-color:#eeeeee; font-size:40;">A</span>');
		} else {
			// incorrect
			$('div.first_question').html(
					'<span style="color:red">' + current_dict[actual]
							+ '</span>');
			$('div.first_answer').html(
					'<span style="color:red; text-decoration:line-through;">'
							+ guess + '</span>');
			$('div.first_correct').html(
					'<span style="color:red">' + actual + '</span>');
		}
	};

	update_rest = function() {
		var rest1 = document.getElementById('rest_col1').innerHTML;
		var rest2 = document.getElementById('rest_col2').innerHTML;
		var rest3 = document.getElementById('rest_col3').innerHTML;
		$('#rest_col1').html(document.getElementById('first_question').innerHTML + '<br />' + rest1);
		$('#rest_col2').html(document.getElementById('first_answer').innerHTML + '<br />' + rest2);
		$('#rest_col3').html(document.getElementById('first_correct').innerHTML + '<br />' + rest3);
	};
	
	$(function() {
		$("input").autocomplete({
			source: keys,
			minLength: 2,
			select: function(event,ui){
				document.getElementById('guess').value = ui.item.value;
				// chrome...
				if (!$.browser.mozilla){
					document.getElementById('submit_button').click();
				}
				return false;
			}
		});
	});

});