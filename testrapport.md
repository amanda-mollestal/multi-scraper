
## Current status of the module

|      What to be tested     | How it's tested                | Passed/Failed |
|:--------------------------:|--------------------------------|---------------|
| canUrlBeScraped            | testCanUrlBeScraped            | Passed        |
| getHtmlFromUrl             | testGetHtmlFromUrl             | Passed        |
| scrapeHtmlForTags          | testScrapeHtmlForTags          | Passed        |
| scrapeHtmlForTagAttribute  | testScrapeHtmlForTagAttribute  | Passed        |
| getPageTitleFromUrl        | testGetPageTitleFromUrl        | Passed        |
| getAllImageSources         | testGetAllImageSources         | Passed        |
| getAllHrefFromUrl          | testGetAllHrefFromUrl          | Passed        |
| turnRelativeToAbsoluteUrls | testTurnRelativeToAbsoluteUrls | Passed        |

I have created a tests.js file that acts as a test application for this module. It contains 8 tests that each test 1 of the 8 public methods. 

A test itelf is a method that calls the method it's testing and checks if the response is as expected. The results will log as either 'passed' or 'failed' in your console.

###  To run the test application yourself:

``` 
npm test
```
