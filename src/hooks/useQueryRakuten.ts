import axios from 'axios'
import { useQuery } from 'react-query'
import { RakutenRes } from 'types/types'

const getRakutenData = async (keyword: string) => {
  const { data } = await axios.get<RakutenRes>(
    `${process.env.REACT_APP_RAKUTEN_URL}${keyword}`
  )
  return data
}
export const useQueryRakutenData = (keyword: string) => {
  return useQuery<RakutenRes, Error>({
    queryKey: 'rakuten',
    queryFn: () => getRakutenData(keyword),
    enabled: false,
  })
}
