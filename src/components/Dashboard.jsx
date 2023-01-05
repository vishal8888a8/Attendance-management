import React from 'react'
import {useState} from 'react'
import Edit from './Edit';
import List from './List'
import data from '../data'

export default function Dashboard() {

    var [isEdit,updateEdit] = useState(false);
    var [dataList,updateList] = useState(data);

  return (
    <div>
        {isEdit?<Edit isEdit={isEdit} updateEdit={updateEdit} data={dataList} update={updateList}/>:
        <List data={dataList} isEdit={isEdit} updateEdit={updateEdit}/>}
    </div>
  )
}
