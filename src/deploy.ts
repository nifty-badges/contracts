import { logger } from '.'
import path from 'path'
import hre, { ethers } from 'hardhat'
import { writeJSON, existsSync, mkdirs } from 'fs-extra'
interface INFT {
  contract: string
  name: string
  token: string
}
const contractsDir = './typechain/contracts'
const deployNFT = async (nft: INFT, marketAddress: string) => {
  logger.info(`deploying contract ${nft.name}`)
  const Contract = await ethers.getContractFactory(nft.contract)
  const contract = await Contract.deploy(nft.name, nft.token, marketAddress)
  logger.info(`deployed contract ${nft.name} to ${contract.address}`)
  return contract
}
const deployMarket = async () => {
  logger.info('deploying market contract')
  const Market = await ethers.getContractFactory('Market')
  const market = await Market.deploy()
  logger.info(`deployed market contract to ${market.address}`)
  return market
}
const deployAll = async () => {
  logger.info(`deploying to the ${hre.network.name} network`)
  const deployed: { [key: string]: string } = {}
  const market = await deployMarket()
  deployed.market = market.address
  const contracts: INFT[] = [
    { contract: 'Badge', name: 'bootcamp-core', token: 'BC-CORE' },
  ]
  for (const contract of contracts) {
    const nft = await deployNFT(contract, market.address)
    deployed[contract.name.toLowerCase()] = nft.address
  }
  if (!existsSync(contractsDir)) {
    await mkdirs(contractsDir)
  }
  await writeJSON(
    path.resolve(`${contractsDir}/${hre.network.name}.json`),
    deployed,
    {
      spaces: 2,
    }
  )
}

deployAll().catch((error) => {
  logger.error(error)
})
