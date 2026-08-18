import Box from "@mui/material/Box";

const EXPERIENCES = [
  // Hidden for now — flip `hidden` to false to publish this entry again.
  {
    company: "BlackRock",
    role: "Global Capital Markets - Trading",
    date: "Incoming Summer 2027 Analyst",
    logo: "/Images/blackrock_logo.png",
    logoAlt: "BlackRock Logo",
    hidden: true,
  },
  {
    company: "Wellington Management",
    role: "Global Risk and Analytics Co-op",
    date: "Spring 2026 Co-op",
    logo: "/Images/wellington_management_logo.jpeg",
    logoAlt: "Wellington Management Logo",
  },
  {
    company: "Zeal IT Consultants",
    role: "Frontend Developer Intern",
    date: "May 2025 - August 2025",
    logo: "/Images/zeal.png",
    logoAlt: "Zeal IT Consultants Logo",
  },
];

const VISIBLE_EXPERIENCES = EXPERIENCES.filter((entry) => !entry.hidden);

const listSx = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  paddingTop: "var(--space-sm)",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
};

const entrySx = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: "48px 1fr",
  columnGap: "var(--space-md)",
  alignItems: "start",
  paddingBottom: "var(--space-xl)",
  "&:last-of-type": {
    paddingBottom: 0,
  },
  /* Connecting rail between timeline nodes */
  "&:not(:last-of-type)::after": {
    content: '""',
    position: "absolute",
    left: "23.5px",
    top: "56px",
    bottom: "8px",
    width: "1px",
    backgroundColor: "var(--border-color)",
  },
  "@media (min-width: 640px)": {
    columnGap: "var(--space-lg)",
  },
};

const logoSx = {
  width: "48px",
  height: "48px",
  objectFit: "contain",
  display: "block",
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border-color)",
  borderRadius: "var(--radius-md)",
};

const textSx = {
  minWidth: 0,
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateAreas: '"company" "role" "date"',
  rowGap: "6px",
  "@media (min-width: 640px)": {
    gridTemplateColumns: "1fr auto",
    gridTemplateAreas: '"company date" "role role"',
    columnGap: "var(--space-md)",
    alignItems: "baseline",
  },
};

const companySx = {
  gridArea: "company",
  margin: 0,
  fontSize: "1.0625rem",
  fontWeight: 600,
  letterSpacing: "-0.02em",
  lineHeight: 1.2,
  color: "var(--text-primary)",
};

const roleSx = {
  gridArea: "role",
  margin: 0,
  fontSize: "1rem",
  fontWeight: 600,
  lineHeight: 1.5,
  color: "var(--text-secondary)",
};

const dateSx = {
  gridArea: "date",
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--space-sm)",
  fontSize: "0.8125rem",
  fontWeight: 500,
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  lineHeight: 1.6,
  color: "var(--text-secondary)",
  "&::before": {
    content: '""',
    width: "12px",
    height: "1px",
    flexShrink: 0,
    backgroundColor: "var(--accent-brand, #d4a24e)",
  },
};

export default function WorkExperience() {
  return (
    <Box component="ul" sx={listSx}>
      {VISIBLE_EXPERIENCES.map((entry) => (
        <Box component="li" key={entry.company} sx={entrySx}>
          <Box
            component="img"
            src={entry.logo}
            alt={entry.logoAlt}
            sx={logoSx}
          />
          <Box sx={textSx}>
            <Box component="h3" sx={companySx}>
              {entry.company}
            </Box>
            <Box component="p" sx={roleSx}>
              {entry.role}
            </Box>
            <Box component="span" sx={dateSx}>
              {entry.date}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
