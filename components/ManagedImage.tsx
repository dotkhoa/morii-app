"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

const ManagedImage = (props: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div>
      {isLoading && <Skeleton className="h-[250px] w-[250px]" />}

      <Image {...props} alt="" onLoad={() => setIsLoading(false)} />
    </div>
  );
};

export default ManagedImage;
