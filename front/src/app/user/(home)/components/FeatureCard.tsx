"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  buttonHref: string;
  imageFirst?: boolean;
  delay?: number;
}

export function FeatureCard({
  title,
  description,
  imageSrc,
  imageAlt,
  buttonText,
  buttonHref,
  imageFirst = false,
  delay = 0
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: imageFirst ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <Card className="p-6 bg-blue-100/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className={`flex ${imageFirst ? 'flex-row-reverse' : 'flex-row'} gap-6`}>
          <div className="flex-1">
            <h2 className="text-slate-700 font-semibold text-2xl leading-8">
              {title}
            </h2>
            <p className="text-slate-700 font-normal text-xl leading-7 mt-2">
              {description}
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={buttonHref}>
                <Button className="bg-blue-400 hover:bg-blue-500 text-white flex justify-self-end mt-6">
                  {buttonText}
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <div className="flex-1">
            <Image
              src={imageSrc}
              width={487}
              height={300}
              alt={imageAlt}
              className="rounded-lg"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
} 