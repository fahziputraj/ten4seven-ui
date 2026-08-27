Choose a surface treatment rather than hand-rolling background + border + shadow.

```jsx
<Surface padding={4}>Resting card</Surface>
<Surface variant="muted" padding={4}>Inset summary strip</Surface>
<Surface tone="orange" padding={5}>Needs attention</Surface>
<Surface variant="interactive" padding={5} as="a" href="#">Hover lifts 2px</Surface>
```

`interactive` is the only variant that moves: 2px lift + green border + level-1 shadow over 200ms `--ease-out`. Resting cards never carry more than one shadow.
