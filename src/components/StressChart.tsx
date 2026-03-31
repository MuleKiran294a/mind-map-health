import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const sampleData = [
  { day: "Mon", stress: 6, sleep: 7 },
  { day: "Tue", stress: 7, sleep: 6 },
  { day: "Wed", stress: 5, sleep: 8 },
  { day: "Thu", stress: 8, sleep: 5 },
  { day: "Fri", stress: 4, sleep: 7 },
  { day: "Sat", stress: 3, sleep: 9 },
  { day: "Sun", stress: 2, sleep: 8 },
];

const StressChart = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="glass-card p-6 md:p-8"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 rounded-xl bg-primary/10">
        <BarChart3 className="w-6 h-6 text-primary" />
      </div>
      <h2 className="text-xl font-heading font-semibold">Stress vs Sleep</h2>
    </div>

    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sampleData}>
          <defs>
            <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(15, 80%, 55%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(15, 80%, 55%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(165, 80%, 48%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(165, 80%, 48%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 15%, 20%)" />
          <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={12} />
          <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: "hsl(230, 20%, 12%)",
              border: "1px solid hsl(230, 15%, 20%)",
              borderRadius: "0.75rem",
              color: "hsl(210, 40%, 96%)",
              fontSize: "0.75rem",
            }}
          />
          <Area type="monotone" dataKey="stress" stroke="hsl(15, 80%, 55%)" fill="url(#stressGrad)" strokeWidth={2} name="Stress" />
          <Area type="monotone" dataKey="sleep" stroke="hsl(165, 80%, 48%)" fill="url(#sleepGrad)" strokeWidth={2} name="Sleep" />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    <div className="flex gap-6 mt-4 justify-center">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className="w-3 h-3 rounded-full bg-risk-high" /> Stress
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className="w-3 h-3 rounded-full bg-primary" /> Sleep
      </div>
    </div>
  </motion.div>
);

export default StressChart;
