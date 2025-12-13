"use client";

import { useStreamingAvatarContext } from "../StreamingAvatarProvider";

export const useMessageHistory = () => {
  const { messages } = useStreamingAvatarContext();

  return { messages };
};


