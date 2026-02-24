export interface Testimonial {
  initials: string;
  name: string;
  location: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    initials: 'JS',
    name: 'John S.',
    location: 'Ballina',
    text: 'Nigel was fantastic. Came out to the farm to fix the tractor glass. saved me hauling it into town. Highly recommend.',
  },
  {
    initials: 'EM',
    name: 'Emily M.',
    location: 'Lismore',
    text: 'Fast, friendly and affordable. I called in the morning and my windscreen was replaced at my work by lunch.',
  },
  {
    initials: 'DK',
    name: 'David K.',
    location: 'Byron Bay',
    text: 'Great price compared to the big chains. Local family business that actually cares about the job. Thanks guys!',
  },
];
