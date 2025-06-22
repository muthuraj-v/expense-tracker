import React from "react";

type AppProp = {
  name?: String;
  amount: String;
  nav: React.ReactNode;
};
const Card: React.FC<AppProp> = ({ name, amount, nav }) => {
  return (
    <>
      <div className="flex p-6 rounded-xl shadow-md">
        <div className="flex items-center space-x-8">
          <div className="text-5xl">{nav}</div>
          <div className="m-2">
            <p className="text-md font-medium">{name}</p>
            <p className="text-red-600 font-bold text-xl">&#x20B9;{amount}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
