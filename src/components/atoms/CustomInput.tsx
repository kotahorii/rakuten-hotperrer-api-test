import { ChangeEvent, memo, VFC } from 'react'

type Props = {
  value: string
  placeholder: string
  type?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CustomInput: VFC<Props> = memo(
  ({ value, placeholder, onChange, type = 'text' }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className="p-2 border-gray-200 border rounded-md focus:ring-blue-400 text-gray-600"
        value={value}
        onChange={onChange}
      />
    )
  }
)
