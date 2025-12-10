import { useState } from "react";
import { ControlPanel } from "@/components/ControlPanel";
import { DesignCanvas } from "@/components/DesignCanvas";
import { EditPanel } from "@/components/EditPanel";
import { AIBot } from "@/components/AIBot";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [material, setMaterial] = useState("cotton");
  const [clothType, setClothType] = useState("shirt");
  const [usage, setUsage] = useState("casual");
  const [color, setColor] = useState("blue");
  const [pattern, setPattern] = useState("striped");
  const [clothDetail, setClothDetail] = useState("");
  
  const [blendColor, setBlendColor] = useState("#ffffff");
  const [clothAdjustment, setClothAdjustment] = useState("none");
  
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    toast.info("Generating your textile design...");

    try {
      const { data, error } = await supabase.functions.invoke('generate-textile-design', {
        body: {
          material,
          clothType,
          usage,
          color,
          pattern,
          clothDetail,
          blendColor: blendColor !== "#ffffff" ? blendColor : undefined,
          clothAdjustment: clothAdjustment !== "none" ? clothAdjustment : undefined
        }
      });

      if (error) throw error;

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
        toast.success("Design generated successfully!");
      } else {
        throw new Error("No image URL returned");
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate design. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (format: 'jpg' | 'pdf') => {
    if (!imageUrl) {
      toast.error("No design to download");
      return;
    }

    try {
      if (format === 'jpg') {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `textile-design-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Design downloaded as JPG!");
      } else {
        const { jsPDF } = await import('jspdf');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [1024, 1024]
        });
        
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;
        
        img.onload = () => {
          pdf.addImage(img, 'JPEG', 0, 0, 1024, 1024);
          pdf.save(`textile-design-${Date.now()}.pdf`);
          toast.success("Design downloaded as PDF!");
        };
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download design");
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <ControlPanel
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        material={material}
        setMaterial={setMaterial}
        clothType={clothType}
        setClothType={setClothType}
        usage={usage}
        setUsage={setUsage}
        color={color}
        setColor={setColor}
        pattern={pattern}
        setPattern={setPattern}
        clothDetail={clothDetail}
        setClothDetail={setClothDetail}
      />
      
      <DesignCanvas 
        imageUrl={imageUrl} 
        isGenerating={isGenerating}
        material={material}
        clothType={clothType}
        clothDetail={clothDetail}
        pattern={pattern}
      />
      
      <EditPanel
        imageUrl={imageUrl}
        isGenerating={isGenerating}
        blendColor={blendColor}
        setBlendColor={setBlendColor}
        clothAdjustment={clothAdjustment}
        setClothAdjustment={setClothAdjustment}
        clothType={clothType}
        onDownload={handleDownload}
      />
      
      <AIBot 
        designParams={{
          material,
          clothType,
          usage,
          color,
          pattern
        }}
      />
    </div>
  );
};

export default Index;
