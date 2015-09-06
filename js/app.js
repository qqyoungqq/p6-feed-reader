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
function aFeed(name,url,id) {
    this.name = name;
    this.url = url;
}

/**
 * @desc creat an object containing allFeeds and other methods 
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

var feeds = new Feeds();
feeds.allFeeds = allFeeds;

/* This function starts up our application. The Google Feed
 * Reader API is loaded asynchonously and will then call this
 * function when the API is loaded.
 */
function init() {
    // Load the first feed we've defined (index of 0).
    loadFeed(0);
}

/* This function performs everything necessary to load a
 * feed using the Google Feed Reader API. It will then
 * perform all of the DOM operations required to display
 * feed entries on the page. Feeds are referenced by their
 * index position within the allFeeds array.
 * This function all supports a callback as the second parameter
 * which will be called after everything has run successfully.
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
        menuIcon = $('.menu-icon-link');

        addButton = $('#add-button');
        cancel = $('#cancel');
        add = $('#add');


    /* Loop through all of our feeds, assigning an id property to
     * each of the feeds based upon its index within the array.
     * Then parse that feed against the feedItemTemplate (created
     * above using Handlebars) and append it to the list of all
     * available feeds within the menu.
     */
    feeds.allFeeds.forEach(function(feed) {
        feed.id = feedId;
        feedList.append(feedItemTemplate(feed));

        feedId++;
    });

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
     * on the body to perform the hiding/showing of our menu.
     */
    menuIcon.on('click', function() {
        $('body').toggleClass('menu-hidden');
    });

    addButton.on('click',function() {
        $('form').toggleClass('add-form-hidden');
    });

    cancel.on('click',function() {
        $('form').toggleClass('add-form-hidden');
    });

    add.on('click', function() {
        $('form').toggleClass('add-form-hidden');
        var name = $('#feed-name').val();
        var url = $('#feed-url').val();
        var addfeed = new aFeed(name,url);
        addfeed.id=feedId;
        feedId++;
        feeds.addFeeds(addfeed);
        feedList.append(feedItemTemplate(addfeed));
    });

}());
