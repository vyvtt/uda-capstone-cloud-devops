$(document).ready(function () {
  function smoothScroll() {
    $('a[href^="#"]').click(function (event) {
      var target = $($(this).attr("href"));

      if (target.length) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 15,
          },
          300
        );
      }

      $(".nav").toggleClass("open");
    });
  }

  smoothScroll();
});
