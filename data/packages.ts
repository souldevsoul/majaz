export interface Package {
  id: string
  name: string
  nameAr: string
  slug: string
  price: {
    monthly: number
    quarterly: number
    annual: number
  }
  currency: 'AED' | 'USD'
  tier: 'basic' | 'standard' | 'premium' | 'gold' | 'platinum' | 'diamond'
  popular?: boolean
  features: string[]
  featuresAr: string[]
  description: string
  descriptionAr: string
  imagePrompt: string
  imagePath?: string
  badge?: string
  badgeAr?: string
}

export const packages: Package[] = [
  // Individual Inspection Packages
  {
    id: 'remote-48h',
    name: 'Essential Intelligence',
    nameAr: 'الذكاء الأساسي',
    slug: 'essential-intelligence',
    price: {
      monthly: 2999,
      quarterly: 8497,
      annual: 32388
    },
    currency: 'AED',
    tier: 'basic',
    description: 'Sophisticated analysis for the discerning buyer',
    descriptionAr: 'تحليل متطور للمشتري الحصيف',
    features: [
      'Comprehensive digital vehicle dossier',
      'UAE market intelligence & valuation',
      'Investment risk assessment',
      'Bilingual premium PDF report',
      'Expert consultation session',
      'Auction strategy guidance'
    ],
    featuresAr: [
      'ملف رقمي شامل للمركبة',
      'تقييم وذكاء السوق الإماراتي',
      'تقييم مخاطر الاستثمار',
      'تقرير PDF فاخر ثنائي اللغة',
      'جلسة استشارة خبير',
      'إرشاد استراتيجية المزاد'
    ],
    imagePrompt: 'Professional businessman analyzing vehicle data on laptop in modern Dubai office, golden hour lighting through floor-to-ceiling windows, luxury marble desk, digital screens showing car analytics, ultra detailed, cinematic photography, Phase One IQ4 camera',
    imagePath: '/images/packages/remote-assessment.jpg'
  },
  {
    id: 'remote-24h',
    name: 'Sovereign Service',
    nameAr: 'الخدمة السيادية',
    slug: 'sovereign-service',
    price: {
      monthly: 5999,
      quarterly: 16797,
      annual: 64788
    },
    currency: 'AED',
    tier: 'standard',
    popular: true,
    badge: 'MOST DISTINGUISHED',
    badgeAr: 'الأكثر تميزاً',
    description: 'Elite assessment with white-glove service',
    descriptionAr: 'تقييم نخبوي مع خدمة راقية',
    features: [
      'All Essential Intelligence benefits',
      'Priority concierge access',
      'Private viewing arrangements',
      'Video consultation with specialist',
      'Negotiation masterclass session',
      'VIP auction floor access',
      'Dedicated support line'
    ],
    featuresAr: [
      'جميع مزايا الذكاء الأساسي',
      'وصول كونسيرج ذو أولوية',
      'ترتيبات المشاهدة الخاصة',
      'استشارة فيديو مع متخصص',
      'جلسة ماستركلاس التفاوض',
      'وصول VIP لصالة المزاد',
      'خط دعم مخصص'
    ],
    imagePrompt: 'Luxury car inspector in white coat with iPad examining exotic vehicle in pristine Dubai showroom, morning golden light, professional automotive photography, medium format Hasselblad, ultra detailed, premium aesthetic',
    imagePath: '/images/packages/remote-express.jpg'
  },
  {
    id: 'remote-sameday',
    name: 'Heritage Collection',
    nameAr: 'مجموعة التراث',
    slug: 'heritage-collection',
    price: {
      monthly: 9999,
      quarterly: 27997,
      annual: 107988
    },
    currency: 'AED',
    tier: 'premium',
    description: 'Bespoke service for exceptional automobiles',
    descriptionAr: 'خدمة مخصصة للسيارات الاستثنائية',
    features: [
      'All Sovereign Service privileges',
      'Immediate priority deployment',
      'Multi-vehicle portfolio management',
      'International auction representation',
      'Personal curator for rare vehicles',
      'Exclusive dealer network access',
      'White-glove delivery coordination',
      'Heritage vehicle certification'
    ],
    featuresAr: [
      'جميع امتيازات الخدمة السيادية',
      'نشر فوري ذو أولوية',
      'إدارة محفظة متعددة المركبات',
      'تمثيل المزادات الدولية',
      'مشرف شخصي للمركبات النادرة',
      'وصول حصري لشبكة الوكلاء',
      'تنسيق التسليم الراقي',
      'شهادة مركبات التراث'
    ],
    imagePrompt: 'Close-up of hands holding luxury iPad showing vehicle inspection report, luxury Dubai office background blurred, golden hour warm lighting, professional editorial photography, shallow depth of field, Phase One IQ4',
    imagePath: '/images/packages/remote-same-day.jpg'
  },

  // Concierge Membership Tiers
  {
    id: 'onsite-48h',
    name: 'Majesty Tier',
    nameAr: 'مستوى الجلالة',
    slug: 'majesty-tier',
    price: {
      monthly: 15999,
      quarterly: 44797,
      annual: 172788
    },
    currency: 'AED',
    tier: 'gold',
    description: 'Unlimited concierge services for the automotive connoisseur',
    descriptionAr: 'خدمات كونسيرج غير محدودة لخبير السيارات',
    features: [
      'Unlimited vehicle assessments',
      'Dedicated personal concierge',
      'Global market intelligence',
      'Private showroom appointments',
      'Comprehensive 200+ point inspections',
      'Post-purchase white-glove support',
      'Annual portfolio strategy review',
      'Members-only events & previews',
      'Priority access to rare vehicles'
    ],
    featuresAr: [
      'تقييمات مركبات غير محدودة',
      'كونسيرج شخصي مخصص',
      'استخبارات السوق العالمية',
      'مواعيد صالة عرض خاصة',
      'فحوصات شاملة أكثر من 200 نقطة',
      'دعم راقي بعد الشراء',
      'مراجعة استراتيجية المحفظة السنوية',
      'فعاليات ومعاينات حصرية للأعضاء',
      'وصول ذو أولوية للمركبات النادرة'
    ],
    imagePrompt: 'Professional vehicle inspector in MAJAZ uniform examining luxury car engine bay with diagnostic tools, Dubai garage setting, dramatic lighting, ultra detailed photography, cinematic composition, Phase One IQ4',
    imagePath: '/images/packages/onsite-inspection.jpg'
  },
  {
    id: 'onsite-24h',
    name: 'Regency Circle',
    nameAr: 'دائرة الوصاية',
    slug: 'regency-circle',
    price: {
      monthly: 29999,
      quarterly: 83997,
      annual: 323988
    },
    currency: 'AED',
    tier: 'platinum',
    badge: 'ULTRA EXCLUSIVE',
    badgeAr: 'حصري للغاية',
    description: 'The pinnacle of automotive concierge excellence',
    descriptionAr: 'قمة التميز في خدمة كونسيرج السيارات',
    features: [
      'All Majesty Tier privileges',
      'International vehicle sourcing',
      'Private jet coordination for viewings',
      'Global auction house partnerships',
      'Museum-grade documentation',
      'Bespoke automotive experiences',
      'Direct CEO hotline (24/7)',
      'Investment-grade vehicle curation',
      'Ultra-rare hypercar access',
      'Quarterly executive briefings'
    ],
    featuresAr: [
      'جميع امتيازات مستوى الجلالة',
      'توريد مركبات دولي',
      'تنسيق طائرة خاصة للمشاهدة',
      'شراكات دور المزادات العالمية',
      'توثيق بمستوى المتاحف',
      'تجارب سيارات مخصصة',
      'خط ساخن مباشر للرئيس التنفيذي (24/7)',
      'تنسيق مركبات بدرجة استثمارية',
      'وصول للسيارات الخارقة النادرة',
      'إحاطات تنفيذية ربع سنوية'
    ],
    imagePrompt: 'Senior inspector in premium MAJAZ attire using professional diagnostic scanner on luxury sports car, high-end Dubai dealership, cinematic lighting, ultra detailed, professional automotive photography',
    imagePath: '/images/packages/onsite-express.jpg'
  },

  {
    id: 'diamond-annual',
    name: 'Crown Privilege',
    nameAr: 'امتياز التاج',
    slug: 'crown-privilege',
    price: {
      monthly: 0, // Contact only
      quarterly: 0,
      annual: 500000 // Starting at 500,000 AED
    },
    currency: 'AED',
    tier: 'diamond',
    badge: 'BY INVITATION',
    badgeAr: 'بالدعوة',
    description: 'The ultimate expression of automotive luxury',
    descriptionAr: 'التعبير النهائي عن الفخامة السيارية',
    features: [
      'All Regency Circle benefits',
      'Full-time dedicated concierge team',
      'Unlimited global vehicle sourcing',
      'Private jet & yacht viewings',
      'Exclusive factory tours',
      'One-of-one commission facilitation',
      'Provenance research & certification',
      'Blue-chip investment advisory',
      'Founder\'s Circle membership',
      'Lifetime legacy documentation',
      'Invitation to Monaco & Pebble Beach',
      'Custom-tailored automotive experiences'
    ],
    featuresAr: [
      'جميع مزايا دائرة الوصاية',
      'فريق كونسيرج مخصص بدوام كامل',
      'توريد مركبات عالمي غير محدود',
      'مشاهدات الطائرات واليخوت الخاصة',
      'جولات مصنع حصرية',
      'تسهيل تكليف واحد من واحد',
      'بحث وشهادة المصدر',
      'استشارات استثمار الشريحة الزرقاء',
      'عضوية دائرة المؤسسين',
      'توثيق الإرث مدى الحياة',
      'دعوة لموناكو وبيبل بيتش',
      'تجارب سيارات مصممة خصيصًا'
    ],
    imagePrompt: 'Black diamond-encrusted membership card on obsidian stone, ultra-rare hypercar collection (Koenigsegg, Pagani, one-off custom) in private vault, dramatic spotlighting, ultra luxury product photography, Phase One IQ4, museum lighting',
    imagePath: '/images/packages/diamond-concierge.jpg'
  }
]

export const packageTiers = {
  basic: { color: '#666666', name: 'Basic', nameAr: 'أساسي' },
  standard: { color: '#8B8B8B', name: 'Standard', nameAr: 'قياسي' },
  premium: { color: '#B8941E', name: 'Premium', nameAr: 'ممتاز' },
  gold: { color: '#D4AF37', name: 'Gold', nameAr: 'ذهبي' },
  platinum: { color: '#E5E4E2', name: 'Platinum', nameAr: 'بلاتيني' },
  diamond: { color: '#B9F2FF', name: 'Diamond', nameAr: 'ماسي' }
}

export function getPackagesByTier(tier: string) {
  return packages.filter(pkg => pkg.tier === tier)
}

export function getPackageBySlug(slug: string) {
  return packages.find(pkg => pkg.slug === slug)
}
