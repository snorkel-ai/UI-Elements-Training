interface InventoryInsuranceOverview {
  currency: string; // Currency code (e.g., "USD")
  totalReplacementCost: number; // Sum of all item replacement costs
  insuredAmount: number; // Current total insured amount
  riskLevel: "low" | "moderate" | "high"; // Overall risk rating
  underinsuredCategories?: string[]; // Category names flagged as underinsured
}

interface CategoryValuePieChart {
  categoryNames: string[]; // Category labels in display order
  totalValues: number[]; // Total replacement value per category (same order as categoryNames)
  insuredValues: number[]; // Insured value per category (same order as categoryNames)
  currency: string; // Currency code (e.g., "USD", "EUR")
  highlightedIndex?: number; // Optional index of a category to visually emphasize
}

interface HighValueItemTable {
  lines: string[]; // Preformatted rows: "Name | Category | Replacement Cost | Insured | Gap | Underinsured"
  currency: string; // ISO currency code (e.g., "USD")
  sortBy?: "replacementCost" | "gap"; // Display-only current sort field
  showUnderinsuredOnly?: boolean; // Display-only filter state
  generatedAt?: string; // Optional ISO timestamp for when the table snapshot was created
}

interface RiskRatingScorecard {
  overallScore: number; // 0–100 overall risk score
  riskLevel: "low" | "medium" | "high"; // Overall risk level
  driverLabels: string[]; // Names of key drivers (display only)
  driverImpacts: ("low" | "medium" | "high")[]; // Impact per driver, index-aligned with driverLabels
  scoringMethodNote?: string; // Optional read-only description of scoring method
}

interface CoverageEstimateCards {
  labels: string[]; // Display names for each estimate (e.g., "Dwelling", "Contents", or category name)
  categories: ("dwelling" | "contents" | "category")[]; // Type for each estimate
  suggestedLimits: number[]; // Recommended coverage amounts
  shortfalls: number[]; // Estimated underinsured amounts
  currency: string; // Currency code (e.g., "USD", "EUR")
}