var curStripCount = 0;
var curHeight = $(window).height();

function addStrip(stripTag) {
	var img = "",
		imageCount = Math.max(30, Math.floor($(window).width() / 50));

	for(var i = 0; i < imageCount; i++) {
		var rnFileType = Math.random();

		if(rnFileType < 0.62) {
			img = randInt(0, 305).toString() + ".jpg";
		} else {
			img = randInt(0, 192).toString() + ".gif";
		}

		$(stripTag).append("<img class=\"banner-img\" src=\"/images/banners/" + img + "\" alt=\"\>current year \>using alt-text\">");
	}

	curStripCount++;
}

function delStrip(stripTag) {
	$(stripTag).remove();
	curStripCount--;
}

function genStrips() {
	var $window = $(window),
		$marqueeContainer = $("#marquee-container"),
		stripTag = "",
		stripCount = Math.ceil($window.height() / 75),
		speed = Math.floor($window.width() * 8);

	for(var i = 0; i < stripCount; i++) {
		stripTag = "#strip-" + i.toString();
		$marqueeContainer.append("<div class=\"marquee\" id=\"strip-" + i.toString() + "\"></div>");
		addStrip(stripTag);
	}

	$(".marquee").marquee({
		duration: speed,
		direction: "left",
		css3easing: "linear",
		delayBeforeStart: 0,
		duplicated: true,
		gap: 0,
		startVisible: true
	});
	/*$window.resize(function resize(){
    	console.log(curHeight.toString() + "/" + $window.height().toString() + "/" + curStripCount.toString());
        if ($window.height() <= curHeight - 100) {
            stripTag = "#strip-" + curStripCount.toString();
            delStrip(stripTag);
            curHeight = $window.height();
        } else if($window.height() >= curHeight + 100) {
			stripTag = "#strip-" + curStripCount.toString();
			$marquee.append("<div class=\"marquee\" id=\"strip-" + curStripCount.toString() + "\"></div>");
			addStrip(stripTag);
        	curHeight = $window.height();
        }
    }).trigger("resize");*/
}