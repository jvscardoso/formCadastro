import React from 'react';
import {Controller, useFormContext } from 'react-hook-form';

const UserAddress = () => {
  
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <>
      <div className = "form-control">
        <label>CEP</label>
        <Controller
          name="zipCode"
          control={control}
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => <input {...field} type="text" />}
        />
        {errors.zipCode && <span>{errors.zipCode.message}</span>}
      </div>

      <div className = "form-control">
        <label>Rua</label>
        <Controller
          name="street"
          control={control}
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => <input {...field} type="text" />}
        />
        {errors.street && <span>{errors.street.message}</span>}
      </div>

      <div className = "form-control">
        <label>Número</label>
        <Controller
          name="number"
          control={control}
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => <input {...field} type="text" />}
        />
        {errors.number && <span>{errors.number.message}</span>}
      </div>

      <div className = "form-control">
        <label>Complemento</label>
        <Controller
          name="complement"
          control={control}
          render={({ field }) => <input {...field} type="text" />}
        />
      </div>

      <div className = "form-control">
        <label>Cidade</label>
        <Controller
          name="city"
          control={control}
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => <input {...field} type="text" />}
        />
        {errors.city && <span>{errors.city.message}</span>}
      </div>

      <div className = "form-control">
        <label>Estado</label>
        <Controller
          name="state"
          control={control}
          rules={{ required: 'Campo obrigatório' }}
          render={({ field }) => <input {...field} type="text" />}
        />
        {errors.state && <span>{errors.state.message}</span>}
      </div>
    </>
  );
};

export default UserAddress;
