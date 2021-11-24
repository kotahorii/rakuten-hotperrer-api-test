import axios from 'axios'
import { useQuery } from 'react-query'
import { AddressQueryType, AddressRes } from 'types/types'

const getAddressData = async (address: string) => {
  const { data } = await axios.get<AddressRes>(
    `${process.env.REACT_APP_ADDRESS_URL}${address}`
  )
  return data.results
}

export const useQueryAddress = (address: string) => {
  return useQuery<AddressQueryType, Error>({
    queryKey: 'adress',
    queryFn: () => getAddressData(address),
    staleTime: Infinity,
    enabled: false,
  })
}
