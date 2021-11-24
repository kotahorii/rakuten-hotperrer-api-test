import { ChangeEvent, useCallback, useState } from 'react'
import { useQueryRakutenData } from 'hooks/useQueryRakuten'
import { useMutateHotPepper } from './useMutateHotPepper'

export const useTest = () => {
  const [keyword, setKeyword] = useState('')
  const encodedKeyword = encodeURI(keyword)
  const {
    data: rakutenData,
    refetch: refetchRakutenData,
    isError,
  } = useQueryRakutenData(encodedKeyword)
  const { postHotPepperParams } = useMutateHotPepper()

  const keywordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value),
    []
  )
  const refetchData = useCallback(() => {
    refetchRakutenData()
    postHotPepperParams.mutate(encodedKeyword)
  }, [refetchRakutenData, postHotPepperParams, encodedKeyword])
  return {
    isError,
    postHotPepperParams,
    rakutenData,
    keyword,
    encodedKeyword,
    keywordChange,
    refetchData,
  }
}
