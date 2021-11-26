import { VFC } from 'react'

type Props = {
  src: string | undefined
  href: string | undefined
  title: string | undefined
  genre?: string | undefined
  reviewUrl?: string | undefined
  special: string | undefined
  address: string | undefined
}

export const CustomCard: VFC<Props> = ({
  src,
  href,
  title,
  genre,
  reviewUrl,
  special,
  address,
}) => {
  return (
    <li className="bg-gray-50 p-3 flex items-center shadow-md flex-row space-x-3 text-gray-500 rounded-lg w-full ">
      <div className="w-32 h-24 flex flex-col justify-center items-center">
        <img
          className="object-cover w-full h-full rounded-lg shadow-md"
          src={src}
          alt="hotel"
        />
      </div>
      <div className="flex flex-col w-2/3 space-x-1">
        <a
          className="p-2 text-lg h-11 truncate overflow-ellipsis font-semibold rounded-lg hover:bg-gray-200"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
        <div className="flex flex-col  space-y-2 mt-2">
          <p className=" h-5 truncate overflow-ellipsis">{special}</p>
          {!genre ? (
            <a
              className="h-5 w-32 px-2 rounded-lg hover:bg-gray-200"
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              レビューを確認する
            </a>
          ) : (
            <p className="h-5 truncate overflow-ellipsis">{genre}</p>
          )}
          <p className="text-xs">{address}</p>
        </div>
      </div>
    </li>
  )
}
