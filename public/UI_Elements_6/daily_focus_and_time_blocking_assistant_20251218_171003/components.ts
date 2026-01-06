interface TimeBlockPlannerGrid {
  // Date context
  date: string; // ISO date string for the schedule (e.g., "2025-12-19")
  timezone?: string; // IANA timezone (e.g., "America/New_York")

  // Working window display
  workingHours: {
    start: string; // ISO datetime or time (e.g., "2025-12-19T09:00:00Z" or "09:00")
    end: string;   // ISO datetime or time (e.g., "2025-12-19T17:00:00Z" or "17:00")
  };

  // Existing calendar events (read-only)
  calendarEvents: CalendarEvent[];

  // Auto-placed task blocks (read-only)
  taskBlocks: TaskBlock[];

  // Daily goal progress (displayed as a progress bar)
  dailyGoal: {
    target: number;    // target units (e.g., total blocks or minutes)
    completed: number; // completed units toward target
    label?: string;    // display label (e.g., "Focus minutes")
  };

  // Summary / rollups (display only)
  summary?: {
    totalPlannedMinutes: number;
    totalCalendarMinutes: number;
    totalTaskMinutes: number;
    conflicts: number;         // count of blocks flagged with conflict
    completedBlocks: number;   // count of taskBlocks with status "done"
  };

  // Conflict overview (read-only indicator)
  conflictSummary?: {
    hasConflicts: boolean;
    conflictCount: number;
    notes?: string; // optional descriptive note for display
  };

  // Grid/time scale presentation (visual-only configuration)
  timeScale?: {
    intervalMinutes: number;               // e.g., 15
    startHour?: number;                     // 0-23, for grid labeling
    endHour?: number;                       // 0-23, for grid labeling
    timeLabelFormat?: "h:mma" | "HH:mm";    // display format only
  };

  // Visual flags (display-only)
  displayFlags?: {
    showGridLines?: boolean;
    showNowIndicator?: boolean;
    showLegend?: boolean;
    showLabels?: boolean;
  };

  // Static color mappings (visual-only)
  colors?: ColorPalette;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO datetime
  end: string;   // ISO datetime
  location?: string;
  description?: string;
  status?: "busy" | "free" | "tentative";
  source?: "google" | "outlook" | "apple" | "other";
  iconUrl?: string; // decorative
}

interface TaskBlock {
  id: string;
  title: string;
  start: string; // ISO datetime
  end: string;   // ISO datetime
  priority: "low" | "med" | "high";
  effort: "light" | "medium" | "heavy";
  status: "planned" | "in_progress" | "done";
  conflict?: boolean;           // true if overlaps with a calendar event or other constraint
  relatedEventId?: string;      // if aligned to a specific calendar event
  notes?: string;               // read-only description
  color?: string;               // fixed color for this block (overrides palette)
  iconUrl?: string;             // decorative only
}

interface ColorPalette {
  priority: {
    low: string;
    med: string;
    high: string;
  };
  effort: {
    light: string;
    medium: string;
    heavy: string;
  };
  status: {
    planned: string;
    in_progress: string;
    done: string;
  };
  conflict: string;       // color to highlight conflicts
  calendarEvent: string;  // default color for calendar events
}

interface ConflictWarningsPanel {
  title?: string; // Display title for the panel
  timeframe: {
    start: string; // ISO datetime for the schedule window start
    end: string;   // ISO datetime for the schedule window end
  };
  generatedAt?: string; // ISO timestamp when this summary was generated
  totalConflicts: number; // Total number of detected conflicts
  severitySummary?: {
    info: number;
    warn: number;
    error: number;
  }; // Counts by severity
  conflicts: ConflictItem[]; // Primary data list
  showSeverityLegend?: boolean; // Visual flag - display a non-interactive legend
  showOverlapDurations?: boolean; // Visual flag - show duration minutes for overlaps
  colorsBySeverity?: {
    info: string;
    warn: string;
    error: string;
  }; // Static color tokens for display only
  iconUrl?: string; // Optional decorative icon for the panel header
}

interface ConflictItem {
  blockId: string; // ID of the time block
  blockTitle: string; // Title of the time block
  blockTime: {
    start: string; // ISO start time of the block
    end: string;   // ISO end time of the block
  };
  calendarEventTitle?: string; // Overlapping calendar event title, if applicable
  overlapRange: {
    start: string; // ISO start of overlap
    end: string;   // ISO end of overlap
    durationMinutes?: number; // Computed overlap duration for display
  };
  severity: "info" | "warn" | "error"; // Conflict severity indicator
  suggestedFixes: Array<"shift" | "shorten" | "split" | "skip">; // Display-only suggested remedies
  status?: "unresolved" | "resolved" | "ignored"; // Read-only status badge
  notes?: string; // Additional context for display
}

interface FocusTimerCard {
  // Core block info being timed (display only)
  activeBlock: {
    id: string;
    title: string;
    plannedStart?: string; // ISO timestamp
    plannedEnd: string; // ISO timestamp
    priority?: "low" | "medium" | "high" | "urgent";
    effort?: "light" | "moderate" | "heavy";
    iconUrl?: string; // decorative
  };

  // Timer display
  remainingTimeSeconds: number;
  elapsedTimeSeconds?: number;
  status: "idle" | "running" | "paused" | "completed";
  progressPercent?: number; // for a static progress bar visualization
  showProgressBar?: boolean;

  // Notes summary (read-only)
  notesCount: number;
  lastNotePreview?: string; // short snippet for display

  // Context and warnings (read-only)
  conflictWarnings?: Array<{
    id: string;
    message: string;
    severity: "info" | "warning" | "critical";
  }>;

  // Static schedule context (read-only)
  scheduleSummary?: {
    day: string; // e.g., "Today", "Mon, Jan 15"
    goalProgressPercent: number; // daily goal progress bar
    totalBlocksPlanned?: number;
    completedBlocks?: number;
  };

  // Visual-only suggestions (labels, not actions)
  suggestedExtensionsMinutes?: number[]; // e.g., [5, 10] for display labels only

  // Decorative
  backgroundImageUrl?: string;
}

interface ScheduleActionsBar {
  // Identity and scope
  scheduleId: string;
  date: string; // ISO date for the schedule day (e.g., "2025-12-19")

  // Lifecycle/status (display-only)
  lifecycleState: "generated" | "locked" | "exported" | "shared" | "printed" | "out_of_date";
  isLocked: boolean;

  // Capability indicators (display-only; no actions)
  capability: {
    canRegenerate: boolean;
    canLock: boolean;
    canExport: boolean;
    canShare: boolean;
    canPrint: boolean;
  };

  // Timestamps and metadata (display-only)
  lastGeneratedAt: string; // ISO timestamp
  lastLockedAt?: string; // ISO timestamp
  export?: {
    status: "available" | "exported" | "unavailable";
    lastExportedAt?: string; // ISO timestamp
    calendarName?: string; // e.g., "Work Calendar"
  };
  share?: {
    linkUrl?: string; // Display only
    visibility?: "private" | "organization" | "public";
    lastSharedAt?: string; // ISO timestamp
  };

  // Progress and warnings (display-only)
  progressPercent: number; // 0-100 daily goal completion
  conflictWarnings?: {
    count: number;
    topConflicts?: Array<{
      time: string; // e.g., "14:00-14:30"
      title: string; // conflicting event/task title
    }>;
  };

  // Decorative visuals (display-only)
  visuals?: {
    regenerateIconUrl?: string;
    lockIconUrl?: string;
    exportIconUrl?: string;
    shareIconUrl?: string;
    printIconUrl?: string;
  };
}