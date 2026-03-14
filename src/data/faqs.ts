export interface FAQ {
  question: string;
  answer: string;
  category: string;
  featured?: boolean;
}

export const faqs: FAQ[] = [
  // Pricing
  {
    category: 'Pricing',
    question: 'How much will my windscreen replacement cost?',
    answer: 'Costs vary depending on the vehicle, glass type, and whether ADAS (camera) calibration is required. Call or text Nigel on 0466 140 195 for a free, no-obligation quote.',
    featured: true,
  },
  // Service
  {
    category: 'Service',
    question: 'Will you come to me?',
    answer: "Yes! We're a fully mobile service. We can come to your home, workplace, or another convenient location to carry out your windscreen replacement.",
    featured: true,
  },
  {
    category: 'Service',
    question: 'How do I book my windscreen replacement?',
    answer: "Booking is easy. Simply call or text Nigel on 0466 140 195. We'll confirm the details, provide a free quote, and arrange a time that gets you back on the road as quickly as possible.",
  },
  {
    category: 'Service',
    question: 'Can you replace my windscreen at my workplace?',
    answer: 'Yes. Our mobile service allows us to replace windscreens at homes, workplaces, and other suitable locations.',
  },
  {
    category: 'Service',
    question: 'What vehicles do you work on?',
    answer: 'We work on a wide range of vehicles, including:\n\n- Cars and utes\n- Trucks and vans\n- Vintage and classic vehicles\n- Tractors and heavy machinery',
  },
  {
    category: 'Service',
    question: 'What should I do before you arrive?',
    answer: 'Please ensure:\n\n- The vehicle is accessible\n- Personal items are removed from the dashboard\n- There is enough space around the vehicle for safe access\n\nWe\'ll take care of the rest.',
  },
  // Speed of Service
  {
    category: 'Speed of Service',
    question: 'How long does a windscreen replacement take?',
    answer: 'The windscreen replacement itself typically takes 20–45 minutes, depending on the make and model of your vehicle.\n\nAfter installation, we recommend allowing approximately 2 hours for the adhesive to cure before driving. This ensures the windscreen is securely bonded and safe to drive.',
    featured: true,
  },
  {
    category: 'Speed of Service',
    question: 'Do you offer same-day or emergency service?',
    answer: 'Same-day service is often available, depending on glass availability and location. Call or text Nigel on 0466 140 195 to check availability.',
    featured: true,
  },
  {
    category: 'Speed of Service',
    question: 'How soon can you book me in?',
    answer: 'We often offer same-day or next-day service, depending on glass availability. Call or text Nigel on 0466 140 195 to check current availability.',
  },
  {
    category: 'Speed of Service',
    question: 'Can I drive my car straight away?',
    answer: 'Not immediately. After a windscreen replacement, the adhesive needs time to cure properly. Our standard safe drive-away time is approximately 2 hours.',
  },
  {
    category: 'Speed of Service',
    question: 'Will my vehicle be safe to wash after the replacement?',
    answer: 'We recommend waiting 2 hours before washing your vehicle to allow the adhesive to fully cure.',
  },
  // ADAS
  {
    category: 'ADAS',
    question: 'Do you recalibrate vehicle cameras (ADAS)?',
    answer: 'Yes. Many modern vehicles require ADAS recalibration after a windscreen replacement. We ensure all necessary calibrations are completed so your safety systems function correctly.',
    featured: true,
  },
  // Insurance
  {
    category: 'Insurance',
    question: 'Will my insurance cover the replacement?',
    answer: 'Many insurance policies cover all or part of the cost. Coverage varies by insurer and policy, so it\'s best to check directly with your insurer. We\'ll provide everything you need to support your claim.',
  },
  {
    category: 'Insurance',
    question: 'Do you bill my insurance company directly?',
    answer: "We don't bill insurers directly. You pay us for the service, and we provide a detailed invoice and documentation so you can submit your claim for reimbursement.",
  },
  {
    category: 'Insurance',
    question: 'Is Local Autoglass fully insured?',
    answer: 'Yes. We are fully insured, and all windscreen replacements are backed by a workmanship guarantee for your peace of mind.',
  },
  // Warranty
  {
    category: 'Warranty',
    question: 'Do you offer a warranty on your work?',
    answer: 'Yes. All our windscreen replacements are backed by a workmanship guarantee for your peace of mind.',
  },
  {
    category: 'Warranty',
    question: 'Will replacing my windscreen affect my vehicle warranty?',
    answer: 'No. A professionally installed windscreen using compliant glass will not affect your vehicle warranty.',
  },
  // Safety
  {
    category: 'Safety',
    question: 'Why is a full replacement sometimes safer than a repair?',
    answer: "Chips or cracks larger than approximately 20 mm, or those located in critical areas such as the driver's line of sight or near the edge of the windscreen, can compromise visibility and the structural strength of the vehicle.\n\nA full windscreen replacement ensures correct bonding, a proper seal, and accurate ADAS calibration where required—restoring the vehicle to manufacturer safety standards and providing long-term safety and reliability.",
  },
  {
    category: 'Safety',
    question: 'What happens if my windscreen damage gets worse before my booking?',
    answer: 'Cracks can spread quickly due to temperature changes and road vibration. If the damage worsens, contact us as soon as possible so we can reassess or bring your booking forward if available.',
  },
  // Small Repairs
  {
    category: 'Small Repairs',
    question: 'Do you repair small chips, or only replace windscreens?',
    answer: 'We specialise exclusively in full windscreen replacements and do not carry out small chip repairs.\n\nAs a general guideline, if a chip or crack is larger than around 20 mm, a full windscreen replacement is often the safer option. If the damage is smaller and suitable for repair, Brian at Wise Cracks (0413 794 221) can assist with chip repairs. If the damage exceeds this size or isn\'t safe to repair, we\'re happy to help with a complete windscreen replacement.',
  },
  // Legal
  {
    category: 'Legal',
    question: 'Is it legal to drive with a cracked windscreen?',
    answer: 'In many cases, driving with a cracked windscreen can be unsafe and unroadworthy, especially if it affects visibility. We recommend replacement as soon as possible.',
  },
  // Weather
  {
    category: 'Weather',
    question: 'What if it rains on the day of my booking?',
    answer: "Light rain usually isn't an issue. If weather conditions aren't suitable, we'll contact you to arrange a sheltered location for the replacement or reschedule at the earliest convenient time.",
  },
  // Qualifications
  {
    category: 'Qualifications',
    question: 'What experience does Local Autoglass have?',
    answer: 'The team at Local Autoglass has over 35 years of industry experience and is fully qualified to carry out automotive glass replacements safely and professionally.',
  },
  {
    category: 'Qualifications',
    question: 'What licences does Local Autoglass hold?',
    answer: 'Local Autoglass holds all required licences, including:\n\n- Motor Vehicle Repairer Licence (MVRL63433)\n- Motor Vehicle Tradespersons Certificate (MVTC192290)\n\nThese licences are mandatory for automotive repair businesses and ensure all work meets industry standards.',
  },
];

export const featuredFaqs = faqs.filter((f) => f.featured);
