import { MapPinHouse, Headset, MailSearch, CalendarClock } from "lucide-react";

export const contact = {
  header: {
    title: "Contact Us",
    description: "Have questions or need assistance? We're here to help! Reach out to our friendly team through any of the channels below.",
    image: "/contact/About-us.png",
    features: [
      "Exceptional Quality: We ensure that every product meets the highest standards of quality and durability",
      "Customer-Centric Solutions: Our products are designed to brighten your daily life, adding creativity and joy to your home, workspace, and personal moments",
      "Innovation at Heart: We continuously strive to bring you cutting-edge solutions that stay ahead of the curve",
      "Sustainable Practices: Our commitment to environmental responsibility is reflected in our eco-friendly product designs"
    ]
  },
  contact: [
    {
      title: "Our Location",
      content: "611, Colorful City, Luohu District",
      icon: <MapPinHouse className="size-8 shrink-0" />
    },
    {
      title: "Call Us",
      content: "+86 13726274696",
      icon: <Headset className="size-8 shrink-0" />
    },
    {
      title: "Get in Touch",
      content: "info@labubuwholesale.com",
      icon: <MailSearch className="size-8 shrink-0" />
    },
    {
      title: "Working Hours",
      content: "Monday through Friday: 9:00 a.m. - 6:00 p.m. (UTC+8)",
      icon: <CalendarClock className="size-8 shrink-0" />
    }
  ],
  map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d651.3378764001658!2d114.10463390006643!3d22.55951823471192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f5a92b9fcbbf%3A0x4dcf212430f2b1b3!2z5aSa5b2p5Z-O!5e0!3m2!1szh-CN!2sus!4v1751280363708!5m2!1szh-CN!2sus"
};
