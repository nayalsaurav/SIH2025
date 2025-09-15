import React from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 text-balance">
            Traceable Ayurveda Herbs,{" "}
            <span className="text-ayurveda-primary">from Farm to Shelf</span>
          </h1>

          <p className="text-xl md:text-2xl text-ayurveda-muted max-w-4xl mx-auto text-pretty">
            Immutable blockchain-based traceability for authentic, sustainable,
            and safe herbal products.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="bg-ayurveda-primary hover:bg-green-500 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16"
        >
          <img
            src="/flat-style-illustration-of-farmers-harvesting-herb.jpg"
            alt="Farmers and blockchain traceability illustration"
            className="mx-auto rounded-2xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};
