import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Callback from "./pages/Callback";
import Home from "./pages/Home";
// import FeaturesPage from "./pages/FeaturesPage";  // Example additional page
// import NotFoundPage from "./pages/NotFoundPage";  // 404 page (optional)

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-black">
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/callback" element={<Callback />} />
                    <Route path="/home" element={<Home />} />
                    {/*<Route path="/features" element={<FeaturesPage />} />*/}
                    {/*<Route path="*" element={<NotFoundPage />} />  /!* Catch-all for unknown routes *!/*/}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}
