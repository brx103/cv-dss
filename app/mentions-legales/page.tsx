export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Header */}
      <header className="border-b border-gray-100" style={{ background:"rgba(255,255,255,0.95)" }}>
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

        <h1 className="text-3xl font-black text-gray-900 mb-2">Mentions légales</h1>
        <p className="text-sm text-gray-400 mb-10">Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique.</p>

        {/* Éditeur */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background:"#1B3CC1" }} />
            Éditeur du site
          </h2>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-2 text-sm text-gray-700">
            <p><span className="font-semibold text-gray-900">Nom :</span> Bruno De Sousa</p>
            <p><span className="font-semibold text-gray-900">Adresse :</span> Troyes, France</p>
            <p><span className="font-semibold text-gray-900">Contact :</span>{" "}
              <a href="mailto:cvdss.contact@gmail.com" className="font-medium" style={{ color:"#1B3CC1" }}>
                cvdss.contact@gmail.com
              </a>
            </p>
            <p><span className="font-semibold text-gray-900">Année de création :</span> 2025</p>
            <p><span className="font-semibold text-gray-900">Directeur de la publication :</span> Bruno De Sousa</p>
          </div>
        </section>

        {/* Hébergeur */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background:"#1B3CC1" }} />
            Hébergeur
          </h2>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-2 text-sm text-gray-700">
            <p><span className="font-semibold text-gray-900">Société :</span> Vercel Inc.</p>
            <p><span className="font-semibold text-gray-900">Adresse :</span> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
            <p><span className="font-semibold text-gray-900">Site web :</span>{" "}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="font-medium" style={{ color:"#1B3CC1" }}>
                vercel.com
              </a>
            </p>
          </div>
        </section>

        {/* Propriété intellectuelle */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background:"#1B3CC1" }} />
            Propriété intellectuelle
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            L&apos;ensemble des contenus présents sur le site CV-DSS (textes, images, graphismes, logo, icônes, sons, logiciels…) est la propriété exclusive de Bruno De Sousa, à l&apos;exception des marques, logos ou contenus appartenant à d&apos;autres sociétés partenaires ou auteurs.
            Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l&apos;accord express par écrit de Bruno De Sousa.
          </p>
        </section>

        {/* Données personnelles */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background:"#1B3CC1" }} />
            Données personnelles
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les informations saisies dans le formulaire de création de CV sont utilisées uniquement pour générer votre CV et ne sont pas conservées sur nos serveurs au-delà de la session en cours.
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données.
            Pour toute demande, contactez-nous à{" "}
            <a href="mailto:cvdss.contact@gmail.com" className="font-medium" style={{ color:"#1B3CC1" }}>
              cvdss.contact@gmail.com
            </a>.
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background:"#1B3CC1" }} />
            Cookies
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Le site CV-DSS peut utiliser des cookies techniques nécessaires à son bon fonctionnement (authentification, préférences). Aucun cookie publicitaire ou de traçage tiers n&apos;est utilisé.
          </p>
        </section>

        {/* Responsabilité */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full inline-block" style={{ background:"#1B3CC1" }} />
            Limitation de responsabilité
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            CV-DSS s&apos;efforce de fournir des informations aussi précises que possible. Cependant, il ne pourra être tenu responsable des omissions, inexactitudes et carences dans la mise à jour, qu&apos;elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
            Les contenus générés par intelligence artificielle sont fournis à titre indicatif et doivent être relus et validés par l&apos;utilisateur avant utilisation.
          </p>
        </section>

        <p className="text-xs text-gray-400 pt-6 border-t border-gray-100">
          © 2025 CV-DSS — Dernière mise à jour : mai 2025
        </p>
      </main>
    </div>
  );
}
