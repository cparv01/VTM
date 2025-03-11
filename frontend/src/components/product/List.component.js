import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from "react-select";
import axios from 'axios';
import './../../App.css'; 
import { TbFilterSearch } from "react-icons/tb";
// import { CgDetailsMore } from "react-icons/cg";
import { Checkbox } from '@mui/material';
import { CiExport } from "react-icons/ci";
import { CSVLink } from "react-csv";
import { GrView } from "react-icons/gr";
import { Tooltip} from 'bootstrap';

// import DashbordComponent from './dashbord.component';
// import Chatbot from './chatbot';
// import { sortBy } from 'lodash';
// import { Collapse } from 'react-bootstrap';
// import { PageItem } from 'react-bootstrap';    
export default function List() {
    
    const [filteredRecords,setFilteredRecords] = useState();

    const [searchTerm, setSearchTerm] = useState('');
    const [assessmentFilter, setAssessmentFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const [issueStatusFilter, setIssueStatusFilter] = useState('');

    const [severityFilter, setSeverityFilter] = useState([]);
    
    const [issues, setIssues] = useState([])
    
    useEffect(()=>{
        fetchIssues()
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new Tooltip(tooltipTriggerEl);
        });
        // fetchAllRecords();
    },[])       

    
    // useEffect(()=>{
    //     setFilteredRecords(getFilteredRecords());
    // },[ issues, searchTerm, assessmentFilter, categoryFilter,issueStatusFilter, severityFilter, currentPage])   
    

    const fetchIssues = async () => {
        await axios.get(`http://localhost:8000/api/list`).then(({data})=>{
            setIssues(data.issues)
            // console.log(data);
        })
    }

    
    // const sortOverallRiskScores = (data) => {
    //     // if (!Array.isArray(data)) {
    //     //     return []; 
    //     // }
    
    //     return sortBy(data, 'overall_risk_score').reverse();
    
    // };
    
    const getOverallRiskScore = (overall_risk_score) => {
        let label = "";
        let colorClass = "";
    
        if (overall_risk_score >= 400) {
            label = "High";
            colorClass = "badge bg-danger p-6";
        } else if (overall_risk_score >= 200 && overall_risk_score <= 399) {
            label = "Medium";
            colorClass = "badge bg-warning text-dark p-6";
        } else if (overall_risk_score >= 0 && overall_risk_score <= 199) {
            label = "Low";
            colorClass = "badge bg-success badge-border p-6";
        }
    
        return (
            <span
                className={`badge ${colorClass} badge-border`}
                style={{ opacity: "0.9", textCombineUpright: "revert" }}
            >
                {overall_risk_score} - {label}
                {/* {sortOverallRiskScores({overall_risk_score} - {label})} */}
            </span>
        );
    };
      
    const getSeverityLabel = (severity) => {
        switch (severity) {
            case 1:
                return 'Critical';
            case 2:
                return 'High';
            case 3:
                return 'Medium';
            case 4:
                return 'Low';
            default:
                return '';
        }
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
    const getAssessmentLabel = (assessment_type) => {
        switch(assessment_type) {
            case 1:
                return 'SAST';
            case 2:
                return 'SCA';
            case 3:
                return 'Web Application Security';
            default:
                return 'NaN';
        }
    }

    const getActionLabel = (action_owner) =>{
        switch(action_owner){
            case "1":
                return 'KPMG Team';
            case "2":
                return 'KPMG Team';
            case "3":
                return 'Supervisor';
            case "4":
                return 'Supervisor';
            case "5":
                return 'Requestor';
            case "6":
                return 'KPMG Team';
            default:
                return 'NaN';
        }
    }

    const [selectAllChecked, setSelectAllChecked]=useState(false);
    
    // const [allRecords, setAllRecords] = useState([]);
    const [currentPage,setCurrentPage] = useState(1)
    const [goToPage, setGoToPage] = useState('')
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    // const lastIndex = currentPage * recordsPerPage;
    // const firstIndex = lastIndex - recordsPerPage;
    const records = issues.slice((currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage);

    // const [searchInput, setSearchInput] =useState('');
    // const npage = Math.ceil(issues.length/recordsPerPage);
    // const numbers = issues;
    
    // const numbers = [...Array(npage + 1).keys()].slice(1);cd

    let filtered = issues.filter((issue) =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) 
        // &&(severityFilter === ''|| issue.severity === parseInt(severityFilter))
    );

    const getFilteredRecords = (export_with=false) => {
        if (assessmentFilter) {
            filtered = filtered.filter((issue) =>
                issue.assessment_type.toString() === assessmentFilter
            );
        }
        if (categoryFilter){
            filtered = filtered.filter((issue) =>
                issue.category.toString() === categoryFilter
            );
        }
        if (issueStatusFilter){
            console.log("filtered", issueStatusFilter)
            
            filtered = filtered.filter((issue) => 
                issue.tester_status.toString() === issueStatusFilter
            );
            // issueStatusFilter.map((option) => option.value.includes(issue.tester_status))
        }

        // if(searchInput){
        //     const searchLower = searchInput.toLowerCase();
        //     filtered = filtered.filter((issue) =>{
                
        //         return Object.values(issue).some((value) => 
        //             typeof value === 'string' && value.toLocaleLowerCase().includes(searchLower)
        //         )
        //     })
        // }

        if(severityFilter.length>0){
            let options = severityFilter.map((option) => option.value)
            
            console.log("severity",severityFilter);

            console.log("option",options);
            
            filtered = filtered.filter((issue) => options.includes(issue.severity) );
            
            // filtered = filtered.filter((issue) => 
            //     severityFilter.map((option) => option.value).includes(issue.severity) );

            
            // filtered = filtered.filter((issue) => issue.severity === (severityFilter)
        }
        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;

        // console.log("before _ get",getFilteredRecords());
        if(export_with){
            console.log("export",export_with)
            return filtered;
        }
        return filtered.slice(startIndex, endIndex);
    };

    const handleAssessmentFilter = (e) => {
        setAssessmentFilter(e.target.value);
        setCurrentPage(1); 
        console.log("handleng",e.target.value);
    };

    const handleCategoryFilter = (e) =>{
        setCategoryFilter(e.target.value);
        setCurrentPage(1);
    }

    const handleIssueStatusFilter = (e) =>{
        setIssueStatusFilter(e.target.value);
        setCurrentPage(1);
        console.log("type", typeof(issueStatusFilter))

        // setIssueStatusFilter(issueStatusFilter.map((Issueoption) => Issueoption.value));
        
    }

    const handleSeverityFilter = (severityFilter) =>{
        
        setSeverityFilter(severityFilter);
        console.log("value",severityFilter)
        // const value = parseInt(e.target.value);
        // setSeverityFilter((prevSeverityFilter) => {
        //     if (prevSeverityFilter.includes(value)) {
        //         return prevSeverityFilter.filter((severity) => severity !== value);
        //     } else {
        //         return [...prevSeverityFilter, value];
        //     }
        // });
        setCurrentPage(1);
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); 
    };

    // const handlePageChange = (page) => {
    //     setCurrentPage(page);
    // };        

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
        
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };


    const handleToggle2 = () => {
        setIsOpen2(!isOpen2);
    }

    const handleToggle3 = () => {
        setIsOpen3(!isOpen3);
    }

    const handleToggle4 = () => {
        setIsOpen4(!isOpen4);
    }

    useEffect(() => {
        setFilteredRecords(getFilteredRecords());
    }, [issues, searchTerm, assessmentFilter, categoryFilter, issueStatusFilter, severityFilter, currentPage]);


    const options =[
        { value: 1, label: 'Critical' },
        { value: 2, label: 'High' },
        { value: 3, label: 'Medium' },
        { value: 4, label: 'Low' },
    ];

    // const Issueoption = [
    //     { value: '1', label: 'Open'},
    //     { value: '2', label: 'Close'},
    // ]
    

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAllChecked(isChecked);
    };

    // const fetchAllRecords = async () => {
    //     try {
    //         const response = await fetch('your-api-endpoint');
    //         const data = await response.json();
    //         setAllRecords(data); // Set all records in state
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };


    

    const handleExport = () => {
        const filteredRecords = getFilteredRecords();
        console.log("Filtered records:", filteredRecords);
        
        if (!filteredRecords || filteredRecords.length === 0) {
            console.log("No data to export");
            return [];
        }
        const csvData = getFilteredRecords(true).map((item) => ({
            ID: item.id,
            Title: item.title,
            AssessmentType: getAssessmentLabel(item.assessment_type),
            ApplicationName: item.ip,
            Category: getCategoryLabel(item.category),
            InitialClosureDate: item.initial_closure_date,
            ActionOwner: getActionLabel(item.action_owner),
            IssueStatus: item.tester_status,
            OverallRiskScore: item.overall_risk_score,
            Severity: getSeverityLabel(item.severity),
        }));
        return csvData ;
    };
    
    return (
    <div className='main' style={{marginLeft:"4%", marginRight:"30px"}}>
            <div className='text-md-right' style={{textAlign:"right" , paddingBottom:"5px" }} variant="contained">
                <CSVLink 
                    data={handleExport()}
                    headers={[
                      { label: 'ID', key: 'ID' },
                      { label: 'Title', key: 'Title' },
                      { label: 'Assessment Type', key: 'AssessmentType' },
                      { label: 'Application Name', key: 'ApplicationName' },
                      { label: 'Category', key: 'Category' },
                      { label: 'Initial Closure Date', key: 'InitialClosureDate' },
                      { label: 'Action Owner', key: 'ActionOwner' },
                      { label: 'Issue Status', key: 'IssueStatus' },
                      { label: 'Overall Risk Score', key: 'OverallRiskScore' },
                      { label: 'Severity', key: 'Severity' },
                    ]}
                    filename={"exported_data.csv"}
                >
                    <button 
                    
                        style={{
                            border: "2px solid skyblue",
                            borderRadius: "20px",
                            color: "white",
                            backgroundColor: "skyblue",
                            fontSize: "20px",
                            width: "50px",
                            height: "50px"
                        }} 
                        value={filteredRecords}>
                            
                            <CiExport style={{opacity:1, color:"black", fontSize:"24px"}}/>
                            
                    </button>
                </CSVLink>
            </div>
        <div>
            <div className="row" >
                <div className="col-12">
                    <div className="" >
                        <div className="table-responsive" >
                        {/* {getFilteredRecords() ? (
                                <div className='loading-spinner'></div>
                            ) : ( */}
                            <table className="table table-hover" style={{ border: "2px solid skyblue"}}>
                                <thead>
                                <tr style={{ backgroundColor: "skyblue" }}>
                                    <th>
                                        <div>
                                            <Checkbox
                                                checked={selectAllChecked}
                                                onChange={handleSelectAll}
                                            />
                                        </div>
                                    </th>   
                                        <th style={{width: '20%'}}>
                                                
                                            <div style={{marginLeft:"2%"}}>
                                                Title 
                                                <input
                                                    class='react-search'
                                                    style={{width:"70%", display:"inline", marginLeft:"10%"}}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search by title..."
                                                    value={searchTerm}
                                                    onChange={handleSearch}
                                                />
                                            </div>
                                            {/* )} */}
                                        </th>
                                        <th style={{width: '10%'}}>
                                            <div className='row'>
                                                <div style={{paddingLeft:"70%"}}
                                                // className='col-4' 
                                                >
                                                    <span onClick={handleToggle} style={{alignItems:"right"}}><TbFilterSearch /></span>
                                                </div>
                                                <div 
                                                // className='col-8'
                                                >
                                                    {isOpen && (
                                                        <div>
                                                            <select
                                                            className="form-control"
                                                            value={assessmentFilter}
                                                            onChange={ e => handleAssessmentFilter(e)}>
                                                            <option value= ''>All</option>
                                                            <option value= '1'>SAST</option>
                                                            <option value= '2'>SCA</option>
                                                            <option value= '3'>Web Application Security</option>
                                                            </select>
                                                        </div>
                                                    )}
                                                    Assessment Type
                                                </div>
                                            </div>

                                        </th>
                                        <th style={{width: '10%'}} >
                                            Application Name
                                        </th>
                                        <th style={{width: '10%'}} >
                                            <div className='row'>
                                                <div style={{paddingLeft:"70%"}}
                                                // className='col-4'
                                                >
                                                    <span onClick={handleToggle2} style={{ alignItems: "top"}}><TbFilterSearch /></span>
                                                </div>
                                                <div 
                                                // className='col-8'
                                                >
                                                    {isOpen2 && (
                                                        <div>
                                                        <select
                                                            className='form-control'
                                                            value={categoryFilter}
                                                            onChange={ e => handleCategoryFilter(e)}>
                                                            <option value= '' defaultChecked>All</option>
                                                            <option value='1'>Patching related</option>
                                                            <option value='2'>Application</option>
                                                        </select>
                                                    </div>
                                                    )}
                                                    Category
                                                </div>
                                            </div>
                                        </th>
                                        <th style={{width: '10%'}}>Initial Closure Date</th>
                                        <th style={{width: '10%'}}>Action Owner</th>
                                        <th style={{width: '10%'}}>
                                        <div className='row'>
                                            <div style={{paddingLeft:"70%"}}
                                            // className='col-2'
                                            >
                                                <span onClick={handleToggle3} style={{marginTop:"10%"}}><TbFilterSearch /></span>
                                            </div>
                                            <div 
                                            // className='col-9'
                                            >
                                                {isOpen3 && (
                                                    <div>
                                                        <select
                                                            className='form-control'
                                                            value={issueStatusFilter}
                                                            onChange={ e => handleIssueStatusFilter(e)}>
                                                            <option value= '' defaultChecked>All</option>
                                                            <option value='Open'>Open</option>
                                                            <option value='Close'>Close</option>
                                                        </select>
                                                        
                                                    </div>
                                                )}
                                                Issue Status
                                            </div>
                                        </div>
                                        </th>
                                        <th style={{width: '10%'}}>
                                            <div className='pe-2 row'>
                                                <div style={{paddingLeft:"70%"}}>
                                                    <span onClick={handleToggle4} style={{ marginTop: "10%"}}><TbFilterSearch/></span>
                                                </div>
                                                <div>
                                                    {isOpen4 && (
                                                        <div>
                                                            <Select styles={{width:'50px'}}
                                                                isMulti={true}                                                            
                                                                name='severityfi'
                                                                className='form-control'
                                                                options={options}
                                                                value={severityFilter}
                                                                onChange={handleSeverityFilter}/>
                                                        </div>
                                                    )}
                                                    Initial Severity
                                                </div>
                                            </div>
                                        </th>
                                        <th style={{width: '10%'}}>Revised Severity</th>
                                        <th style={{width: '10%'}}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.length > 0 ? (
                                        getFilteredRecords().map((row, key)=>(
                                                <tr key={key} className='table-bordered'>
                                                    <td>
                                                        <Checkbox >{row.id}</Checkbox>
                                                    </td>                                                    
                                                    <td>
                                                        <span style={{overflowWrap: 'break-word', wordBreak: 'break-all'}}>{row.title}</span>
                                                    </td>
                                                    <td>{getAssessmentLabel(row.assessment_type)}</td>
                                                    <td>{row.ip}</td>
                                                    <td>{getCategoryLabel(row.category)}</td>
                                                    <td>{row.initial_closure_date}</td>
                                                    <td>{getActionLabel(row.action_owner)}</td>
                                                    <td>{row.tester_status}</td>
                                                    <td>{getSeverityLabel(row.severity)}</td>
                                                    <td>
                                                    <span className="badge rounded-pill" style={{ fontSize: '16px', padding: '10px 10px' }}>
                                                        {getOverallRiskScore(row.overall_risk_score)}
                                                    </span>
                                                    </td>

                                                    <td>
                                                    <Link 
                                                        to={`/product/View/${row.id}`} 
                                                        className='btn btn-success' 
                                                        data-bs-toggle="tooltip" 
                                                        data-bs-placement="top" 
                                                        title="View details"
                                                        style={{ fontSize: '10px', padding: '5px 10px', borderRadius:"56%" }}
                                                    >
                                                        <GrView style={{ fontSize: '20px' }}/> {/* Adjust icon size as needed */}
                                                    </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ): (
                                            <tr>
                                                <td colspan="11"> 
                                                    <h6 className='text-center'>
                                                        Loading issue data...
                                                    </h6>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        {/* )} */}
                        </div>
                    </div>
                </div>
            </div>


            <div className='justify-content-md-center justify-content-center align-items-center pe-2 row' style={{marginTop:"10px", marginBottom:"10px"}}>
                <div className='col-md-auto d-none d-md-block col'>
                    Total Records: <strong>{filtered.length}</strong>
                </div>

                <div className='col-md-auto col'>
                    <select className='form-select' onChange={handleRecordsPerPageChange}>
                        <option value='10'>10</option>
                        <option value='25'>25</option>
                        <option value='50'>50</option>
                        <option value='100'>100</option>
                    </select>
                </div>

                <div className='col-md-auto col'>
                    <button type='button' className='btn btn-primary' onClick={handlePrevPage}> &lt; </button>
                </div>
                <div className='col-md-auto d-none d-md-block col'>
                    Page <strong>{currentPage}</strong> of <strong>{Math.ceil(filtered.length / recordsPerPage)}</strong>
                </div>
                <div className='col-md-auto col'>
                    <input 
                        type='number'
                        placeholder='Go to page:'
                        value={goToPage}
                        // min='1'
                        max={Math.ceil(filtered.length / recordsPerPage)}
                        onChange={(e) => setGoToPage(e.target.value)}
                    >
                    </input>
                    <button type='button' className='btn btn-primary' onClick={handleGoToPage} style={{margin:"20px"}}> Go </button>
                </div>
                <div className='col-md-auto col'>
                    <div className='d-flex gap-1'>
                        <button type='button' className='btn btn-primary' onClick={handleNextPage}> &gt; </button>
                    </div>
                </div>
            </div>
    </div>
</div>)


    function handleRecordsPerPageChange(e){
        setRecordsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    }
    // function nextPage(){
    //     if(currentPage !== 1){
    //         setCurrentPage(currentPage+1)
    //     }
    // }
    
    function handlePrevPage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    
    function handleNextPage() {
        const totalPages = Math.ceil(filtered.length / recordsPerPage);
        if (currentPage !== totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }
    
    function handleGoToPage() {
        const totalPages = Math.ceil(filtered.length / recordsPerPage);
        if (goToPage >= 1 && goToPage <= totalPages) {
            setCurrentPage(parseInt(goToPage));
        }
    }    
}
