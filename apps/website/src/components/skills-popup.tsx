import { X } from "lucide-react";
import { Button } from "@inewlegend/website/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@inewlegend/website/src/components/ui/card";
import { config } from "@inewlegend/website/src/config";

interface SkillsPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SkillsPopup({ isOpen, onClose }: SkillsPopupProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl">Skills & Technologies</CardTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    {Object.entries(config.skills).map(([category, skillList]) => (
                        <div key={category}>
                            <h3 className="text-lg font-semibold mb-3 text-primary">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {skillList.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
