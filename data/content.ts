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
  {
    label: "Curriculum",
    href: "https://drive.google.com/file/d/1acFKPUKn3IfuKTrsrn7_KSB8xb589uy3/view?usp=drive_link",
  },
  {
    label: "Certificate of Program Compliance",
    href: null,
  },
  {
    label: "CMO 89 s2017. Policies, Standards, and Guidelines for BSGE",
    href: "https://drive.google.com/file/d/1Rfb4pU66pdkHTuA-iDAap6tG46dthJ8_/view?usp=drive_link",
  },
  {
    label: "AACCUP Technical Review Board Action (PSV)",
    href: "https://docs.google.com/document/d/1xlQVlIEjbr59DykfKZv19DgTEbjna4-E/edit?usp=drive_link&ouid=105820422174942162354&rtpof=true&sd=true",
  },
];

// Each item becomes a card on the home page and its own page at /area/[id]
export const areas = [
  {
    id: 1,
    title: "Vision, Mission, Goals, and Objectives",
    summary: "The program's vision, mission, goals, and objectives.",
    body: "This area presents the vision, mission, goals, and objectives of the BSGE program.",
    driveUrl: "https://drive.google.com/drive/folders/1ynPX1ha2oNRYW-lz5EBxcXgyfwj8RHSE?usp=drive_link",
  },
  {
    id: 2,
    title: "Faculty",
    summary: "Faculty information and resources for the program.",
    body: "This area contains faculty-related information and supporting resources.",
    driveUrl: "https://drive.google.com/drive/folders/1IYktzCpqUL_WsuNKBYOvoWC81STJ2YE5?usp=drive_link",
  },
  {
    id: 3,
    title: "Curriculum",
    summary: "Curriculum and instructional information for BSGE.",
    body: "This area contains curriculum and instructional materials and documents.",
    driveUrl: "https://drive.google.com/drive/folders/1r4BJz9kO4tsyfXX-mlfz_Hxq1OgYUSGJ?usp=drive_link",
  },
  {
    id: 4,
    title: "Students",
    summary: "Student-related information, services, and resources.",
    body: "This area contains student-related information and supporting documents.",
    driveUrl: "https://drive.google.com/drive/folders/1QA2LVU5bwNSQ2jnRm7_2KHhZ--Sux1kY?usp=drive_link",
    parameters: [
      {
        letter: "A",
        title: "Student Services Program (SSP)",
        items: ["SYSTEM. Inputs and Processes", "Implementation", "Outcomes"],
      },
      {
        letter: "B",
        title: "Student Welfare",
        items: ["SYSTEM. Inputs and Processes", "Implementation", "Outcomes"],
      },
      {
        letter: "C",
        title: "Student Development",
        items: ["SYSTEM. Inputs and Processes", "Implementation", "Outcomes"],
      },
      {
        letter: "D",
        title: "Institutional Student Programs and Services",
        items: ["SYSTEM. Inputs and Processes", "Implementation", "Outcomes"],
      },
      {
        letter: "E",
        title: "Research, Monitoring and Evaluation",
        items: ["SYSTEM. Inputs and Processes", "Implementation", "Outcomes"],
      },
    ],
  },
  {
    id: 5,
    title: "Research",
    summary: "Research activities, outputs, and supporting documents.",
    body: "This area contains research-related information and supporting resources.",
    driveUrl: "https://drive.google.com/drive/folders/1yps6qyib_uu9HJVVgRxys4Xn_Yy60zve?usp=sharing",
  },
  {
    id: 6,
    title: "Extension",
    summary: "Extension programs, activities, and community engagement.",
    body: "This area contains extension-related information and supporting documents.",
    driveUrl: "https://drive.google.com/drive/folders/1Rc1OWWgTJlVEBkyN-fFb18vEEmd1SoeH?usp=drive_link",
  },
  {
    id: 7,
    title: "Library",
    summary: "Library resources and information supporting the BSGE program.",
    body: "This area contains library-related information and supporting resources.",
    driveUrl: "https://drive.google.com/drive/folders/19PNbMSPon6HPU9j-gGM27aCwWbYoijOl?usp=drive_link",
  },
  {
    id: 8,
    title: "Facilities",
    summary: "Facilities, physical resources, and learning spaces.",
    body: "This area contains information and documents related to program facilities.",
    driveUrl: "https://drive.google.com/drive/folders/1eBDhM91N_t4ml9HkoepwRQEe4SHWhu65?usp=drive_link",
  },
  {
    id: 9,
    title: "Laboratories",
    summary: "Laboratory resources and facilities supporting instruction.",
    body: "This area contains laboratory-related information and supporting documents.",
    driveUrl: "https://drive.google.com/drive/folders/1PoQRhWvGIlUyWGvki_wpejqyBFX0BMFq?usp=drive_link",
  },
  {
    id: 10,
    title: "Administration",
    summary: "Administrative information and supporting program documents.",
    body: "This area contains administrative information and supporting resources.",
    driveUrl: "https://drive.google.com/drive/folders/1A3hrsecFq5JmXUVFxuuXWg4aphSMdav-?usp=drive_link",
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
  { title: "Directory of Accreditation Task Force", subtitle: "General Information", href: "https://docs.google.com/document/d/1xlQVlIEjbr59DykfKZv19DgTEbjna4-E/edit?usp=drive_link&ouid=105820422174942162354&rtpof=true&sd=true", icon: "users" },
  { title: "Reference Files", subtitle: "Resources", icon: "folder", dropdown: true },
  { title: "AACCUP Additional Documents", subtitle: "Provided Documents per Areas", href: "#", icon: "folderCheck" },
];
