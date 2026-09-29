import Chassis from './Chassis'
import Chamber from './Chamber'
import Concave from './Concave'
import ThreshingDrum from './ThreshingDrum'
import Hopper from './Hopper'
import Blower from './Blower'
import { GrainOutlet, StrawOutlet } from './Outlets'
import EngineUnit from './EngineUnit'
import BeltDrive from './BeltDrive'
import Guards from './Guards'

/**
 * Maps every id in `src/data/thresherParts.js` to the sub-assembly that draws
 * it. Adding a component to the machine therefore means:
 *   1. describe it in data/thresherParts.js (name, position, explode offset)
 *   2. build the meshes in a file in this folder
 *   3. register it here
 *
 * The chamber body is drawn with the chassis because it is welded/bolted to the
 * frame and travels with it in the exploded view.
 */
export const partRenderers = {
  chassis: ({ shadows }) => (
    <>
      <Chassis shadows={shadows} />
      <Chamber shadows={shadows} />
    </>
  ),
  concave: ({ shadows }) => <Concave shadows={shadows} />,
  drum: ({ running, shadows }) => <ThreshingDrum running={running} shadows={shadows} />,
  hopper: ({ shadows }) => <Hopper shadows={shadows} />,
  strawOutlet: ({ shadows }) => <StrawOutlet shadows={shadows} />,
  blower: ({ running, shadows }) => <Blower running={running} shadows={shadows} />,
  grainOutlet: ({ shadows }) => <GrainOutlet shadows={shadows} />,
  engine: ({ shadows }) => <EngineUnit shadows={shadows} />,
  beltDrive: ({ running, shadows }) => <BeltDrive running={running} shadows={shadows} />,
  guards: ({ shadows }) => <Guards shadows={shadows} />,
}

export default partRenderers
