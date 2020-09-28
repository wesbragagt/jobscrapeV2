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

module.exports.getjobs = async function(req, res){
  const $ = await scrape(`https://www.indeed.com/jobs?q=${req.query.position}&l=${req.query.location}`)
  const response = $('h2.title').map(function(i, el) {
    // this === el
    const title = $(this).text().trim();
    return title
  }).get();
  res.send({response, queryParams: req.query})
}