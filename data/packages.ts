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
    name: 'Remote Assessment',
    nameAr: 'التقييم عن بعد',
    slug: 'remote-assessment',
    price: {
      monthly: 49,
      quarterly: 49,
      annual: 49
    },
    currency: 'AED',
    tier: 'basic',
    description: 'Perfect for quick online vehicle checks before viewing',
    descriptionAr: 'مثالي للفحص السريع عبر الإنترنت قبل المعاينة',
    features: [
      'URL analysis & scraping',
      'Market comparison (UAE)',
      'Fair value calculation',
      'PDF report (EN/AR)',
      '48-hour delivery'
    ],
    featuresAr: [
      'تحليل الرابط والاستخراج',
      'مقارنة السوق (الإمارات)',
      'حساب القيمة العادلة',
      'تقرير PDF (عربي/إنجليزي)',
      'التسليم خلال 48 ساعة'
    ],
    imagePrompt: 'Professional businessman analyzing vehicle data on laptop in modern Dubai office, golden hour lighting through floor-to-ceiling windows, luxury marble desk, digital screens showing car analytics, ultra detailed, cinematic photography, Phase One IQ4 camera',
    imagePath: '/images/packages/remote-assessment.jpg'
  },
  {
    id: 'remote-24h',
    name: 'Remote Express',
    nameAr: 'التقييم السريع',
    slug: 'remote-express',
    price: {
      monthly: 89,
      quarterly: 89,
      annual: 89
    },
    currency: 'AED',
    tier: 'standard',
    popular: true,
    badge: 'MOST POPULAR',
    badgeAr: 'الأكثر شعبية',
    description: 'Fast-track assessment for time-sensitive decisions',
    descriptionAr: 'تقييم سريع للقرارات الحساسة للوقت',
    features: [
      'Everything in Remote Assessment',
      'Priority queue',
      '24-hour delivery',
      'Phone consultation',
      'Live chat support'
    ],
    featuresAr: [
      'كل ميزات التقييم عن بعد',
      'قائمة الأولوية',
      'التسليم خلال 24 ساعة',
      'استشارة هاتفية',
      'دعم الدردشة المباشرة'
    ],
    imagePrompt: 'Luxury car inspector in white coat with iPad examining exotic vehicle in pristine Dubai showroom, morning golden light, professional automotive photography, medium format Hasselblad, ultra detailed, premium aesthetic',
    imagePath: '/images/packages/remote-express.jpg'
  },
  {
    id: 'remote-sameday',
    name: 'Remote Same-Day',
    nameAr: 'التقييم في نفس اليوم',
    slug: 'remote-same-day',
    price: {
      monthly: 129,
      quarterly: 129,
      annual: 129
    },
    currency: 'AED',
    tier: 'premium',
    description: 'Urgent assessment for immediate decisions',
    descriptionAr: 'تقييم عاجل للقرارات الفورية',
    features: [
      'Everything in Remote Express',
      'Same-day delivery',
      'Video call consultation',
      'Bidding strategy advice',
      'Deal negotiation tips'
    ],
    featuresAr: [
      'كل ميزات التقييم السريع',
      'التسليم في نفس اليوم',
      'استشارة عبر مكالمة فيديو',
      'نصائح استراتيجية المزايدة',
      'نصائح التفاوض'
    ],
    imagePrompt: 'Close-up of hands holding luxury iPad showing vehicle inspection report, luxury Dubai office background blurred, golden hour warm lighting, professional editorial photography, shallow depth of field, Phase One IQ4',
    imagePath: '/images/packages/remote-same-day.jpg'
  },

  // On-Site Inspection Packages
  {
    id: 'onsite-48h',
    name: 'On-Site Inspection',
    nameAr: 'الفحص الميداني',
    slug: 'onsite-inspection',
    price: {
      monthly: 169,
      quarterly: 169,
      annual: 169
    },
    currency: 'AED',
    tier: 'standard',
    description: 'Physical inspection at vehicle location anywhere in UAE',
    descriptionAr: 'فحص فعلي في موقع المركبة في أي مكان بالإمارات',
    features: [
      '200+ point inspection',
      'Professional inspector visit',
      'Photo documentation',
      'Test drive analysis',
      'Detailed condition report',
      '48-hour delivery'
    ],
    featuresAr: [
      'فحص أكثر من 200 نقطة',
      'زيارة مفتش محترف',
      'توثيق بالصور',
      'تحليل قيادة الاختبار',
      'تقرير الحالة التفصيلي',
      'التسليم خلال 48 ساعة'
    ],
    imagePrompt: 'Professional vehicle inspector in MAJAZ uniform examining luxury car engine bay with diagnostic tools, Dubai garage setting, dramatic lighting, ultra detailed photography, cinematic composition, Phase One IQ4',
    imagePath: '/images/packages/onsite-inspection.jpg'
  },
  {
    id: 'onsite-24h',
    name: 'On-Site Express',
    nameAr: 'الفحص السريع',
    slug: 'onsite-express',
    price: {
      monthly: 209,
      quarterly: 209,
      annual: 209
    },
    currency: 'AED',
    tier: 'premium',
    description: 'Priority on-site inspection with fast turnaround',
    descriptionAr: 'فحص ميداني ذو أولوية مع تسليم سريع',
    features: [
      'Everything in On-Site Inspection',
      'Priority scheduling',
      '24-hour delivery',
      'Video report',
      'Senior inspector',
      'Negotiation support'
    ],
    featuresAr: [
      'كل ميزات الفحص الميداني',
      'جدولة الأولوية',
      'التسليم خلال 24 ساعة',
      'تقرير فيديو',
      'مفتش أول',
      'دعم التفاوض'
    ],
    imagePrompt: 'Senior inspector in premium MAJAZ attire using professional diagnostic scanner on luxury sports car, high-end Dubai dealership, cinematic lighting, ultra detailed, professional automotive photography',
    imagePath: '/images/packages/onsite-express.jpg'
  },

  // Concierge Memberships
  {
    id: 'gold-monthly',
    name: 'Gold Concierge',
    nameAr: 'كونسيرج الذهبي',
    slug: 'gold-concierge',
    price: {
      monthly: 3059, // $10k/year ÷ 12
      quarterly: 9177, // $10k/year ÷ 4
      annual: 36700 // $10k USD = 36,700 AED
    },
    currency: 'AED',
    tier: 'gold',
    popular: true,
    badge: 'EXCLUSIVE',
    badgeAr: 'حصري',
    description: 'Unlimited inspections + personal concierge service',
    descriptionAr: 'فحوصات غير محدودة + خدمة كونسيرج شخصية',
    features: [
      'Unlimited on-site inspections',
      'Personal vehicle concierge',
      'Same-day priority service',
      'Portfolio management dashboard',
      'Monthly market intelligence',
      'Vehicle sourcing (3/year)',
      'Professional seller services',
      'Member events access',
      '24/7 support'
    ],
    featuresAr: [
      'فحوصات ميدانية غير محدودة',
      'كونسيرج المركبات الشخصي',
      'خدمة الأولوية في نفس اليوم',
      'لوحة إدارة المحفظة',
      'استخبارات السوق الشهرية',
      'البحث عن مركبات (3 سنويًا)',
      'خدمات البائع الاحترافية',
      'الوصول إلى فعاليات الأعضاء',
      'دعم 24/7'
    ],
    imagePrompt: 'Elegant gold membership card on black marble surface with luxury car keys (Ferrari, Lamborghini), Dubai skyline at golden hour in background, ultra premium product photography, Phase One IQ4, perfect lighting, shallow depth of field',
    imagePath: '/images/packages/gold-concierge.jpg'
  },
  {
    id: 'platinum-monthly',
    name: 'Platinum Concierge',
    nameAr: 'كونسيرج البلاتيني',
    slug: 'platinum-concierge',
    price: {
      monthly: 7646, // $25k/year ÷ 12
      quarterly: 22938, // $25k/year ÷ 4
      annual: 91750 // $25k USD = 91,750 AED
    },
    currency: 'AED',
    tier: 'platinum',
    badge: 'ULTRA PREMIUM',
    badgeAr: 'فائق التميز',
    description: 'Everything in Gold + international services',
    descriptionAr: 'كل ميزات الذهبي + خدمات دولية',
    features: [
      'Everything in Gold Concierge',
      'Unlimited vehicle sourcing',
      'International inspections',
      'Global import service (1/year)',
      'Unlimited auction representation',
      'VIP event access',
      'Direct mobile line',
      '2-hour response guarantee'
    ],
    featuresAr: [
      'كل ميزات كونسيرج الذهبي',
      'البحث غير المحدود عن المركبات',
      'فحوصات دولية',
      'خدمة الاستيراد العالمية (سنويًا)',
      'تمثيل المزاد غير المحدود',
      'الوصول إلى الفعاليات VIP',
      'خط جوال مباشر',
      'ضمان الاستجابة في ساعتين'
    ],
    imagePrompt: 'Platinum membership card on white marble with exotic car collection in background (Bugatti, McLaren, Rolls-Royce), private Dubai garage, cinematic lighting, ultra luxury product photography, Phase One IQ4, museum quality',
    imagePath: '/images/packages/platinum-concierge.jpg'
  },
  {
    id: 'diamond-annual',
    name: 'Diamond Concierge',
    nameAr: 'كونسيرج الماسي',
    slug: 'diamond-concierge',
    price: {
      monthly: 0, // Contact only
      quarterly: 0,
      annual: 183500 // Starting at $50k USD = 183,500 AED
    },
    currency: 'AED',
    tier: 'diamond',
    badge: 'INVITATION ONLY',
    badgeAr: 'بالدعوة فقط',
    description: 'Ultimate white-glove automotive concierge experience',
    descriptionAr: 'التجربة النهائية لخدمة الكونسيرج السيارات',
    features: [
      'Everything in Platinum',
      'Dedicated full-time concierge',
      'Unlimited international services',
      'Private jet coordination',
      'Bespoke automotive experiences',
      'Global dealer relationships',
      'Ultra-rare vehicle access',
      'Annual CEO portfolio review',
      'Custom services on demand'
    ],
    featuresAr: [
      'كل ميزات البلاتيني',
      'كونسيرج مخصص بدوام كامل',
      'خدمات دولية غير محدودة',
      'تنسيق الطائرات الخاصة',
      'تجارب سيارات مخصصة',
      'علاقات الوكلاء العالميين',
      'الوصول إلى المركبات النادرة',
      'مراجعة محفظة الرئيس التنفيذي السنوية',
      'خدمات مخصصة عند الطلب'
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
