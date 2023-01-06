import React,{useState} from 'react'
import './css/List.css'

export default function List(props) {
  let [presentOnly,setPresentOnly] = useState(false);
  return (
    <div className='list_container'>
      <div className='header'>
        <h2>Student Attendance Management</h2>
        <button onClick={()=>{props.updateEdit(!props.isEdit)}}>Mark attendance</button>
      </div>
      <div className='table_list'>
        <input onClick={()=>setPresentOnly((prev)=>!prev)} type="checkbox" id='checkbox' name='checkbox' />
        <label htmlFor="checkbox">only show students currently in  class</label>
        <table className="students">
          <thead>
            <tr>
              <th>Index no.</th>
              <th>Full Name</th>
              <th>Roll No.</th>
              <th>Checkin time</th>
              <th>Checkout time</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((item,idx)=>{
              return (presentOnly===true&&item.checkout!=='NA'?null: <tr>
              <td>{idx+1}</td>
              <td>{item.fname+' '+item.lname}</td>
              <td>{item.roll}</td>
              <td>{item.checkin}</td>
              <td>{item.checkout}</td>
            </tr>)
            })}
          </tbody>
      </table>
      </div>
    </div>
  )
}
