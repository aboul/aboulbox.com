import React from "react";

export const InputErrorMessage: React.FC<{ message: string }> = ({
  message,
}) => (
  <div className="text-xs bg-red-800/60 border border-red-800 text-white p-2 z-10 relative rounded-b-sm">
    {message}
  </div>
);
