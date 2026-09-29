/**
 * ---------------------------------------------------------------------------
 * THRESHER ASSEMBLY MAP
 * ---------------------------------------------------------------------------
 * One description of the machine, used twice:
 *   1. by the React Three Fiber model (src/components/three/ThresherMachine.jsx)
 *      which places each sub-assembly group at `position` and pushes it out by
 *      `explode` when the exploded view is enabled;
 *   2. by the interface (technical view list, product detail labels) which
 *      needs the same component names and plain-language descriptions.
 *
 * Units are metres, origin sits on the ground between the transport wheels:
 *   +X = feed end / hopper side,  -X = straw outlet (rear)
 *   +Y = up,                      +Z / -Z = machine sides (drive train on -Z)
 */

export const thresherParts = [
  {
    id: 'chassis',
    label: 'Chassis & Wheel Assembly',
    short: 'Frame',
    description:
      'Welded steel channel frame carrying every sub-assembly. Transport wheels and a front support leg keep the machine level on uneven field ground.',
    position: [0, 0.62, 0],
    explode: [0, -0.5, 0],
  },
  {
    id: 'concave',
    label: 'Concave & Sieve Grates',
    short: 'Concave',
    description:
      'Curved grate under the drum. Grain and broken straw pass through the openings while long straw is carried over to the straw outlet.',
    position: [0.05, 1.0, 0],
    explode: [0, -0.35, 0],
  },
  {
    id: 'drum',
    label: 'Threshing Drum',
    short: 'Drum',
    description:
      'Rasp-bar drum on a machined shaft. It rotates inside the threshing chamber and separates grain from the crop by impact and rubbing.',
    position: [0.05, 1.0, 0],
    explode: [0, 0.6, 0],
    spin: 'drum',
  },
  {
    id: 'hopper',
    label: 'Feeding Hopper',
    short: 'Hopper',
    description:
      'Sloped sheet-metal hopper that guides crop material into the threshing chamber at a controlled rate for even loading.',
    position: [0, 0, 0],
    explode: [-0.25, 0.8, 0],
  },
  {
    id: 'strawOutlet',
    label: 'Straw Outlet',
    short: 'Straw outlet',
    description:
      'Rear duct that discharges threshed straw away from the grain stream so the working area stays clear.',
    position: [-0.62, 1.22, 0],
    explode: [-0.6, 0.45, 0],
  },
  {
    id: 'blower',
    label: 'Blower & Cleaning Fan',
    short: 'Blower',
    description:
      'Fan inside the blower housing produces the cross airflow that lifts chaff and dust out of the grain before it reaches the outlet.',
    position: [-0.34, 0.62, 0],
    explode: [0.35, -0.3, 0.85],
    spin: 'blower',
  },
  {
    id: 'grainOutlet',
    label: 'Grain Outlet',
    short: 'Grain outlet',
    description:
      'Angled chute that delivers cleaned grain to a sack, trolley or collection tray at working height.',
    position: [0.3, 0.72, 0],
    explode: [0.55, -0.15, 0.6],
  },
  {
    id: 'engine',
    label: 'Engine / Motor Unit',
    short: 'Engine',
    description:
      'Diesel engine or electric motor mounted on an adjustable bed plate. Slide adjustment sets belt tension without moving the drum.',
    position: [0, 0, 0],
    explode: [0, 0.1, -0.75],
  },
  {
    id: 'beltDrive',
    label: 'Belt Drive & Pulleys',
    short: 'Belt drive',
    description:
      'Matched pulleys and v-belt transfer power from the engine to the threshing drum and blower shaft. Belt tension is set from the engine bed plate.',
    position: [0, 0, 0],
    explode: [0, 0.2, -1.3],
    spin: 'pulleys',
  },
  {
    id: 'guards',
    label: 'Safety Guards',
    short: 'Guards',
    description:
      'Steel belt guard over the pulleys and mesh covers over rotating parts — fitted before delivery as standard.',
    position: [0, 0, 0],
    explode: [0, 0.35, -1.05],
  },
]

export const getPartById = (id) => thresherParts.find((part) => part.id === id)

export default thresherParts
