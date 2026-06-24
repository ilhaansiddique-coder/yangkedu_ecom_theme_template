import {
  BadgePercent,
  Zap,
  Apple,
  Shirt,
  Sofa,
  Smartphone,
  Sparkles,
  Baby,
  Dumbbell,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

/** Maps a category id to its Lucide icon (used by the home grid + category rail). */
export const categoryIcons: Record<string, LucideIcon> = {
  subsidy: BadgePercent,
  flash: Zap,
  food: Apple,
  apparel: Shirt,
  home: Sofa,
  digital: Smartphone,
  beauty: Sparkles,
  baby: Baby,
  sports: Dumbbell,
  more: LayoutGrid,
};
