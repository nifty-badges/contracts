import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import { HardhatUserConfig } from 'hardhat/config'
import { config } from './src'
const hardhatConfig: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: config.networks,
  solidity: {
    version: '0.8.4',
  },
  typechain: {
    outDir: 'typechain',
  },
}

export default hardhatConfig
