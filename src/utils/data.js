const option = {
     series: [
          {
               data: [
                    { x: "Code", y: [new Date("2019-03-02").getTime(), new Date("2019-03-04").getTime()] },
                    { x: "Test", y: [new Date("2019-03-04").getTime(), new Date("2019-03-08").getTime()] },
                    { x: "Validation", y: [new Date("2019-03-08").getTime(), new Date("2019-03-12").getTime()] },
                    { x: "Deployment", y: [new Date("2019-03-12").getTime(), new Date("2019-03-18").getTime()] }
               ]
          }
     ],
     options: {
          plotOptions: { bar: { horizontal: true } },
          chart: { zoom: { enabled: false } },
          yaxis: { show: false },
          xaxis: { type: "datetime" },
          grid: { xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } }
     }
};

const countries = [
     {
          name: 'United States',
          states: [
               {
                    name: 'California',
                    cities: ['Los Angeles', 'San Francisco', 'San Diego']
               },
               {
                    name: 'Texas',
                    cities: ['Houston', 'Dallas', 'Austin']
               }
          ]
     },
     {
          name: 'Canada',
          states: [
               {
                    name: 'Ontario',
                    cities: ['Toronto', 'Ottawa', 'Hamilton']
               },
               {
                    name: 'Quebec',
                    cities: ['Montreal', 'Quebec City', 'Laval']
               }
          ]
     }
];

export { option, countries };
