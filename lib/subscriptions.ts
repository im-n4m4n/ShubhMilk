import type { Product } from "./products";

export type Frequency = "daily" | "alternate" | "weekdays" | "weekly";

export type Slot = "am" | "pm";

export interface FrequencyOption {
  key: Frequency;
  label: string;
  /** deliveries per month, used for the live monthly total */
  perMonth: number;
}

export const frequencies: FrequencyOption[] = [
  { key: "daily", label: "Daily", perMonth: 30 },
  { key: "alternate", label: "Alternate Days", perMonth: 15 },
  { key: "weekdays", label: "Weekdays Only", perMonth: 22 },
  { key: "weekly", label: "Weekly", perMonth: 4 },
];

export interface SlotOption {
  key: Slot;
  label: string;
  window: string;
}

export const slots: SlotOption[] = [
  { key: "am", label: "Before Sunrise", window: "5:30 – 7:30 AM" },
  { key: "pm", label: "Evening", window: "6:00 – 8:00 PM" },
];

/** Simple deterministic pseudo-serviceability: even-sum pincodes are "served". */
export const isServiceable = (pincode: string): boolean => {
  const digits = pincode.replace(/\D/g, "");
  if (digits.length !== 6) return false;
  const sum = digits.split("").reduce((acc, d) => acc + Number(d), 0);
  return sum % 2 === 0;
};

export interface SubscriptionLine {
  productId: string;
  qty: number;
}

export interface SubscriptionDraft {
  pincode: string;
  lines: SubscriptionLine[];
  frequency: Frequency;
  slot: Slot;
}

export const monthlyTotal = (
  lines: SubscriptionLine[],
  frequency: Frequency,
  productOf: (id: string) => Product | undefined,
): number => {
  const perMonth = frequencies.find((f) => f.key === frequency)?.perMonth ?? 0;
  return lines.reduce((acc, l) => {
    const prod = productOf(l.productId);
    return acc + (prod ? prod.subscriptionPrice * l.qty : 0);
  }, 0) * perMonth;
};
