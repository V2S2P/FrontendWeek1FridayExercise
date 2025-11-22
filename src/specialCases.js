function getCountryCode(id) {
  if (id === "svg2") return { type: "special", name: "the ocean" };
  if (id === "ru-main") return { type: "special", name: "Russia" };

  // If it's 2 or 3 letters, assume it's a real country code
  if (/^[a-z]{2,3}$/i.test(id)) {
    return { type: "country", code: id };
  }

  return null; // Unknown / not handled
}
export default getCountryCode;