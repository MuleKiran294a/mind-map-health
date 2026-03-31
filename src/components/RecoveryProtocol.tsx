import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { type RecoveryProtocol as Protocol, getRecoveryProtocols } from "@/lib/healthData";

interface Props {
  burnoutLevel: string;
}

const RecoveryProtocol = ({ burnoutLevel }: Props) => {
  const protocols = getRecoveryProtocols(burnoutLevel);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-destructive/10">
          <Heart className="w-6 h-6 text-destructive" />
        </div>
        <h2 className="text-xl font-heading font-semibold">Recovery Protocol</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {protocols.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{p.icon}</span>
                <h3 className="font-heading font-semibold text-sm">{p.title}</h3>
              </div>
              <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                {p.duration}
              </span>
            </div>
            <ul className="space-y-1">
              {p.steps.map((s, j) => (
                <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary">→</span> {s}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecoveryProtocol;
