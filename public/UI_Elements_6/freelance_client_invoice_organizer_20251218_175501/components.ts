interface InvoiceOverviewDashboard {
  // Metadata
  title?: string; // e.g., "Invoice Overview"
  generatedAt: string; // ISO timestamp for when this snapshot was produced

  // Client cards summary (read-only snapshots)
  clientsSummary: ClientSummaryCard[]; // One card per client with balances/status

  // Invoice status table (static, pre-sorted/filtered as needed)
  invoices: InvoiceRow[]; // Each row represents an invoice

  // Cash-flow timeline (static series)
  cashflowPoints: CashflowPoint[]; // Time-series points for inflow/outflow

  // Aggregated metrics for quick overview
  metrics: OverviewMetrics;

  // Read-only description of what subset is being displayed (no controls)
  filterSummary?: FilterSummary; // Informational only (e.g., "Unpaid, May 1–31, 3 clients")

  // Visual display preferences (static flags only)
  displayOptions?: DisplayOptions;

  // Optional informational notes to render as static text
  notes?: string[];
}

interface ClientSummaryCard {
  clientId: string;
  clientName: string;
  logoUrl?: string; // Decorative image
  outstandingBalance: number;
  currency: string; // ISO currency code, e.g., "USD"
  lastInvoiceDate?: string; // ISO date
  status: "active" | "paused" | "inactive"; // Client relationship status
  openInvoicesCount: number;
}

interface InvoiceRow {
  invoiceId: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  issueDate: string; // ISO date
  dueDate: string; // ISO date
  amount: number;
  currency: string; // ISO currency code
  status: "paid" | "unpaid" | "overdue" | "partial";
  paidDate?: string; // ISO date when status is "paid" or partially paid
  tags?: string[]; // Read-only labels like "retainer", "design"
}

interface CashflowPoint {
  date: string; // ISO date
  amount: number; // Positive for inflow, negative for outflow
  type: "inflow" | "outflow";
  label?: string; // e.g., "Invoice #1043"
}

interface OverviewMetrics {
  totalOutstanding: number;
  totalOverdue: number;
  totalPaidThisMonth: number;
  upcomingDueWithin7Days: number;
  overdueCount: number;
  clientCount: number;
  primaryCurrency: string; // ISO currency code used for totals
}

interface FilterSummary {
  // Describes the currently applied view as static info (no interactive filters)
  statusScope: "all" | "paid" | "unpaid" | "overdue";
  clientIdsShown?: string[]; // Snapshot of which clients are included
  dateRange?: {
    from: string; // ISO date
    to: string; // ISO date
  };
  description?: string; // Human-readable summary, e.g., "Unpaid invoices for Acme & Beta, Q2"
}

interface DisplayOptions {
  showClientLogos?: boolean;
  showInvoicesTableHeader?: boolean;
  showCashflowGrid?: boolean;
  showLegend?: boolean; // Static legend visibility
  currencyDisplay?: "symbol" | "code"; // Visual preference only
  emphasizeOverdue?: boolean; // If true, highlight overdue items visually
}

interface InvoiceFilters {
  // Static heading and context
  title?: string;
  subtitle?: string;

  // Read-only, currently applied filter state (display only)
  appliedStatus: "all" | "paid" | "unpaid" | "overdue";
  appliedClients: ClientRef[]; // Pre-selected clients to display
  appliedDateRange?: DateRange; // Pre-selected date range to display

  // Static summary for display
  summary: {
    totalInvoices: number;
    totalAmount: number; // monetary value in minor or major units as per app standard
    paidCount: number;
    unpaidCount: number;
    overdueCount: number;
    overdueAmount?: number;
  };

  // Optional legend/config for visual labeling (non-interactive)
  legend?: StatusLegendItem[];
  showLegend?: boolean;

  // Metadata and notes (display only)
  generatedAt?: string; // ISO timestamp when these filters/summaries were produced
  notes?: string; // Optional explanatory text shown beneath the filters
}

interface ClientRef {
  id: string;
  name: string;
  avatarUrl?: string; // decorative only
}

interface DateRange {
  from?: string; // ISO date (YYYY-MM-DD) or ISO datetime
  to?: string;   // ISO date (YYYY-MM-DD) or ISO datetime
}

interface StatusLegendItem {
  key: "all" | "paid" | "unpaid" | "overdue";
  label: string;
  colorHex?: string; // e.g., "#34D399"
  iconUrl?: string;  // decorative only
}

interface InvoiceDetailPanel {
  invoice: {
    id: string;
    number: string;
    clientName: string;
    clientAvatarUrl?: string;
    amount: number;
    currencyCode: string; // ISO 4217, e.g., "USD"
    issueDate: string; // ISO 8601
    dueDate: string; // ISO 8601
    status: "draft" | "sent" | "viewed" | "partial" | "paid" | "overdue" | "cancelled";
    balanceDue: number;
    reference?: string; // PO or external reference
  };
  payments: Array<{
    date: string; // ISO 8601
    amount: number;
    method?: "bank_transfer" | "card" | "cash" | "paypal" | "check" | "other";
    note?: string;
    confirmationCode?: string;
    id?: string;
  }>;
  timeline?: Array<{
    date: string; // ISO 8601
    label: string; // e.g., "Invoice sent", "Payment received"
    kind: "issued" | "reminder" | "viewed" | "payment" | "overdue" | "note" | "status_change";
    iconUrl?: string;
    amountChange?: number; // negative for payment, positive for adjustments
  }>;
  totals?: {
    subtotal?: number;
    tax?: number;
    discount?: number;
    shipping?: number;
    total?: number;
    paidToDate?: number;
    balanceDue?: number;
  };
  displayTitle?: string; // Panel title text
  highlightedFields?: Array<"status" | "dueDate" | "balanceDue" | "clientName">; // Visual emphasis only
  showSections?: {
    showPayments?: boolean;
    showTimeline?: boolean;
    showTotals?: boolean;
    showClient?: boolean;
    showTags?: boolean;
    showNotes?: boolean;
  };
  tags?: string[]; // Read-only labels for display
  notes?: string; // Read-only internal notes
  lastUpdatedAt?: string; // ISO 8601, metadata for display
  decorativeIconUrl?: string; // Optional static icon for the panel
}