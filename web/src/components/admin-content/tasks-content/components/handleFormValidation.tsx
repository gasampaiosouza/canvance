const handleFormValidation = (formData: TaskFormProps) => {
  const { title, description, relevance, category } = formData;

  let isValid = true;
  let formErrors = {} as TaskFormProps;

  if (!title?.length) {
    const message = 'O título é obrigatório';
    formErrors.title = message;

    isValid = false;
  }

  if (!description?.length) {
    const message = 'A descrição é obrigatória';
    formErrors.description = message;

    isValid = false;
  }

  if (!category?.length) {
    const message = 'A categoria é obrigatória';
    formErrors.category = message;

    isValid = false;
  }

  if (!relevance || relevance < 1 || relevance > 100) {
    const message = 'A relevância deve estar entre 1 e 100';
    formErrors.relevance = message;

    isValid = false;
  }

  return { isValid, formErrors };
};

export default handleFormValidation;
