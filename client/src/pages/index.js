import React, { useState, useEffect } from 'react';

export default function Home() {
  const [users, setUsers] = useState(false);

  function getUsers() {
    fetch('http://localhost:3001/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
    // .then((response) => response.text())
    // .then((data) => setUsers(data));
  }

  function createUsers() {
    const name = prompt('Enter merchant name');
    const breakfast = prompt('Enter merchant breakfast');

    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, breakfast }),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        getUsers();
      });
  }

  function deleteUsers() {
    const id = prompt('Enter merchant id');
    fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        getUsers();
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  console.log(users);

  return (
    <main>
      {!users ? (
        <p>Loading …</p>
      ) : users.length === 0 ? (
        <p>No names</p>
      ) : (
        <div>
          {users.map((user, i) => (
            <div key={i}>
              {user.name}, {user.breakfast}, {user.drink}
            </div>
          ))}
        </div>
      )}

      <button type="button" onClick={createUsers}>
        Add
      </button>
      <br />
      <button type="button" onClick={deleteUsers}>
        Delete
      </button>
    </main>
  );
}
