import React from 'react';
import { MdVerified } from 'react-icons/md';
import { MdSmsFailed } from 'react-icons/md';
import { IoIosRemoveCircle } from 'react-icons/io';
export default function ProjectList({ projectlist , onDelete}) {
    let profit = 0;
  return (
    <div className="list--container">
 
      <ul className="list">
     
        {projectlist.map(project => {
          const randompercent = Math.floor(Math.random() * 100);
          let result = true;
        
          console.log("randomnumber = " + randompercent);
          console.log("project success = " + project.success);
          if (parseInt(project.success) > randompercent) {
            console.log("project.success = "+project.success);
            console.log("randompercent = " +randompercent);
            result = false;
            console.log(result)
          }
          if (result === true) {
            profit = profit - parseInt(project.budget);
          } else if (result === false) {
            profit = profit + parseInt(project.budget);
          }
          const stylered = { borderColor: "#FF0000" , backgroundColor: "#FF0000" };
          const stylegreen = { borderColor: "#50C878", backgroundColor: "#50C878" };
          result = !result;
          console.log("profit= "+profit)
          return (
            <div className="project--container" key={project.id}>
              <div className="fronticon">{result? <MdVerified style={{color:"green"}}/> : <MdSmsFailed style={{color:"red"}}/>}</div>
              <div className="project--list" style={result ? stylegreen : stylered} key={project.id}>
                <div className="project--name">
                  โปรเจค "{project.name !== "" ? project.name : "ไม่ได้ระบุชื่อโปรเจค"}" {result ? "สำเร็จ" : "ไม่สำเร็จ"} {result? "คุณจะได้กำไร" : "คุณจะเสียเงินลงทุน"} {project.budget !== ""? project.budget : "ไม่ได้ระบุงบลงทุน"} บาท
                </div>
              </div>
            </div>
          );
        })}
        <div className="conclusion" style={{color : profit===0? "white" :"black"}}>รายการสรุปคุณจะ{profit>0? "ได้กำไร":"ขาดทุน"} {profit} บาท</div>
      </ul>
    </div>
  );
}