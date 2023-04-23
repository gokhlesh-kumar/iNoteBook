import React from 'react'

const Alert = (props) => {
  const Capitalize = (word) =>{
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <div style = {{height:'50px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} fade show`} role="alert">
          <strong>{Capitalize(props.alert.type === 'danger' ? "Error" : props.alert.type)} : {props.alert.msg}</strong>
      </div>}
    </div>
  )
}

export default Alert
