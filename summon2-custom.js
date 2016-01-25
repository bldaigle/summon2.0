 /*** SUMMON 2.0 CUSTOMIZATIONS ***/

$(document).ready(function() {

    // Thanks to Fairfield University, Virginia Tech, and the Summon listserv for the following fix
    // Wait for one second before executing the rest of this code. Necessary after an Oct 15 Summon release
    
    setTimeout(function() {
        myscope = angular.element('html').scope();
        localCustomizations();
    }, 1000);

    function localCustomizations() {

        // Load custom stylesheet from library webserver
        $("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"http://library.owu.edu/summon/summon-custom-css.css\" />");
    
        // Remove the old Summon 1.0 "custom link" text from the navigation bar
        $('.siteLinks a[ng-if="link.type == \'custom\'"]').remove();

        // Remove the Help link
        $('.siteLinks div[link-class="help"]').remove();

        // Remove the Language menu
        $('div.languageSwitcher').remove();
        
        // Add the Search OhioLINK button
        $('.savedItemsFolderContainer').after('<div id=\"ohiolink-passthrough\" text=\"Search OhioLINK\"><a class="newbutton hidden-tablet hidden-phone" id="ohiolink-search" href="#">Search OhioLINK</a>&nbsp;&nbsp;</div>');
        $('.siteLinks div.chat').after('<div id=\"ohiolink-passthrough\" text=\"Search OhioLINK\"><a class="newbutton-mobile hidden-desktop hidden-large-desktop" id="ohiolink-search" href="#">Search OhioLINK</a></div>');

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

        /**** ADD A CLEAR SEARCH ICON TO THE SEARCH BOX ****/
        /* Adapted from an example coded by Aaron Miller here: http://www.awmcreative.com/jquery/jquery-search-field-with-clear-icon/ */

        // Add class "search-input" to the search box so we can watch to see when someone has typed something
        $('.queryBox input[type=text]').addClass('search-input');

        // Add a div for the clear search icon
        $('.queryBox input[type=text]').after('<div class="search-reset"></div>');

        // Watch the search box. If there's something there, show the clear icon. Otherwise, don't show it.
        $('.queryBox input[type=text]').keyup(function() {
            if ($(this).val().length !=0) {
                $('.search-reset').show();
            } else {
                $('.search-reset').hide();
            }
        });

        // If the user presses the Esc key, clear the search box
        $('.search-input').keydown(function(e){
            if (e.keyCode == 27) {
                $(this).val('');
                $('.search-reset').hide();
            }
        });

        // If the user clicks on the clear search icon, clear the search box
        $('.search-reset').click(function(event) {
            $('.search-reset').hide();
            $('.search-input').val('');
        });
    }
  
}); 


/*** AngularJS Customizations ***/

(function () {
    // Open the Library Location facet by default - Thanks to Godmar Back from Virginia Tech for this tip
    angular.module('summonApp.directives').directive("facetField", ["facetsService", function(facetService) {
        return {
            link:  function (scope, iElement, iAttrs, controller, transcludeFn) {
                var facet = scope.$eval("facet");
                if (facet.label == "Library") {
                    facet.collapsed = false;
                }
            }
        }
    }]);
    
    // Update Flow Login label
    var mainMod = angular.module('summonApp');
    mainMod.run(['flowService', function (flow) {
        flow.configs.loginText = "Login to RefWorks";
    }]);
    
})();

