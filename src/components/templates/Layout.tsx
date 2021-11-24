import { VFC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white text-sm font-mono">
      <main className="flex flex-1 flex-col justify-center items-center w-screen">
        {children}
      </main>
    </div>
  )
}
