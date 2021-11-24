import { ChangeEvent, useCallback, useState } from 'react'
import { useQueryRakutenData } from 'hooks/useQueryRakuten'
import { useMutateHotPepper } from './useMutateHotPepper'
import { useQueryAddress } from './useQueryAdress'

export const useTest = () => {
  const [address, setAddress] = useState('')
  const validatedAddress = address.replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0)
  )
  const {
    data: addressData,
    isLoading,
    refetch: refetchAddress,
  } = useQueryAddress(validatedAddress)
  const hotPepperKeyword = addressData
    ? encodeURI(
        addressData![0].address1 +
          addressData[0].address2 +
          addressData[0].address3
      )
    : ''

  const rakutenKeyword = addressData
    ? encodeURI(addressData[0].address1 + addressData[0].address2)
    : ''

  const {
    data: rakutenData,
    refetch: refetchRakutenData,
    isError,
  } = useQueryRakutenData(rakutenKeyword)
  const { postHotPepperParams } = useMutateHotPepper()

  const changeAddress = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value),
    []
  )

  const refetchData = useCallback(() => {
    refetchRakutenData()
    postHotPepperParams.mutate(hotPepperKeyword)
  }, [refetchRakutenData, postHotPepperParams, hotPepperKeyword])

  const setAddressData = useCallback(() => {
    refetchAddress()
  }, [refetchAddress])

  const titleCut = useCallback(
    (title: string | undefined) =>
      title && title.length > 25 ? title.substr(0, 25) + '...' : title,
    []
  )
  return {
    isError,
    isLoading,
    validatedAddress,
    address,
    changeAddress,
    postHotPepperParams,
    rakutenData,
    setAddressData,
    addressData,
    refetchData,
    titleCut,
  }
}
