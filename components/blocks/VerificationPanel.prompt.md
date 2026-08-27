# VerificationPanel

Purpose: keep verification in the order required by operational work: context, evidence, checks, notes, then decision.

Use it when a record needs validation before approval, publication, handoff, or completion. Use `ApprovalPanel` when the primary job is a decision; use both when verification is a gate inside a larger approval flow.

```jsx
<VerificationPanel
  context={<RecordSummary recordId="PO-1024" title="Purchase order" status="in-review" />}
  evidence={[{ label: "Lampiran", value: "invoice.pdf", href: "/files/invoice.pdf" }]}
  checks={[{ label: "Total cocok dengan dokumen", state: "pass" }, { label: "Bukti penerimaan", state: "pending" }]}
  onVerify={verify}
  onReject={requestRevision}
/>
```

Evidence and checks are data-driven. The consumer owns permission and persistence; the block supplies consistent hierarchy, status cues, notes, disabled state, and decision actions.
