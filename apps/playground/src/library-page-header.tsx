import type { ReactNode } from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import { PageHeader } from "@ten4seven/ui";

export function LibraryPageHeader({
  actions,
  children,
  className,
  count,
  description,
  icon,
  overline,
  title,
}: {
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  count?: ReactNode;
  description?: ReactNode;
  icon: IconName;
  overline: ReactNode;
  title: ReactNode;
}) {
  return (
    <PageHeader
      actions={actions}
      className={["library-page-header", className].filter(Boolean).join(" ")}
      description={description}
      meta={
        count ? <span className="library-page-meta">{count}</span> : undefined
      }
      overline={
        <span className="library-page-overline">
          <span aria-hidden="true" className="library-page-icon">
            <T7Icon name={icon} size={16} />
          </span>
          {overline}
        </span>
      }
      title={title}
    >
      {children}
    </PageHeader>
  );
}
