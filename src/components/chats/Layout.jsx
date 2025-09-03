import React from 'react'
const Layout = ({title,classes="",children}) => {
  return (
    <div className={`${classes}`}>
        <title>{title}</title>
    {children}
    </div>
  )
}

export {Layout};