/*!
 * pGenerator jQuery Plugin v1.0.0
 * http://accountspassword.com/password-generator-jquery-plugin
 *
 * Created by AccountsPassword.com
 * Released under the MIT License (Feel free to copy, modify or redistribute this plugin.)
 *
 */

(function($){
	// Shuffling an Array in JavaScript (by kirupa)
	// https://www.kirupa.com/html5/shuffling_array_js.htm
	Array.prototype.shuffle = function() {
		var input = this;

		for (var i = input.length - 1; i >= 0; i--) {
			var randomIndex = Math.floor(Math.random() * (i + 1));
			var itemAtIndex = input[randomIndex];

			input[randomIndex] = input[i];
			input[i] = itemAtIndex;
		}

		return input;
	}

	String.prototype.shuffle = function() {
		return this.split('').shuffle().join('');
	}

	var charset = new Array();
	var $pGeneratorElement = null;
	var methods = {
		init : function (options, callbacks) {
			var settings = $.extend({
				'bind': 'click',
				'passwordElement': null,
				'displayElement': null,
				'passwordLength': 16,
				'uppercase': true,
				'lowercase': true,
				'numbers':   true,
				'specialChars': false,
				'onPasswordGenerated': function(generatedPassword) { }
			}, options);

			var setdef = !(settings.uppercase || settings.lowercase || settings.numbers || settings.specialChars);

			if (settings.uppercase || setdef) charset[charset.length] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			if (settings.lowercase || setdef) charset[charset.length] = 'abcdefghijklmnopqrstuvwxyz';
			if (settings.numbers || setdef) charset[charset.length] = '0123456789';
			if (settings.specialChars) charset[charset.length] = ' !"#$%&\'()*+-,-./:;<=>?@[\\]^_`{|}';
			if (settings.passwordLength < 8) settings.passwordLength = 8;

			charset = charset.shuffle();

			return this.each(function() {
				$pGeneratorElement = $(this);

				$pGeneratorElement.bind(settings.bind, function(e){
					e.preventDefault();
					methods.generatePassword(settings);
				});
			});
		},

		generatePassword: function(settings) {
			var passwordString = '';
			while (passwordString.length < settings.passwordLength) {
				for (var i = 0; i < charset.length; i++) if (passwordString.length < settings.passwordLength) passwordString += charset[i].shuffle().substring(0, 1);
			}
			passwordString = passwordString.shuffle();

			if(settings.passwordElement !== null) {
				$(settings.passwordElement).val(passwordString);
			}

			if(settings.displayElement !== null) {
				if($(settings.displayElement).is("input")) {
					$(settings.displayElement).val(passwordString);
				} else {
					$(settings.displayElement).text(passwordString);
				}
			}

			settings.onPasswordGenerated(passwordString);
		}
  };

	$.fn.pGenerator = function(method) {
		if (methods[method]) {
			return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.pGenerator' );
		}
	};

})(jQuery);
