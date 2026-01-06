interface ChoreRotationBoard {
  weekStartDate: string; // ISO date string for the start of the week
  matrix: string[]; // Preformatted rows representing the weekly chore matrix by person
  rulesSummary: string; // Human-readable summary of rotation rules
  fairnessScore: number; // Overall fairness/load balance score
  upcomingHighlights: string[]; // Preformatted upcoming assignment highlights
}

interface ChoreMatrix {
  // Label for the displayed week (e.g., "Week of 2025-01-05")
  period: string;

  // ISO date strings for each day shown (columns)
  weekDates: string[];

  // Roommate display names (rows)
  roommates: string[];

  // Flattened cell data: "YYYY-MM-DD|Roommate Name|Chore Name|assigned|effort=2"
  // status values example: assigned | done | missed
  assignments: string[];

  // Optional fairness/load balance indicator (0-100)
  fairnessScore?: number;
}

interface RotationRulesPanel {
  strategy: "round_robin" | "weighted"; // Displayed assignment strategy
  maxConsecutive: number; // Max consecutive weeks on same chore
  lockInDays: number; // Days before week start when assignments are locked
  effortBalanceTarget: number; // Target effort balance (e.g., 0-100)
  effectiveWeekStart: string; // ISO date string for when rules take effect
}

interface FairnessIndicator {
  score: number; // Overall fairness score (0-100)
  efforts: number[]; // Per-person weekly effort values (aligned to a known roommate order)
  deltasFromAvg: number[]; // Per-person (effort - average) values, same order as efforts
  targetEffort: number; // Target effort per person for the week
  trend: "up" | "down" | "flat"; // Fairness trend compared to the previous period
}

interface UpcomingAssignmentsList {
  entries: string[]; // Pre-formatted lines like "2025-12-22 • Alex — Trash (due soon) ★"
  periodLabel?: string; // Display label for the time window, e.g., "Next 7 days"
  maxItems?: number; // Optional cap on how many entries to show
  iconUrl?: string; // Decorative icon for the list (non-interactive)
  updatedAt?: string; // ISO timestamp of when this list was generated
}

interface AssignmentEditorModal {
  isVisible: boolean; // Whether the modal snapshot is shown
  date: string; // ISO date for the assignment (e.g., "2025-01-07")
  roommateName: string; // Display name of the assigned roommate
  choreName: string; // Display name of the chore
  validationErrors?: string[]; // Optional list of validation messages to display
}