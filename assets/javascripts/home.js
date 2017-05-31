function initSlides( $slides ) {
  $slides.unslider({
    autoplay: true,
    infinite: true,
    arrows: false,
    delay: 5000
  });

  $slides.on({
    "mouseover": function() {
      $slides.unslider("stop");
    },
    "mouseout": function() {
      $slides.unslider("start");
    }
  });
}

$(document).ready(function() {
  initSlides($(".Content-slides"));
});
