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

}