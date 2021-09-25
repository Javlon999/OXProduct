import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment'
import PageHeader from "../components/PageHeader";
import { Paper, makeStyles, TableBody, TableRow, TableCell, TableContainer,Table,Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../components/useTable";
import Controls from "../components/controls/Controls";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '20%'
    },
    loadingCircle: {
         
        alignItems:'center',
        textAlign:'center',
   },
    newButton: {
        position: 'absolute',
       
    }
}))


const headCells = [
    { id: 'id', label: 'id' },
    { id: 'name', label: 'name' },
    { id: 'sellPrice', label: 'sellPrice' },
    { id: 'approvals', label: 'approvals' },
    { id: 'productName', label: 'productName' },
    { id: 'supplierName', label: 'supplierName' },
    { id: 'sku', label: 'sku' },
    { id: 'propertySize', label: 'propertySize' },
    { id: 'propertyColor', label: 'propertyColor' },

]
 
export default function SortFilterTable(props) {
    let rows = [];
    const classes = useStyles();
  
    const tableData = useSelector((state) => state.data.getTable);
    const data = tableData.items;
  
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

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
    console.log('rows', rows)
    let records = rows ? rows:'';
    //   const [records, setRecords] = useState([rows])
    const {
  
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);
    
    const handleSearchByName = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.name.includes(target.value))
            }
        })
    }
 

    return (

        <div >
          
            <PageHeader
                title="Sorting and Filtering Table"
                subTitle=""
            />
         
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="search by name"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearchByName}
                    />
                </Toolbar>
                
                <TableContainer>
               <Table  stickyHeader aria-label="sticky table" className={classes.tableContainer}>
                    <TblHead />
                    <TableBody className="table-bordered">
                            {recordsAfterPagingAndSorting().map((item, i) => {
                                return (
                                  
                                    <TableRow key={item.id} >
                                      <TableCell>{i+1}</TableCell>      
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.sellPrice}</TableCell>
                                <TableCell>{item.approvals}</TableCell>
                                <TableCell>{item.productName}</TableCell>
                                 <TableCell>{item.supplierName}</TableCell>
                                    <TableCell>{item.sku}</TableCell>
                                    <TableCell>{item.propertySize}</TableCell>
                                    <TableCell>{item.propertyColor}</TableCell>
                                </TableRow>
                        )})}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TblPagination />
            
            </Paper>
            
            </div>
    )
}