# Feed Reader Testing Project
Front-End Web Developer Nanodegree Project 6

### Project Overview  
This project is about "test-driven development": write tests first before starting developing the application. A web-based application that reads RSS feeds is given. In order to test the underlying business logic of the application as well as the event handling and DOM manipulation, [Jasmine] (http://jasmine.github.io/) was used to write a number of tests againest the pre-exisiting application.  

### Instructions on how to run the application
1. Visit my [Github page] (http://qqyoungqq.github.io/p6-feed-reader/).
2. Click the link of article to read the arcticle opened in a new window. 
3. Click the menu icon to see the avaliable feeds. 
4. Click the feed in feedlist to load the feed.
5. Click the "Add a new feed" button to display the form for adding a new feed, and then enter the name and url of the feed you want to add.
6. Click the "Add" button to add the new feed as well as hide the form.
7. Click the "Cancel" button to cancle the operation as well as to hide the form.
8. Click the "cross" icon next to each feed to delete the feed.

### Instructions on how to run the tests 
Simply open the given URL (or index.html). Jasmine tests and results are shown at the bottom of the page.

### List of tests  
1. a test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
2. a test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
3. a test that ensures the menu element is hidden by default. 
4. a test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when clicked and does it hide when clicked again.
5. a test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container. 
6. a test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.
7. a test that ensures there is at least one li element within .feed-list container.
8. a test that ensures the feedreader is able to add more feeds.
9. a test that ensures the feedreader is able to delete feeds. 