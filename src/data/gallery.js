/**
 * ---------------------------------------------------------------------------
 * GALLERY
 * ---------------------------------------------------------------------------
 * Real photographs of the machines and the field work, stored in
 * `public/images/gallery/`. Every `src` below points at a file that exists on
 * disk — filenames are kebab-case and space-free so the URLs stay valid.
 *
 * `shape` controls the masonry footprint: 'panorama' | 'wide' | 'classic' |
 * 'square' | 'tall'. Each value is matched to the photo's real aspect ratio
 * (see `ASPECT` in src/components/Gallery.jsx) so images are cropped as
 * little as possible.
 *
 * `alt` must describe what is actually in the photograph — it is used by
 * screen readers and by image search. Brands visible on the machines are
 * named in `alt` because they are legible in the photo, but the site does not
 * claim the machines are our own build.
 *
 * To add a photo: drop the file into `public/images/gallery/`, then add an
 * entry here with its category, shape, title, caption and alt. Nothing else
 * needs to change.
 */

export const galleryCategories = ['All', 'Threshers', 'Field Work']

export const galleryItems = [
  {
    id: 'g1',
    category: 'Field Work',
    shape: 'panorama',
    src: '/images/gallery/terai-paddy-season.jpg',
    title: 'Threshing a paddy heap in the Terai',
    caption:
      'A crew strips a stacked paddy heap into the machine while the cleaned grain is sacked at the outlet.',
    alt: 'Workers feeding a heap of harvested paddy straw into an orange thresher machine in an open field, with two women bagging the threshed grain beside it and large straw stacks on both sides',
  },
  {
    id: 'g2',
    category: 'Threshers',
    shape: 'wide',
    src: '/images/gallery/new-super-blue.jpg',
    title: 'New Super Manku thresher on transport wheels',
    caption:
      'Blue frame with a cream drum cover, top grain tank and chute, on a single transport wheel.',
    alt: 'Blue New Super Manku thresher machine with a cream coloured drum cover and raised grain tank, standing in a yellow mustard field',
  },
  {
    id: 'g3',
    category: 'Threshers',
    shape: 'tall',
    src: '/images/gallery/multi-crop-red.jpg',
    title: 'Multi-crop thresher, ready to move',
    caption:
      'Red frame, yellow feed hopper and belt cover, with transport wheels and a towing eye at the front.',
    alt: 'Red and yellow multi-crop thresher machine with a yellow feeding hopper and belt drive cover, photographed side-on on a concrete yard',
  },
  {
    id: 'g4',
    category: 'Field Work',
    shape: 'wide',
    src: '/images/gallery/working-on-field.jpg',
    title: 'Straw cleared while the grain runs',
    caption:
      'Chaff and husk blow clear through the chute as the crew works down a tall straw stack.',
    alt: 'A red Balvindra thresher throwing a cloud of chaff from its chute beside a tall stack of straw, with a crew feeding bundles from the top and women collecting grain into baskets below',
  },
  {
    id: 'g5',
    category: 'Threshers',
    shape: 'square',
    src: '/images/gallery/super-drive-green.webp',
    title: 'Super Drive thresher under cover',
    caption:
      'Green frame, feed hopper and blower housing, parked on the workshop floor.',
    alt: 'Green Super Drive Manku thresher machine with a feed hopper and blower housing, parked indoors on a paved workshop floor',
  },
  {
    id: 'g6',
    category: 'Field Work',
    shape: 'wide',
    src: '/images/gallery/field-threshing-tractor.jpg',
    title: 'Working through a harvested field',
    caption:
      'The machine is towed along the stubble while the crew feeds from the standing straw on the right.',
    alt: 'A red thresher machine being towed by a tractor through a harvested field, straw and chaff flying from the drum as workers feed the standing crop',
  },
  {
    id: 'g7',
    category: 'Threshers',
    shape: 'classic',
    src: '/images/gallery/thresher-range-lineup.jpg',
    title: 'The machine range, lined up',
    caption:
      'Blue, green, red and orange frames photographed side by side on the yard.',
    alt: 'A row of thresher machines painted blue, green, red and orange, lined up in a line on grass at a machinery yard',
  },
]

export const getGalleryByCategory = (category) =>
  category === 'All' || !category
    ? galleryItems
    : galleryItems.filter((item) => item.category === category)

export default galleryItems
