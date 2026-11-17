import type { NextApiRequest, NextApiResponse } from "next";

export type PlacePrediction = {
  placeId: string;
  mainText: string;
  secondaryText: string;
  description: string;
};

export type PlaceDetailsResult = {
  street: string;
  houseNumber: string;
  city: string;
  postalCode: string;
  formattedAddress: string;
};

const RHINE_MAIN_BIAS = {
  circle: {
    center: {
      latitude: 50.227,
      longitude: 8.618,
    },
    radius: 35000.0,
  },
};

type GoogleAutocompleteResponse = {
  suggestions?: Array<{
    placePrediction?: {
      placeId?: string;
      text?: { text?: string };
      structuredFormat?: {
        mainText?: { text?: string };
        secondaryText?: { text?: string };
      };
    };
  }>;
};

type GooglePlaceDetailsResponse = {
  formattedAddress?: string;
  addressComponents?: Array<{
    longText?: string;
    shortText?: string;
    types?: string[];
  }>;
};

function findComponent(
  components: GooglePlaceDetailsResponse["addressComponents"],
  type: string
): string {
  if (!components) return "";
  const match = components.find((c) => c.types?.includes(type));
  return match?.longText ?? "";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY?.trim();
  const mode = typeof req.query.mode === "string" ? req.query.mode : "autocomplete";

  if (mode === "status") {
    return res.status(200).json({ enabled: Boolean(apiKey) });
  }

  if (!apiKey) {
    return res.status(200).json({
      enabled: false,
      predictions: [],
      details: null,
    });
  }

  const lang = req.query.lang === "en" ? "en" : "de";
  const sessionToken =
    typeof req.query.sessionToken === "string"
      ? req.query.sessionToken.slice(0, 64)
      : undefined;

  if (mode === "details") {
    const placeId =
      typeof req.query.placeId === "string" ? req.query.placeId.trim() : "";
    if (!placeId || !/^[A-Za-z0-9_-]{8,200}$/.test(placeId)) {
      return res.status(400).json({ error: "Invalid placeId" });
    }

    try {
      const url = new URL(
        `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`
      );
      url.searchParams.set("languageCode", lang);
      if (sessionToken) {
        url.searchParams.set("sessionToken", sessionToken);
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "id,formattedAddress,addressComponents",
        },
      });

      if (!response.ok) {
        return res.status(200).json({ enabled: true, details: null });
      }

      const data = (await response.json()) as GooglePlaceDetailsResponse;
      const details: PlaceDetailsResult = {
        street: findComponent(data.addressComponents, "route"),
        houseNumber: findComponent(data.addressComponents, "street_number"),
        city:
          findComponent(data.addressComponents, "locality") ||
          findComponent(data.addressComponents, "sublocality_level_1"),
        postalCode: findComponent(data.addressComponents, "postal_code"),
        formattedAddress: data.formattedAddress ?? "",
      };

      return res.status(200).json({ enabled: true, details });
    } catch {
      return res.status(200).json({ enabled: true, details: null });
    }
  }

  const rawInput =
    typeof req.query.input === "string" ? req.query.input.trim() : "";
  const city = typeof req.query.city === "string" ? req.query.city.trim() : "";

  if (rawInput.length < 3) {
    return res.status(200).json({ enabled: true, predictions: [] });
  }

  // City context improves street matches cleanly without locking out nearby districts.
  const searchInput =
    city && !rawInput.toLowerCase().includes(city.toLowerCase())
      ? `${rawInput}, ${city}`
      : rawInput;

  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
        },
        body: JSON.stringify({
          input: searchInput,
          languageCode: lang,
          regionCode: "DE",
          includedRegionCodes: ["DE"],
          locationBias: RHINE_MAIN_BIAS,
          ...(sessionToken ? { sessionToken } : {}),
        }),
      }
    );

    if (!response.ok) {
      return res.status(200).json({ enabled: true, predictions: [] });
    }

    const data = (await response.json()) as GoogleAutocompleteResponse;
    const predictions: PlacePrediction[] = (data.suggestions ?? [])
      .map((s) => s.placePrediction)
      .filter(
        (p): p is NonNullable<typeof p> =>
          Boolean(p?.placeId && (p.structuredFormat?.mainText?.text || p.text?.text))
      )
      .slice(0, 6)
      .map((p) => {
        const mainText =
          p.structuredFormat?.mainText?.text || p.text?.text || "";
        const secondaryText = p.structuredFormat?.secondaryText?.text || "";
        return {
          placeId: p.placeId!,
          mainText,
          secondaryText,
          description: p.text?.text || `${mainText}, ${secondaryText}`.trim(),
        };
      });

    return res.status(200).json({ enabled: true, predictions });
  } catch {
    return res.status(200).json({ enabled: true, predictions: [] });
  }
}

