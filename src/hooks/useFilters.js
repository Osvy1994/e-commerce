import { useContext } from 'react'
import { FiltersContext } from '../context/filtersContext'

export const useFilters = () => {
  const { filters, setFilters } = useContext(FiltersContext)

  const updateCategory = newCategory => {
    setFilters({ ...filters, category: newCategory })
  }
  const updateSearch = searchParam => {
    setFilters({ ...filters, search: searchParam })
  }

  const updateMaxPrice = newMaxPrice => {
    setFilters({ ...filters, maxPrice: newMaxPrice })
  }

  return { updateCategory, updateMaxPrice, updateSearch, filters }
}
