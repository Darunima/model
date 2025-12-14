import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface ControlPanelProps {
  onGenerate: () => void;
  isGenerating: boolean;
  material: string;
  setMaterial: (value: string) => void;
  clothType: string;
  setClothType: (value: string) => void;
  usage: string;
  setUsage: (value: string) => void;
  color: string;
  setColor: (value: string) => void;
  pattern: string;
  setPattern: (value: string) => void;
  clothDetail: string;
  setClothDetail: (value: string) => void;
}

const materials = ["Cotton", "Neon", "Silk", "Linen", "Wool", "Polyester", "Denim", "Velvet"];
const clothTypes = ["Shirt", "T-Shirt", "Pant", "Saree", "Dress", "Jacket", "Blouse", "Skirt"];
const usages = ["Sportswear", "Casual", "Formal", "Party Wear", "Ethnic", "Office Wear"];
const colors = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Black", "White", "Multicolor"];
const patterns = ["Striped", "Dotted", "Printed", "Floral", "Geometric", "Abstract", "Paisley", "Checkered", "Solid"];

const clothDetailsMap: Record<string, string[]> = {
  "shirt": ["Quarter Sleeve", "Half Sleeve", "Full Sleeve"],
  "t-shirt": ["Quarter Sleeve", "Half Sleeve", "Full Sleeve"],
  "pant": ["Full", "Boxers", "Trousers", "Shorts"],
  "jacket": ["Zipped Jacket", "Buttoned Jacket", "Plain Jacket"],
  "blouse": ["Boat Neck", "Backless", "Strappy", "Sleeveless"],
  "saree": ["Full", "Half Saree"],
  "skirt": ["Mini", "Box Pleats", "Pencil", "Tiered", "Circle"],
};

export const ControlPanel = ({
  onGenerate,
  isGenerating,
  material,
  setMaterial,
  clothType,
  setClothType,
  usage,
  setUsage,
  color,
  setColor,
  pattern,
  setPattern,
  clothDetail,
  setClothDetail,
}: ControlPanelProps) => {
  const availableClothDetails = clothDetailsMap[clothType] || [];
  return (
    <div className="w-80 bg-[hsl(220_20%_12%)] border-r border-border p-6 space-y-6 overflow-y-auto">
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#03f484' }}>Design Controls</h2>
        <p className="text-sm text-gray-400">Configure your textile design</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="material" className="text-white">Material Type</Label>
          <Select value={material} onValueChange={setMaterial}>
            <SelectTrigger id="material">
              <SelectValue placeholder="Select material" />
            </SelectTrigger>
            <SelectContent>
              {materials.map((m) => (
                <SelectItem key={m} value={m.toLowerCase()}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cloth-type" className="text-white">Cloth Type</Label>
          <Select value={clothType} onValueChange={setClothType}>
            <SelectTrigger id="cloth-type">
              <SelectValue placeholder="Select cloth type" />
            </SelectTrigger>
            <SelectContent>
              {clothTypes.map((c) => (
                <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="usage" className="text-white">Usage</Label>
          <Select value={usage} onValueChange={setUsage}>
            <SelectTrigger id="usage">
              <SelectValue placeholder="Select usage" />
            </SelectTrigger>
            <SelectContent>
              {usages.map((u) => (
                <SelectItem key={u} value={u.toLowerCase().replace(" ", "-")}>{u}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="color" className="text-white">Color Preference</Label>
          <Select value={color} onValueChange={setColor}>
            <SelectTrigger id="color">
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((c) => (
                <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pattern" className="text-white">Pattern</Label>
          <Select value={pattern} onValueChange={setPattern}>
            <SelectTrigger id="pattern">
              <SelectValue placeholder="Select pattern" />
            </SelectTrigger>
            <SelectContent>
              {patterns.map((p) => (
                <SelectItem key={p} value={p.toLowerCase()}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {availableClothDetails.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="cloth-detail" className="text-white">Cloth Detail</Label>
            <Select value={clothDetail} onValueChange={setClothDetail}>
              <SelectTrigger id="cloth-detail">
                <SelectValue placeholder="Select detail" />
              </SelectTrigger>
              <SelectContent>
                {availableClothDetails.map((detail) => (
                  <SelectItem key={detail} value={detail.toLowerCase().replace(" ", "-")}>{detail}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Button 
        onClick={onGenerate} 
        disabled={isGenerating}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Sparkles className="mr-2 h-5 w-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Design
          </>
        )}
      </Button>
    </div>
  );
};
