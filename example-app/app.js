import { Scraper } from "../src/scraper.js"

const scraper = new Scraper()


// Check if URL can be scraped 

const result = await scraper.canUrlBeScraped('https://www.reddit.com/r/sweden/')

// result === TRUE
console.log(result)

// Get HTML from URl
const html = await scraper.getHtmlFromUrl('https://www.reddit.com/r/sweden/')

// Scrape HTML and get array of tags 
const tags = await scraper.scrapeHtmlForTags(html, 'h3')

console.log(tags)

// Scrape HTML for tag attribute 
// Example: all 'img'-tags 'src'-values
const attributeArray = await scraper.scrapeHtmlForTagAttribute(html, 'img', 'src')

console.log(attributeArray)





// Get webpage title from URL 
const pageTitle = await scraper.getPageTitleFromUrl('https://www.reddit.com/r/sweden/')

console.log(pageTitle)