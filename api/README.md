# Authorization

Token must be present in the header `Authorization` and must contain `Bearer <<Token>>`

## Model

CATEGORY_TASKS:

- name
- priority

---

TASKS:

- title
- categoryId (RELACIONAL)
- description
- relevancy

1 = php
2 = js
3 = node

100 - 40

---

USER:

- name
- last name
- email

---

COMPLETED_TASKS

- taskId
- userId
- status - string

1 - Pedro - 'done'
2 - Pedro - 'ongoing'

1 - Gabriel - 'done'
2 - Gabriel - 'done'
3 - Gabriel - 'done'

---

FORM

- Question
- a, b, c, d

FORM_registered

- answers: { [ id ] }
- userId
