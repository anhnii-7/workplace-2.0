"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  animated?: boolean;
}

export function PageHeader({ 
  title, 
  subtitle, 
  className = "",
  animated = true 
}: PageHeaderProps) {
  const content = (
    <div className={`text-center py-10 ${className}`}>
      <h1 className="text-slate-800 text-3xl font-semibold">
        {title}
      </h1>
      {subtitle && (
        <p className="text-slate-700 font-normal text-xl pt-[13px] leading-9">
          {subtitle}
        </p>
      )}
    </div>
  );

  if (!animated) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {content}
    </motion.div>
  );
} 