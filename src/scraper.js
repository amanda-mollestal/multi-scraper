import axios from "axios"
import { load } from "cheerio"

export class Scraper {

  getHtmlFromUrl = async (url) => {
    try {
      const { data } = await axios.get(
      `${url}`
     )
  
      return data
    } catch (error) {
      throw new Error('The given URL could not be scraped by this scraper, try another one.')
    }
  }

  canUrlBeScraped = async (url) => {

    try {
      
      const tryToScrape = await this.getHtmlFromUrl(url)

      return true

    } catch (error) {
      return false
    }

  }

  scrapeHtmlForTags = async (html, tag) => {
    const $ = load(html)
    const tagArray = []
     
    $(`${tag}`).each(function () {

      const thisTag = {}
  
      thisTag.name = $(this)[0].name
      thisTag.type = $(this)[0].type
      thisTag.textContent = $(this).text()
      //thisTag.attributes = $(this)[0].attribs
      thisTag.attributes = JSON.parse(JSON.stringify($(this)[0].attribs))
      
      //console.log($(this)[0])
  
      //const atts =  JSON.parse(JSON.stringify($(this)[0].attribs))

      //console.log(atts)

      //console.log(thisTag)
      //console.log('--------------------------------------------------------------------------------------------------------------------')
  
      //tagArray.push($(this))
      tagArray.push(thisTag)
    })

    return tagArray
  }

}