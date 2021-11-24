import { hotPepperData } from 'data/hotPepperData'
import { rakutenData } from 'data/rakutenData'

export type CounterState = {
  value: number
}

export type RakutenRes = typeof rakutenData

export type HotPepperRes = typeof hotPepperData
