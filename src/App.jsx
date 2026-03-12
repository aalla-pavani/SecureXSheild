import { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      alert("Please enter a URL");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await fetch("https://securexsheild.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (err) {
      alert("Error connecting to backend: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-green-800 flex justify-center items-center">
      <div className="w-5/6 h-5/6 bg-[#1F2833] flex rounded-2xl shadow-lg overflow-hidden">
        {/* Left side: Input and results */}
        <div className="w-1/2 flex flex-col justify-center items-center text-white p-8 gap-6">
          <form
            className="flex flex-col items-center gap-4"
            onSubmit={handleSubmit}
          >
            <label className="text-4xl font-bold">Phishing Detection</label>
            <input
              placeholder="Enter a URL"
              className="bg-blue-300 outline-none w-80 h-10 p-3 rounded-md text-black"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              disabled={loading}
              className="bg-[#8EC5FF] hover:bg-[#6daeff] text-black font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
            >
              {loading ? "Detecting..." : "Detect"}
            </button>
          </form>

          {result && (
            <div className="mt-6 text-center">
              <h1 className="text-2xl font-bold">Prediction:</h1>
              <p className="text-3xl text-yellow-300 font-semibold mt-2">
                {result.verdict}
              </p>

              <h2 className="mt-4 text-lg">
                Legitimate:{" "}
                <span className="font-bold text-green-400">
                  {result.probabilities.legitimate.toFixed(4)}
                </span>
              </h2>
              <h2 className="text-lg">
                Phishing:{" "}
                <span className="font-bold text-red-400">
                  {result.probabilities.phishing.toFixed(4)}
                </span>
              </h2>
            </div>
          )}
        </div>

        {/* Right side: Parsed + features */}
        <div className="w-1/2 bg-white p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold text-center mb-4">
            URL & Feature Details
          </h1>

          {result ? (
            <>
              {/* Parsed URL details */}
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">Parsed URL:</h2>
                {Object.entries(result.parsed_url).map(([key, value]) => (
                  <p key={key}>
                    <span className="font-semibold capitalize">{key}:</span>{" "}
                    {String(value)}
                  </p>
                ))}
              </div>

              {/* Feature details */}
              <h2 className="text-xl font-semibold mb-2">Extracted Features:</h2>
              <div className="space-y-2">
                {result.feature_names.map((name, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between border-b py-1 text-sm"
                  >
                    <span>{name}</span>
                    <span className="font-semibold">
                      {result.features[idx]}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center mt-8">
              Enter a URL to view parsed details and extracted features
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
