import { MdStarRate } from 'react-icons/md';
import NewProject from './component/newproject';
import ProjectList from './component/projectlist';
import React from 'react';


function App() {
  const [projectlist,setProjectlist] = React.useState([])
  const [refresh, setRefresh] = React.useState(false);
  const Projectresult = (name , budget , success) =>{
    setProjectlist(prevprojectlist =>{
      return[
        ...prevprojectlist,
        {id : crypto.randomUUID() , name , budget , success}
      ]
    })
  }
  const handleRefresh = () => {
    setProjectlist([]);
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  return (
    <div className="container">
      <div className="title--box">
        <div className="title--text">Project success prediction calculator&nbsp;<MdStarRate/></div>
      </div>
      <NewProject onSubmit={Projectresult} isDisable={handleRefresh}/>
      <ProjectList projectlist = {projectlist}/>
    </div>
  );
}

export default App;
