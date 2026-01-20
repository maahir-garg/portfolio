"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DATA } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

type SkillsByCategory = typeof DATA.skills;

const CATEGORY_ICONS: Record<string, string> = {
  Programming: "💻",
  "ML & AI": "🤖",
  "Data & Distributed": "📊",
  "Cloud & DevOps": "☁️",
  "Web & DB": "🌐",
  Analysis: "📈",
  Tools: "🛠️",
};

export function Skills({
  skills = DATA.skills,
}: {
  skills?: SkillsByCategory;
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const entries = useMemo(
    () => Object.entries(skills) as Array<[keyof SkillsByCategory, readonly string[]]>,
    [skills]
  );

  const activeSkills = activeCategory
    ? entries.find(([cat]) => String(cat) === activeCategory)?.[1] || []
    : [];

  return (
    <div className="space-y-8">
      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="wait">
          {entries.map(([category, items], index) => {
            const categoryStr = String(category);
            const isActive = activeCategory === categoryStr;
            const isInactive = activeCategory !== null && !isActive;

            return (
              <motion.button
                key={categoryStr}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isInactive ? 0.4 : 1, 
                  y: 0,
                  scale: isActive ? 1.05 : 1
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  layout: { duration: 0.3 }
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(isActive ? null : categoryStr)}
                className={`
                  group relative overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300
                  ${isActive 
                    ? 'bg-accent/10 border-accent shadow-lg shadow-accent/20' 
                    : 'bg-card border-border hover:border-accent/40 hover:shadow-md'
                  }
                `}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(107, 142, 120, 0.1) 0%, transparent 70%)',
                  }}
                />

                <div className="relative z-10">
                  <h3 className={`text-sm font-semibold tracking-tight transition-colors ${isActive ? 'text-accent' : 'text-ink group-hover:text-accent'}`}>
                    {categoryStr}
                  </h3>
                  <p className="text-xs text-ink-muted mt-1 font-mono">
                    {items.length} {items.length === 1 ? 'skill' : 'skills'}
                  </p>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Skills Display */}
      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-ink">
                  {activeCategory}
                </h3>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="text-sm text-ink-muted hover:text-accent transition-colors font-medium"
                >
                  Close ✕
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {activeSkills.map((skill, index) => (
                  <motion.div
                    key={`${activeCategory}-${skill}`}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    onHoverStart={() => setHoveredSkill(skill)}
                    onHoverEnd={() => setHoveredSkill(null)}
                  >
                    <Badge
                      variant="secondary"
                      className={`
                        text-sm py-2 px-4 cursor-default transition-all duration-200
                        ${hoveredSkill === skill ? 'bg-accent/20 text-accent border-accent/40 scale-110' : ''}
                      `}
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All Skills Overview (when nothing selected) */}
      {!activeCategory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-ink-muted text-sm font-mono"
        >
          Click a category to explore skills
        </motion.div>
      )}
    </div>
  );
}


