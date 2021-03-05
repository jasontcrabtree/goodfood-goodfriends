import React, { useState, useEffect } from 'react';

function App(props) {
  const [merchants, setMerchants] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    getMerchant();
  }, []);

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

  console.log(merchants);

  return (
    <div>
      {merchants || 'There is no merchant data'}

      {/* {merchants.map((merchant, i) => {
          console.log(merchant)
          return (
          <div key={i}>{merchant.name}</div>)
        })
        || 'No data'}; */}

      {/* {merchants.map((merchant, i) => {
          console.log(merchant);
          return <div key={i}>{i}</div>;
        })} */}

      {/* {merchants ? {
          <div>
            merchants.map((merchant, i) => {
              console.log(merchant);
              return <div key={i}>{i}</div>;
            })
          }
          </div> : (<div>No merchant data</div>)} */}

      {!merchants ? (
        <p>Loading …</p>
      ) : merchants.length === 0 ? (
        <p>No recipes</p>
      ) : (
            <div>
              {merchants.map((merchant, i) => {
                console.log(merchant);
                return (
                  <div key={i}>{i}</div>
                )
              })}
            </div>
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
  )
}

export default App;
