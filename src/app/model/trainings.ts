export interface Training {
  name: string;
  slug: string;
  id: number;
}

function add(name, slug, id): Training {
  return {name, slug, id};
}

export const trainingMock = [
  add('Getting to No!', 'no', 0),
  add('Mindfulness on work', 'mindfulness', 1),
  add('Eating disorder', 'eating', 2),
  add('Sleep disorder', 'sleep', 3),
  add('Loneliness', 'lonely', 4),
];