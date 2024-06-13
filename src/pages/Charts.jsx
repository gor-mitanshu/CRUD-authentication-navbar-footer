import React from 'react'
import { option } from '../utils/data'
import Chart from "react-apexcharts";
import Card from '../ui/Card';

const Charts = () => {
     return (
          <>
               <Card title={ "Chart" }>
                    <div className="chart-container">
                         <Chart
                              options={ option.options }
                              series={ option.series }
                              type="rangeBar"
                              width="100%"
                              height="300"
                         />
                    </div>
               </Card>
          </>
     )
}

export default Charts