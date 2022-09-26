/**
 * The scraper module.
 *
 * @author Amanda Möllestål <am224pg@student.lnu>
 * @version 1.0
 */

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
  
      thisTag.attributes = JSON.parse(JSON.stringify($(this)[0].attribs))
      
      tagArray.push(thisTag)
    })

    return tagArray
  }

  scrapeHtmlForTagAttribute = async (html, tag, attribute) => {

    const $ = load(html)
    const attributeArray = []

    $(`${tag}`).each(function () {
      attributeArray.push($(this).attr(`${attribute}`))
    })
  
    return attributeArray

  }

  getPageTitleFromUrl = async (url) => {
    const html = await this.getHtmlFromUrl(url)

    const tagArray = await this.scrapeHtmlForTags(html, 'title')

    return tagArray[0].textContent

  }

  getAllImageSources = async (url) => {
    const html = await this.getHtmlFromUrl(url)
  
    const srcArray = await this.scrapeHtmlForTagAttribute(html, 'img', 'src')

    const srcArrayWithoutUndefineds = this.#removeUndefinedFromArray(srcArray)

    return srcArrayWithoutUndefineds

  }

  getAllHrefFromUrl = async (url) => {
    const html = await this.getHtmlFromUrl(url)
  
    const hrefArray = await this.scrapeHtmlForTagAttribute(html, 'a', 'href')

    const hrefArrayWithoutUndefineds = this.#removeUndefinedFromArray(hrefArray)
  
    return hrefArrayWithoutUndefineds
  
  }

  #removeUndefinedFromArray = (array) => {

    const arrayCopy = array.slice()
 
    for (let i = 0; i < arrayCopy.length; i++) {
     
     if(arrayCopy[i] === undefined) {
       arrayCopy.splice(i, 1);
       i--
     }
 
    }
 
    return arrayCopy
 
  }

  turnRelativeToAbsoluteUrls = (url, array) => {

    this.#validateArray(array)

    const urlRightFormat = this.#makeUrlRightFormat(url) 

    const baseUrl = this.#getBaseUrl(urlRightFormat)
    
    const arrayCopy = array.slice()

    for(let i = 0; i < arrayCopy.length; i++) {

      const givenUrl = `${arrayCopy[i]}`

      if(!givenUrl.startsWith('http')) {

        if (givenUrl.startsWith(`/`)) {
          arrayCopy[i] = baseUrl + givenUrl
        } else {
          arrayCopy[i] = urlRightFormat + givenUrl
        }
      }
        
    }

    return arrayCopy


  }

  #validateArray = (array) => {

    if(!Array.isArray(array)){
      throw new Error('The given array is not a valid array, try another one.')
    }

  }

  #makeUrlRightFormat = (url) => {

    if(!url.endsWith('/')) {
      return url + '/'
    } else {
      return url
    }

   }

   #getBaseUrl = (url) => {

    const partsOfUrl = url.split('/')

    const baseUrl = partsOfUrl[0] + '//' + partsOfUrl[2]

    return baseUrl
   }

}