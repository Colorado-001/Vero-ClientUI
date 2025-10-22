import { cn } from "../../utils/helpers";

interface VeroFlaggedTextProps {
  text: string;
  className?: string;
}

export const VeroFlaggedText = ({ text, className }: VeroFlaggedTextProps) => {
  const renderFormattedText = (content: string) => {
    // Split the text by ## to identify the parts to bold
    const parts = content.split("##");

    return parts.map((part, index) => {
      // Every odd index is inside ## markers (should be bold and colored)
      if (index % 2 === 1) {
        return (
          <span key={index} className="font-bold text-[#6C4EFF]">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className={cn("text-sm text-gray-300", className)}>
      {renderFormattedText(text)}
    </div>
  );
};

// Alternative simpler version if you prefer:
export const VeroFlaggedTextSimple = ({
  text = "This transaction has been flagged by ##Vero AI Checker## as risky",
  className,
}: VeroFlaggedTextProps) => {
  const [before, flagged, after] = text.split("##");

  return (
    <div className={cn("text-sm text-gray-300", className)}>
      {before}
      <span className="font-bold text-[#6C4EFF]">{flagged}</span>
      {after}
    </div>
  );
};
