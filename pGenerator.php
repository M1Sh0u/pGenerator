<?php
	function generatePassword ($length = 16, $uppercase = true, $lowercase = true, $numbers = true, $special = false) {
		$default = !($uppercase or $lowercase or $numbers or $special);
		if ($numbers or $default) $charset[] = '0123456789';
		if ($lowercase or $default) $charset[] = 'abcdefghijklmnopqrstuvwxyz';
		if ($special) $charset[] = ' !"#$%&\'()*+-,-./:;<=>?@[\\]^_`{|}';
		if ($uppercase or $default) $charset[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

		if ($length < 8 ) $length = 8;

		shuffle($charset);

		$password = null;
		while (strlen($password) < $length) {
			foreach ($charset as $chars) if (strlen($password) < $length) $password .= substr(str_shuffle($chars), -1);
		}
		return str_shuffle($password);
	}
?>
