export const handleClassValidation = (
  validation: unknown,
  dirtyFields: Record<string, unknown>
) => {
  const hasChangedFields = Object.keys(dirtyFields).length;

  return validation ? 'has-error' : hasChangedFields ? 'is-valid' : '';
};
