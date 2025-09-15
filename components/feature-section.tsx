import React from "react";
import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";
import { Shield, Leaf, CheckCircle } from "lucide-react";

export const FeatureSection = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Traceable Ayurveda?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "End-to-End Traceability",
              description:
                "Follow herbs from collection to packaging with blockchain-backed proofs.",
              delay: 0.1,
            },
            {
              icon: Leaf,
              title: "Sustainable & Ethical",
              description:
                "Smart contracts enforce sustainable harvesting and fair-trade compliance.",
              delay: 0.2,
            },
            {
              icon: CheckCircle,
              title: "Verified Quality",
              description:
                "Lab test results, moisture checks, DNA authentication available for every batch.",
              delay: 0.3,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: feature.delay }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <feature.icon className="w-16 h-16 text-ayurveda-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-ayurveda-muted text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
