import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="py-6 border-t border-white/10">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
