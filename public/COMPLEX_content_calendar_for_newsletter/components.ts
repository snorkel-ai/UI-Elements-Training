interface NewsletterPlannerBoard {
  title?: string; // Display title for the board
  startDate: string; // ISO date (YYYY-MM-DD) - calendar start
  weeks: number; // Number of weeks shown (e.g., 6)
  timezone?: string; // IANA timezone for date labels (e.g., "America/New_York")

  scheduledIssues: ScheduledIssue[]; // Issues placed on specific dates within the calendar window
  backlogIdeas: BacklogIdea[]; // Unscheduled ideas shown in the backlog panel

  statusOptions: IssueStatusOption[]; // Static legend of possible statuses for display
  summaries?: {
    totalScheduled: number; // Count of scheduled issues
    totalBacklog: number; // Count of backlog ideas
    byStatus?: StatusCount[]; // Optional breakdown by status
  };

  generatedAt?: string; // ISO timestamp when this snapshot was produced
  showWeekNumbers?: boolean; // Visual flag for showing week numbers
  showLegend?: boolean; // Visual flag for showing status legend
}

// Supporting types (display-only)

type IssueStatus =
  | "draft"
  | "scheduled"
  | "ready"
  | "sent"
  | "backlog"
  | "paused"
  | "cancelled";

interface ScheduledIssue {
  id: string;
  date: string; // ISO date (YYYY-MM-DD)
  topic: string;
  cta: string;
  status: IssueStatus;
  iconUrl?: string; // Decorative icon for the issue card
  lastEditedDate?: string; // ISO date for display
}

interface BacklogIdea {
  id: string;
  topic: string;
  cta?: string;
  status: IssueStatus;
  iconUrl?: string; // Decorative icon for the backlog item
  createdDate?: string; // ISO date for display
}

interface IssueStatusOption {
  value: IssueStatus; // Status key
  label: string; // Human-readable label
  color?: string; // Hex or CSS color for legend/status chips
}

interface StatusCount {
  status: IssueStatus;
  count: number;
}

interface CalendarGrid {
  title?: string; // Display title for the calendar
  startDate: string; // ISO date (YYYY-MM-DD) for the first day shown
  weeks: number; // Number of weeks to render (e.g., 6)
  weekStart: "sunday" | "monday"; // Which weekday the grid starts on
  timezone?: string; // Display-only timezone label (e.g., "UTC", "America/NY")
  items: IssueItem[]; // Scheduled issues displayed in the grid
  backlog?: BacklogItem[]; // Unscheduled ideas shown in a backlog area
  showWeekNumbers?: boolean; // Visual flag to show week number column
  showTodayHighlight?: boolean; // Visual flag to highlight the current date
  showEmptyDays?: boolean; // Visual flag to render empty day cells
  showDropZones?: boolean; // Visual-only indication of drop areas (no interactivity)
  generatedAt?: string; // ISO timestamp of when this snapshot was generated
}

interface IssueItem {
  id: string;
  date: string; // ISO date (YYYY-MM-DD) for the scheduled day
  topic: string; // Headline or main topic
  ctaText?: string; // Display-only CTA label (e.g., "Read more")
  status: "draft" | "scheduled" | "published" | "pending" | "cancelled";
  summary?: string; // Short description shown on the card
  tags?: string[]; // Optional tags for display
  thumbnailUrl?: string; // Decorative image for the issue card
}

interface BacklogItem {
  id: string;
  topic: string;
  ctaText?: string;
  status?: "idea" | "draft" | "pending";
  createdAt?: string; // ISO timestamp for when the idea was added
  priority?: 1 | 2 | 3; // Display-only priority badge
  thumbnailUrl?: string; // Decorative image for the backlog card
}

type BacklogStatus = "idea" | "draft" | "ready" | "paused";

interface BacklogItem {
  id: string;
  topic: string;
  cta: string;
  status: BacklogStatus;
  priority?: number; // Higher number indicates higher priority
  createdAt?: string; // ISO timestamp
  lastUpdatedAt?: string; // ISO timestamp
  imageUrl?: string; // Decorative thumbnail
  notes?: string; // Short read-only note
  tags?: string[]; // Display-only tags
}

interface BacklogList {
  title?: string; // e.g., "Backlog"
  description?: string; // Short explanatory text
  items: BacklogItem[]; // Unscheduled ideas for future consideration
  sortedBy?: "priority" | "recent" | "alphabetical"; // Display-only label of applied ordering
  includedStatuses?: BacklogStatus[]; // Informational list of statuses included in the view
  totalIdeas: number; // Total ideas available (pre-filter)
  displayedCount: number; // Count of items currently shown
  generatedAt?: string; // ISO timestamp for when this view was produced
  iconUrl?: string; // Decorative icon for the list header
  showStatusLegend?: boolean; // Visual flag to render a non-interactive legend
  highlightItemId?: string; // Optional visual highlight of a specific item
}

interface IssueCard {
  id: string;
  topic: string;
  ctaLabel: string;
  status: "idea" | "drafting" | "ready" | "scheduled" | "sent";
  draftProgress?: "outline" | "drafting" | "final";
  scheduledDate?: string; // ISO 8601 date for calendar placement
  sentDate?: string; // ISO 8601 date when sent (display only)
  iconUrl?: string; // Decorative icon
  coverImageUrl?: string; // Optional decorative image/thumbnail
  isDraggable?: boolean; // Informational display only (e.g., show drag handle icon)
  tags?: string[]; // Display-only labels/chips
  notes?: string; // Read-only short note or summary
  locationLabel?: string; // Context label, e.g., "Backlog" or "Week of 2025-01-06"
}

type IssueStatus = "draft" | "scheduled" | "sent" | "archived";

interface IssueDetails {
  id: string;
  topic: string;
  cta: string;
  status: IssueStatus;
  notes?: string;
  scheduledDate?: string; // ISO 8601 timestamp for display
  createdAt?: string; // ISO 8601 timestamp for display
  updatedAt?: string; // ISO 8601 timestamp for display
}

interface StatusOption {
  value: IssueStatus;
  label: string;
  colorHex?: string; // Display color for status chip/legend
}

interface IssueEditorModal {
  open: boolean; // Visual flag indicating whether the modal is shown
  title: string; // Modal heading, e.g., "Issue Details"
  issue: IssueDetails; // Core issue information to display
  statusOptions: StatusOption[]; // Reference list for status display
  ctaPresetOptions: string[]; // Reference list for CTA presets display
  headerIconUrl?: string; // Decorative icon in the header
  watermarkText?: string; // Optional watermark or confidentiality note
  showStatusLegend?: boolean; // Display a static legend for statuses
  showTimestamps?: boolean; // Show created/updated timestamps if present
}

interface StatusChip {
  // Required status for the newsletter issue
  status: "idea" | "drafting" | "ready" | "scheduled" | "sent";

  // Visual size of the chip
  size?: "sm" | "md";

  // Optional human-readable text to display instead of derived status label
  label?: string;

  // Decorative icon to accompany the status (non-interactive)
  iconUrl?: string;

  // Static color token or hex for the chip (display-only configuration)
  colorToken?: string;

  // Visual style treatment of the chip
  emphasis?: "solid" | "soft" | "outline";

  // Relevant timestamps for display (ISO 8601 or formatted strings)
  scheduledAt?: string;   // When the issue is scheduled to be sent
  sentAt?: string;        // When the issue was actually sent
  lastUpdatedAt?: string; // When the status was last updated

  // Accessibility label for screen readers (informational only)
  ariaLabel?: string;
}