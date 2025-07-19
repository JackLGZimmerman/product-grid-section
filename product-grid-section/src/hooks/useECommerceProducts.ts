import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  constants / helpers                                               */
/* ------------------------------------------------------------------ */

const BASE_URL = "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products";

interface Parameters {
  page?: number;
  per_page?: number;
  collection?: string[];
  sort?: "created" | "rating" | "popularity" | "price";
  direction?: "asc" | "desc";
}

interface ECPLData<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/* ------------------------------------------------------------------ */
/*  Hook                                                              */
/* ------------------------------------------------------------------ */

/**
 * Generic fetch hook for Great Frontend’s product API
 *
 * @param base       – endpoint (rarely changes; defaults to BASE_URL)
 * @param params     – query‑string options
 * @param transform  – optional (raw → view‑model) mapper
 */
export function useECommerceProducts<Raw, Out = Raw>(
  params: Parameters,
  transform?: (raw: Raw) => Out,
  base: string = BASE_URL
): ECPLData<Out> {
  /* ---------------- state ---------------- */
  const [data, setData] = useState<Out | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /* ---------------- memo: stable URL ---------------- */
  const url = useMemo(() => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (Array.isArray(v)) v.forEach((x) => sp.append(k, x));
      else if (v != null) sp.append(k, String(v));
    });
    return `${base}?${sp.toString()}`;
    // stringify params → stable dependency
  }, [base, JSON.stringify(params)]);

  /* ---------------- effect: fetch ---------------- */
  useEffect(() => {
    const abort = new AbortController(); // nicer than a boolean flag
    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url, { signal: abort.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const raw = (await res.json()) as Raw;
        const out = transform ? transform(raw) : (raw as unknown as Out);
        if (!abort.signal.aborted) setData(out);
      } catch (err) {
        if (!abort.signal.aborted) setError(err as Error);
      } finally {
        if (!abort.signal.aborted) setLoading(false);
      }
    };

    run();
    return () => abort.abort(); // cancel in‑flight if url/comp changes
  }, [url, transform]);

  return { data, loading, error };
}

/* ------------------------------------------------------------------ */
/*  Usage example                                                     */
/* ------------------------------------------------------------------ */
/*
  const { data, loading, error } = useECommerceProducts<ApiResponse>(
    { page: 1, collection: ["latest"] },
    (raw) => raw.data.map(mapToCard)   // ⇠ optional transform
  );
*/
