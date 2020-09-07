import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import Name from './Name';
import Form from './Form';

import{getNames} from '../actions';
import {sortNames} from './Sort';

const NameList = ({ curList, getNames, names, sortOrder }) => {
  
  useEffect(() => {
    getNames(curList.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curList])

  const renderNames = () => {
    return sortNames(names, sortOrder).map(name => {
      return (<Name
        key={`${name.list_id}-${name.id}`}
        name={name} />)
    })
  }

  return (
    <div className="list-box">
      <Form/>
      <div className='name-list'>
        {renderNames()}
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    curList: state.curList,
    names: state.names,
    sortOrder: state.sortOrder
  }
};
export default connect(mapStateToProps, {getNames})(NameList);