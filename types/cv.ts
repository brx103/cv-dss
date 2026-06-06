export interface Experience {
  id: string;
  poste: string;
  entreprise: string;
  dateDebut: string;
  dateFin: string;
  description: string;
}

export interface Formation {
  id: string;
  diplome: string;
  etablissement: string;
  annee: string;
  description: string;
}

export interface CVData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  ville: string;
  titre: string;
  resume: string;
  competences: string[];
  experiences: Experience[];
  formations: Formation[];
  // Informations complémentaires (optionnelles)
  dateNaissance?: string;
  permis?: string[];
  nationalite?: string;
  situationFamiliale?: string;
  linkedin?: string;
  portfolio?: string;
  disponibilite?: string;
  mobilite?: string;
}

export const defaultCVData: CVData = {
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  ville: "",
  titre: "",
  resume: "",
  competences: [],
  experiences: [],
  formations: [],
  dateNaissance: "",
  permis: [],
  nationalite: "",
  situationFamiliale: "",
  linkedin: "",
  portfolio: "",
  disponibilite: "",
  mobilite: "",
};
