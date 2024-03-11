
import React, { useState, useEffect } from 'react';
import style from '../css/navigation.module.css';
import { applyNormal, applyLeftArrow, applyRightArrow } from '../jsFile/navigation.js';

const Navigation = () => {
  const [slider, setSlider] = useState(false);
  const upperLine = document.getElementsByClassName(style.upperLine)[0];
  const middleLine = document.getElementsByClassName(style.middleLine)[0];
  const lowerLine = document.getElementsByClassName(style.lowerLine)[0];
  // const bar2 = document.getElementsByClassName(style.bar)[0];

  const toggleSlider = () => {
    setSlider(!slider);
  };

  useEffect(() => {
    const bar = document.getElementsByClassName(style.bar)[0];
    const btn = document.getElementsByClassName(style.btns)[0];

    const normal = () => applyNormal(upperLine, middleLine, lowerLine);
    const leftArrow = () => applyLeftArrow(upperLine, middleLine, lowerLine);
    const rightArrow = () => applyRightArrow(upperLine, middleLine, lowerLine);

    if (slider) {
      bar.style.left = '15vw';
      btn.style.position = 'fixed';
      btn.style.left = '0vw';
      bar.addEventListener('mouseover', leftArrow);
      bar.addEventListener('mouseout', normal);
    } else {
      bar.addEventListener('mouseover', rightArrow);
      bar.style.left = '0vw';
      bar.addEventListener('mouseout', normal);
      btn.style.left = '-15vw';
    }

  }, [slider]);

  return (
    <div>
      <div className={style.slider}>
        <div className={style.bar} onClick={toggleSlider}>
          <div className={style.upperLine}></div><br />
          <div className={style.middleLine}></div><br />
          <div className={style.lowerLine}></div><br />
        </div>
        <h1 className={style.heading}>Wheels on rent</h1>
      </div>
      <div>
        <div className={style.btns}>
          <div className={style.opt}>
            <h2 className={style.option}>On Rent</h2>
            <h2 className={style.option}>On Sale</h2>
          </div>
          <div>
          <div className={style.profile}>
            <lord-icon
              src="https://cdn.lordicon.com/bgebyztw.json"
              trigger="hover"
              style={{width:"60px",height:"60px",}}>
            </lord-icon>
          </div>
          <div className={style.logoutbtn} >
            <lord-icon
              src="https://cdn.lordicon.com/gwvmctbb.json"
              trigger="hover"
              stroke="light"
              className={style.logoutLogo}
              style={{width:'50px',height:"50px",transform:"rotateY(180deg)"}}
              >
            </lord-icon> 
          <h2 >Logout</h2>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
