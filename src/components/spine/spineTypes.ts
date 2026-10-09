export interface SpineAnimationProps {
  skeletonPath?: string;
  atlasPath?: string;
  texturePath?: string;
  fallbackImageUrl: string;
  altText: string;
  defaultAnimation?: string;
  aimBoneName?: string;
  interactionMode?: 'cursor' | 'scroll' | 'hover' | 'static';
  aspectRatio?: string;
  className?: string;
  onLoadSuccess?: () => void;
  onLoadError?: (error: Error) => void;
}

export interface BoneAimTarget {
  x: number; // normalized -1 to 1
  y: number; // normalized -1 to 1
  angleDegrees: number;
}
