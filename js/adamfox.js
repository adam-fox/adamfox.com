function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$(window).scroll(function() {
/*
	$('.container').each(function(){
		$(this).css('margin-top', - $(window).scrollTop() / $(this).attr('scrollSpeed'));
	});
*/

	$('.expertise > ul > li').each(function () {
		if (isScrolledIntoView(this) === true) {
			$(this).addClass('in-view')
		}
	});
	
	$('.history > ul > li:nth-child(1)').each(function () {
		if (isScrolledIntoView(this) === true) {
			$(this).addClass('in-view')
		}
	});
	
	$('.history > ul > li:nth-child(2)').each(function () {
		if (isScrolledIntoView(this) === true) {
			$('.history > ul > li:nth-child(1)').addClass('line-animation');
			$(this).addClass('in-view');
		}
	});
	
	$('.history > ul > li:nth-child(3)').each(function () {
		if (isScrolledIntoView(this) === true) {
			$('.history > ul > li:nth-child(2)').addClass('line-animation');
			$(this).addClass('in-view');
		}
	});
	
	$('.history > ul > li:nth-child(4)').each(function () {
		if (isScrolledIntoView(this) === true) {
			$('.history > ul > li:nth-child(3)').addClass('line-animation');
			$(this).addClass('in-view');
		}
	});
	
	$('.history > ul > li:nth-child(5)').each(function () {
		if (isScrolledIntoView(this) === true) {
			$('.history > ul > li:nth-child(4)').addClass('line-animation');
			$(this).addClass('in-view');
		}
	});
	
	var scrollTop = $(window).scrollTop();
	
	if($("header").offset().top - $(window).scrollTop() <= 0) {
		$("header").addClass("on");
	} 
	if($(window).scrollTop() <= 0) {
		$("header").removeClass("on");
	}
	$('#bg_main').css({
		opacity: function() {
			var elementHeight = $(this).height();
			return (elementHeight - (scrollTop)) / elementHeight;
		}
	}); 
/*
	$('.test').css({
		opacity: function() {
			var elementHeight = $(this).height();
			return (elementHeight - scrollTop) / elementHeight;
		}
	}); 
*/
});

$(document).ready(function () {
    var classes = new Array ('', 'mobile', 'tablet');
    var length = classes.length;
    var links = $('.browser');

    $.each( links, function(key, value) {
        var theClass = classes[ Math.floor ( Math.random() * length ) ];
        $(value).addClass(theClass);
        if(theClass === "") {
	        $(value).parent().find(".plus").addClass("disabled");
        } else if (theClass === "mobile") {
        	$(value).parent().find(".minus").addClass("disabled");
        }
    });
});

$(".logo_af").click(function() {
	$("html, body").animate({ scrollTop: "0px" });
});


$(".btn_menu").click(function() {
	$(this).toggleClass('on');
	$('nav > ul').toggleClass('on');
	$('.logo_af').toggleClass('hidden');
	$('.logo_circle').toggleClass('hidden');
});

var animationEvent = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

$(".btn").click(function () {
	if(!$(this).hasClass("disabled")) {
		$(this).addClass('on');
		$(this).one(animationEvent, function(event) {
			$(this).removeClass('on');
		});
	}
});

$(".plus").click(function() {
	$(".minus").removeClass("disabled");
	if($(this).parent().parent().parent().children(".browser").hasClass("mobile")) {
		$(this).parent().parent().parent().children(".browser").removeClass("mobile");
		$(this).parent().parent().parent().children(".browser").addClass("tablet");
	} else if($(this).parent().parent().parent().children(".browser").hasClass("tablet")) {
		$(this).parent().parent().parent().children(".browser").removeClass("tablet");
		$(this).parent().parent().parent().children(".browser").addClass("desktop");
		$(this).addClass("disabled");
	}
});

$(".minus").click(function() {
	$(".plus").removeClass("disabled");
	if($(this).parent().parent().parent().children(".browser").hasClass("tablet")) {
		$(this).parent().parent().parent().children(".browser").removeClass("tablet");
		$(this).parent().parent().parent().children(".browser").addClass("mobile");
		$(this).addClass("disabled");
	} else if($(this).parent().parent().parent().children(".browser").hasClass("mobile")) {
	} else {
		$(this).parent().parent().parent().children(".browser").removeClass("desktop");
		$(this).parent().parent().parent().children(".browser").addClass("tablet");
	}
});

/*
 $(function(){
	$('.browser').okshadow({
		color: 'rgba(0,0,0,.5)',
		xMax: 2000,
		yMax: 2000,
		yOffset: 100,
		fuzzMin: 500,
		fuzzMax: 500,
	});
});
*/