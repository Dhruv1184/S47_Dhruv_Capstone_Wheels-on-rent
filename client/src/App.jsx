import { Routes, Route } from 'react-router'

// import Navigation from './component/navigation'
import RentList from './component/rentList'
// import Landing from './component/landing'
import InsertFormRent from './component/InsertFormRent'
// import InsertFormSale from './component/InsertFormSale'
import './App.css'
function App() {

  return (
    <>
    <Routes>
      <Route path='/rent' element={<RentList/>}/>
      <Route path='/rentForm' element={<InsertFormRent />}></Route>
    </Routes>
  
    </>
  )
}

export default App
