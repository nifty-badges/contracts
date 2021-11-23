/* eslint-disable import/order */
import 'reflect-metadata'
import { loadConfig } from '@barath/typed-config'
import pino from 'pino'
import { Config } from './lib/config'
export const config = loadConfig(Config)
export const logger = pino({
  ...config.logger,
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'hh:MM:ss',
      ignore: 'pid,hostname',
    },
  },
})
