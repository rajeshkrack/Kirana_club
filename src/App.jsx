import { AppProvider } from "@shopify/polaris";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ContestDetails from "./pages/ContestDetails";

function App() {
  return (
    <>
    <AppProvider i18n={{}}>
      {/* <Router>
        <div className="bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contest/:contestId" element={<ContestDetails />} />
          </Routes>
        </div>
      </Router> */}
    </AppProvider>
    <Dashboard />
    </>
  );
}

export default App;