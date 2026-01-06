interface ProgressDashboard {
  weekStartISO: string; // ISO date for the start of the displayed week (e.g., "2025-01-06")
  totalEstimatedHoursRemaining: number; // Aggregate hours remaining across all courses
  courseSummaries: string[]; // Display lines like: "Course Title (Provider) — 72% • 5h remaining • Next: Lesson 4"
  weeklyScheduleLines: string[]; // Display lines like: "Mon 09:00–10:30 — Course Title — planned"
  badgeLabels: string[]; // Display labels like: "7-day streak", "Milestone: 50% Complete"
}

interface CourseCard {
  title: string; // Course title
  progressPercent: number; // 0-100 for circular completion indicator
  estimatedHoursRemaining: number; // Estimated hours remaining
  nextLesson: string; // Label for the next lesson
  dueSoon?: boolean; // Optional flag for upcoming due date
}

interface WeeklyScheduleGrid {
  weekStartISO: string; // ISO date for start of the week (e.g., "2025-03-17")
  days: number; // Number of days displayed (use 7)
  sessions: string[]; // Encoded session rows for display only: "id|dayIndex(0-6)|start(HH:mm)|end(HH:mm)|courseTitle|courseColorHex|status(planned|done|skipped)"
  timezone?: string; // Display-only timezone label (e.g., "UTC", "America/New_York")
  summary?: string; // Optional read-only summary (e.g., "Planned 6h · Done 2h · Skipped 1h")
}

interface StudySessionPlanner {
  targetWeeklyHours: number; // Weekly study target in hours
  minSessionMinutes: number; // Minimum minutes per session
  preferredDays: number[]; // Days of week to study: 0=Sun ... 6=Sat
  estimatedTimeRemainingHours: number; // Total estimated hours remaining across courses
  suggestions: string[]; // Read-only session suggestions, e.g., "Mon 18:00-19:00 • Course: CS101"
}

interface BadgeStrip {
  labels: string[]; // Badge labels (e.g., "7-day streak", "Module 3 Complete")
  types: ("streak" | "milestone" | "completion")[]; // Badge categories
  values: number[]; // Numeric counts or levels (e.g., streak length, milestone number)
  iconKeys?: string[]; // Optional icon identifiers for decorative display
  highlightNew?: boolean; // Visual flag to emphasize newly achieved badges
}