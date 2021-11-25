import { ChangeEvent, useCallback, useState } from 'react'
import { useQueryRakutenData } from 'hooks/useQueryRakuten'
import { useMutateHotPepper } from './useMutateHotPepper'
import { useQueryAddress } from './useQueryAdress'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectCity,
  selectPrefecture,
  selectTown,
  setCity,
  setPrefecture,
  setTown,
} from 'features/addressSlice'

export const useTest = () => {
  const [address, setAddress] = useState('')
  const dispatch = useAppDispatch()
  const prefecture = useAppSelector(selectPrefecture)
  const city = useAppSelector(selectCity)
  const town = useAppSelector(selectTown)
  const validatedAddress = address
    .replace(/\s+/g, '')
    .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .replace(/[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━]/g, '-')

  const {
    data: addressData,
    isLoading,
    refetch: refetchAddress,
  } = useQueryAddress(validatedAddress)
  const hotPepperKeyword = addressData
    ? encodeURI(
        addressData.address1 + addressData.address2 + addressData.address3
      )
    : ''

  const prefectureChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(setPrefecture(e.target.value)),
    [dispatch]
  )

  const cityChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => dispatch(setCity(e.target.value)),
    [dispatch]
  )

  const townChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => dispatch(setTown(e.target.value)),
    [dispatch]
  )

  const rakutenKeyword = addressData
    ? encodeURI(addressData.address1 + addressData.address2)
    : ''

  const {
    data: rakutenData,
    refetch: refetchRakutenData,
    isError,
  } = useQueryRakutenData(rakutenKeyword)
  const { postHotPepperParams } = useMutateHotPepper()

  const refetchData = useCallback(() => {
    refetchRakutenData()
    postHotPepperParams.mutate(hotPepperKeyword)
  }, [refetchRakutenData, postHotPepperParams, hotPepperKeyword])

  const setAddressData = useCallback(() => {
    refetchAddress().then()
  }, [refetchAddress])

  const titleCut = useCallback(
    (title: string | undefined) =>
      title && title.length > 25 ? title.substr(0, 25) + '...' : title,
    []
  )

  const isNotValidData = useCallback(
    (data: string) => {
      const pattern1 = /^[0-9]{3}-[0-9]{4}$/
      const pattern2 = /^[0-9]{7}$/
      return (
        !pattern1.test(validatedAddress) && !pattern2.test(validatedAddress)
      )
    },
    [validatedAddress]
  )

  const changeAddress = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }, [])

  return {
    isNotValidData,
    isError,
    isLoading,
    validatedAddress,
    prefecture,
    city,
    town,
    prefectureChange,
    cityChange,
    townChange,
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
