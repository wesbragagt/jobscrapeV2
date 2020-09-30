/**
 * @jest-environment node
 */
const {scrape, findAllText, mergeOn, findAllLinks} = require('../lib/scrape')

describe('scraping indeed.com', ()=>{
  var $,jobTitles,company,salary,links
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
  test('merges all job findings', ()=>{
    const result = mergeOn('id')(jobTitles, company, salary, links)
    
    expect(result[0].id).toBeTruthy()
    expect(result[0].job).toBeTruthy()
    expect(result[0].company).toBeTruthy()
    expect(result[0].salary).toBeTruthy()
    expect(result[0].link).toBeTruthy()
  })
})