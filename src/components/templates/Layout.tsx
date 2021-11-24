import { VFC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 text-gray-500 text-sm font-mono">
      <main className="flex flex-1 flex-col pt-5 space-y-3 items-center w-screen">
        {children}
      </main>
    </div>
  )
}
