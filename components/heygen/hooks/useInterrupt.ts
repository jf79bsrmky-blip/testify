"use client";

import { useCallback } from "react";

import { useStreamingAvatarContext } from "../StreamingAvatarProvider";

export const useInterrupt = () => {
  const { avatarRef } = useStreamingAvatarContext();

  const interrupt = useCallback(() => {
    if (!avatarRef.current) return;
    avatarRef.current.interrupt();
  }, [avatarRef]);

  return { interrupt };
};

