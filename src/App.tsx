import { Route, Routes, Link, useLocation } from "react-router-dom";
import PrivyConnect from "./pages/PrivyConnect";
import AppKitConnect from "./pages/AppKitConnect";

const App = () => {
  const location = useLocation();

  const linkClass = (path: string, activeColor: string) =>
    `text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
      location.pathname === path
        ? `${activeColor} bg-white/10`
        : "text-slate-400 hover:text-slate-200"
    }`;

  return (
    <div className="bg-[#05070a] min-h-screen">
      <nav className="relative z-10 border-b border-white/10 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <span className="text-white font-semibold mr-4">Wagmi Wallet Connect</span>
          <Link to="/" className={linkClass("/", "text-indigo-300")}>
            Privy
          </Link>
          <Link to="/appkit" className={linkClass("/appkit", "text-emerald-300")}>
            AppKit
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<PrivyConnect />} />
        <Route path="/appkit" element={<AppKitConnect />} />
      </Routes>
    </div>
  );
};

export default App;