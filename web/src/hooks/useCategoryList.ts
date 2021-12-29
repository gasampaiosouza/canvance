import { CategoriesContext } from 'contexts/CategoryContext';
import { useContextSelector as ctxSelector } from 'use-context-selector';

export function useCategoryList() {
  const allCategories = ctxSelector(CategoriesContext, (c) => c.allCategories);
  const mutateCategories = ctxSelector(CategoriesContext, (c) => c.mutateCategories);

  return {
    allCategories,
    mutateCategories,
  };
}
