const DIVYA_DESAM_THANK_YOU_PATH =
  "/divya-desam-ecr/thank-you";

/**
 * Keep attribution parameters on the conversion page so analytics and ad
 * platforms can associate the successful enquiry with the landing URL.
 */
export function getDivyaDesamThankYouUrl() {
  if (typeof window === "undefined") {
    return DIVYA_DESAM_THANK_YOU_PATH;
  }

  return `${DIVYA_DESAM_THANK_YOU_PATH}${window.location.search}`;
}
