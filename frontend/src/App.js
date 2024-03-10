import "./App.css";
import configFetch from "./configFetch";

import React, { useState } from "react";

const fetchSVG = async () => {
  console.log("apiURL:", configFetch.apiUrl);
  try {
    const response = await fetch(`${configFetch.apiUrl}/generateSVG`, {
      method: "POST",
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    return result; // Return the SVG data
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error; // Rethrow the error to handle it later
  }
};

function App() {
  const [svgData, setSvgData] = useState(null);

  const handleFetchClick = async () => {
    try {
      const result = await fetchSVG();
      setSvgData(result);
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <div className="App">
      <p>Fetch SVG</p>
      <button onClick={handleFetchClick}>Fetch SVG</button>
      {svgData && <div dangerouslySetInnerHTML={{ __html: svgData.svg }} />}
    </div>
  );
}

export default App;
