import type { Translations } from "./fr";

export const en: Translations = {
  // --- Language toggle ---
  lang_fr: "FR",
  lang_en: "EN",

  // --- Header / nav ---
  signin: "Sign in",
  signout: "Sign out",
  hello: "Hello,",
  back: "Back",

  // --- Landing: hero ---
  hero_badge: "100% free",
  hero_title1: "Create your perfect CV",
  hero_title2: "in a few minutes",
  hero_steps: [
    "Choose from 70 professional templates",
    "Fill in your information",
    "Download your CV as PDF",
  ],
  hero_cta_primary: "Create my CV for free →",
  hero_cta_secondary: "Browse templates",

  // --- Landing: stats ---
  stat1_label: "To create your CV",
  stat2_label: "Available templates",
  stat3_label: "Free, no ads",
  community_label: "CVs created by our community",

  // --- Landing: before/after ---
  ba_tagline: "Transformation",
  ba_title: "Before / After",
  ba_subtitle: "Same content, radically different result",
  ba_before: "BEFORE",
  ba_after: "AFTER",
  ba_label: "Design + Expertise",

  // --- Landing: how it works ---
  how_tagline: "Simple & fast",
  how_title: "How does it work?",
  how_steps: [
    { title: "Choose your design", desc: "Select from 70 professional templates the one that suits you best." },
    { title: "Fill in your info", desc: "Our guided form helps you structure your career path step by step." },
    { title: "Download as PDF", desc: "Export your CV as a ready-to-send PDF, content auto-enhanced and optimised for recruiters." },
  ],
  how_cta: "Start now — it's free",

  // --- Landing: testimonials ---
  testi_tagline: "They trust us",
  testi_title: "What they say",
  testimonials: [
    { name: "Laurine M.", role: "Sales Advisor", text: "Thanks to CV-DSS, I landed an interview in less than a week! The design really made me stand out from other candidates. I recommend it without hesitation to all my friends." },
    { name: "Axel D.", role: "Construction Site Manager", text: "Impressive! In 5 minutes I had a professional CV that all my colleagues asked me how I did it. The PDF quality is really top-notch." },
    { name: "Gabriel R.", role: "Career Change Student", text: "I was looking for a simple tool for my career change. The 70 templates blew me away — I tested several before finding the perfect one. Intuitive and fast, great job!" },
  ],

  // --- Landing: our story ---
  story_tagline: "Why free?",
  story_title: "Our story",
  story_quote: "We created CV-DSS for free because we both experienced the difficulty of finding a job and making a professional CV without resources. Too many tools are paid and inaccessible to those who need them most. CV-DSS is our way of giving everyone the same chances, regardless of their situation.",
  story_author: "— Bruno De Sousa, founder of CV-DSS",

  // --- Landing: final CTA ---
  cta_title: "Ready to land your next job?",
  cta_sub: "100% free, no registration required.",
  cta_button: "Create my CV now — for free →",

  // --- Footer ---
  footer_tagline: "The professional CV generator. Free, fast, optimised for recruiters.",
  footer_question: "Any questions?",
  footer_copyright: "© 2026 CV-DSS. All rights reserved.",
  footer_made: "Made with ♥ in France",
  footer_created: "🚀 Created by Bruno De Sousa",
  footer_produit: "Product",
  footer_legal: "Legal",
  footer_contact_col: "Contact",
  footer_produit_links: ["Create a CV", "Choose a template", "Improve my CV", "Download as PDF"],
  footer_cta_btn: "Create my CV →",

  // --- Theme selection ---
  ts_step: "Step 1 — Choose your style",
  ts_title: "Which design suits you?",
  ts_subtitle: "70 templates organised in 7 categories. You can change templates at any time after generation.",
  ts_continue: "Continue with",
  ts_hint: 'Click a template to preview it, then click "Continue"',
  layout_labels: {
    sidebar: "Sidebar",
    header: "Header",
    geometric: "Geometric",
    minimal: "Column",
    strip: "Strip",
    timeline: "Timeline",
  },

  // --- Form navigation ---
  form_back: "Change template",
  form_back_result: "Edit CV",
  theme_selected: "Selected template",
  theme_change: "Change",
  steps: ["Info", "Experience", "Education", "Skills"],
  prev: "← Previous",
  next: "Next →",
  generate: "✨ Generate my professional CV",
  generating: "Generating…",

  // --- Infos personnelles ---
  ip_section1: "Personal information",
  ip_section2: "Additional information",
  ip_optional: "All these fields are optional.",
  ip_prenom: "First name",
  ip_nom: "Last name",
  ip_email: "Email",
  ip_telephone: "Phone",
  ip_ville: "City",
  ip_titre: "Target job title",
  ip_resume: "Professional summary",
  ip_resume_hint: "(content auto-enhanced)",
  ip_resume_placeholder: "Briefly describe your background and what makes you unique... or leave a few words, the rest will be auto-enhanced ✨",
  ip_birth: "Date of birth",
  ip_nationalite: "Nationality",
  ip_famille: "Marital status",
  ip_dispo: "Availability",
  ip_mobilite: "Mobility",
  ip_select: "Select...",
  ip_familles: ["Single", "Married", "Civil partnership", "Divorced", "Widowed"],
  ip_dispos: ["Immediately", "Within 1 month", "Within 3 months", "To be defined"],
  ip_mobilites: ["Local", "Regional", "National", "International"],
  ip_linkedin: "LinkedIn",
  ip_portfolio: "Portfolio / Website",
  ip_permis: "Driving licence",
  ip_city_placeholder: "London, Manchester, Birmingham...",
  ip_job_placeholder: "Developer, Nurse, Accountant...",

  // --- Experiences ---
  exp_title: "Professional Experience",
  exp_card: "Experience",
  exp_delete: "Delete",
  exp_poste: "Position",
  exp_entreprise: "Company",
  exp_date_debut: "Start date",
  exp_date_fin: "End date",
  exp_date_fin_hint: "(empty = ongoing)",
  exp_description: "Description",
  exp_description_hint: "(content auto-enhanced)",
  exp_add: "Add experience",
  exp_poste_placeholder: "Senior Developer, Project Manager...",
  exp_entreprise_placeholder: "Google, Amazon, start-up...",
  exp_desc_placeholder: "Describe your key responsibilities, results, achievements... or leave a few words and the content will be auto-enhanced ✨",

  // --- Formations ---
  edu_title: "Education",
  edu_card: "Education",
  edu_delete: "Delete",
  edu_diplome: "Degree",
  edu_etablissement: "Institution",
  edu_annee: "Year obtained",
  edu_description: "Description",
  edu_description_hint: "(optional)",
  edu_add: "Add education",
  edu_diplome_placeholder: "Master's, Bachelor's, HND, MBA...",
  edu_etablissement_placeholder: "UCL, LSE, Imperial College...",
  edu_desc_placeholder: "Specialisation, honours, dissertation, notable projects...",

  // --- Compétences ---
  comp_title: "Skills",
  comp_hint: "Type to see suggestions, or enter your own skill.",
  comp_placeholder: "Excel, Driving licence, HACCP, Teamwork...",
  comp_add: "Add",
  comp_empty: "No skills added yet — start with your strengths!",

  // --- CV result toolbar ---
  cv_edit: "Edit",
  cv_translate: "Translate EN",
  cv_back_fr: "Back to FR",
  cv_translating: "Translating…",
  cv_download: "Download PDF",
  cv_generating_pdf: "Generating…",

  // --- CV content strings (inside layouts) ---
  cv_ongoing: "Ongoing",
  cv_born: "Born on",
  cv_licence: "Licence",
  cv_available: "Available",
  cv_mobility: "Mobility",
};
