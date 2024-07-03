import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const users = {
    name: "",
    email: "",
    age: "",
  };
  const [user, setUsser] = useState(users);
  const navigate = useNavigate()

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUsser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/api/create",user)
      .then((response) => {
        console.log("User created successfully");
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ height: "100vh" }} className="w-100">
      <div className="d-flex justify-content-center align-items-center">
        <form onSubmit={submitForm} className="d-flex flex-column w-50 ">
          <h3>Add Details</h3>
          <input
            className="mt-2"
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            placeholder="Name"
          />
          <input
            className="mt-2"
            type="email"
            id="email"
            onChange={inputHandler}
            name="email"
            placeholder="Email"
          />
          <input
            className="mt-2"
            type="text"
            placeholder="Age"
            id="age"
            onChange={inputHandler}
            name="age"
          />
          <button type="submit" className="btn btn-success mt-3">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
