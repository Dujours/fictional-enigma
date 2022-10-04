import * as React from "react";
// Used material UI
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

// create Header columns for table head by using material ui standards
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 90 }
];

export default function HomePage() {
  //
  const [userData, setUsertData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const meberData = async () => {
    const url = searchData
      ? `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json?name = ${searchData}`
      : "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const response = await fetch(url);
    const finalData = await response.json();
    console.log(finalData);
    setUsertData(finalData);
  };
  const handleChange = (e) => {
    setSearchData(e.target.value);
  };
  useEffect(() => {
    meberData();
  }, [searchData]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <TextField
        className="search"
        id="outlined-name"
        label="Search user name,email,role"
        value={searchData}
        onChange={handleChange}
      />
      {/* Importated datagrid components from material UI mui*/}
      <DataGrid
        rows={userData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
