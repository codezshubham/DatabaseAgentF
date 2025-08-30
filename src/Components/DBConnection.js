import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Database, PlugZap } from "lucide-react";
import { toast } from "react-toastify";

function DBConnection({ onConnect, onExampleClick }) {
    const [host, setHost] = useState("localhost");
    const [port, setPort] = useState(3306);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [database, setDatabase] = useState("");
    const [connected, setConnected] = useState(false);
    const [examples, setExamples] = useState([]);
    const hasAutoConnected = useRef(false);
    const API_BASE = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    // Load saved config on mount
    useEffect(() => {
        if (hasAutoConnected.current) return;  // ✅ run only once
            hasAutoConnected.current = true;

        const saved = JSON.parse(localStorage.getItem("dbConfig"));
        if (saved) {
            setHost(saved.host);
            setPort(saved.port);
            setUser(saved.user);
            setPassword(saved.password);
            setDatabase(saved.database);

            // Try reconnect automatically
            axios.post(`${API_BASE}/connect`, saved)
                .then(res => {
                    if (res.data.success) {
                        setConnected(true);
                        toast.dismiss(); 
                        toast.success("✅ Auto reconnected to DB!");
                        onConnect();
                        fetchExamples();
                    }
                })
                .catch(() => {
                    toast.error("⚠️ Auto reconnect failed.");
                });
        }
    }, []);

    const fetchExamples = async () => {
        try {
            const tblRes = await axios.get(`${API_BASE}/tables`);
            if (tblRes.data.success) {
                const tables = tblRes.data.tables;
                const allQuestions = tables.flatMap((t) => [
                    `Show all records from ${t}`,
                    `How many rows are in ${t}?`,
                    `List first 5 entries from ${t}`,
                    `What are the column names in ${t}?`,
                ]);

                const sampleQuestions = allQuestions
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 5);
                setExamples(sampleQuestions);
            }
        } catch (err) {
            console.error("❌ Error fetching tables:", err.message);
        }
    };

    const connectDB = async () => {
        try {
            const config = { host, port, user, password, database };
            const res = await axios.post(`${API_BASE}/connect`, config);

            if (res.data.success) {
                setConnected(true);
                toast.success("✅ Database connected successfully!");
                onConnect();

                // Save config in localStorage
                localStorage.setItem("dbConfig", JSON.stringify(config));

                fetchExamples();
            } else {
                toast.error("❌ Failed to connect: " + res.data.message);
            }
        } catch (err) {
            toast.error("❌ DB Connection failed: " + (err.response?.data?.message || err.message));
        }
    };

    const disconnectDB = () => {
        setConnected(false);
        localStorage.removeItem("dbConfig"); // ❌ remove saved creds
        toast.info("🔌 Disconnected & config cleared.");
    };

    return (
        <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
            {/* Header */}
            <div className="flex items-center mb-4 gap-2">
                <Database className="text-blue-400" size={28} />
                <h2 className="text-2xl font-bold">Connect to Database</h2>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
                {/* Host + Port Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Host</label>
                        <input type="text" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg"
                            value={host} onChange={(e) => setHost(e.target.value)} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Port</label>
                        <input type="number" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg"
                            value={port} onChange={(e) => setPort(Number(e.target.value))} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">User</label>
                    <input type="text" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg"
                        value={user} placeholder="Enter your username" onChange={(e) => setUser(e.target.value)} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input type="password" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg"
                        value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Database</label>
                    <input type="text" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg"
                        value={database} placeholder="Enter your database name" onChange={(e) => setDatabase(e.target.value)} />
                </div>
            </div>

            {/* Connect/Disconnect */}
            {!connected ? (
                <button onClick={connectDB} className="mt-5 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                    <PlugZap size={20} /> Connect
                </button>
            ) : (
                <button onClick={disconnectDB} className="mt-5 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                    Disconnect
                </button>
            )}

            {connected && <p className="text-green-400 mt-3 text-center font-medium">✅ Connected!</p>}

            {/* Example Questions */}
            {connected && examples.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">💡 Example Questions</h3>
                    <ul className="space-y-2">
                        {examples.map((q, idx) => (
                            <li key={idx}
                                className="bg-gray-800 p-3 rounded-lg border border-gray-700 text-sm hover:bg-gray-700 cursor-pointer transition"
                                onClick={() => onExampleClick(q)}>
                                {q}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DBConnection;
