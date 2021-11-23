import { ethers } from 'hardhat'

describe('Market', () => {
  it('should create and execute sales', async () => {
    const Market = await ethers.getContractFactory('Market')
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address
    expect(marketAddress).toBeDefined()
    const Badge = await ethers.getContractFactory('Badge')
    const badge = await Badge.deploy('Bootcamp Core', 'BCCORE', marketAddress)
    await badge.deployed()
    const badgeAddress = badge.address
    expect(badgeAddress).toBeDefined()
    const listingPrice = (await market.getListingPrice()).toString()
    const auctionPrice = ethers.utils.parseUnits('1', 'ether')
    await badge.createToken('https://barath.com')
    await badge.createToken('https://omi.com')
    await market.createMarketItem(badgeAddress, 1, auctionPrice, {
      value: listingPrice,
    })
    await market.createMarketItem(badgeAddress, 2, auctionPrice, {
      value: listingPrice,
    })
    const [firstAccount, buyerAddress] = await ethers.getSigners()
    expect(firstAccount).toBeDefined()
    await market
      .connect(buyerAddress)
      .createMarketSale(badgeAddress, 1, { value: auctionPrice })
    const items = await market.fetchMarketItems()
    expect(items).toHaveLength(1)
  })
})
