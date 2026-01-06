interface SubscriptionAuditTable {
  names: string[]; // Subscription names (one per row)
  monthlyCosts: number[]; // Monthly cost per subscription
  lastIncreaseBadges: string[]; // Preformatted badge text, e.g., "↑12% on 2025-01-05"
  usageEstimates: Array<"low" | "medium" | "high">; // Estimated usage level
  cancelSavingsMonthly: number[]; // Estimated monthly savings if canceled
}

interface PriceChangeTimeline {
  dates: string[]; // ISO timestamps for each price change point
  prices: number[]; // Price at each corresponding date (same length as dates)
  reasons?: string[]; // Optional reasons for each change (aligned by index)
  currency: string; // Currency code, e.g., "USD"
  label?: string; // Subscription name or caption for display
}

interface SavingsCalculatorPopover {
  name: string; // Subscription name (display only)
  monthlyCost: number; // Current monthly cost
  period: "1m" | "3m" | "12m"; // Displayed period for savings
  projectedSavings: number; // Calculated savings for the period
  nextBillingDate?: string; // Optional ISO date string
}

interface AuditSummaryBar {
  totalMonthlySpend: number; // Total current monthly subscription spend
  subscriptionCount: number; // Count of active subscriptions
  potentialSavingsMonthly: number; // Estimated monthly savings from low-usage/duplicates
  increasesCount: number; // Number of recent price increases detected
  duplicatesCount: number; // Number of duplicate subscriptions found
}

interface AuditFilterBar {
  query: string; // Search text to display
  increasedOnly: boolean; // Showing only items with recent price increases
  duplicatesOnly: boolean; // Showing only suspected duplicate subscriptions
  usageLevel?: "low" | "medium" | "high"; // Displayed usage filter, if applied
  costRangeLabel?: string; // Read-only label for cost range (e.g., "$5–$15/month")
}

interface DuplicateSuggestionList {
  title?: string; // Panel heading (display only)
  groupSummaries: string[]; // Summaries per suspected duplicate group (e.g., "Spotify vs Spotify Family — provider: spotify.com — $9.99/$15.99")
  confidenceScores?: number[]; // Parallel array of confidence percentages (0–100)
  savingsEstimateMonthly?: number; // Estimated monthly savings if duplicates are resolved
  lastUpdated?: string; // ISO timestamp when suggestions were generated
}