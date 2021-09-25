import React from "react";
import DataTable from "./DataTable";


const RegistrationForm = () => {
  return (
    <div
      style={{ backgroundColor: "#EEF3FA", minHeight: "100vh", height: "100%" }}
      className="container-fluid"
    >
      
      <div className="container-fluid pt-5  pb-5">
        <DataTable />
      </div>
    </div>
  );
};

export default RegistrationForm;
