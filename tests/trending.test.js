const pageObject = require('../pageObject')

jest.setTimeout(15000) // if running tests on slower network connection or device, increase timeout

describe('Giphy - Trending', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1200, height: 1200 })
    await page.goto(pageObject.url)
  })

  it('should contain "Trending" section', async () => {
    const trendingText = await page.$eval(pageObject.trending, el => el.innerText)
    expect(trendingText).toBe('Trending')
  })

  it('should navigate to corrosponding "Trending" GIF', async () => {
    await page.waitForSelector(pageObject.firstTrendingGIF)
    const trendingGIFIMG = await (await page.$(pageObject.trendingGIFIMG))
    const trendingGIFSRC = await (await trendingGIFIMG.getProperty('src')).jsonValue()
    const expectedID = await trendingGIFSRC.split('/')[4]
    await page.click(pageObject.firstTrendingGIF)

    await page.waitForTimeout(2000)
    const divContainer = await page.$$(pageObject.trendingGIFDiv) // since the img element has no class or id attribute, we need to select the div container
    const imgSrc = await divContainer[0].$eval('img', el => el.getAttribute('src'));
    const actualID = await imgSrc.split('/')[4]

    await expect(expectedID).toBe(actualID)
  })
})
