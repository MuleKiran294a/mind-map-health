import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Zap, Moon, Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "./LoadingSpinner";
import { fallbackMentalHealth, type MentalHealthInput, type MentalHealthResult } from "@/lib/healthData";

interface Props {
  onResult?: (result: MentalHealthResult) => void;
}

const MentalHealthAnalyzer = ({ onResult }: Props) => {
  const [feelings, setFeelings] = useState("");
  const [stressLevel, setStressLevel] = useState(5);
  const [sleepHours, setSleepHours] = useState(7);
  const [workHours, setWorkHours] = useState(8);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MentalHealthResult | null>(null);

  const analyze = async () => {
    setLoading(true);
    const input: MentalHealthInput = { feelings, stressLevel, sleepHours, workHours };

    // Use fallback rule-based analysis
    await new Promise(r => setTimeout(r, 1500)); // simulate processing
    const res = fallbackMentalHealth(input);
    setResult(res);
    onResult?.(res);
    setLoading(false);
  };

  const scoreColor = result
    ? result.score >= 75 ? "text-risk-low" : result.score >= 50 ? "text-risk-moderate" : "text-risk-high"
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <Brain className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-xl font-heading font-semibold">Mental Health Analyzer</h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">How are you feeling today?</label>
          <Textarea
            value={feelings}
            onChange={e => setFeelings(e.target.value)}
            placeholder="Describe your current mood and thoughts..."
            className="bg-muted/50 border-border/50 resize-none h-24"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-muted-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-risk-moderate" /> Stress Level
            </label>
            <span className="text-sm font-semibold font-heading">{stressLevel}/10</span>
          </div>
          <Slider
            value={[stressLevel]}
            onValueChange={v => setStressLevel(v[0])}
            min={1} max={10} step={1}
            className="py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground flex items-center gap-2 mb-1.5">
              <Moon className="w-4 h-4 text-secondary" /> Sleep (hrs)
            </label>
            <Input
              type="number" min={0} max={24}
              value={sleepHours}
              onChange={e => setSleepHours(Number(e.target.value))}
              className="bg-muted/50 border-border/50"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground flex items-center gap-2 mb-1.5">
              <Clock className="w-4 h-4 text-accent" /> Work (hrs)
            </label>
            <Input
              type="number" min={0} max={24}
              value={workHours}
              onChange={e => setWorkHours(Number(e.target.value))}
              className="bg-muted/50 border-border/50"
            />
          </div>
        </div>

        <Button
          onClick={analyze}
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold h-12 text-base"
        >
          {loading ? "Analyzing..." : "🧠 Analyze Mental Health"}
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
            exit={{ opacity: 0 }}
            className="mt-6 space-y-4"
          >
            <div className="grid grid-cols-3 gap-3">
              <div className="glass-card p-4 text-center pulse-glow">
                <p className="text-xs text-muted-foreground mb-1">Mood</p>
                <p className="font-heading font-semibold text-sm">{result.mood}</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Burnout</p>
                <p className="font-heading font-semibold text-sm">{result.burnoutLevel}</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Score</p>
                <p className={`font-heading font-bold text-lg ${scoreColor}`}>{result.score}</p>
              </div>
            </div>

            <div className="glass-card p-4">
              <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">Suggestions</p>
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-sm flex items-start gap-2"
                  >
                    <span className="text-primary mt-0.5">•</span>
                    {s}
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

export default MentalHealthAnalyzer;
