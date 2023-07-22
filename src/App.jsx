//Componentes
import React, { useState, useEffect } from 'react'
import './App.css'
import {FiSend} from 'react-icons/fi'
import DadosUsuarios  from "./components/DadosUsuarios"
import Contato  from "./components/Contato"
import Confirmacao  from "./components/Confirmacao"
import Welcome from './components/Welcome'
import Steps from './components/Steps'
import UserAddress from './components/UserAddress'
import axios from 'axios'
import Logo from './images/logo.png'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

//Hooks
import { useStep } from './hooks/useStep'
import { FormProvider, useForm } from 'react-hook-form'


//caminho da API
const baseURL = "https://mocki.io/v1/5112b414-78fa-4a3c-bfca-585b014dd94d"

//variaveis do formulario
const formTemplate = {
  name: "",
  cpf: "",
  birthdate: "",
  gender: "",
  photo: "",
  phoneNumber: "",
  email: "",
  zipCode: "",
  street: "",
  number: "",
  complement: "",
  city: "",
  state: "",
}

function App() {
  const [data, setData] = useState(formTemplate);

  //constante que mantem o dado inserido previamente no campo
  const updateFieldHandler = (key, value) => {
    setData((prev) => {
      return {...prev, [key]: value}
    })
  }

  //constante do formulario
  const myForm = useForm({
    mode: "all"
  });

  const _onSubmit = (_data) => {
    console.log("submitted with", _data);
  };

  //Definição das "páginas" do formulário e suas propriedades
  const formComponents = [ 
    <Welcome 
      data = {data} 
      updateFieldHandler = {updateFieldHandler}
    />,

    <DadosUsuarios 
      data = {data} 
      updateFieldHandler = {updateFieldHandler}
      pess_nr_cpf = {data.pess_nr_cpf}
      pess_tx_nome = {data.pess_tx_nome}
      pess_dt_nascimento = {data.pess_dt_nascimento}
      pess_in_sexo = {data.pess_in_sexo}
    />, 

    <Contato 
      data = {data} 
      updateFieldHandler = {updateFieldHandler}
      tele_nr_telefone = {data.tele_nr_telefone}
      emails = {data.emails}
    />,

    <UserAddress 
      data = {data}
      updateFieldHandler = {updateFieldHandler}
    />,

    <Confirmacao data = {data}/>
  ]

  //Definição dos passos do formulário
  const {currentStep, currentComponent, changeStep, isLastStep, isFirstStep} = useStep(formComponents)

  //função que valida os dados caso o retorno da api seja = success
  function validarResp (response){ 
    const {data} = response
    if (data.success) {
      return data.dados;
    }
  } 

  //validação do link da API
  async function validarLink (){
    const response = await axios.get (baseURL)
    const header = response.headers
  }

  //hook para resetar o dado do formulario
  useEffect(() => {
    myForm.reset(data);
  }, [myForm, data]);

  //função que pega os dados da api de acordo com o token passado
  async function getDados (token){
    try { 
      const response = await axios.get(baseURL)
      const data = validarResp(response)
      const userData = data.filter (user => user.token == token)
      
      setData((prevData) => ({
        ...prevData,
        ...userData[0],
      }))
      return await userData
    }
    catch(error){
      console.log(error)
    }
  }

  //hook para pegar os dados do usuario atraves do token
  useEffect(() => {
    getDados(token);
  }, [])

  //constantes para validação do token
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const {token} = params
  validarLink()

  return (
      <div className = "app">
        <div className = "header">
          <h1>
            <img src={Logo}/>
          </h1>
        </div> 

        <FormProvider {...myForm}>
          <form onSubmit={myForm.handleSubmit(_onSubmit)}>
            <Steps currentStep = {currentStep}/>
            <div className = "form-container">  
              <>
                <div className="inputs">
                  {currentComponent}
                </div>

                <div className = "actions">
                  {!isFirstStep && ( //faz a verificação se é o primeiro passo do formulario, caso seja o botão "voltar" não é exibido
                    <button type = "primary" onClick={() => changeStep(currentStep -1)}>
                      <ChevronLeftIcon />
                      Voltar
                    </button>
                  )}
                  
                  {!isLastStep ? ( //faz a verificação se é o ultimo passo do formulario, caso seja o botão "proximo" é substituido por "confirmar"
                    <button onClick={(e) => changeStep(currentStep + 1, e)}>
                      Proximo
                      <ChevronRightIcon/>
                    </button>
                  ) : (
                    <button type = "submit">
                        Confirmar
                        <FiSend/>
                    </button>
                    )}
                </div>
              </>
            </div>
          </form>
        </FormProvider>
      </div>
  )
}

export default App
