import { Layout } from 'components/templates/Layout'
import { useTest } from 'hooks/useTest'
import { VFC } from 'react'

export const Test: VFC = () => {
  const {
    rakutenData,
    keyword,
    keywordChange,
    refetchData,
    isError,
    postHotPepperParams,
  } = useTest()
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
      {encodeURI(keyword)}
      <div className="grid grid-cols-2">
        {isError ? (
          <p>データが存在しませんでした。</p>
        ) : (
          <ul className="flex flex-col space-y-2">
            {rakutenData?.map((rakuten) => (
              <li key={rakuten.hotel[0].hotelBasicInfo?.hotelNo}>
                {rakuten.hotel[0].hotelBasicInfo?.hotelName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  )
}
