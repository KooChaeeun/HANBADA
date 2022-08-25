$(document).ready(function(){

//mb
$('.hamburger').on("click",function(){
    $("#mobile-nav").slideDown(1000);
    $("#nope").addClass("on");
    $("#bg-effect").addClass("blur-e");
});
$('#nope').on("click",function(){
    $("#mobile-nav").slideUp(1000);
    $("#nope").removeClass("on");
    $("#bg-effect").removeClass("blur-e");
});
$(".mb-srch").on("click" , function(){
    $(".mb-sc").slideDown(1000);
    $("#bg-effect").addClass("on");
    $(".mb-no").addClass("on");
});
$('.mb-no').on("click",function(){
    $(".mb-sc").slideUp(1000);
    $("#bg-effect").removeClass("on");
    $(".mb-no").removeClass("on");
});


$(".lang").on("click" , function(){
    $(".lang-select").slideToggle(1000);
});
$(".search").on("click" , function(){
    $(".search-container").slideDown(1000);
    $("#bg-effect").addClass("on");
});
$('.close_btn').on("click" , function(){
    $(".search-container").slideUp(1000);
    $("#bg-effect").removeClass("on");
});



/*scroll header*/
$(function () {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5; 
    var navbarHeight = $("#pc-header").outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250); 

    function hasScrolled() {
        var st = $(this).scrollTop();

        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight){
            // 스크롤 내렸을 때
            $("#pc-header").slideUp("fast");
        } else {
            // 스크롤 올렸을 때
            if(st + $(window).height() < $(document).height()) {
                $("#pc-header").slideDown("fast");
            }
        }

        lastScrollTop = st;
    }
})



/*practices*/
$('#more-box').on("click", function(){
    $('.toggle_row').slideToggle(600 , 'swing' );
    $('#more-box').toggleClass("on");
    $('.below').toggleClass("on");
});

//success

$("#next").on("click",function(){
    $(".s-all").animate({ //ul에 이동포지션 지정
            left:"-443px"
        },{
            complete:function(){ //이동 애니메이션 후에
            var $clone=$(".s-all .s-content").first().clone();
            $(".s-all").append($clone);
            $(".s-content").first().remove();
            $(".s-all").css({"left":"0px"}); //ul의 위치 원상복귀
            },
            duration:1000
        });
    });


    $("#prev").on("click",function(){
    $(".s-all").css({"left":"-443px"});
    $(".s-all").stop().animate({
        left:"0px"
        },{
            start:function(){
                var $clone=$(".s-content").last().clone();
                $(".s-all").prepend($clone);
                $(".s-content").last().remove();
            }
            ,duration:1000
        });
    
    });


//professinals
var current = 0; 
var set=1; 
var total = $(".profile").length;
var show=2; 
//이동함수
function fnSlide(idx){
	fnChk(idx);
	$(".pro-contents").animate({
		left:-(350 * set) * idx 
	});
	current=idx; 
}


$("#next1").on("click",function(){
	fnSlide(current + 1);
});


$("#prev1").on("click",function(){
	fnChk(current - 1);
	if (current ==0 ){
		return false;
	}else{
		fnSlide(current - 1);
	}
});


function fnChk(cnum){
	var left = cnum * set; 
	var right = total - (left + show); 

	if((left>0)&&(right<show)){
		$("#prev1").css("display","block");
		$("#next1").css("display","none");
	}
	if((left>0)&&(right>0)){
		$("#prev1").css("display","block");
		$("#next1").css("display","block");
	}
	if((left<=0)&&(right>show)){
		$("#prev1").css("display","none");
		$("#next1").css("display","block");
	}
}

fnChk(0); 


var $target = $(".pro-contents");
var fx = 0;
var winWidth = $(window).innerWidth();

$target.on("mousedown",function(){
	var offset = $(this).offset();
	fx = event.pageX - offset.left;
	fnMouseMove();
});
function fnMouseMove(){
	$("html").on("mousemove",function(){
		event.preventDefault();
		var newX = event.pageX - fx;

		var maxLeft = $target.width() - winWidth;
		if(newX < -maxLeft){
			newX = -maxLeft;
		}

		if(newX > 0){
			newX=0;
		}
		$target.css({
			left:newX
		});
	});

	$("html").on("mouseup",function(){
		$(this).off();
	});
}

//scroll effect
$(window).on("scroll",function(){
	$("#info").text($("html").scrollTop());

	var pos = $("html").scrollTop();

    $("#mobile-header")[pos>=700 ? "addClass" : "removeClass"]("on");

    $(".practices-title")[pos>=400 ? "addClass" : "removeClass"]("on");

    $("#pc-header")[pos>=1400 ? "addClass" : "removeClass"]("up");

    $("#success-all")[pos>=900 ? "addClass" : "removeClass"]("on");

    $(".board-top")[pos>=1600 ? "addClass" : "removeClass"]("on");

    $("table")[pos>=1800 ? "addClass" : "removeClass"]("on");

    $(".pro-contents")[pos>=2500 ? "addClass" : "removeClass"]("on");
    $("#pro-btn")[pos>=2500 ? "addClass" : "removeClass"]("on");

});




});