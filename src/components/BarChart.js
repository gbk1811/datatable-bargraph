/* Plot bar chat */
import React, {useState, useEffect}from "react";
import Plot from 'react-plotly.js'

/* Recieve data for plotting graph as prop */
const BarChart = ({chart}) => {
    console.log(chart);
    const xData =[];
    const yData = [];
    chart?.map((item)=>{
        xData.push(item.title);
        yData.push(item.price);
    })
    /* define and set intial data for graph */
    const[chartData,setChartData]=useState({data: [
        {
        x:[],y:[],
       type: 'bar',
       mode: 'lines+markers',
       maker: {color: 'red'},
        },
     ]});
     /* Any Change in coordinates data would be set here to plot new graph */
     useEffect(() => {
        setChartData((chartData) => ({
            ...chartData,
            data: [{ ...chartData.data[0], y: yData, x: xData }],
        }));
    }, [chart]);
    /* Plot graph */
  return (
    <div className="col-span-4">
        <h1 className="mx-10 px-10 py-2 text-2xl font-bold">Bar Plot</h1>        
        <Plot data={chartData.data}
        layout={{width:"400px", height:"300px", title: 'Product Unit Price', xaxis:{title:"Product Name"}, yaxis:{title:"Price"}}}
        />
    </div>
  )
}

export default BarChart
