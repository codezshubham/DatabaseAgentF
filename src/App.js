import { useState } from "react";
import DBConnection from "./Components/DBConnection";
import QueryPanel from "./Components/QueryPanel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [connected, setConnected] = useState(false);
  const [question, setQuestion] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800/70 p-6 flex items-center justify-between bg-gray-950/60 backdrop-blur-lg shadow-xl relative">
  {/* Title + Tagline */}
  <div className="flex flex-col">
    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3 group">
      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg">
        💬
      </span>
      <span className="relative bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-md transition-all duration-300 group-hover:brightness-125">
        AI Database Agent
        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 transition-all duration-500 group-hover:w-full"></span>
      </span>
    </h1>
    <p className="text-sm text-gray-400 mt-1">
      ⚡ Talk to your database with AI
    </p>
  </div>

  {/* Connection Badge */}
  {connected ? (
    <span className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full bg-green-600/10 text-green-400 border border-green-500/30 shadow-inner animate-pulse">
      <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]"></span>
      ✅ Connected
    </span>
  ) : (
    <span className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full bg-red-600/10 text-red-400 border border-red-500/30 shadow-inner">
      <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_2px_rgba(239,68,68,0.7)]"></span>
      🔴 Disconnected
    </span>
  )}
</header>


      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* LEFT - DB Connection */}
        <div className="col-span-1 bg-gray-950/60 backdrop-blur-md rounded-2xl shadow-lg border border-gray-800 p-5 hover:shadow-blue-500/10 transition">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
            🔗 Database Connection
          </h2>
          <DBConnection
            onConnect={() => setConnected(true)}
            onExampleClick={setQuestion}
          />
        </div>

        {/* RIGHT - Query Panel */}
        <div className="col-span-2 bg-gray-950/60 backdrop-blur-md rounded-2xl shadow-lg border border-gray-800 p-5 hover:shadow-purple-500/10 transition">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
            📊 Query Panel
          </h2>
          {connected ? (
            <QueryPanel question={question} setQuestion={setQuestion} />
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              ⚡ Connect to a database first
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}

export default App;
