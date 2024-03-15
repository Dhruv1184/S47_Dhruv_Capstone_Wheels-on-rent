import { Routes, Route } from 'react-router'
// import Navigation from './component/navigation'
import SaleList from './component/saleList'
import RentList from './component/rentList'
import Landing from './component/landing'
import InsertFormRent from './component/InsertFormRent'
import Profile from './component/profile'
import UpdateProfile from './component/updateProfile'
// import InsertFormSale from './component/InsertFormSale'
import './App.css'
function App() {

  return (
    <>
    <Routes>
      <Route path='/rent' element={<RentList/>}/>
      <Route path='/rentForm' element={<InsertFormRent />}></Route>
      <Route path='/sale' element={<SaleList />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/updateProfile/:id' element={<UpdateProfile/>} ></Route>
      {/* <Route path='/saleForm' element={<InsertFormSale />}></Route> */}
      <Route path='/' element={<Landing />}></Route>
    </Routes>
  
    </>
  )
}

export default App
