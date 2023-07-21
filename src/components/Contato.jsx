import React, { useState } from 'react';
import { useForm, Controller, useFormContext } from 'react-hook-form';

const Contato = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    control,
    formState: { errors }
  } = useFormContext();
  
  return (
    <>
      <div>
        <label>Foto de Perfil</label>
        <Controller
            name="photo"
            control={control}
            render={({ field }) => (
                <>
                <input {...field} type="file" accept="image/*" onChange={handlePhotoChange} />
                {previewImage && <img src={previewImage} alt="Preview" style={{ width: '100px', height: '100px' }} />}
                </>
            )}
        />
      </div>

      <div className = "form-control">
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
