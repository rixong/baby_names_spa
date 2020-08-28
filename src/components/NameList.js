import React from 'react';

const NameList = ({ names }) => {

  const [names, setNames] = useState([])
  const [queryTerm, setQueryTerm] = useState('')

  const onClickName = async () => {
    const name_id = parseInt(e.target.dataset.id)
    const result = await fetch(`${URL}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify({
          uid: curId,
          name_id
        })
    })
    let response = await result.json();
    if (!response.error) {
      let tempNames = [...names]
      let curName = tempNames.find(name => name.id === name_id);
      curName.active = !curName.active
      setNames(tempNames)
    }
  }

  const addName = async (name) => {
    const result = await fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:
        JSON.stringify({
          uid: curId,
          name: name
        })
    })
    const response = await result.json()
    // console.log(response)
    if (response.error) {
      setError(response.error)
    }
    else {
      getResult();
    }
  }

  const onSubmitName = (e) => {
    e.preventDefault();
    let name = queryTerm.trim();
    if (name.match(/[^A-z, a-z]/)) {
      setError('Name should only include letters.')
      return
    }
    name = queryTerm.split(' ');
    if (name.length > 2) {
      setError('Name should only include maximum one space.')
      return
    }
    //Fix capitalization
    name = name.map(subname => {
      return (subname.slice(0, 1).toUpperCase() + subname.slice(1).toLowerCase())
    }).join(' ');
    // console.log('Name', name)
    addName(name);
    setQueryTerm('');
  }

  const renderNames = () => {
    return names.map(name => {
      const textType = name.active ? "list-group-item" : "list-group-item strike"
      return (<li
        className={textType}
        key={name.id}
        onClick={(e) => onClickName(e)}
        data-id={name.id}
      >{name.name}</li>)
    })
  }

  return (
    <div>Hello from NameList
      <form onSubmit={onSubmitName}>
        <div className="form-group">
          <input
            type='text'
            name='name'
            placeholder='Add a name'
            value={queryTerm}
            onChange={(e) => setQueryTerm(e.target.value)}
          ></input>
          <button className='primary'>Submit</button>
        </div>
      </form>
    </div>
  )
}
export default NameList;