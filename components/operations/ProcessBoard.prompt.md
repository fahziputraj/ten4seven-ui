# ProcessBoard

Use ProcessBoard as a token-led process/kanban surface for work queues, approval stages, course publishing, content operations or farm workflows. It owns the column/card composition and responsive behavior; the application owns persistence and business rules.

Example:

    <ProcessBoard
      columns={[
        { id: "todo", title: "Perlu ditangani", icon: "pending", tone: "orange" },
        { id: "review", title: "Dalam review", icon: "search", tone: "blue" },
        { id: "done", title: "Selesai", icon: "approve", tone: "green" },
      ]}
      items={[
        { id: "1", columnId: "review", title: "Validasi laporan Kandang 2", status: "in-review", priority: "high", assignee: "Dewi Lestari" },
      ]}
      onItemClick={(item) => openRecord(item.id)}
    />

Use allowMove with onMove only when the product has an explicit persistence path. The default mobile mode stacks columns to prevent page overflow; use mobile scroll for a deliberate horizontal kanban board inside its own scroll region.
