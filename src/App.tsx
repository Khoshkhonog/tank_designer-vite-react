import { BrowserRouter, Routes, Route } from "react-router";
import DesignerMainWindow from "./components/designer_main_window";
import Header from "./components/header/header";
import CopyrightPage from "./components/header/copyright";
import ChassisChoice from "./components/chassis_choice/chassis_choice";
import { StateProvider } from './components/context/context';
function App() {
  return <>
    <BrowserRouter>
      <StateProvider>
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <ChassisChoice />
              <DesignerMainWindow />
            </>
          } />
          <Route path="/copyrights" element={<CopyrightPage />} />
        </Routes>
        <div className="app-footer">
          <hr />
          <div>© Paradox Interactive. Trademarks belong to their respective owners. All rights reserved.</div>
        </div>
      </StateProvider>
    </BrowserRouter>
  </>
}

export default App
