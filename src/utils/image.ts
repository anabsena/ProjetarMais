import { BASE_IMAGE_URL } from "../constants/app.constant";

const isAbsoluteImageSource = (value: string) => {
  return (
    value.startsWith("data:") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("blob:") ||
    value.startsWith("/")
  );
};

const detectMimeFromBase64Payload = (payload: string) => {
  const base64 = payload.trim();

  if (base64.startsWith("iVBORw0KGgo")) return "image/png";
  if (base64.startsWith("/9j/")) return "image/jpeg";
  if (base64.startsWith("R0lGODdh") || base64.startsWith("R0lGODlh")) return "image/gif";
  if (base64.startsWith("UklGR")) return "image/webp";
  if (base64.startsWith("PHN2Zy") || base64.startsWith("PD94bWwg")) return "image/svg+xml";

  return null;
};

const normalizeDataUrlMime = (value: string) => {
  if (!value.startsWith("data:")) return value;

  const match = value.match(/^data:([^;,]+)?(;base64)?,(.*)$/s);

  if (!match) return value;

  const declaredMime = match[1] || "";
  const isBase64 = Boolean(match[2]);
  const payload = match[3] || "";

  if (!isBase64) return value;

  const detectedMime = detectMimeFromBase64Payload(payload);

  if (!detectedMime || detectedMime === declaredMime) return value;

  return `data:${detectedMime};base64,${payload}`;
};

export const normalizeImageSrc = (value?: string | null) => {
  const image = (value || "").trim();

  if (!image) return null;

  if (image.startsWith("data:")) {
    return normalizeDataUrlMime(image);
  }

  if (isAbsoluteImageSource(image)) {
    return image;
  }

  return `${BASE_IMAGE_URL}${image}`;
};

export const getPhotoImageSrc = (photo?: any) => {
  if (!photo) return null;

  return (
    normalizeImageSrc(photo.photoUrl) ||
    normalizeImageSrc(photo.photoBase64) ||
    normalizeImageSrc(photo.url) ||
    normalizeImageSrc(photo.src) ||
    null
  );
};

export const getProjectCoverImageSrc = (project?: any) => {
  if (!project) return null;

  const photos = Array.isArray(project.ProjectPhotos) ? project.ProjectPhotos : [];

  return (
    getPhotoImageSrc(photos[0]) ||
    normalizeImageSrc(project.coverImageUrl) ||
    normalizeImageSrc(project.coverPhotoUrl) ||
    null
  );
};

export const getProjectGalleryImageSrcs = (project?: any) => {
  if (!project) return [] as string[];

  const photos = Array.isArray(project.ProjectPhotos) ? project.ProjectPhotos : [];
  const urls = photos.map(getPhotoImageSrc).filter(Boolean) as string[];

  if (!urls.length) {
    const cover = getProjectCoverImageSrc(project);
    return cover ? [cover] : [];
  }

  return urls;
};
