import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// eslint-disable-next-line import/no-unresolved

function App() {
  const routerElements = useRouteElements()

  return (
    <div>
      {routerElements}
      <ToastContainer />
    </div>
  )
}

export default App
