    import React, { useEffect, useState } from 'react';
    import { Link } from 'react-router-dom';
    import axios from 'axios';
    import './List.css';
    // import { PageItem } from 'react-bootstrap';    
    export default function List() {

        const [searchTerm, setSearchTerm] = useState('');
        const [assessmentFilter, setAssessmentFilter] = useState('');
        const [categoryFilter, setCategoryFilter] = useState('');
        const [issueStatusFilter, setIssueStatusFilter] = useState('');
        const [severityFilter, setSeverityFilter] = useState('');
        

        const [issues, setIssues] = useState([])
        
        useEffect(()=>{
            fetchIssues() 
        },[])       

        useEffect(()=>{
            // setSeverityFilter(parseInt(severityFilter)) 
            // console.log("use",severityFilter)
        },[severityFilter])   
        

        const fetchIssues = async () => {
            await axios.get(`http://localhost:8000/api/issues/`).then(({data})=>{
                setIssues(data.issues)
                console.log(data);
            })
        }
        const getSeverityLabel = (severity) => {
            switch (severity) {
                case 1:
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

        const [currentPage,setCurrentPage] = useState(1)
        const recordsPerPage = 10;
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        const records = issues.slice((currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage);
        // const npage = Math.ceil(issues.length/recordsPerPage);
        // const numbers = issues;
        
        // const numbers = [...Array(npage + 1).keys()].slice(1);

        let filtered = issues.filter((issue) =>
            issue.title.toLowerCase().includes(searchTerm.toLowerCase()) 
            // &&(severityFilter === ''|| issue.severity === parseInt(severityFilter))
        );
        
        const getFilteredRecords = () => {

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
                filtered = filtered.filter((issue) =>
                    issue.tester_status.toString() === issueStatusFilter
                );
            }
            if(severityFilter){

                console.log("above if",typeof(severityFilter))
                console.log("filtered", severityFilter)
                
                filtered = filtered.filter((issue) => issue.severity === (severityFilter)
                
                );
                
            }
            const startIndex = (currentPage - 1) * recordsPerPage;
            const endIndex = startIndex + recordsPerPage;
            return filtered.slice(startIndex, endIndex);
        };
        // console.log("above",(issues.severity))
        
        
        const handleAssessmentFilter = (e) => {
            setAssessmentFilter(e.target.value);
            setCurrentPage(1);  
            console.log("handleng",assessmentFilter.length);
        };

        const handleCategoryFilter = (e) =>{
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
        }

        const handleIssueStatusFilter = (e) =>{
            setIssueStatusFilter(e.target.value);
            setCurrentPage(1);
            console.log("type", typeof(issueStatusFilter))
        }

        const handleSeverityFilter = (e) =>{
            setSeverityFilter(parseInt(e.target.value));
            setCurrentPage(1);
        }

        const handleSearch = (e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); 
        };
    
        const handlePageChange = (page) => {
            setCurrentPage(page);
        };


        const assessmentOption = () =>{

        }

        const [isOpen, setIsOpen] = useState(false);
        const [selectedOptions, setSelectedOptions] = useState([]);
        
        const options = ['Option 1', 'Option 2', 'Option 3'];
        
        const handleToggle = () => {
            setIsOpen(!isOpen);
        };
        
        const handleOptionToggle = (option) => {
            if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
            } else {
            setSelectedOptions([...selectedOptions, option]);
            }
        };
        

        return (
        <div className='main-content'>
            <div className="container">
            <div className="row">
                <div className='col-12'>
                </div>
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive" >
                            <table className="table table-bordered mb-0 text-center table-hover" style={{height:'400px'}}>
                                <thead>
                                    <tr roal="row">
                                        <th style={{width: '150'}}>ID</th>
                                        <th style={{width: '20%'}}>
                                            <div >
                                            Title
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search by title..."
                                                value={searchTerm}
                                                onChange={handleSearch}
                                            />
                                            </div>
                                        </th>
                                        <th style={{width: '10%'}}>
                                            <div>
                                            Assessment Type
                                                <div>
                                                    <button onClick={handleToggle}>
                                                        Filter <i className={`bx ${isOpen ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                                                    </button>
                                                    {isOpen && (
                                                        <div>
                                                        {assessmentFilter.map((option) => (
                                                            <label key={option}>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedOptions.includes(option)}
                                                                onChange={() => handleOptionToggle(option)}
                                                            />
                                                            {option}
                                                            </label>
                                                        ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <select
                                                className="form-control"
                                                value={assessmentFilter}
                                                onChange={ e => handleAssessmentFilter(e)}>
                                                <option value= ''>select one</option>
                                                <option value= '1'>SAST</option>
                                                <option value= '2'>SCA</option>
                                                <option value= '3'>Web Application Security</option>
                                                </select>
                                            </div>
                                        </th>
                                        <th style={{width: '10%'}}>
                                            Application Name
                                        </th>
                                        <th style={{width: '10%'}}>
                                            <div>
                                            category

                                            <select
                                                    className='form-control'
                                                    value={categoryFilter}
                                                    onChange={ e => handleCategoryFilter(e)}>
                                                    <option value= '' defaultChecked>select one</option>
                                                    <option value='1'>Patching related</option>
                                                    <option value='2'>Application</option>
                                                </select>
                                            </div>
                                        </th>
                                        <th style={{width: '10%'}}>Initial Closure Date</th>
                                        <th style={{width: '10%'}}>Action Owner</th>
                                        <th style={{width: '10%'}}>
                                            <div>
                                            Issue Status
                                                <select
                                                    className='form-control'
                                                    value={issueStatusFilter}
                                                    onChange={ e => handleIssueStatusFilter(e)}>
                                                    <option value= ''>select one</option>
                                                    <option value='Open'>Open</option>
                                                    <option value='Close'>Close</option>
                                                </select>
                                            
                                            </div>
                                        </th>

                                        <th style={{width: '10%'}}>Overall Risk Score</th>
                                        <th style={{width: '10%'}}>
                                            <div>
                                                Severity
                                                <select
                                                    name='severityfi'
                                                    className='form-control'
                                                    value={severityFilter}
                                                    onChange={e => handleSeverityFilter(e)}>
                                                    <option value=''>select</option>
                                                    <option value='1'>Critical</option>
                                                    <option value='2'>High</option>
                                                    <option value='3'>Medium</option>
                                                    <option value='4'>Low</option>
                                                </select>
                                            </div>
                                        </th>
                                        <th style={{width: '10%'}}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.length > 0 && 
                                        (getFilteredRecords().map((row, key)=>(
                                                <tr key={key} className='table-bordered'>
                                                    <td>{row.id}</td>     
                                                    <td>
                                                        <span style={{overflowWrap: 'break-word', wordBreak: 'break-all'}}>{row.title}</span>
                                                    </td>
                                                    <td>{getAssessmentLabel(row.assessment_type)}</td>
                                                    <td>{row.ip}</td>
                                                    <td>{getCategoryLabel(row.category)}</td>
                                                    <td>{row.initial_closure_date}</td>
                                                    <td>{getActionLabel(row.action_owner)}</td>
                                                    <td>{row.tester_status}</td>
                                                    <td>
                                                        <span className="badge bg-primary rounded-pill">{row.overall_risk_score}</span>
                                                    </td>
                                                    <td>{getSeverityLabel(row.severity)}</td>
                                                    <td>
                                                        <Link to={`/product/View/${row.id}`} className='btn btn-success me-2'>
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>
            </div>

            <div className='justify-content-md-center justify-content-center align-items-center pe-2 row'>
                    <nav>
                        <ul className='pagination'>
                            <label > No. of records {filtered.length}</label>

                            <li className='page-item'>
                                <a className='page-link' onClick={prePage}> Prev </a>
                            </li>

                            {Array.from({ length: Math.ceil(issues.length / recordsPerPage) }, (_, index) => (
                                    <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                                        <button className='page-link' onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                                    </li>
                                ))}

                            {/* {
                                numbers.slice(Math.max(0, currentPage - 2), Math.min(npage, currentPage + 3)).map((n, i) => (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
                                    </li>
                                ))
                            } */}
                            <li className='page-item'>
                                <a href='#' className='page-link' onClick={nextPage}> Next </a>
                            </li>
                        </ul>
                    </nav>
            </div>
        </div>
        </div>)

        function prePage(){
            if(currentPage != firstIndex){
                setCurrentPage(currentPage-1)
            }

        }

        // function changeCPage(id){
        //     setCurrentPage(id);
        // }

        function nextPage(){
            if(currentPage != lastIndex){
                setCurrentPage(currentPage+1)
            }
        }
        
    }













    /*

        import React, { useEffect, useState } from 'react';
    import { Link } from 'react-router-dom';
    import Select from "react-select";
    import axios from 'axios';
    import './List.css'; 
    // import { PageItem } from 'react-bootstrap';    
    export default function List() {

        const [searchTerm, setSearchTerm] = useState('');
        const [assessmentFilter, setAssessmentFilter] = useState('');
        const [categoryFilter, setCategoryFilter] = useState('');
        const [issueStatusFilter, setIssueStatusFilter] = useState([]);

        const [severityFilter, setSeverityFilter] = useState([]);
        
        const [filteredRecords,setFilteredRecords] = useState();
        const [issues, setIssues] = useState([])
        
        useEffect(()=>{
            fetchIssues() 
        },[])       

        
        // useEffect(()=>{
        //     setFilteredRecords(getFilteredRecords());
        // },[ issues, searchTerm, assessmentFilter, categoryFilter,issueStatusFilter, severityFilter, currentPage])   
        

        const fetchIssues = async () => {
            await axios.get(`http://localhost:8000/api/issues/`).then(({data})=>{
                setIssues(data.issues)
                console.log(data);
            })
        }
        const getSeverityLabel = (severity) => {
            switch (severity) {
                case 1:
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

        const [currentPage,setCurrentPage] = useState(1)
        const recordsPerPage = 10;
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        const records = issues.slice((currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage);
        // const npage = Math.ceil(issues.length/recordsPerPage);
        // const numbers = issues;
        
        // const numbers = [...Array(npage + 1).keys()].slice(1);

        let filtered = issues.filter((issue) =>
            issue.title.toLowerCase().includes(searchTerm.toLowerCase()) 
            // &&(severityFilter === ''|| issue.severity === parseInt(severityFilter))
        );
        
        const getFilteredRecords = () => {

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
                filtered = filtered.filter((issue) =>
                issue.tester_status.toString() === issueStatusFilter
                // issueStatusFilter.map((option) => option.value.includes(issue.tester_status))
                );
            }
            if(severityFilter>0){
                console.log("above if",typeof(severityFilter))

                // let options = severityFilter.map((option) => option.value)
                
                // console.log("option",options);
                // console.log("filtered", filtered)

                // filtered = filtered.filter((issue) => {options.includes(issue.severity)} );
                
                filtered = filtered.filter((issue) => issue.severity === (severityFilter)
                
                );
            }

            const startIndex = (currentPage - 1) * recordsPerPage;
            const endIndex = startIndex + recordsPerPage;
            return filtered.slice(startIndex, endIndex);
        };
        // console.log("above",(issues.severity))
        
        
        const handleAssessmentFilter = (e) => {
            setAssessmentFilter(e.target.value);
            setCurrentPage(1);  
            console.log("handleng",e.target.value);
        };

        const handleCategoryFilter = (e) =>{
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
        }

        const handleIssueStatusFilter = (issueStatusFilter) =>{
            setIssueStatusFilter(issueStatusFilter);
            setCurrentPage(1);
            console.log("type", typeof(issueStatusFilter))
        }

        const handleSeverityFilter = (severityFilter) =>{
            
            setSeverityFilter(severityFilter);
            // console.log("value",severityFilter)
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
    
        const handlePageChange = (page) => {
            setCurrentPage(page);
        };        

        const [isOpen, setIsOpen] = useState(false);
          
        const handleToggle = () => {
            setIsOpen(!isOpen);
        };


        useEffect(() => {
            setFilteredRecords(getFilteredRecords());
        }, [issues, searchTerm, assessmentFilter, categoryFilter, issueStatusFilter, severityFilter, currentPage]);
    

        const options =[
            { value: '1', label: 'Critical' },
            { value: '2', label: 'High' },
            { value: '3', label: 'Medium' },
            { value: '4', label: 'Low' },
        ];

        const Issueoption = [
            { value: '1', label: 'Open'},
            { value: '2', label: 'Close'},
        ]
        return (
        <div className='main-content'>
            <div className="container">
            <div className="row">
                <div className='col-12'>
                </div>
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive" >
                            <table className="table table-bordered mb-0 text-center table-hover" style={{height:'400px'}}>
                                <thead>
                                    <tr roal="row">
                                        <th style={{width: '150'}}>ID</th>
                                        <th style={{width: '20%'}}>
                                            <div >
                                            Title
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search by title..."
                                                value={searchTerm}
                                                onChange={handleSearch}
                                            />
                                            </div>
                                        </th>
                                        <th style={{width: '10%'}}>
                                            <div className='justify-content-md-center justify-content-center align-items-center pe-2 row'>
                                            <div>
                                                Assessment Type
                                                <button onClick={handleToggle}>Filter</button>
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
                                                </div>
                                            </div>

                                        </th>
                                        <th style={{width: '10%'}}>
                                            Application Name
                                        </th>
                                        <th style={{width: '10%'}}>
                                            category
                                            <button onClick={handleToggle}>Filter</button>
                                            {isOpen && (
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
                                        </th>
                                        <th style={{width: '10%'}}>Initial Closure Date</th>
                                        <th style={{width: '10%'}}>Action Owner</th>
                                        <th style={{width: '10%'}}>
                                            Issue Status
                                            <button onClick={handleToggle}>Filter</button>
                                            {isOpen && (
                                                <div>
                                                    <Select
                                                        className='form-control'
                                                        value={issueStatusFilter}
                                                        options={Issueoption}
                                                        onChange={handleIssueStatusFilter}>
                                                        <option value= ''>All</option>
                                                        <option value='Open'>Open</option>
                                                        <option value='Close'>Close</option>
                                                    </Select>
                                                </div>
                                            )}
                                        </th>
                                        <th style={{width: '10%'}}>Overall Risk Score</th>
                                        <th style={{width: '10%'}}>
                                            <div>
                                                Severity
                                                <button onClick={handleToggle}>Filter</button>
                                                {isOpen && (
                                                    <div>
                                                        <Select styles={{width:'50px'}}
                                                            name='severityfi'
                                                            className='form-control'
                                                            options={options}
                                                            isMulti={true}                                                            
                                                            value={severityFilter}
                                                            onChange={handleSeverityFilter}/>
                                                    </div>
                                                )}
                                            </div>
                                        </th>
                                        <th style={{width: '10%'}}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.length > 0 && 
                                        (getFilteredRecords().map((row, key)=>(
                                                <tr key={key} className='table-bordered'>
                                                    <td>{row.id}</td>     
                                                    <td>
                                                        <span style={{overflowWrap: 'break-word', wordBreak: 'break-all'}}>{row.title}</span>
                                                    </td>
                                                    <td>{getAssessmentLabel(row.assessment_type)}</td>
                                                    <td>{row.ip}</td>
                                                    <td>{getCategoryLabel(row.category)}</td>
                                                    <td>{row.initial_closure_date}</td>
                                                    <td>{getActionLabel(row.action_owner)}</td>
                                                    <td>{row.tester_status}</td>
                                                    <td>
                                                        <span className="badge bg-primary rounded-pill">{row.overall_risk_score}</span>
                                                    </td>
                                                    <td>{getSeverityLabel(row.severity)}</td>
                                                    <td>
                                                        <Link to={`/product/View/${row.id}`} className='btn btn-success me-2'>
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>
            </div>

            <div className='justify-content-md-center justify-content-center align-items-center pe-2 row'>
                    <nav>
                        <ul className='pagination'>
                            <label > No. of records {filtered.length}</label>

                            <li className='page-item'>
                                <a href='/' className='page-link' onClick={prePage}> Prev </a>
                            </li>

                            // {Array.from({ length: Math.ceil(issues.length / recordsPerPage) }, (_, index) => (
                            //         <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                            //             <button className='page-link' onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                            //         </li>
                            //     ))}

                            //  {
                            //     numbers.slice(Math.max(0, currentPage - 2), Math.min(npage, currentPage + 3)).map((n, i) => (
                            //         <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                            //             <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
                            //         </li>
                            //     ))
                            // }
                        }
                            <li className='page-item'>
                                <a href='./' className='page-link' onClick={nextPage}> Next </a>
                            </li>
                        </ul>
                    </nav>
            </div>
        </div>
        </div>)

        function prePage(){
            if(currentPage !== firstIndex){
                setCurrentPage(currentPage-1)
            }

        }

        // function changeCPage(id){
        //     setCurrentPage(id);
        // }

        function nextPage(){
            if(currentPage !== lastIndex){
                setCurrentPage(currentPage+1)
            }
        }
        
    }


    */