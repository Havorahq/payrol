import React from 'react'

const Button = ({ label, style }) => {
  return (
    <button className={style || 'btn-primary'}>
        {label || 'Submit'}
    </button>
  )
}

export default Button