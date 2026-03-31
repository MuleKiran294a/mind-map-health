import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, AlertTriangle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LoadingSpinner from "./LoadingSpinner";
import { statesAndDistricts, fallbackHealthRisk, type HealthRiskResult } from "@/lib/healthData";

const HealthRiskAnalysis = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HealthRiskResult | null>(null);

  const districts = state ? statesAndDistricts[state] || [] : [];

  const checkRisk = async () => {
    if (!state || !district) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const res = fallbackHealthRisk({ state, district });
    setResult(res);
    setLoading(false);
  };

  const riskBadgeClass = result
    ? `risk-badge-${result.riskLevel.toLowerCase()}`
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-secondary/10">
          <MapPin className="w-6 h-6 text-secondary" />
        </div>
        <h2 className="text-xl font-heading font-semibold">Regional Health Risk</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">State</label>
          <Select value={state} onValueChange={v => { setState(v); setDistrict(""); setResult(null); }}>
            <SelectTrigger className="bg-muted/50 border-border/50">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(statesAndDistricts).map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">District</label>
          <Select value={district} onValueChange={setDistrict} disabled={!state}>
            <SelectTrigger className="bg-muted/50 border-border/50">
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent>
              {districts.map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={checkRisk}
          disabled={loading || !state || !district}
          className="w-full bg-gradient-to-r from-secondary to-accent text-secondary-foreground font-semibold h-12 text-base"
        >
          {loading ? "Checking..." : "🌍 Check Health Risk"}
        </Button>
      </div>

      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 flex justify-center">
            <LoadingSpinner />
          </motion.div>
        )}

        {!loading && result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Risk Level</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-heading font-bold ${riskBadgeClass}`}>
                {result.riskLevel}
              </span>
            </div>

            <div className="glass-card p-4">
              <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3" /> Common Diseases
              </p>
              <ul className="space-y-1.5">
                {result.diseases.map((d, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-sm flex items-start gap-2"
                  >
                    <span className="text-risk-high mt-0.5">⚠</span> {d}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-4">
              <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide flex items-center gap-1.5">
                <Shield className="w-3 h-3" /> Advice
              </p>
              <ul className="space-y-1.5">
                {result.advice.map((a, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-sm flex items-start gap-2"
                  >
                    <span className="text-primary mt-0.5">✓</span> {a}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HealthRiskAnalysis;
