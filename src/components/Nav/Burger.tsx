import React from 'react';
import './Burger.css';

interface BurgerProps {
  isOpen: boolean;
}

export default function Burger({ isOpen }: BurgerProps) {
  return (
    <div className="hamburger">
      <div className={`burger burger1 ${isOpen ? 'rotate45' : ''}`}></div>
      <div className={`burger burger2 ${isOpen ? 'translateOut' : ''}`}></div>
      <div className={`burger burger3 ${isOpen ? 'rotateNeg45' : ''}`}></div>
    </div>
  );
}
