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
          * @param int $input - the index of allFeeds
          * @param int $category - property of allFeeds (0/other = URL/name)
          * @return bool - success or failure 
        */
        function testAllFeeds(input,category) {
            if (category == 0) {
                it('#'+ input + ' feed contains url', function() {
                    expect(allFeeds[input].url).toBeDefined();
                    expect(allFeeds[input].url).toBeTruthy();
                });
            } else {
                it('#' + input +' feed contains name', function() {
                    expect(allFeeds[input].name).toBeDefined();
                    expect(allFeeds[input].name).toBeTruthy();
                });                
            }
         }

        /* A test that loops through each feed in the allFeeds object 
         * and ensures it has a URL defined and that the URL is not empty.
         */
        for(var i=0, len=allFeeds.length; i<len; i++) {
            testAllFeeds(i,0);
        }

        /* A test that loops through each feed in the allFeeds object 
         * and ensures it has a name defined and that the name is not empty.
         */
        for(var i=0, len=allFeeds.length; i<len; i++) {
            testAllFeeds(i,1);
        }         
    });

    /* A test suite named "The menu".
    */  
    describe('The menu', function(){
        /* A test that ensures the menu element is hidden by default */   
        it('hide menu by default',function() {
            expect($('body').attr('class')).toBe('menu-hidden');
        });
    });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
        */

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
