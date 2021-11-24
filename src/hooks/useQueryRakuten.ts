import axios from 'axios'
import { useQuery } from 'react-query'
import { RakutenQueryType, RakutenRes } from 'types/types'

const getRakutenData = async () => {
  const { data } = await axios.get<RakutenRes>(
    `${process.env.REACT_APP_RAKUTEN_URL}`
  )
  return data.hotels
}
export const useQueryRakutenData = () => {
  return useQuery<RakutenQueryType, Error>({
    queryKey: 'rakuten',
    queryFn: () => getRakutenData(),
    staleTime: Infinity,
  })
}
