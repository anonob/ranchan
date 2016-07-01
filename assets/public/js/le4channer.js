var le4channer = function() {
	var $window = $(window),
		$background = $('#background-sol')
		stripCount = 0,
		stripSpeed = 0,
		curStripCount = 0,
		curHeight = $(window).height(),
		curWidth = $(window).width();

	var createStrip = function(stripTag) {
		var $stripTag = (stripTag),
			img = '',
			imageCount = Math.max(30, Math.floor(curWidth / 50));

		for(var i = 0; i < imageCount; i++) {
			var rnFileType = Math.random();

			if(rnFileType < 0.62) {
				img = randInt(0, 305).toString() + '.jpg';
			} else {
				img = randInt(0, 192).toString() + '.gif';
			}

			$(stripTag).append('<img class=\"banner-img\" src=\"/images/banners/' + img + '\" alt=\"\>current year \>using alt-text\">');
		}
		curStripCount++;
	}

	var deleteStrip = function(stripTag) {
		$(stripTag).remove();
		curStripCount--;
	}

	var generateStrips = function() {
		var stripTag = '';
		stripCount = Math.ceil(curHeight / 75);
		stripSpeed = Math.floor(curWidth * 8);

		for(var i = 0; i < stripCount; i++) {
			stripTag = '#strip-' + i.toString();
			$background.append('<div class=\"bgs-le4channer-child\" id=\"strip-' + i.toString() + '\"></div>');
			createStrip(stripTag);
		}

		$('.bgs-le4channer-child').marquee({
			duration: stripSpeed,
			direction: 'left',
			css3easing: 'linear',
			delayBeforeStart: 0,
			duplicated: true,
			gap: 0,
			startVisible: true
		});
	}

	var removeStrips = function() {
		for(var i = 0; i < stripCount; i++) {
			stripTag = '#strip-' + i.toString();
			$(stripTag).remove();
		}
	}

	return {
		createStrip: createStrip,
		deleteStrip: deleteStrip,
		generateStrips: generateStrips,
		removeStrips: removeStrips
	};
}