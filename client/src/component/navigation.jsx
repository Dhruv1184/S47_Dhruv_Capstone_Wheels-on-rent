import React from 'react'
import style from '../css/navigation.module.css'
const Navigation = () => {
  return (
    <div>
      <div className={style.slider}>
        <div >
          <div className={style.upperLine}></div><br />
          <div className={style.middleLine}></div><br />
          <div className={style.lowerLine}></div><br />
        </div>
        <h1 className={style.heading}>Wheels on rent</h1>
      </div>
      <div>
        <div>
            <h2>On Rent</h2>
            <h2>On Sale</h2>
            <h2>Logout</h2>
        </div>
      </div>
    </div>
  )
}

export default Navigation
