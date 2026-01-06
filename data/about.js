import { Code, Infinity, Lock, MessageCircle, Text, Upload } from "lucide-react";

export const about = {
  header: {
    title: "About Us",
    description:
      "At Poker Kit, we manufacture and supply premium poker kits and accessories for B2B buyers. Our mission is to help distributors, retailers, and promotional partners launch reliable product lines with OEM/ODM customization, consistent quality control, and dependable delivery.",
    image: "/about/1.webp",
    features: [
      "Efficient Production: Scalable manufacturing capacity and standardized workflows to support wholesale programs and repeat orders.",
      "Quality Assurance: Tight material selection and QC checkpoints to ensure consistent specs across bulk shipments.",
      "OEM/ODM Ready: Custom logo printing, packaging options, and private-label support for different sales channels.",
      "Business-First Packaging: Export-friendly packing and labeling aligned with retailer and distributor requirements.",
      "Reliable Delivery: Clear lead times and logistics coordination to help you hit launch and replenishment timelines.",
    ],
  },
  intro: {
    title: "Our Story",
    image: "/about/3.webp",
    descriptions: [
      "We focus on practical, sellable poker products built for wholesale and long-term supply relationships.",
      "Our team iterates on materials, finishes, and packaging to meet retailer expectations and event-grade durability.",
      "From incoming material checks to final inspection, we keep quality control measurable and repeatable.",
      "We work with partners worldwide and continuously refine our processes to improve consistency and lead time.",
    ],
    features: [
      "B2B-first communication and fast turnaround.",
      "Stable specs and repeatable quality for reorder confidence.",
      "OEM/ODM support for branding and packaging.",
      "After-sales support for replacements and issues.",
    ],
  },
  features: [
    {
      icon: <Lock className="h-5" />,
      title: "Quality-Controlled",
      description:
        "Standardized QC checks help keep product specs consistent across bulk production runs.",
    },
    {
      icon: <MessageCircle className="h-5" />,
      title: "Responsive Support",
      description:
        "Clear communication for sampling, pricing, production updates, and logistics coordination.",
    },
    {
      icon: <Infinity className="h-5" />,
      title: "Stable Supply",
      description:
        "Built for long-term wholesale partnerships with repeatable specs and dependable replenishment.",
    },
    {
      icon: <Text className="h-5" />,
      title: "Clear Specs",
      description:
        "Straightforward product specs and packaging options to reduce back-and-forth and speed up decisions.",
    },
    {
      icon: <Code className="h-5" />,
      title: "OEM/ODM Capable",
      description:
        "Logo printing, packaging customization, and private-label options for your brand and channel.",
    },
    {
      icon: <Upload className="h-5" />,
      title: "Fast Sampling",
      description:
        "Sampling and iteration support to validate materials, finishes, and packaging before mass production.",
    },
  ],
  gallery: [
    {
      image: "/about/a2.webp",
      alt: "About Us",
    },
    {
      image: "/about/a3.webp",
      alt: "About Us",
    },
    {
      image: "/about/a4.webp",
      alt: "About Us",
    },
    {
      image: "/about/4.webp",
      alt: "About Us",
    },
  ],
  testimonials: [
    {
      name: "Michael Lee",
      image: "/about/r3.webp",
      title: "Wholesale Buyer",
      description:
        "Consistent specs and reliable packing made it easy for us to scale wholesale orders without quality surprises.",
    },
    {
      name: "Laura Chen",
      image: "/about/r2.webp",
      title: "Purchasing Director",
      description:
        "Sampling and communication were efficient. We aligned on packaging quickly and hit our delivery window.",
    },
    {
      name: "Emily Carter",
      image: "/about/r1.webp",
      title: "Operations Manager",
      description:
        "Lead times and QC were predictable. That helped us plan launches and replenishment with confidence.",
    },
  ],
};
