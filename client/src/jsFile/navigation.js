export const applyNormal = (upperLine, middleLine, lowerLine) => {
    upperLine.style.transform = 'rotate(0deg)';
    upperLine.style.borderRadius = '0';
    upperLine.style.width = '40px';
    middleLine.style.marginLeft = '0';
    middleLine.style.marginRight = '0';
    middleLine.style.width = '40px';
    lowerLine.style.borderRadius = '0';
    lowerLine.style.transform = 'rotate(0deg)';
    lowerLine.style.width = '40px';
  };
  
  export const applyLeftArrow = (upperLine, middleLine, lowerLine) => {
    upperLine.style.transform = 'rotate(-50deg)';
    middleLine.style.marginLeft = '20px';
    lowerLine.style.transform = 'rotate(50deg)';
  };
  
  export const applyRightArrow = (upperLine, middleLine, lowerLine) => {
    upperLine.style.transform = 'rotate(50deg)';
    middleLine.style.marginLeft = '-20px';
    lowerLine.style.transform = 'rotate(-50deg)';
  };
  