/**
 * @jest-environment node
 */
const scrape = require('../lib/scrape')

describe('scrape function', ()=>{
  var $;
  beforeAll(async ()=>{
    $ = await scrape('https://www.indeed.com/jobs?q=developer&l=remote')
  })
  test('job titles', async ()=>{
    const jobTitles = $('h2.title').map((i, el)=>{
      return {
        id: i + 1,
        title: $(el).text().trim()
      }
    })
    expect(jobTitles.length).toBeGreaterThan(0)
    expect(jobTitles[0].id).toBeTruthy()
    expect(jobTitles[0].title).toBeTruthy()
  })
  test('company', async()=>{
    const company = $('span.company').map((i, el) => {
      return {
        id: i + 1,
        company: $(el).text().trim()
      }
    })
    expect(company.length).toBeGreaterThan(0)
    expect(company[0].company).toBeTruthy()
  })
})