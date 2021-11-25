import { Layout } from 'components/templates/Layout'
import { useTest } from 'hooks/useTest'
import { VFC } from 'react'
import { useQueryClient } from 'react-query'
import { HotPepperQueryType } from 'types/types'

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
    textCut,
  } = useTest()
  const queryClient = useQueryClient()
  const hotPepperDetailData =
    queryClient.getQueryData<HotPepperQueryType>('hotPepperDetail')
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
                <li
                  className="bg-gray-50 p-3 flex flex-row space-x-3 text-gray-500 rounded-lg w-full h-32"
                  key={rakuten.hotel[0].hotelBasicInfo?.hotelNo}
                >
                  <div className="w-32 h-24 flex flex-col justify-center items-center">
                    <img
                      className="object-cover w-full h-full rounded-lg shadow-md"
                      src={rakuten.hotel[0].hotelBasicInfo?.hotelImageUrl}
                      alt="hotel"
                    />
                  </div>
                  <div className="flex flex-col space-x-1">
                    <a
                      className="p-2 text-lg h-11 font-semibold rounded-lg hover:bg-green-100"
                      href={
                        rakuten.hotel[0].hotelBasicInfo?.hotelInformationUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {textCut(rakuten.hotel[0].hotelBasicInfo?.hotelName, 27)}
                    </a>
                    <div className="flex flex-col space-y-1 mt-2">
                      <p>
                        {textCut(
                          rakuten.hotel[0].hotelBasicInfo?.hotelSpecial,
                          37
                        )}
                      </p>
                      <p className="text-xs">
                        {`${rakuten.hotel[0].hotelBasicInfo?.address1}${rakuten.hotel[0].hotelBasicInfo?.address2}`}
                      </p>
                    </div>
                  </div>
                </li>
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
                <li
                  className="bg-gray-50 p-3 text-gray-500 rounded-lg w-full h-32"
                  key={hotPepper.id}
                >
                  <a
                    className="p-2 rounded-lg text-lg text-gray-500 font-semibold hover:bg-green-100"
                    href={hotPepper.urls.pc}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {textCut(hotPepper.name, 30)}
                  </a>
                  <div className="flex flex-col mt-3 space-y-1">
                    <p>{hotPepper.genre.name}</p>
                    <p className="text-xs">{hotPepper.address}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  )
}
