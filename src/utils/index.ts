import type {
  BahnhofInformationType,
  FlughafenInformationType,
  IndividualInformationType,
  PersonalInformationType,
} from "@/types";

function submitForm(
  type: "bahnhof" | "flughafen" | "individual",
  data:
    | BahnhofInformationType
    | FlughafenInformationType
    | IndividualInformationType,
  personalInformation: PersonalInformationType,
  language: string
) {
  if (language !== "de" && language !== "en") return;

  fetch("/api/inquiry", {
    method: "POST",
    body: JSON.stringify({
      type,
      data,
      personalInformation,
      language,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default submitForm;
