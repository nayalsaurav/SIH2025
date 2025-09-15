"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Leaf,
  CheckCircle,
  MapPin,
  FlaskConical,
  Package,
  Scan,
  Database,
  Users,
  Award,
  Globe,
  Lock,
  Zap,
  Eye,
  TreePine,
  QrCode,
} from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-secondary/10 text-secondary border-secondary/20"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Ministry of Ayush Initiative
                </Badge>

                <h1 className="text-4xl md:text-6xl font-black text-foreground text-balance leading-tight">
                  Blockchain-Based{" "}
                  <span className="text-primary">Botanical Traceability</span>{" "}
                  for Ayurvedic Herbs
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
                  End-to-end transparency from geo-tagged collection to consumer
                  verification. Immutable ledger ensuring authenticity,
                  sustainability, and quality compliance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Scan & Verify
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border px-8 py-4 bg-transparent"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join Network
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Traceable</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">GPS</div>
                  <div className="text-sm text-muted-foreground">
                    Geo-Tagged
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">
                    Monitoring
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="/hero-section-image.jpg"
                  alt="Blockchain traceability for Ayurvedic herbs"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
              Solving Critical Supply Chain Challenges
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              The Ayurvedic herbal supply chain faces fragmentation, quality
              inconsistencies, and lack of transparency. Our blockchain solution
              addresses these fundamental issues.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Eye,
                title: "Opaque Provenance",
                description:
                  "Geographic origins often undocumented, making verification impossible",
                color: "text-red-500",
              },
              {
                icon: Award,
                title: "Quality Variations",
                description:
                  "Manual record-keeping introduces risks of mislabeling and adulteration",
                color: "text-orange-500",
              },
              {
                icon: TreePine,
                title: "Sustainability Risks",
                description:
                  "Over-harvesting of vulnerable species without proper monitoring",
                color: "text-yellow-500",
              },
              {
                icon: Shield,
                title: "Compliance Gaps",
                description:
                  "Difficulty meeting regulatory standards and export requirements",
                color: "text-blue-500",
              },
            ].map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-border">
                  <CardContent className="p-6">
                    <challenge.icon
                      className={`w-12 h-12 ${challenge.color} mb-4`}
                    />
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {challenge.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {challenge.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
              Comprehensive Blockchain Solution
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Our permissioned blockchain network creates an immutable ledger
              recording every step of the herb's journey with smart contract
              enforcement and real-time validation.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Permissioned Blockchain Network",
                description:
                  "Hyperledger Fabric-based ledger with nodes representing farmers, labs, processors, and manufacturers",
                features: [
                  "Smart contract enforcement",
                  "Geo-fencing validation",
                  "Quality gate automation",
                  "Seasonal restrictions",
                ],
              },
              {
                icon: MapPin,
                title: "Geo-Tagged Data Capture",
                description:
                  "IoT/GPS-enabled mobile DApp for collectors with offline-first capabilities and SMS synchronization",
                features: [
                  "GPS coordinates logging",
                  "Species identification",
                  "Environmental data",
                  "Collector verification",
                ],
              },
              {
                icon: QrCode,
                title: "Smart Labeling & Consumer Portal",
                description:
                  "Unique QR codes generated on-chain for each batch with lightweight web portal access",
                features: [
                  "FHIR-style provenance",
                  "Interactive maps",
                  "Lab certificates",
                  "Sustainability proofs",
                ],
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-border">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Traceability Process */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
              End-to-End Traceability Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              From geo-tagged harvest events to consumer verification, every
              step is recorded immutably on the blockchain with automated
              compliance enforcement.
            </p>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                step: "01",
                icon: MapPin,
                title: "Collection Event",
                subtitle: "Farmers & Wild Collectors",
                description:
                  "GPS-enabled devices capture precise location, timestamp, collector identity, species identification, and initial quality metrics",
                details: [
                  "Latitude/longitude coordinates",
                  "Environmental conditions",
                  "Harvest timestamp",
                  "Species DNA barcode",
                  "Initial quality assessment",
                ],
                side: "left",
              },
              {
                step: "02",
                icon: Database,
                title: "Blockchain Recording",
                subtitle: "Immutable Ledger",
                description:
                  "Smart contracts validate geo-fencing rules, seasonal restrictions, and sustainability guidelines before committing to ledger",
                details: [
                  "NMPC compliance validation",
                  "Geo-fence boundary checks",
                  "Seasonal harvest restrictions",
                  "Conservation limit enforcement",
                  "Quality threshold validation",
                ],
                side: "right",
              },
              {
                step: "03",
                icon: FlaskConical,
                title: "Quality Testing",
                subtitle: "Laboratory Analysis",
                description:
                  "Processing facilities and testing laboratories add QualityTest and ProcessingStep events with standardized metadata",
                details: [
                  "Moisture content analysis",
                  "Pesticide residue testing",
                  "DNA authentication",
                  "Heavy metal screening",
                  "Microbial contamination check",
                ],
                side: "left",
              },
              {
                step: "04",
                icon: Package,
                title: "Manufacturing",
                subtitle: "Product Formulation",
                description:
                  "Manufacturers process herbs into finished products and generate unique blockchain-based QR codes for each batch",
                details: [
                  "Batch processing records",
                  "Formulation parameters",
                  "Storage conditions",
                  "Packaging details",
                  "Unique QR code generation",
                ],
                side: "right",
              },
              {
                step: "05",
                icon: Scan,
                title: "Consumer Verification",
                subtitle: "Transparency Portal",
                description:
                  "End customers scan QR codes to retrieve complete FHIR-style provenance bundle with full supply chain visibility",
                details: [
                  "Farm origin mapping",
                  "Chain-of-custody trail",
                  "Lab certificate access",
                  "Sustainability compliance",
                  "Farmer profile stories",
                ],
                side: "left",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: process.side === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  process.side === "right" ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <Card className="hover:shadow-lg transition-all duration-300 border-border">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                          {process.step}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">
                            {process.title}
                          </h3>
                          <p className="text-primary font-medium">
                            {process.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {process.description}
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {process.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-sm text-muted-foreground"
                          >
                            <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <process.icon className="w-10 h-10 text-primary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
              Technical Architecture
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Built on enterprise-grade blockchain technology with seamless
              integration capabilities and robust API infrastructure.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Lock,
                title: "Security & Compliance",
                features: [
                  "Permissioned network access",
                  "AYUSH Ministry standards",
                  "FHIR-style metadata",
                  "Tamper-proof audit trails",
                ],
              },
              {
                icon: Zap,
                title: "Performance & Scalability",
                features: [
                  "Low-bandwidth optimization",
                  "Offline data capture",
                  "SMS synchronization",
                  "Real-time dashboards",
                ],
              },
              {
                icon: Globe,
                title: "Integration & APIs",
                features: [
                  "RESTful API endpoints",
                  "ERP system connectors",
                  "Mobile DApp interface",
                  "Web portal access",
                ],
              },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-border">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                      <tech.icon className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-6">
                      {tech.title}
                    </h3>
                    <ul className="space-y-3">
                      {tech.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-secondary mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-black text-primary-foreground text-balance">
              Join the Future of Ayurvedic Traceability
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Be part of the revolutionary blockchain network that ensures
              transparency, sustainability, and trust in the Ayurvedic supply
              chain.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-background text-foreground hover:bg-background/90 px-8 py-4"
              >
                <Users className="w-5 h-5 mr-2" />
                Farmers & Collectors
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-background text-foreground hover:bg-background/90 px-8 py-4"
              >
                <FlaskConical className="w-5 h-5 mr-2" />
                Labs & Manufacturers
              </Button>
            </div>

            <div className="pt-8">
              <Badge
                variant="secondary"
                className="bg-background/20 text-primary-foreground border-primary-foreground/20"
              >
                <Award className="w-4 h-4 mr-2" />
                Smart India Hackathon 2025 - Ministry of Ayush
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">
                  AyurTrace
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Blockchain-based botanical traceability for authentic Ayurvedic
                herbs.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Farmers Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Lab Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Consumer App
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    API Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Technical Whitepaper
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Compliance Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Integration Help
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Support Center
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 AyurTrace. Built for Smart India Hackathon 2025 - Ministry
              of Ayush Initiative.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
