import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { CVData } from "@/types/cv";
import type { Theme } from "@/lib/themes";

type Lang = "fr" | "en";

const LABELS = {
  fr: { contact: "CONTACT", profil: "PROFIL", exp: "EXPÉRIENCES PROFESSIONNELLES", formation: "FORMATION", skills: "COMPÉTENCES", enCours: "En cours" },
  en: { contact: "CONTACT", profil: "PROFILE", exp: "PROFESSIONAL EXPERIENCE", formation: "EDUCATION", skills: "SKILLS", enCours: "Present" },
} as const;

const MONTHS_FR = ["jan.","fév.","mars","avr.","mai","juin","juil.","août","sep.","oct.","nov.","déc."];
const MONTHS_EN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function solidColor(s: string): string {
  const m = s.match(/#[0-9a-fA-F]{6}/);
  return m ? m[0] : "#1B3CC1";
}

// Append a 2-digit hex alpha to a #RRGGBB color; pass rgba() through unchanged
function alpha(color: string, hex: string): string {
  if (color.startsWith("#") && color.length === 7) return color + hex;
  return color;
}

function fmtMonth(v: string, lang: Lang): string {
  if (!v) return "";
  const [y, m] = v.split("-");
  if (!y || !m) return v;
  const months = lang === "en" ? MONTHS_EN : MONTHS_FR;
  return `${months[+m - 1] ?? m} ${y}`;
}

function period(d: string, f: string, lang: Lang): string {
  const a = fmtMonth(d, lang);
  const b = f ? fmtMonth(f, lang) : LABELS[lang].enCours;
  return a ? `${a} – ${b}` : b;
}

interface Props { cv: CVData; photo: string | null; theme: Theme; lang: Lang }

export function CVPdfDocument({ cv, photo, theme, lang }: Props) {
  const sb  = solidColor(theme.c.sidebar);
  const { accent, sidebarText, sidebarSub, text, sub, bg, border } = theme.c;
  const lbl = LABELS[lang];

  const s = StyleSheet.create({
    page:       { flexDirection: "row", backgroundColor: bg || "#fff", fontFamily: "Helvetica" },
    // ── sidebar ──
    sidebar:    { width: 172, flexShrink: 0, backgroundColor: sb, paddingTop: 26, paddingBottom: 26, paddingLeft: 14, paddingRight: 14 },
    photo:      { width: 78, height: 78, borderRadius: 39, alignSelf: "center", marginBottom: 10, objectFit: "cover" },
    photoFallback: { width: 78, height: 78, borderRadius: 39, alignSelf: "center", marginBottom: 10, backgroundColor: alpha(sidebarText, "1a"), alignItems: "center", justifyContent: "center" },
    photoInit:  { fontFamily: "Helvetica-Bold", fontSize: 20, color: alpha(sidebarText, "66") },
    sName:      { fontFamily: "Helvetica-Bold", fontSize: 9, color: sidebarText, textAlign: "center", marginBottom: 2 },
    sTitre:     { fontSize: 7, color: sidebarSub, textAlign: "center", marginBottom: 4 },
    sDivider:   { height: 0.5, backgroundColor: alpha(sidebarText, "28"), marginTop: 8, marginBottom: 8 },
    sLabel:     { fontFamily: "Helvetica-Bold", fontSize: 5.5, color: sidebarSub, letterSpacing: 1.2, marginBottom: 6 },
    sItem:      { fontSize: 7.5, color: sidebarText, marginBottom: 3.5, lineHeight: 1.4 },
    sBulletRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 4 },
    sBulletDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: accent, marginTop: 2.5, marginRight: 5, flexShrink: 0 },
    sBulletTxt: { fontSize: 7.5, color: sidebarText, flex: 1, lineHeight: 1.4 },
    // ── main ──
    main:       { flex: 1, paddingTop: 26, paddingBottom: 26, paddingLeft: 24, paddingRight: 24 },
    mPrenom:    { fontFamily: "Helvetica-Bold", fontSize: 22, color: text, letterSpacing: -0.3 },
    mNom:       { fontFamily: "Helvetica", fontSize: 22, color: accent, letterSpacing: -0.3 },
    mTitre:     { fontFamily: "Helvetica-Bold", fontSize: 8, color: accent, letterSpacing: 0.5, marginTop: 3, marginBottom: 2 },
    mDivider:   { height: 0.5, backgroundColor: border || "#E5E7EB", marginTop: 8, marginBottom: 8 },
    mLabel:     { fontFamily: "Helvetica-Bold", fontSize: 5.5, color: accent, letterSpacing: 1.2, marginBottom: 7 },
    resumeTxt:  { fontSize: 8.5, color: sub, lineHeight: 1.6 },
    expRow:     { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
    expPoste:   { fontFamily: "Helvetica-Bold", fontSize: 10, color: text, flex: 1 },
    expPeriod:  { fontSize: 7, color: sub, flexShrink: 0, marginLeft: 6 },
    expCompany: { fontFamily: "Helvetica-Bold", fontSize: 7.5, color: accent, letterSpacing: 0.3, marginTop: 1 },
    expDesc:    { fontSize: 8, color: sub, lineHeight: 1.55, marginTop: 3 },
    expBlock:   { marginBottom: 10 },
  });

  const initials = `${cv.prenom?.[0]?.toUpperCase() ?? ""}${cv.nom?.[0]?.toUpperCase() ?? ""}`;

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ── Sidebar ── */}
        <View style={s.sidebar}>
          {photo ? (
            <Image src={photo} style={s.photo} />
          ) : (
            <View style={s.photoFallback}>
              <Text style={s.photoInit}>{initials}</Text>
            </View>
          )}

          <Text style={s.sName}>{cv.prenom} {cv.nom}</Text>
          {cv.titre ? <Text style={s.sTitre}>{cv.titre}</Text> : null}

          <View style={s.sDivider} />
          <Text style={s.sLabel}>{lbl.contact}</Text>
          {cv.email     ? <Text style={s.sItem}>{cv.email}</Text>     : null}
          {cv.telephone ? <Text style={s.sItem}>{cv.telephone}</Text> : null}
          {cv.ville     ? <Text style={s.sItem}>{cv.ville}</Text>     : null}
          {cv.linkedin  ? <Text style={s.sItem}>{cv.linkedin.replace(/^https?:\/\//i, "")}</Text>  : null}
          {cv.portfolio ? <Text style={s.sItem}>{cv.portfolio.replace(/^https?:\/\//i, "")}</Text> : null}
          {cv.nationalite  ? <Text style={s.sItem}>{cv.nationalite}</Text>                   : null}
          {cv.mobilite     ? <Text style={s.sItem}>{"Mobilité : " + cv.mobilite}</Text>      : null}
          {cv.disponibilite? <Text style={s.sItem}>{"Dispo. : " + cv.disponibilite}</Text>   : null}

          {(cv.competences ?? []).length > 0 ? (
            <View>
              <View style={s.sDivider} />
              <Text style={s.sLabel}>{lbl.skills}</Text>
              {cv.competences.map((sk, i) => (
                <View key={i} style={s.sBulletRow}>
                  <View style={s.sBulletDot} />
                  <Text style={s.sBulletTxt}>{sk}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        {/* ── Main ── */}
        <View style={s.main}>
          <View>
            <Text>
              <Text style={s.mPrenom}>{cv.prenom}{" "}</Text>
              <Text style={s.mNom}>{cv.nom}</Text>
            </Text>
            {cv.titre ? <Text style={s.mTitre}>{cv.titre}</Text> : null}
            <View style={s.mDivider} />
          </View>

          {cv.resume ? (
            <View>
              <Text style={s.mLabel}>{lbl.profil}</Text>
              <Text style={s.resumeTxt}>{cv.resume}</Text>
              <View style={s.mDivider} />
            </View>
          ) : null}

          {cv.experiences.length > 0 ? (
            <View>
              <Text style={s.mLabel}>{lbl.exp}</Text>
              {cv.experiences.map((exp, i) => (
                <View key={exp.id} style={i < cv.experiences.length - 1 ? s.expBlock : undefined}>
                  <View style={s.expRow}>
                    <Text style={s.expPoste}>{exp.poste}</Text>
                    <Text style={s.expPeriod}>{period(exp.dateDebut, exp.dateFin, lang)}</Text>
                  </View>
                  <Text style={s.expCompany}>{exp.entreprise.toUpperCase()}</Text>
                  {exp.description ? <Text style={s.expDesc}>{exp.description}</Text> : null}
                </View>
              ))}
              <View style={s.mDivider} />
            </View>
          ) : null}

          {cv.formations.length > 0 ? (
            <View>
              <Text style={s.mLabel}>{lbl.formation}</Text>
              {cv.formations.map((f, i) => (
                <View key={f.id} style={i < cv.formations.length - 1 ? s.expBlock : undefined}>
                  <View style={s.expRow}>
                    <Text style={s.expPoste}>{f.diplome}</Text>
                    {f.annee ? <Text style={s.expPeriod}>{f.annee}</Text> : null}
                  </View>
                  <Text style={s.expCompany}>{f.etablissement.toUpperCase()}</Text>
                  {f.description ? <Text style={s.expDesc}>{f.description}</Text> : null}
                </View>
              ))}
            </View>
          ) : null}
        </View>

      </Page>
    </Document>
  );
}
