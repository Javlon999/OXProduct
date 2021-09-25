import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import moment from "moment";
import { getFormData } from "../../Redux/Actions";

import { useDispatch, useSelector } from "react-redux";

const DataTable = () => {
  let rows = [];

  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.data.getTable);
  const data = tableData.items;
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      dispatch(getFormData());
    }, 500);
    setLoading(true);
    return () => clearTimeout(timer);
  }, []);

  if (data) {
    data.forEach((item) => {
      
      item.productCountry = item.productProperties[0] ? item.productProperties[0].value : ''
      if (item.stocks[0]) {
      item.sellPrice = item.stocks[0].sellPrice.USD 
        item.supplyPrice = item.stocks[0].supplyPrice.USD
        item.insideSupplyPrice = item.stocks[0].supplyPrice
        
      }
      if (item.importRecord) {
        item.productName =  item.importRecord.productName
        item.supplierName = item.importRecord.supplierName
      }
      item.propertySize = item.properties[0] ? item.properties[0].value : ''
      item.propertyColor=item.properties[1] ?item.properties[1].value:''
      item.approvals=moment(item.importRecord.approvals[0].time).format("YYYY-MM-DD")
   
      return rows.push(item);
    });
    
  }



  const columns = [
    { field: "id", hide: true, headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "name",
      width: 220,
      editable: true,
    },
    {
      field: "sellPrice",
      headerName: "sellPrice $",
      width: 150,
      
    },
    {
      field: "approvals",
      headerName: "approvals",
      width: 170,
      type:'date'

    },
    {
      field: "productName",
      headerName: "productName",
      width: 220,
   
    },
    {
      field: "supplierName",
      headerName: "supplierName",
      width: 150,
  
    },
    {
      field: "sku",
      headerName: "sku",
      width:180,
    },
    {
      field: "propertySize",
      headerName: "propertySize",
      width: 200,
    },
    {
      field: "propertyColor",
      headerName: "propertyColor",
      width: 200,
    },
 
 
  ];


  return (
    <div
      className="container"
      style={{  padding:'50px' }}
    >
      <div>
        <h3>Product Table</h3>
      </div>

      <div style={{ height: 400, width: "100%", backgroundColor: "#ffff" }}>
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">loading</span>
          </div>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
              pageSize={5}
            columnBuffer={2}
            rowsPerPageOptions={[10]}
          />
        )}
      </div>
    </div>
  );
};

export default DataTable;
