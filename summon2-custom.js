 /*** SUMMON 2.0 CUSTOMIZATIONS ***/

$(document).ready(function() {

    // Thanks to Fairfield University, Virginia Tech, and the Summon listserv for the following fix
    // Wait for one second before executing the rest of this code.
    
    setTimeout(function() {
        myscope = angular.element('html').scope();
        localCustomizations();
    }, 1000);

    function localCustomizations() {

        // Add Search OhioLINK link
        $('div.customAuthBanner div ul').prepend('<li><a role="button" href="#" id="ohiolink-search" class="customColorsSiteLink">Search OhioLINK</a><i class="fa fa-external-link-square" aria-hidden="true"></i></li>');

        // Build the URL for the 'Search OhioLink' button
        $('a#ohiolink-search').click(function() {
            var hash = window.location.hash.slice(1);
            var array = hash.split("&");
            var values, form_data = {};

            for (var i = 0; i < array.length; i += 1) {
                values = array[i].split("=");
                form_data[values[0]] = values[1];
            }

            var searchterm = form_data['q'];
            window.location.href = 'http://olc1.ohiolink.edu/search/X?SEARCH=' + searchterm;
        });

        // Change the label "Preview" to "Details" in the search results
        $('div.togglePreview a').text('Details');
    };
  
}); 
