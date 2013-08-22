jQuery(document).ready(function($) {
	(function() {
		alert('test');
		var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
			position = 0,
			$letter = $('#letter'),
			self = this;

		this.nextLetter = function() {
			position++;

			if (position > alphabet.length) {
				position = 0;
			}

			$letter.text(alphabet[position]);
		};

		this.resetLetter = function() {
			position = 0;
			$letter.text(alphabet[position]);
		};

		this.timer = setTimeout('self.nextLetter', 2000);

		$letter.click(function() {
			self.resetLetter();
		});
	})();
});