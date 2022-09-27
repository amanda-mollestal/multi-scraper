/**
 * The scraper module.
 *
 * @author Amanda Möllestål <am224pg@student.lnu>
 * @version 1.0
 */

import axios from "axios"
import { load } from "cheerio"

export class Scraper {

  /**
   * Takes an URL, scrapes and returns the HTML code.
   * 
   * @param {String} url - the given URL
   * @returns {String} - The scraped HTML 
   */
  getHtmlFromUrl = async (url) => {
    try {
      const { data } = await axios.get(`${url}`)
      return data
    } catch (error) {
      throw new Error('The given URL could not be scraped by this scraper, try another one.')
    }
  }

  /**
   * Takes an URL and checks if URL can be scraped.
   * 
   * @param {String} url - the given URL
   * @returns {Boolean} - If URL can be scraped
   */
  canUrlBeScraped = async (url) => {

    try {
      
      const tryToScrape = await this.getHtmlFromUrl(url)
      return true

    } catch (error) {
      return false
    }

  }

  /**
   * Takes HTML and a tag-name to search for.
   * Returns array with tag-objects.
   * 
   * @param {String} html - HTML code to scrape 
   * @param {String} tag - Tag to search for
   * @returns {Array.<Object>} - Array with tag-objects
   */
  scrapeHtmlForTags = async (html, tag) => {
    const $ = load(html)
    const tagArray = []
     
    $(`${tag}`).each(function () {

      const thisTag = {
        name: $(this)[0].name,
        type: $(this)[0].type,
        textContent: $(this).text(),
        attributes: JSON.parse(JSON.stringify($(this)[0].attribs)),
      }
      
      tagArray.push(thisTag)
    })

    return tagArray
  }

  /**
   * Takes HTML, a tag-name and an attribute to search for.
   * Returns array with attribute-values. 
   *
   * @param {String} html - HTML code to scrape 
   * @param {String} tag - Tag to search for
   * @param {String} attribute - The attribute to search for
   * @returns {Array.<String>} - Array with attribute values
   */
  scrapeHtmlForTagAttribute = async (html, tag, attribute) => {

    const $ = load(html)
    const attributeArray = []

    $(`${tag}`).each(function () {
      attributeArray.push($(this).attr(`${attribute}`))
    })
  
    return attributeArray

  }

  /**
   * Takes an URL, scrapes and return page title.
   * 
   * @param {String} url - The given URL
   * @returns {String} - The page title
   */
  getPageTitleFromUrl = async (url) => {
    const html = await this.getHtmlFromUrl(url)

    const tagArray = await this.scrapeHtmlForTags(html, 'title')

    return tagArray[0].textContent

  }

  /**
   * Takes an URL, scrapes and returns all img sources.
   * 
   * @param {String} url - The given URL
   * @returns {Array.<String>} - Array with img sources
   */
  getAllImageSources = async (url) => {
    const html = await this.getHtmlFromUrl(url)
  
    const srcArray = await this.scrapeHtmlForTagAttribute(html, 'img', 'src')

    const srcArrayWithoutUndefineds = this.#removeUndefinedFromArray(srcArray)

    return srcArrayWithoutUndefineds

  }

  /**
   * Takes an URL, scrapes and returns all a-tags HREFs.
   * 
   * @param {String} url - The given URL
   * @returns {Array.<String>} - Array with HREFs
   */
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

  /**
   * Takes an absolute URL and array with URLs and turns every relative to absolute URL.
   * 
   * @param {String} url - The given URL
   * @param {Array.<String>} - Array with URLs
   * @returns {Array.<String>} - Array with all absolute URLs
   */
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