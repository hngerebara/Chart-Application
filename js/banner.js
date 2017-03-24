$(document).ready(function(){
 var pic = $("#banner");
 var left = 10;
 var top = 10;
 var hidden = 1021;

 setInterval(function(){
 	if(left === 90){
 		left= 10;
 		top = 10;
 		}
 	pic.attr('style','background-position:'+(left+=1)+"% "+(left+=1)+"%;");
 },200);
});

$(document).ready(function(){ 

var currentIndex = 0,
 items = $('.container div'),
 itemAmt = items.length;

function cycleItems() {
  var item = $('.container div').eq(currentIndex);
  items.hide();
  item.css('display','inline-block');
}

var autoSlide = setInterval(function() {
  currentIndex += 1;
  if (currentIndex > itemAmt - 1) {
    currentIndex = 0;
  }
  cycleItems();
}, 3000);

$('.next').click(function() {
  clearInterval(autoSlide);
  currentIndex += 1;
  if (currentIndex > itemAmt - 1) {
    currentIndex = 0;
  }
  cycleItems();
});

$('.prev').click(function() {
  clearInterval(autoSlide);
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = itemAmt - 1;
  }
  cycleItems();
});

});