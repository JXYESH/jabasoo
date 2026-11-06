import { Product } from '../types';

export const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL', '6XL'] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'vel-robe-01',
    name: 'The Cocoon Cashmere Robe',
    category: 'loungewear',
    subcategory: 'robes',
    price: 38500,
    description: 'An architectural silhouette cut from two-ply Grade-A Mongolian cashmere. Engineered with a dropped shoulder, fluid lapel, and a substantial self-fabric sash for effortless draped warmth.',
    composition: '100% Grade-A Mongolian Cashmere (12-gauge)',
    fitInfo: 'Relaxed, fluid fit. Designed to fall mid-calf with generous volume. Model is 178cm / 5\'10" wearing size S.',
    details: [
      'Unlined construction with French seam interior finishing',
      'Shawl collar with extended fold-back rib lapels',
      'Deep inset side pockets seamlessly integrated into vertical seam',
      'Removable wide sash belt with clean tailored loops',
      'Dry clean or hand wash cold with specialty wool shampoo'
    ],
    certificates: [
      'Responsible Cashmere Standard (RCS) Certified',
      'OEKO-TEX® Standard 100 tested for harmful substances',
      'Sustainably sourced from free-roaming nomadic pastoralists in Inner Mongolia'
    ],
    care: [
      'Store folded with cedar blocks, never hang',
      'Pill comb recommended after first three wears',
      'Steam gently on low heat to refresh between wears'
    ],
    sensoryProfile: {
      warmth: 'Warm & Thermo-Regulating',
      skinFeel: 'Sumptuous Lofty Cashmere',
      weightGsm: '420 GSM (2-Ply)',
      fitDrape: 'Voluminous Cocoon Drape'
    },
    pairingProductId: 'vel-trouser-02',
    ritual: 'morning',
    colors: [
      {
        name: 'Bone Ivory',
        hex: '#F3EFEA',
        images: [
          '/src/assets/images/loungewear_silk_robe_living_1793620652768.jpg',
          '/src/assets/images/loungewear_cashmere_macro_1793620651967.jpg',
          '/src/assets/images/loungewear_hero_morning_1793620652458.jpg',
          '/src/assets/images/editorial_craft_fabric_1793612596395.jpg'
        ]
      },
      {
        name: 'Heather Charcoal',
        hex: '#3B3B3B',
        images: [
          '/src/assets/images/editorial_loungewear_story_1793612598318.jpg',
          '/src/assets/images/loungewear_cashmere_macro_1793620651967.jpg',
          '/src/assets/images/editorial_craft_fabric_1793612596395.jpg'
        ]
      },
      {
        name: 'Pure Onyx',
        hex: '#141414',
        images: [
          '/src/assets/images/editorial_collection_banner_1793612597372.jpg',
          '/src/assets/images/editorial_loungewear_story_1793612598318.jpg',
          '/src/assets/images/editorial_craft_fabric_1793612596395.jpg'
        ]
      }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
    isNew: true,
    popularity: 98,
    inStock: true
  },
  {
    id: 'vel-trouser-02',
    name: 'Wide-Leg Ribbed Silk Lounge Trouser',
    category: 'loungewear',
    subcategory: 'trousers',
    price: 24000,
    description: 'Crafted with a weighted mulberry silk and fine wool blend. Featuring an elongated wide-leg silhouette that pools gracefully over footwear, with an encased soft elastic waistband.',
    composition: '65% Mulberry Silk, 35% Merino Wool',
    fitInfo: 'High-rise with a fluid, straight wide-leg fall. Floor-length inseam. If between sizes, choose your normal waist size.',
    details: [
      'Encased non-pinching elasticized waistband with interior drawstring',
      'Continuous vertical rib stitch creates elongating drape',
      'Discreet side slash pockets with reinforced bar-tacking',
      'Zero-twist yarn for ultra-smooth skin contact'
    ],
    certificates: [
      'GOTS (Global Organic Textile Standard) Certified Silk',
      'Standard 100 by OEKO-TEX®'
    ],
    care: [
      'Dry clean recommended or gentle silk hand wash in cold water',
      'Lay flat on towel to dry in shade'
    ],
    sensoryProfile: {
      warmth: 'Breathable Seasonless',
      skinFeel: 'Liquid Smooth with Textured Rib',
      weightGsm: '310 GSM Silk-Merino',
      fitDrape: 'Floor-Length Fluid Column'
    },
    pairingProductId: 'vel-robe-01',
    ritual: 'evening',
    colors: [
      {
        name: 'Bone Ivory',
        hex: '#F3EFEA',
        images: [
          '/src/assets/images/loungewear_hero_morning_1793620652458.jpg',
          '/src/assets/images/loungewear_cashmere_macro_1793620651967.jpg',
          '/src/assets/images/editorial_craft_fabric_1793612596395.jpg'
        ]
      },
      {
        name: 'Heather Charcoal',
        hex: '#3B3B3B',
        images: [
          '/src/assets/images/editorial_loungewear_story_1793612598318.jpg',
          '/src/assets/images/editorial_craft_fabric_1793612596395.jpg'
        ]
      },
      {
        name: 'Pure Onyx',
        hex: '#141414',
        images: [
          '/src/assets/images/editorial_collection_banner_1793612597372.jpg',
          '/src/assets/images/editorial_loungewear_story_1793612598318.jpg'
        ]
      }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL', '6XL'],
    isNew: true,
    popularity: 94,
    inStock: true
  },
  {
    id: 'vel-knit-03',
    name: 'Fine-Gauge Cashmere Turtleneck',
    category: 'loungewear',
    subcategory: 'knitwear',
    price: 29500,
    description: 'An understated luxury staple. Spun from ultra-fine 16-gauge cashmere with an unconstricted soft funnel collar and minimalist micro-rib cuffs.',
    composition: '100% Grade-A Mongolian Cashmere (16-gauge featherweight)',
    fitInfo: 'True to size with gentle ease through the torso. Model is 176cm wearing size S.',
    details: [
      'Seamless tubular knit collar that stands gently without slouching',
      'Subtle raglan shoulder shaping for fluid movement',
      'Extended sleeve cuff designed to rest over knuckles'
    ],
    certificates: [
      'Responsible Cashmere Standard (RCS)',
      'OEKO-TEX® Standard 100'
    ],
    care: [
      'Hand wash cold with wool wash',
      'Never wring; press water out gently with clean white towel'
    ],
    sensoryProfile: {
      warmth: 'Lightweight Insulation',
      skinFeel: 'Second-Skin Featherweight Softness',
      weightGsm: '190 GSM (16-Gauge)',
      fitDrape: 'Gentle Unstructured Ease'
    },
    pairingProductId: 'vel-trouser-02',
    ritual: 'leisure',
    colors: [
      {
        name: 'Bone Ivory',
        hex: '#F3EFEA',
        images: [
          '/src/assets/images/loungewear_hero_morning_1793620652458.jpg',
          '/src/assets/images/loungewear_cashmere_macro_1793620651967.jpg',
          '/src/assets/images/editorial_craft_fabric_1793612596395.jpg'
        ]
      },
      {
        name: 'Heather Charcoal',
        hex: '#3B3B3B',
        images: [
          '/src/assets/images/editorial_loungewear_story_1793612598318.jpg',
          '/src/assets/images/editorial_craft_fabric_1793612596395.jpg'
        ]
      }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    popularity: 91,
    inStock: true
  },
  {
    id: 'vel-kimono-04',
    name: 'The Structured Milanese Lounge Kimono',
    category: 'loungewear',
    subcategory: 'robes',
    price: 46000,
    description: 'Inspired by Japanese loungewear tailoring, finished with heavy Milanese stitch bands along the placket and cuffs. Balanced structure meets tactile softness.',
    composition: '70% Organic Mercerized Cotton, 30% Mulberry Silk',
    fitInfo: 'Oversized boxy profile with wide kimono sleeves. Meant to be worn loose or cinched.',
    details: [
      'Heavy double-knit Milanese placket collar',
      'Wide cut kimono sleeve with deep hems',
      'Structured side slits for mobility when seated',
      'Concealed internal tie for secure front closure'
    ],
    certificates: [
      'GOTS Certified Organic Cotton',
      'European Eco-Management and Audit Scheme (EMAS)'
    ],
    care: [
      'Delicate machine wash in garment mesh bag',
      'Dry flat in shade'
    ],
    sensoryProfile: {
      warmth: 'Midweight Structured Comfort',
      skinFeel: 'Silky Soft with Crisp Stability',
      weightGsm: '360 GSM Mercerized Double-Knit',
      fitDrape: 'Architectural Boxy Drape'
    },
    pairingProductId: 'vel-trouser-02',
    ritual: 'morning',
    colors: [
      {
        name: 'Pure Onyx',
        hex: '#141414',
        images: [
          '/src/assets/images/editorial_collection_banner_1793612597372.jpg',
          '/src/assets/images/editorial_loungewear_story_1793612598318.jpg'
        ]
      },
      {
        name: 'Bone Ivory',
        hex: '#F3EFEA',
        images: [
          '/src/assets/images/loungewear_silk_robe_living_1793620652768.jpg',
          '/src/assets/images/loungewear_cashmere_macro_1793620651967.jpg'
        ]
      }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'],
    popularity: 88,
    inStock: true
  },
  {
    id: 'vel-shirt-05',
    name: 'Mulberry Silk Pajama Shirt',
    category: 'loungewear',
    subcategory: 'sleepwear',
    price: 21500,
    description: 'Cut from 22-momme sand-washed mulberry silk with a velvety matte luster. Finished with genuine mother-of-pearl buttons and contrast tonal micro-piping.',
    composition: '100% Sand-Washed Mulberry Silk (22-momme)',
    fitInfo: 'Relaxed tailored drape. Falls just below the hip. Model wears size S.',
    details: [
      'Notched camp collar with clean interior facing',
      'Australian mother-of-pearl buttons, laser engraved',
      'Single chest patch pocket with precision border edge',
      'Clean rounded hem with side vents'
    ],
    certificates: [
      'OEKO-TEX® Standard 100',
      'Mulberry Silk Traceability Verification'
    ],
    care: [
      'Cool iron inside-out while slightly damp',
      'Professional dry clean or gentle hand wash'
    ],
    sensoryProfile: {
      warmth: 'Cooling & Breathable',
      skinFeel: 'Velvety Sand-Washed Matte Silk',
      weightGsm: '22-Momme Heavyweight Silk',
      fitDrape: 'Fluid Tailored Ease'
    },
    pairingProductId: 'vel-pant-06',
    ritual: 'rest',
    colors: [
      {
        name: 'Pure Onyx',
        hex: '#141414',
        images: [
          '/src/assets/images/editorial_collection_banner_1793612597372.jpg',
          '/src/assets/images/editorial_loungewear_story_1793612598318.jpg'
        ]
      },
      {
        name: 'Bone Ivory',
        hex: '#F3EFEA',
        images: [
          '/src/assets/images/loungewear_cotton_terry_lounge_1793620651698.jpg',
          '/src/assets/images/loungewear_silk_robe_living_1793620652768.jpg'
        ]
      }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL', '6XL'],
    isNew: true,
    popularity: 96,
    inStock: true
  },
  {
    id: 'vel-pant-06',
    name: 'Mulberry Silk Fluid Pant',
    category: 'loungewear',
    subcategory: 'sleepwear',
    price: 19500,
    description: 'The companion pant to our silk shirt. Cut on the bias for an extraordinary liquid drape that moves effortlessly with every step.',
    composition: '100% Sand-Washed Mulberry Silk (22-momme)',
    fitInfo: 'Relaxed straight leg with soft elastic waistband and silk tie cord.',
    details: [
      'Elastic waist with custom silk tunnel drawstring',
      'Concealed in-seam pockets',
      'Generous 2-inch bottom cuffs with blind hem'
    ],
    certificates: [
      'OEKO-TEX® Standard 100 Certified',
      'Closed-Loop Water Dyeing Facility'
    ],
    care: [
      'Silk cold hand wash or dry clean',
      'Avoid direct sunlight during drying'
    ],
    sensoryProfile: {
      warmth: 'Cooling & Breathable',
      skinFeel: 'Liquid Pure Mulberry Silk',
      weightGsm: '22-Momme Heavyweight Silk',
      fitDrape: 'Fluid Straight Fall'
    },
    pairingProductId: 'vel-shirt-05',
    ritual: 'rest',
    colors: [
      {
        name: 'Pure Onyx',
        hex: '#141414',
        images: [
          '/src/assets/images/editorial_collection_banner_1793612597372.jpg',
          '/src/assets/images/editorial_loungewear_story_1793612598318.jpg'
        ]
      },
      {
        name: 'Bone Ivory',
        hex: '#F3EFEA',
        images: [
          '/src/assets/images/loungewear_cotton_terry_lounge_1793620651698.jpg',
          '/src/assets/images/loungewear_silk_robe_living_1793620652768.jpg'
        ]
      }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    popularity: 89,
    inStock: true
  },
  {
    id: 'vel-wrap-07',
    name: 'Weighted Waffle Lounge Set',
    category: 'loungewear',
    subcategory: 'sets',
    price: 34000,
    description: 'A tactile two-piece lounge uniform made with deep waffle-honeycomb organic cotton. Pre-washed for a buttery soft drape, thermal retention, and comfortable morning wear.',
    composition: '100% Organic Waffle Knit Cotton (380 GSM)',
    fitInfo: 'Relaxed drop-shoulder crewneck with matching tapered rib ankle lounge pant.',
    details: [
      'Textured micro-honeycomb thermal weave',
      'Non-restrictive wide waistband with flat herringbone drawcord',
      'Reinforced cuffs that retain shape after washing'
    ],
    certificates: [
      'GOTS Certified Organic Cotton',
      'OEKO-TEX® Standard 100'
    ],
    care: [
      'Machine wash cold on gentle cycle',
      'Tumble dry low or air dry flat to preserve waffle texture'
    ],
    sensoryProfile: {
      warmth: 'Cozy Morning Warmth',
      skinFeel: 'Breathable Honeycomb Texture',
      weightGsm: '380 GSM Organic Cotton',
      fitDrape: 'Relaxed Modern Uniform'
    },
    pairingProductId: 'vel-robe-01',
    ritual: 'morning',
    colors: [
      {
        name: 'Warm Ecru',
        hex: '#EFECE6',
        images: [
          '/src/assets/images/loungewear_cotton_terry_lounge_1793620651698.jpg',
          '/src/assets/images/loungewear_hero_morning_1793620652458.jpg'
        ]
      },
      {
        name: 'Heather Charcoal',
        hex: '#3B3B3B',
        images: [
          '/src/assets/images/editorial_loungewear_story_1793612598318.jpg',
          '/src/assets/images/editorial_craft_fabric_1793612596395.jpg'
        ]
      }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    isNew: true,
    popularity: 95,
    inStock: true
  },
  {
    id: 'vel-acc-08',
    name: 'Brushed Cashmere Sleep Mask & Slipper Set',
    category: 'accessories',
    subcategory: 'accessories',
    price: 14500,
    description: 'A quiet luxury pairing. Padded silk-lined sleep mask filled with pure natural silk floss, paired with collapsible knit cashmere slippers with soft suede soles.',
    composition: 'Outer: 100% Cashmere; Lining: 100% Mulberry Silk; Sole: Italian Calf Suede',
    fitInfo: 'Mask: Elasticized ruched silk strap. Slippers: S (36-38), M (39-41), L (42-44).',
    details: [
      'Zero pressure light-blocking contour',
      'Silk floss batting prevents delicate eye area creasing',
      'Supple non-slip calf suede sole with embossed monogram',
      'Includes travel pouch in matching washed silk'
    ],
    certificates: [
      'Responsible Cashmere Standard',
      'Leather Working Group (LWG) Gold Rated Suede'
    ],
    care: [
      'Spot clean with gentle damp cloth',
      'Specialist suede brush for soles'
    ],
    sensoryProfile: {
      warmth: 'Soothing Rest Wrap',
      skinFeel: 'Padded Silk & Brushed Cashmere',
      weightGsm: 'Lightweight Travel Essential',
      fitDrape: 'Contoured Custom Fit'
    },
    pairingProductId: 'vel-robe-01',
    ritual: 'rest',
    colors: [
      {
        name: 'Bone Ivory',
        hex: '#F3EFEA',
        images: [
          '/src/assets/images/loungewear_cashmere_macro_1793620651967.jpg',
          '/src/assets/images/loungewear_silk_robe_living_1793620652768.jpg'
        ]
      },
      {
        name: 'Heather Charcoal',
        hex: '#3B3B3B',
        images: [
          '/src/assets/images/editorial_loungewear_story_1793612598318.jpg',
          '/src/assets/images/editorial_craft_fabric_1793612596395.jpg'
        ]
      }
    ],
    availableSizes: ['S', 'M', 'L'],
    popularity: 92,
    inStock: true
  }
];
