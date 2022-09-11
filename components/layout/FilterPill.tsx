import { FC } from 'react';
import { FilterIcon } from '@heroicons/react/outline';

// TODO: add Pill component with Icon into barbarian style library
export const FilterPill: FC = () => {
  return (
    <div className="flex items-center w-fit px-3 py-1 rounded-full border text-sm text-gray-600">
      <FilterIcon className="h-4 w-4 mr-2"></FilterIcon>
      <span>filters</span>
    </div>
  );
};
