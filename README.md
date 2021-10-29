# giphy-test 🧪


## Requirements ✅
- [x] Trending section should exist
- [x] GIF in trending section should be clickable and navigate to correct GIF page
- [x] Search should work
    - [x] Search field exists
    - [x] Can type text into search field
    - [x] Results are displayed after a search

### Installation 🔨
```
yarn
```

### Run Tests 🏃
```
yarn test
```

#### Frameworks Used 🌱
- [Puppeteer](https://pptr.dev)
- [Jest](https://jestjs.io/)
- [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer)

## Takeaways 📓
- The GIFs on giphy are burried under multiple nested elements and underneath several `display: none` overlays. This made a great excercise due to the fact that I had no control over the frontend `IDs`. A simple solution would be to attach attribute `IDs` to key elements in order to make testing easier.
- To improve accessibility; changing the gray text on a dark background and adding `alt` attributes to images where possible would dramatically help users with impaired vision.
- My current solution to compare the GIF clicked with the one presented GIF will not spot errors in the actual database, only that the corrosponding `ID` matches to the GIF clicked. A possible solution would involve using a hash function to encode the original GIF and compare it with the hash of the GIF presented.