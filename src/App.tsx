import { Route, Routes } from "react-router-dom"
import NavBarComponent from "./components/Navbar/NavBarComponent"
import HomePage from "./pages/HomePage"
import BienesRaizes from "./pages/BienesRaizes"

function App() {

  return (
    <div className='h-screen'>
      <header>
        <NavBarComponent/>        
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/bienes&raizes" element={<BienesRaizes/>}/>
        </Routes>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App
