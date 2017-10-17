// automatic slide show
var slideIndex = 0;

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function onSignIn(googleUser) {
    console.log("sign in");
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

$(document).ready(function(){
     autoShowSlides();
});

function autoShowSlides() {
   var i;
   var slides = document.getElementsByClassName("mySlides");
   for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
   }
   slideIndex++;
   if (slideIndex> slides.length) {slideIndex = 1}
   slides[slideIndex-1].style.display = "block";
   setTimeout(autoShowSlides, 2000); // Change image every 2 seconds
}
// end of slide show

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });


  // save input
$("#bar").keypress(function(e) {
    if (e.which === 13) {  //checks whether the pressed key is "Enter"
        var input = $("#bar").val();
        console.log("http://api.shopstyle.com/api/v2/products?pid=uid9216-39734904-2&fts=" + encodeURIComponent(input) + "&offset=0&limit=10");
        $.get("https://api.shopstyle.com/api/v2/products?pid=uid9216-39734904-2&fts=" + encodeURIComponent(input) + "&offset=0&limit=10", function(data){

           // ITERATE THROUGH ALL PRODUCTS IN DATA.PRODUCTS ARRAY
          for(var i = 0; i < data.products.length; i++) {
            var name = data.products[i].name;
            var imgURL = data.products[i].image.sizes.Original.url;
            var price = data.products[i].price;
            var retailer = data.products[i].retailer.name;
             var inStock = data.products[i].inStock;
             var sizes = ""
              for (var j = 0; j  < data.products[i].sizes.length; j++){
                sizes += data.products[i].sizes[j].name + " "
              }

    console.log(sizes);
             // BUILD BOXES 
             // $('someElement').append(HMTL FOR BOXES)
             // WRITE CODE HERE 
             var htmlString = `<div class="col-sm-4 portfolio-item">
            <div class="portfolio-link" href="#portfolioModal1" data-toggle="modal">
              <div class="caption">` + name + ` $` + price + `sizes:  ` + sizes + `
                <div class="caption-content"> 
                </div>
              </div>
                <div class="portfolio-link" href="#portfolioModal1" data-toggle="modal">
              <div class="caption">`+ ` instore:` + inStock + ` `+  retailer + ` 
                <div class="caption-content">  
                </div>
              </div>
              <img class="img-fluid" src="` + imgURL + `#" alt="">
            </div>
          </div>`
             $('#filter').append(htmlString);
             // DONT WRITE CODE PAST THIS POINT
          }
      });
      return false;
    }
});

  // ends-->
  
// stores name
// function othername() {
    
//     alert(input);
// }

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Closes responsive menu when a link is clicked
  $('.navbar-collapse>ul>li>a').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Collapse the navbar when page is scrolled
  $(window).scroll(function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });

  // Floating label headings for the contact form
  $(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

})(jQuery);

// slides

var slideIndex = 0;

$(document).ready(function(){
     autoShowSlides();
     google.maps.event.addDomListener(window, 'load', initialize);
});

function autoShowSlides() {
   var i;
   var slides = document.getElementsByClassName("mySlides");
   for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";
   }
   slideIndex++;
   if (slideIndex> slides.length) {slideIndex = 1}
   slides[slideIndex-1].style.display = "block";
   setTimeout(autoShowSlides, 20000); // Change image every 2 seconds
}
// end of slide show

function initialize() {
  var pyrmont = new google.maps.LatLng(-33.8665, 151.1956);

  var map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15,
    scrollwheel: false
  });

  // Specify location, radius and place types for your Places API search.
  var request = {
    location: pyrmont,
    radius: '500',
    types: ['store']
  };

  // Create the PlaceService and send the request.
  // Handle the callback with an anonymous function.
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        // If the request succeeds, draw the place location on
        // the map as a marker, and register an event to handle a
        // click on the marker.
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      }
    }
  });
}

// Run the initialize function when the window has finished loading.

// // redirect to results
// <a href="home" id="home">home</a>

// $('#success').click(function(){
// $(document).scrollTop(100) // any value you need
// });