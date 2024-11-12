'use client';

import { insertPortfolio } from '@/lib/db/queries';
import React, { useState } from 'react';

export default function AddPortfolio({ disabled = false } : { disabled: boolean }) {
  const [portfolioName, setPortfolioName] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPortfolio = {
      name: portfolioName,
      description: null,
      fkCompanies: 1, // change to current users company
    };
    insertPortfolio(newPortfolio);
  };

  return (
    <div className="mt-6">
      <form onSubmit={onSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="newPortfolio" className="block text-gray-700 font-semibold mb-2">
          New portfolio*
        </label>
        <div className="flex">
          <div>
            <input
              type="text"
              id="newPortfolio"
              placeholder="Portfolio name"
              className="w-full border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-green-500"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
            />

          </div>
          <button
            type="submit"
            disabled={disabled}
            className={`bg-greenlight text-black py-2 px-8 mx-2 rounded-lg shadow-md mt-auto ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Add Portfolio
          </button>

        </div>
      </form>
    </div>
  );
}
