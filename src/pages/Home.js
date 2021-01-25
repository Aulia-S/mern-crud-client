import React from "react";
//component
import Table from "../components/Table";
import FormStuff from "../components/FormStuff";

const Home = () => {
  return (
    <div className="home min-vh-100 pb-4">
      <h1 className="app-title py-5">My Stuff</h1>
      <Table />
      <FormStuff />
    </div>
  );
};

export default Home;
