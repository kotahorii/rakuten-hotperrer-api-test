import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { HotPepperDetailQueryType, HotPepperDetailRes } from 'types/types'

export const useMutateHotPepperDetail = () => {
  const queryClient = useQueryClient()
  const postHotPepperDetailParams = useMutation(
    (key: string) =>
      axios.post<HotPepperDetailRes>(
        `${process.env.REACT_APP_HOTPEPPER_DETAIL_URL}`,
        {
          key: key,
        }
      ),
    {
      onSuccess: (res) => {
        if (!res.data.results.shop) {
          queryClient.setQueryData('hotPepperDetail', [])
        } else {
          queryClient.setQueryData<HotPepperDetailQueryType>(
            'hotPepperDetail',
            [...res.data.results.shop]
          )
        }
      },
    }
  )
  return { postHotPepperDetailParams }
}
