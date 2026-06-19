import { useEffect } from "react";

const BASE = "Dimension Knowledge";

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : `${BASE} — Future Tech, Science & Ideas`;
  }, [title]);
}
