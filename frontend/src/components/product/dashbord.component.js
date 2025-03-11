import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { colors } from '@mui/material';
// import { alignProperty } from '@mui/material/styles/cssUtils';

const DashboardComponent = () => {
  const [issues, setIssues] = useState([]);
  const [severityCounts, setSeverityCounts] = useState({ critical_0: 0, high: 0, medium: 0, low: 0 });
  const [riskScoreCounts, setRiskScoreCounts] = useState({ high: 0, medium: 0, low: 0 });
  const [combinedData, setCombinedData] = useState([]);

  const[donutCount, setdonutCount] = useState ({ patchingRelated: 0, application: 0, browserRelated: 0, tlsRelated: 0, configuration_related: 0, softwareUpgradeRelated: 0});

  
  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    await axios.get(`http://localhost:8000/api/issues/`).then(({ data }) => {
      setIssues(data.issues);
      calculateSeverityCounts(data.issues);
      calculateRiskScoreCounts(data.issues);
      calculatedonutScoreCounts(data.issues);
      calculateCategoryCounts(data.issues);
    });
  };

  const calculateSeverityCounts = (issues) => {
    let criticalCount_o = 0;
    let highCount = 0;
    let mediumCount = 0;
    let lowCount = 0;

    issues.forEach((issue) => {
      switch (issue.severity) {
        case 1:
          criticalCount_o++;
          break;
        case 2:
          highCount++;
          break;
        case 3:
          mediumCount++;
          break;
        case 4:
          lowCount++;
          break;
        default:
          break;
      }
    });
    setSeverityCounts({ critical_0: criticalCount_o, high: highCount, medium: mediumCount, low: lowCount });
  };

  const calculateRiskScoreCounts = (issues) => {
    let highCount = 0;
    let mediumCount = 0;
    let lowCount = 0;

    issues.forEach((issue) => {
      const riskScoreLabel = getOverallRiskScore(issue.overall_risk_score);
      switch (riskScoreLabel) {
        case 'High':
          highCount++;
          break;
        case 'Medium':
          mediumCount++;
          break;
        case 'Low':
          lowCount++;
          break;
        default:
          break;
      }
    });

    setRiskScoreCounts({ high: highCount, medium: mediumCount, low: lowCount });
  };


  const calculatedonutScoreCounts = (issues) => {
    let patchingCount = 0;
    let applicationCount = 0;
    let browserCount = 0;
    let tlsRelatedCount = 0;
    let configRelatedCount = 0;
    let softwareRelatedCount = 0;


    issues.forEach((issue) => {
      const riskScoreLabel = getCategoryLabel(issue.category);
      switch (riskScoreLabel) {
        case 'Patching related':
          patchingCount++;
          break;
        case 'Application':
          applicationCount++;
          break;
        case 'Browser related':
          browserCount++;
          break;
        case 'TLS-SSL related':
          tlsRelatedCount++;
          break;
        case 'Configuration related':
          configRelatedCount++;
          break;
        case 'Software Upgrade related':
          softwareRelatedCount++;
          break;
        default:
          break;
      }
    });

    setdonutCount({ patchingRelated: patchingCount, application: applicationCount, browserRelated: browserCount, tlsRelated: tlsRelatedCount, configuration_related: configRelatedCount, softwareUpgradeRelated: softwareRelatedCount });
  };

  const calculateCategoryCounts = (issues) =>{
    
  }

  const getOverallRiskScore = (overall_risk_score) => {
    if (overall_risk_score >= 400) {
      return 'High';
    } else if (overall_risk_score >= 200 && overall_risk_score <= 399) {
      return 'Medium';
    } else if (overall_risk_score >= 0 && overall_risk_score <= 199) {
      return 'Low';
    }
    return '';
  };

  const getCategoryLabel = (category) => {
    switch(category) {
        case 1:
            return 'Patching related';
        case 2:
            return 'Application';
        
        case 3:
            return 'Browser related';

        case 4:
            return 'TLS-SSL related';
        
        case 5:
            return 'Configuration related';

        case 6:
            return 'Software Upgrade related';
        default:
            return 'NaN';
    }
}


  const options_donut = {
    chart: {
      type: 'donut',
    },
    labels: Object.keys(donutCount).filter(category => donutCount[category]>0),
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'center',
          horizontalAlign: 'bottom',
        }
      }
    }]
  }

  const series = Object.values(donutCount).filter(count => count > 0);


  useEffect(() => {
    setCombinedData([
      { name: 'Critical', data: [severityCounts.critical_0, 0]},
      { name: 'High', data: [severityCounts.high, riskScoreCounts.high] },
      { name: 'Medium', data: [severityCounts.medium, riskScoreCounts.medium] },
      { name: 'Low', data: [severityCounts.low, riskScoreCounts.low]},
    ]
  );


  }, [severityCounts, riskScoreCounts]);

  const options = {
    chart: {
      height: 400,
      type: 'bar',
      stacked: true,
      toolbar: {  
        show: false,
      },
    },
    xaxis: {
      categories: ['Severity', 'Risk Score'],
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    // legend: {
    //   position: 'right',
    //   apexchartAlign: 'center',
    //   reverseOrder: true,
    // },
  };

  
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});

  // const generateCategories = (issuesData) => {
  //   const uniqueCategories = Array.from(new Set(issuesData.map((issue) => issue.mac_address)));
  //   setCategories(uniqueCategories);
  //   const counts = {};
  //   uniqueCategories.forEach((category) => {
  //     counts[category] = issuesData.filter((issue) => issue.mac_address === category).length;
  //   });
  //   setCategoryCounts(counts);
  // };

  const options_th = {
 
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: categories, // Use dynamically generated categories
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      alignProperty: 'center',
      text: 'Top 10 Mac Address',
    },
  };
  const series_th = Object.values(categoryCounts).filter(count => count > 0);
  // [
  //   {
  //     name: 'Category Counts', // Series name
  //     data: Object.values(categoryCounts), // Data is counts of each category
  //   },
  // ];

  //   xaxis: {
  //     categories: macAddresses, // Use the MAC addresses as categories
  //   },


  // const series_th = [
  //   {
  //     name: 'MAC Counts',
  //     data: macCounts, // Use the corresponding counts for each MAC address
  //   },
  // ];


  return (
  <div className='container'>
    <div className='row'>
      <div className='col-6'>
        <div className="chart-container text-center">
          <h2>Severity Comparision</h2>
          <Chart options={options} series={combinedData} type="bar" width="500" />
        </div>
      </div>
        <div className='col-6'>
          <div className="chart-container text-center">
            <h2>Donut Chart Example</h2>
            <Chart options={options_donut} series={series} type="donut" width={500} />
          </div>
        </div>

        <div className="horizontal-bar-chart chart-container text-center">
          <Chart options={options_th} series={series_th} type="bar" height={350} />
        </div>
    </div>
  </div>
  );
};

export default DashboardComponent;









// import React, { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';
// import axios from 'axios';

// const DashboardComponent = () => {
//   const [issues, setIssues] = useState([]);
//   const [severityCounts, setSeverityCounts] = useState({ critical: 0, high: 0, medium: 0, low: 0 });
//   const [riskScoreCounts, setRiskScoreCounts] = useState({ high: 0, medium: 0, low: 0 });
//   const [combinedData, setCombinedData] = useState([]);

//   useEffect(() => {
//     fetchIssues();
//   }, []);

//   const fetchIssues = async () => {
//     await axios.get(`http://localhost:8000/api/issues/`).then(({ data }) => {
//       setIssues(data.issues);
//       calculateSeverityCounts(data.issues);
//       calculateRiskScoreCounts(data.issues);
//     });
//   };

//   const calculateSeverityCounts = (issues) => {
//     let criticalCount = 0;
//     let highCount = 0;
//     let mediumCount = 0;
//     let lowCount = 0;

//     issues.forEach((issue) => {
//       switch (issue.severity) {
//         case 1:
//           criticalCount++;
//           break;
//         case 2:
//           highCount++;
//           break;
//         case 3:
//           mediumCount++;
//           break;
//         case 4:
//           lowCount++;
//           break;
//         default:
//           break;
//       }
//     });

//     setSeverityCounts({ critical: criticalCount, high: highCount, medium: mediumCount, low: lowCount });
//   };

//   const calculateRiskScoreCounts = (issues) => {
//     let highCount = 0;
//     let mediumCount = 0;
//     let lowCount = 0;

//     issues.forEach((issue) => {
//       const riskScoreLabel = getOverallRiskScore(issue.overall_risk_score);
//       switch (riskScoreLabel) {
//         case 'High':
//           highCount++;
//           break;
//         case 'Medium':
//           mediumCount++;
//           break;
//         case 'Low':
//           lowCount++;
//           break;
//         default:
//           break;
//       }
//     });

//     setRiskScoreCounts({ high: highCount, medium: mediumCount, low: lowCount });
//   };

//   const getOverallRiskScore = (overall_risk_score) => {
//     if (overall_risk_score >= 400) {
//       return 'High';
//     } else if (overall_risk_score >= 200 && overall_risk_score <= 399) {
//       return 'Medium';
//     } else if (overall_risk_score >= 0 && overall_risk_score <= 199) {
//       return 'Low';
//     }
//     return '';
//   };

//   useEffect(() => {
//     setCombinedData([
//       { name: 'Critical', data: [severityCounts.critical, 0] },
//       { name: 'High', data: [severityCounts.high, riskScoreCounts.high] },
//       { name: 'Medium', data: [severityCounts.medium, riskScoreCounts.medium] },
//       { name: 'Low', data: [severityCounts.low, riskScoreCounts.low] },
//     ]);
//   }, [severityCounts, riskScoreCounts]);

//   const options = {
//     chart: {
//       height: 400,
//       type: 'bar',
//       stacked: true,
//       toolbar: {
//         show: false,
//       },
//     },
//     xaxis: {
//       categories: ['Severity', 'Risk Score'],
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//       },
//     },
//     dataLabels: {
//       enabled: true,
//     },
//     legend: {
//       position: 'right',
//       horizontal: false,
//       horizontalAlign: 'right',
//     },
//   };

//   return (
//     <div className='row'>
//       <div className='col-4'>
//         <div className="dashboard">
//           <div className="chart-container text-center">
//             <h2>Severity Comparision</h2>
//             <Chart options={options} series={combinedData} type="bar" width="500" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardComponent;




// import React, { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';
// import axios from 'axios';

// const DashboardComponent = () => {
//   const [issues, setIssues] = useState([]);
//   const [severityCounts, setSeverityCounts] = useState({ critical: 0, high: 0, medium: 0, low: 0 });
//   const [riskScoreCounts, setRiskScoreCounts] = useState({ high: 0, medium: 0, low: 0 });

//   useEffect(() => {
//     fetchIssues();
//   }, []);

//   const fetchIssues = async () => {
//     await axios.get(`http://localhost:8000/api/issues/`).then(({ data }) => {
//       setIssues(data.issues);
//       calculateSeverityCounts(data.issues);
//       calculateRiskScoreCounts(data.issues);
//     });
//   };

//   const calculateSeverityCounts = (issues) => {
//     let criticalCount = 0;
//     let highCount = 0;
//     let mediumCount = 0;
//     let lowCount = 0;

//     issues.forEach((issue) => {
//       switch (issue.severity) {
//         case 1:
//           criticalCount++;
//           break;
//         case 2:
//           highCount++;
//           break;
//         case 3:
//           mediumCount++;
//           break;
//         case 4:
//           lowCount++;
//           break;
//         default:
//           break;
//       }
//     });
//     setSeverityCounts({ critical: criticalCount, high: highCount, medium: mediumCount, low: lowCount });
//   };

//   const calculateRiskScoreCounts = (issues) => {
//     let highCount = 0;
//     let mediumCount = 0;
//     let lowCount = 0;

//     issues.forEach((issue) => {
//       const riskScoreLabel = getOverallRiskScore(issue.overall_risk_score);
//       switch (riskScoreLabel) {
//         case 'High':
//           highCount++;
//           break;
//         case 'Medium':
//           mediumCount++;
//           break;
//         case 'Low':
//           lowCount++;
//           break;
//         default:
//           break;
//       }
//     });

//     setRiskScoreCounts({ high: highCount, medium: mediumCount, low: lowCount });
//   };

//   const getOverallRiskScore = (overall_risk_score) => {
//     if (overall_risk_score >= 400) {
//       return 'High';
//     } else if (overall_risk_score >= 200 && overall_risk_score <= 399) {
//       return 'Medium';
//     } else if (overall_risk_score >= 0 && overall_risk_score <= 199) {
//       return 'Low';
//     }
//     return '';
//   };

//   const options = {
//     chart: {
//       height: 350,
//       type: 'bar',
//       stacked: true,
//       toolbar: {
//         show: false,
//       },
//     },
//     xaxis: {
//       categories: ['Severity', 'Risk Score'], 
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//       },
//     },
//     dataLabels: {
//       enabled: true,
//     },
//     legend: {
//       position: 'top',
//       horizontalAlign: 'center',
//     },
//   };

//   const severityData = [
//     {
//       name: 'Low',
//       data: [severityCounts.low],
//     },
//     {
//       name: 'Medium',
//       data: [severityCounts.medium],
//     },
//     {
//       name: 'High',
//       data: [severityCounts.high],
//     },
//     {
//       name: 'Critical',
//       data: [severityCounts.critical],
//     },
//   ];

//   const riskScoreData = [
//     {
//       name: 'Low',
//       data: [riskScoreCounts.low],
//     },
//     {
//       name: 'Medium',
//       data: [riskScoreCounts.medium],
//     },
//     {
//       name: 'High',
//       data: [riskScoreCounts.high],
//     },
//   ];

//   return (
//     <div className='row'> 
//       <div className='col-4'>
//       <div className="dashboard">
//         <div className="chart-container text-center">
//           <h2>Total Issues</h2>
//           <Chart options={options} series={severityData} type="bar" width="400" />
//         </div>
//       </div>
//       </div>
//       <div className='col-4'>
//           <Chart options={options} series={riskScoreData} type="bar" width="400" />
//       </div>
//     </div>
//   );
// };

// export default DashboardComponent;



