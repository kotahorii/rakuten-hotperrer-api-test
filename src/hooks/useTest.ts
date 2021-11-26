import { ChangeEvent, useCallback, useState } from 'react'
import { useQueryRakutenData } from 'hooks/useQueryRakuten'
import { useMutateHotPepperDetail } from 'hooks/useMutateHotPepperDetail'
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
    isLoading: isLoadingAddress,
    refetch: refetchAddress,
  } = useQueryAddress(validatedAddress)
  const { postHotPepperDetailParams } = useMutateHotPepperDetail()
  const isLoadingHopPepper = postHotPepperDetailParams.isLoading
  const hotPepperKeyword = addressData
    ? encodeURI(prefecture + city + town.split('町')[0])
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

  const rakutenKeyword = addressData ? encodeURI(prefecture + city) : ''

  const {
    data: rakutenData,
    refetch: refetchRakutenData,
    isLoading: isLoadingRakuten,
    isError,
  } = useQueryRakutenData(rakutenKeyword)

  const refetchData = useCallback(() => {
    refetchRakutenData()
    postHotPepperDetailParams.mutate(hotPepperKeyword)
  }, [refetchRakutenData, hotPepperKeyword, postHotPepperDetailParams])

  const setAddressData = useCallback(() => {
    refetchAddress()
  }, [refetchAddress])

  const textCut = useCallback(
    (title: string | undefined, num: number) =>
      title && title.length > num ? title.substr(0, num) + '...' : title,
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

  const isValidSubmit = !prefecture || !city || !town

  return {
    isNotValidData,
    isError,
    isLoadingAddress,
    isLoadingRakuten,
    isLoadingHopPepper,
    validatedAddress,
    prefecture,
    city,
    town,
    prefectureChange,
    cityChange,
    townChange,
    address,
    changeAddress,
    rakutenData,
    setAddressData,
    addressData,
    refetchData,
    textCut,
    isValidSubmit,
  }
}
