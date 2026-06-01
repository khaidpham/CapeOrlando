const STORAGE_KEY = "cape-orlando-property-manager";

const sections = [
  { id: "dashboard", label: "Dashboard", icon: "building" },
  { id: "properties", label: "Properties", icon: "building" },
  { id: "tenants", label: "Tenants", icon: "users" },
  { id: "payments", label: "Payments", icon: "wallet" },
  { id: "leases", label: "Leases", icon: "file" },
  { id: "maintenance", label: "Maintenance", icon: "tool" },
  { id: "reminders", label: "Reminders", icon: "bell" },
  { id: "contracts", label: "Contracts", icon: "file" },
  { id: "communications", label: "Communications", icon: "message" }
];

const contractDefaults = {
  seller: "Max L McKinnon",
  sampleBuyer: "Tra My Land, LLC",
  propertyAddress: "2033 NW 9th TER, Cape Coral, FL 33993",
  legalDescription: "CAPE CORAL UNIT 52 BLK 3795 PB 19 PG 51 LOTS 17 + 18",
  sectionTownshipRange: "SEC 04 / TWP 44 / RNG 23 of Lee County, Florida",
  propertyId: "04-44-23-C4-03795.0170",
  escrowName: "Landsel Title Agency, Inc.",
  escrowContact: "Amanda Wilkins",
  escrowAddress: "3208 Chiquita Blvd S #215, Cape Coral, FL 33914",
  escrowPhone: "239.205.6373 Ext. 105",
  escrowEmail: "awilkins@landsel.com",
  initialDeposit: 2000,
  depositDueDays: 3
};

const schemas = {
  properties: {
    title: "Properties",
    subtitle: "Units, ownership status, rent targets, and occupancy.",
    addLabel: "Add property",
    primary: "name",
    secondary: "address",
    status: "status",
    fields: [
      { key: "name", label: "Property name", type: "text", required: true },
      { key: "address", label: "Address", type: "text", required: true },
      { key: "type", label: "Type", type: "select", options: ["Single family", "Condo", "Townhome", "Duplex", "Apartment"] },
      { key: "beds", label: "Beds", type: "number" },
      { key: "baths", label: "Baths", type: "number", step: "0.5" },
      { key: "rent", label: "Monthly rent", type: "number" },
      { key: "status", label: "Status", type: "select", options: ["Occupied", "Vacant", "Turnover", "Maintenance"] },
      { key: "manager", label: "Manager", type: "text" },
      { key: "notes", label: "Notes", type: "textarea", full: true }
    ],
    details: [
      ["Type", "type"],
      ["Beds / baths", (item) => `${item.beds || 0} / ${item.baths || 0}`],
      ["Rent", (item) => money(item.rent)],
      ["Manager", "manager"]
    ],
    filters: ["All", "Occupied", "Vacant", "Turnover", "Maintenance"]
  },
  tenants: {
    title: "Tenants",
    subtitle: "Resident contacts, balances, and lease assignment.",
    addLabel: "Add tenant",
    primary: "name",
    secondary: "property",
    status: "status",
    fields: [
      { key: "name", label: "Tenant name", type: "text", required: true },
      { key: "property", label: "Property", type: "text", required: true },
      { key: "email", label: "Email", type: "email" },
      { key: "phone", label: "Phone", type: "tel" },
      { key: "moveIn", label: "Move-in date", type: "date" },
      { key: "balance", label: "Balance", type: "number" },
      { key: "status", label: "Status", type: "select", options: ["Current", "Late", "Notice sent", "Moving out"] },
      { key: "notes", label: "Notes", type: "textarea", full: true }
    ],
    details: [
      ["Email", "email"],
      ["Phone", "phone"],
      ["Move-in", (item) => dateLabel(item.moveIn)],
      ["Balance", (item) => money(item.balance)]
    ],
    filters: ["All", "Current", "Late", "Notice sent", "Moving out"]
  },
  payments: {
    title: "Payments",
    subtitle: "Rent, deposits, fees, payment method, and collection state.",
    addLabel: "Add payment",
    primary: "tenant",
    secondary: "property",
    status: "status",
    fields: [
      { key: "tenant", label: "Tenant", type: "text", required: true },
      { key: "property", label: "Property", type: "text", required: true },
      { key: "amount", label: "Amount", type: "number", required: true },
      { key: "dueDate", label: "Due date", type: "date" },
      { key: "paidDate", label: "Paid date", type: "date" },
      { key: "method", label: "Method", type: "select", options: ["ACH", "Card", "Check", "Cash", "Wire"] },
      { key: "status", label: "Status", type: "select", options: ["Paid", "Pending", "Late", "Partial"] },
      { key: "notes", label: "Notes", type: "textarea", full: true }
    ],
    details: [
      ["Amount", (item) => money(item.amount)],
      ["Due", (item) => dateLabel(item.dueDate)],
      ["Paid", (item) => dateLabel(item.paidDate)],
      ["Method", "method"]
    ],
    filters: ["All", "Paid", "Pending", "Late", "Partial"]
  },
  leases: {
    title: "Leases",
    subtitle: "Terms, deposits, renewal windows, and lease state.",
    addLabel: "Add lease",
    primary: "tenant",
    secondary: "property",
    status: "status",
    fields: [
      { key: "tenant", label: "Tenant", type: "text", required: true },
      { key: "property", label: "Property", type: "text", required: true },
      { key: "startDate", label: "Start date", type: "date" },
      { key: "endDate", label: "End date", type: "date" },
      { key: "rent", label: "Rent", type: "number" },
      { key: "deposit", label: "Deposit", type: "number" },
      { key: "status", label: "Status", type: "select", options: ["Active", "Renewing", "Expiring", "Ended"] },
      { key: "notes", label: "Notes", type: "textarea", full: true }
    ],
    details: [
      ["Term", (item) => `${dateLabel(item.startDate)} to ${dateLabel(item.endDate)}`],
      ["Rent", (item) => money(item.rent)],
      ["Deposit", (item) => money(item.deposit)],
      ["Days left", (item) => daysUntil(item.endDate)]
    ],
    filters: ["All", "Active", "Renewing", "Expiring", "Ended"]
  },
  maintenance: {
    title: "Maintenance",
    subtitle: "Requests, vendors, priority, cost, and resolution status.",
    addLabel: "Add request",
    primary: "title",
    secondary: "property",
    status: "status",
    fields: [
      { key: "title", label: "Request", type: "text", required: true },
      { key: "property", label: "Property", type: "text", required: true },
      { key: "tenant", label: "Tenant", type: "text" },
      { key: "priority", label: "Priority", type: "select", options: ["Low", "Medium", "High", "Emergency"] },
      { key: "vendor", label: "Vendor", type: "text" },
      { key: "opened", label: "Opened", type: "date" },
      { key: "cost", label: "Estimated cost", type: "number" },
      { key: "status", label: "Status", type: "select", options: ["Open", "Scheduled", "In progress", "Resolved"] },
      { key: "notes", label: "Notes", type: "textarea", full: true }
    ],
    details: [
      ["Tenant", "tenant"],
      ["Priority", "priority"],
      ["Opened", (item) => dateLabel(item.opened)],
      ["Cost", (item) => money(item.cost)]
    ],
    filters: ["All", "Open", "Scheduled", "In progress", "Resolved"]
  },
  reminders: {
    title: "Reminders",
    subtitle: "Upcoming owner, resident, compliance, and operations tasks.",
    addLabel: "Add reminder",
    primary: "title",
    secondary: "relatedTo",
    status: "status",
    fields: [
      { key: "title", label: "Reminder", type: "text", required: true },
      { key: "relatedTo", label: "Related to", type: "text" },
      { key: "dueDate", label: "Due date", type: "date" },
      { key: "owner", label: "Owner", type: "text" },
      { key: "category", label: "Category", type: "select", options: ["Lease", "Payment", "Maintenance", "Inspection", "Communication"] },
      { key: "status", label: "Status", type: "select", options: ["Open", "Due soon", "Overdue", "Done"] },
      { key: "notes", label: "Notes", type: "textarea", full: true }
    ],
    details: [
      ["Due", (item) => dateLabel(item.dueDate)],
      ["Owner", "owner"],
      ["Category", "category"],
      ["Timing", (item) => daysUntil(item.dueDate)]
    ],
    filters: ["All", "Open", "Due soon", "Overdue", "Done"]
  },
  communications: {
    title: "Communications",
    subtitle: "Resident, owner, vendor, and internal communication history.",
    addLabel: "Add message",
    primary: "subject",
    secondary: "contact",
    status: "status",
    fields: [
      { key: "subject", label: "Subject", type: "text", required: true },
      { key: "contact", label: "Contact", type: "text", required: true },
      { key: "property", label: "Property", type: "text" },
      { key: "channel", label: "Channel", type: "select", options: ["Email", "Phone", "Text", "Portal", "In person"] },
      { key: "date", label: "Date", type: "date" },
      { key: "status", label: "Status", type: "select", options: ["Logged", "Needs follow-up", "Waiting", "Closed"] },
      { key: "notes", label: "Notes", type: "textarea", full: true }
    ],
    details: [
      ["Property", "property"],
      ["Channel", "channel"],
      ["Date", (item) => dateLabel(item.date)],
      ["Notes", (item) => truncate(item.notes, 38)]
    ],
    filters: ["All", "Logged", "Needs follow-up", "Waiting", "Closed"]
  }
};

const seedData = {
  properties: [
    { id: "p1", name: "Bayview Bungalow", address: "812 Seabreeze Ave", type: "Single family", beds: 3, baths: 2, rent: 2950, status: "Occupied", manager: "Maya Chen", notes: "Pool service on Fridays." },
    { id: "p2", name: "Harbor Point 204", address: "1400 Marina Dr #204", type: "Condo", beds: 2, baths: 2, rent: 2350, status: "Occupied", manager: "Jon Bell", notes: "HOA requires vendor COI." },
    { id: "p3", name: "Cypress Duplex A", address: "44 Cypress Row Unit A", type: "Duplex", beds: 2, baths: 1.5, rent: 1900, status: "Turnover", manager: "Maya Chen", notes: "Paint touchups before listing." },
    { id: "p4", name: "Lakeview Townhome", address: "219 Lake Heron Ct", type: "Townhome", beds: 4, baths: 3, rent: 3200, status: "Maintenance", manager: "Jon Bell", notes: "HVAC follow-up pending." }
  ],
  tenants: [
    { id: "t1", name: "Avery Jordan", property: "Bayview Bungalow", email: "avery@example.com", phone: "(407) 555-0132", moveIn: "2025-08-01", balance: 0, status: "Current", notes: "Prefers text reminders." },
    { id: "t2", name: "Nina Patel", property: "Harbor Point 204", email: "nina@example.com", phone: "(407) 555-0188", moveIn: "2024-11-15", balance: 450, status: "Late", notes: "Payment plan approved." },
    { id: "t3", name: "Marcus Reed", property: "Lakeview Townhome", email: "marcus@example.com", phone: "(407) 555-0190", moveIn: "2025-03-01", balance: 0, status: "Current", notes: "Has approved pet addendum." }
  ],
  payments: [
    { id: "pay1", tenant: "Avery Jordan", property: "Bayview Bungalow", amount: 2950, dueDate: "2026-05-01", paidDate: "2026-05-01", method: "ACH", status: "Paid", notes: "Auto-pay." },
    { id: "pay2", tenant: "Nina Patel", property: "Harbor Point 204", amount: 2350, dueDate: "2026-05-01", paidDate: "2026-05-09", method: "Card", status: "Partial", notes: "$1,900 received." },
    { id: "pay3", tenant: "Marcus Reed", property: "Lakeview Townhome", amount: 3200, dueDate: "2026-06-01", paidDate: "", method: "ACH", status: "Pending", notes: "Auto-pay scheduled." }
  ],
  leases: [
    { id: "l1", tenant: "Avery Jordan", property: "Bayview Bungalow", startDate: "2025-08-01", endDate: "2026-07-31", rent: 2950, deposit: 2950, status: "Active", notes: "Renewal offer due in June." },
    { id: "l2", tenant: "Nina Patel", property: "Harbor Point 204", startDate: "2024-11-15", endDate: "2026-06-14", rent: 2350, deposit: 2350, status: "Expiring", notes: "Send renewal options." },
    { id: "l3", tenant: "Marcus Reed", property: "Lakeview Townhome", startDate: "2025-03-01", endDate: "2027-02-28", rent: 3200, deposit: 3200, status: "Active", notes: "Two-year term." }
  ],
  maintenance: [
    { id: "m1", title: "HVAC blowing warm air", property: "Lakeview Townhome", tenant: "Marcus Reed", priority: "High", vendor: "CoolAir Pros", opened: "2026-05-24", cost: 420, status: "Scheduled", notes: "Technician booked for Friday morning." },
    { id: "m2", title: "Kitchen faucet leak", property: "Harbor Point 204", tenant: "Nina Patel", priority: "Medium", vendor: "Orlando Plumbing", opened: "2026-05-21", cost: 180, status: "In progress", notes: "Awaiting replacement cartridge." },
    { id: "m3", title: "Turnover paint", property: "Cypress Duplex A", tenant: "", priority: "Low", vendor: "BrightWall", opened: "2026-05-19", cost: 650, status: "Open", notes: "Quote requested." }
  ],
  reminders: [
    { id: "r1", title: "Send renewal offer", relatedTo: "Harbor Point 204", dueDate: "2026-05-30", owner: "Maya Chen", category: "Lease", status: "Due soon", notes: "Include 12 and 18 month terms." },
    { id: "r2", title: "Verify partial payment plan", relatedTo: "Nina Patel", dueDate: "2026-05-28", owner: "Jon Bell", category: "Payment", status: "Open", notes: "Confirm second installment date." },
    { id: "r3", title: "Annual smoke detector inspection", relatedTo: "Bayview Bungalow", dueDate: "2026-06-04", owner: "Maya Chen", category: "Inspection", status: "Open", notes: "Coordinate with tenant." }
  ],
  communications: [
    { id: "c1", subject: "Renewal interest", contact: "Nina Patel", property: "Harbor Point 204", channel: "Email", date: "2026-05-25", status: "Needs follow-up", notes: "Asked for renewal options with no rent increase if possible." },
    { id: "c2", subject: "HVAC appointment confirmed", contact: "CoolAir Pros", property: "Lakeview Townhome", channel: "Phone", date: "2026-05-26", status: "Logged", notes: "Vendor will call tenant 30 minutes ahead." },
    { id: "c3", subject: "May rent receipt", contact: "Avery Jordan", property: "Bayview Bungalow", channel: "Portal", date: "2026-05-01", status: "Closed", notes: "Receipt sent automatically." }
  ],
  contracts: [
    {
      id: "contract-sample",
      buyer: contractDefaults.sampleBuyer,
      price: 31000,
      initialDeposit: 2000,
      acceptanceDate: "2026-05-29",
      closingDate: "2026-06-22",
      createdAt: "2026-06-01"
    }
  ]
};

let state = loadState();
let activeSection = "dashboard";
let activeFilter = "All";
let editingId = null;

const els = {
  nav: document.querySelector("#sectionNav"),
  pageTitle: document.querySelector("#pageTitle"),
  sectionTitle: document.querySelector("#sectionTitle"),
  sectionSubtitle: document.querySelector("#sectionSubtitle"),
  metricsGrid: document.querySelector("#metricsGrid"),
  filterRow: document.querySelector("#filterRow"),
  contentArea: document.querySelector("#contentArea"),
  search: document.querySelector("#globalSearch"),
  addButton: document.querySelector("#addButton"),
  addLabel: document.querySelector("#addLabel"),
  seedButton: document.querySelector("#seedButton"),
  dialog: document.querySelector("#recordDialog"),
  form: document.querySelector("#recordForm"),
  formFields: document.querySelector("#formFields"),
  dialogTitle: document.querySelector("#dialogTitle"),
  dialogEyebrow: document.querySelector("#dialogEyebrow"),
  closeDialog: document.querySelector("#closeDialog"),
  cancelDialog: document.querySelector("#cancelDialog")
};

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return structuredClone(seedData);

  try {
    return { ...structuredClone(seedData), ...JSON.parse(stored) };
  } catch {
    return structuredClone(seedData);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  renderNav();
  renderMetrics();
  renderSection();
}

function renderNav() {
  els.nav.innerHTML = sections.map((section) => `
    <button class="nav-item ${section.id === activeSection ? "active" : ""}" type="button" data-section="${section.id}">
      <svg class="icon" aria-hidden="true"><use href="#icon-${section.icon}"></use></svg>
      ${section.label}
    </button>
  `).join("");
}

function renderMetrics() {
  const occupied = state.properties.filter((item) => item.status === "Occupied").length;
  const rentRoll = state.properties.reduce((sum, item) => sum + Number(item.rent || 0), 0);
  const latePayments = state.payments.filter((item) => ["Late", "Partial"].includes(item.status)).length;
  const openMaintenance = state.maintenance.filter((item) => item.status !== "Resolved").length;

  const metrics = [
    { label: "Occupancy", value: `${occupied}/${state.properties.length}`, note: "properties occupied", icon: "building" },
    { label: "Rent roll", value: money(rentRoll), note: "scheduled monthly rent", icon: "wallet" },
    { label: "Payment risk", value: latePayments, note: "late or partial payments", icon: "bell" },
    { label: "Open work", value: openMaintenance, note: "maintenance requests", icon: "tool" }
  ];

  els.metricsGrid.innerHTML = metrics.map((metric) => `
    <article class="metric-card">
      <div class="metric-top">
        <span>${metric.label}</span>
        <svg class="icon" aria-hidden="true"><use href="#icon-${metric.icon}"></use></svg>
      </div>
      <div class="metric-value">${metric.value}</div>
      <div class="metric-note">${metric.note}</div>
    </article>
  `).join("");
}

function renderSection() {
  const isDashboard = activeSection === "dashboard";
  const isContracts = activeSection === "contracts";
  const schema = schemas[activeSection];

  els.pageTitle.textContent = isDashboard ? "Dashboard" : isContracts ? "Contracts" : schema.title;
  els.sectionTitle.textContent = isDashboard ? "Dashboard" : isContracts ? "Land contract generator" : schema.title;
  els.sectionSubtitle.textContent = isDashboard
    ? "Current portfolio health and upcoming work."
    : isContracts
      ? "Create a print-ready vacant land contract draft from the sample defaults."
      : schema.subtitle;
  els.addButton.style.display = isDashboard || isContracts ? "none" : "inline-flex";
  els.addLabel.textContent = isDashboard || isContracts ? "Add record" : schema.addLabel;
  els.filterRow.innerHTML = "";

  if (isDashboard) {
    renderDashboard();
    return;
  }

  if (isContracts) {
    renderContracts();
    return;
  }

  renderFilters(schema);
  renderRecords(schema);
}

function renderFilters(schema) {
  els.filterRow.innerHTML = `
    <select id="statusFilter" aria-label="Filter by status">
      ${schema.filters.map((filter) => `<option ${filter === activeFilter ? "selected" : ""}>${filter}</option>`).join("")}
    </select>
  `;
}

function renderDashboard() {
  const search = els.search.value.trim().toLowerCase();
  const upcoming = [
    ...state.reminders.map((item) => ({ date: item.dueDate, title: item.title, meta: item.relatedTo, status: item.status })),
    ...state.leases.map((item) => ({ date: item.endDate, title: `Lease ends: ${item.tenant}`, meta: item.property, status: item.status })),
    ...state.maintenance.filter((item) => item.status !== "Resolved").map((item) => ({ date: item.opened, title: item.title, meta: item.property, status: item.status }))
  ]
    .filter((item) => textMatches(item, search))
    .sort((a, b) => new Date(a.date || "2099-12-31") - new Date(b.date || "2099-12-31"))
    .slice(0, 8);

  const paymentTotal = state.payments.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const collected = state.payments.filter((item) => item.status === "Paid").reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const maintenanceCost = state.maintenance.reduce((sum, item) => sum + Number(item.cost || 0), 0);

  els.contentArea.innerHTML = `
    <div class="dashboard-grid">
      <section class="insight-panel">
        <h3>Upcoming activity</h3>
        <div class="timeline">
          ${upcoming.length ? upcoming.map((item) => `
            <div class="timeline-item">
              <span class="date-chip">${dateLabel(item.date)}</span>
              <div>
                <strong>${escapeHtml(item.title)}</strong>
                <div class="record-meta">${escapeHtml(item.meta || "Portfolio")}</div>
              </div>
              ${statusPill(item.status)}
            </div>
          `).join("") : `<div class="empty-state">No matching activity.</div>`}
        </div>
      </section>
      <section class="insight-panel">
        <h3>Operating snapshot</h3>
        <div class="detail-list">
          <div class="detail-row"><span>Total scheduled payments</span><span>${money(paymentTotal)}</span></div>
          <div class="detail-row"><span>Collected</span><span>${money(collected)}</span></div>
          <div class="detail-row"><span>Open maintenance budget</span><span>${money(maintenanceCost)}</span></div>
          <div class="detail-row"><span>Active leases</span><span>${state.leases.filter((item) => item.status === "Active").length}</span></div>
          <div class="detail-row"><span>Open reminders</span><span>${state.reminders.filter((item) => item.status !== "Done").length}</span></div>
        </div>
      </section>
    </div>
  `;
}

function renderContracts() {
  const latest = state.contracts?.[state.contracts.length - 1] || {
    buyer: "",
    price: "",
    initialDeposit: contractDefaults.initialDeposit,
    acceptanceDate: todayInputValue(),
    closingDate: addDaysInputValue(21)
  };

  els.contentArea.innerHTML = `
    <div class="contract-builder">
      <section class="contract-panel">
        <h3>Contract inputs</h3>
        <form class="contract-form" id="contractForm">
          <div class="form-grid">
            <div class="field">
              <label for="contractBuyer">Buyer name</label>
              <input id="contractBuyer" name="buyer" type="text" value="${escapeHtml(latest.buyer)}" required>
            </div>
            <div class="field">
              <label for="contractPrice">Purchase price</label>
              <input id="contractPrice" name="price" type="number" min="0" step="100" value="${escapeHtml(latest.price)}" required>
            </div>
            <div class="field">
              <label for="contractDeposit">Initial deposit</label>
              <input id="contractDeposit" name="initialDeposit" type="number" min="0" step="100" value="${escapeHtml(latest.initialDeposit || contractDefaults.initialDeposit)}">
            </div>
            <div class="field">
              <label for="contractAcceptance">Acceptance deadline</label>
              <input id="contractAcceptance" name="acceptanceDate" type="date" value="${escapeHtml(latest.acceptanceDate || todayInputValue())}">
            </div>
            <div class="field">
              <label for="contractClosing">Closing date</label>
              <input id="contractClosing" name="closingDate" type="date" value="${escapeHtml(latest.closingDate || addDaysInputValue(21))}">
            </div>
          </div>
          <div class="contract-actions">
            <button class="primary-button" type="submit">
              <svg class="icon" aria-hidden="true"><use href="#icon-file"></use></svg>
              Generate draft
            </button>
            <button class="ghost-button" type="button" data-action="print-contract">
              <svg class="icon" aria-hidden="true"><use href="#icon-file"></use></svg>
              Print / Save PDF
            </button>
          </div>
        </form>

        <div class="default-box">
          <h3>Defaults from sample</h3>
          <div class="detail-list">
            <div class="detail-row"><span>Seller</span><span>${escapeHtml(contractDefaults.seller)}</span></div>
            <div class="detail-row"><span>Property</span><span>${escapeHtml(contractDefaults.propertyAddress)}</span></div>
            <div class="detail-row"><span>Escrow agent</span><span>${escapeHtml(contractDefaults.escrowName)}</span></div>
            <div class="detail-row"><span>Escrow contact</span><span>${escapeHtml(contractDefaults.escrowContact)}</span></div>
          </div>
        </div>
      </section>

      <section class="contract-preview-wrap">
        ${contractDraft(latest)}
      </section>
    </div>
  `;
}

function saveContractDraft(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form).entries());
  const draft = {
    id: crypto.randomUUID(),
    buyer: data.buyer.trim(),
    price: Number(data.price || 0),
    initialDeposit: Number(data.initialDeposit || contractDefaults.initialDeposit),
    acceptanceDate: data.acceptanceDate || todayInputValue(),
    closingDate: data.closingDate || addDaysInputValue(21),
    createdAt: todayInputValue()
  };

  state.contracts = [...(state.contracts || []), draft];
  saveState();
  renderContracts();
}

function contractDraft(contract) {
  const price = Number(contract.price || 0);
  const deposit = Number(contract.initialDeposit || contractDefaults.initialDeposit);
  const balance = Math.max(price - deposit, 0);
  const buyer = contract.buyer || "[Buyer name]";

  return `
    <article class="contract-preview" id="contractPreview">
      <div class="contract-watermark">Draft for review</div>
      <header class="contract-doc-head">
        <div>
          <p class="eyebrow">Vacant land contract draft</p>
          <h2>${escapeHtml(contractDefaults.propertyAddress)}</h2>
        </div>
        <div class="contract-id">Generated ${dateLabel(contract.createdAt || todayInputValue())}</div>
      </header>

      <p class="contract-disclaimer">
        This draft uses defaults read from the provided sample contract. It is intended for preparation and review, not as legal advice or a substitute for the official form.
      </p>

      <div class="contract-clause">
        <strong>1. Sale and purchase.</strong>
        <p>${escapeHtml(contractDefaults.seller)} ("Seller") and ${escapeHtml(buyer)} ("Buyer") agree to sell and buy the property described below on the terms in this draft.</p>
      </div>

      <div class="contract-grid">
        <div><span>Property address</span><strong>${escapeHtml(contractDefaults.propertyAddress)}</strong></div>
        <div><span>Legal description</span><strong>${escapeHtml(contractDefaults.legalDescription)}</strong></div>
        <div><span>Location</span><strong>${escapeHtml(contractDefaults.sectionTownshipRange)}</strong></div>
        <div><span>Real Property ID</span><strong>${escapeHtml(contractDefaults.propertyId)}</strong></div>
      </div>

      <div class="contract-clause">
        <strong>2. Purchase price and deposit.</strong>
        <table class="contract-table">
          <tbody>
            <tr><th>Purchase price</th><td>${money(price)}</td></tr>
            <tr><th>Initial deposit due within ${contractDefaults.depositDueDays} days after effective date</th><td>${money(deposit)}</td></tr>
            <tr><th>Balance to close, excluding buyer closing costs and prorations</th><td>${money(balance)}</td></tr>
          </tbody>
        </table>
      </div>

      <div class="contract-clause">
        <strong>3. Escrow agent.</strong>
        <div class="contract-grid">
          <div><span>Name</span><strong>${escapeHtml(contractDefaults.escrowName)}</strong></div>
          <div><span>Contact</span><strong>${escapeHtml(contractDefaults.escrowContact)}</strong></div>
          <div><span>Address</span><strong>${escapeHtml(contractDefaults.escrowAddress)}</strong></div>
          <div><span>Phone</span><strong>${escapeHtml(contractDefaults.escrowPhone)}</strong></div>
          <div><span>Email</span><strong>${escapeHtml(contractDefaults.escrowEmail)}</strong></div>
        </div>
      </div>

      <div class="contract-clause">
        <strong>4. Key dates.</strong>
        <table class="contract-table">
          <tbody>
            <tr><th>Acceptance deadline</th><td>${dateLabel(contract.acceptanceDate)}</td></tr>
            <tr><th>Closing date</th><td>${dateLabel(contract.closingDate)}</td></tr>
          </tbody>
        </table>
      </div>

      <div class="signature-grid">
        <div>
          <span>Buyer</span>
          <strong>${escapeHtml(buyer)}</strong>
          <div class="signature-line"></div>
          <small>Signature / Date</small>
        </div>
        <div>
          <span>Seller</span>
          <strong>${escapeHtml(contractDefaults.seller)}</strong>
          <div class="signature-line"></div>
          <small>Signature / Date</small>
        </div>
      </div>
    </article>
  `;
}

function renderRecords(schema) {
  const search = els.search.value.trim().toLowerCase();
  const records = state[activeSection]
    .filter((item) => activeFilter === "All" || item[schema.status] === activeFilter)
    .filter((item) => textMatches(item, search));

  if (!records.length) {
    els.contentArea.innerHTML = `<div class="empty-state">No matching records.</div>`;
    return;
  }

  els.contentArea.innerHTML = `
    <div class="data-grid">
      ${records.map((item) => recordCard(schema, item)).join("")}
    </div>
  `;
}

function recordCard(schema, item) {
  return `
    <article class="record-card">
      <div class="record-card-head">
        <div>
          <h3>${escapeHtml(item[schema.primary] || "Untitled")}</h3>
          <div class="record-meta">${escapeHtml(item[schema.secondary] || "")}</div>
        </div>
        ${statusPill(item[schema.status])}
      </div>
      <div class="detail-list">
        ${schema.details.map(([label, getter]) => `
          <div class="detail-row">
            <span>${label}</span>
            <span>${escapeHtml(valueFor(item, getter))}</span>
          </div>
        `).join("")}
      </div>
      <div class="card-actions">
        <button class="icon-button" type="button" aria-label="Edit" data-action="edit" data-id="${item.id}">
          <svg class="icon" aria-hidden="true"><use href="#icon-edit"></use></svg>
        </button>
        <button class="icon-button" type="button" aria-label="Delete" data-action="delete" data-id="${item.id}">
          <svg class="icon" aria-hidden="true"><use href="#icon-trash"></use></svg>
        </button>
      </div>
    </article>
  `;
}

function openRecordDialog(id = null) {
  const schema = schemas[activeSection];
  editingId = id;
  const item = id ? state[activeSection].find((record) => record.id === id) : {};

  els.dialogEyebrow.textContent = schema.title;
  els.dialogTitle.textContent = id ? `Edit ${schema.title.slice(0, -1).toLowerCase()}` : schema.addLabel;
  els.formFields.innerHTML = schema.fields.map((field) => formField(field, item?.[field.key])).join("");
  els.dialog.showModal();
}

function formField(field, value = "") {
  const id = `field-${field.key}`;
  const required = field.required ? "required" : "";
  const full = field.full ? " full" : "";
  const safeValue = escapeHtml(value ?? "");

  if (field.type === "select") {
    return `
      <div class="field${full}">
        <label for="${id}">${field.label}</label>
        <select id="${id}" name="${field.key}" ${required}>
          ${field.options.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}
        </select>
      </div>
    `;
  }

  if (field.type === "textarea") {
    return `
      <div class="field${full}">
        <label for="${id}">${field.label}</label>
        <textarea id="${id}" name="${field.key}" ${required}>${safeValue}</textarea>
      </div>
    `;
  }

  return `
    <div class="field${full}">
      <label for="${id}">${field.label}</label>
      <input id="${id}" name="${field.key}" type="${field.type}" value="${safeValue}" ${field.step ? `step="${field.step}"` : ""} ${required}>
    </div>
  `;
}

function saveRecord(event) {
  event.preventDefault();
  const schema = schemas[activeSection];
  const data = Object.fromEntries(new FormData(els.form).entries());

  schema.fields.forEach((field) => {
    if (field.type === "number") data[field.key] = data[field.key] === "" ? "" : Number(data[field.key]);
  });

  if (editingId) {
    state[activeSection] = state[activeSection].map((item) => item.id === editingId ? { ...item, ...data } : item);
  } else {
    state[activeSection].push({ id: crypto.randomUUID(), ...data });
  }

  saveState();
  els.dialog.close();
  render();
}

function deleteRecord(id) {
  state[activeSection] = state[activeSection].filter((item) => item.id !== id);
  saveState();
  render();
}

function valueFor(item, getter) {
  if (typeof getter === "function") return getter(item);
  return item[getter] || "None";
}

function statusPill(status = "None") {
  const danger = ["Late", "Emergency", "Overdue", "Maintenance", "Expiring"].includes(status);
  const warn = ["Partial", "Pending", "Turnover", "Scheduled", "In progress", "Due soon", "Needs follow-up", "Waiting", "Renewing", "Open"].includes(status);
  const neutral = ["Vacant", "Ended", "Closed", "Done", "Logged"].includes(status);
  const className = danger ? "danger" : warn ? "warn" : neutral ? "neutral" : "";
  return `<span class="status-pill ${className}">${escapeHtml(status)}</span>`;
}

function textMatches(item, search) {
  if (!search) return true;
  return Object.values(item).join(" ").toLowerCase().includes(search);
}

function money(value) {
  const number = Number(value || 0);
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(number);
}

function dateLabel(value) {
  if (!value) return "None";
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function daysUntil(value) {
  if (!value) return "None";
  const today = new Date();
  const target = new Date(`${value}T00:00:00`);
  today.setHours(0, 0, 0, 0);
  const days = Math.ceil((target - today) / 86400000);
  if (days < 0) return `${Math.abs(days)} days ago`;
  if (days === 0) return "Today";
  return `${days} days`;
}

function todayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

function addDaysInputValue(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function truncate(value = "", length = 32) {
  return value.length > length ? `${value.slice(0, length - 1)}...` : value || "None";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

els.nav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-section]");
  if (!button) return;
  activeSection = button.dataset.section;
  activeFilter = "All";
  render();
});

els.filterRow.addEventListener("change", (event) => {
  if (event.target.id === "statusFilter") {
    activeFilter = event.target.value;
    renderRecords(schemas[activeSection]);
  }
});

els.contentArea.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  if (button.dataset.action === "edit") openRecordDialog(button.dataset.id);
  if (button.dataset.action === "delete") deleteRecord(button.dataset.id);
  if (button.dataset.action === "print-contract") window.print();
});

els.contentArea.addEventListener("submit", (event) => {
  if (event.target.id === "contractForm") {
    saveContractDraft(event);
  }
});

els.addButton.addEventListener("click", () => openRecordDialog());
els.search.addEventListener("input", renderSection);
els.form.addEventListener("submit", saveRecord);
els.closeDialog.addEventListener("click", () => els.dialog.close());
els.cancelDialog.addEventListener("click", () => els.dialog.close());
els.seedButton.addEventListener("click", () => {
  state = structuredClone(seedData);
  saveState();
  render();
});

render();
