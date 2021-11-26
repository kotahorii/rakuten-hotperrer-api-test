import { CustomButton } from 'components/atoms/CustomButton'
import { CustomInput } from 'components/atoms/CustomInput'
import { CustomCard } from 'components/organisms/CustomCard'
import { LoadingCard } from 'components/organisms/LoadingCard'
import { Layout } from 'components/templates/Layout'
import { useTest } from 'hooks/useTest'
import { memo, VFC } from 'react'
import { useQueryClient } from 'react-query'
import { HotPepperDetailQueryType } from 'types/types'

export const Test: VFC = memo(() => {
  const {
    rakutenData,
    refetchData,
    isValidSubmit,
    setAddressData,
    address,
    prefecture,
    city,
    town,
    prefectureChange,
    isLoadingAddress,
    isLoadingRakuten,
    isRefetchingRakuten,
    isRefetchingAddress,
    isLoadingHopPepper,
    cityChange,
    townChange,
    changeAddress,
    validatedAddress,
    isNotValidData,
    isError,
  } = useTest()
  const queryClient = useQueryClient()
  const hotPepperDetailData =
    queryClient.getQueryData<HotPepperDetailQueryType>('hotPepperDetail')
  return (
    <Layout>
      <div className="flex flex-row mb-4 space-x-2">
        <CustomInput
          value={address}
          onChange={changeAddress}
          placeholder="郵便番号"
        />
        <CustomButton
          text="set"
          disabled={isNotValidData(validatedAddress)}
          loading={isLoadingAddress || isRefetchingAddress}
          onClick={setAddressData}
        />
        <CustomButton
          text="submit"
          disabled={isValidSubmit}
          loading={isRefetchingRakuten || isLoadingHopPepper}
          onClick={refetchData}
        />
      </div>
      <div className="flex md:flex-row flex-col md:space-x-3 md:space-y-0 space-y-1">
        <CustomInput
          value={prefecture}
          onChange={prefectureChange}
          placeholder="都道府県"
        />
        <CustomInput value={city} onChange={cityChange} placeholder="市" />
        <CustomInput value={town} onChange={townChange} placeholder="町" />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 w-full pt-5">
        <div className="flex flex-col items-center bg-green-100 rounded-lg w-full">
          {isError ? (
            <p className="text-lg mt-10 ">データが存在しませんでした。</p>
          ) : (
            <ul className="flex flex-col overflow-auto space-y-2 w-full h-screen p-2">
              {isLoadingRakuten || isRefetchingRakuten
                ? [...Array(4)]
                    .map((_, i) => i)
                    ?.map((i) => <LoadingCard key={i} />)
                : rakutenData?.map((rakuten) => (
                    <CustomCard
                      key={rakuten.hotel[0].hotelBasicInfo?.hotelNo}
                      src={rakuten.hotel[0].hotelBasicInfo?.hotelImageUrl}
                      href={
                        rakuten.hotel[0].hotelBasicInfo?.hotelInformationUrl
                      }
                      reviewUrl={rakuten.hotel[0].hotelBasicInfo?.reviewUrl}
                      title={rakuten.hotel[0].hotelBasicInfo?.hotelName}
                      special={rakuten.hotel[0].hotelBasicInfo?.hotelSpecial}
                      address={`${rakuten.hotel[0].hotelBasicInfo?.address1}${rakuten.hotel[0].hotelBasicInfo?.address2}`}
                    />
                  ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col bg-green-200 items-center md:mt-0 mt-10 rounded-lg">
          {hotPepperDetailData?.length === 0 ? (
            <p className="text-lg mt-10">データが存在しませんでした。</p>
          ) : (
            <ul className="flex flex-col space-y-2 overflow-auto space-y-2 w-full h-screen p-2">
              {isLoadingHopPepper
                ? [...Array(4)]
                    .map((_, i) => i)
                    ?.map((i) => <LoadingCard key={i} />)
                : hotPepperDetailData?.map((hotPepper) => (
                    <CustomCard
                      key={hotPepper.id}
                      src={hotPepper.photo.pc.l}
                      href={hotPepper.urls.pc}
                      title={hotPepper.name}
                      genre={`${hotPepper.genre.name}${
                        hotPepper.sub_genre?.name !== undefined
                          ? '・' + hotPepper.sub_genre.name
                          : ''
                      }`}
                      special={hotPepper.catch}
                      address={hotPepper.address}
                    />
                  ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  )
})
