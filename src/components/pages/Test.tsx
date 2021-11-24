import { Layout } from 'components/templates/Layout'
import { useTest } from 'hooks/useTest'
import { VFC } from 'react'
import { useQueryClient } from 'react-query'
import { HotPepperQueryType } from 'types/types'

export const Test: VFC = () => {
  const { rakutenData, keyword, keywordChange, refetchData, isError } =
    useTest()
  const queryClient = useQueryClient()
  const hotPepperData =
    queryClient.getQueryData<HotPepperQueryType>('hotPepper')
  return (
    <Layout>
      <div className="flex flex-row space-x-2">
        <input
          className="p-2 border-gray-200 border rounded-md"
          type="text"
          value={keyword}
          onChange={keywordChange}
          placeholder="keyword"
        />
        <button
          onClick={refetchData}
          className="px-3 py-2 bg-indigo-400 hover:bg-indigo-500 shadow-lg text-white rounded-full"
        >
          submit
        </button>
      </div>
      <div className="grid grid-cols-2 w-full space-x-3 pt-5">
        <div className="flex flex-col items-center bg-green-100 rounded-lg w-full">
          {isError ? (
            <p className="text-lg mt-10 ">データが存在しませんでした。</p>
          ) : (
            <ul className="flex flex-col space-y-2 min-h-full p-2">
              {rakutenData?.map((rakuten) => (
                <li
                  className="bg-green-50 p-3 text-gray-500 font-semibold rounded-lg w-full h-32"
                  key={rakuten.hotel[0].hotelBasicInfo?.hotelNo}
                >
                  <a className="" href="">
                    {rakuten.hotel[0].hotelBasicInfo?.hotelName}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col bg-green-200 items-center rounded-lg">
          {hotPepperData?.length === 0 ? (
            <p className="text-lg mt-10">データが存在しませんでした。</p>
          ) : (
            <ul className="flex flex-col space-y-2 w-full min-h-screen p-2">
              {hotPepperData?.map((hotPepper) => (
                <li
                  className="bg-green-50 p-3 text-gray-500 font-semibold rounded-lg w-full h-32"
                  key={hotPepper.id}
                >
                  <a
                    className="p-2 rounded-lg hover:bg-gray-200"
                    href={hotPepper.urls.pc}
                  >
                    {hotPepper.name}
                  </a>
                  <p>{hotPepper.address}</p>
                  <p>{hotPepper.genre.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  )
}
