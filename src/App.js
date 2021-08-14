import { Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Cart from './components/Cart'
import Default from './components/Default'
import Details from './components/Details'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Modal from './components/Modal'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={ProductList} />
        <Route exact path='/details' component={Details} />
        <Route exact path='/cart' component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal />
    </>
  )
}

export default App
