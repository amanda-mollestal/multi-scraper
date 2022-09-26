import { Scraper } from "./scraper.js"

const scraper = new Scraper()

const testCanUrlBeScraped = async () => {

  const result = await scraper.canUrlBeScraped('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')


  if (result === true) {
    console.log('canUrlBeScraped 1 passed')
  } else {
    console.log('canUrlBeScraped 1 failed')
  }


  const result2 = await scraper.canUrlBeScraped('not.good.url.com')

  if (result2 === false) {
    console.log('canUrlBeScraped 2 passed')
  } else {
    console.log('canUrlBeScraped 2 failed')
  }

}

const testGetHtmlFromUrl = async () => {

  const html = await scraper.getHtmlFromUrl('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')

  if(html.includes('html')) {
    console.log('getHtmlFromUrl passed')
  } else {
    console.log('getHtmlFromUrl failed')
  }

}

const testScrapeHtmlForTags = async () => {
  const html = await scraper.getHtmlFromUrl('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')
  const tags = await scraper.scrapeHtmlForTags(html, 'h3')

  if (tags[0].name = 'h3') {
    console.log('scrapeHtmlForTags passed')
  } else {
    console.log('scrapeHtmlForTags failed')
  }

}

const testScrapeHtmlForTagAttribute = async () => {
  const html = await scraper.getHtmlFromUrl('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')
  const attributeArray = await scraper.scrapeHtmlForTagAttribute(html, 'img', 'src')

  if (attributeArray[3].includes('https://m.media-amazon.com/images/')) {
    console.log('scrapeHtmlForTagAttribute passed')
  } else {
    console.log('scrapeHtmlForTagAttribute failed')
  }

}

const testGetPageTitleFromUrl = async () => {
  const pageTitle = await scraper.getPageTitleFromUrl('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')

  if (pageTitle.includes('Stjärnornas krig')) {
    console.log('getPageTitleFromUrl passed') 
  } else {
    console.log('getPageTitleFromUrl failed')
  }
}

const testGetAllImageSources = async () => {
  const srcArray = await scraper.getAllImageSources('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')
  
  if (srcArray[3].includes('https://m.media-amazon.com/images/')) {
    console.log('getAllImageSources passed')
  } else {
    console.log('getAllImageSources failed')
  }
}

const testGetAllHrefFromUrl = async () => {
  const hrefArray = await scraper.getAllHrefFromUrl('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')

  if(hrefArray[1].startsWith('http') || hrefArray[1].startsWith('/')) {
    console.log('getAllHrefFromUrl passed')
  } else {
    console.log('getAllHrefFromUrl failed')
  }
}

const testTurnRelativeToAbsoluteUrls = () => {

  const testArray = [
    'https://www.imdb.com/calendar/?ref_=nv_mv_cal',
    '/chart/top/?ref_=nv_mv_250',
  ]

  const arrayWithAbsoluteUrls = scraper.turnRelativeToAbsoluteUrls('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1', testArray)


  if( arrayWithAbsoluteUrls[0] === testArray[0] && arrayWithAbsoluteUrls[1].startsWith('http')) {
    console.log('turnRelativeToAbsoluteUrls passed')
  } else {
    console.log('turnRelativeToAbsoluteUrls failed')
  }

}

await testCanUrlBeScraped()
await testGetHtmlFromUrl()
await testScrapeHtmlForTags()
await testScrapeHtmlForTagAttribute()
await testGetPageTitleFromUrl()
await testGetAllImageSources()
await testGetAllHrefFromUrl()
testTurnRelativeToAbsoluteUrls()

