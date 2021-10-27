import { Request } from 'express';

function handleMissingFields(fields: string[], body: Request['body']) {
  const fieldsMissing = fields.filter((field) => {
    const isFieldIncluded = Object.keys(body).includes(field);

    return !isFieldIncluded;
  });

  if (fieldsMissing.length) {
    return { isMissingFields: true, fieldsMissing };
  }

  return { isMissingFields: false };
}

export { handleMissingFields };
