import { useState } from 'react'

export function useStep(steps){

    const [currentStep, setCurrentStep] = useState(0)

    //Mudança das etapas
    function changeStep(i, e){
        if (e) e.preventDefault();

        //Validação das etapas
        if(i < 0 || i >= steps.length) return

        setCurrentStep(i)
    }

    return{
        currentStep,
        currentComponent: steps[currentStep],
        changeStep,

        //verifica se é o primeiro passo do formulario
        isFirstStep: currentStep === 0 ? true : false,

        //verifica se é o ultimo passo do formulario
        isLastStep: currentStep + 1 === steps.length ? true : false,
    }

}