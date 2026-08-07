import type { ElementType } from "react";

export interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: ElementType;
  description?: string;
}
