import { Scraper } from "../src/scraper.js"

const scraper = new Scraper()

// Get HTML from URl
const html = await scraper.getHtmlFromUrl('https://www.reddit.com/r/sweden/')

console.log(html)