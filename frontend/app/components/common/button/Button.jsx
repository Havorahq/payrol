import React from 'react'

const Button = ({ label, style, onClick, disabled }) => {
  return (
    <button className={style || 'btn-primary'} onClick={onClick} disabled={disabled}>
        {label || 'Submit'}
    </button>
  )
}

export default Button