import { Scraper } from "../src/scraper.js"

const scraper = new Scraper()


// Check if URL can be scraped 

const result = await scraper.canUrlBeScraped('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')

// result === TRUE


// Get HTML from URl
const html = await scraper.getHtmlFromUrl('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')


// Scrape HTML and get array of tags 
const tags = await scraper.scrapeHtmlForTags(html, 'h3')


// Scrape HTML for tag attribute 
// Example: all 'img'-tags 'src'-values
const attributeArray = await scraper.scrapeHtmlForTagAttribute(html, 'img', 'src')


// Get webpage title from URL 
const pageTitle = await scraper.getPageTitleFromUrl('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')


// Get array with all image sources from URL 
const srcArray = await scraper.getAllImageSources('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')


// Get array with all HREFs from a URL 
const hrefArray = await scraper.getAllHrefFromUrl('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')


// Turn all relativ to absolute URL in an array
const arrayWithAbsoluteUrls = scraper.turnRelativeToAbsoluteUrls('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1', hrefArray)
