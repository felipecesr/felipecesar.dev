import './global.css'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="pt-BR">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
