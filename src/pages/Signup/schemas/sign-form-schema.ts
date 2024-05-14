import * as yup from 'yup'

export const SignUpFormSchema= yup.object({
      name: yup.string().required('Nombre es requerido'),
      username: yup.string().required('Nombre de Usuario es requerido').max(12,'Nombre de Usuario no debe tener más de 12 caracteres'),
      password: yup.string().required('Contraseña es requerido').max(12,'Contraseña no debe tener más de 12 caracteres')
      .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Contraseña debe ser alfanumérica, y contener máximo 12 caracteres, una mayúscula y un caracter especial')
      .required()
})