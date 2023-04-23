import React from "react";
import Notes from "./Notes";

const Home = (props) => {
  
  return (
    <div>
      <div className="container my-3">
        <Notes alert = {props.alert}/>
      </div>
    </div>
  );
};

export default Home;
