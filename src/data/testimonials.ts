export interface Testimonial {
  initials: string;
  name: string;
  location: string;
  text: string;
  source: string;
}

export const testimonials: Testimonial[] = [
  {
    initials: 'JS',
    name: 'John S.',
    location: 'Ballina',
    text: 'Nigel was fantastic. Came out to the farm to fix the tractor glass. saved me hauling it into town. Highly recommend.',
    source: 'Google Review',
  },
  {
    initials: 'EM',
    name: 'Emily M.',
    location: 'Lismore',
    text: 'Fast, friendly and affordable. I called in the morning and my windscreen was replaced at my work by lunch.',
    source: 'Google Review',
  },
  {
    initials: 'DK',
    name: 'David K.',
    location: 'Byron Bay',
    text: 'Great price compared to the big chains. Local family business that actually cares about the job. Thanks guys!',
    source: 'Google Review',
  },
];
