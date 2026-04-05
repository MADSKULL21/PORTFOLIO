'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FormEvent, KeyboardEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { profile } from '@/content/portfolio';
import {
  getHelpLines,
  parseCommandLine,
  runParsedCommand,
  type TerminalLine,
} from '@/lib/terminal-commands';

type HistoryEntry = { command: string; lines: TerminalLine[] };

const WELCOME_LINES: TerminalLine[] = [
  { kind: 'output', text: 'Shaunak Lad · interactive portfolio shell' },
  { kind: 'output', text: "Type 'help' for commands, or 'home' to return to the main site." },
  { kind: 'output', text: '' },
];

export default function TerminalExperience() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>(() => [
    { command: '', lines: WELCOME_LINES },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [draftInput, setDraftInput] = useState('');

  const scrollOutputToEnd = useCallback(() => {
    const el = outputRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollOutputToEnd();
  }, [history, scrollOutputToEnd]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const executeCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      const { name, args } = parseCommandLine(trimmed);

      if (trimmed) {
        setCommandHistory((prev) => [...prev, trimmed]);
      }
      setHistoryIndex(null);
      setDraftInput('');

      if (!trimmed) {
        setHistory((prev) => [...prev, { command: '', lines: [] }]);
        return;
      }

      const result = runParsedCommand(name, args);

      if (result.type === 'clear') {
        setHistory([]);
        return;
      }

      if (result.type === 'navigate') {
        setHistory((prev) => [
          ...prev,
          { command: trimmed, lines: [{ kind: 'output', text: `→ Opening ${result.href} …` }, { kind: 'output', text: '' }] },
        ]);
        router.push(result.href);
        return;
      }

      setHistory((prev) => [...prev, { command: trimmed, lines: result.lines }]);
    },
    [router],
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    executeCommand(input);
    setInput('');
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!commandHistory.length) {
        return;
      }
      if (historyIndex === null) {
        setDraftInput(input);
        const nextIndex = commandHistory.length - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex] ?? '');
        return;
      }
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex] ?? '');
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex === null) {
        return;
      }
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex] ?? '');
        return;
      }
      setHistoryIndex(null);
      setInput(draftInput);
    }
  };

  const hostname = 'shaunak@lad';
  const cwd = '~/portfolio';

  return (
    <div className="terminal-page">
      <div className="terminal-shell" role="region" aria-label="Interactive terminal">
        <div className="terminal-chrome">
          <div className="terminal-traffic" aria-hidden="true">
            <span className="terminal-dot terminal-dot-close" />
            <span className="terminal-dot terminal-dot-min" />
            <span className="terminal-dot terminal-dot-max" />
          </div>
          <p className="terminal-title">
            {hostname}: {cwd}
          </p>
          <div className="terminal-chrome-spacer" aria-hidden="true" />
        </div>

        <div className="terminal-body">
          <div className="terminal-output" ref={outputRef} tabIndex={-1}>
            {history.map((entry, blockIndex) => (
              <div key={`block-${blockIndex}`} className="terminal-block">
                {entry.command ? (
                  <div className="terminal-line terminal-line-command">
                    <span className="terminal-prompt" aria-hidden="true">
                      ➜
                    </span>
                    <span className="terminal-command-text">{entry.command}</span>
                  </div>
                ) : null}
                {entry.lines.map((line, lineIndex) => (
                  <div key={`line-${blockIndex}-${lineIndex}`} className="terminal-line terminal-line-output">
                    {line.text}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <form className="terminal-input-row" onSubmit={onSubmit} autoComplete="off">
            <span className="terminal-prompt" aria-hidden="true">
              ➜
            </span>
            <label htmlFor="terminal-command-input" className="sr-only">
              Terminal command
            </label>
            <input
              ref={inputRef}
              id="terminal-command-input"
              className="terminal-input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoCapitalize="none"
              autoCorrect="off"
              aria-describedby="terminal-hint"
            />
          </form>
          <p id="terminal-hint" className="terminal-hint">
            <button type="button" className="terminal-suggestion" onClick={() => executeCommand('help')}>
              help
            </button>
            <button type="button" className="terminal-suggestion" onClick={() => executeCommand('projects')}>
              projects
            </button>
            <button type="button" className="terminal-suggestion" onClick={() => executeCommand('home')}>
              home
            </button>
          </p>
        </div>

        <div className="terminal-footer-bar">
          <Link href="/" className="terminal-footer-link">
            ← Portfolio home
          </Link>
          <a href={profile.resumeUrl} className="terminal-footer-link" target="_blank" rel="noopener noreferrer">
            Resume PDF
          </a>
          <button
            type="button"
            className="terminal-footer-link terminal-footer-button"
            onClick={() => {
              setHistory((prev) => [...prev, { command: 'help', lines: getHelpLines() }]);
              inputRef.current?.focus();
            }}
          >
            Help
          </button>
        </div>
      </div>
    </div>
  );
}
