import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const users = {
    name: "",
    email: "",
    age: "",
  };
  const [user, setUsser] = useState(users);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUsser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/userbyid/${id}`)
      .then((response) => {
        setUsser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:4000/api/userupdate/${id}`, user)
      .then((response) => {
        console.log("User created successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ height: "100vh" }} className="w-100">
      <div className="d-flex justify-content-center align-items-center">
        <form onSubmit={submitForm} className="d-flex flex-column w-50 ">
          <h3>Update Details</h3>
          <input
            className="mt-2"
            type="text"
            id="name"
            value={user.name}
            onChange={inputHandler}
            name="name"
            placeholder="Name"
          />
          <input
            className="mt-2"
            type="email"
            id="email"
            value={user.email}
            onChange={inputHandler}
            name="email"
            placeholder="Email"
          />
          <input
            className="mt-2"
            type="text"
            placeholder="Age"
            id="age"
            value={user.age}
            onChange={inputHandler}
            name="age"
          />
          <button type="submit" className="btn btn-success mt-3">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
