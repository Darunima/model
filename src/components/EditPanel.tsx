import { Label } from "@/components/ui/label";
import { Settings2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditPanelProps {
  imageUrl: string | null;
  isGenerating: boolean;
  blendColor: string;
  setBlendColor: (value: string) => void;
  clothAdjustment: string;
  setClothAdjustment: (value: string) => void;
  clothType: string;
  onDownload: (format: 'jpg' | 'pdf') => void;
}

const clothAdjustmentsMap: Record<string, string[]> = {
  "shirt": [
    "Mandarin/Grandad collar",
    "High stand collar",
    "Open V-neck collarless",
    "Hidden button collar",
    "Cuban collar",
    "Concealed/Hidden placket",
    "Extended placket",
    "Cross placket",
    "Shoulder placket",
    "Popover placket",
    "Asymmetrical hem",
    "Raw edge/Frayed hem",
    "High-low hem",
    "Rounded hem (Shirttail)",
    "Straight hem",
    "Bishop sleeves",
    "Balloon sleeves",
    "Dropped shoulder sleeves",
    "Raglan sleeves",
    "Puff sleeves"
  ],
  "t-shirt": [
    "Mandarin/Grandad collar",
    "High stand collar",
    "Open V-neck collarless",
    "Hidden button collar",
    "Cuban collar",
    "Concealed/Hidden placket",
    "Extended placket",
    "Cross placket",
    "Shoulder placket",
    "Popover placket",
    "Asymmetrical hem",
    "Raw edge/Frayed hem",
    "High-low hem",
    "Rounded hem (Shirttail)",
    "Straight hem",
    "Bishop sleeves",
    "Balloon sleeves",
    "Dropped shoulder sleeves",
    "Raglan sleeves",
    "Puff sleeves"
  ],
  "pant": [
    "Wide-leg fit",
    "Baggy fit",
    "Cropped length",
    "Raw edge/Frayed hem",
    "Side hem slit/vent",
    "Drawstring/Elasticated waist",
    "Side tab adjusters (beltless)",
    "Gurkha pants closure",
    "Cargo pockets",
    "Pintuck seam",
    "Stirrup pants"
  ]
};

export const EditPanel = ({
  imageUrl,
  isGenerating,
  blendColor,
  setBlendColor,
  clothAdjustment,
  setClothAdjustment,
  clothType,
  onDownload,
}: EditPanelProps) => {
  const availableAdjustments = clothAdjustmentsMap[clothType] || [];
  
  return (
    <div className="w-80 bg-[hsl(220_20%_12%)] border-l border-border p-6 space-y-6 overflow-y-auto">
      <div className="flex items-center gap-2">
        <Settings2 className="h-5 w-5" style={{ color: '#03f484' }} />
        <h2 className="text-2xl font-bold" style={{ color: '#03f484' }}>Edit Tools</h2>
      </div>
      <p className="text-sm text-gray-400">Fine-tune your design</p>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload('jpg')}
            disabled={!imageUrl || isGenerating}
            className="flex-1"
          >
            <Download className="mr-2 h-4 w-4" />
            JPG
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDownload('pdf')}
            disabled={!imageUrl || isGenerating}
            className="flex-1"
          >
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>

        <div className="pt-4 border-t border-border space-y-4">
          <div className="space-y-3">
            <Label htmlFor="blend-color" className="text-base text-white">Blend Colour (Optional)</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                id="blend-color"
                value={blendColor}
                onChange={(e) => setBlendColor(e.target.value)}
                className="w-16 h-16 rounded border-2 border-border cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">
                  Select a secondary colour to blend with your primary design colour
                </p>
                <p className="text-xs font-mono mt-1" style={{ color: '#03f484' }}>
                  {blendColor.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {availableAdjustments.length > 0 && (
            <div className="space-y-3">
              <Label htmlFor="cloth-adjustment" className="text-base text-white">Cloth Adjustments (Optional)</Label>
              <Select value={clothAdjustment} onValueChange={setClothAdjustment}>
                <SelectTrigger id="cloth-adjustment" className="w-full bg-background/50">
                  <SelectValue placeholder="Select adjustment" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-[hsl(220_20%_12%)] border-border text-white">
                  <SelectItem value="none" className="text-white">None</SelectItem>
                  {availableAdjustments.map((adjustment) => (
                    <SelectItem key={adjustment} value={adjustment} className="text-white">
                      {adjustment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose specific design variations for {clothType}
              </p>
            </div>
          )}
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <p className="text-xs text-accent-foreground">
            💡 <span className="font-semibold">Tip:</span> Use blend colour and cloth adjustments to customize your design further!
          </p>
        </div>
      </div>
    </div>
  );
};
