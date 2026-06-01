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
  section: "04",
  township: "44",
  range: "23",
  county: "Lee",
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

const escrowPresets = [
  {
    id: "landsel",
    label: "Landsel Title Agency, Inc.",
    name: "Landsel Title Agency, Inc.",
    contact: "Amanda Wilkins",
    address: "3208 Chiquita Blvd S #215, Cape Coral, FL 33914",
    phone: "239.205.6373 Ext. 105",
    email: "awilkins@landsel.com"
  }
];

const contractTemplate = {
  url: "assets/vacant-land-contract-2026.pdf",
  fields: {
    seller: "text_1enan",
    buyer: "text_2dgam",
    propertyAddress: "text_3mnym",
    legalDescription: "text_4hpgt",
    legalDescription2: "text_5uwht",
    legalDescription3: "text_6uxzp",
    legalDescription4: "text_7rnlw",
    legalDescription5: "text_8ivmr",
    section: "text_9trdb",
    township: "text_10xcwb",
    range: "text_11kdus",
    county: "text_12xjvp",
    propertyId: "text_13gsqo",
    purchasePrice: "text_16grdw",
    escrowName: "text_17mjev",
    escrowContact: "text_18ezjq",
    escrowAddress: "text_19arbb",
    escrowPhone: "text_20oxyx",
    escrowEmail: "text_21el",
    depositDueDays: "text_22dgln",
    initialDeposit: "text_28ezwn",
    balanceToClose: "text_32uwyq",
    acceptanceDate: "text_34yeni",
    closingDate: "text_35brqq",
    initialDepositToEscrow: "checkbox_185cimt",
    unitLot: "checkbox_181meaq",
    checkboxes: {
      financingCash: "checkbox_177tvld",
      financingContingent: "checkbox_176prqq",
      newFinancing: "checkbox_175secp",
      fixedRate: "checkbox_174eeiw",
      adjustableRate: "checkbox_173hjds",
      sellerFinancing: "checkbox_172eazw",
      sellerFinancingFirst: "checkbox_171pvzi",
      sellerFinancingSecond: "checkbox_170swhk",
      mortgageAssumption: "checkbox_169claa",
      taxesInsurance: "checkbox_168otlv",
      assumptionFixed: "checkbox_167fksk",
      assumptionOther: "checkbox_166stjl",
      assumptionWillEscalate: "checkbox_165nit",
      assumptionWillNotEscalate: "checkbox_164amxq",
      assignReleased: "checkbox_161zjak",
      assignNotReleased: "checkbox_160dwlp",
      assignNotAllowed: "checkbox_163xyvc",
      statutoryWarrantyDeed: "checkbox_162emgn",
      specialWarrantyDeed: "checkbox_159ztke",
      otherDeed: "checkbox_158vrdw",
      titleEvidenceSeller: "checkbox_155ojkr",
      titleEvidenceBuyer: "checkbox_156vxqy",
      titleEvidenceWithin: "checkbox_154ctjl",
      titleEvidenceAtLeast: "checkbox_157cpro",
      titleCommitment: "checkbox_153woyh",
      abstractTitle: "checkbox_152wwcd",
      dueDiligencePeriod: "checkbox_151jtpd",
      noDueDiligence: "checkbox_150kqfz",
      ccclWaiver: "checkbox_149akxm",
      assessmentSeller: "checkbox_148niog",
      assessmentBuyer: "checkbox_147endp",
      addendaBackup: "checkbox_146yhcp",
      addendaKickOut: "checkbox_145fgwq",
      addendaHoa: "checkbox_144kri",
      addendaOther: "checkbox_143grdt"
    }
  },
  checkedValue: "/Yes_figa"
};

const contractCheckboxGroups = [
  {
    key: "financingMain",
    label: "6. Financing",
    options: [
      ["", "Leave blank"],
      ["financingCash", "Buyer will pay cash; no financing contingency"],
      ["financingContingent", "Contract is contingent on buyer obtaining financing"]
    ]
  },
  {
    key: "financingType",
    label: "6(1)-(3). Financing type",
    options: [
      ["", "Leave blank"],
      ["newFinancing", "New financing"],
      ["sellerFinancing", "Seller financing"],
      ["mortgageAssumption", "Mortgage assumption"]
    ]
  },
  {
    key: "financingRate",
    label: "6(1). Interest rate",
    options: [
      ["", "Leave blank"],
      ["fixedRate", "Fixed rate"],
      ["adjustableRate", "Adjustable / prevailing interest rate"]
    ]
  },
  {
    key: "sellerFinancingPriority",
    label: "6(2). Seller financing priority",
    options: [
      ["", "Leave blank"],
      ["sellerFinancingFirst", "First purchase money note and mortgage"],
      ["sellerFinancingSecond", "Second purchase money note and mortgage"]
    ]
  },
  {
    key: "mortgageAssumptionCosts",
    label: "6(3). Mortgage assumption costs",
    options: [
      ["", "Leave blank"],
      ["taxesInsurance", "Includes taxes and insurance"]
    ]
  },
  {
    key: "mortgageAssumptionRate",
    label: "6(3). Assumption rate",
    options: [
      ["", "Leave blank"],
      ["assumptionFixed", "Fixed"],
      ["assumptionOther", "Other"]
    ]
  },
  {
    key: "mortgageEscalation",
    label: "6(3). Escalation",
    options: [
      ["", "Leave blank"],
      ["assumptionWillEscalate", "Will escalate"],
      ["assumptionWillNotEscalate", "Will not escalate"]
    ]
  },
  {
    key: "assignability",
    label: "7. Assignability",
    options: [
      ["", "Leave blank"],
      ["assignReleased", "May assign and be released from liability"],
      ["assignNotReleased", "May assign but not be released"],
      ["assignNotAllowed", "May not assign"]
    ]
  },
  {
    key: "deedType",
    label: "8. Deed type",
    options: [
      ["", "Leave blank"],
      ["statutoryWarrantyDeed", "Statutory warranty deed"],
      ["specialWarrantyDeed", "Special warranty deed"],
      ["otherDeed", "Other deed"]
    ]
  },
  {
    key: "titleEvidencePayer",
    label: "8(a). Title evidence expense",
    options: [
      ["", "Leave blank"],
      ["titleEvidenceSeller", "Seller's expense"],
      ["titleEvidenceBuyer", "Buyer's expense"]
    ]
  },
  {
    key: "titleEvidenceTiming",
    label: "8(a). Title evidence timing",
    options: [
      ["", "Leave blank"],
      ["titleEvidenceWithin", "Within set days after effective date"],
      ["titleEvidenceAtLeast", "At least set days before closing"]
    ]
  },
  {
    key: "titleEvidenceType",
    label: "8(a). Title evidence type",
    options: [
      ["", "Leave blank"],
      ["titleCommitment", "Title insurance commitment"],
      ["abstractTitle", "Abstract of title"]
    ]
  },
  {
    key: "inspectionPeriod",
    label: "9(a). Inspections",
    options: [
      ["", "Leave blank"],
      ["dueDiligencePeriod", "Due diligence period"],
      ["noDueDiligence", "No due diligence period"]
    ]
  },
  {
    key: "ccclWaiver",
    label: "9(d). Coastal construction control line",
    options: [
      ["", "Leave blank"],
      ["ccclWaiver", "Buyer waives CCCL affidavit or survey"]
    ]
  },
  {
    key: "specialAssessments",
    label: "10(d). Special assessment installments",
    options: [
      ["", "Buyer if left blank"],
      ["assessmentSeller", "Seller pays installments due after closing"],
      ["assessmentBuyer", "Buyer pays installments due after closing"]
    ]
  },
  {
    key: "addenda",
    label: "22. Addenda",
    options: [
      ["", "No addenda selected"],
      ["addendaBackup", "A. Back-up Contract"],
      ["addendaKickOut", "B. Kick Out Clause"],
      ["addendaHoa", "C. HOA Addendum"],
      ["addendaOther", "D. Other"]
    ]
  }
];

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
      propertyAddress: contractDefaults.propertyAddress,
      legalDescription: contractDefaults.legalDescription,
      section: contractDefaults.section,
      township: contractDefaults.township,
      range: contractDefaults.range,
      county: contractDefaults.county,
      sectionTownshipRange: contractDefaults.sectionTownshipRange,
      propertyId: contractDefaults.propertyId,
      initialDeposit: 2000,
      acceptanceDate: "2026-05-29",
      closingDate: "2026-06-22",
      escrowPreset: "landsel",
      escrowName: contractDefaults.escrowName,
      escrowContact: contractDefaults.escrowContact,
      escrowAddress: contractDefaults.escrowAddress,
      escrowPhone: contractDefaults.escrowPhone,
      escrowEmail: contractDefaults.escrowEmail,
      checkboxChoices: {},
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
    propertyAddress: contractDefaults.propertyAddress,
    legalDescription: contractDefaults.legalDescription,
    section: contractDefaults.section,
    township: contractDefaults.township,
    range: contractDefaults.range,
    county: contractDefaults.county,
    sectionTownshipRange: contractDefaults.sectionTownshipRange,
    propertyId: contractDefaults.propertyId,
    initialDeposit: contractDefaults.initialDeposit,
    acceptanceDate: todayInputValue(),
    closingDate: addDaysInputValue(21),
    escrowPreset: "landsel",
    escrowName: contractDefaults.escrowName,
    escrowContact: contractDefaults.escrowContact,
    escrowAddress: contractDefaults.escrowAddress,
    escrowPhone: contractDefaults.escrowPhone,
    escrowEmail: contractDefaults.escrowEmail,
    checkboxChoices: {}
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
            <div class="field full">
              <label for="contractPropertyAddress">Contract property address</label>
              <input id="contractPropertyAddress" name="propertyAddress" type="text" value="${escapeHtml(contractValue(latest, "propertyAddress"))}" required>
            </div>
            <div class="field">
              <label for="contractPropertyId">Real Property ID</label>
              <input id="contractPropertyId" name="propertyId" type="text" value="${escapeHtml(contractValue(latest, "propertyId"))}">
              <span class="field-help">Use this for MLS or county lookup when connected to a property data source.</span>
            </div>
            <div class="field full">
              <label for="contractLegalDescription">Legal description</label>
              <textarea id="contractLegalDescription" name="legalDescription">${escapeHtml(contractValue(latest, "legalDescription"))}</textarea>
            </div>
            <div class="field">
              <label for="contractSection">Section</label>
              <input id="contractSection" name="section" type="text" value="${escapeHtml(contractValue(latest, "section"))}">
            </div>
            <div class="field">
              <label for="contractTownship">Township</label>
              <input id="contractTownship" name="township" type="text" value="${escapeHtml(contractValue(latest, "township"))}">
            </div>
            <div class="field">
              <label for="contractRange">Range</label>
              <input id="contractRange" name="range" type="text" value="${escapeHtml(contractValue(latest, "range"))}">
            </div>
            <div class="field">
              <label for="contractCounty">County</label>
              <input id="contractCounty" name="county" type="text" value="${escapeHtml(contractValue(latest, "county"))}">
            </div>
            <div class="field full">
              <label for="contractLocation">Location summary</label>
              <input id="contractLocation" name="sectionTownshipRange" type="text" value="${escapeHtml(locationSummary(latest))}">
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
            <div class="field full">
              <label for="escrowPreset">Escrow agent</label>
              <input id="escrowPreset" name="escrowName" list="escrowAgentOptions" value="${escapeHtml(contractEscrowValue(latest, "escrowName"))}">
              <datalist id="escrowAgentOptions">
                ${escrowPresets.map((preset) => `<option value="${escapeHtml(preset.name)}">${escapeHtml(preset.label)}</option>`).join("")}
              </datalist>
              <span class="field-help">Choose Landsel or type a custom escrow agent.</span>
            </div>
            <div class="field">
              <label for="escrowContact">Escrow contact</label>
              <input id="escrowContact" name="escrowContact" type="text" value="${escapeHtml(contractEscrowValue(latest, "escrowContact"))}">
            </div>
            <div class="field">
              <label for="escrowPhone">Escrow phone</label>
              <input id="escrowPhone" name="escrowPhone" type="text" value="${escapeHtml(contractEscrowValue(latest, "escrowPhone"))}">
            </div>
            <div class="field full">
              <label for="escrowAddress">Escrow address</label>
              <input id="escrowAddress" name="escrowAddress" type="text" value="${escapeHtml(contractEscrowValue(latest, "escrowAddress"))}">
            </div>
            <div class="field full">
              <label for="escrowEmail">Escrow email</label>
              <input id="escrowEmail" name="escrowEmail" type="email" value="${escapeHtml(contractEscrowValue(latest, "escrowEmail"))}">
            </div>
          </div>

          <section class="template-options">
            <h3>Template checkbox choices</h3>
            <div class="form-grid">
              ${contractCheckboxGroups.map((group) => checkboxChoiceControl(group, latest)).join("")}
            </div>
          </section>

          <div class="contract-actions">
            <button class="primary-button" type="submit">
              <svg class="icon" aria-hidden="true"><use href="#icon-file"></use></svg>
              Generate draft
            </button>
            <button class="ghost-button" type="button" data-action="print-contract">
              <svg class="icon" aria-hidden="true"><use href="#icon-file"></use></svg>
              Print / Save PDF
            </button>
            <button class="ghost-button" type="button" data-action="download-template-contract">
              <svg class="icon" aria-hidden="true"><use href="#icon-file"></use></svg>
              Download template PDF
            </button>
          </div>
        </form>

        <div class="default-box">
          <h3>Defaults from sample</h3>
          <div class="detail-list">
            <div class="detail-row"><span>Seller</span><span>${escapeHtml(contractDefaults.seller)}</span></div>
            <div class="detail-row"><span>Sample property</span><span>${escapeHtml(contractDefaults.propertyAddress)}</span></div>
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

function checkboxChoiceControl(group, contract) {
  const selected = contract?.checkboxChoices?.[group.key] || "";

  return `
    <div class="field full">
      <label for="choice-${group.key}">${escapeHtml(group.label)}</label>
      <select id="choice-${group.key}" name="${escapeHtml(group.key)}">
        ${group.options.map(([value, label]) => `
          <option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>
        `).join("")}
      </select>
    </div>
  `;
}

function applyEscrowPresetFromName(name) {
  const preset = escrowPresets.find((item) => item.name === name);
  if (!preset) return;

  const updates = {
    escrowContact: preset.contact,
    escrowPhone: preset.phone,
    escrowAddress: preset.address,
    escrowEmail: preset.email
  };

  Object.entries(updates).forEach(([fieldName, value]) => {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) field.value = value;
  });
}

function saveContractDraft(event) {
  event.preventDefault();
  const draft = draftFromContractForm(event.target);

  state.contracts = [...(state.contracts || []), draft];
  saveState();
  renderContracts();
}

function draftFromContractForm(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const section = data.section.trim() || contractDefaults.section;
  const township = data.township.trim() || contractDefaults.township;
  const range = data.range.trim() || contractDefaults.range;
  const county = data.county.trim() || contractDefaults.county;
  const checkboxChoices = Object.fromEntries(
    contractCheckboxGroups.map((group) => [group.key, data[group.key] || ""])
  );

  return {
    id: crypto.randomUUID(),
    buyer: data.buyer.trim(),
    price: Number(data.price || 0),
    propertyAddress: data.propertyAddress.trim() || contractDefaults.propertyAddress,
    legalDescription: data.legalDescription.trim() || contractDefaults.legalDescription,
    section,
    township,
    range,
    county,
    sectionTownshipRange: data.sectionTownshipRange.trim() || makeLocationSummary(section, township, range, county),
    propertyId: data.propertyId.trim() || contractDefaults.propertyId,
    initialDeposit: Number(data.initialDeposit || contractDefaults.initialDeposit),
    acceptanceDate: data.acceptanceDate || todayInputValue(),
    closingDate: data.closingDate || addDaysInputValue(21),
    escrowName: data.escrowName.trim() || contractDefaults.escrowName,
    escrowContact: data.escrowContact.trim() || contractDefaults.escrowContact,
    escrowAddress: data.escrowAddress.trim() || contractDefaults.escrowAddress,
    escrowPhone: data.escrowPhone.trim() || contractDefaults.escrowPhone,
    escrowEmail: data.escrowEmail.trim() || contractDefaults.escrowEmail,
    checkboxChoices,
    createdAt: todayInputValue()
  };
}

function contractDraft(contract) {
  const price = Number(contract.price || 0);
  const deposit = Number(contract.initialDeposit || contractDefaults.initialDeposit);
  const balance = Math.max(price - deposit, 0);
  const buyer = contract.buyer || "[Buyer name]";
  const propertyAddress = contractValue(contract, "propertyAddress");
  const legalDescription = contractValue(contract, "legalDescription");
  const sectionTownshipRange = locationSummary(contract);
  const propertyId = contractValue(contract, "propertyId");
  const escrowName = contractEscrowValue(contract, "escrowName");
  const escrowContact = contractEscrowValue(contract, "escrowContact");
  const escrowAddress = contractEscrowValue(contract, "escrowAddress");
  const escrowPhone = contractEscrowValue(contract, "escrowPhone");
  const escrowEmail = contractEscrowValue(contract, "escrowEmail");

  return `
    <article class="contract-preview" id="contractPreview">
      <div class="contract-watermark">Draft for review</div>
      <header class="contract-doc-head">
        <div>
          <p class="eyebrow">Vacant land contract draft</p>
          <h2>${escapeHtml(propertyAddress)}</h2>
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
        <div><span>Property address</span><strong>${escapeHtml(propertyAddress)}</strong></div>
        <div><span>Legal description</span><strong>${escapeHtml(legalDescription)}</strong></div>
        <div><span>Location</span><strong>${escapeHtml(sectionTownshipRange)}</strong></div>
        <div><span>Real Property ID</span><strong>${escapeHtml(propertyId)}</strong></div>
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
          <div><span>Name</span><strong>${escapeHtml(escrowName)}</strong></div>
          <div><span>Contact</span><strong>${escapeHtml(escrowContact)}</strong></div>
          <div><span>Address</span><strong>${escapeHtml(escrowAddress)}</strong></div>
          <div><span>Phone</span><strong>${escapeHtml(escrowPhone)}</strong></div>
          <div><span>Email</span><strong>${escapeHtml(escrowEmail)}</strong></div>
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

async function downloadTemplateContract() {
  const form = document.querySelector("#contractForm");
  if (!form) return;
  if (!window.PDFLib) {
    alert("The PDF generator did not load. Refresh the page and try again.");
    return;
  }

  const draft = draftFromContractForm(form);
  const bytes = await fillTemplatePdf(draft);
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = safeFileName(`${draft.propertyAddress} - vacant land contract.pdf`);
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function fillTemplatePdf(contract) {
  const { PDFDocument } = window.PDFLib;
  const templateBytes = await fetch(contractTemplate.url).then((response) => {
    if (!response.ok) throw new Error("Unable to load contract template PDF.");
    return response.arrayBuffer();
  });
  const pdfDoc = await PDFDocument.load(templateBytes);
  const form = pdfDoc.getForm();
  const price = Number(contract.price || 0);
  const deposit = Number(contract.initialDeposit || contractDefaults.initialDeposit);
  const balance = Math.max(price - deposit, 0);

  setPdfText(form, contractTemplate.fields.seller, contractDefaults.seller);
  setPdfText(form, contractTemplate.fields.buyer, contract.buyer);
  setPdfText(form, contractTemplate.fields.propertyAddress, contract.propertyAddress);
  setLongLegalDescription(form, contract.legalDescription);
  setPdfText(form, contractTemplate.fields.section, contract.section);
  setPdfText(form, contractTemplate.fields.township, contract.township);
  setPdfText(form, contractTemplate.fields.range, contract.range);
  setPdfText(form, contractTemplate.fields.county, contract.county);
  setPdfText(form, contractTemplate.fields.propertyId, contract.propertyId);
  setPdfText(form, contractTemplate.fields.purchasePrice, moneyWithCents(price));
  setPdfText(form, contractTemplate.fields.escrowName, contractEscrowValue(contract, "escrowName"));
  setPdfText(form, contractTemplate.fields.escrowContact, contractEscrowValue(contract, "escrowContact"));
  setPdfText(form, contractTemplate.fields.escrowAddress, contractEscrowValue(contract, "escrowAddress"));
  setPdfText(form, contractTemplate.fields.escrowPhone, contractEscrowValue(contract, "escrowPhone"));
  setPdfText(form, contractTemplate.fields.escrowEmail, contractEscrowValue(contract, "escrowEmail"));
  setPdfText(form, contractTemplate.fields.depositDueDays, String(contractDefaults.depositDueDays));
  setPdfText(form, contractTemplate.fields.initialDeposit, moneyWithCents(deposit));
  setPdfText(form, contractTemplate.fields.balanceToClose, moneyWithCents(balance));
  setPdfText(form, contractTemplate.fields.acceptanceDate, dateInputToContractDate(contract.acceptanceDate));
  setPdfText(form, contractTemplate.fields.closingDate, `ON OR BEFORE ${dateInputToContractDate(contract.closingDate)}`);
  setPdfRadio(form, contractTemplate.fields.initialDepositToEscrow);
  setPdfRadio(form, contractTemplate.fields.unitLot);
  applyContractCheckboxChoices(form, contract.checkboxChoices);
  form.updateFieldAppearances();
  return pdfDoc.save();
}

function applyContractCheckboxChoices(form, checkboxChoices = {}) {
  const choices = new Set(Object.values(checkboxChoices).filter(Boolean));
  choices.forEach((choice) => {
    const fieldName = contractTemplate.fields.checkboxes[choice];
    if (fieldName) setPdfRadio(form, fieldName);
  });
}

function setPdfText(form, fieldName, value) {
  const field = form.getTextField(fieldName);
  field.setText(String(value || ""));
}

function setPdfRadio(form, fieldName) {
  try {
    form.getRadioGroup(fieldName).select(contractTemplate.checkedValue);
  } catch {
    try {
      form.getCheckBox(fieldName).check();
    } catch {
      // Some Form Simplicity checkbox exports are single-option radio groups.
    }
  }
}

function setLongLegalDescription(form, value) {
  const lines = wrapText(String(value || ""), 62, 5);
  const fields = [
    contractTemplate.fields.legalDescription,
    contractTemplate.fields.legalDescription2,
    contractTemplate.fields.legalDescription3,
    contractTemplate.fields.legalDescription4,
    contractTemplate.fields.legalDescription5
  ];

  fields.forEach((fieldName, index) => setPdfText(form, fieldName, lines[index] || ""));
}

function wrapText(value, maxLength, maxLines) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });

  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines[maxLines - 1] = `${lines.slice(maxLines - 1).join(" ")}`;
  }
  return lines.slice(0, maxLines);
}

function dateInputToContractDate(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${month}/${day}/${year}`;
}

function contractValue(contract, key) {
  return contract?.[key] || contractDefaults[key] || "";
}

function contractEscrowValue(contract, key) {
  return contract?.[key] || contractDefaults[key] || "";
}

function locationSummary(contract) {
  return contract?.sectionTownshipRange || makeLocationSummary(
    contractValue(contract, "section"),
    contractValue(contract, "township"),
    contractValue(contract, "range"),
    contractValue(contract, "county")
  );
}

function makeLocationSummary(section, township, range, county) {
  return `SEC ${section} / TWP ${township} / RNG ${range} of ${county} County, Florida`;
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

function moneyWithCents(value) {
  const number = Number(value || 0);
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
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

function safeFileName(value) {
  return String(value || "contract.pdf").replace(/[\\/:*?"<>|]+/g, "-").replace(/\s+/g, " ").trim();
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
  if (button.dataset.action === "download-template-contract") downloadTemplateContract();
});

els.contentArea.addEventListener("submit", (event) => {
  if (event.target.id === "contractForm") {
    saveContractDraft(event);
  }
});

els.contentArea.addEventListener("change", (event) => {
  if (event.target.name === "escrowName") {
    applyEscrowPresetFromName(event.target.value);
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
