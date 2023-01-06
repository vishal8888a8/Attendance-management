import React from 'react'
import {useState} from 'react'
import Edit from './Edit';
import List from './List'
import data from '../data'

export default function Dashboard() {

    var [isEdit,updateEdit] = useState(false);   // To show Edit page or not
    var [dataList,updateList] = useState(data);  // Our data as state variable

  return (
    <div>
      {/* if Edit is true Edit page is show or else List page
      both state variable and fucntion is passed as props to them */}
        {isEdit?
        <Edit isEdit={isEdit} updateEdit={updateEdit} data={dataList} update={updateList}/>:
        <List data={dataList} isEdit={isEdit} updateEdit={updateEdit}/>}
    </div>
  )
}
