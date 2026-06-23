// ─────────────────────────────────────────────────────────────
// Configuration CENTRALISÉE de tous les liens affiliés.
//
// Chaque outil a :
//   - baseUrl    : le lien NORMAL vers le site (toujours valide)
//   - affiliate  : le lien AFFILIÉ (null tant que non validé)
//
// Tant que `affiliate` est null, on renvoie baseUrl : le visiteur
// arrive au bon endroit, tu ne touches juste pas encore de commission.
// Tu remplaces null par ton vrai lien dès validation PartnerStack/Impact.
// ─────────────────────────────────────────────────────────────

interface AffiliateTool {
  baseUrl: string;
  affiliate: string | null;
}

export const AFFILIATE_LINKS = {
  chatgpt: {
    baseUrl: "https://chat.openai.com",
    affiliate: null, // ChatGPT n'a pas de programme — restera en baseUrl
  },
  jasper: {
    baseUrl: "https://www.jasper.ai",
    affiliate: null, // À REMPLACER après validation Impact
  },
  copyai: {
    baseUrl: "https://www.copy.ai",
    affiliate: null, // À REMPLACER après validation PartnerStack
  },
  elevenlabs: {
    baseUrl: "https://elevenlabs.io",
    affiliate: null, // À REMPLACER après validation PartnerStack
  },
} satisfies Record<string, AffiliateTool>;

export type AffiliateKey = keyof typeof AFFILIATE_LINKS;

/**
 * Renvoie l'URL à utiliser pour un outil.
 * - Si le lien affilié existe, on l'utilise et on y ajoute la source (sub_id).
 * - Sinon, on retombe proprement sur le lien normal du site.
 *
 * @param key     clé de l'outil
 * @param source  identifiant de l'article d'où vient le clic (ex: "script-youtube")
 */
export function affiliateUrl(key: AffiliateKey, source?: string): string {
  const tool: AffiliateTool | undefined = AFFILIATE_LINKS[key];

  // Filet de sécurité : clé inconnue → on ne casse pas le site.
  if (!tool) {
    console.warn(
      `affiliateUrl : clé inconnue "${key}" — vérifie l'appel du bouton.`,
    );
    return "#";
  }

  const affiliate: string | null = tool.affiliate;
  if (!affiliate) return tool.baseUrl;
  if (!source) return affiliate;

  const sep = affiliate.includes("?") ? "&" : "?";
  return `${affiliate}${sep}sub_id=${encodeURIComponent(source)}`;
}
