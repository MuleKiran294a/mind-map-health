import { useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import MentalHealthAnalyzer from "@/components/MentalHealthAnalyzer";
import HealthRiskAnalysis from "@/components/HealthRiskAnalysis";
import RecoveryProtocol from "@/components/RecoveryProtocol";
import StressChart from "@/components/StressChart";
import type { MentalHealthResult } from "@/lib/healthData";

const Index = () => {
  const [mentalResult, setMentalResult] = useState<MentalHealthResult | null>(null);

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="container max-w-6xl mx-auto px-4 py-5 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Activity className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold gradient-text">Health AI Dashboard</h1>
            <p className="text-xs text-muted-foreground">AI-powered health insights & analysis</p>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 mt-8 space-y-8">
        {/* Top row: Mental + Risk */}
        <div className="grid gap-6 lg:grid-cols-2">
          <MentalHealthAnalyzer onResult={setMentalResult} />
          <HealthRiskAnalysis />
        </div>

        {/* Bottom row: Recovery + Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid gap-6 lg:grid-cols-2"
        >
          <RecoveryProtocol burnoutLevel={mentalResult?.burnoutLevel ?? "Low"} />
          <StressChart />
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
