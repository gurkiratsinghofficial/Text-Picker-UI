import React, { useState } from "react";

function Documentation() {
  const [changeCount, setChangeCount] = useState(0);
  return (
    <>
      <h1 className="documentation-title">Text Picker Component</h1>
      <div className="documentation-container">
        <input
          onChange={() => setChangeCount(changeCount + 1)}
          type="text"
          placeholder="Enter title..."
          className="documentation-input"
        />
        <textarea
          onChange={() => setChangeCount(changeCount + 1)}
          placeholder="Write your documentation here..."
          className="documentation-textarea"
        />
      </div>
      <div className="documentation-title">
        onChange triggered: <b>{changeCount}</b>
      </div>
    </>
  );
}

export default Documentation;
