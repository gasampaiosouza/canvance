const handleFormValidation = (formData: QuestionFormProps) => {
  const { label, answers, category, type } = formData;

  let isValid = true;
  let formErrors = {} as QuestionFormProps;

  if (!label?.length) {
    const message = 'O título é obrigatório';
    formErrors.label = message;

    isValid = false;
  }

  if (type == 'multiple' && !answers?.length) {
    const message = 'As respostas são obrigatórias para perguntas de múltipla escolha';
    // @ts-ignore
    formErrors.answers = message;

    isValid = false;
  }

  if (!category?.length) {
    const message = 'A categoria é obrigatória';
    formErrors.category = message;

    isValid = false;
  }

  return { isValid, formErrors };
};

export default handleFormValidation;
