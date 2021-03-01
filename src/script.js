var scroll;// 스크롤
var lastScrollTop = 0;
var delta = 5; //시작위치
var headHeight = $('header').outerHeight();

$(window).scroll(function(event){
    scroll = true;

});

setInterval(function(){
   if(scroll){
      scrolling();
      scroll = false;
   }
})

function scrolling(){
   var st  = $(this).scrollTop(); // 현재 위치

   /* if(Math.abs(lastScrollTop -st) <= delta)
   return; */

   if(st> lastScrollTop && st > headHeight){
      $('header').addClass('headUp');
   }else{
      if(st + $(window).height()<$(document).height()){
         $('header').removeClass('headUp').addClass('navDown');
      }
   }
   lastScrollTop = st;
}

$(window).scroll(function(){
    var $section=$('section');
    var $menuDown = $(".hotFish");
    var $menuDown1 = $(".product");
 
    var $downStart =$menuDown.offset().top;
    var $downStart1 =$menuDown1.offset().top;
    
 
    if($(window).scrollTop() >= $downStart-500 && $(window).scrollTop() < $downStart1-300){
       $section.addClass('menuDown');
    }
 
 })

$(document).ready(function(){
   showImg();
   dropDown();
   imageSlide();
})

function showImg(){
    var $showImg = $(".mouseOver");
   //alert($showImg);
   $showImg.css({"opacity":0});
   $showImg.on("mouseenter",onMenu);
   $showImg.on("mouseleave",outMenu);
   function onMenu(){
      $(this).stop();
      $(this).fadeTo(700,1,"easeOutCubic");
   }
   
   function outMenu(){
      $(this).stop();
      $(this).fadeTo(700,0,"easeOutCubic");
   }
}

function dropDown(){
    var $dropDown=$(".mainMenu");
   
   $dropDown.on("mouseenter",showMenu)
   $dropDown.on("mouseleave",hideMenu)
   function showMenu(){
      $(this).children(".dropDown").stop().slideDown(200);
   }
   function hideMenu(){
      $(this).children(".dropDown").stop().slideUp(200);
   }
}

function imageSlide(){
    var $slide=$(".visualWrap");
    var $slideWidth=$slide.children().innerWidth();
    var timer;
   //alert($slideWidth);

    init();
    onPlay(); 
    inEvent(); 

    function init(){
        $slide.children().last().prependTo($slide);
        $slide.css({"left":-$slideWidth*2});
    }
    function inEvent(){      

      $(".next").on("click", onSlideNext);	
		$(".prev").on("click", onSlidePrev); 

      $(".visualImg").on("mouseenter", onStop); 
	   $(".visualImg").on("mouseleave", onPlay); 

    }    

    function onSlideNext(){  
      
      var currentPosition=parseInt($slide.position().left); 
      $slide.stop().animate({"left":currentPosition-$slideWidth},500,"easeOutCubic", function(){
        
        $slide.children().first().appendTo($slide); 
        $slide.css({"left": -$slideWidth*2}); 
        
      })	
      
    }
    
    function onSlidePrev(){  
      
      var currentPosition=parseInt($slide.position().left); 
      $slide.stop().animate({"left":currentPosition+$slideWidth},500,"easeOutCubic", function(){
         
        $slide.children().last().prependTo($slide); 
        $slide.css({"left": -$slideWidth*2}); 
        
      }) 
    }
    function onStop(){		      
      clearInterval(timer)  
    }    
    function onPlay(){ 
      timer=setInterval(onSlideNext, 2000); 
    }
}