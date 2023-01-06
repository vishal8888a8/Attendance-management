import React,{useState} from 'react'
import './css/Edit.css'

export default function Edit(props) {

    //state variable
    let data = props.data;
    let updateData = props.update;
    let [input,setInput] = useState({
        vfname:"",
        vlname:"",
        vroll:"",
        vcheckin:"",
        vcheckout:"NA"
    });
    let [display,setDisplay] = useState("");
    
    //handler functions
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
            return {
                ...prev,
                // eslint-disable-next-line
                ["vcheckin"]:getTime(),
            }
        })
    }

    function getTime()
    {
        let today = new Date();
        return today.getHours() + ":" + today.getMinutes();
    }

    function handleSubmit(e)
    {  
        e.preventDefault();
        let operation = document.activeElement.name;
        let index = data.findIndex((item)=>item.fname===input.vfname && item.lname===input.vlname && item.roll === input.vroll)
        if ( index !== -1 && operation === 'entry' )
            setDisplay('Student is already checked in!')
        else if ( index === -1 && operation === 'exit' )
            setDisplay('Student not found!')
        else if ( index !== -1 && operation === 'exit' && data[index].checkout !== 'NA' )
            setDisplay('Student already checked out!')
        else
        {
            if ( operation === 'entry')
            {
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
                setDisplay('Checked in!')
            }
            else
            {
                updateData((prev)=>{
                    let new_prev = prev;
                    new_prev[index].checkout=getTime();
                    return new_prev;
                })
                setDisplay('Checked out!')
            }
            setTimeout(() => {
                props.updateEdit(false)
            }, 2200);
        }
        console.log(data);
        setTimeout(()=>{
            setDisplay("");
        },2000)
    }

  return (
    <div className='edit_container'>
        <div className='form_header'>
            <h2>Manage Student Attendance</h2>
            <button onClick={()=>props.updateEdit(false)}>Go home</button>
        </div>
        <form onSubmit={(e)=>{
            handleSubmit(e);
        }}>
            <div className='item'>
                <label htmlFor="fname" >First Name: </label>
                <input onChange={handleInput} type="text" id="fname" name="vfname" placeholder='Enter First Name...' required/>
            </div>
            <div className='item'>
                <label htmlFor="lname">Last Name: </label>
                <input onChange={handleInput} type="text" id="lname" name="vlname" placeholder='Enter Last Name...' required/>
            </div>
            <div className='item'>
                <label htmlFor="roll">Roll no: </label>
                <input onChange={handleInput} type="text" id="roll" name="vroll" placeholder='Enter Roll No...' required/>
            </div>
            <div className='item item_submit'>
                <button type='submit' name='entry' onClick={updateCheckin}>Mark entry</button>
                <button type='submit' name='exit'>Mark exit</button>
            </div>
        </form>
        {display&&<div className='card'>{display}</div>}
    </div>
  )
}
