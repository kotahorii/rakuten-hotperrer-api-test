import axios from 'axios'
import { useQuery } from 'react-query'
import { HotPepperRes } from 'types/types'

const getHotPepperData = async (keyword: string) => {
  const { data } = await axios.get<HotPepperRes>(
    `${process.env.REACT_APP_HOTPEPPER_URL}${keyword}`
  )
  return data
}
export const useQueryHotPepperData = (keyword: string) => {
  return useQuery<HotPepperRes, Error>({
    queryKey: 'hotPepper',
    queryFn: () => getHotPepperData(keyword),
    enabled: false,
  })
}
