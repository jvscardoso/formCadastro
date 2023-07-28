import React, { useState } from 'react';
import { useForm, Controller, useFormContext } from 'react-hook-form';
import AvatarUpload from './AvatarUpload';

const Contato = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  
  return (
    <>
      <div>
        <label>Foto de Perfil</label>
          <AvatarUpload />
      </div>

      <div className = "form-control" style={{ marginTop: '1rem' }} >
        <label>Número de Telefone</label>
        <Controller
          name="telefones.tele_nr_telefone"
          control={control}
          rules={{
            required: 'Campo obrigatório',
            pattern: {
              value: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
              message: 'Número de telefone inválido (ex: (00) 12345-6789)',
            },
          }}
          render={({ field }) => <input {...field} type="text" />}
        />
        {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
      </div>

      <div className = "form-control">
        <label>E-mail</label>
        <Controller
          name="emails"
          control={control}
          rules={{
            required: 'Campo obrigatório',
            pattern: {
              // Expressão regular simples para verificar o formato básico do e-mail
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'E-mail inválido',
            },
          }}
          render={({ field }) => <input {...field} type="text" />}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
    </>
  );
};

export default Contato;
