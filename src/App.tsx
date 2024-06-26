import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store'
import Home from './pages/Home/Home'


function App() {
  return (
    <Provider store={store}>
         <Home />
    </Provider>
  )
}

export default App
