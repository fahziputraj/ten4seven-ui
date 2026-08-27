Six-digit codes on auth and high-value approval flows.

```jsx
<OtpInput value={code} onValueChange={setCode} invalid={!!error} />
```

- Auto-advances, backspaces to the previous box, and accepts a full pasted code into the first field.
- Boxes are 44×52 — above the 44px touch minimum on purpose, since this is often entered on a phone in a kandang.
