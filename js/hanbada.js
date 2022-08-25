$(document).ready(function(){

//mb
$('.hamburger').on("click",function(){
    $("#mobile-nav").slideDown(1000);
    $("#nope").addClass("on");
    $("#bg-effect").addClass("blur-e")
});
$('#nope').on("click",function(){
    $("#mobile-nav").slideUp(1000);
    $("#nope").removeClass("on");
    $("#bg-effect").removeClass("blur-e")
});
$(".mb-srch").on("click" , function(){
    $(".mb-sc").slideDown(1000);
});
$('html').on("click",function(){
    $(".mb-sc").slideUp(1000);
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
    var delta = 5; // 이벤트를 발생시킬 스크롤의 이동 범위
    var navbarHeight = $("#pc-header").outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250); // 스크롤이 멈춘 후 동작이 실행되기 까지의 딜레이

    function hasScrolled() {
        var st = $(this).scrollTop(); // 현재 window의 scrollTop 값

        // delta로 설정한 값보다 많이 스크롤 되어야 실행된다.
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight){
            // 스크롤을 내렸을 때
            $("#pc-header").slideUp("fast"); // header 숨기기
        } else {
            // 스크롤을 올렸을 때
            if(st + $(window).height() < $(document).height()) {
                $("#pc-header").slideDown("fast"); // header 보이기
            }
        }

        lastScrollTop = st; // 현재 멈춘 위치를 기준점으로 재설정
    }
})



/*practices*/
$('#more-box').on("click", function(){
    $('.toggle_row').slideToggle(600 , 'swing' );
    $('#more-box').toggleClass("on");
    $('.below').toggleClass("on");
});

//success
//$("#next").on("click",function(){ $('.s-all').animate({left:'-=443'} , 1000);
/*
var i = 1;

$("#next").on("click",function(){
    i++;
    $('.s-all').animate({ left : '-=443'}, 1000 );
    if(i>4){
        
        //alert('');
		//return false; //이후의 실행코드를 실행하지 않음
        $(this).prop("disabled",true);
	}else{
        $(this).prop("disabled",false);
    }
});

$("#prev").on("click",function(){
    i--;
    $('.s-all').animate({ left : '+=443'}, 1000 );
    if(i<1){
		//return false; //이후의 실행코드를 실행하지 않음
        $(this).prop('disabled',true);
	}else{
        $(this).prop("disabled",false);
    }
});
*/

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
var current = 0; //현재 슬라이드 인덱스
var set=1; //한 조를 이루어 함께 이동하는 슬라이드의 갯수
var total = $(".profile").length; //전체 슬라이드 갯수
var show=2; //css로 보여지도록 지정한 슬라이드 갯수
//이동함수
function fnSlide(idx){
	fnChk(idx);
	$(".pro-contents").animate({
		left:-(350 * set) * idx //같이 이동하는 갯수 * 클릭수
	});
	current=idx; //현재 슬라이드 갱신
}

//다음버튼 클릭시
$("#next1").on("click",function(){
	fnSlide(current + 1);
});

//이전 버튼 클릭시
$("#prev1").on("click",function(){
	fnChk(current - 1);
	if (current ==0 ){
		return false;
	}else{
		fnSlide(current - 1);
	}
});

//버튼클릭 횟수를 매개변수로 받아서 이전이후 버튼의 노출 여부를 결정하는 함수
function fnChk(cnum){
	var left = cnum * set; //왼쪽의 아이템은 다음버튼 클릭수(idx) * 같이 이동하는 갯수
	var right = total - (left + show); //오른쪽 아이템은 전체 갯수 - 왼쪽갯수 + 보녀지는 갯수

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

fnChk(0); //버튼을 한 번도 클릭하지 않은 상태로 처음 실행


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
	//$("#info").text($("html").scrollTop());

	var pos = $("html").scrollTop();

    $("#mobile-header")[pos>=700 ? "addClass" : "removeClass"]("on");

    $(".practices-title")[pos>=400 ? "addClass" : "removeClass"]("on");

    $("#pc-header")[pos>=1400 ? "addClass" : "removeClass"]("up");

    $("#success-all")[pos>=1200 ? "addClass" : "removeClass"]("on");

    $(".board-top")[pos>=1900 ? "addClass" : "removeClass"]("on");

    $("table")[pos>=2100 ? "addClass" : "removeClass"]("on");

    $(".pro-contents")[pos>=3000 ? "addClass" : "removeClass"]("on");
    $("#pro-btn")[pos>=3000 ? "addClass" : "removeClass"]("on");

});




});