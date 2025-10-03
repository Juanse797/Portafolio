import { siteConfig } from "@/config/site";
import { Button } from "./ui/button";
import { PenSquare } from "lucide-react";

export default function Footer() {
  const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const studioUrl = `https://studio.sanity.io/project/${sanityProjectId}`;

  return (
    <footer className="py-6 border-t border-white/10">
      <div className="container mx-auto px-4 text-center text-muted-foreground flex flex-col items-center gap-4">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.</p>
        {process.env.NODE_ENV === 'development' && sanityProjectId && (
          <Button asChild variant="outline" className="btn-squishy border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
            <a href={studioUrl} target="_blank" rel="noopener noreferrer nofollow">
              <PenSquare className="mr-2 h-4 w-4" />
              Editar Contenido (Solo visible en desarrollo)
            </a>
          </Button>
        )}
      </div>
    </footer>
  );
}
