#!/usr/bin/env node
import { select, input, checkbox, confirm } from "@inquirer/prompts";
import { mkdir, writeFile, readFile, access, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const DEFAULT_LOCALES = ["zh-Hant"]; // 你之後擴語系就把 config 檔加上去

function pad2(n) {
  return String(n).padStart(2, "0");
}
function formatDateYYYYMMDD(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function formatISOWithOffset(d) {
  const tzMin = -d.getTimezoneOffset();
  const sign = tzMin >= 0 ? "+" : "-";
  const abs = Math.abs(tzMin);
  const hh = pad2(Math.floor(abs / 60));
  const mm = pad2(abs % 60);
  return (
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}` +
    `T${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}` +
    `${sign}${hh}:${mm}`
  );
}
function isValidSlug(s) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
}
function isValidGitHubUsername(s) {
  return (
    typeof s === "string" &&
    s.length >= 1 &&
    s.length <= 39 &&
    /^(?!-)[A-Za-z0-9-]+(?<!-)$/.test(s)
  );
}
function yamlArrayQuoted(items) {
  return `[${items.map((x) => JSON.stringify(x)).join(", ")}]`;
}
async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function loadJson(p, fallback) {
  if (!(await exists(p))) return fallback;
  const raw = await readFile(p, "utf8");
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function listYearFolders(type, locale) {
  const base = path.join(ROOT, "src", "content", type, locale);
  if (!(await exists(base))) return [];
  const items = await readdir(base, { withFileTypes: true });
  return items
    .filter((d) => d.isDirectory() && /^\d{4}$/.test(d.name))
    .map((d) => d.name)
    .sort((a, b) => Number(b) - Number(a));
}

function templateFor(type, { title, description, authors, now }) {
  const common = `title: ${JSON.stringify(title)}
description: ${JSON.stringify(description)}
tags: []
authors: ${yamlArrayQuoted(authors)}
draft: true`;

  if (type === "news") {
    return `---
${common}
date: ${formatDateYYYYMMDD(now)}
pin: false
cover: ""
---

在此撰寫最新消息內容。
`;
  }

  if (type === "projects") {
    return `---
${common}
status: "active"
startDate: ${formatDateYYYYMMDD(now)}
endDate:
repoUrl:
demoUrl:
cover: ""
---

在此撰寫專案內容（目標、里程碑、成果等）。
`;
  }

  if (type === "events") {
    return `---
${common}
startAt: ${formatISOWithOffset(now)}
endAt:
location:
registrationUrl:
cover: ""
---

在此撰寫活動內容（議程、注意事項、交通方式等）。
`;
  }

  throw new Error(`Unknown type: ${type}`);
}

async function main() {
  const configPath = path.join(ROOT, "scripts", "new-post.config.json");
  const cfg = await loadJson(configPath, { locales: DEFAULT_LOCALES, defaultLocale: DEFAULT_LOCALES[0] });

  const type = await select({
    message: "要建立哪一種內容？",
    choices: [
      { name: "最新消息（news）", value: "news" },
      { name: "專案（projects）", value: "projects" },
      { name: "活動（events）", value: "events" },
    ],
  });

  const locales = Array.isArray(cfg
