/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* A test suite named "RSS Feeds".
     * This suite is all about the RSS feeds definitions, 
     * the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* A test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
          * @desc test if each feed has URL/name defined and they are not empty
          * @param int $category - property of allFeeds (0/other = URL/name)
          * @return bool - success or failure 
        */
         function testAllFeeds(category) {
            var len=allFeeds.length;
            if (category == 0) {
                it('contain url', function() {
                    for(var i=0; i<len; i++) {
                        expect(allFeeds[i].url).toBeDefined();
                        expect(allFeeds[i].url).toBeTruthy();
                    }
                });
            } else {
                it('contain name', function() {
                    for(var i=0; i<len; i++) {
                        expect(allFeeds[i].name).toBeDefined();
                        expect(allFeeds[i].name).toBeTruthy();
                    }
                });
            }
         }

        /* A test that loops through each feed in the allFeeds object 
         * and ensures it has a URL defined and that the URL is not empty.
         */
         testAllFeeds(0);

        /* A test that loops through each feed in the allFeeds object 
         * and ensures it has a name defined and that the name is not empty.
         */         
         testAllFeeds(1);   
    });

    /* A test suite named "The menu" */ 
    describe('The Menu', function(){
        /* A test that ensures the menu element is hidden by default */   
        it('is hidden by default',function() {
            expect($('body').attr('class')).toBe('menu-hidden');
        });

        /* A test that ensures the menu changes visibility when the menu 
         * icon is clicked. This test has two expectations: does the
         * menu display when clicked and does it hide when clicked again
        */
        it('changes visibility when the menu icon is clicked',function() {
            var menu_btn = $('.menu-icon-link');
            menu_btn.click();
            expect($('body').attr('class')).not.toBe('menu-hidden');
            menu_btn.click();
            expect($('body').attr('class')).toBe('menu-hidden');
        });        
    });

    /* A test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed function is called and
         * completeds its work, there is at least a single .entry element
         * within the .feed container. 
         */
        beforeEach(function(done) {
            loadFeed(0,done);
        });

        it('contain .entry element within the .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });

    /* A test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded by the loadFeed 
         * function that the content actually changes.
         */
        var old_cont = $('feed .entry').html();

        // load a new feed 
        beforeEach(function(done) {
            loadFeed(1,done);
        });

        // load the initial feed after the spec
        afterEach(function(done) {
            loadFeed(0,done);
        });

        it('content changes when a new feed is loaded',function() {
            expect($('.feed .entry').html()).not.toBe(old_cont);
        });
    });

    /* A test suit named "FeedList" */
    describe('FeedList', function() {
        var listItem = $('.feed-list li');
        var old_cont = $('feed .entry').html();
        /* A test that ensures there is at least one li element 
         * within .feed-list container
         */ 
        it('contains feed items',function() {
            expect(listItem.length).toBeGreaterThan(0);
        });
    });

    /* A test suit named "Feedreader is able to" */
    describe('Feedreader is able to', function() {
        var feeds;
        var newfeed;

        beforeEach(function() {
            feeds = new Feeds();
            newfeed = new aFeed('test name','test url');
        });

        /* A test that ensures the feedreader is able to add more feeds */
        it('add more feeds', function() {
            feeds.addFeeds(newfeed);
            expect(feeds.getFeeds(0)).toBe(newfeed);
        }); 

        /* A test that ensures the feedreader is able to remove feeds */
        it('delete feeds', function() {
            feeds.addFeeds(newfeed);
            feeds.deleteFeeds(0);
            expect(feeds.getFeeds(0)).not.toBeDefined();
        });
    });

}());
