import { useMemo } from 'react'
import useThemeStore from '../store/useThemeStore'
import { getTranslations, type Translations } from '../utils/translations'

export function useTranslation(): Translations {
  const { language } = useThemeStore()
  
  return useMemo(() => getTranslations(language), [language])
}
