import React, { useState, useEffect } from 'react';

export default function Home() {
  const [merchants, setMerchants] = useState(false);

  function getMerchant() {
    fetch('http://localhost:3001/users')
      .then((response) => response.text())
      .then((data) => setMerchants(data));
  }

  function createMerchant() {
    const name = prompt('Enter merchant name');
    const email = prompt('Enter merchant email');

    fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        getMerchant();
      });
  }

  function deleteMerchant() {
    const id = prompt('Enter merchant id');
    fetch(`http://localhost:3001/merchants/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        getMerchant();
      });
  }

  useEffect(() => {
    getMerchant();
  }, []);

  console.log(merchants);

  return (
    <div>
      {!merchants ? (
        <p>Loading …</p>
      ) : merchants.length === 0 ? (
        <p>No recipes</p>
      ) : (
        <div>{merchants}</div>
      )}

      <br />
      <button type="button" onClick={createMerchant}>
        Add
      </button>
      <br />
      <button type="button" onClick={deleteMerchant}>
        Delete
      </button>
    </div>
  );
}
