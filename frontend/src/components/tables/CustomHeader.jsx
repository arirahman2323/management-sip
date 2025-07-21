import React from "react";

const CustomHeader = ({ title }) => (
  <div
    // Custom header component DataTable
    style={{ whiteSpace: "normal", wordWrap: "break-word", lineHeight: "1.3" }}
  >
    {title}
  </div>
);

export default CustomHeader;
