import type { ImageMetadata } from 'astro';

// Volvo truck images
import volvo0 from '../assets/blog/volvo-truck-windscreen-replacement/1771128469581-0.jpg';
import volvo1 from '../assets/blog/volvo-truck-windscreen-replacement/1771128475356-1.jpg';
import volvo2 from '../assets/blog/volvo-truck-windscreen-replacement/1771128483150-2.jpg';
import volvo3 from '../assets/blog/volvo-truck-windscreen-replacement/1771128486668-3.jpg';

// Vintage VW Karmann Ghia images
import vw0 from '../assets/blog/vintage-volkswagen-karmann-ghia/0-1770431963943.jpg';
import vw1 from '../assets/blog/vintage-volkswagen-karmann-ghia/1-1770431972983.jpg';
import vw2 from '../assets/blog/vintage-volkswagen-karmann-ghia/2-1770431988275.jpg';
import vw3 from '../assets/blog/vintage-volkswagen-karmann-ghia/3-1770432001428.jpg';
import vw4 from '../assets/blog/vintage-volkswagen-karmann-ghia/4-1770432014502.jpg';

// Toyota RAV4 hail damage images
import rav4_0 from '../assets/blog/toyota-rav4-hail-damage/1771128341914-0.jpg';
import rav4_1 from '../assets/blog/toyota-rav4-hail-damage/1771128348956-1.jpg';
import rav4_2 from '../assets/blog/toyota-rav4-hail-damage/1771128351924-2.jpg';
import rav4_3 from '../assets/blog/toyota-rav4-hail-damage/1771128357385-3.png';

// ADAS calibration images
import adas0 from '../assets/blog/adas-windscreen-calibration/1771128058494-1.jpg';
import adas1 from '../assets/blog/adas-windscreen-calibration/1771128067751-2.jpg';
import adas2 from '../assets/blog/adas-windscreen-calibration/1771128072875-3.jpg';
import adas3 from '../assets/blog/adas-windscreen-calibration/1771128075866-4.jpg';

// Kenworth truck images
import kenworth0 from '../assets/blog/kenworth-truck-windscreen-replacement/0-1770431340796.jpg';
import kenworth1 from '../assets/blog/kenworth-truck-windscreen-replacement/1-1770431349711.jpg';
import kenworth2 from '../assets/blog/kenworth-truck-windscreen-replacement/2-1770431360728.jpg';
import kenworth3 from '../assets/blog/kenworth-truck-windscreen-replacement/3-1770431373161.jpg';

// Toyota LandCruiser images
import lc0 from '../assets/blog/toyota-landcruiser-windscreen-replacement/1771128551423-0.jpg';
import lc1 from '../assets/blog/toyota-landcruiser-windscreen-replacement/1771128555597-1.jpg';
import lc2 from '../assets/blog/toyota-landcruiser-windscreen-replacement/1771128560229-2.jpg';
import lc3 from '../assets/blog/toyota-landcruiser-windscreen-replacement/1771128567594-3.jpg';

export interface RelatedLink {
  label: string;
  url: string;
}

export interface BlogPost {
  slug: string;
  displayOrder: number;
  title: string;
  subTitle: string;
  story: string;
  publishedAt: string;
  images: ImageMetadata[];
  relatedLinks: RelatedLink[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'volvo-truck-windscreen-replacement',
    displayOrder: 0,
    title: 'Volvo Truck Windscreen Replacement',
    subTitle: 'Emergency Rock Damage Repair for Volvo Truck Driver',
    story: `When John's Volvo truck windscreen was shattered by flying rocks on the road, he needed a fast turnaround — every hour off the road meant lost income. As a full-time truck driver based in the Northern Rivers, he couldn't afford to wait around for days while a workshop squeezed him into their schedule. He gave us a call, we booked him in for a next-day windscreen replacement, and had his Volvo back on the road within just two hours.

For truck drivers and fleet operators, a damaged windscreen isn't just an inconvenience — it's a safety hazard and a compliance issue. In New South Wales, driving a heavy vehicle with a cracked or shattered windscreen can result in a defect notice, which means the truck is off the road until it's fixed. That's why we prioritise commercial vehicle jobs and offer same-day or next-day service whenever possible.

Replacing a windscreen on a heavy vehicle like a Volvo truck is a different job to a standard car. The glass panels are larger and heavier, often requiring suction cup lifters and two people to handle safely. The bonding adhesive needs to cure properly before the truck can get back on the road — rush this step and you risk the windscreen popping out under pressure, which is a serious safety risk at highway speed.

Sourcing glass for commercial trucks can also be tricky. Unlike passenger cars where parts are readily available through major distributors, truck windscreens — especially for European brands like Volvo, Scania, and Mercedes — sometimes need to be sourced from specialist suppliers. We maintain relationships with multiple glass suppliers across Australia so we can get the right part quickly, even for less common makes and models.

One thing truck owners often don't realise is how much road vibration contributes to windscreen damage. Trucks cop far more vibration than passenger vehicles, and a small chip from a rock strike can spread into a full crack within days — especially with the temperature swings we get in the Northern Rivers, where mornings can be cool and afternoons hot. If you notice a chip, it's worth getting it looked at sooner rather than later. A small repair now can save you the cost of a full replacement down the track.

We service all types of heavy vehicles across the Northern Rivers — from delivery trucks and rigid bodies to prime movers and cab-over models. Whether you're based in Lismore, Ballina, Byron Bay, or anywhere in between, we come to you. No need to drive your truck to a workshop and lose a full day waiting around. We bring everything we need in our mobile service vehicle and get the job done on-site, at your depot, or wherever the truck is parked.

If your truck has a cracked or damaged windscreen, don't wait until it fails a roadworthy inspection or gets a defect notice. Give us a call on 0466 140 195 for a free quote and we'll get you sorted fast.`,
    publishedAt: '2026-02-07',
    images: [volvo1, volvo0, volvo2, volvo3],
    relatedLinks: [
      { label: 'Truck & Heavy Machinery Windscreen Replacement', url: '/services' },
      { label: 'Kenworth Truck Windscreen Replacement', url: '/blog/kenworth-truck-windscreen-replacement' },
      { label: 'Windscreen Replacement FAQs', url: '/faq' },
    ],
  },
  {
    slug: 'vintage-volkswagen-karmann-ghia',
    displayOrder: 1,
    title: 'Vintage Volkswagen Karmann Ghia',
    subTitle: 'Classic Car Windscreen Replacement for a Volkswagen Karmann Ghia',
    story: `Steve is a proud owner of a stunning vintage Volkswagen Karmann Ghia, spending his weekends cruising local roads and showing it off at classic car events around the Northern Rivers. When he noticed his windscreen and windows were looking tired, hazy, and worse for wear, he knew they needed replacing before his next car show — because when you're presenting a classic, every detail matters.

Steve gave us a call, and we were able to fit him in that same week with a mobile visit to his home. From rare vintage vehicles to everyday classics, we specialise in sourcing and fitting windscreens for older and hard-to-find models, so your pride and joy always looks its best.

Working on classic cars is one of the more rewarding parts of what we do, but it comes with its own set of challenges. The biggest one is sourcing the glass itself. Modern vehicle windscreens are mass-produced and readily available through standard auto glass suppliers, but vintage models like the Karmann Ghia often require specialist sourcing — sometimes from overseas. The Karmann Ghia was produced from 1955 to 1974, and the windscreen shape changed across different model years, so getting the right fit means knowing exactly which year and variant you're dealing with.

Another key difference with older vehicles is how the glass is fitted. Most modern cars use a bonded windscreen — the glass is glued directly to the body of the vehicle using polyurethane adhesive, forming a structural bond. Older cars like the Karmann Ghia typically use a rubber seal (also called a rubber gasket or weatherstrip) that holds the glass in place mechanically. Fitting a rubber-seal windscreen is a different technique entirely. You need to work the rubber around the glass and the body flange carefully, using a pull cord to seat the seal properly without cracking the glass. It takes patience and experience to get right.

We also see a lot of classic car owners in the Northern Rivers who drive their vehicles regularly — not just for shows, but as weekend cruisers. Over time, the original glass develops fine scratches, haze from UV exposure, and sometimes delamination (where the layers of laminated glass start to separate, creating a cloudy or bubbly appearance). None of these issues are dangerous in the short term, but they reduce visibility and take away from the look of the car.

If you own a classic or vintage vehicle in the Northern Rivers and need a windscreen or window replacement, give us a call. We've handled everything from 1960s Volkswagens to classic Holdens and Fords. We'll source the right glass, come to your home, and fit it properly — no need to trailer the car anywhere.`,
    publishedAt: '2026-02-07',
    images: [vw0, vw1, vw2, vw3, vw4],
    relatedLinks: [
      { label: 'Our Services', url: '/services' },
      { label: 'See More of Our Work', url: '/photos' },
      { label: 'Windscreen Replacement FAQs', url: '/faq' },
    ],
  },
  {
    slug: 'toyota-rav4-hail-damage',
    displayOrder: 2,
    title: 'Toyota RAV4 Windscreen Replacement After Severe Hail Damage',
    subTitle: 'A badly hail-damaged Toyota RAV4 windscreen replaced by the Local Autoglass team — from smashed to brand new in one visit.',
    story: `This red Toyota RAV4 came to Local Autoglass with a completely shattered windscreen caused by a severe hail storm. The damage was extensive across the entire surface of the glass, making it well beyond repair and requiring a full replacement.

Our technician carefully removed the destroyed windscreen, cleaned and prepped the frame, then fitted and bonded a brand new windscreen securely into place. Retention tape was applied to ensure a safe seal while the adhesive cured. The RAV4 left with a crystal clear new windscreen, ready to get back on the road.

Hail damage is something we deal with regularly in the Northern Rivers, especially during storm season from October through to March. When a severe storm rolls through, we often get a surge of calls from vehicle owners who've had their windscreens cracked, chipped, or completely destroyed by hailstones. In a bad storm, hailstones the size of golf balls can hit with enough force to shatter a windscreen in seconds.

After a hail storm, it's worth taking a close look at your windscreen — even if it hasn't shattered outright. Hail can leave small chips and impact points that might not be immediately obvious but can spread into larger cracks over time, especially with temperature changes and road vibration. If you spot any damage, it's better to get it assessed sooner rather than later.

When it comes to deciding between a windscreen repair and a full replacement, it depends on the size, location, and severity of the damage. As a general rule, small chips (smaller than a 20-cent coin) that aren't in the driver's direct line of sight can often be repaired with a resin injection. But if the damage is larger, if there are multiple impact points, or if cracks have started to spread — it's a replacement job. With hail damage like the RAV4 had, there's no question — the entire windscreen needs to come out.

If your vehicle is comprehensively insured, your windscreen replacement is usually covered under your policy. Most major Australian insurers — including NRMA, Suncorp, AAMI, and Allianz — cover windscreen replacement, and in many cases it won't affect your no-claim bonus. The process is straightforward: call your insurer, get a claim number, and then book in with us. We handle insurance jobs regularly and can work directly with your insurer to make it as hassle-free as possible.

For those without comprehensive insurance, we offer competitive pricing on all windscreen replacements and can provide a free quote over the phone. Whether your vehicle has been caught in a hail storm or picked up damage from road debris, contact Local Autoglass on 0466 140 195 and we'll get you sorted.`,
    publishedAt: '2026-02-15',
    images: [rav4_0, rav4_1, rav4_2, rav4_3],
    relatedLinks: [
      { label: 'Our Services', url: '/services' },
      { label: 'Insurance & Warranty FAQs', url: '/faq' },
      { label: 'ADAS Calibration After Windscreen Replacement', url: '/blog/adas-windscreen-calibration' },
    ],
  },
  {
    slug: 'adas-windscreen-calibration',
    displayOrder: 3,
    title: 'ADAS Calibration After Windscreen Replacement',
    subTitle: "A new windscreen means nothing if your ADAS camera hasn't been recalibrated — here's why it matters.",
    story: `Modern vehicles rely on cameras and sensors mounted to the windscreen to power safety features like automatic emergency braking, lane departure warning, forward collision alerts, and adaptive cruise control. These systems are collectively known as ADAS — Advanced Driver Assistance Systems. When a windscreen is replaced, even the slightest shift in camera position can throw these systems out of alignment, putting you and other road users at risk.

At Local Autoglass, we use specialised calibration equipment and follow manufacturer procedures to recalibrate your ADAS camera to factory specifications after every windscreen replacement. Skipping this step can cause your vehicle to misjudge distances, miss hazards, or trigger false warnings — none of which you want happening at 100 km/h on the Pacific Highway.

So what exactly happens during an ADAS calibration? There are two main types: static calibration and dynamic calibration.

Static calibration is performed in a controlled environment — typically a workshop or flat, level surface. A calibration target (a specific pattern board) is positioned at a precise distance and angle in front of the vehicle's camera. The calibration equipment then communicates with the vehicle's onboard computer to realign the camera to the manufacturer's specifications. This process usually takes between 30 minutes and an hour, depending on the vehicle.

Dynamic calibration is done by driving the vehicle on a stretch of road at a specific speed — usually between 60 and 100 km/h — for a set distance while the system recalibrates itself using road markings and the surrounding environment. Some vehicles require a static calibration first, followed by a dynamic calibration drive to complete the process.

Which type your vehicle needs depends on the make and model. Toyota, Mazda, Subaru, Honda, Hyundai, Kia, Volkswagen, and most other major brands now fit ADAS cameras to their newer models. If your vehicle was built after 2015 and has features like lane keep assist or automatic emergency braking, it almost certainly has an ADAS camera mounted to the windscreen. Some vehicles — particularly European brands like BMW, Mercedes, and Audi — may require both static and dynamic calibration.

One of the most common questions we get is: "Do I really need ADAS calibration after a windscreen replacement?" The short answer is yes — every time. Even though the new windscreen might look identical to the old one, the camera mounting position can shift by fractions of a millimetre during the replacement process. That tiny shift translates to significant misalignment at distance. A camera that's off by just one degree can be looking at a completely different spot 50 metres down the road.

Not every auto glass business offers ADAS calibration — many will replace the windscreen and send you to a dealer for the calibration, which means extra time and cost. At Local Autoglass, we handle both the replacement and the calibration in one visit, so you're not running around between workshops.

If you've recently had a windscreen replaced and aren't sure if your ADAS was recalibrated, or if you've noticed your lane departure warning behaving strangely or your adaptive cruise control not responding as expected, contact Local Autoglass on 0466 140 195 for a professional calibration you can trust.`,
    publishedAt: '2026-02-15',
    images: [adas0, adas1, adas2, adas3],
    relatedLinks: [
      { label: 'Our Services — ADAS Calibration', url: '/services' },
      { label: 'ADAS Calibration FAQs', url: '/faq' },
      { label: 'Toyota RAV4 Windscreen Replacement', url: '/blog/toyota-rav4-hail-damage' },
    ],
  },
  {
    slug: 'kenworth-truck-windscreen-replacement',
    displayOrder: 4,
    title: 'Kenworth Truck Windscreen Replacement After Stress Fractures',
    subTitle: 'A Kenworth truck with stress fractures across the windscreen panels brought into the Local Autoglass workshop for a full replacement.',
    story: `This white Kenworth cabover truck came to Local Autoglass with visible stress fractures running across multiple windscreen panels. Over time, vibrations from heavy use and temperature changes had taken their toll on the glass, compromising visibility and safety.

Our technician used suction cup lifters to carefully remove the damaged panels and fit fresh new glass across the full windscreen. The Kenworth left the workshop with clear, crack-free windscreens ready for the road ahead.

Stress fractures in truck windscreens are one of the most common issues we see with heavy vehicles, and they're quite different from the rock chips and impacts that typically damage car windscreens. A stress fracture usually starts at the edge of the glass — right where the windscreen meets the frame — and slowly spreads inward over time. They're caused by a combination of factors that trucks are particularly exposed to.

The first is vibration. Trucks generate far more vibration than passenger vehicles, especially when loaded. Every bump, pothole, and rough stretch of road sends vibrations through the cab and into the windscreen. Over thousands of kilometres, this constant vibration fatigues the glass, particularly at the edges where it's bonded to the frame.

The second factor is thermal stress. In the Northern Rivers, mornings can be cool — sometimes dropping below 10°C in winter — while afternoons push above 30°C in summer. Glass expands and contracts with temperature changes, and the edges of the windscreen (which are shaded by the frame) heat and cool at a different rate to the centre. This uneven expansion creates stress at the edges, which is exactly where fractures start.

The third factor is body flex. Truck cabs flex under load — when the tray is loaded, when going over uneven ground, or when cornering. This puts twisting forces on the windscreen frame, which transfers stress into the glass. Older trucks or trucks with high mileage are more susceptible because the cab mounting rubbers and bushes wear over time, allowing more flex.

If you notice a crack starting from the edge of your truck windscreen, it's worth getting it replaced sooner rather than later. Unlike a chip in the middle of the glass that might be repairable, edge cracks are structural — they weaken the windscreen and will only get worse. In a heavy vehicle that's subject to constant vibration and load stress, a compromised windscreen is a safety risk. It's also a defect that can get picked up in a roadworthy inspection or a roadside heavy vehicle check.

For fleet operators running multiple trucks across the Northern Rivers, we offer flexible scheduling — including weekends and early mornings — to minimise downtime. We can come to your depot or yard, replace the windscreen on-site, and have the truck back in service the same day. No need to take a truck off the road for two days while it sits in a queue at a workshop.

If your truck is showing signs of stress cracks or edge fractures, give us a call on 0466 140 195 for a free quote. We service all truck makes and models across the Northern Rivers, from Kenworth and Mack to Isuzu, Hino, Fuso, and more.`,
    publishedAt: '2026-02-15',
    images: [kenworth3, kenworth0, kenworth1, kenworth2],
    relatedLinks: [
      { label: 'Truck & Heavy Machinery Windscreen Replacement', url: '/services' },
      { label: 'Volvo Truck Windscreen Replacement', url: '/blog/volvo-truck-windscreen-replacement' },
      { label: 'Windscreen Replacement FAQs', url: '/faq' },
    ],
  },
  {
    slug: 'toyota-landcruiser-windscreen-replacement',
    displayOrder: 5,
    title: 'Toyota LandCruiser Mobile Windscreen Replacement',
    subTitle: 'A worn-out Toyota LandCruiser windscreen replaced on-site by the Local Autoglass mobile service — no need to leave the property.',
    story: `This white Toyota LandCruiser ute was long overdue for a windscreen replacement. Years of exposure to harsh sun, dust, and rough rural conditions had left the glass cloudy, scratched, and difficult to see through — a common problem known as sandblasting. Vehicles regularly driven on unsealed roads and dirt tracks cop a constant battering from fine debris, which gradually wears away at the surface of the windscreen and reduces visibility over time.

Our technician travelled to the customer's property with a fully equipped mobile service vehicle, removed the old windscreen, prepped the frame, and fitted a brand new replacement using suction cup lifters for a precise installation. The LandCruiser was back in action with a clear new windscreen without the owner having to leave home.

Sandblasting is one of the most common reasons we replace windscreens on 4WDs and utes in the Northern Rivers. Unlike a rock chip or crack, sandblasting damage happens gradually — you might not notice it day to day, but over months and years the surface of the glass becomes increasingly pitted and hazy. The effect is most noticeable when driving into low sun or at night, when oncoming headlights scatter through the damaged surface and create a distracting glare.

The Northern Rivers has a mix of sealed highways and unsealed rural roads, and plenty of our customers drive vehicles like the LandCruiser, HiLux, Ranger, and Triton on dirt roads regularly — whether it's getting to a rural property, heading to a job site, or just navigating the back roads. All of these vehicles are prime candidates for sandblasting damage.

A sandblasted windscreen isn't just a cosmetic issue — it's a genuine safety concern. Reduced visibility means slower reaction times, and the glare from damaged glass can be blinding in certain light conditions. If your windscreen has reached the point where you're struggling to see clearly, especially in low sun or rain, it's time for a replacement.

One of the big advantages of our mobile service for rural customers is that we come to you. If you're on a property 30 minutes out of Lismore, the last thing you want to do is drive into town, drop your vehicle off, find a way home, then come back to pick it up. We bring everything we need — glass, adhesive, tools, suction lifters — in our mobile service vehicle and do the replacement wherever your vehicle is parked. Your driveway, your shed, your paddock — it doesn't matter. The whole process takes about 15 minutes for a standard windscreen, and you're good to drive within an hour once the adhesive has cured.

We also see a lot of LandCruiser owners who are upgrading or restoring older models — the 70 Series, 80 Series, and 100 Series are all popular in this area. Windscreen availability for older LandCruiser models is generally good since they're such a common vehicle in Australia, but we always confirm the exact part number before we come out so there are no surprises on the day.

If your windscreen is looking worse for wear from years on dirt roads, or if you've picked up a crack or chip from road debris, contact Local Autoglass on 0466 140 195. We service the entire Northern Rivers region — Lismore, Ballina, Byron Bay, Alstonville, Mullumbimby, Bangalow, Lennox Head, Bentley, Evans Head, and everywhere in between.`,
    publishedAt: '2026-02-15',
    images: [lc0, lc1, lc2, lc3],
    relatedLinks: [
      { label: 'Our Services', url: '/services' },
      { label: 'See More of Our Work', url: '/photos' },
      { label: 'Volvo Truck Windscreen Replacement', url: '/blog/volvo-truck-windscreen-replacement' },
    ],
  },
].sort((a, b) => a.displayOrder - b.displayOrder);
