import { useEffect } from 'react';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} · Let Them Eat Noodles`;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
