// import Navbar from './_components/navbar'
import ProblemState from './_context/problems/ProblemState'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RCOE Mentoring',
  description: 'A Mentoring Web-site for RCOE',
}



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar /> */}
        <ProblemState>
          {children}
        </ProblemState>
      </body>
    </html>
  )
}
