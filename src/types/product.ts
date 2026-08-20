/* Commerce model: EDITORIAL ENTITY -> PRODUCT -> MERCHANT OFFER -> AFFILIATE ROUTE.
   Reuses the family's three-tier pattern (strongest version found in Ramen: AffiliateProduct ->
   AffiliateRoute with a needs-verification safety gate) rather than inventing a new shape. */

export interface AffiliateRoute {
  network: string;
  url: string;
  status: 'active' | 'pending' | 'needs-verification' | 'retired';
}

export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  category:
    | 'bowls'
    | 'chopsticks-spoons'
    | 'serving'
    | 'cookware'
    | 'noodle-making-equipment'
    | 'prep-tools'
    | 'storage'
    | 'pantry'
    | 'books-gifts';
  /** Which sibling app(s) this product record was originally verified in — reused, not
      re-sourced, when editorially appropriate for Noodles. */
  sourceApp: 'let-them-eat-cake' | 'let-them-eat-ramen' | 'let-them-eat-cookies' | 'let-them-eat-noodles';
  route: AffiliateRoute;
  contexts?: string[]; // dish ids, workshop lab slugs, etc. for contextual surfacing
}
