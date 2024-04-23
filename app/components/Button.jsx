import React from 'react'

const Button = ({ label, style, onClick }) => {
  return (
    <button className={style || 'btn-primary'} onClick={onClick}>
        {label || 'Submit'}
    </button>
  )
}

export default Button