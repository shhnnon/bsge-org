export const site = {
     headerTitle: "Geodetic Engineering",
   headerSubtitle: "Alangilan Campus",
  orgShort: "BSGE",
  university: "BATANGAS STATE UNIVERSITY",
  tagline: "The National Engineering University",
  campus: "Alangilan Campus",
  programLine: "Bachelor of Science in",
  program: "Geodetic Engineering", 
  mottos: ["Leading Innovation", "Transforming Lives", "Building The Nation"],
  email: "gepsc.alangilan@g.batstate-u.edu.ph",
  universityUrl: "https://batstateu.edu.ph/",
};

// Buttons under the hero
export const heroLinks = [
  { label: "Program of Activities", href: "/activity" },
  { label: "Officers Directory", href: "#" },
];

// Links to Google Drive files, docs, etc.
export const referenceFiles = [
  { label: "Curriculum", href: "#" },
  { label: "Constitution and By-Laws", href: "#" },
  { label: "Membership Form", href: "#" },
];

// Each item becomes a card on the home page and its own page at /area/[id]
export const areas = [
  {
    id: 1,
    title: "About the Organization",
    summary: "Who we are, our vision, mission, and goals.",
    body: "Write the full text for this section here.",
  },
  {
    id: 2,
    title: "Officers",
    summary: "Meet the officers leading BSGE this year.",
    body: "List your officers here.",
  },
  {
    id: 3,
    title: "Events and Activities",
    summary: "Seminars, field work, and org events.",
    body: "Describe your events here.",
  },
  {
    id: 4,
    title: "Membership",
    summary: "How to join and what members get.",
    body: "Explain how to join here.",
  },
];

// Shown at /activity
export const activities = [
  { date: "TBA", title: "General Assembly", note: "Add details here." },
  { date: "TBA", title: "Field Survey Workshop", note: "Add details here." },
];

// Optional: paste a Google Drive PDF preview link (must end in /preview), or leave ""
export const embedPdf = "";
// The 4 cards. icon can be: book, users, folder, folderCheck
export const quickLinks = [
  { title: "Program of Activities", subtitle: "General Information", href: "/activity", icon: "book" },
  { title: "Directory of Officers", subtitle: "General Information", href: "#", icon: "users" },
  { title: "Reference Files", subtitle: "Resources", icon: "folder", dropdown: true },
  { title: "Additional Documents", subtitle: "Provided Documents", href: "#", icon: "folderCheck" },
];
