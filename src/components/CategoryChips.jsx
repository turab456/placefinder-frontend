// src/components/CategoryChips.tsx
import React from 'react';

const categories = [
    'Cafes', 'Parks', 'Events', 'Restaurants',
    'Shopping', 'Nightlife', 'Museums', 'Temples'
];

const CategoryChips = () => {
    return (
        <div className="w-full md:flex md:justify-center overflow-x-auto whitespace-nowrap px-4 py-2">
            <div className="inline-flex space-x-3">
                {categories.map((category) => (
                    <button
                        key={category}
                        className="px-4 py-2 bg-violet-100 text-violet-800 rounded-full text-sm font-medium hover:bg-violet-200 transition"
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>

  );
};

export default CategoryChips;
