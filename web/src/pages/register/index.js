import React,{useState} from 'react'
import {Link , useHistory} from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import {FiArrowLeft} from 'react-icons/fi'
import api  from '../../services/api'

 import './styles.css'
export default function Register(){
const history  =useHistory();
  const [nome,setNome]=useState('')
  const [email,setEmail]=useState('')
  const [whatsapp,setWhatsapp]=useState('')
  const [city,setCidade]=useState('')
  const [uf,setUf]=useState('')

  async function handleSubmit(e){
    e.preventDefault();
    const data ={
      nome,
      email,
      whatsapp,
      city,
      uf
    }
try {
     const response =  await api.post('/ongs',data)
     alert(`Seu ID de acesso: ${response.data.id}`)
     history.push('/')
   
    
}catch{
  alert("Erro ao cadastrar tente novamente");
}
  }
    return (
      <div className="register-container">
      <div className="content">
      <section>
          <img src={logoImg} alt="be the hero"/>
          <h1>Cadastro</h1>
         
         <p>Faço seu cadastro , entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>
         <Link  className="back-link" to="/">
              <FiArrowLeft size={16} color="#E02041"/>
              Não tenho cadastro</Link>
      </section>

      <form onSubmit={handleSubmit}>
          <input placeholder="Nome da ONG"
          value={nome}
          onChange={e=>setNome(e.target.value)}
          />
          <input type="email" placeholder="E-Email"
           value={email}
           onChange={e=>setEmail(e.target.value)}
          />
          <input placeholder="Whatsapp"
           value={whatsapp}
           onChange={e=>setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input placeholder="Cidade"
             value={city}
             onChange={e=>setCidade(e.target.value)}
            />
            <input placeholder="UF" style={{width:80}}
             value={uf}
             onChange={e=>setUf(e.target.value)}
            />
          </div>
        <button className="button" type="submit">
        Cadastrar
        </button>
      </form>



      </div>
      </div>

    )
}