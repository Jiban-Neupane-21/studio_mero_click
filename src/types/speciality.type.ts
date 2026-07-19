import type { ElementType } from "react";

export interface SpecialityItem {
  id: string | number;
  iconUrl?: string;
  iconComponent?: ElementType;
  altText: string;
  title: string;
  description?: string;
}
