import React,{useState} from 'react'
import './styles.css'
import {Link,useHistory} from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import {FiArrowLeft} from 'react-icons/fi'

import  api from '../../services/api'

export default function NewIncident(){
    const history =useHistory()
    const [title,setTitle]= useState('')
    const [description,setDescription]= useState('')
    const [value,setValue]= useState('')
const idOng=localStorage.getItem('ongId')

    async function handleSubmit(e){
        e.preventDefault();

        const data ={
            title,
            description,
            value
        }
        try{
        await api.post('incidents',data,{
           headers:{
               Auth:idOng

           }
           
       })
       history.push('/profile')
    }catch(err){
        alert("não foi possivel cadastro o novo pedido")
    }

    }

    return (
        <div className="new-incident-container">
        <div className="content">
        <section>
            <img src={logoImg} alt="be the hero"/>
            <h1>Cadastro de um novo caso</h1>
           
           <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>
           <Link  className="back-link" to="/profile">
                <FiArrowLeft size={16} color="#E02041"/>
                Voltar para Home</Link>
        </section>
  
        <form onSubmit={handleSubmit}>
            <input  placeholder="Titulo do caso"
            value={title}
            onChange={e=>setTitle(e.target.value)}
            />
            <textarea  placeholder="Descrição"
              value={description}
              onChange={e=>setDescription(e.target.value)}
              />
            <input placeholder="Valor em reais"
              value={value}
              onChange={e=>setValue(e.target.value)}
            />
  
          
          <button  className="button" type="submit">
          Cadastrar
          </button>
        </form>
  
  
  
        </div>
        </div>



    )
}