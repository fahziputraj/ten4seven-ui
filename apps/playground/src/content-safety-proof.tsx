import { useState } from "react";

import {
  ActivityFeed,
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Combobox,
  DataTable,
  DatePicker,
  Drawer,
  DropdownMenu,
  Field,
  FieldGroup,
  FormGrid,
  IconButton,
  Input,
  Modal,
  MultiSelect,
  NativeSelect,
  NavItem,
  Select,
  StatusChip,
  Textarea,
  ThemeScope,
  TimePicker,
  ToggleButton,
  Typography,
  type DataTableColumn,
  type DensityName,
  type ThemeRecipeName,
} from "@ten4seven/ui";

const businessName =
  "PT Agung Abadi Putra Mandiri Unit Operasional Distribusi dan Pengadaan Pakan Wilayah Sumatera Barat";
const agencyName =
  "Dinas Ketahanan Pangan, Pertanian dan Perikanan Pemerintah Kabupaten Kepulauan Mentawai";
const longIdentifier =
  "AAPM20260903DISTRIBUSISUMATERABARATPENGADAANPAKAN0000000000000000000123456789";
const longAction =
  "Tinjau dan konfirmasi seluruh dokumen penerimaan dari unit operasional wilayah Sumatera Barat";

type StressRecord = { id: string; supplier: string; amount: string };

/** Permanent, query-isolated Component Lab fixture. It is never a product route. */
export function ContentSafetyProof() {
  const [recipe, setRecipe] = useState<ThemeRecipeName>("enterprise");
  const [density, setDensity] = useState<DensityName>("default");
  const [appearance, setAppearance] = useState<"light" | "dark">("light");
  const [shape, setShape] = useState("soft");
  const [selected, setSelected] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [owner, setOwner] = useState("aapm");
  const [tags, setTags] = useState(["aapm"]);
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>("09:30");
  const [notice, setNotice] = useState("No local action selected.");
  const options = [
    { label: businessName, value: "aapm", description: agencyName },
    { label: "Unit Padang", value: "padang", description: "Regional team" },
  ];
  const columns: DataTableColumn<StressRecord>[] = [
    { key: "supplier", header: "Supplier / customer", overflow: "wrap" },
    { key: "id", header: "Identifier", overflow: "wrap" },
    { key: "amount", header: "Amount", align: "right", overflow: "nowrap" },
    {
      key: "action",
      header: "Action",
      required: true,
      sticky: "right",
      overflow: "nowrap",
      render: () => (
        <Button
          intent="secondary"
          onClick={() => setDrawerOpen(true)}
          size="sm"
        >
          Inspect record
        </Button>
      ),
    },
  ];

  return (
    <section
      aria-label="Content safety workbench"
      className="content-safety-proof"
    >
      <FormGrid className="content-safety-settings" columns={2}>
        <Field label="Stress recipe" htmlFor="stress-recipe">
          <NativeSelect
            id="stress-recipe"
            onChange={(event) =>
              setRecipe(event.target.value as ThemeRecipeName)
            }
            value={recipe}
          >
            <option value="enterprise">Enterprise</option>
            <option value="product">Product</option>
            <option value="editorial">Editorial</option>
            <option value="commerce">Commerce</option>
          </NativeSelect>
        </Field>
        <Field label="Stress density" htmlFor="stress-density">
          <NativeSelect
            id="stress-density"
            onChange={(event) => setDensity(event.target.value as DensityName)}
            value={density}
          >
            <option value="compact">Compact</option>
            <option value="default">Regular</option>
            <option value="comfortable">Comfortable</option>
            <option value="dense">Dense boundary</option>
          </NativeSelect>
        </Field>
        <Field label="Stress shape" htmlFor="stress-shape">
          <NativeSelect
            id="stress-shape"
            onChange={(event) => setShape(event.target.value)}
            value={shape}
          >
            <option value="sharp">Sharp</option>
            <option value="soft">Soft</option>
            <option value="rounded">Rounded</option>
            <option value="exact">Custom exact 24</option>
          </NativeSelect>
        </Field>
        <Field label="Stress appearance" htmlFor="stress-appearance">
          <NativeSelect
            id="stress-appearance"
            onChange={(event) =>
              setAppearance(event.target.value as "light" | "dark")
            }
            value={appearance}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </NativeSelect>
        </Field>
      </FormGrid>

      <ThemeScope
        className="content-safety-scope"
        data-testid="content-safety-scope"
        overrides={{
          config: {
            radius:
              shape === "exact"
                ? "rounded"
                : (shape as "sharp" | "soft" | "rounded"),
            radiusValue: shape === "exact" ? 24 : undefined,
          },
        }}
        preferences={{ appearance, density, motion: "reduced" }}
        theme={recipe}
      >
        <div className="content-safety-heading" data-t7-rail="reading">
          <Typography as="h2" typeRole="heading-lg">
            Proportion and content safety
          </Typography>
          <Typography as="p" typeRole="body-sm">
            Permanent stress data, isolated from product references. Long names,
            identifiers, action labels and numeric values must preserve content
            and focus clearance.
          </Typography>
        </div>

        <Card data-testid="stress-card">
          <CardHeader>
            <div>
              <CardTitle>{businessName}</CardTitle>
              <CardDescription>{longIdentifier}</CardDescription>
            </div>
            <DropdownMenu
              items={[
                {
                  key: "review",
                  label: longAction,
                  description: agencyName,
                  icon: "edit",
                  shortcut: "Ctrl+R",
                  onSelect: () => setNotice("Long menu action selected."),
                },
                {
                  key: "archive",
                  label: "Archive record",
                  icon: "folder",
                  disabled: true,
                },
              ]}
              label="Stress record actions"
              trigger={<IconButton icon="more" label="Open stress actions" />}
            />
          </CardHeader>
          <CardContent className="content-safety-stack">
            <Typography as="p" typeRole="body-sm">
              {agencyName}
            </Typography>
            <div className="content-safety-signals">
              <StatusChip icon="warning" tone="warning">
                Awaiting documentation
              </StatusChip>
              <Badge data-testid="stress-badge">{businessName}</Badge>
            </div>
            <NavItem
              active={selected}
              data-testid="stress-nav"
              icon="warehouse"
              label={businessName}
              onClick={() => setSelected(!selected)}
            />
            <Breadcrumb
              items={[
                {
                  key: "home",
                  label: "Records",
                  onSelect: () => setNotice("Records selected."),
                },
                { key: "unit", label: agencyName },
              ]}
            />
            <Button
              data-testid="stress-button"
              leadingIcon="check"
              trailingIcon="arrowRight"
              onClick={() => setModalOpen(true)}
            >
              {longAction}
            </Button>
            <Button
              data-testid="stress-cta"
              leadingIcon="check"
              size="lg"
              wrap
              onClick={() => setModalOpen(true)}
            >
              {longAction}
            </Button>
            <div className="content-safety-actions">
              <ToggleButton
                data-testid="stress-toggle"
                pressed={selected}
                onPressedChange={setSelected}
              >
                Select record
              </ToggleButton>
              <Button disabled intent="secondary">
                Unavailable action
              </Button>
              <Button loading intent="secondary">
                Saving documents
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Typography typeRole="caption">{notice}</Typography>
          </CardFooter>
        </Card>

        <div
          className="content-safety-control-families"
          data-testid="stress-size-families"
        >
          {(["sm", "md", "lg"] as const).map((size) => (
            <FieldGroup
              key={size}
              data-t7-control-size={size}
              legend={`${size.toUpperCase()} control family`}
            >
              <div className="content-safety-control-row">
                <Input
                  label={`${size.toUpperCase()} reference`}
                  defaultValue="SO-260903-018"
                  leadingIcon="search"
                />
                <Select
                  label={`${size.toUpperCase()} status`}
                  defaultValue="ready"
                >
                  <option value="ready">Ready for review</option>
                  <option value="held">Held for evidence</option>
                </Select>
                <Button leadingIcon="check" intent="secondary">
                  Confirm
                </Button>
              </div>
            </FieldGroup>
          ))}
        </div>

        <div
          className="content-safety-stack"
          data-t7-rail="form"
          data-testid="stress-form"
        >
          <Typography as="h3" typeRole="heading-md">
            Labels, values and supporting text
          </Typography>
          <Input
            label={agencyName}
            defaultValue={longIdentifier}
            error={`Periksa nomor dokumen penerimaan ${longIdentifier} sebelum menyimpan.`}
          />
          <Combobox
            label="Long owner"
            onValueChange={setOwner}
            options={options}
            value={owner}
          />
          <MultiSelect
            label="Long workstreams"
            onValueChange={setTags}
            options={options}
            values={tags}
          />
          <FormGrid>
            <DatePicker
              label="Review date"
              onValueChange={setDate}
              value={date}
            />
            <TimePicker
              label="Review time"
              onValueChange={(value) => setTime(value ?? "")}
              value={time}
            />
          </FormGrid>
          <Textarea
            label="Long receiving note"
            defaultValue={`${businessName}. ${agencyName}. ${longIdentifier}.`}
          />
        </div>

        <section
          aria-label="Long data and actions"
          className="content-safety-stack"
          data-t7-rail="data"
        >
          <Typography as="h3" typeRole="heading-md">
            Flexible text, numeric and action columns
          </Typography>
          <DataTable
            caption="Content safety records"
            columns={columns}
            responsive="stacked"
            rowKey={(row) => row.id}
            rows={[
              {
                id: longIdentifier,
                supplier: businessName,
                amount: "Rp 9.999.999.999.999,99",
              },
              {
                id: "CAPACITY-260903",
                supplier: agencyName,
                amount: "999.999,99%",
              },
            ]}
          />
          <ActivityFeed
            items={[
              {
                id: "long",
                title: businessName,
                description: longIdentifier,
                meta: agencyName,
                icon: "check",
              },
            ]}
          />
          <DataTable
            caption="Bounded text disclosure"
            data-testid="stress-overflow-table"
            columns={[
              { key: "supplier", header: "Ellipsis", overflow: "ellipsis" },
              { key: "id", header: "Two-line clamp", overflow: "clamp" },
              {
                key: "action",
                header: "Full detail",
                overflow: "nowrap",
                required: true,
                render: () => (
                  <Button
                    intent="secondary"
                    size="sm"
                    onClick={() => setDrawerOpen(true)}
                  >
                    Read full values
                  </Button>
                ),
              },
            ]}
            responsive="stacked"
            rowKey={(row) => row.id}
            rows={[{ id: longIdentifier, supplier: businessName }]}
          />
        </section>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={businessName}
          description={longIdentifier}
        >
          <div className="content-safety-stack">
            <Input label="Decision owner" defaultValue={businessName} />
            <Button onClick={() => setModalOpen(false)}>Confirm review</Button>
          </div>
        </Modal>
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={businessName}
          description={longIdentifier}
        >
          <div className="content-safety-stack">
            <Typography as="p" typeRole="body-sm">
              {agencyName}
            </Typography>
            <Button onClick={() => setDrawerOpen(false)}>Close record</Button>
          </div>
        </Drawer>
      </ThemeScope>
    </section>
  );
}
