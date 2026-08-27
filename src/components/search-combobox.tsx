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
import { t } from "../data/translations";

interface Code {
  id: string;
  cat: string;
  link_href: string;
}

interface SearchComboboxProps {
  codes: Code[];
  lang?: string;
}

const TOP_CATEGORY_KEYWORDS = ["Action", "Comedy", "Drama", "Thriller"];

export function SearchCombobox({ codes, lang = "en" }: SearchComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const copy = t(lang);

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
          // role="combobox" prohibits name-from-content, so the visible text
          // below is NOT used as the accessible name. Without aria-label the
          // control announces as an unlabelled combobox (WCAG 4.1.2).
          aria-label={copy.searchLabel}
          aria-expanded={open}
          className="h-14 w-full justify-between px-3 text-left text-base font-normal focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-700"
        >
          <span className="text-gray-700">{copy.searchPlaceholder}</span>
          <ChevronsUpDown className="opacity-50" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        // Radix renders a dialog; without a label it announces as "dialog".
        aria-label={copy.searchLabel}
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command shouldFilter={false} label={copy.searchLabel}>
          <CommandInput
            placeholder={copy.searchPlaceholder}
            aria-label={copy.searchLabel}
            value={search}
            onValueChange={setSearch}
          />
          {/* Result counts are a visual-only cue otherwise: announce them. */}
          <div aria-live="polite" role="status" className="sr-only">
            {search
              ? searchResults.length > 0
                ? copy.results(searchResults.length)
                : copy.noResults
              : ""}
          </div>
          <CommandList>
            <CommandEmpty>{copy.noResults}</CommandEmpty>
            {!search && topSuggestions.length > 0 && (
              <CommandGroup heading={copy.popularHeading}>
                {topSuggestions.map((code) => (
                  <CommandItem
                    key={code.id}
                    value={code.cat}
                    onSelect={() => {
                      window.open(code.link_href, "_blank", "noopener");
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    <span lang="en" dir="ltr">
                      {code.cat}
                    </span>
                    <span className="sr-only"> ({copy.opensNewTab})</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {search && searchResults.length > 0 && (
              <CommandGroup heading={copy.searchResultsHeading}>
                {searchResults.map((code) => (
                  <CommandItem
                    key={code.id}
                    value={code.cat}
                    onSelect={() => {
                      window.open(code.link_href, "_blank", "noopener");
                      setOpen(false);
                      setSearch("");
                    }}
                    className="flex items-center justify-between"
                  >
                    <span>
                      <span lang="en" dir="ltr">
                        {code.cat}
                      </span>
                      <span className="sr-only"> ({copy.opensNewTab})</span>
                    </span>
                    <ExternalLink className="h-4 w-4 opacity-50" aria-hidden="true" />
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
