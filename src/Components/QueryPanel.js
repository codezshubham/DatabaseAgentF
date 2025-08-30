import { useState } from "react";
import axios from "axios";
import { Sparkles, Database, Play, Clipboard } from "lucide-react";
import { toast } from "react-toastify";

function QueryPanel({ question, setQuestion }) {
  const [sql, setSql] = useState("");
  const [results, setResults] = useState([]);
  const [tableName, setTableName] = useState("");

  // Generate SQL
  const generateSQL = async () => {
    try {
      const res = await axios.post("http://localhost:5000/generate-sql", { question });
      if (res.data.success) {
        setSql(res.data.sql || "");
        setResults([]);
        toast.success("✅ SQL Generated Successfully!");
      } else {
        toast.error("❌ SQL Generation failed: " + res.data.message);
      }
    } catch (err) {
      toast.error("Error generating SQL: " + (err.response?.data?.message || err.message));
    }
  };

  // Execute SQL
  const executeSQL = async () => {
    if (!sql) return toast.warn("⚠️ No SQL query to execute!");
    try {
      const res = await axios.post("http://localhost:5000/execute", { sql });
      if (res.data.success) {
        setResults(res.data.results || []);
        setTableName(res.data.table || "");
        toast.success("🚀 Query Executed Successfully!");
      } else {
        toast.error("❌ Execution failed: " + res.data.message);
      }
    } catch (err) {
      toast.error("Error executing SQL: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="space-y-8">
      {/* Question Input */}
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="text-yellow-400" /> Ask your Question
        </h2>
        <input
          type="text"
          placeholder="e.g. Show me all products with prices"
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <div className="mt-8 flex gap-3">
          <button
            onClick={generateSQL}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2.5 rounded-xl shadow-md hover:opacity-90 transition"
          >
            <Database size={18} /> Generate SQL
          </button>
        </div>
      </div>

      {/* SQL Result */}
      {sql && (
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
            📝 Generated SQL
            <button
              onClick={() => {
                navigator.clipboard.writeText(sql);
                toast.info("📋 SQL copied to clipboard!");
              }}
              className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg text-sm transition"
            >
              <Clipboard size={14} /> Copy
            </button>
          </h2>
          {/* <pre className="bg-black/70 text-green-400 font-mono text-sm p-4 rounded-lg overflow-x-auto">
            {sql}
          </pre> */}
          <pre className="bg-gray-950 font-mono text-sm p-5 rounded-xl overflow-x-auto leading-relaxed shadow-inner border border-gray-800 whitespace-pre-wrap">
            {sql.split("\n").map((line, lineIndex) => (
              <div key={lineIndex} className="flex">
                {/* Optional Line Numbers */}
                <span className="text-gray-600 w-8 text-right pr-3 select-none">
                  {lineIndex + 1}
                </span>

                {/* SQL Content */}
                <span>
                  {line.split(/\s+/).map((word, i) => {
                    if (/^(SELECT|FROM|WHERE|GROUP|BY|ORDER|HAVING|JOIN|ON|AS|AND|OR|COUNT|SUM|AVG|DISTINCT)$/i.test(word)) {
                      return <span key={i} className="text-blue-400 font-semibold">{word} </span>;
                    }
                    if (/^'.*'$/.test(word)) {
                      return <span key={i} className="text-yellow-400">{word} </span>;
                    }
                    if (/^[0-9]+$/.test(word)) {
                      return <span key={i} className="text-red-400">{word} </span>;
                    }
                    return <span key={i} className="text-gray-200">{word} </span>;
                  })}
                </span>
              </div>
            ))}
          </pre>


          <div className="mt-10">
            <button
              onClick={executeSQL}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 px-5 py-2.5 rounded-xl shadow-md hover:opacity-90 transition"
            >
              <Play size={18} /> Execute This
            </button>
          </div>
        </div>
      )}

      {/* Final Results */}
      {results && (
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3">
            📊 Query Results {tableName && <span className="text-gray-400">(from table: {tableName})</span>}
          </h2>
          {results.length === 0 ? (
            <p className="text-gray-400 italic">No rows found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="table-auto w-full text-left text-sm">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    {Object.keys(results[0]).map((col) => (
                      <th key={col} className="px-3 py-2 border border-gray-700">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-800/50 transition">
                      {Object.values(row).map((val, j) => (
                        <td key={j} className="px-3 py-2 border border-gray-700">
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default QueryPanel;
