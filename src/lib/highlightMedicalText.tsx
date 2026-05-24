import React from 'react';

/**
 * Utility to highlight medical keywords and values in text.
 */

const KEYWORD_STYLES: Record<string, string> = {
  high: 'text-rose-600 font-medium',
  low: 'text-rose-600 font-medium',
  deficient: 'text-rose-600 font-medium',
  critical: 'text-rose-600 font-medium',
  danger: 'text-rose-600 font-medium',
  elevated: 'text-amber-600 font-medium',
  overweight: 'text-amber-600 font-medium',
  borderline: 'text-amber-600 font-medium',
  insufficient: 'text-amber-600 font-medium',
  warning: 'text-amber-600 font-medium',
  normal: 'text-emerald-600 font-medium',
  good: 'text-emerald-600 font-medium',
  stable: 'text-emerald-600 font-medium',
  healthy: 'text-emerald-600 font-medium',
  optimal: 'text-emerald-600 font-medium',
};

const KEYWORD_REGEX_STR = `\\b(?:${Object.keys(KEYWORD_STYLES).join('|')})\\b`;

// Handles complex units like "million/μL", "140/90 mmHg", etc.
const VALUE_REGEX_STR = `\\d{1,3}(?:,\\d{3})*(?:\\.\\d+)?(?:\\s*[/]\\s*\\d+(?:\\.\\d+)?)?\\s*(?:[a-zA-Z/μL%]+\\s*)+`;

/**
 * Normalizes text for matching
 */
const getCleanKey = (str: string) => str.trim().toLowerCase().replace(/[^a-z]/g, '');

/**
 * Internal highlighter that accepts optional inherited context
 */
export function highlightMedicalText(text: string, inheritedContext?: string): { nodes: React.ReactNode, lastKey: string | null } {
  if (!text || typeof text !== 'string') return { nodes: text, lastKey: null };

  const combinedRegex = new RegExp(`(${KEYWORD_REGEX_STR}|${VALUE_REGEX_STR})`, 'gi');
  const parts = text.split(combinedRegex);
  let lastFoundKey: string | null = inheritedContext || null;

  const nodes = parts.map((part, index) => {
    if (!part) return null;
    const cleanKey = getCleanKey(part);

    if (KEYWORD_STYLES[cleanKey]) {
      lastFoundKey = cleanKey;
      return <span key={index} className={KEYWORD_STYLES[cleanKey]}>{part}</span>;
    }

    if (/^\d/.test(part)) {
      let colorClass = 'text-slate-700 font-normal';

      // Look forward in current string
      for (let i = index + 1; i < Math.min(index + 8, parts.length); i++) {
        const nextClean = getCleanKey(parts[i]);
        if (KEYWORD_STYLES[nextClean]) {
          colorClass = KEYWORD_STYLES[nextClean];
          break;
        }
      }

      // Use inherited or backward context if still normal
      if (colorClass.includes('slate') && lastFoundKey && KEYWORD_STYLES[lastFoundKey]) {
        colorClass = KEYWORD_STYLES[lastFoundKey];
      }

      return <span key={index} className={colorClass}>{part}</span>;
    }

    return <span key={index} className="text-slate-700">{part}</span>;
  });

  return { nodes, lastKey: lastFoundKey };
}

/**
 * Fixed: Now maintains context color across <strong>, <em> and string siblings.
 */
export function processMedicalContent(children: React.ReactNode): React.ReactNode {
  let contextKey: string | null = null;
  const childArray = React.Children.toArray(children);

  return childArray.map((child, index) => {
    if (typeof child === 'string') {
      const { nodes, lastKey } = highlightMedicalText(child, contextKey || undefined);
      if (lastKey) contextKey = lastKey;
      return <React.Fragment key={index}>{nodes}</React.Fragment>;
    }

    if (React.isValidElement(child)) {
      const element = child as React.ReactElement<any>;
      const type = element.type;
      if (typeof type === 'string' && ['br', 'img', 'input', 'hr', 'meta', 'link'].includes(type.toLowerCase())) {
        return React.cloneElement(element, { ...element.props, key: index });
      }

      const inner = processMedicalContent(element.props.children);

      // Try to find a keyword in the inner text content to update context
      const textContent = getTextContent(element.props.children);
      const match = textContent.match(new RegExp(KEYWORD_REGEX_STR, 'i'));
      if (match) contextKey = getCleanKey(match[0]);

      return React.cloneElement(element, { ...element.props, key: index, children: inner });
    }

    return child;
  });
}

// Helper to get raw text from nested children
function getTextContent(children: React.ReactNode): string {
  return React.Children.toArray(children)
    .map(child => {
      if (typeof child === 'string' || typeof child === 'number') return child;
      if (React.isValidElement(child)) {
        return getTextContent((child as React.ReactElement<any>).props.children);
      }
      return '';
    })
    .join('');
}
