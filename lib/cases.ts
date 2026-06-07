import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { type CaseEntry, parseFrontmatter } from "@/lib/cases.schema";

const CASES_DIR = path.join(process.cwd(), "content/cases");

// 모든 케이스를 읽어 검증·정렬해 반환.
// 정렬: featured 먼저 → order 오름차순 → title.
// 서버 전용(fs 사용). RSC/빌드 타임에서만 호출.
export function getAllCases(): CaseEntry[] {
  if (!fs.existsSync(CASES_DIR)) return [];

  const files = fs.readdirSync(CASES_DIR).filter((f) => f.endsWith(".mdx"));

  const cases = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CASES_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return { slug, frontmatter: parseFrontmatter(slug, data), content };
  });

  return cases.sort((a, b) => {
    if (a.frontmatter.featured !== b.frontmatter.featured) {
      return a.frontmatter.featured ? -1 : 1;
    }
    if (a.frontmatter.order !== b.frontmatter.order) {
      return a.frontmatter.order - b.frontmatter.order;
    }
    return a.frontmatter.title.localeCompare(b.frontmatter.title);
  });
}

export function getCaseBySlug(slug: string): CaseEntry | null {
  const file = path.join(CASES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: parseFrontmatter(slug, data), content };
}

// featured 케이스 1개 (랜딩 featured 슬롯용). 없으면 null.
export function getFeaturedCase(): CaseEntry | null {
  return getAllCases().find((c) => c.frontmatter.featured) ?? null;
}
