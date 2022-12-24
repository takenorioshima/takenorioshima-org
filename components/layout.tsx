import Alert from './alert'
import Header from './header'
import Footer from './footer'
import Meta from './meta'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <Alert preview={preview} />
      <Header />
      <div className="min-h-screen pt-12">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
