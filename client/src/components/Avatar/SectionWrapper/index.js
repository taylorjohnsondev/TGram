import React from "react";

import "./index.css";

export default function SectionWrapper({
  className,
  children,
  handleFeatureChange,
  tip,
}) {
  return (
    <div
      className={"SectionWrapper " + className}
      data-tip={tip}
      onClick={handleFeatureChange}
    >
      <div className="children-container">
        <div className="childrenWrapper children-item">
          {children}
        </div>
      </div>
    </div>
  );
}
