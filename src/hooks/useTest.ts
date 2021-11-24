import { ChangeEvent, useCallback, useState } from 'react'
import { useQueryRakutenData } from 'hooks/useQueryRakuten'
import { useQueryHotPeppers } from './useQueryHotPeppers'

export const useTest = () => {
  const [keyword, setKeyword] = useState('')
  const { data: rakutenData, refetch: refetchRakutenData } =
    useQueryRakutenData()
  const { data: hotPepperData, refetch: refetchHotPepperData } =
    useQueryHotPeppers()

  const keywordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value),
    []
  )
  const refetchData = useCallback(() => {
    refetchRakutenData()
    refetchHotPepperData()
  }, [refetchRakutenData, refetchHotPepperData])
  return { rakutenData, hotPepperData, keyword, keywordChange, refetchData }
}
