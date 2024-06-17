import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

interface InstallationTechniqueProps {
  technique: string;
  command: string
}

export function InstallationTechnique({ technique, command }: InstallationTechniqueProps) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }
  return (
    <li className="m-4">
      <div className="container">
        <div className="font-bold">{technique}</div>
        <div className="flex items-center">
          <code className="p-2">{command}</code>
          {isCopied ? <CopyCheck className="ml-2" size={18} /> : <Copy className="ml-2" size={18} onClick={handleCopy} />}
        </div>
      </div>
    </li>
  )
}