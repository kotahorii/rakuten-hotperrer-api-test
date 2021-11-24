import { ChangeEvent, useCallback, useState } from 'react'
import { useQueryRakutenData } from 'hooks/useQueryRakuten'
import { useMutateHotPepper } from './useMutateHotPepper'

export const useTest = () => {
  const [keyword, setKeyword] = useState('')
  const hotPepperKeyword = encodeURI(keyword.replace(/\s+/g, ''))
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
    postHotPepperParams.mutate(hotPepperKeyword)
  }, [refetchRakutenData, postHotPepperParams, hotPepperKeyword])

  const titleCut = useCallback(
    (title: string | undefined) =>
      title && title.length > 25 ? title.substr(0, 25) + '...' : title,
    []
  )
  return {
    isError,
    postHotPepperParams,
    rakutenData,
    keyword,
    keywordChange,
    refetchData,
    titleCut,
  }
}
