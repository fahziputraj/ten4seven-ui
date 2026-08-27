/* Public source entrypoint for AAPM UI. Browser kits may continue using the
   legacy _ds_bundle.js; new React products can consume this tree-shakable API. */
export { AppShell } from "./components/layout/AppShell.jsx";
export { Sidebar } from "./components/layout/Sidebar.jsx";
export { Topbar } from "./components/layout/Topbar.jsx";
export { PageContainer } from "./components/layout/PageContainer.jsx";
export { BottomNav } from "./components/layout/BottomNav.jsx";

export { Accordion } from "./components/core/Accordion.jsx";
export { Badge, badgeVariantSx } from "./components/core/Badge.jsx";
export { Button } from "./components/core/Button.jsx";
export { ButtonGroup } from "./components/core/ButtonGroup.jsx";
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./components/core/Card.jsx";
export { Chip } from "./components/core/Chip.jsx";
export { Divider } from "./components/core/Divider.jsx";
export { ensureIconify, Icon, IconNames, IconRegistry } from "./components/core/Icon.jsx";
export { IconButton } from "./components/core/IconButton.jsx";
export { IconTile, iconTileToneSx } from "./components/core/IconTile.jsx";
export { Progress } from "./components/core/Progress.jsx";
export { Spinner } from "./components/core/Spinner.jsx";
export { SplitButton } from "./components/core/SplitButton.jsx";
export { Stat } from "./components/core/Stat.jsx";
export { Surface, surfaceToneSx, surfaceVariantSx } from "./components/core/Surface.jsx";

export { DashboardGrid, DashboardPanel } from "./components/blocks/DashboardGrid.jsx";
export { PageHeader } from "./components/blocks/PageHeader.jsx";
export { FilterToolbar } from "./components/blocks/FilterToolbar.jsx";
export { KPICluster } from "./components/blocks/KPICluster.jsx";
export { RecordSummary } from "./components/blocks/RecordSummary.jsx";
export { FormSection } from "./components/blocks/FormSection.jsx";
export { DataTableToolbar } from "./components/blocks/DataTableToolbar.jsx";
export { DetailSidebar } from "./components/blocks/DetailSidebar.jsx";
export { ExceptionCard } from "./components/blocks/ExceptionCard.jsx";
export { TrendCard } from "./components/blocks/TrendCard.jsx";
export { ApprovalPanel } from "./components/blocks/ApprovalPanel.jsx";
export { TransactionDetailGrid } from "./components/blocks/TransactionDetailGrid.jsx";
export { VerificationPanel } from "./components/blocks/VerificationPanel.jsx";
export { BulkActionBar } from "./components/blocks/BulkActionBar.jsx";
export { ActionFooter } from "./components/blocks/ActionFooter.jsx";

export { MilestoneTimeline, milestoneStateMap } from "./components/operations/MilestoneTimeline.jsx";
export { ProcessBoard } from "./components/operations/ProcessBoard.jsx";

export { ActivityFeed } from "./components/data/ActivityFeed.jsx";
export { AuditTimeline } from "./components/data/AuditTimeline.jsx";
export { Avatar } from "./components/data/Avatar.jsx";
export { DataTable } from "./components/data/DataTable.jsx";
export { KeyValueList } from "./components/data/KeyValueList.jsx";
export { MetricCard } from "./components/data/MetricCard.jsx";
export { ProgressRing } from "./components/data/ProgressRing.jsx";
export { Skeleton } from "./components/data/Skeleton.jsx";
export { StatusChip, statusMap } from "./components/data/StatusChip.jsx";

export { Alert } from "./components/feedback/Alert.jsx";
export { ConfirmDialog } from "./components/feedback/ConfirmDialog.jsx";
export { EmptyState } from "./components/feedback/EmptyState.jsx";
export { StateView } from "./components/feedback/StateView.jsx";
export { PermissionGate } from "./components/feedback/PermissionGate.jsx";
export { Toast } from "./components/feedback/Toast.jsx";
export { ToastProvider, ToastViewport, useToast } from "./components/feedback/ToastProvider.jsx";

export { BarChart } from "./components/charts/BarChart.jsx";
export { BulletChart } from "./components/charts/BulletChart.jsx";
export { DonutChart } from "./components/charts/DonutChart.jsx";
export { Heatmap } from "./components/charts/Heatmap.jsx";
export { LineChart } from "./components/charts/LineChart.jsx";
export { Sparkline } from "./components/charts/Sparkline.jsx";
export { TrendIndicator } from "./components/charts/TrendIndicator.jsx";

export { Checkbox } from "./components/forms/Checkbox.jsx";
export { Combobox } from "./components/forms/Combobox.jsx";
export { CurrencyInput } from "./components/forms/CurrencyInput.jsx";
export { DatePicker } from "./components/forms/DatePicker.jsx";
export { DateRangePicker, datePresets } from "./components/forms/DateRangePicker.jsx";
export { DateTimePicker } from "./components/forms/DateTimePicker.jsx";
export { FileUpload } from "./components/forms/FileUpload.jsx";
export { FormField } from "./components/forms/FormField.jsx";
export { Input } from "./components/forms/Input.jsx";
export { Label } from "./components/forms/Label.jsx";
export { MultiSelect } from "./components/forms/MultiSelect.jsx";
export { NumberInput } from "./components/forms/NumberInput.jsx";
export { OtpInput } from "./components/forms/OtpInput.jsx";
export { PercentInput } from "./components/forms/PercentInput.jsx";
export { Radio } from "./components/forms/Radio.jsx";
export { SearchInput } from "./components/forms/SearchInput.jsx";
export { Select } from "./components/forms/Select.jsx";
export { Switch } from "./components/forms/Switch.jsx";
export { Textarea } from "./components/forms/Textarea.jsx";
export { TimePicker } from "./components/forms/TimePicker.jsx";

export { Breadcrumb } from "./components/navigation/Breadcrumb.jsx";
export { CommandMenu } from "./components/navigation/CommandMenu.jsx";
export { NavItem } from "./components/navigation/NavItem.jsx";
export { Pagination } from "./components/navigation/Pagination.jsx";
export { Stepper } from "./components/navigation/Stepper.jsx";
export { Tabs } from "./components/navigation/Tabs.jsx";

export { Drawer } from "./components/overlay/Drawer.jsx";
export { Modal } from "./components/overlay/Modal.jsx";
export { Popover, PopoverItem } from "./components/overlay/Popover.jsx";
export { Tooltip } from "./components/overlay/Tooltip.jsx";

export { clamp, cx, formatCurrencyId, formatDateId, formatNumberId, formatPercentId } from "./utils/formatters.js";
