/****** 
 * Product Listing from API Data
 ******/

import React, {useState, useEffect, useCallback} from 'react';
import DataTable from 'react-data-table-component';
import { API_URL,PAGE_LIMIT } from '../utils/constants';
import BarChart from './BarChart';

const Products = ()=> {
    /* Declare all state variable and methods */
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(PAGE_LIMIT);
    const [search, SetSearch]= useState('');
    const [filter, setFilter]= useState([]);   
    const [chart,setChart] = useState([]); 
    /* Header of Data Table */
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            width: '50px'
        },
        {
            name: 'Title',
            selector: row => row.title,
            width: '100px'
        },
        {
            name: 'Description',
            selector: row => row.description,
            width: '500px'
        },
        {
            name: 'Price',
            selector: row => row.price,
            width: '100px'
        },
        {
            name: 'Stock',
            selector: row => row.stock,
            width: '100px'
        },
      ];

      useEffect(() => {
        fetchData(0, perPage);
      }, [perPage])
    /* Get Data from API and assign to state variables */
      const fetchData = async (page, per_page) => {
        try {
          const data = await fetch(`${API_URL}?skip=${page}&limit=${per_page}`);
          const result = await data.json(); 
            if (result) {
              setIsLoaded(true);
              setItems(result.products);
              setTotalRows(result.total);
              setFilter(result.products);
              setChart(items.filter((item)=>item.id < 6));
            }
          } catch (error) {
            setIsLoaded(true);
            setError(error);
          }    
      }
      /* Prodct data filter on title */
      useEffect(()=>{
        const result= items.filter((item)=>{
         return item.title.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilter(result);
      },[search]);
      /* Selected row data to plot the graph and memoised */
      const handleChartData =  useCallback((state) => {
         return setChart(state.selectedRows);      
      },[]);
      /* Pre select initial 5 rows of data */
      const handleInitialData = useCallback((row) => {
      
         return row.id < 6;

     },[]);
    
     /* set customer header style */
      const tableHeaderstyle={
        headCells:{
            style:{              
                fontWeight:"bold",
                fontSize:"14px",
                backgroundColor:"#ccc"
    
            },
        },
       }
    /* Pagination and calculate to skip data */
      const handlePageChange = page => {
     
        fetchData((page-1)*perPage, perPage);
      }
    /* Per page Pagination and calculate to skip data */
      const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage);
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
        <div className="'grid grid-flow-col w-full flex">  
          <div className="col-span-8" >
            <h1 className="px-10 py-2 text-2xl font-bold">Product List</h1>
            <DataTable
              columns={columns}
              data={filter}
              customStyles={ tableHeaderstyle}
              fixedHeader
              highlightOnHover
              selectableRows
              selectableRowSelected={handleInitialData}
              onSelectedRowsChange={handleChartData}               
              pagination
              paginationServer
              paginationRowsPerPageOptions={[10, 15, 30, 50,100]}
              paginationTotalRows={totalRows}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              paginationIconFirstPage={"First"}
              paginationIconLastPage={"Last"}
              paginationIconNext={"Next"}
              paginationIconPrevious={"Prev"}                            
              subHeader
              subHeaderComponent={
              <input type="text"
                 className='w-5/12 p-4 m-4 col-span-4 border border-blue-500 rounded-lg'
                 placeholder="Filter by product title..."
                 value={ search}
                 onChange={(e)=>SetSearch(e.target.value)}
                 
                />
              }

              subHeaderAlign="left"
         
            />         
            </div>
            <div className="col-span-4">
                {<BarChart chart={chart} />}
            </div>
            </div>
      );
    }  
}

export default Products;