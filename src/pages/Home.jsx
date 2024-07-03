import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/allUser");
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/userdelete/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("There was an error deleting the user:", error);
    }
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="w-100 d-flex justify-content-center align-items-center"
    >
      <div>
        <Link to="/add" className="btn border-dark mb-2">
          Add +
        </Link>
        <Table className="w-50" striped bordered hover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td className="d-flex">
                  <Link to={`/edit/${user._id}`} className="btn btn-primary">
                    Update
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="btn btn-danger ms-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
