import { useAppDispatch } from 'app/hooks'
import axios from 'axios'
import { setCity, setPrefecture, setTown } from 'features/addressSlice'
import { useQuery } from 'react-query'
import { AddressQueryType, AddressRes } from 'types/types'

const getAddressData = async (address: string) => {
  const { data } = await axios.get<AddressRes>(
    `${process.env.REACT_APP_ADDRESS_URL}${address}`
  )
  return data.results[0]
}

export const useQueryAddress = (address: string) => {
  const dispatch = useAppDispatch()

  return useQuery<AddressQueryType, Error>({
    queryKey: 'address',
    queryFn: () => getAddressData(address),
    staleTime: Infinity,
    enabled: false,
    onSuccess: (data) => {
      dispatch(setPrefecture(data.address1))
      dispatch(setCity(data.address2))
      dispatch(setTown(data.address3))
    },
  })
}
