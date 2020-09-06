import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
// import axios from 'axios';

import Name from './Name';
import Form from './Form';
// import { config } from '../const'

import{getNames} from '../actions'

const NameList = ({ curList, getNames, names }) => {

  // const [names, setNames] = useState([])
  const [sortedNames, setSortedNames] = useState([])

  const sorts = {
    alpha: (a, b) => a.name.localeCompare(b.name),
    revAlpha: (a, b) => b.name.localeCompare(a.name),
    createdAt: (a, b) => a.created_at.localeCompare(b.created_at),
    revCreatedAt: (a, b) => b.created_at.localeCompare(a.created_at),
    shortest: (a, b) => a.name.length - b.name.length,
    longest: (a, b) => b.name.length - a.name.length
  }
  
  useEffect(() => {
    getNames(curList.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, [curList])

  // const getNames = async () => {
  //   console.log(`${config.url.API_URL}/names/?list_id=${curList.id}`)
  //   const response = (await axios.get(`${config.url.API_URL}/names?list_id=${curList.id}`)).data
  //   console.log('Names',response)
  //   setNames(response.names)
  //   setSortedNames(names);
  // }

  const sortNames = (sortType) => {
    const sorted = names.slice().sort(sorts[sortType])
    setSortedNames(sorted)
  }

  // const handleStatusClick = async (nameId) => {
  //   const result = await fetch(`${URL}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body:
  //       JSON.stringify({
  //         id: listId,
  //         name_id: nameId
  //       })
  //   })
  //   let response = await result.json();
  //   if (!response.error) {
  //     let tempNames = [...names]
  //     let curName = tempNames.find(name => name.id === nameId);
  //     curName.active = !curName.active
  //     setNames(tempNames);
  //   }
  // }

  // const handleDeleteClick = async (e, nameId) => {
  //   e.stopPropagation()
  //   // console.log('Clicked: ', listId, nameId, e.target)
  //   const response = await fetch(`${URL}/names`, {
  //     method: "DELETE",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(
  //       {
  //         id: listId,
  //         name_id: nameId
  //       }
  //     )
  //   })
  //   const result = await response.json();
  //   console.log(result) 
  //     getNames();

  // }

  const renderNames = () => {
    return names.map(name => {
      return (<Name
        // handleStatusClick={handleStatusClick}
        // handleDeleteClick={handleDeleteClick}
        key={`${name.list_id}-${name.id}`}
        name={name} />)
    })
  }

  return (
    <div>
      <Form
        // listId={listId}
        // getNames={getNames}
        // sortNames={sortNames}
      />
      <div className='name-list'>
        {renderNames()}
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    curList: state.curList,
    names: state.names
  }
};
export default connect(mapStateToProps, {getNames})(NameList);