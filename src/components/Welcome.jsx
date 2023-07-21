import React from "react"
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Steps.css';

const Welcome = ({data}) => {

    const { emails, pess_tx_nome } = data
    const message = emails ? 'Acesse sua conta e continue com o seu agendamento' : 'Cadastre já sua conta para continuar com o seu agendamento';


    return (
        <div>
            <h2>BEM VINDO, {pess_tx_nome}.</h2>
            <p>{message}</p>
            <div className="checkbox">
                <FormControlLabel required control={<Checkbox />} label="Li e concordo com os Termos de serviço" />
            </div>
        </div>
        
    )
}

export default Welcome