import { Routes, Route } from 'react-router'
import SaleList from './component/saleList'
import RentList from './component/rentList'
import Landing from './component/landing'
import Profile from './component/profile'
import UpdateProfile from './component/updateProfile'
import Login from './component/login'
import SignUp from './component/signUp'
import BookBike from './component/bookBike'
import './App.css'
import InsertForm from './component/InsertForm'
function App() {

  return (
    <>
    <Routes>
      <Route path='/rent' element={<RentList/>}/>
      <Route path='/sale' element={<SaleList />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/updateProfile/:id' element={<UpdateProfile/>} ></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/bookForRent/:id' element={<BookBike type={'rent'} />}></Route>
      <Route path='/bookForSale/:id' element={<BookBike type={'sale'} />}></Route>
      <Route path='/' element={<Landing />}></Route>
      <Route path='/rentForm' element={<InsertForm formTitle="Add vehicle for Sell" formUrl="http://localhost:7000/rent/insert" cost="Price/hr"/>}></Route>
      <Route path='/saleForm' element={<InsertForm formTitle="Add vehicle for Rent" formUrl="http://localhost:7000/sale/insert" cost="Price"/>}></Route>
    </Routes>
  
    </>
  )
}

export default App
