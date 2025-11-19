import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import productsData from '@/config/products.example.json';

export interface ProductFilters {
  search: string;
  speeds: string[];
  formFactors: string[];
  applications: string[];
  fiberTypes: string[];
  sortBy: string;
}

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  resultCount: number;
}

const ProductFiltersComponent = ({ filters, onFiltersChange, resultCount }: ProductFiltersProps) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const updateFilter = (key: keyof ProductFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'speeds' | 'formFactors' | 'applications' | 'fiberTypes', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      speeds: [],
      formFactors: [],
      applications: [],
      fiberTypes: [],
      sortBy: 'title'
    });
  };

  const getActiveFiltersCount = () => {
    return filters.speeds.length + 
           filters.formFactors.length + 
           filters.applications.length + 
           filters.fiberTypes.length;
  };

  const FilterCheckboxGroup = ({ title, items, filterKey, icon }: {
    title: string;
    items: string[];
    filterKey: 'speeds' | 'formFactors' | 'applications' | 'fiberTypes';
    icon?: React.ReactNode;
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between h-10 bg-white">
          <span className="flex items-center">
            {icon}
            {title}
            {filters[filterKey].length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 min-w-5 text-xs">
                {filters[filterKey].length}
              </Badge>
            )}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 bg-white border shadow-lg z-50" align="start">
        <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">{title}</h4>
            {filters[filterKey].length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateFilter(filterKey, [])}
                className="h-6 px-2 text-xs text-muted-foreground"
              >
                Effacer
              </Button>
            )}
          </div>
          {items.map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={`${filterKey}-${item}`}
                checked={filters[filterKey].includes(item)}
                onCheckedChange={() => toggleArrayFilter(filterKey, item)}
                className="data-[state=checked]:bg-brand data-[state=checked]:border-brand"
              />
              <label
                htmlFor={`${filterKey}-${item}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="bg-white border-b border-border">
      <div className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par référence, nom, application..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {resultCount} produit{resultCount !== 1 ? 's' : ''} trouvé{resultCount !== 1 ? 's' : ''}
            </span>
            
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4 mr-1" />
                Effacer tout
              </Button>
            )}
          </div>
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:flex items-center gap-3 flex-wrap">
          <FilterCheckboxGroup
            title="Débit"
            items={productsData.filters.speeds}
            filterKey="speeds"
            icon={<span className="mr-2 text-xs">⚡</span>}
          />
          
          <FilterCheckboxGroup
            title="Form Factor"
            items={productsData.filters.form_factors}
            filterKey="formFactors"
            icon={<span className="mr-2 text-xs">🔌</span>}
          />
          
          <FilterCheckboxGroup
            title="Application"
            items={productsData.filters.applications}
            filterKey="applications"
            icon={<span className="mr-2 text-xs">📡</span>}
          />
          
          <FilterCheckboxGroup
            title="Type de fibre"
            items={productsData.filters.fiber_types}
            filterKey="fiberTypes"
            icon={<span className="mr-2 text-xs">🔗</span>}
          />

          <div className="ml-auto">
            <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
              <SelectTrigger className="w-48 bg-white">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg z-50">
                <SelectItem value="title">Nom A-Z</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="speed">Débit</SelectItem>
                <SelectItem value="pn">Référence</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 bg-white"
          >
            <Filter className="h-4 w-4" />
            Filtres
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="h-5 min-w-5 text-xs">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>

          <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
            <SelectTrigger className="w-40 bg-white">
              <SelectValue placeholder="Trier" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="title">Nom A-Z</SelectItem>
              <SelectItem value="price-asc">Prix ↗</SelectItem>
              <SelectItem value="price-desc">Prix ↘</SelectItem>
              <SelectItem value="speed">Débit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mobile Filters Panel */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 p-4 bg-muted/30 rounded-lg border"
            >
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-3">
                  <FilterCheckboxGroup
                    title="Débit"
                    items={productsData.filters.speeds}
                    filterKey="speeds"
                    icon={<span className="mr-2 text-xs">⚡</span>}
                  />
                  
                  <FilterCheckboxGroup
                    title="Form Factor"
                    items={productsData.filters.form_factors}
                    filterKey="formFactors"
                    icon={<span className="mr-2 text-xs">🔌</span>}
                  />
                  
                  <FilterCheckboxGroup
                    title="Application"
                    items={productsData.filters.applications}
                    filterKey="applications"
                    icon={<span className="mr-2 text-xs">📡</span>}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters Display */}
        {getActiveFiltersCount() > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.speeds.map(speed => (
              <Badge key={speed} variant="secondary" className="flex items-center gap-1">
                ⚡ {speed}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => toggleArrayFilter('speeds', speed)}
                />
              </Badge>
            ))}
            {filters.formFactors.map(factor => (
              <Badge key={factor} variant="secondary" className="flex items-center gap-1">
                🔌 {factor}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => toggleArrayFilter('formFactors', factor)}
                />
              </Badge>
            ))}
            {filters.applications.map(app => (
              <Badge key={app} variant="secondary" className="flex items-center gap-1">
                📡 {app}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => toggleArrayFilter('applications', app)}
                />
              </Badge>
            ))}
            {filters.fiberTypes.map(fiber => (
              <Badge key={fiber} variant="secondary" className="flex items-center gap-1">
                🔗 {fiber}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => toggleArrayFilter('fiberTypes', fiber)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFiltersComponent;