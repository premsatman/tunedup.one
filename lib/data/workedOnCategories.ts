export const WORKED_ON_CATEGORY_LABELS: Record<string, string> = {
  'brand-identity': 'Brand Identity',
  development: 'Development',
  design: 'Design',
  marketing: 'Marketing',
  strategy: 'Strategy',
  automation: 'Automation',
}

export const getWorkedOnCategoryLabel = (category: string) =>
  WORKED_ON_CATEGORY_LABELS[category] || category
