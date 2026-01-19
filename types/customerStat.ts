export interface CustomerStat {
    id: string;
    icon: string;
    label: string;
    number?: string;
    growth?: string;
    growthType?: "up" | "down";
    images?: string[];
  }
  