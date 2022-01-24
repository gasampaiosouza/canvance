const handleFormValidation = (formData: CategoryFormProps) => {
  const { name, description, priority } = formData;

  let isValid = true;
  let formErrors = {} as CategoryFormProps;

  if (!name) {
    const message = 'O nome é obrigatório';
    formErrors.name = message;

    isValid = false;
  }

  if (!description) {
    const message = 'A descrição é obrigatória';
    formErrors.description = message;

    isValid = false;
  }

  if (!priority) {
    const message = 'A prioridade é obrigatória';
    formErrors.priority = message;

    isValid = false;
  }

  return { isValid, formErrors };
};

export default handleFormValidation;
