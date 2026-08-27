# MilestoneTimeline

Use MilestoneTimeline for a sequence of operational checkpoints: onboarding, procurement, production cycles, approvals, delivery or course progression.

Example:

    <MilestoneTimeline
      currentId="verify"
      milestones={[
        { id: "draft", label: "Draft", description: "Data awal disiapkan", state: "complete" },
        { id: "verify", label: "Verifikasi", description: "Periksa bukti dan angka", state: "current", due: "Hari ini" },
        { id: "approve", label: "Persetujuan", description: "Menunggu penanggung jawab" },
      ]}
    />

States are complete, current, upcoming, blocked, and skipped; aliases completed, active, in-progress, pending, and next are accepted. Use orientation horizontal only when the labels remain short; the component changes to a vertical composition at the mobile breakpoint. Every current state has a text label in addition to color and glyph.
