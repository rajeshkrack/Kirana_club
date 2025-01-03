import { AppProvider } from "@shopify/polaris";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ContestDetails from "./pages/ContestDetails";

function App() {
  return (
    <AppProvider i18n={{}}>
        <div className="bg-teal-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contest/:contestId" element={<ContestDetails />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
