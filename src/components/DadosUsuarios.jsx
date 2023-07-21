import React from 'react';
import {Controller, useFormContext } from 'react-hook-form';

const PersonalInfoForm = () => {
    const {
      control,
      formState: { errors }
    } = useFormContext();

  return (
    <>
      <div className = "form-control">
        <label>Nome</label>
        <Controller
          name = "pess_tx_nome"
          control = {control}
          rules = {{ required: 'Campo obrigatório' }}
          render = {({ field }) => <input {...field} type="text" />}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div className = "form-control">
        <label>CPF</label>
        <Controller
          name="pess_nr_cpf"
          control={control}
          rules={{
            required: 'Campo obrigatório',
            pattern: {
              value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
              message: 'CPF inválido',
            },
          }}
          render={({ field }) => <input {...field} type="text" />}
        />
        {errors.cpf && <span>{errors.cpf.message}</span>}
      </div>

      <div className = "form-control">
        <label>Data de Nascimento</label>
        <Controller
          name="pess_dt_nascimento"
          control={control}
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => <input {...field} type="date" />}
        />
        {errors.birthdate && <span>{errors.birthdate.message}</span>}
      </div>

      <div className = "form-control">
        <label>Gênero</label>
        <Controller
          name="pess_in_sexo"
          control={control}
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => (
            <select {...field}>
              <option value="">Selecione...</option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </select>
          )}
        />
        {errors.gender && <span>{errors.gender.message}</span>}
      </div>
    </>
  );
};

export default PersonalInfoForm;
