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

export interface BlogPost {
  slug: string;
  displayOrder: number;
  title: string;
  subTitle: string;
  story: string;
  publishedAt: string;
  images: ImageMetadata[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'volvo-truck-windscreen-replacement',
    displayOrder: 0,
    title: 'Volvo Truck Windscreen Replacement',
    subTitle: 'Emergency Rock Damage Repair for Volvo Truck Driver',
    story: `When John's Volvo truck windscreen was shattered by flying rocks on the road, he needed a fast turnaround — every hour off the road meant lost income. As a full-time truck driver, he couldn't afford to wait around for days. We booked him in for a next-day windscreen replacement and had his Volvo back on the road within just two hours. Whether it's a heavy vehicle, commercial truck, or fleet repair, we understand that downtime costs money, so we make getting you back behind the wheel our top priority.`,
    publishedAt: '2026-02-07',
    images: [volvo1, volvo0, volvo2, volvo3],
  },
  {
    slug: 'vintage-volkswagen-karmann-ghia',
    displayOrder: 1,
    title: 'Vintage Volkswagen Karmann Ghia',
    subTitle: 'Classic Car Windscreen Replacement for a Volkswagen Karmann Ghia',
    story: `Steve is a proud owner of a stunning vintage Volkswagen Karmann Ghia, spending his weekends cruising local roads and showing it off at classic car events. When he noticed his windscreen and windows were looking tired, hazy, and worse for wear, he knew they needed replacing before his next car show — because when you're presenting a classic, every detail matters. Steve gave us a call, and we were able to fit him in that same week with a mobile visit to his home. From rare vintage vehicles to everyday classics, we specialise in sourcing and fitting windscreens for older and hard-to-find models, so your pride and joy always looks its best.`,
    publishedAt: '2026-02-07',
    images: [vw0, vw1, vw2, vw3, vw4],
  },
  {
    slug: 'toyota-rav4-hail-damage',
    displayOrder: 2,
    title: 'Toyota RAV4 Windscreen Replacement After Severe Hail Damage',
    subTitle: 'A badly hail-damaged Toyota RAV4 windscreen replaced in-house by the Local Autoglass team — from smashed to brand new in one visit.',
    story: `A badly hail-damaged Toyota RAV4 windscreen replaced in-house by the Local Autoglass team — from smashed to brand new in one visit.\n\nThis red Toyota RAV4 came into the Local Autoglass workshop with a completely shattered windscreen caused by a severe hail storm. The damage was extensive across the entire surface of the glass, making it well beyond repair and requiring a full replacement.\n\nOur technician carefully removed the destroyed windscreen, cleaned and prepped the frame, then fitted and bonded a brand new windscreen securely into place. Retention tape was applied to ensure a safe seal while the adhesive cured. The RAV4 left the workshop with a crystal clear new windscreen, ready to get back on the road. If your vehicle has been caught in a hail storm, contact Local Autoglass today for a fast, professional windscreen replacement.`,
    publishedAt: '2026-02-15',
    images: [rav4_0, rav4_1, rav4_2, rav4_3],
  },
  {
    slug: 'adas-windscreen-calibration',
    displayOrder: 3,
    title: 'ADAS Calibration After Windscreen Replacement',
    subTitle: "A new windscreen means nothing if your ADAS camera hasn't been recalibrated — here's why it matters.",
    story: `Modern vehicles rely on cameras and sensors mounted to the windscreen to power safety features like automatic emergency braking, lane departure warning and forward collision alerts. When a windscreen is replaced, even the slightest shift in camera position can throw these systems out of alignment, putting you and other road users at risk.\n\nAt Local Autoglass, we use specialised calibration equipment and follow manufacturer procedures to recalibrate your ADAS camera to factory specifications after every windscreen replacement. Skipping this step can cause your vehicle to misjudge distances, miss hazards or trigger false warnings. If you've recently had a windscreen replaced and aren't sure if your ADAS was recalibrated, contact Local Autoglass today for a professional calibration you can trust.`,
    publishedAt: '2026-02-15',
    images: [adas0, adas1, adas2, adas3],
  },
  {
    slug: 'kenworth-truck-windscreen-replacement',
    displayOrder: 4,
    title: 'Kenworth Truck Windscreen Replacement After Stress Fractures',
    subTitle: 'A Kenworth truck with stress fractures across the windscreen panels brought into the Local Autoglass workshop for a full replacement.',
    story: `This white Kenworth cabover truck came to Local Autoglass with visible stress fractures running across multiple windscreen panels. Over time, vibrations from heavy use and temperature changes had taken their toll on the glass, compromising visibility and safety.\n\nOur technician used suction cup lifters to carefully remove the damaged panels and fit fresh new glass across the full windscreen. The Kenworth left the workshop with clear, crack-free windscreens ready for the road ahead. If your truck is showing signs of stress cracks, don't wait until they spread — contact Local Autoglass for a professional replacement.`,
    publishedAt: '2026-02-15',
    images: [kenworth3, kenworth0, kenworth1, kenworth2],
  },
  {
    slug: 'toyota-landcruiser-windscreen-replacement',
    displayOrder: 5,
    title: 'Toyota LandCruiser Mobile Windscreen Replacement',
    subTitle: 'A worn-out Toyota LandCruiser windscreen replaced on-site by the Local Autoglass mobile service — no need to leave the property.',
    story: `This white Toyota LandCruiser ute was long overdue for a windscreen replacement. Years of exposure to harsh sun, dust and rough rural conditions had left the glass cloudy, scratched and difficult to see through — a common problem known as sandblasting. Vehicles regularly driven on unsealed roads and dirt tracks cop a constant battering from fine debris, which gradually wears away at the surface of the windscreen and reduces visibility over time.\n\nOur technician travelled to the customer's property with a fully equipped mobile service vehicle, removed the old windscreen, prepped the frame and fitted a brand new replacement using suction cup lifters for a precise installation. The LandCruiser was back in action with a clear new windscreen without the owner having to leave home. If your windscreen is looking worse for wear from years on dirt roads, contact Local Autoglass for a convenient mobile replacement service.`,
    publishedAt: '2026-02-15',
    images: [lc0, lc1, lc2, lc3],
  },
].sort((a, b) => a.displayOrder - b.displayOrder);
