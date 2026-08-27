# AAPM UI architecture

## Composition

Use the general shell for product-neutral structure:

```jsx
<AppShell
  sidebar={<Sidebar brand={<AcademyLogo />} sections={sections} activeKey="overview" />}
  header={<Topbar overline="Ruang kerja" title="Ringkasan" actions={<HeaderActions />} />}
  mobileNav={<BottomNav items={mobileItems} value={route} centerKey="appi" />}
>
  <PageContainer>
    <PageHeader title="Ringkasan" description="Data yang perlu ditindaklanjuti hari ini." />
    <DashboardGrid>...</DashboardGrid>
  </PageContainer>
</AppShell>
```

The shell owns viewport geometry and responsive behavior. A page owns its route title, data and actions. A block owns composition inside a page. A primitive owns one interaction or visual role.

## Surface hierarchy

Start with the white canvas. Use `DashboardPanel` / `Surface` for meaningful groups, not every icon or line of text. Prefer a clear border and a small elevation over a decorative gradient. Category color belongs to a tint, status or chart role and must remain readable in both themes.

## Icon contract

All application icons go through `Icon` and the semantic `IconRegistry`. The registry is the Iconify boundary; feature code should not import provider strings directly. Pair an icon with a label or accessible title when the action would otherwise be ambiguous.

## Feedback contract

Use `ToastProvider` for transient outcomes and `ConfirmDialog` for destructive actions. Do not use `window.alert`, `window.confirm` or browser prompts in a product built on AAPM UI.
