import { Scraper } from "../src/scraper.js"

const scraper = new Scraper()


// Check if URL can be scraped 

const result = await scraper.canUrlBeScraped('https://www.reddit.com/r/sweden/')



// Get HTML from URl
const html = await scraper.getHtmlFromUrl('https://www.reddit.com/r/sweden/')




console.log(result)