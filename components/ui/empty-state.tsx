"use client"
import { useRouter } from "next/navigation";
import Heading from "./heading";
import Button from './button';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title = "No exact result", subtitle = "This page probably was deleted", showReset  }) => {

  const router = useRouter()

  return (
    <div
      className="h-[60vh] flex flex-col justify-center items-center gap-2"
    >
      <Heading 
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button 
            secondary
            label="Go back to home"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  )
}

export default EmptyState