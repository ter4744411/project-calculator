import React, { useState } from 'react';
import { MdVerified } from 'react-icons/md';
import { FiRefreshCw } from 'react-icons/fi';
import { IoIosRemoveCircle } from 'react-icons/io';
import { SiProcesswire } from 'react-icons/si';

export default function NewProject({ onSubmit, isDisable }) {
  const [projects, setProjects] = useState([{ name: '', budget: '', success: '' }]);

  const handleAddProject = () => {
    setProjects(prevProjects => [...prevProjects, { name: '', budget: '', success: '' }]);
  };

  const handleInputChange = (e, index, field) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = e.target.value;
    setProjects(updatedProjects);
  };

  const [endgame, setEndgame] = useState(true);

  const handleRemoveProject = (index) => {
    setProjects(prevProjects => prevProjects.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    projects.forEach(project => {
      onSubmit(project.name, project.budget, project.success);
    });
    setProjects([{ name: '', budget: '', success: '' }]);
    setIsActiveProjectName(false);
    setIsActiveProjectBudget(false);
    setIsActiveProjectSuccess(false);
    setEndgame(false);
    setTimeout(() => {
      setEndgame(true);
    }, 1000);
  };

  const [isActiveProjectName, setIsActiveProjectName] = useState(false);
  const [isActiveProjectBudget, setIsActiveProjectBudget] = useState(false);
  const [isActiveProjectSuccess, setIsActiveProjectSuccess] = useState(false);

  const handleProjectNameClick = () => {
    setIsActiveProjectName(true);
    setIsActiveProjectBudget(false);
    setIsActiveProjectSuccess(false);
  };

  const handleProjectBudgetClick = () => {
    setIsActiveProjectName(false);
    setIsActiveProjectBudget(true);
    setIsActiveProjectSuccess(false);
  };

  const handleProjectSuccessClick = () => {
    setIsActiveProjectName(false);
    setIsActiveProjectBudget(false);
    setIsActiveProjectSuccess(true);
  };

  const handleInputBlur = () => {
    setIsActiveProjectName(false);
    setIsActiveProjectBudget(false);
    setIsActiveProjectSuccess(false);
  };

  const handleRefresh = () => {
    setProjects([]);
    setEndgame(false);
    isDisable(true);
    setTimeout(() => {
      setEndgame(true);
      isDisable(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="newproject--container">
        <div className="upper">
          <div>Repeater</div>
          <button type="button" onClick={handleAddProject}>
            ADD
          </button>
        </div>
        <div className="lower">
          {projects.map((project, index) => (
            <div className="project" key={index}>
              <div className="inside--project">
                Project-name
                <input
                  className={`input-field ${isActiveProjectName ? 'isactive' : 'notactive'}`}
                  value={project.name}
                  onChange={(e) => handleInputChange(e, index, 'name')}
                  onBlur={handleInputBlur}
                  onClick={handleProjectNameClick}
                  type="text"
                  placeholder="ชื่อโปรเจค"
                />
              </div>
              <div className="inside--project">
                Project-budget
                <input
                  className={`input-field ${isActiveProjectBudget ? 'isactive' : 'notactive'}`}
                  value={project.budget}
                  onChange={(e) => handleInputChange(e, index, 'budget')}
                  onBlur={handleInputBlur}
                  onClick={handleProjectBudgetClick}
                  type="text"
                  placeholder="งบประมาณ"
                />
              </div>
              <div className="inside--project">
                Project-success
                <input
                  className={`input-field ${isActiveProjectSuccess ? 'isactive' : 'notactive'}`}
                  value={project.success}
                  onBlur={handleInputBlur}
                  onClick={handleProjectSuccessClick}
                  onChange={(e) => handleInputChange(e, index, 'success')}
                  type="text"
                  placeholder="โอกาสในการสำเร็จ"
                />
              </div>
              <div className="move--btn">
                <button type="button" className="remove--btn" onClick={() => handleRemoveProject(index)}>
                  Remove<IoIosRemoveCircle className="deleteicon" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="btn--container">
          <button type="submit" onSubmit={handleSubmit} className="calculate--btn" disabled={!endgame}>
            {endgame ? "Calculate" : "Process..."}
          </button>
          <button onClick={handleRefresh} className="refresh--btn">
            <FiRefreshCw className="refresh--icon" />
          </button>
        </div>
      </div>
    </form>
  );
}
