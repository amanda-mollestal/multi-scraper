# Multi-Scraper

## This is a simple multi-scraper made with JavaScript meant to be a helpful tool for you and your projects. When in need of scraping a webpage for HTML-tags, HREFs or image sources, you don’t have to build your own scraper! 

### This is the first and final version, v1.0.
- - -

## This module has 8 helpful methods and this is how you use them:

### 1. Download this module and add it to your project!

### 2. Install dependencies
This module depends on two packages -> axios and cheerio

``` 
npm i
```
### 3. Import the Scraper 
``` 
import { Scraper } from ".multi-scraper/src/scraper.js"
```
### 4. Create new instance of Scraper
``` 
const scraper = new Scraper()
```

### 5. Now you can start scraping! 


### - Check if this scraper is able to scrape a specific URL
``` 
scraper.canUrlBeScraped('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')

returns --> TRUE
```
``` 
scraper.canUrlBeScraped('this.is.a.bad.url.com')

returns --> FALSE
```


### - Get the title of a webpage

```
scraper.getPageTitleFromUrl('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')

returns --> "Stjärnornas krig (1977) - IMDb
"
```
### - Get an array with all the image sources scraped from URL

```
scraper.getAllImageSources('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')

returns --> 
"[
  'https://m.media-amazon.com/images/M/MV5BMTUzNDY0NjY4Nl5BMl5BanBnXkFtZTgwNjY4MTQ0N....... "

``` 

### - Get array with all HREFs scraped from URL 

``` 
scraper.getAllHrefFromUrl('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')

returns --> 
"[
  'https://www.imdb.com/calendar/?ref_=nv_mv_cal',
  '/chart/top/?ref_=nv_mv_250',
  '/chart/moviemeter/?ref_=nv_mv_mpm',
  '/feature/genre/?ref_=nv_ch_gr',
  '/chart/boxoffice/?ref_=nv_ch_cht',
  '/showtimes/?ref_=nv_mv_sh',
  ..... "
```

### - With the help of the scraped URL, we can turn an array with relative/mixed to absolute URL 

``` 
craper.turnRelativeToAbsoluteUrls('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1', hrefArray)

returns -->
"[
  'https://www.imdb.com/?ref_=nv_home',
  'https://www.imdb.com/calendar/?ref_=nv_mv_cal',
  'https://www.imdb.com/chart/top/?ref_=nv_mv_250',
  'https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm',
  'https://www.imdb.com/feature/genre/?ref_=nv_ch_gr',
  'https://www.imdb.com/chart/boxoffice/?ref_=nv_ch_cht',
  ....."
```

### - Get HTML from URL

``` 
scraper.getHtmlFromUrl('https://www.imdb.com/title/tt0076759/?ref_=fn_al_tt_1')

returns -->  "<!DOCTYPE html><html lang="en-US"........." and so on
```
### - Scrape HTML, search for all tags with the same given name and get array with tag-objects

``` 
scraper.scrapeHtmlForTags(html, 'h3')

returns --> 
"[
  {
    name: 'h3',
    type: 'tag',
    textContent: 'Videos27',
    attributes: { class: 'ipc-title__text' }
  },
  {
    name: 'h3',
    type: 'tag',
    textContent: 'Photos552',
    attributes: { class: 'ipc-title__text' }
  },
 ....... " 

```
### - Scrape HTML, search for all tags with the same given name, collect and get array with the given attributes value

```
scraper.scrapeHtmlForTagAttribute(html, 'img', 'src')

returns --> 
"[
  'https://m.media-amazon.com/images/M/MV5BMTUzNDY0NjY4Nl5BMl5BanBnXkFtZTgwNjY4MTQ0N....... "
``` 


