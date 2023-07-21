import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import './Steps.css';

const steps = [
  'Bem vindo',
  'Informações Pessoais',
  'Informações de Contato',
  'Endereço',
  'Confirmação'
];

export default function HorizontalLinearAlternativeLabelStepper({currentStep}) {
  return (
      <Box sx={{ width: '30%', margin: "auto"}}>
        <Stepper activeStep = {currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel className='label'>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
  );
}