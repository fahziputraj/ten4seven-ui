Every page family must handle loading, empty, no-result, error, offline, timeout, partial, permission and maintenance. This is that panel.

```jsx
{isLoading ? <StateView state="loading" title="Memuat dashboard belajar..." />
 : isError ? <StateView state="error" title="Dashboard belum dapat memuat data"
     description="Progress dan roadmap belum berhasil diambil. Coba lagi untuk melanjutkan sesi belajar Anda." onRetry={retry} />
 : <Content />}
```

- `loading` renders geometry-matched skeletons with an `sr-only` Indonesian status label; it never shows a centred spinner.
- `permission` must explain the restriction — an unexplained disabled state is the thing this system forbids.
- `partial` keeps the data visible above it; it caveats, it does not replace.
- For a whole blank page with an illustration, use `EmptyState` instead.
