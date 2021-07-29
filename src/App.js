// 1. Import *useState* and *useEffect*
import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  let [users, setUser] = useState(null);
  const [totalPages, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  function setPagination(isPrev = false) {
    let curPage = currentPage;
    if (isPrev) {
      if (curPage > 1) curPage--;
    } else {
      curPage++;
    }
    setCurrentPage(curPage);
    fetchUserData(curPage);
  }

  function fetchUserData(curPage) {
    const url = "https://reqres.in/api/users?page=" + curPage;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTotalPage(data.total_pages);
        setUser(data.data);
      });
  }

  useEffect(() => {
    fetchUserData(1);
  }, []);

  return (
    <div className="App">
      <Table striped bordered hover>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Avatar</th>
        </tr>
        {users &&
          users.map((user) => (
            <tr>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <img width={"100px"} height={"100px"} src={user.avatar}></img>
              </td>
            </tr>
          ))}
      </Table>
      <Button
        variant="outline-success"
        disabled={currentPage === 1 ? true : false}
        onClick={() => setPagination(true)}
        style={{ "margin-right": "20px" }}
      >
        Previous
      </Button>
      <Button
        variant="outline-success"
        disabled={currentPage === totalPages ? true : false}
        onClick={() => setPagination(false)}
      >
        Next
      </Button>
    </div>
  );
}

export default App;
