import { patterns } from 'helpers/patterns';

const handleFormValidation = (formData: UserFormProps) => {
  const { name, email, permissionLevel, category } = formData;

  let isValid = true;
  let formErrors = {} as UserFormProps;

  if (!name?.length) {
    const message = 'O nome é obrigatório';
    formErrors.name = message;

    isValid = false;
  }

  if (!email?.length) {
    const message = 'A descrição é obrigatória';
    formErrors.email = message;

    isValid = false;
  }

  if (!patterns.email.test(email)) {
    const message = 'Email inválido';
    formErrors.email = message;

    isValid = false;
  }

  if (!category?.length) {
    const message = 'A categoria é obrigatória';
    formErrors.category = message;

    isValid = false;
  }

  if (!permissionLevel) {
    const message = 'O nível de permissão é obrigatório';
    formErrors.permissionLevel = message;

    isValid = false;
  }

  if (permissionLevel < 1 || permissionLevel > 3) {
    const message = 'O nível de permissão deve estar entre 1 e 3';
    formErrors.permissionLevel = message;

    isValid = false;
  }

  return { isValid, formErrors };
};

export default handleFormValidation;
