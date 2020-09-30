const axios = require('axios')
const cheerio = require('cheerio')
/**
 * makes an http request for a page and extracts the dom elements into an object that can be traversed
 * @param {string} url 
 */
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
/**
 * Traverses through the dom generated by cheerio in order to find values related to a type and target domNode
 * @param {string} type 
 * @param {string} domNode 
 */
const findAllText = (type, domNode) => (fn) => fn(domNode).map((i, el) => ({id: i+1, [type]: fn(el).text().trim()})).get()
const findAllLinks = (type, domNode) => (fn, prefix) => fn(domNode).map((i, el) => ({id: i+1, [type]: prefix + fn(el).attr('href')})).get()

const mergeOn = (key) => (...arr) => arr.reduce((acc, cur) => {
  cur.forEach(e => {
    if(acc){
      Object.assign(acc.find(r => r[key] === e[key]), e)
    }
  })
  return acc
}, arr[0])
module.exports.scrape = scrape
module.exports.findAllText = findAllText
module.exports.findAllLinks = findAllLinks
module.exports.mergeOn = mergeOn