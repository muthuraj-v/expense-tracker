import React from "react";
import "./Burger.css";

interface BurgerProps {
  isOpen: boolean;
}

const Burger: React.FC<BurgerProps> = ({ isOpen }) => {
  return (
    <div className="hamburger">
      <div className={`burger burger1 ${isOpen ? "rotate45" : ""}`} />
      <div className={`burger burger2 ${isOpen ? "translateOut" : ""}`} />
      <div className={`burger burger3 ${isOpen ? "rotateNeg45" : ""}`} />
    </div>
  );
};

export default Burger;
