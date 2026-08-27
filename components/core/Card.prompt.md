Standard content container: 20px radius, 1px border at 80% alpha, level-1 shadow, 24px padding.

```jsx
<Card>
  <CardHeader>
    <CardTitle>Learning progress</CardTitle>
    <CardDescription>Ritme belajar Anda di Academy.</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
</Card>
```

`CardContent` and `CardFooter` have zero top padding — the header owns the gap. For tone-coded or hover-lifting containers use `Surface` instead.
