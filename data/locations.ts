export interface LocationFAQ {
  question: string;
  answer: string;
}

export interface LocationServices {
  carsUtes: string;
  trucksHeavy: string;
  adas: string;
}

export interface Location {
  slug: string;
  name: string;
  population: string;
  description: string;
  latitude: number;
  longitude: number;
  nearbyLocations: string[];
  region: string;
  distanceFromBase: string;
  tagline: string;
  whyChooseUs: string;
  suburbs: string[];
  services: LocationServices;
  faqs: LocationFAQ[];
}

export const locations: Location[] = [
  {
    slug: 'lismore',
    name: 'Lismore',
    population: '45,000-50,000',
    description:
      'As the heart of the Northern Rivers and our home base, Lismore residents enjoy the fastest response times for mobile windscreen replacement. Whether you\'re in the CBD, South Lismore, Goonellabah, or East Lismore, we\'ll come to your home or workplace and have you back on the road in no time.',
    latitude: -28.8133,
    longitude: 153.2749,
    nearbyLocations: ['alstonville', 'ballina', 'mullumbimby'],
    region: 'Northern Rivers',
    distanceFromBase: 'Our home base',
    tagline: 'Our home base in the heart of the Northern Rivers',
    whyChooseUs:
      'Being based right here in Lismore means we can respond faster than anyone else. With 35+ years of experience and deep local knowledge, we understand the unique needs of Lismore drivers — from flood-affected vehicles needing urgent windscreen replacement to rural properties outside of town. We know every suburb, every back road, and we\'re never far away.',
    suburbs: [
      'Lismore CBD',
      'South Lismore',
      'North Lismore',
      'East Lismore',
      'Goonellabah',
      'Girards Hill',
      'Lismore Heights',
      'Loftville',
      'Richmond Hill',
    ],
    services: {
      carsUtes:
        'Living in Lismore means dealing with unpredictable weather and flood-prone roads that can send debris into your windscreen. As your local mobile service, we carry stock for the most popular makes and models and can often fit same-day replacements at your home or workplace anywhere in the Lismore area.',
      trucksHeavy:
        'Lismore is a hub for agriculture, transport, and construction across the Northern Rivers. We service trucks, tractors, excavators, and heavy machinery on-site at your depot, farm, or job site — so your equipment stays where it needs to be with minimal downtime.',
      adas:
        'Many newer vehicles registered in Lismore rely on windscreen-mounted cameras for lane keeping, auto emergency braking, and adaptive cruise control. After any windscreen replacement, we recalibrate these ADAS systems using manufacturer-approved equipment to keep you safe on Northern Rivers roads.',
    },
    faqs: [
      {
        question: 'How quickly can you get to me in Lismore?',
        answer:
          'As Lismore is our home base, we can typically reach you within the hour for urgent jobs. For scheduled appointments, we offer same-day service across all Lismore suburbs including Goonellabah, South Lismore, and East Lismore.',
      },
      {
        question: 'Do you service Goonellabah and Lismore Heights?',
        answer:
          'Absolutely. We cover all Lismore suburbs including Goonellabah, Lismore Heights, Girards Hill, North Lismore, South Lismore, and Richmond Hill. We come to your driveway, workplace, or wherever is most convenient.',
      },
      {
        question: 'My windscreen was damaged in a storm — can you help?',
        answer:
          'Yes. Lismore\'s weather can be harsh, and storm damage to windscreens is common. We carry a wide range of glass in stock and can often provide same-day emergency replacements. Call us on 0466 140 195 and we\'ll get to you as fast as possible.',
      },
    ],
  },
  {
    slug: 'ballina',
    name: 'Ballina',
    population: '45,000-47,000',
    description:
      'Ballina\'s coastal location means salt air and UV exposure can take a toll on your windscreen. We provide mobile windscreen replacement across Ballina, East Ballina, West Ballina, Lennox Head, and Skennars Head. From the airport precinct to the marina, we come to you.',
    latitude: -28.8667,
    longitude: 153.5667,
    nearbyLocations: ['lismore', 'byron-bay', 'alstonville'],
    region: 'Northern Rivers',
    distanceFromBase: '35 min from Lismore',
    tagline: 'Coastal city with fast mobile service',
    whyChooseUs:
      'Ballina\'s coastal environment accelerates wear on windscreens — salt spray, intense UV, and sandy roads all contribute to chips and cracks spreading faster than inland areas. We understand these coastal conditions and carry glass suited to Ballina\'s climate. With regular runs to Ballina and the surrounding coast, we offer reliable same-day service without you needing to leave home.',
    suburbs: [
      'Ballina',
      'East Ballina',
      'West Ballina',
      'Lennox Head',
      'Skennars Head',
      'Cumbalum',
      'Kinvara',
      'Tintenbar',
    ],
    services: {
      carsUtes:
        'Coastal driving in Ballina means your windscreen cops salt spray, sand, and UV daily. Small chips can spread fast in these conditions, so getting a quick replacement is essential. We come to your home in East Ballina, your office near the airport, or your beachside park-up in Lennox Head — wherever suits you best.',
      trucksHeavy:
        'From the Ballina Industrial Estate to local farms and construction sites along the coast, we replace windscreens on-site for trucks, tractors, and heavy machinery. We schedule around your operations so your fleet keeps moving with zero unnecessary trips to a workshop.',
      adas:
        'Ballina\'s busy Pacific Highway on-ramps and coastal roads demand accurate safety systems. After replacing your windscreen, we recalibrate all ADAS sensors including forward collision warning and lane departure — critical for safe driving on the highway between Ballina and Byron Bay.',
    },
    faqs: [
      {
        question: 'Do you service Lennox Head and Skennars Head?',
        answer:
          'Yes, we service the entire Ballina Shire including Lennox Head, Skennars Head, Cumbalum, East Ballina, West Ballina, and Tintenbar. We come directly to your location.',
      },
      {
        question: 'How long does a windscreen replacement take in Ballina?',
        answer:
          'Most car windscreen replacements take around 15 minutes to install, plus curing time. We can usually complete the full job within an hour at your Ballina location. For trucks and heavy vehicles, allow a little extra time depending on the vehicle.',
      },
      {
        question: 'Does the coastal salt air affect my windscreen?',
        answer:
          'Salt air can accelerate the spread of chips and small cracks, especially around the edges where the seal meets the glass. If you notice any damage, it\'s best to get it replaced quickly before it spreads. We carry Australian Standard certified glass rated for all conditions.',
      },
    ],
  },
  {
    slug: 'byron-bay',
    name: 'Byron Bay',
    population: '9,000-10,000',
    description:
      'Byron Bay\'s busy streets and beach lifestyle mean your vehicle is always on the go. We offer mobile windscreen replacement throughout Byron Bay, Suffolk Park, Belongil, and the Byron Arts & Industry Estate. Don\'t let a cracked windscreen interrupt your day — we\'ll come to you.',
    latitude: -28.6436,
    longitude: 153.6150,
    nearbyLocations: ['mullumbimby', 'bangalow', 'ballina'],
    region: 'Northern Rivers',
    distanceFromBase: '45 min from Lismore',
    tagline: 'Famous coastal town — we come to you',
    whyChooseUs:
      'Byron Bay is one of the busiest towns in the Northern Rivers, and finding time to get your car serviced between work, surf, and school runs isn\'t easy. That\'s why we come to you — whether you\'re at the Industrial Estate, parked at Tallow Beach, or at home in Suffolk Park. We service the Byron Bay area every Wednesday, so you can count on a regular, reliable schedule. No need to fight for parking in town or wait at a workshop. We handle everything on the spot.',
    suburbs: [
      'Byron Bay',
      'Suffolk Park',
      'Belongil',
      'Ewingsdale',
      'Skinners Shoot',
      'Broken Head',
      'Byron Arts & Industry Estate',
      'Sunrise',
    ],
    services: {
      carsUtes:
        'Byron Bay\'s narrow streets, gravel back roads, and constant traffic mean windscreen damage is common. Whether a truck kicked up a rock on Ewingsdale Road or you copped a crack driving to Broken Head, we\'ll come to your Byron Bay location and replace your windscreen on-site while you go about your day.',
      trucksHeavy:
        'Byron Bay\'s construction boom and surrounding agricultural properties keep heavy vehicles busy year-round. We replace windscreens on trucks, earthmovers, and farm machinery at your Byron Bay work site — no need to transport heavy equipment to a workshop.',
      adas:
        'With Byron Bay\'s mix of tourist traffic, roundabouts, and highway driving to Bangalow and Ballina, your vehicle\'s safety systems need to be spot-on. We recalibrate all forward-facing cameras and sensors after windscreen replacement so your auto braking and lane assist work exactly as designed.',
    },
    faqs: [
      {
        question: 'Can you replace my windscreen while I\'m at work in Byron Bay?',
        answer:
          'Absolutely. Many of our Byron Bay customers book us to come to the Arts & Industry Estate or their workplace during business hours. We\'ll have it done while you work — you won\'t even need to leave the office.',
      },
      {
        question: 'Do you cover Suffolk Park and Broken Head?',
        answer:
          'Yes, we service all of Byron Bay including Suffolk Park, Broken Head, Belongil, Ewingsdale, Skinners Shoot, and Sunrise. Wherever you are in the Byron Bay area, we\'ll come to you.',
      },
      {
        question: 'What day do you service Byron Bay?',
        answer:
          'We service the Byron Bay area every Wednesday as part of our regular weekly schedule. If you need an urgent replacement outside of Wednesday, give us a call on 0466 140 195 and we\'ll do our best to fit you in as soon as possible.',
      },
    ],
  },
  {
    slug: 'alstonville',
    name: 'Alstonville',
    population: '5,500-6,000',
    description:
      'Sitting on the Alstonville Plateau, this thriving town is just a short drive from our Lismore base. We service Alstonville, Wollongbar, and the surrounding rural properties. Whether you\'re at home, at work, or on the farm, we bring professional windscreen replacement to you.',
    latitude: -28.8417,
    longitude: 153.4417,
    nearbyLocations: ['lismore', 'ballina', 'bangalow'],
    region: 'Northern Rivers',
    distanceFromBase: '20 min from Lismore',
    tagline: 'Plateau living with convenient mobile service',
    whyChooseUs:
      'Alstonville sits right between Lismore and Ballina, making it one of our quickest service areas. The plateau\'s rural properties and winding roads mean you shouldn\'t have to drive far with a damaged windscreen. We come to you — whether you\'re on a macadamia farm in Rous, at the shops on Main Street, or at home in Wollongbar. Fast, local, and hassle-free.',
    suburbs: [
      'Alstonville',
      'Wollongbar',
      'Rous',
      'Rous Mill',
      'Teven',
      'Meerschaum Vale',
      'Pearces Creek',
    ],
    services: {
      carsUtes:
        'The Alstonville Plateau\'s rural roads and tree-lined streets can send debris into your windscreen at any time. We provide fast mobile windscreen replacement across Alstonville and Wollongbar — coming to your home, workplace, or even your property gate. No need to drive to Lismore or Ballina.',
      trucksHeavy:
        'The Alstonville Plateau is home to macadamia farms, cattle properties, and a range of agricultural operations. We replace windscreens on tractors, harvesters, and heavy machinery right on your farm or at your Alstonville depot, keeping your operation running without unnecessary trips.',
      adas:
        'Even on the quieter roads around Alstonville and Wollongbar, your vehicle\'s advanced safety systems need to be properly calibrated after a windscreen replacement. We bring our calibration equipment to your location and ensure all cameras and sensors are factory-accurate.',
    },
    faqs: [
      {
        question: 'How fast can you get to Alstonville from Lismore?',
        answer:
          'Alstonville is only about 20 minutes from our Lismore base, making it one of our fastest service areas. We can often provide same-day appointments in Alstonville and Wollongbar.',
      },
      {
        question: 'Do you come out to rural properties around Alstonville?',
        answer:
          'Yes, we regularly service rural properties across the Alstonville Plateau including Rous, Rous Mill, Teven, Meerschaum Vale, and Pearces Creek. We\'re fully mobile and come to wherever your vehicle is.',
      },
      {
        question: 'Can you replace a tractor windscreen on my farm near Alstonville?',
        answer:
          'Absolutely. We carry a range of glass for agricultural machinery and can replace tractor, harvester, and heavy equipment windscreens on-site at your Alstonville area property. Call us for a quote.',
      },
    ],
  },
  {
    slug: 'mullumbimby',
    name: 'Mullumbimby',
    population: '3,500-4,000',
    description:
      'Known for its creative community and rural charm, Mullumbimby is a key part of our service area. We provide mobile windscreen replacement in Mullumbimby, Main Arm, Wilsons Creek, and the surrounding hinterland. No need to drive anywhere — we come to your location.',
    latitude: -28.5500,
    longitude: 153.5000,
    nearbyLocations: ['byron-bay', 'bangalow', 'lismore'],
    region: 'Northern Rivers',
    distanceFromBase: '40 min from Lismore',
    tagline: 'Hinterland town with full mobile coverage',
    whyChooseUs:
      'Mullumbimby and its surrounding hinterland valleys are beautiful — but the winding roads through Main Arm, Wilsons Creek, and Upper Wilsons Creek can be tough on windscreens. Loose gravel, overhanging branches, and narrow bridges all take their toll. We save you the long drive into town by coming directly to your property, no matter how far off the main road you are.',
    suburbs: [
      'Mullumbimby',
      'Main Arm',
      'Wilsons Creek',
      'Upper Wilsons Creek',
      'Huonbrook',
      'Palmwoods',
      'Goonengerry',
      'Montecollum',
    ],
    services: {
      carsUtes:
        'Mullumbimby\'s hinterland roads throw up rocks, gravel, and debris — especially on unsealed stretches through Main Arm and Wilsons Creek. We come to your Mullumbimby address or rural property to replace your windscreen, saving you the drive into Byron Bay or Lismore with a cracked screen.',
      trucksHeavy:
        'The farms and properties surrounding Mullumbimby rely on heavy vehicles and machinery daily. We replace windscreens on trucks, tractors, and equipment on-site at your Mullumbimby area property — whether it\'s a dairy farm in Palmwoods or a construction site near town.',
      adas:
        'The twisting roads between Mullumbimby, Byron Bay, and Bangalow make properly functioning lane assist and auto braking systems essential. After your windscreen replacement, we calibrate all ADAS sensors on-site so you can drive these roads with confidence.',
    },
    faqs: [
      {
        question: 'Do you service Main Arm and Wilsons Creek?',
        answer:
          'Yes, we cover all of the Mullumbimby hinterland including Main Arm, Wilsons Creek, Upper Wilsons Creek, Huonbrook, and Goonengerry. We\'re fully mobile and come directly to your property.',
      },
      {
        question: 'Can you get to rural properties outside Mullumbimby?',
        answer:
          'Absolutely. We regularly service properties throughout the Mullumbimby hinterland, even those on unsealed roads. Just give us your address and we\'ll come to you — no job is too remote for us in this area.',
      },
      {
        question: 'How do I book a windscreen replacement in Mullumbimby?',
        answer:
          'Simply call Nigel on 0466 140 195. We\'ll arrange a time that suits you, and come to your Mullumbimby location — whether that\'s your home, workplace, or a rural property. Most bookings can be done same-day or next-day.',
      },
    ],
  },
  {
    slug: 'bangalow',
    name: 'Bangalow',
    population: '1,500-2,000',
    description:
      'This historic village with its heritage streetscape is a favourite in the Northern Rivers. We offer mobile windscreen replacement in Bangalow, Newrybar, and the surrounding countryside. From the main street to rural properties, our mobile service reaches you wherever you are.',
    latitude: -28.6833,
    longitude: 153.5333,
    nearbyLocations: ['byron-bay', 'alstonville', 'mullumbimby'],
    region: 'Northern Rivers',
    distanceFromBase: '30 min from Lismore',
    tagline: 'Historic village with mobile windscreen service',
    whyChooseUs:
      'Bangalow may be a small town, but it\'s surrounded by rolling hills, farms, and winding roads that are tough on windscreens. Driving to Lismore or Ballina for a replacement means time away from your day. We eliminate that hassle completely — coming to your Bangalow home, your Newrybar property, or even your spot in the village main street. Quick, professional, and local.',
    suburbs: [
      'Bangalow',
      'Newrybar',
      'Fernleigh',
      'Nashua',
      'Possum Creek',
      'Coorabell',
      'Federal',
    ],
    services: {
      carsUtes:
        'The roads around Bangalow — from the curves through Newrybar to the back roads towards Federal and Coorabell — regularly send stones and debris into windscreens. We come to your Bangalow location and have your windscreen replaced on the spot, so you don\'t waste half a day driving to a workshop.',
      trucksHeavy:
        'Bangalow\'s surrounding properties rely on trucks, tractors, and farm equipment. We replace windscreens on heavy vehicles and machinery on-site at your Bangalow area farm or work site, whether it\'s a cattle property in Nashua or a macadamia farm near Newrybar.',
      adas:
        'The winding road between Bangalow and Byron Bay is one of the most-driven stretches in the region, and your vehicle\'s safety systems need to work perfectly on these curves. We recalibrate all ADAS cameras and sensors after windscreen replacement at your Bangalow location.',
    },
    faqs: [
      {
        question: 'Do you service Newrybar and Federal?',
        answer:
          'Yes, we cover the entire Bangalow area including Newrybar, Federal, Coorabell, Nashua, Possum Creek, and Fernleigh. We come to your property no matter where you are in the hinterland.',
      },
      {
        question: 'Can you come to my property on a rural road near Bangalow?',
        answer:
          'Absolutely. We service rural properties throughout the Bangalow hinterland every week. Unsealed roads are no problem — just give us your address and we\'ll be there.',
      },
      {
        question: 'How much does a windscreen replacement cost in Bangalow?',
        answer:
          'Pricing depends on your vehicle make and model. There\'s no extra charge for our mobile service to Bangalow — you get the same competitive price as if you came to us. Call 0466 140 195 for a free no-obligation quote.',
      },
    ],
  },
  {
    slug: 'lennox-head',
    name: 'Lennox Head',
    population: '8,000-9,000',
    description:
      'Lennox Head is a growing coastal village known for its stunning Seven Mile Beach and laid-back community. We provide mobile windscreen replacement throughout Lennox Head and the surrounding area, from the village centre to properties along the coast. No workshop visit needed — we come to you.',
    latitude: -28.7833,
    longitude: 153.5833,
    nearbyLocations: ['ballina', 'alstonville', 'byron-bay'],
    region: 'Northern Rivers',
    distanceFromBase: '30 min from Lismore',
    tagline: 'Coastal village with on-site mobile service',
    whyChooseUs:
      'Lennox Head sits right between Ballina and Byron Bay on one of the busiest stretches of coast in the Northern Rivers. The Pacific Highway and coastal roads see heavy traffic daily, and loose gravel from nearby construction and development can easily damage your windscreen. We come to your Lennox Head home, your workplace, or wherever your car is parked — so you don\'t have to drive to Ballina or Byron with a cracked screen.',
    suburbs: [
      'Lennox Head',
      'Skennars Head',
      'Tintenbar',
      'Knockrow',
      'Broken Head',
    ],
    services: {
      carsUtes:
        'Living in Lennox Head means daily exposure to coastal conditions — salt air, sand, and heavy traffic on the road to Ballina and Byron Bay. Chips and cracks spread fast in this environment. We come to your Lennox Head address and replace your windscreen on-site, whether you\'re near the village shops or up on the hill at Skennars Head.',
      trucksHeavy:
        'With ongoing development and rural properties surrounding Lennox Head, trucks and heavy machinery are a common sight. We replace windscreens on-site for construction equipment, farm vehicles, and trucks operating in the Lennox Head area — keeping your gear on the job with zero downtime.',
      adas:
        'The road between Lennox Head and Ballina is one of the most-driven in the region, and your vehicle\'s lane assist and auto braking systems need to work perfectly. After every windscreen replacement, we recalibrate all ADAS sensors at your Lennox Head location using manufacturer-approved equipment.',
    },
    faqs: [
      {
        question: 'Do you service Skennars Head and Tintenbar?',
        answer:
          'Yes, we cover all areas around Lennox Head including Skennars Head, Tintenbar, Knockrow, and Broken Head. We come directly to your location — no need to drive anywhere.',
      },
      {
        question: 'How quickly can you get to Lennox Head?',
        answer:
          'Lennox Head is about 30 minutes from our Lismore base and we make regular trips to the coastal area. We can usually offer same-day or next-day appointments. Call 0466 140 195 to book.',
      },
      {
        question: 'Is there an extra charge for mobile service to Lennox Head?',
        answer:
          'No, there\'s no extra charge for our mobile service to Lennox Head. You get the same competitive pricing regardless of your location in our service area. Call for a free quote.',
      },
    ],
  },
  {
    slug: 'bentley',
    name: 'Bentley',
    population: '400-500',
    description:
      'Bentley is a small but industrious rural community west of Lismore, home to timber yards, quarries, and farming operations that keep the Northern Rivers building and growing. We provide mobile windscreen replacement directly to your work site, yard, or property — no need to pull machinery off the job or drive into town.',
    latitude: -28.7500,
    longitude: 153.0667,
    nearbyLocations: ['lismore', 'alstonville', 'mullumbimby'],
    region: 'Northern Rivers',
    distanceFromBase: '25 min from Lismore',
    tagline: 'Timber yards, quarries & rural mobile service',
    whyChooseUs:
      'Bentley\'s timber yards and quarries are tough environments — flying debris, gravel, dust, and heavy loads mean windscreen damage is a regular part of operations. We understand that pulling a loader or truck off-site for a windscreen replacement costs you time and money. That\'s why we come directly to your yard, quarry, or work site. Same goes for the farming properties and rural homes in the surrounding area. We\'re only 25 minutes from Lismore, and we know these roads and industries well.',
    suburbs: [
      'Bentley',
      'Bexhill',
      'Eltham',
      'Clunes',
      'Corndale',
      'Repentance Creek',
    ],
    services: {
      carsUtes:
        'Bentley\'s gravel roads, unsealed tracks, and heavy vehicle traffic from timber and quarry operations make windscreen damage a fact of life. Rocks kicked up by trucks and loose gravel can crack your screen in an instant. We come to your Bentley home or property and replace your windscreen on the spot — no need to drive into Lismore with a damaged screen.',
      trucksHeavy:
        'Bentley\'s timber yards and quarries rely on trucks, loaders, excavators, and heavy machinery daily — and these tough environments mean windscreen damage is unavoidable. We replace windscreens on-site at your timber yard, quarry face, depot, or farm property so your equipment stays on the job. From log trucks to wheel loaders, we\'ve got you covered.',
      adas:
        'Even on the rural roads around Bentley, modern trucks and vehicles rely on ADAS safety systems. After any windscreen replacement, we recalibrate your forward-facing cameras and sensors on-site to ensure they\'re working accurately — critical for the winding, narrow roads between Bentley and Lismore.',
    },
    faqs: [
      {
        question: 'Can you come to a timber yard or quarry in Bentley?',
        answer:
          'Absolutely. We regularly service timber yards and quarries in the Bentley area. We come directly to your work site with all the equipment we need, so your machinery stays on-site and downtime is minimal.',
      },
      {
        question: 'What heavy machinery windscreens can you replace?',
        answer:
          'We replace windscreens on a wide range of heavy equipment common in Bentley\'s timber and quarry operations — including loaders, excavators, bulldozers, trucks, tractors, and forklifts. Call 0466 140 195 with your machine details for a quote.',
      },
      {
        question: 'Is there an extra charge for coming out to Bentley?',
        answer:
          'No, there\'s no extra travel charge for our mobile service to Bentley. You get the same competitive pricing as anywhere else in our service area. Bentley is only 25 minutes from our Lismore base.',
      },
    ],
  },
  {
    slug: 'evans-head',
    name: 'Evans Head',
    population: '3,000-3,500',
    description:
      'Evans Head is a quiet coastal town at the mouth of the Evans River, known for its pristine beaches and relaxed lifestyle. We bring our mobile windscreen replacement service to Evans Head and the surrounding area, so you don\'t need to drive to Ballina or Lismore for a repair.',
    latitude: -29.1167,
    longitude: 153.4333,
    nearbyLocations: ['ballina', 'lismore', 'alstonville'],
    region: 'Northern Rivers',
    distanceFromBase: '40 min from Lismore',
    tagline: 'Quiet coastal town with mobile service',
    whyChooseUs:
      'Evans Head is a bit further south from our Lismore base, but that doesn\'t mean you should have to drive an hour to Ballina or Lismore with a cracked windscreen. We bring our full mobile service to Evans Head regularly, covering the town centre, Woodburn Road properties, and surrounding areas. Same professional service, same competitive pricing — right at your doorstep.',
    suburbs: [
      'Evans Head',
      'Woodburn',
      'Broadwater',
      'Rileys Hill',
      'Iron Gates',
      'Doonbah',
    ],
    services: {
      carsUtes:
        'Evans Head\'s coastal roads and the Pacific Highway stretch south of Ballina are common spots for windscreen damage from road debris. We drive to your Evans Head home or workplace and replace your windscreen on the spot — no need for a long trip up to Ballina or across to Lismore.',
      trucksHeavy:
        'The farming properties and sugar cane fields surrounding Evans Head and Woodburn rely on trucks and heavy machinery year-round. We come on-site to replace windscreens on your equipment wherever it is — at your depot, in the field, or at a construction site near town.',
      adas:
        'Driving the Pacific Highway between Evans Head and Ballina requires properly calibrated safety systems. After replacing your windscreen, we recalibrate all ADAS cameras and sensors at your Evans Head location so your lane keeping and auto braking are accurate for highway driving.',
    },
    faqs: [
      {
        question: 'Do you service Evans Head regularly?',
        answer:
          'Yes, we make regular trips to Evans Head and the surrounding area including Woodburn, Broadwater, and Rileys Hill. We can usually offer same-day or next-day appointments depending on scheduling.',
      },
      {
        question: 'Do you also cover Woodburn and Broadwater?',
        answer:
          'Absolutely. We service Evans Head and all surrounding towns including Woodburn, Broadwater, Rileys Hill, Iron Gates, and Doonbah. We come to your location wherever you are in the area.',
      },
      {
        question: 'How far is Evans Head from your base?',
        answer:
          'Evans Head is about 40 minutes from our Lismore base. Despite the distance, there\'s no extra charge for our mobile service — you get the same competitive pricing as anywhere else in our service area.',
      },
    ],
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((loc) => loc.slug === slug);
}

export function getLocationSlugs(): string[] {
  return locations.map((loc) => loc.slug);
}
