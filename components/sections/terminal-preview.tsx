"use client";

import { useEffect, useMemo, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

interface TerminalCommand {
  command: string;
  output: string[];
}

const terminalCommands: TerminalCommand[] = [
  {
    command: "whoami",
    output: ["Suganth S"],
  },
  {
    command: "role",
    output: ["Python Developer | AI & Machine Learning"],
  },
  {
    command: "learning",
    output: ["Machine Learning", "Python", "SQL", "Artificial Intelligence"],
  },
  {
    command: "github",
    output: ["github.com/Suganth-S-39"],
  },
];

const TYPE_INTERVAL_MS = 54;
const COMMAND_PAUSE_MS = 520;

export function TerminalPreview() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCommandIndex, setActiveCommandIndex] = useState(0);
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(0);
  const [completedCommandCount, setCompletedCommandCount] = useState(0);

  const activeCommand = terminalCommands[activeCommandIndex];
  const completedCommands = useMemo(
    () => terminalCommands.slice(0, completedCommandCount),
    [completedCommandCount],
  );

  useEffect(() => {
    if (!activeCommand || completedCommandCount === terminalCommands.length) {
      return;
    }

    if (visibleCharacterCount < activeCommand.command.length) {
      const timeout = window.setTimeout(() => {
        setVisibleCharacterCount((count) => count + 1);
      }, TYPE_INTERVAL_MS);

      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setCompletedCommandCount((count) => count + 1);
      setActiveCommandIndex((index) => index + 1);
      setVisibleCharacterCount(0);
    }, COMMAND_PAUSE_MS);

    return () => window.clearTimeout(timeout);
  }, [activeCommand, completedCommandCount, visibleCharacterCount]);

  return (
    <div
      className="rounded-card border border-line bg-zinc-950/75 shadow-card backdrop-blur-xl"
      aria-label="Interactive terminal introducing Suganth S"
    >
      <div className="flex min-h-10 items-center gap-2 border-b border-line px-4">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-amber-300/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-xs font-medium text-muted">
          suganth.sh
        </span>
      </div>

      <div className="min-h-[286px] p-4 font-mono text-sm leading-7 text-slate-200 sm:p-5">
        {completedCommands.map((item) => (
          <TerminalBlock
            key={item.command}
            command={item.command}
            output={item.output}
          />
        ))}

        {completedCommandCount < terminalCommands.length ? (
          <p className="flex flex-wrap items-center gap-2">
            <span className="text-accent">&gt;</span>
            <span>{activeCommand.command.slice(0, visibleCharacterCount)}</span>
            <TerminalCursor shouldReduceMotion={shouldReduceMotion} />
          </p>
        ) : (
          <p className="flex flex-wrap items-center gap-2 text-muted">
            <span className="text-accent">&gt;</span>
            <span>available for Python and AI internships</span>
            <TerminalCursor shouldReduceMotion={shouldReduceMotion} />
          </p>
        )}
      </div>
    </div>
  );
}

interface TerminalCursorProps {
  shouldReduceMotion: boolean | null;
}

function TerminalCursor({ shouldReduceMotion }: TerminalCursorProps) {
  return (
    <LazyMotion features={domAnimation}>
      <m.span
        className="h-5 w-2 bg-accent"
        aria-hidden="true"
        initial={false}
        animate={
          shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }
        }
        transition={{
          duration: 0.32,
          repeat: Infinity,
        }}
      />
    </LazyMotion>
  );
}

function TerminalBlock({ command, output }: TerminalCommand) {
  return (
    <div className="mb-3">
      <p className="flex flex-wrap items-center gap-2">
        <span className="text-accent">&gt;</span>
        <span>{command}</span>
      </p>
      <div className="mt-1 space-y-0.5 pl-5 text-muted">
        {output.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
