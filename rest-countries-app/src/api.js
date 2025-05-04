const BASE_URL = "https://restcountries.com/v3.1";

export const fetchAllCountries = async () => {
  const res = await fetch(`${BASE_URL}/all`);
  return res.json();
};

export const fetchByName = async (name) => {
  const res = await fetch(`${BASE_URL}/name/${name}`);
  return res.json();
};

export const fetchByRegion = async (region) => {
  const res = await fetch(`${BASE_URL}/region/${region}`);
  return res.json();
};

export const fetchByCode = async (code) => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.error("API fetchByCode error:", error.message);
    return []; // Return empty to avoid crash
  }
};

