type IssueStatus = "idea" | "planned" | "draft" | "scheduled" | "sent" | "cancelled";

interface CalendarIssue {
  id: string;
  date: string; // ISO date (YYYY-MM-DD) representing the scheduled day
  topic: string;
  cta: string;
  status: IssueStatus;
  isDraft?: boolean; // Read-only indicator
  lastEditedDate?: string; // ISO timestamp for display
  author?: string;
  coverImageUrl?: string; // Decorative image on the issue card
  readTimeMinutes?: number; // Display-only estimate
  tags?: string[]; // Read-only labels for the issue
}

interface BacklogIdea {
  id: string;
  topic: string;
  cta?: string;
  notes?: string;
  createdAt?: string; // ISO timestamp
  priority?: "low" | "medium" | "high";
  ideaImageUrl?: string; // Decorative thumbnail
}

interface NewsletterCalendarBoard {
  // Calendar range and labeling
  startDate: string; // ISO date marking the first visible day in the 6-week grid
  weekCount?: number; // Display-only, typical value: 6
  rangeLabel?: string; // e.g., "Jan 1 – Feb 11, 2025"
  timezone?: string; // e.g., "America/New_York"

  // Primary data
  issues: CalendarIssue[]; // Scheduled issues placed on specific dates
  backlogIdeas: BacklogIdea[]; // Unscheduled ideas shown in backlog

  // Visual highlighting and legends (display-only)
  selectedIssueId?: string; // Highlights a specific issue card
  statusLegend?: Record<IssueStatus, string>; // Human-readable labels per status
  statusColors?: Partial<Record<IssueStatus, string>>; // Hex or token mapping for status chips
  showWeekNumbers?: boolean; // Visual flag only

  // Static header/branding
  boardTitle?: string; // e.g., "Newsletter Content Plan"
  iconUrl?: string; // Decorative icon for the board header
}

type IssueStatus = "idea" | "planned" | "draft" | "ready" | "scheduled" | "sent" | "cancelled";

interface IssueCard {
  id: string;
  topic: string;
  cta: string;
  status: IssueStatus;
  isDraft: boolean;
  scheduledDate?: string; // ISO 8601 timestamp for display
  variant: "calendar" | "backlog";
  iconUrl?: string; // decorative icon
  thumbnailUrl?: string; // decorative thumbnail/cover
  labels?: string[]; // display-only tags/chips
  metadata?: {
    createdAt?: string; // ISO 8601
    updatedAt?: string; // ISO 8601
    estReadMinutes?: number;
    wordCount?: number;
  };
}

type IssueStatus = "planned" | "draft" | "scheduled" | "sent" | "cancelled" | "archived";

interface StatusOption {
  value: IssueStatus;
  label: string;
  colorHex?: string; // display color for legend chips
}

interface IssueDisplay {
  id?: string;
  date: string; // ISO date string (e.g., "2025-01-15")
  topic: string;
  cta: string;
  status: IssueStatus;
  isDraft: boolean;
  notes?: string;
  createdAt?: string; // ISO timestamp
  updatedAt?: string; // ISO timestamp
  coverImageUrl?: string; // decorative image
}

interface IssueEditorModal {
  title: string; // e.g., "Issue Details"
  issue: IssueDisplay; // primary data to display
  statusOptions: StatusOption[]; // reference list for status legend display
  ctaSuggestions?: string[]; // suggested CTAs for display only
  subtitle?: string; // e.g., "Newsletter Content Calendar"
  iconUrl?: string; // decorative icon
  showStatusLegend?: boolean; // visual flag - display legend
  showDraftBadge?: boolean; // visual flag - display draft chip
  footerNote?: string; // static helper text
  generatedAt?: string; // render/generated timestamp for audit display
}

interface StatusChip {
  // Primary status value to display
  status: "Draft" | "Outline" | "Ready" | "Scheduled" | "Sent";

  // Visual configuration (display-only)
  size?: "sm" | "md";
  variant?: "solid" | "soft" | "outline";
  colorHex?: string; // Optional custom color for the chip background or border

  // Text display
  label?: string; // Optional label override (defaults to status)
  caption?: string; // Small supporting text (e.g., "Awaiting review")

  // Decorative media
  iconUrl?: string; // Optional icon to display
  showIcon?: boolean; // Whether to render the icon when iconUrl is provided

  // Read-only metadata
  scheduledFor?: string; // ISO timestamp for scheduled send
  lastUpdatedAt?: string; // ISO timestamp of last status update

  // Accessibility (read-only description)
  ariaLabel?: string; // Accessible name for screen readers
}