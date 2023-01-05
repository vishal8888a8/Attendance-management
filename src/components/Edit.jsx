import React,{useState} from 'react'
import './css/Edit.css'

export default function Edit(props) {

    let [input,setInput] = useState({
        vfname:"",
        vlname:"",
        vroll:"",
        vcheckin:"",
        vcheckout:""
    });
    let data = props.data;
    let updateData = props.update;
    function handleInput(e)
    {
        let {name, value} = e.target;
        setInput((prev)=>{
        return {
            ...prev,
            [name]:value
        }})
    }
    function updateCheckin()
    {
        setInput((prev)=>{
            let today = new Date();
            let time_data = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();    
            return {
                ...prev,
                ["vcheckin"]:time_data
            }
        })
    }
    function handleSubmit(e)
    {  
        e.preventDefault();
        console.log(input);
        updateData((prev)=>{
            let array = prev;
            array.push({
                fname:input.vfname,
                lname:input.vlname,
                roll:input.vroll,
                checkin:input.vcheckin,
                checkout:input.vcheckout
            });
            return array;
        })
        console.log(data);
        setTimeout(() => {
            props.updateEdit(!props.isEdit)
        }, 1000);
    }

  return (
    <div className='edit_container'>
        <h2>Manage Student Attendance</h2>
        <form onSubmit={(e)=>{
            handleSubmit(e);
        }}>
            <div className='item'>
                <label htmlFor="fname" >First Name: </label>
                <input onChange={handleInput} type="text" id="fname" name="vfname" placeholder='Enter First Name...' />
            </div>
            <div className='item'>
                <label htmlFor="lname">Last Name: </label>
                <input onChange={handleInput} type="text" id="lname" name="vlname" placeholder='Enter Last Name...' />
            </div>
            <div className='item'>
                <label htmlFor="roll">Roll no: </label>
                <input onChange={handleInput} type="text" id="roll" name="vroll" placeholder='Enter Roll No...' />
            </div>
            <div className='item item_submit'>
                <button type='submit' value='entry' onClick={updateCheckin}>Mark entry</button>
                <button type='submit' value='exit'>Mark exit</button>
            </div>
        </form>
    </div>
  )
}
