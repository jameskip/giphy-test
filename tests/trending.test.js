const pageObject = {
  url: 'https://giphy.com',
  trending: '.Title-sc-kvmtvl.fdATmE',
  firstTrendingGIF: 'div[class="Container-sc-3mbxb4 jfTqrJ"]',
  firstTrendingGIFPage: '.KRS9L9BsuEdhF-ACKiX8x',
  search: 'input[class="Input-sc-w75cdz tdeeo"]',
  searchButton: '.SearchButtonContainer-sc-65ycrl.cCAKsY',
}

// jest.setTimeout(10000) // if running tests on slower network connection or device, increase timeout

describe('Giphy - Trending', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1200, height: 1200 })
    await page.goto(pageObject.url)
  })

  // Trending
  it('should contain "Trending" section', async () => {
    const trendingText = await page.$eval(pageObject.trending, el => el.innerText)
    expect(trendingText).toBe('Trending')
  })

  it('should navigate to corrosponding "Trending" GIF', async () => {
    await page.waitForSelector(pageObject.firstTrendingGIF)
    const trendingGIFSRC = await page.evaluate(() => document.querySelector("#react-target > div > div.homepage__Container-iz3zf-0.fKRVVj > div:nth-child(2) > div.fade-next-previous__Container-sc-1okudgt-0.lsOAZ > div.ListWrapper-sc-1mxkd1t.djoQGB > ul > li:nth-child(1) > div > div > picture > img").src)
    const expectedID = trendingGIFSRC.split('/')[4]
    await page.click(pageObject.firstTrendingGIF)

    await page.waitForSelector(pageObject.firstTrendingGIFPage)
    const trendingGIFSRCMP4 = await page.evaluate(() => document.querySelector("#react-target > div > div:nth-child(5) > div > div._3lHuNOPnvckvR4CcUUV0gB > div.Container-sc-12lgmgn.fIFNuA > div.ContentWrapper-sc-14xwjff.hfnmXe > div > div > div._1M8xq1jPOAHRc0OSZxxS8_ > div.KRS9L9BsuEdhF-ACKiX8x > div > a > div > video").src)
    const receivedID = trendingGIFSRCMP4.split('/')[4]
    await expect(expectedID).toBe(receivedID)
  })

  // Search
  it('should contain search field', async () => {
    const searchField = await page.$(pageObject.search)
    await expect(searchField).toBeTruthy()
  })

  it('should be able to type in search field', async () => {
    await page.type(pageObject.search, 'dog')
    const searchText = await page.$eval(pageObject.search, el => el.value)
    await expect(searchText).toBe('dog')
  })

  it('should display results after initiating a search', async () => {
    await page.click(pageObject.searchButton)
    await expect(page).not.toMatch('No GIFs found')
  })
})

