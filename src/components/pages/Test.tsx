import { CustomCard } from 'components/organisms/CustomCard'
import { Layout } from 'components/templates/Layout'
import { useTest } from 'hooks/useTest'
import { VFC } from 'react'
import { useQueryClient } from 'react-query'
import { HotPepperDetailQueryType } from 'types/types'

export const Test: VFC = () => {
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
    cityChange,
    townChange,
    changeAddress,
    validatedAddress,
    isNotValidData,
    isError,
    isLoading,
  } = useTest()
  const queryClient = useQueryClient()
  const hotPepperDetailData =
    queryClient.getQueryData<HotPepperDetailQueryType>('hotPepperDetail')
  if (isLoading) return <Layout>Loading...</Layout>
  return (
    <Layout>
      <div className="flex flex-row space-x-2">
        <input
          className="p-2 border-gray-200 border rounded-md"
          type="text"
          value={address}
          onChange={changeAddress}
          placeholder="keyword"
        />
        <button
          onClick={setAddressData}
          disabled={isNotValidData(validatedAddress)}
          className="px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600 shadow-lg text-white rounded-full"
        >
          Set
        </button>
        <button
          onClick={refetchData}
          disabled={isValidSubmit}
          className="px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600 shadow-lg text-white rounded-full"
        >
          submit
        </button>
      </div>
      <div className="flex flex-row space-x-3">
        <input
          className="p-2 border-gray-200 border rounded-md"
          type="text"
          value={prefecture}
          onChange={prefectureChange}
          placeholder="都道府県"
        />
        <input
          className="p-2 border-gray-200 border rounded-md"
          type="text"
          value={city}
          onChange={cityChange}
          placeholder="市"
        />
        <input
          className="p-2 border-gray-200 border rounded-md"
          type="text"
          value={town}
          onChange={townChange}
          placeholder="町"
        />
      </div>
      <div className="grid grid-cols-2 w-full pt-5">
        <div className="flex flex-col items-center bg-green-100 rounded-lg w-full">
          {isError ? (
            <p className="text-lg mt-10 ">データが存在しませんでした。</p>
          ) : (
            <ul className="flex flex-col overflow-auto space-y-2 w-full h-screen p-2">
              {rakutenData?.map((rakuten) => (
                <CustomCard
                  key={rakuten.hotel[0].hotelBasicInfo?.hotelNo}
                  src={rakuten.hotel[0].hotelBasicInfo?.hotelImageUrl}
                  href={rakuten.hotel[0].hotelBasicInfo?.hotelInformationUrl}
                  reviewUrl={rakuten.hotel[0].hotelBasicInfo?.reviewUrl}
                  title={rakuten.hotel[0].hotelBasicInfo?.hotelName}
                  special={rakuten.hotel[0].hotelBasicInfo?.hotelSpecial}
                  address={`${rakuten.hotel[0].hotelBasicInfo?.address1}${rakuten.hotel[0].hotelBasicInfo?.address2}`}
                />
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col bg-green-200 items-center rounded-lg">
          {hotPepperDetailData?.length === 0 ? (
            <p className="text-lg mt-10">データが存在しませんでした。</p>
          ) : (
            <ul className="flex flex-col space-y-2 overflow-auto space-y-2 w-full h-screen p-2">
              {hotPepperDetailData?.map((hotPepper) => (
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
}
