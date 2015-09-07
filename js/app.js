/* app.js
 *
 * This is our RSS feed reader application. It uses the Google
 * Feed Reader API to grab RSS feeds as JSON object we can make
 * use of. It also uses the Handlebars templating library and
 * jQuery.
 */

/**
 * @desc creat a new feed object 
 * @param string $name
 * @param string $url
 * @return bool - success or failure
 */
function aFeed(name,url) {
    this.name = name;
    this.url = url;
}

/**
 * @desc creat an object containing allFeeds and other methods 
 * @return bool - success or failure
 */
function Feeds() {
    this.allFeeds = [];
    this.addFeeds = function(afeed) {
        this.allFeeds.push(afeed);
    };
    this.deleteFeeds = function(index) {
        this.allFeeds.splice(index,1);
    };
    this.getFeeds = function(index) {
        return this.allFeeds[index];
    };
}

// The names and URLs to all of the feeds we'd like available.
var allFeeds = [
    {
        name: 'Udacity Blog',
        url: 'http://blog.udacity.com/feeds/posts/default?alt=rss'
    }, {
        name: 'CSS Tricks',
        url: 'http://css-tricks.com/feed'
    }, {
        name: 'HTML5 Rocks',
        url: 'http://feeds.feedburner.com/html5rocks'
    }, {
        name: 'Linear Digressions',
        url: 'http://feeds.feedburner.com/udacity-linear-digressions'
    }
];

// Create a new Feeds object named feeds
var feeds = new Feeds();

// Assign the "allFeeds" property of feeds to be allFeeds defined above
feeds.allFeeds = allFeeds;

/* This function starts up our application. The Google Feed
 * Reader API is loaded asynchonously and will then call this
 * function when the API is loaded.
 */

/**
 * @desc load the first feed as long as allFeeds in feeds is not empty 
 * @return bool - success or failure
 */ 
function init() {
    // If the feeds.allFeeds is not empty, Load the first feed 
    if (feeds.allFeeds.length>0) {
        loadFeed(0);
    } else {
        $('.header-title').html('No Feed');
        $('.feed a').remove();
    }
}

/**
 * @desc performs everything necessary to load a feed using the Google 
 * Feed Reader API. It will then perform all of the DOM operations 
 * required to display feed entries on the page. Feeds are referenced
 * by their index position within the allFeeds array. 
 * @param int $id - index position within the feeds.allFeeds array
 * @param bool $cb - callback which will be called everything has run
 * successfully.
 * @return bool - success or failure
 */ 
function loadFeed(id, cb) {
    var feedUrl = feeds.allFeeds[id].url,
        feedName = feeds.allFeeds[id].name,
        feed = new google.feeds.Feed(feedUrl);

    /* Load the feed using the Google Feed Reader API.
     * Once the feed has been loaded, the callback function
     * is executed.
     */
    feed.load(function(result) {
        if (!result.error) {
            /* If loading the feed did not result in an error,
             * get started making the DOM manipulations required
             * to display the feed entries on screen.
             */
            var container = $('.feed'),
                title = $('.header-title'),
                entries = result.feed.entries,
                entriesLen = entries.length,
                entryTemplate = Handlebars.compile($('.tpl-entry').html());

            title.html(feedName);   // Set the header text
            container.empty();      // Empty out all previous entries

            /* Loop through the entries we just loaded via the Google
             * Feed Reader API. We'll then parse that entry against the
             * entryTemplate (created above using Handlebars) and append
             * the resulting HTML to the list of entries on the page.
             */
            entries.forEach(function(entry) {
                container.append(entryTemplate(entry));
            });
        } else {
            /* display error message when loading the feed fails. */
            alert(result.error.message);
        }

        if (cb) {
            cb();
        } 
    });
}

/* Google API: Loads the Feed Reader API and defines what function
 * to call when the Feed Reader API is done loading.
 */
google.load('feeds', '1');
google.setOnLoadCallback(init);

/* All of this functionality is heavily reliant upon the DOM, so we
 * place our code in the $() function to ensure it doesn't execute
 * until the DOM is ready.
 */
$(function() {
    var container = $('.feed'),
        feedList = $('.feed-list'),
        feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
        feedId = 0,
        menuIcon = $('.menu-icon-link'),
        addButton = $('#add-button'),
        cancel = $('#cancel'),
        add = $('#add');

    /**
     * @desc Loop through all of feeds, assigning an id property to 
     * each of the feeds based upon its index within the array.
     * The parse that feed against the feedItemTemplate and (created
     * above using Handlebars) and append it to the list of all
     * available feeds within the menu  
     * @return bool - success or failure
     */
    function showFeeds() { 
        feeds.allFeeds.forEach(function(feed) {
            feed.id = feedId;
            feedList.append(feedItemTemplate(feed));
            feedId++;
        });
    };

    showFeeds();

    /* When a link in our feedList is clicked on, we want to hide
     * the menu, load the feed, and prevent the default action
     * (following the link) from occuring.
     */
    feedList.on('click', 'a', function() {
        var item = $(this);

        $('body').addClass('menu-hidden');
        loadFeed(item.data('id'));
        return false;
    });

    /* When the menu icon is clicked on, we need to toggle a class
     * on the body to perform the hiding/showing of our menu, 
     * and to change the css property of form to hide the form
     */
    menuIcon.on('click', function() {
        $('body').toggleClass('menu-hidden');
        $('form').css("display","none");
    });

    /* When the "Add a new feed" botton is clicked on, we need to 
     * change the css property of form to show the form
     */
    addButton.on('click',function() {
        $('form').css('display','block');
    });

    /* When the "cancel" button is clicked on, we need to change the
     * css property of form to hide the form
     */
    cancel.on('click',function() {
        $('form').css("display","none");
    });

    /* When the "add" button is clicked on, we need to check whether 
     * the input (name, url) is valid. If so, then change the css 
     * property of form to hide the form. And add the new feed to 
     * feeds by calling feeds.addFeeds and append it to feedList
     */
    add.on('click', function() {
        var name = $('#feed-name').val();
        var url = $('#feed-url').val();
        if ( validateInput(name) && validateInput(url) ) {
            $('form').css("display","none");
            var addfeed = new aFeed(name,url);
            addfeed.id=feedId;
            feedId++;
            feeds.addFeeds(addfeed);
            feedList.append(feedItemTemplate(addfeed));           
        }
    });

    /* When the delete icon (cross) in feedList is clicked on, we need to
     * delete the feed from feeds by calling feeds.deleteFeeds and relist 
     * the new feeds in the menu by calling showFeeds, and to load the 
     * first feed by calling init().  
     */
    feedList.on('click', 'button', function() {
        var item = $(this);
        feeds.deleteFeeds(item.data('id'));
        $('.feed-list li').remove();
        feedId=0;
        showFeeds();
        init();
    });

}());

/**
 * @desc to validate if input is empty string  
 * @param string $inp
 * @return bool - success or failure
 */
function validateInput(inp) {
    if (inp == '') {
        alert('Entry is empty');
        return false;
    } else {
        return true;
    }
}
