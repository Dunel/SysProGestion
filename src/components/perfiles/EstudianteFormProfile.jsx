// components/AlcaldiaProfileForm.js

import React, { useState } from 'react';

const AlcaldiaProfileForm = () => {
  const [formData, setFormData] = useState({
    nombreAlcaldia: '',
    nombreRepresentante: '',
    apellidoRepresentante: '',
    fotoDelRepresentante: null,
    nombreCargo: '',
    emailPersonal: '',
    telefonoPersonal: '',
    telefonoAlcaldia: '',
    emailAlcaldia: '',
    direccionAlcaldia: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'fotoDelRepresentante') {
      setFormData({ ...formData, [name]: files[0] }); // Guardar el archivo de imagen
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombreAlcaldia) newErrors.nombreAlcaldia = 'El nombre de la alcaldía es requerido';
    if (!formData.nombreRepresentante) newErrors.nombreRepresentante = 'El nombre del representante es requerido';
    if (!formData.apellidoRepresentante) newErrors.apellidoRepresentante = 'El nombre del representante es requerido';
    if (!formData.fotoDelRepresentante) newErrors.fotoDelRepresentante = 'La foto del representante es requerida';
    if (!formData.nombreCargo) newErrors.nombreCargo = 'El nombre del cargo es requerido';
    if (!formData.emailPersonal) {
      newErrors.emailPersonal = 'El email personal es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailPersonal)) {
      newErrors.emailPersonal = 'El email personal no es válido';
    }
    if (!formData.telefonoPersonal) newErrors.telefonoPersonal = 'El teléfono personal es requerido';
    if (!formData.telefonoAlcaldia) newErrors.telefonoAlcaldia = 'El teléfono de la alcaldía es requerido';
    if (!formData.emailAlcaldia) {
      newErrors.emailAlcaldia = 'El email de la alcaldía es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAlcaldia)) {
      newErrors.emailAlcaldia = 'El email de la alcaldía no es válido';
    }
    if (!formData.direccionAlcaldia) newErrors.direccionAlcaldia = 'La dirección de la alcaldía es requerida';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Aquí puedes manejar el envío del formulario, como una llamada a una API
      console.log('Formulario enviado:', formData);
      setErrors({});
      // Reiniciar el formulario si es necesario
      setFormData({
        nombreAlcaldia: '',
        nombreRepresentante: '',
        apellidoRepresentante: '',
        fotoDelRepresentante: null,
        nombreCargo: '',
        emailPersonal: '',
        telefonoPersonal: '',
        telefonoAlcaldia: '',
        emailAlcaldia: '',
        direccionAlcaldia: '',
      });
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800">Actualizando Perfil.</h2>
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="nombreAlcaldia">
            Nombre de la Alcaldía
          </label>
          <input
            type="text"
            name="nombreAlcaldia"
            id="nombreAlcaldia"
            value={formData.nombreAlcaldia}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.nombreAlcaldia ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.nombreAlcaldia && <p className="text-red-500 text-sm">{errors.nombreAlcaldia}</p>}
        </div>



        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="telefonoAlcaldia">
            Teléfono de la Alcaldía
          </label>
          <input
            type="tel"
            name="telefonoAlcaldia"
            id="telefonoAlcaldia"
            value={formData.telefonoAlcaldia}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.telefonoAlcaldia ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.telefonoAlcaldia && <p className="text-red-500 text-sm">{errors.telefonoAlcaldia}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="emailAlcaldia">
            Email de la Alcaldía
          </label>
          <input
            type="email"
            name="emailAlcaldia"
            id="emailAlcaldia"
            value={formData.emailAlcaldia}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.emailAlcaldia ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.emailAlcaldia && <p className="text-red-500 text-sm">{errors.emailAlcaldia}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="direccionAlcaldia">
            Dirección de la Alcaldía
          </label>
          <input
            type="text"
            name="direccionAlcaldia"
            id="direccionAlcaldia"
            value={formData.direccionAlcaldia}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.direccionAlcaldia ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.direccionAlcaldia && <p className="text-red-500 text-sm">{errors.direccionAlcaldia}</p>}
        </div>


        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="nombreRepresentante">
            Nombre del Representante
          </label>
          <input
            type="text"
            name="nombreRepresentante"
            id="nombreRepresentante"
            value={formData.nombreRepresentante}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.nombreRepresentante ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.nombreRepresentante && <p className="text-red-500 text-sm">{errors.nombreRepresentante}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="apellidoRepresentante">
            Apellido del Representante
          </label>
          <input
            type="text"
            name="apellidoRepresentante"
            id="apellidoRepresentante"
            value={formData.apellidoRepresentante}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.apellidoRepresentante ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.apellidoRepresentante && <p className="text-red-500 text-sm">{errors.apellidoRepresentante}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="fotoDelRepresentante">
            Cargar Foto del Representante
          </label>
          <input
            type="file"
            name="fotoDelRepresentante"
            id="fotoDelRepresentante"
            accept="image/*"
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.fotoDelRepresentante ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.fotoDelRepresentante && <p className="text-red-500 text-sm">{errors.fotoDelRepresentante}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="nombreCargo">
            Nombre del Cargo
          </label>
          <input
            type="text"
            name="nombreCargo"
            id="nombreCargo"
            value={formData.nombreCargo}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.nombreCargo ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.nombreCargo && <p className="text-red-500 text-sm">{errors.nombreCargo}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="emailPersonal">
            Email Personal
          </label>
          <input
            type="email"
            name="emailPersonal"
            id="emailPersonal"
            value={formData.emailPersonal}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.emailPersonal ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.emailPersonal && <p className="text-red-500 text-sm">{errors.emailPersonal}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="telefonoPersonal">
            Teléfono Personal
          </label>
          <input
            type="tel"
            name="telefonoPersonal"
            id="telefonoPersonal"
            value={formData.telefonoPersonal}
            onChange={handleChange}
            className={`mt-1 block w-full p-2 border ${errors.telefonoPersonal ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            required
          />
          {errors.telefonoPersonal && <p className="text-red-500 text-sm">{errors.telefonoPersonal}</p>}
        </div>

        



        <button
          type="submit"
          className="w-full bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Enviar
        </button>
      </form>
    </div>
    </>
  );
};

export default AlcaldiaProfileForm;