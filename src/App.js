import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  const [nome_cliente, setNomeCliente] = useState('');
  const [cargo, setCargo] = useState('');
  const [clienteReviewList, setClienteList] = useState([]);
  const [newCargo, setNewCargo] = useState('');
  const [foto_profile, setNewImg] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setClienteList(response.data);
    })
  }, []);

  const submitReview = () => {

    Axios.post('http://localhost:3001/api/insert', {
      nome_cliente: nome_cliente,
      cargo: cargo,
      foto_profile: foto_profile
    });

    setClienteList([
      ...clienteReviewList,
      { nome_cliente: nome_cliente, cargo: cargo, foto_profile: foto_profile },
    ]);

  };


  const deleteReview = (nome_cliente) => {
    Axios.delete(`http://localhost:3001/api/delete/${nome_cliente}`);
  };

  const updateReview = (nome_cliente) => {
    Axios.put("http://localhost:3001/api/update", {
      nome_cliente: nome_cliente,
      cargo: newCargo,
    });
    setNewCargo("");
  };

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <img src="..\logo192.png" alt="imagem" />
      <div className="form">
        <label> Name</label>
        <input type="text" name="nome_cliente" onChange={(e) => {
          setNomeCliente(e.target.value)
        }} />
        <label>cargo</label>
        <input type="text" name="review" onChange={(e) => {
          setCargo(e.target.value)
        }} />

          <input type="file" name="foto_profile" onChange={(e) => {setNewImg(e.target.value)}}/>
            
            <button onClick={submitReview}>Submit</button>

            {clienteReviewList.map((val) => {
              return (
                <div className="card">
                  <h1>Nome: {val.nome_cliente}</h1>
                  <p>Cargo: {val.cargo}</p>
                  <img src={val.foto_profile} alt="imagem" />

                  <button onClick={() => { deleteReview(val.nome_cliente) }}>Delete</button>
                  <input type="text" id="updateInput" onChange={(e) => {
                    setNewCargo(e.target.value)
                  }} />
                  <button onClick={() => { updateReview(val.nome_cliente) }}>Update</button>
                </div>
              );
            })}

      </div>
    </div >
        );
}


        export default App;
