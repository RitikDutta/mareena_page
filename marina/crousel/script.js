$(document).ready(function() {
  // Initialize the carousel with the pause option set to false
  $('#myCarousel').carousel({
    pause: false,
    interval: 3000 // Example interval, adjust as needed
  });

  $("#myCarousel").on("slide.bs.carousel", function(e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 5; // Assuming you're showing 6 items as per your previous requirement
    var totalItems = $(".carousel-item").length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
      var it = itemsPerSlide - (totalItems - idx);
      for (var i = 0; i < it; i++) {
        // Append slides to end
        if (e.direction == "left") {
          $(".carousel-item").eq(i).appendTo(".carousel-inner");
        } else {
          $(".carousel-item").eq(0).appendTo($(this).find(".carousel-inner"));
        }
      }
    }
  });
});
