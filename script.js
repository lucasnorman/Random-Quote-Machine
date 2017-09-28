<script>
    function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }


    var currentQuote = '', currentAuthor = '';

    function openURL(url){
      window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1, location=0, statusbar=0, menubar=0, resizable=0');
    };

    function getQuote() {
      $.ajax({
        headers: {
          "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
        success: function(r) {
          if (typeof r === 'string') {
           r = JSON.parse(r);
          }
          currentQuote = r.quote;
          currentAuthor = r.author;
          if(inIframe())
          {
            $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
          }
          $(".quote").animate({
              opacity: 0
            }, 500,
            function() {
              $(this).animate({
                opacity: 1
              }, 500);
              $('#text').text(r.quote);
            });

          $(".quote-author").animate({
              opacity: 0
            }, 500,
            function() {
              $(this).animate({
                opacity: 1
              }, 500);
              $('#author').html(r.author);
            });


          $("#new-quote").on("click", function() {


        changeImage(). getQuote();


        });
        }
      });
    }

    function changeImage() {
        var src = "https://api.unsplash.com/photos/random?client_id=336b527b2e18d045045820b78062b95c825376311326b2a08f9b93eef7efc07b";
        $.getJSON(src, function(result){
            $('body').css('background-image', 'url('+ result.urls.full +')');

        });
    };


    $(document).ready(function() {
      getQuote();
      changeImage();
      $('#new-quote').on('click', getQuote);
      $('#tweet-quote').on('click', function() {
        if(!inIframe()) {
          openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        }
      });
    });
</script>
