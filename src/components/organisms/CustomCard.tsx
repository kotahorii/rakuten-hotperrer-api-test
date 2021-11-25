import { useTest } from 'hooks/useTest'
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
  const { textCut } = useTest()
  return (
    <li className="bg-gray-50 p-3 flex items-center shadow-md flex-row space-x-3 text-gray-500 rounded-lg w-full ">
      <div className="w-32 h-24 flex flex-col justify-center items-center">
        <img
          className="object-cover w-full h-full rounded-lg shadow-md"
          src={src}
          alt="hotel"
        />
      </div>
      <div className="flex flex-col space-x-1">
        <a
          className="p-2 text-lg h-11 font-semibold rounded-lg hover:bg-gray-200"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {textCut(title, 27)}
        </a>
        <div className="flex flex-col space-y-2 mt-2">
          <p className=" h-5">{textCut(special, 37)}</p>
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
            <p className="h-5">{genre}</p>
          )}
          <p className="text-xs">{address}</p>
        </div>
      </div>
    </li>
  )
}
