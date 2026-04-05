import {
  aboutPoints,
  certifications,
  education,
  experiences,
  profile,
  projects,
  skillGroups,
} from '@/content/portfolio';

export type TerminalLine = { kind: 'output'; text: string };

const joinLines = (lines: string[]): TerminalLine[] => lines.map((text) => ({ kind: 'output' as const, text }));

export function getHelpLines(): TerminalLine[] {
  return joinLines([
    'Available commands:',
    '  help          Show this message',
    '  clear         Clear the terminal',
    '  about         About Shaunak',
    '  projects      List projects with links',
    '  skills        Skill groups',
    '  experience    Work experience',
    '  education     Education & certifications',
    '  contact       Email and social links',
    '  github        Print GitHub profile URL',
    '  linkedin      Print LinkedIn URL',
    '  resume        Resume PDF location',
    '  whoami        Current user hint',
    '  date          Current date (UTC)',
    '  echo <text>   Repeat text',
    '',
    'Navigation:',
    '  home          Return to the main portfolio (same as the footer link)',
  ]);
}

export function getAboutLines(): TerminalLine[] {
  return joinLines(['About', '', ...aboutPoints.map((p) => `• ${p}`), '']);
}

export function getProjectsLines(): TerminalLine[] {
  const lines: string[] = ['Projects', ''];
  for (const p of projects) {
    lines.push(`${p.title} (${p.date})`, `  ${p.link}`, `  ${p.summary}`, `  Stack: ${p.stack.join(', ')}`, '');
  }
  return joinLines(lines);
}

export function getSkillsLines(): TerminalLine[] {
  const lines: string[] = ['Skills', ''];
  for (const g of skillGroups) {
    lines.push(`${g.title}:`, `  ${g.items.join(', ')}`, '');
  }
  return joinLines(lines);
}

export function getExperienceLines(): TerminalLine[] {
  const lines: string[] = ['Experience', ''];
  for (const e of experiences) {
    lines.push(`${e.title} @ ${e.organization}`, `  ${e.period} · ${e.role}`, ...e.bullets.map((b) => `  - ${b}`), '');
  }
  return joinLines(lines);
}

export function getEducationLines(): TerminalLine[] {
  return joinLines([
    'Education',
    '',
    `${education.college}`,
    `${education.degree}`,
    `${education.duration} · ${education.location}`,
    `CGPA: ${education.cgpa}`,
    '',
    'Certifications',
    ...certifications.map((c) => `  • ${c}`),
    '',
  ]);
}

export function getContactLines(): TerminalLine[] {
  return joinLines([
    'Contact',
    '',
    `Email: ${profile.email.replace('mailto:', '')}`,
    `GitHub: ${profile.github}`,
    `LinkedIn: ${profile.linkedin}`,
    `Location: ${profile.location}`,
    '',
  ]);
}

export function getUnknownCommandLines(command: string): TerminalLine[] {
  return joinLines([
    `command not found: ${command}`,
    "Type 'help' for a list of commands.",
    '',
  ]);
}

export function parseCommandLine(input: string): { name: string; args: string[] } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { name: '', args: [] };
  }
  const tokens = trimmed.split(/\s+/).filter(Boolean);
  const name = tokens[0]?.toLowerCase() ?? '';
  const args = tokens.slice(1);
  return { name, args };
}

export type CommandRunResult =
  | { type: 'lines'; lines: TerminalLine[] }
  | { type: 'clear' }
  | { type: 'navigate'; href: string };

export function runParsedCommand(name: string, args: string[]): CommandRunResult {
  switch (name) {
    case '':
      return { type: 'lines', lines: [] };
    case 'help':
    case '?':
      return { type: 'lines', lines: getHelpLines() };
    case 'clear':
    case 'cls':
      return { type: 'clear' };
    case 'about':
      return { type: 'lines', lines: getAboutLines() };
    case 'projects':
      return { type: 'lines', lines: getProjectsLines() };
    case 'skills':
      return { type: 'lines', lines: getSkillsLines() };
    case 'experience':
    case 'exp':
      return { type: 'lines', lines: getExperienceLines() };
    case 'education':
    case 'edu':
      return { type: 'lines', lines: getEducationLines() };
    case 'contact':
      return { type: 'lines', lines: getContactLines() };
    case 'github':
      return { type: 'lines', lines: joinLines(['GitHub', '', profile.github, '']) };
    case 'linkedin':
      return { type: 'lines', lines: joinLines(['LinkedIn', '', profile.linkedin, '']) };
    case 'resume':
      return {
        type: 'lines',
        lines: joinLines(['Resume', '', `${profile.resumeUrl} (open from the main site or your browser)`, '']),
      };
    case 'whoami':
      return {
        type: 'lines',
        lines: joinLines([
          profile.name,
          'AI/ML engineer · portfolio shell',
          '',
        ]),
      };
    case 'date':
      return { type: 'lines', lines: joinLines([new Date().toUTCString(), '']) };
    case 'echo':
      return { type: 'lines', lines: joinLines([args.join(' ') || '(empty)', '']) };
    case 'home':
    case 'portfolio':
      return { type: 'navigate', href: '/' };
    default:
      return { type: 'lines', lines: getUnknownCommandLines(name) };
  }
}
