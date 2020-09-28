const axios = require('axios')
const cheerio = require('cheerio')

const scrape = async (url) => {
  try {
    const response = await axios.get(url)
    return cheerio.load(response.data,{
      normalizeWhitespace: true,
      xmlMode: true
  })
  } catch (error) {
    throw error
  }
}

module.exports = scrape