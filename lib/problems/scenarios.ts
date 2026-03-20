// lib/problems/scenarios.ts
// Shared vocabulary for injecting real-world context into problem stems.
// All arrays are designed for rng.pick() — order doesn't matter.
// Add more entries freely; larger arrays = more variety.

export const NAMES = [
  'Maya', 'Jordan', 'Sam', 'Priya', 'Luca', 'Aisha', 'Carlos', 'Zoe',
  'Dev', 'Elena', 'Marcus', 'Sofia', 'Kai', 'Nadia', 'Tyler', 'Amara',
  'Noah', 'Leila', 'Finn', 'Rosa', 'Omar', 'Chloe', 'Mateo', 'Yuki',
];

export const SHAPE_OBJECTS: Record<string, string[]> = {
  triangle: [
    'a roof truss', 'a warning sign', 'a slice of pizza', 'a sail',
    'a ramp', 'a sandwich cut diagonally', 'a yield sign', 'a pennant flag',
    'a guitar pick', 'a tortilla chip',
  ],
  square: [
    'a floor tile', 'a chessboard square', 'a sticky note',
    'a coaster', 'a picture frame', 'a patio stone', 'a cracker',
  ],
  rectangle: [
    'a basketball court', 'a garden bed', 'a notebook cover',
    'a door panel', 'a TV screen', 'a swimming pool', 'a parking space',
    'a phone screen', 'a playing card',
  ],
  pentagon: [
    'a home plate on a baseball diamond', 'a badge shape',
    'a tile in a mosaic', 'a building floor plan',
  ],
  hexagon: [
    'a honeycomb cell', 'a floor tile', 'a bolt head',
    'a garden paving stone', 'a hex nut', 'a pencil cross-section',
  ],
  heptagon: [
    'a 50p coin', 'a decorative tile', 'a garden feature',
  ],
  octagon: [
    'a stop sign', 'a bathroom tile', 'a gazebo base', 'a paving stone',
    'an umbrella panel',
  ],
  parallelogram: [
    'a slanted tile', 'a leaning picture frame', 'a ramp side-view',
  ],
};

export const LOCATIONS = [
  'in the school garden', 'at the community centre', 'in the art room',
  'on the sports field', 'in the park', 'at the skate park',
  'in the design lab', 'on the playground', 'in the backyard',
  'at the architecture firm', 'at the craft fair',
];

export const VERBS = [
  'is designing', 'is building', 'is drawing', 'is measuring',
  'is tiling', 'is cutting out', 'is painting',
];
