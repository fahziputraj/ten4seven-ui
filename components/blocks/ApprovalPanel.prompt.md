Approval and verification pages. Also serves the verification pattern — same block, checks describe evidence instead of rules.

```jsx
<ApprovalPanel
  description="Periksa kelengkapan dokumen sebelum menyetujui."
  checks={[
    { state: "pass", label: "Nilai invoice sesuai PO", detail: "Selisih Rp 0" },
    { state: "warn", label: "Surat jalan discan sebagian", detail: "2 dari 3 lampiran" },
    { state: "fail", label: "Faktur pajak belum diunggah" },
  ]}
  noteValue={note} onNoteChange={setNote}
  onApprove={approve} onRevise={revise} onReject={reject} />
```

- Reject sits far left, approve far right — destructive and confirming actions never sit adjacent.
- Rejecting or requesting revision without a note must be blocked in the calling code; the placeholder says so.
- When the user lacks permission, pass `disabled` **and** `disabledReason`.
