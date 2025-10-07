#!/usr/bin/env python3
"""
Script to clean up Netflix category codes by removing 404 entries.
Checks each link_href in codes.json and removes entries that return 404.
"""

import json
import requests
import time
from pathlib import Path

# Configuration
CODES_FILE = Path(__file__).parent / "src" / "data" / "codes.json"
REQUEST_TIMEOUT = 10  # seconds
DELAY_BETWEEN_REQUESTS = 0.5  # seconds to avoid rate limiting

def load_codes():
    """Load codes from JSON file."""
    with open(CODES_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_codes(codes):
    """Save codes to JSON file."""
    with open(CODES_FILE, 'w', encoding='utf-8') as f:
        json.dump(codes, f, indent=2, ensure_ascii=False)

def check_url(url):
    """
    Check if a URL returns 404.
    Returns True if URL is valid (not 404), False otherwise.
    """
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=REQUEST_TIMEOUT, allow_redirects=True)
        return response.status_code != 404
    except requests.exceptions.RequestException as e:
        print(f"  ⚠️  Error checking {url}: {e}")
        # If we can't check, keep the entry (safer to keep than delete)
        return True

def clean_categories():
    """Main function to clean categories."""
    print("🔍 Loading categories from codes.json...")
    codes = load_codes()
    initial_count = len(codes)
    print(f"📊 Found {initial_count} categories to check\n")

    valid_codes = []
    removed_codes = []

    for i, code in enumerate(codes, 1):
        cat = code.get('cat', 'Unknown')
        link_href = code.get('link-href', '').strip()

        print(f"[{i}/{initial_count}] Checking: {cat}")
        print(f"  URL: {link_href}")

        # Skip entries with empty or invalid URLs
        if not link_href or not link_href.startswith('http'):
            removed_codes.append(code)
            print("  ❌ Invalid/Empty URL - Removing")
        elif check_url(link_href):
            valid_codes.append(code)
            print("  ✅ Valid")
        else:
            removed_codes.append(code)
            print("  ❌ 404 - Removing")

        # Add delay to avoid rate limiting
        if i < initial_count:
            time.sleep(DELAY_BETWEEN_REQUESTS)

        print()

    # Save cleaned data
    print(f"\n{'='*60}")
    print(f"📊 SUMMARY")
    print(f"{'='*60}")
    print(f"Total categories checked: {initial_count}")
    print(f"❌ Deleted (404):         {len(removed_codes)}")
    print(f"✅ Remaining valid:       {len(valid_codes)}")
    print(f"{'='*60}\n")

    if removed_codes:
        print("Removed categories:")
        for code in removed_codes:
            print(f"  - {code.get('cat', 'Unknown')} ({code.get('link-href', '')})")

        print(f"\n💾 Saving cleaned data to {CODES_FILE}...")
        save_codes(valid_codes)
        print("✅ Done! Categories cleaned successfully.")
    else:
        print("🎉 All categories are valid! No changes needed.")

if __name__ == "__main__":
    try:
        clean_categories()
    except KeyboardInterrupt:
        print("\n\n⚠️  Script interrupted by user")
    except Exception as e:
        print(f"\n\n❌ Error: {e}")
