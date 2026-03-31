// Indian states and districts data
export const statesAndDistricts: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Kurnool"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Mangalore", "Belgaum"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida", "Ghaziabad", "Prayagraj"],
  "West Bengal": ["Kolkata", "Howrah", "Siliguri", "Durgapur", "Asansol"],
};

const metroCities = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "New Delhi", "Thane", "Noida", "Ghaziabad", "Kochi"];

export interface MentalHealthInput {
  feelings: string;
  stressLevel: number;
  sleepHours: number;
  workHours: number;
}

export interface MentalHealthResult {
  mood: string;
  burnoutLevel: string;
  suggestions: string[];
  score: number;
}

export interface HealthRiskInput {
  state: string;
  district: string;
}

export interface HealthRiskResult {
  riskLevel: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  diseases: string[];
  advice: string[];
}

export function fallbackMentalHealth(input: MentalHealthInput): MentalHealthResult {
  const { stressLevel, sleepHours, workHours } = input;
  let score = 100;
  const suggestions: string[] = [];

  if (stressLevel > 7) { score -= 30; suggestions.push("Practice deep breathing exercises for 10 minutes daily"); }
  else if (stressLevel > 5) { score -= 15; suggestions.push("Consider regular mindfulness meditation"); }

  if (sleepHours < 5) { score -= 25; suggestions.push("Aim for 7-8 hours of sleep — sleep deprivation increases burnout risk significantly"); }
  else if (sleepHours < 7) { score -= 10; suggestions.push("Try to get at least 7 hours of quality sleep"); }

  if (workHours > 10) { score -= 20; suggestions.push("Set boundaries on work hours — take regular breaks every 90 minutes"); }
  else if (workHours > 8) { score -= 10; suggestions.push("Consider time-blocking to improve work-life balance"); }

  if (suggestions.length === 0) suggestions.push("You're doing well! Keep maintaining your healthy habits.");
  suggestions.push("Stay hydrated and exercise for at least 30 minutes daily");

  let mood = "Happy 😊";
  let burnoutLevel = "Low";

  if (score < 40) { mood = "Distressed 😰"; burnoutLevel = "Critical"; }
  else if (score < 60) { mood = "Stressed 😟"; burnoutLevel = "High"; }
  else if (score < 75) { mood = "Neutral 😐"; burnoutLevel = "Moderate"; }

  return { mood, burnoutLevel, suggestions: suggestions.slice(0, 4), score: Math.max(0, score) };
}

export function fallbackHealthRisk(input: HealthRiskInput): HealthRiskResult {
  const { district } = input;
  const isMetro = metroCities.includes(district);

  if (isMetro) {
    return {
      riskLevel: "MODERATE",
      diseases: ["Air pollution-related respiratory issues", "Lifestyle diseases (diabetes, hypertension)", "Mental health concerns due to urban stress"],
      advice: ["Use air purifiers indoors", "Get regular health checkups", "Maintain work-life balance", "Exercise regularly despite urban constraints"],
    };
  }

  return {
    riskLevel: "LOW",
    diseases: ["Seasonal infections", "Waterborne diseases in monsoon"],
    advice: ["Drink clean/filtered water", "Get vaccinated as recommended", "Maintain good hygiene practices"],
  };
}

export interface RecoveryProtocol {
  title: string;
  steps: string[];
  duration: string;
  icon: string;
}

export function getRecoveryProtocols(burnoutLevel: string): RecoveryProtocol[] {
  const protocols: RecoveryProtocol[] = [
    { title: "Breathing Reset", steps: ["4-7-8 breathing technique", "5 minutes, 3 times daily", "Box breathing before sleep"], duration: "5 min/session", icon: "🫁" },
    { title: "Digital Detox", steps: ["No screens 1hr before bed", "Limit social media to 30min/day", "Use app timers"], duration: "Daily", icon: "📵" },
  ];

  if (burnoutLevel === "High" || burnoutLevel === "Critical") {
    protocols.push(
      { title: "Professional Support", steps: ["Schedule therapy session", "Join a support group", "Talk to a trusted person daily"], duration: "Weekly", icon: "🧑‍⚕️" },
      { title: "Emergency Protocol", steps: ["Call helpline: 988", "Reach out to a friend NOW", "Step outside for 15 minutes"], duration: "Immediate", icon: "🚨" }
    );
  }

  return protocols;
}
