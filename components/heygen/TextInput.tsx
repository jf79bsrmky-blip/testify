"use client";

import { TaskType, TaskMode } from "@heygen/streaming-avatar";
import React, { useCallback, useEffect, useState } from "react";

import { useTextChat } from "./hooks/useTextChat";
import { useConversationState } from "./hooks/useConversationState";

export const TextInput: React.FC = () => {
  const { sendMessage, sendMessageSync } = useTextChat();
  const { startListening, stopListening } = useConversationState();
  const [taskType, setTaskType] = useState<TaskType>(TaskType.TALK);
  const [taskMode, setTaskMode] = useState<TaskMode>(TaskMode.ASYNC);
  const [message, setMessage] = useState("");

  const handleSend = useCallback(() => {
    if (message.trim() === "") {
      return;
    }
    if (taskType === TaskType.TALK) {
      taskMode === TaskMode.SYNC
        ? sendMessageSync(message)
        : sendMessage(message);
    }
    setMessage("");
  }, [taskType, taskMode, message, sendMessage, sendMessageSync]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSend();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSend]);

  useEffect(() => {
    if (message) {
      startListening();
    } else {
      stopListening();
    }
  }, [message, startListening, stopListening]);

  return (
    <div className="flex flex-row gap-2 items-end w-full">
      <select
        className="bg-zinc-800 text-white text-xs px-2 py-2 rounded-lg border border-zinc-600"
        value={taskType}
        onChange={(e) => setTaskType(e.target.value as TaskType)}
      >
        <option value={TaskType.TALK}>TALK</option>
        <option value={TaskType.REPEAT}>REPEAT</option>
      </select>
      <select
        className="bg-zinc-800 text-white text-xs px-2 py-2 rounded-lg border border-zinc-600"
        value={taskMode}
        onChange={(e) => setTaskMode(e.target.value as TaskMode)}
      >
        <option value={TaskMode.ASYNC}>ASYNC</option>
        <option value={TaskMode.SYNC}>SYNC</option>
      </select>
      <input
        className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#7559FF] min-w-[300px]"
        placeholder={`Type something for the avatar to ${taskType === TaskType.REPEAT ? "repeat" : "respond"}...`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />
      <button
        className="bg-[#7559FF] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#6548E6] transition-colors"
        onClick={handleSend}
      >
        <svg
          fill="none"
          height={20}
          viewBox="0 0 16 16"
          width={20}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M14.686 7.41437C14.8667 7.78396 14.8667 8.21629 14.686 8.58588C14.5413 8.8817 14.2792 9.05684 14.08 9.17191C13.8742 9.29079 13.6015 9.41707 13.2919 9.56042L3.52078 14.0855C3.29008 14.1924 3.07741 14.2909 2.89693 14.3553C2.70994 14.422 2.46552 14.4879 2.19444 14.442C1.8383 14.3817 1.52185 14.1796 1.3175 13.8817C1.16195 13.655 1.11903 13.4055 1.10097 13.2078C1.08355 13.017 1.08357 12.7826 1.08359 12.5284L1.08359 10.1207C1.08359 10.1021 1.08351 10.0829 1.08343 10.0633C1.08255 9.85606 1.08146 9.59598 1.17301 9.35874C1.252 9.15409 1.38025 8.97208 1.54641 8.82886C1.73903 8.66284 1.98433 8.57639 2.17979 8.5075C2.19829 8.50098 2.21635 8.49461 2.23387 8.48835L3.3612 8.08569L2.23387 7.68302C2.21635 7.67676 2.19829 7.67039 2.17979 7.66387C1.98433 7.59498 1.73903 7.50853 1.54641 7.34251C1.38025 7.19929 1.252 7.01728 1.17301 6.81263C1.08146 6.57539 1.08255 6.3153 1.08343 6.10806C1.08351 6.08844 1.08359 6.0693 1.08359 6.05069L1.08359 3.47182C1.08357 3.21759 1.08355 2.98324 1.10097 2.79242C1.11903 2.59472 1.16195 2.34523 1.3175 2.11853C1.52185 1.82069 1.8383 1.61851 2.19444 1.55824C2.46552 1.51236 2.70994 1.57825 2.89693 1.64495C3.07741 1.70933 3.29007 1.80784 3.52076 1.9147L13.2919 6.43983C13.6015 6.58318 13.8742 6.70946 14.08 6.82834C14.2792 6.94341 14.5413 7.11855 14.686 7.41437ZM13.413 7.98287C13.266 7.89792 13.0493 7.79688 12.7045 7.63716L2.98502 3.13597C2.7214 3.01388 2.56493 2.94215 2.44896 2.90078C2.44246 2.89846 2.43638 2.89635 2.4307 2.89443C2.43005 2.90039 2.42941 2.9068 2.42878 2.91367C2.41759 3.03629 2.41693 3.20842 2.41693 3.49893L2.41693 6.05069C2.41693 6.19492 2.41728 6.27013 2.42098 6.32446C2.4211 6.32621 2.42121 6.32787 2.42133 6.32946C2.42279 6.3301 2.42431 6.33077 2.42591 6.33147C2.47584 6.35323 2.54655 6.37886 2.68238 6.42738L5.56736 7.45787C5.83268 7.55263 6.00978 7.80395 6.00978 8.08569C6.00978 8.36742 5.83268 8.61874 5.56736 8.7135L2.68238 9.74399C2.54655 9.79251 2.47584 9.81814 2.42591 9.8399C2.42431 9.8406 2.42279 9.84127 2.42133 9.84191C2.42121 9.8435 2.4211 9.84516 2.42098 9.84691C2.41728 9.90124 2.41693 9.97645 2.41693 10.1207L2.41693 12.5013C2.41693 12.7918 2.41759 12.964 2.42878 13.0866C2.42941 13.0935 2.43005 13.0999 2.4307 13.1058C2.43638 13.1039 2.44246 13.1018 2.44896 13.0995C2.56493 13.0581 2.7214 12.9864 2.98502 12.8643L12.7045 8.36309C13.0493 8.20337 13.266 8.10233 13.413 8.01737C13.4236 8.01125 13.4333 8.0055 13.4422 8.00012C13.4333 7.99474 13.4236 7.98899 13.413 7.98287Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

