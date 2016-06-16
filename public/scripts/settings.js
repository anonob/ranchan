function settings() {
	var filters = ["#quicknav .content-filter-sfw, #fullnav .content-filter-sfw", 
		"#quicknav .content-filter-both, #fullnav .content-filter-both", 
		"#quicknav .content-filter-nsfw, #fullnav .content-filter-nsfw"];
	var filterEnum = {
		sfw: 1,
		both: 2,
		nsfw: 3
	};
	var filterState = filterEnum.both;

		$("#quicknav-btn").on("click", function() {
			if($("#quicknav-icon").hasClass("fa-chevron-right") == true) {
				if($("#quicknav .content-filter").hasClass("slide-in") == true) {
					$("#quicknav .content-filter").removeClass("slide-in");
				}
				$("#quicknav .content-filter").addClass("slide-out");
				$("#quicknav .content-filter").css("left", "24px");
				$("#quicknav .content-filter").css("opacity", "1");
				$("#quicknav .content-filter").css("transform", "translateX(24px)");

				if($("#quicknav .site-source").hasClass("slide-in") == true) {
					$("#quicknav .site-source").removeClass("slide-in");
				}
				$("#quicknav .site-source").addClass("slide-out");
				$("#quicknav .site-source").css("left", "24px");
				$("#quicknav .site-source").css("opacity", "1");
				$("#quicknav .site-source").css("transform", "translateX(48px)");

				$("#quicknav-icon").addClass("fa-chevron-left").removeClass("fa-chevron-right");
			} else {
				if($("#quicknav .content-filter").hasClass("slide-out") == true) {
					$("#quicknav .content-filter").removeClass("slide-out");
				}
				$("#quicknav .content-filter").addClass("slide-in");
				$("#quicknav .content-filter").css("left", "-400px");
				$("#quicknav .content-filter").css("opacity", "0");
				$("#quicknav .content-filter").css("transform", "translateX(-48px)");

				if($("#quicknav .site-source").hasClass("slide-out") == true) {
					$("#quicknav .site-source").removeClass("slide-out");
				}
				$("#quicknav .site-source").addClass("slide-in");
				$("#quicknav .site-source").css("left", "-400px");
				$("#quicknav .site-source").css("opacity", "0");
				$("#quicknav .site-source").css("transform", "translateX(-246px)");

				$("#quicknav-icon").addClass("fa-chevron-right").removeClass("fa-chevron-left");
			}
		});

		$(filters[filterEnum.sfw - 1]).on("click", function() {
			if(filterState != filterEnum.sfw) {
				$(filters[filterEnum.sfw - 1]).addClass("active");
				$(filters[filterState - 1]).removeClass("active");
				filterState = filterEnum.sfw;
			}
		});

		$(filters[filterEnum.both - 1]).on("click", function() {
			if(filterState != filterEnum.both) {
				$(filters[filterEnum.both - 1]).addClass("active");
				$(filters[filterState - 1]).removeClass("active");
				filterState = filterEnum.both;
			}
		});

		$(filters[filterEnum.nsfw - 1]).on("click", function() {
			if(filterState != filterEnum.nsfw) {
				$(filters[filterEnum.nsfw - 1]).addClass("active");
				$(filters[filterState - 1]).removeClass("active");
				filterState = filterEnum.nsfw;
			}
		});

		$("#fullnav-btn").on("click", function() {
			$("#fullnav").appendTo("body").modal("show");
		});
}