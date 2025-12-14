import { Image as ImageIcon } from "lucide-react";
import { useRef } from "react";

interface DesignCanvasProps {
  imageUrl: string | null;
  isGenerating: boolean;
  material: string;
  clothType: string;
  clothDetail: string;
  pattern: string;
}

const getMaterialDetails = (material: string, clothType: string, clothDetail: string) => {
  const measurements: Record<string, { 
    length: string; 
    width: string; 
    time: string;
    fabric: string;
    stitches: string;
    buttons: string;
  }> = {
    "shirt": { 
      length: "2.5 meters (98 inches)", 
      width: "1.5 meters (59 inches)", 
      time: "4-6 hours",
      fabric: "2.5m body + 0.5m sleeves",
      stitches: "Approx. 3500-4000",
      buttons: "6-8 buttons required"
    },
    "t-shirt": { 
      length: "1.5 meters (59 inches)", 
      width: "1.2 meters (47 inches)", 
      time: "2-3 hours",
      fabric: "1.5m body + sleeves",
      stitches: "Approx. 2000-2500",
      buttons: "None"
    },
    "pant": { 
      length: "2 meters (78 inches)", 
      width: "1.5 meters (59 inches)", 
      time: "3-5 hours",
      fabric: "2m legs + waistband",
      stitches: "Approx. 3000-3500",
      buttons: "1 button + zipper"
    },
    "saree": { 
      length: "6 meters (236 inches)", 
      width: "1.2 meters (47 inches)", 
      time: "8-10 hours",
      fabric: "6m continuous fabric",
      stitches: "Approx. 5000-6000",
      buttons: "None (blouse separate)"
    },
    "dress": { 
      length: "3 meters (118 inches)", 
      width: "1.5 meters (59 inches)", 
      time: "5-7 hours",
      fabric: "3m body + sleeves",
      stitches: "Approx. 4000-4500",
      buttons: "4-6 buttons or zipper"
    },
    "jacket": { 
      length: "2.5 meters (98 inches)", 
      width: "1.5 meters (59 inches)", 
      time: "6-8 hours",
      fabric: "2.5m outer + 2m lining",
      stitches: "Approx. 4500-5000",
      buttons: "4-8 buttons + zipper"
    },
    "blouse": { 
      length: "1.5 meters (59 inches)", 
      width: "1 meter (39 inches)", 
      time: "3-4 hours",
      fabric: "1.5m body + sleeves",
      stitches: "Approx. 2500-3000",
      buttons: "3-5 buttons or hooks"
    },
    "skirt": { 
      length: "1.5 meters (59 inches)", 
      width: "1.5 meters (59 inches)", 
      time: "2-3 hours",
      fabric: "1.5m skirt + waistband",
      stitches: "Approx. 2000-2500",
      buttons: "1 button + zipper"
    },
  };

  const details = measurements[clothType] || { 
    length: "2 meters (78 inches)", 
    width: "1.5 meters (59 inches)", 
    time: "4-6 hours",
    fabric: "2m total fabric",
    stitches: "Approx. 3000-3500",
    buttons: "Standard closure"
  };
  
  return {
    material: material.charAt(0).toUpperCase() + material.slice(1),
    ...details,
    detail: clothDetail ? clothDetail.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "Standard"
  };
};

export const DesignCanvas = ({ imageUrl, isGenerating, material, clothType, clothDetail, pattern }: DesignCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const materialDetails = getMaterialDetails(material, clothType, clothDetail);

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: 'var(--gradient-bg)' }}>
      <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-4xl space-y-4">
          <div 
            ref={canvasRef}
            className="relative w-full aspect-square bg-card rounded-2xl shadow-2xl overflow-hidden border-2 border-border"
            style={{ boxShadow: 'var(--shadow-elegant)' }}
          >
            {isGenerating ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="text-center space-y-4">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">Generating your design</p>
                    <p className="text-sm text-muted-foreground">Creating beautiful textile patterns with AI...</p>
                  </div>
                </div>
              </div>
            ) : imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Generated textile design" 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary/10 to-accent/5">
                <div className="text-center space-y-4 p-8">
                  <ImageIcon className="w-24 h-24 mx-auto text-muted-foreground/30" />
                  <div>
                    <p className="text-xl font-semibold text-foreground mb-2">No Design Yet</p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Select your preferences from the control panel and click "Generate Design" 
                      to create stunning AI-powered textile patterns
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {imageUrl && !isGenerating && (
            <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-border">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#03f484' }}>Material Details & Measurements</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Material Type</p>
                  <p className="text-base font-semibold" style={{ color: '#03f484' }}>{materialDetails.material}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Cloth Type</p>
                  <p className="text-base font-semibold" style={{ color: '#03f484' }}>{clothType.charAt(0).toUpperCase() + clothType.slice(1)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Length Required</p>
                  <p className="text-base font-semibold" style={{ color: '#03f484' }}>{materialDetails.length}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Width Required</p>
                  <p className="text-base font-semibold" style={{ color: '#03f484' }}>{materialDetails.width}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Cut & Stitch Time</p>
                  <p className="text-base font-semibold" style={{ color: '#03f484' }}>{materialDetails.time}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Total Stitches</p>
                  <p className="text-base font-semibold" style={{ color: '#03f484' }}>{materialDetails.stitches}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Fabric Breakdown</p>
                  <p className="text-base font-semibold" style={{ color: '#03f484' }}>{materialDetails.fabric}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Buttons/Closures</p>
                  <p className="text-base font-semibold" style={{ color: '#03f484' }}>{materialDetails.buttons}</p>
                </div>
              </div>

              {clothDetail && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-gray-400">Detail Type</p>
                  <p className="text-base font-semibold" style={{ color: '#03f484' }}>{materialDetails.detail}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
