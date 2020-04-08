import GlobalStyles from '../styles/global'
import 'prismjs/themes/prism-tomorrow.css'

const App = ({ Component, pageProps }) => (
  <>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
)

export default App
