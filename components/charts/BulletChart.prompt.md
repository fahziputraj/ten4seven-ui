Variance against a target: production vs standard, realisation vs budget, collection vs plan.

```jsx
<BulletChart label="Hen-day production" valueLabel="91,8% / 90,0%" value={91.8} target={90} max={100} />
<BulletChart label="Realisasi anggaran pakan" valueLabel="Rp 482,6 jt / Rp 520,0 jt" value={482.6} target={520} />
```

- Leave `tone` unset so the colour reports the verdict: green at/above target, amber within 10%, red below.
- Use instead of `Progress` whenever a target exists. `Progress` is for completion with no benchmark.
