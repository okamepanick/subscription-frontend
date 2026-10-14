
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./pages/Home";
import { SubscriptionDetail } from "./pages/SubscriptionDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscriptions/:id" element={<SubscriptionDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App