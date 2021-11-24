import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { HotPepperQueryType, HotPepperRes } from 'types/types'

export const useMutateHotPepper = () => {
  const queryClient = useQueryClient()
  const postHotPepperParams = useMutation(
    (key: string) =>
      axios.post<HotPepperRes>('http://127.0.0.1:8000/api/v1/hotpeppers', {
        key: key,
      }),
    {
      onSuccess: (res) => {
        if (!res.data.results.shop) {
          queryClient.setQueryData('hotPepper', [])
        } else {
          queryClient.setQueryData<HotPepperQueryType>('hotPepper', [
            ...res.data.results.shop,
          ])
        }
      },
    }
  )
  return { postHotPepperParams }
}
