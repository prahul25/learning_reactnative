import React, {createContext, useContext, useState, useCallback} from 'react';
import {searchSongs, SearchResult} from '../utils/api';

interface SearchContextType {
  query: string;
  results: SearchResult[];
  loading: boolean;
  setQuery: (text: string) => void;
  search: () => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({children}: {children: React.ReactNode}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const data = await searchSongs(query);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <SearchContext.Provider
      value={{query, results, loading, setQuery, search}}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
