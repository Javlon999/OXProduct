import React from "react";
import DataTable from "./DataTable";


const ComplexTable = () => {
  return (
    <div
      style={{ backgroundColor: "#EEF3FA", minHeight: "100vh", height: "100%" }}
      className="container"
    >
      
      <div className="container">
        <DataTable />
      </div>
    </div>
  );
};

export default ComplexTable;
