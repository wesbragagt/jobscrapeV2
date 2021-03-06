/**
 * @jest-environment node
 */
const {scrape, findAllText, mergeOn, findAllLinks, findFullDescription, makeIdsForDataSet} = require('../lib/scrape')

describe('scraping indeed.com', ()=>{
  var $,jobTitles,company,salary,links,description,date
  beforeAll(async ()=>{
    $ = await scrape('https://www.indeed.com/jobs?q=developer&l=remote')
  })
  test('job titles', ()=>{
    jobTitles = findAllText('job', 'h2.title')($)
    expect(jobTitles.length).toBeGreaterThan(0)
    expect(jobTitles[0].job).toBeTruthy()
  })
  test('company', ()=>{
    company = findAllText('company', 'span.company')($)
    expect(company.length).toBeGreaterThan(0)
    expect(company[0].company).toBeTruthy()
  })
  test('salary', ()=>{
    salary = findAllText('salary', 'span.salary')($)
    expect(salary.length).toBeGreaterThan(0)
    expect(salary[0].salary).toBeTruthy()
  })
  test('link', ()=>{
    links = findAllLinks('link', 'a.jobtitle.turnstileLink')($, 'https://indeed.com')
    expect(links.length).toBeGreaterThan(0)
    expect(links[0].link).toBeTruthy()
  })
  test('short description', ()=>{
    description = findAllText('description', 'div.summary')($, 'https://indeed.com')
    expect(description.length).toBeGreaterThan(0)
    expect(description[0].description).toBeTruthy()
    expect(typeof description[0].description).toBe('string')

  })
  test('date posted', ()=>{
    date = findAllText('date', 'span.date')($, 'https://indeed.com')
    expect(date.length).toBeGreaterThan(0)
    expect(date[0].date).toBeTruthy()
    expect(typeof date[0].date).toBe('string')

  })
  test('merges all job findings', ()=>{
    const result = mergeOn('id')(jobTitles, company, salary, links, description, date)
    expect(result[0].id).toBeTruthy()
    expect(result[0].job).toBeTruthy()
    expect(result[0].company).toBeTruthy()
    expect(result[0].salary).toBeTruthy()
    expect(result[0].link).toBeTruthy()
    expect(result[0].description).toBeTruthy()
    expect(result[0].date).toBeTruthy()
  })

  test('finds full description', async ()=>{
    const result = await findFullDescription('https://www.indeed.com/viewjob?jk=7704a2f9c65d5835&tk=1elet48lsp88k800&from=serp&vjs=3')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  test('creates unique ids for each job', ()=>{
    const data = mergeOn('id')(jobTitles, company, salary, links, description, date)
    const result = makeIdsForDataSet(data)
    function isTheListUnique(arr){
      const list = arr.map(e => e.id)
      const uniqueList = [...new Set(list)]
      return uniqueList.length === list.length
    }
    expect(result.length).toBe(data.length)
    expect(isTheListUnique(result)).toBe(true)
    result.forEach(el => {
      expect(typeof el.id).toBe('string')
    })

  })
  
})