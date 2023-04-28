import useRouteElements from './useRouteElements'
// eslint-disable-next-line import/no-unresolved

function App() {
  const routerElements = useRouteElements()

  return <div>{routerElements}</div>
}

export default App
