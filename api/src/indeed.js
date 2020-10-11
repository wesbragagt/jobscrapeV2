const axios = require('axios')
const cheerio = require('cheerio')
const querystring=require('querystring')
const { findAllLinks, findAllText, mergeOn } = require('./lib/scrape')
const scrape = async url => {
  try {
    const response = await axios.get(url)
    return cheerio.load(response.data, {
      normalizeWhitespace: true,
      xmlMode: true
    })
  } catch (error) {
    throw error
  }
}

module.exports.getjobs = async function (req, res) {
  const queries = querystring.stringify(req.query)
  const $ = await scrape(
    `https://www.indeed.com/jobs?${queries}`
  )
  const jobTitles = findAllText('job', 'h2.title')($)
  const company = findAllText('company', 'span.company')($)
  const salary = findAllText('salary', 'span.salary')($)
  const links = findAllLinks('link', 'a.jobtitle.turnstileLink')(
    $,
    'https://indeed.com'
  )
  const description = findAllText('description', 'div.summary')($, 'https://indeed.com')
  const response = mergeOn('id')(jobTitles, company, salary, links, description)
  res.send({ response, queryParams: req.query })
}
