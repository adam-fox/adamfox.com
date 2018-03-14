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
	$('.social').each(function () {
		if (isScrolledIntoTopView(this) === true) {
			$(this).children('a').addClass('in-view');
		}
	});
	
	if (isScrolledIntoFullView('.expertise > ul > li:nth-child(1) > div') === true) {
		$('.expertise > ul > li > div').each(function(i){
			var row = $(this);
			setTimeout(function() {
				row.addClass('in-view');
			}, 100*i);
		});
	}
	
	$('.history > ul > li').each(function () {
		if (isScrolledIntoTopView(this) === true) {
			$(this).prev().addClass('line-animation');
			$(this).addClass('in-view');
		}
	});

	
	var scrollTop = $(window).scrollTop();
	
	if($("header").offset().top - $(window).scrollTop() <= 0) {
		$("header").addClass("on");
		$('#bg_main').fadeOut(1000);
	} 
	if($(window).scrollTop() <= 0) {
		$("header").removeClass("on");
		$('#bg_main').fadeIn();
	}
});



// init controller
/*
var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: 100}});

$(".expertise > ul > li > div").each(function (index, elem) {
	
	var myScene = new ScrollMagic.Scene({
        triggerElement: this,
        duration: 2000,
        triggerHook: "onEnter"
    })
    
	.setClassToggle(this, 'in-view')
// 	.removeClassToggle(false)
		.addIndicators()
	    .addTo(controller);
	
});
*/

/*
$(".history > ul > li").each(function (index, elem) {
	new ScrollMagic.Scene({triggerElement:elem, triggerHook: "onEnter"})
	.setClassToggle(elem, "line-animation") // add class toggle
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);
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

// **********
// TOUCHSWIPE
// **********

$(function() {      
	//Enable swiping...
	$(".browser").swipe( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			var browser = $(this);
			var paginationNext = browser.parent().children(".pagination").children(".on");
			if(browser.parent().children(".pagination").children("a").last().hasClass("on")){
				browser.css("transform","translate( -100vw ,0)");
				browser.parent().children(".pagination").children(".on").removeClass("on");
				browser.parent().children(".pagination").children("a").first().addClass("on");
				setTimeout(function() {
					browser.css("transition","none");
					browser.css("transform","translate( 100vw ,0)");
			    }, 250);
			    setTimeout(function() {
					browser.find(".viewport > img.desktop").css("left", "0%");
					browser.find(".viewport > img.tablet").css("left", "0%");
					browser.find(".viewport > img.mobile").css("left", "0%");
					browser.css("transition","all .25s linear");
					browser.css("transform","translate(0,0)");
			    }, 350);
			} else {
				paginationNext.next().trigger("click");
			}
			
		},
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			var browser = $(this);
			var paginationPrev = browser.parent().children(".pagination").children(".on").prev();
			if(browser.parent().children(".pagination").children("a").first().hasClass("on")){
				browser.css("transform","translate( 100vw ,0)");
				browser.parent().children(".pagination").children(".on").removeClass("on");
				browser.parent().children(".pagination").children("a").last().addClass("on");
				setTimeout(function() {
					browser.css("transition","none");
					browser.css("transform","translate( -100vw ,0)");
			    }, 250);
			    setTimeout(function() {
					browser.find(".viewport > img.desktop").css("left", "-" + browser.parent().children(".pagination").children("a").last().index() * 100 + "%");
					browser.find(".viewport > img.tablet").css("left", "-" + browser.parent().children(".pagination").children("a").last().index() * 100 + "%");
					browser.find(".viewport > img.mobile").css("left", "-" + browser.parent().children(".pagination").children("a").last().index() * 100 + "%");
					browser.css("transition","all .25s linear");
					browser.css("transform","translate(0,0)");
			    }, 350);
			} else {
				paginationPrev.trigger("click");
			}
		},
		threshold:25
	});
});


$(".pagination > a").click(function() {
	var paginationClicked = $(this);
	var paginationOn = $(this).parent().find('.on');
	
	if(!$(this).hasClass("on")) {
		
		if(paginationClicked.index() > paginationOn.index()) {
			paginationClicked.parent().parent().children(".browser").css("transform","translate( -100vw ,0)");
			paginationOn.removeClass("on");
			paginationClicked.addClass("on");
			setTimeout(function() {
				paginationClicked.parent().parent().children(".browser").css("transition","none");
				paginationClicked.parent().parent().children(".browser").css("transform","translate( 100vw ,0)");
				
		    }, 250);
		} else {
			paginationClicked.parent().parent().children(".browser").css("transform","translate( 100vw ,0)");
			paginationOn.removeClass("on");
			paginationClicked.addClass("on");
			setTimeout(function() {
				paginationClicked.parent().parent().children(".browser").css("transition","none");
				paginationClicked.parent().parent().children(".browser").css("transform","translate( -100vw ,0)");
		    }, 250);
		}
		setTimeout(function() {
			paginationClicked.parent().parent().find(".browser > .viewport > img.desktop").css("left", "-" + paginationClicked.index() * 100 + "%");
			paginationClicked.parent().parent().find(".browser > .viewport > img.tablet").css("left", "-" + paginationClicked.index() * 100 + "%");
			paginationClicked.parent().parent().find(".browser > .viewport > img.mobile").css("left", "-" + paginationClicked.index() * 100 + "%");
			paginationClicked.parent().parent().children(".browser").css("transition","all .25s linear");
			paginationClicked.parent().parent().children(".browser").css("transform","translate(0,0)");
	    }, 350);
	}	

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
	
	if(!$(this).hasClass("disabled")) {
		$(this).parent().children(".minus").removeClass("disabled");
		if($(this).parent().parent().parent().hasClass("mobile")) {
			if($(this).parent().parent().parent().find(".browser > .viewport > img.tablet")[0]) {
				$(this).parent().parent().parent().removeClass("mobile");
				$(this).parent().parent().parent().addClass("tablet");
				$(this).parent().children("span").text("Tablet");
				
				if(!$(this).parent().parent().parent().find(".browser > .viewport > img.desktop")[0]) {
					$(this).addClass("disabled");
				}
			} else if($(this).parent().parent().parent().find(".browser > .viewport > img.desktop")[0]) {
				$(this).parent().parent().parent().removeClass("mobile");
				$(this).parent().parent().parent().addClass("desktop");
				$(this).parent().children("span").text("Desktop");
				$(this).addClass("disabled");
			}
		} else if($(this).parent().parent().parent().hasClass("tablet")) {
			if($(this).parent().parent().parent().find(".browser > .viewport > img.desktop")[0]) {
				$(this).parent().parent().parent().removeClass("tablet");
				$(this).parent().parent().parent().addClass("desktop");
				$(this).parent().children("span").text("Desktop");
				$(this).addClass("disabled");
			}
		}
	}
});

$(".minus").click(function() {
	if(!$(this).hasClass("disabled")) {
		$(this).parent().children(".plus").removeClass("disabled");
		if($(this).parent().parent().parent().hasClass("tablet")) {
			if($(this).parent().parent().parent().find(".browser > .viewport > img.mobile")[0]) {
				$(this).parent().parent().parent().removeClass("tablet");
				$(this).parent().parent().parent().addClass("mobile");
				$(this).parent().children("span").text("Mobile");
				$(this).addClass("disabled");
			}
		} else if($(this).parent().parent().parent().hasClass("mobile")) {
		} else {
			if($(this).parent().parent().parent().find(".browser > .viewport > img.tablet")[0]) {
				$(this).parent().parent().parent().removeClass("desktop");
				$(this).parent().parent().parent().addClass("tablet");
				$(this).parent().children("span").text("Tablet");
				
				if(!$(this).parent().parent().parent().find(".browser > .viewport > img.mobile")[0]) {
					$(this).addClass("disabled");
				}
			} else if($(this).parent().parent().parent().find(".browser > .viewport > img.mobile")[0]) {
				$(this).parent().parent().parent().removeClass("desktop");
				$(this).parent().parent().parent().addClass("mobile");
				$(this).parent().children("span").text("Mobile");
				$(this).addClass("disabled");
			}
		}
	}
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
    
    $(links).each(function () {
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