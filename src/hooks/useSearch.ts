import { useMemo, useState } from "react";

interface Code {
  id: string;
  cat: string;
  link_href: string;
}

// Simple but fast search using normalized strings and early exits
export function useSearch(codes: Code[]) {
  const [searchTerm, setSearchTerm] = useState("");

  // Create normalized search index for O(1) lookups
  const searchIndex = useMemo(() => {
    return codes.map((code) => ({
      code,
      normalized: code.cat.toLowerCase().trim(),
    }));
  }, [codes]);

  // Efficient filtering with early exits
  const filteredCodes = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) {
      return codes;
    }

    const normalizedSearch = searchTerm.toLowerCase().trim();
    const results: Code[] = [];

    // Early exit after finding reasonable number of matches for performance
    for (let i = 0; i < searchIndex.length && results.length < 100; i++) {
      if (searchIndex[i].normalized.includes(normalizedSearch)) {
        results.push(searchIndex[i].code);
      }
    }

    return results;
  }, [searchTerm, searchIndex, codes]);

  return {
    searchTerm,
    setSearchTerm,
    filteredCodes,
    hasResults: filteredCodes.length > 0,
  };
}
