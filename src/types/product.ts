/**
 * Product domain types — Advanced PIM model.
 * Mirrors REQS §4.2.2: Variants matrix, Metafields (GSM, weave...), Digital Assets.
 */

export type ElementCode = 'Ba' | 'Sc' | 'Ki' | 'Hm';

export interface ElementMeta {
  code: ElementCode;
  name: string;
  tagline: string;
  hex: string;
  description: string;
}

export type ProductCategory =
  | 'tops'
  | 'bottoms'
  | 'outerwear'
  | 'underlayer'
  | 'accessories';

export interface ProductColorVariant {
  id: string;
  name: string;
  hex: string;
  imageUrl: string;
}

export interface ProductSizeVariant {
  id: string;
  label: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  stock: number;
}

/**
 * Material Spec dashboard — REQS §4.1.3 (Tech Specs Tab).
 * Modelled like a scientific data sheet to support the "Science of Comfort" identity.
 */
export interface FabricSpec {
  gsm: number;                    // grams per square meter
  composition: { material: string; percent: number }[];
  weave: 'Plain' | 'Twill' | 'Jersey' | 'Rib' | 'Interlock' | 'Ottoman';
  stretch: number;                // 0–100 (%)
  breathability: number;          // 0–100
  thermalRegulation: number;      // 0–100
  moistureWicking: number;        // 0–100
  durability: number;             // 0–100
  certifications: string[];       // e.g. OEKO-TEX, Bluesign
  factory: string;                // origin factory
}

export interface ProductReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;                 // 1–5
  date: string;
  verified: boolean;
  title: string;
  body: string;
  size: string;
  height: number;                 // cm
  weight: number;                 // kg
  photos?: string[];
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  element: ElementCode;
  category: ProductCategory;
  price: number;
  originalPrice?: number;         // when on sale
  currency: 'VND';

  // Variants
  colors: ProductColorVariant[];
  sizes: ProductSizeVariant[];

  // Media
  thumbnail: string;
  images: string[];
  has3dModel: boolean;            // .glb available
  modelUrl?: string;

  // Tech sheet
  fabric: FabricSpec;

  // Commerce signals
  rating: number;
  reviewCount: number;
  soldCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isFlashDeal?: boolean;
  flashDealEndsAt?: string;       // ISO date
  lowStock?: boolean;

  // Reviews summary
  reviews: ProductReview[];

  // Care guide
  careIcons: ('wash30' | 'noBleach' | 'tumbleLow' | 'ironLow' | 'noDryClean')[];

  tags: string[];
  collection?: string;            // e.g. "Year One"
}
