function quickNav() {
	$("#quick-nav-btn").on("click", function() {
		if($("#quick-nav-icon").hasClass("glyphicon-chevron-right") == true) {
			if($(".content-filter").hasClass("slide-in") == true) {
				$(".content-filter").removeClass("slide-in");
			}
			$(".content-filter").addClass("slide-out");
			$(".content-filter").css("left", "24px");
			$(".content-filter").css("opacity", "1");
			$(".content-filter").css("transform", "translateX(24px)");

			if($(".site-source").hasClass("slide-in") == true) {
				$(".site-source").removeClass("slide-in");
			}
			$(".site-source").addClass("slide-out");
			$(".site-source").css("left", "24px");
			$(".site-source").css("opacity", "1");
			$(".site-source").css("transform", "translateX(48px)");

			$("#quick-nav-icon").addClass("glyphicon-chevron-left").removeClass("glyphicon-chevron-right");
		} else {
			if($(".content-filter").hasClass("slide-out") == true) {
				$(".content-filter").removeClass("slide-out");
			}
			$(".content-filter").addClass("slide-in");
			$(".content-filter").css("left", "-400px");
			$(".content-filter").css("opacity", "0");
			$(".content-filter").css("transform", "translateX(-48px)");

			if($(".site-source").hasClass("slide-out") == true) {
				$(".site-source").removeClass("slide-out");
			}
			$(".site-source").addClass("slide-in");
			$(".site-source").css("left", "-400px");
			$(".site-source").css("opacity", "0");
			$(".site-source").css("transform", "translateX(-246px)");

			$("#quick-nav-icon").addClass("glyphicon-chevron-right").removeClass("glyphicon-chevron-left");
		}
	});

	$("#content-filter-sfw").on("click", function() {
		if($(this).hasClass("active") == false) {
			if($("#content-filter-both").hasClass("active") == true) {
				$("#content-filter-both").removeClass("active");
			} else {
				$("#content-filter-nsfw").removeClass("active");
			}
			$("#content-filter-sfw").addClass("active");
		}
	});

	$("#content-filter-both").on("click", function() {
		if($(this).hasClass("active") == false) {
			if($("#content-filter-sfw").hasClass("active") == true) {
				$("#content-filter-sfw").removeClass("active");
			} else {
				$("#content-filter-nsfw").removeClass("active");
			}
			$("#content-filter-both").addClass("active");
		}
	});

	$("#content-filter-nsfw").on("click", function() {
		if($(this).hasClass("active") == false) {
			if($("#content-filter-sfw").hasClass("active") == true) {
				$("#content-filter-sfw").removeClass("active");
			} else {
				$("#content-filter-both").removeClass("active");
			}
			$("#content-filter-nsfw").addClass("active");
		}
	});
}