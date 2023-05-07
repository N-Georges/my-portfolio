import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Projects
 *
 *
 */
export interface Project extends SanityDocument {
  _type: "project";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Alt — `string`
     *
     *
     */
    alt?: string;
  };

  /**
   * URL — `url`
   *
   *
   */
  url?: string;

  /**
   * Github — `url`
   *
   *
   */
  github?: string;

  /**
   * Category — `reference`
   *
   *
   */
  category?: SanityReference<Category>;

  /**
   * Stack — `array`
   *
   *
   */
  stack?: Array<SanityKeyed<string>>;

  /**
   * Icon Stack — `array`
   *
   *
   */
  iconStack?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;

      /**
       * Alt — `string`
       *
       *
       */
      alt?: string;
    }>
  >;

  /**
   * Content — `array`
   *
   *
   */
  content?: Array<SanityKeyed<SanityBlock>>;
}

/**
 * Category
 *
 *
 */
export interface Category extends SanityDocument {
  _type: "category";

  /**
   * Category Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };
}

/**
 * Guestbook
 *
 *
 */
export interface Guestbook extends SanityDocument {
  _type: "guestbook";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Email — `string`
   *
   *
   */
  email?: string;

  /**
   * Message — `text`
   *
   *
   */
  message?: string;
}

export type Documents = Project | Category | Guestbook;
