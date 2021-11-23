import pino from 'pino'
import { IsDefined } from 'class-validator'
import { HardhatNetworkUserConfig } from 'hardhat/types'
export class Config {
  @IsDefined()
  logger: pino.LoggerOptions

  @IsDefined()
  networks: { [key: string]: HardhatNetworkUserConfig }
}
