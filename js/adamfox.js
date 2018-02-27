function isScrolledIntoFullView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function isScrolledIntoTopView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return (elemTop <= docViewBottom);
}

$(window).resize(function() {
	if($(window).width() < 1024){
		$('.description').css('transform', 'translate( 0px, 0px)');
	} else {
		$('.description').each(function () {
			if (isScrolledIntoTopView(this) === true) {
				$(this).css('transform', 'translate( 0px, ' + ($(window).scrollTop() + $(window).height() - $(this).parent().offset().top) / 8.5  + 'px )');
			}	
		});
	}
});

$(window).scroll(function() {
	if($(window).width() >= 1024){
		$('.description').first().css('transform', 'translate( 0px, ' + $(window).scrollTop() / 10  + 'px )');
		
		$('.description').slice(1).each(function () {
			if (isScrolledIntoTopView(this) === true) {
				$(this).css('transform', 'translate( 0px, ' + ($(window).scrollTop() + $(window).height() - $(this).parent().offset().top) / 8.5 + 'px )');
			}	
		});
	}
			
	$('.expertise > ul > li > div').each(function () {
		if (isScrolledIntoFullView(this) === true) {
			$(this).addClass('in-view')
		}
	});
	
	$('.history > ul > li:nth-child(1) > div').each(function () {
		if (isScrolledIntoFullView(this) === true) {
			$(this).parent().addClass('in-view')
		}
	});
	
	$('.history > ul > li:nth-child(2) > div').each(function () {
		if (isScrolledIntoFullView(this) === true) {
			$('.history > ul > li:nth-child(1)').addClass('line-animation');
			$(this).parent().addClass('in-view');
		}
	});
	
	$('.history > ul > li:nth-child(3) > div').each(function () {
		if (isScrolledIntoFullView(this) === true) {
			$('.history > ul > li:nth-child(2)').addClass('line-animation');
			$(this).parent().addClass('in-view');
		}
	});
	
	$('.history > ul > li:nth-child(4) > div').each(function () {
		if (isScrolledIntoFullView(this) === true) {
			$('.history > ul > li:nth-child(3)').addClass('line-animation');
			$(this).parent().addClass('in-view');
		}
	});
	
	$('.history > ul > li:nth-child(5) > div').each(function () {
		if (isScrolledIntoFullView(this) === true) {
			$('.history > ul > li:nth-child(4)').addClass('line-animation');
			$(this).parent().addClass('in-view');
		}
	});
	
	var scrollTop = $(window).scrollTop();
	
	if($("header").offset().top - $(window).scrollTop() <= 0) {
		$("header").addClass("on");
		$('#bg_main').fadeOut();
	} 
	if($(window).scrollTop() <= 0) {
		$("header").removeClass("on");
		$('#bg_main').fadeIn();
	}
	
// 	$(".about").css('margin-top', scrollTop + 'px');
/*
	$('#bg_main').css({
		opacity: function() {
			var elementHeight = $(this).height();
			return (elementHeight - (scrollTop)) / elementHeight;
		}
	}); 
*/
/*
	$('.test').css({
		opacity: function() {
			var elementHeight = $(this).height();
			return (elementHeight - scrollTop) / elementHeight;
		}
	}); 
*/
});

/*
$(document).ready(function () {
    var classes = new Array ('desktop', 'mobile', 'tablet');
    var length = classes.length;
    var links = $('.browser').slice(1);

    $.each( links, function(key, value) {
	    var theClass = classes[ Math.floor ( Math.random() * length ) ];
        $(value).addClass(theClass);
    });
    
    $('.browser').slice(1).each(function () {
	    if($(this).hasClass("desktop")) {
	        $(this).parent().find(".plus").addClass("disabled");
        } else if ($(this).hasClass("mobile")) {
        	$(this).parent().find(".minus").addClass("disabled");
        	$(this).parent().find("span").text("Mobile");
        } else {
	        $(this).parent().find("span").text("Tablet");
        }
	});
});
*/

$("header > .wrapper > .logo_af").click(function() {
	$("html, body").animate({ scrollTop: "0px" });
});


$(".btn_menu").click(function() {
	$(this).toggleClass('on');
	$('nav > ul').toggleClass('on');
	$('.logo_af').toggleClass('hidden');
	$('.logo_circle').toggleClass('hidden');
});

$(".main").click(function() {
	$('html, body').animate({ scrollTop: $("#experience").offset().top - 120 }, 2000);
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
		$(this).parent().children("span").text("Tablet");
	} else if($(this).parent().parent().parent().children(".browser").hasClass("tablet")) {
		$(this).parent().parent().parent().children(".browser").removeClass("tablet");
		$(this).parent().parent().parent().children(".browser").addClass("desktop");
		$(this).parent().children("span").text("Desktop");
		$(this).addClass("disabled");
	}
});

$(".minus").click(function() {
	$(".plus").removeClass("disabled");
	if($(this).parent().parent().parent().children(".browser").hasClass("tablet")) {
		$(this).parent().parent().parent().children(".browser").removeClass("tablet");
		$(this).parent().parent().parent().children(".browser").addClass("mobile");
		$(this).parent().children("span").text("Mobile");
		$(this).addClass("disabled");
	} else if($(this).parent().parent().parent().children(".browser").hasClass("mobile")) {
	} else {
		$(this).parent().parent().parent().children(".browser").removeClass("desktop");
		$(this).parent().parent().parent().children(".browser").addClass("tablet");
		$(this).parent().children("span").text("Tablet");
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