const pageObject = require('../pageObject')

jest.setTimeout(15000) // if running tests on slower network connection or device, increase timeout

describe('Giphy - Share', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1200, height: 1200 })
    await page.goto(pageObject.url)
    const context = browser.defaultBrowserContext()
    await context.overridePermissions('https://giphy.com', ['clipboard-read'])
  })

  it('should copy correct gif link', async () => {
    // click on first gif
    await page.waitForSelector(pageObject.firstTrendingGIF)
    await page.click(pageObject.firstTrendingGIF)
    await page.waitForSelector(pageObject.shareButton)

    // get gif id
    const trendingGIFSRCMP4 = await page.evaluate(() => document.querySelector("#react-target > div > div:nth-child(5) > div > div._3lHuNOPnvckvR4CcUUV0gB > div.Container-sc-12lgmgn.fIFNuA > div.ContentWrapper-sc-14xwjff.hfnmXe > div > div > div._1M8xq1jPOAHRc0OSZxxS8_ > div.KRS9L9BsuEdhF-ACKiX8x > div > div > video").src)
    const receivedID = trendingGIFSRCMP4.split('/')[4]

    // copy gif to clipboard
    await (await page.$(pageObject.shareButton)).click()
    await (await page.$(pageObject.copyToClipboard)).click()

    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(receivedID)
  })
})

