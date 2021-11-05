const pageObject = require('../pageObject')

jest.setTimeout(15000) // if running tests on slower network connection or device, increase timeout

describe('Giphy - Search', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1200, height: 1200 })
    await page.goto(pageObject.url)
  })

  it('should contain search field', async () => {
    const searchField = await page.$(pageObject.search)
    await expect(searchField).toBeTruthy()
  })

  it('should be able to type in search field', async () => {
    await page.type(pageObject.search, 'dog')
    await page.waitForTimeout(1000)
    const searchText = await page.$eval(pageObject.search, el => el.value)
    await expect(searchText).toBe('dog')
  })

  it('should display results after initiating a search', async () => {
    await page.click(pageObject.searchButton)
    await page.waitForTimeout(1000)
    await expect(page).not.toMatch('No GIFs found')
  })
})