export default function CGU() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-lg font-black tracking-tight text-gray-900">
            CV<span style={{ color:"#1B3CC1" }}>-DSS</span>
          </a>
          <a href="/" className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            <svg viewBox="0 0 20 20" fill="currentColor" style={{ width:16, height:16 }}>
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Retour
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-14">

        <h1 className="text-3xl font-black text-gray-900 mb-2">Conditions Générales d&apos;Utilisation</h1>
        <p className="text-sm text-gray-400 mb-10">En vigueur au 1er janvier 2026. Dernière mise à jour : janvier 2026.</p>

        {/* Article 1 */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background:"#1B3CC1" }} />
            Article 1 — Objet
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et l&apos;utilisation du service CV-DSS, accessible à l&apos;adresse cv-dss.fr, édité par Bruno De Sousa.
            En accédant au site, l&apos;utilisateur accepte sans réserve les présentes CGU.
          </p>
        </section>

        {/* Article 2 */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background:"#1B3CC1" }} />
            Article 2 — Description du service
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            CV-DSS est un générateur de CV en ligne gratuit permettant de créer un CV professionnel en 3 minutes, avec contenu enrichi automatiquement et optimisé pour les recruteurs. Il permet à tout utilisateur de créer, personnaliser et télécharger un CV professionnel au format PDF.
            Le service est fourni tel quel, sans garantie de résultat quant à l&apos;obtention d&apos;un emploi.
          </p>
        </section>

        {/* Article 3 */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background:"#1B3CC1" }} />
            Article 3 — Accès et gratuité
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            L&apos;accès au service CV-DSS est entièrement gratuit et ne requiert pas obligatoirement la création d&apos;un compte. Certaines fonctionnalités peuvent nécessiter une inscription.
            L&apos;éditeur se réserve le droit de modifier, suspendre ou interrompre le service à tout moment, sans préavis.
          </p>
        </section>

        {/* Article 4 */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background:"#1B3CC1" }} />
            Article 4 — Obligations de l&apos;utilisateur
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            L&apos;utilisateur s&apos;engage à :
          </p>
          <ul className="list-none space-y-2 text-sm text-gray-600">
            {[
              "Fournir des informations exactes et licites lors de la création de son CV",
              "Ne pas utiliser le service à des fins illicites ou frauduleuses",
              "Ne pas tenter de contourner les mécanismes de sécurité du site",
              "Respecter les droits de propriété intellectuelle de l'éditeur",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:"#1B3CC1" }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Article 5 */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background:"#1B3CC1" }} />
            Article 5 — Contenu enrichi automatiquement
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les textes enrichis ou traduits automatiquement sont générés à titre d&apos;aide à la rédaction uniquement.
            L&apos;utilisateur demeure seul responsable du contenu de son CV et est invité à relire et corriger les suggestions avant toute utilisation.
            CV-DSS ne saurait être tenu responsable des inexactitudes ou erreurs contenues dans les contenus générés.
          </p>
        </section>

        {/* Article 6 */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background:"#1B3CC1" }} />
            Article 6 — Données personnelles
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les données saisies pour la création du CV ne sont pas conservées sur nos serveurs au-delà de la session en cours.
            En cas de création de compte, les données d&apos;inscription (email) sont traitées conformément à notre politique de confidentialité et au RGPD.
            Pour toute question : <a href="mailto:cvdss.contact@gmail.com" className="font-medium" style={{ color:"#1B3CC1" }}>cvdss.contact@gmail.com</a>.
          </p>
        </section>

        {/* Article 7 */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background:"#1B3CC1" }} />
            Article 7 — Propriété intellectuelle
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            L&apos;ensemble des éléments constituant le site CV-DSS (design, code, thèmes graphiques, textes) est protégé par le droit de la propriété intellectuelle et appartient à Bruno De Sousa.
            Toute reproduction, même partielle, sans autorisation écrite préalable est interdite.
            Les CV générés par l&apos;utilisateur lui appartiennent intégralement.
          </p>
        </section>

        {/* Article 8 */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background:"#1B3CC1" }} />
            Article 8 — Modification des CGU
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            L&apos;éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prennent effet dès leur publication sur le site.
            L&apos;utilisation continue du service après modification vaut acceptation des nouvelles CGU.
          </p>
        </section>

        {/* Article 9 */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background:"#1B3CC1" }} />
            Article 9 — Droit applicable
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou exécution sera soumis aux tribunaux compétents du ressort de Troyes, France.
          </p>
        </section>

        <p className="text-xs text-gray-400 pt-6 border-t border-gray-100">
          © 2026 CV-DSS — CGU en vigueur depuis le 1er janvier 2026
        </p>
      </main>
    </div>
  );
}
