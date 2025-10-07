import * as React from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/combobox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChevronsUpDown, ExternalLink } from "lucide-react";

interface Code {
  id: string;
  cat: string;
  link_href: string;
}

interface SearchComboboxProps {
  codes: Code[];
  placeholder?: string;
}

const TOP_CATEGORY_KEYWORDS = ["Action", "Comedy", "Drama", "Thriller"];

export function SearchCombobox({ codes, placeholder }: SearchComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const topSuggestions = React.useMemo(() => {
    const suggestions: Code[] = [];

    // Find one category for each keyword
    for (const keyword of TOP_CATEGORY_KEYWORDS) {
      const found = codes.find((code) =>
        code.cat.toLowerCase().includes(keyword.toLowerCase()),
      );
      if (found) {
        suggestions.push(found);
      }
    }

    return suggestions;
  }, [codes]);

  const searchResults = React.useMemo(() => {
    if (!search) return [];

    const searchLower = search.toLowerCase();
    return codes
      .filter((code) => code.cat.toLowerCase().includes(searchLower))
      .slice(0, 50);
  }, [search, codes]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-14 w-full justify-between px-3 text-left text-base font-normal"
        >
          <span className="text-gray">
            {placeholder || "Select TV show or movie genre..."}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder || "Search..."}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No categories found.</CommandEmpty>
            {!search && topSuggestions.length > 0 && (
              <CommandGroup heading="Popular Categories">
                {topSuggestions.map((code) => (
                  <CommandItem
                    key={code.id}
                    value={code.cat}
                    onSelect={() => {
                      window.open(code.link_href, "_blank");
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    {code.cat}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {search && searchResults.length > 0 && (
              <CommandGroup heading="Search Results">
                {searchResults.map((code) => (
                  <CommandItem
                    key={code.id}
                    value={code.cat}
                    onSelect={() => {
                      window.open(code.link_href, "_blank");
                      setOpen(false);
                      setSearch("");
                    }}
                    className="flex items-center justify-between"
                  >
                    {code.cat} <ExternalLink className="h-4 w-4 opacity-50" />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
