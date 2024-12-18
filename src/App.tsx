import { Route, Routes } from "react-router-dom"
import NavBarComponent from "./components/Navbar/NavBarComponent"
import HomePage from "./pages/HomePage"
import Viviendas from "./pages/Viviendas"
import Nosotros from "./pages/Nosotros"
import PurchasePage from "./pages/PurchasePage"
import PurchaseDetailPage from "./pages/PurchaseDetailPage"
import PurchaseDetailPage2 from "./pages/PurchaseDetailPage2"

function App() {

  return (
    <div className='h-screen'>
      <header>
        <NavBarComponent/>        
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/viviendas" element={<Viviendas/>}/>
          <Route path="/nosotros" element={<Nosotros/>}/>
          <Route path="/purchase/:houseId"  element={<PurchasePage/>} />
          <Route path="/purchaseDetail" element={<PurchaseDetailPage/>}/>
          <Route path="/purchaseDetail2" element={<PurchaseDetailPage2/>}/>
        </Routes>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App
