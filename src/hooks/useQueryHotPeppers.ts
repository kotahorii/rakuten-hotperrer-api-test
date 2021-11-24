import axios from 'axios'
import { useQuery } from 'react-query'
import { HotPepperQueryType, HotPepperRes } from 'types/types'

const getHotPepperData = async () => {
  const { data } = await axios.get<HotPepperRes>(
    `${process.env.REACT_APP_HOTPEPPER_URL}`
  )
  return data.results.shop
}
export const useQueryHotPeppers = () => {
  return useQuery<HotPepperQueryType, Error>({
    queryKey: 'hotPepper',
    queryFn: () => getHotPepperData(),
    staleTime: Infinity,
  })
}
