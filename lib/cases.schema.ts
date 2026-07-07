// 케이스 frontmatter 타입 + 런타임 검증.
// next-mdx-remote는 타입을 안 주므로 여기서 명시 정의하고 빌드 타임에 검증한다.
// 잘못된 frontmatter는 빌드를 fail-fast 시켜 잘못된 콘텐츠가 배포되는 걸 막는다.

export interface CaseMetric {
  label: string;
  value: string;
}

export interface CaseFrontmatter {
  title: string;
  summary: string; // 목록 카드의 "떡밥" 한 줄
  featured: boolean;
  order: number; // /work 정렬 (작을수록 먼저)
  tags: string[];
  metrics: CaseMetric[];
  demo?: "column-pager" | "blackhole" | "range-editor"; // 상세 페이지에 라이브 데모 임베드 (지원 데모만)
  demoUrl?: string; // 브라우저 임베드가 불가능한 케이스(네이티브 앱 등)의 외부 라이브 데모/저장소 링크
  date?: string;
}

export interface CaseEntry {
  slug: string;
  frontmatter: CaseFrontmatter;
  content: string; // raw MDX body
}

function fail(slug: string, msg: string): never {
  throw new Error(`[cases] "${slug}.mdx" frontmatter 오류: ${msg}`);
}

// raw gray-matter data → 검증된 CaseFrontmatter (기본값 채움). 실패 시 throw.
export function parseFrontmatter(slug: string, data: Record<string, unknown>): CaseFrontmatter {
  if (typeof data.title !== "string" || data.title.trim() === "") {
    fail(slug, "title(string)은 필수입니다");
  }
  if (typeof data.summary !== "string" || data.summary.trim() === "") {
    fail(slug, "summary(string)은 필수입니다");
  }

  const metricsRaw = data.metrics ?? [];
  if (!Array.isArray(metricsRaw)) fail(slug, "metrics는 배열이어야 합니다");
  const metrics: CaseMetric[] = metricsRaw.map((m, i) => {
    if (typeof m !== "object" || m === null || typeof (m as CaseMetric).label !== "string" || typeof (m as CaseMetric).value !== "string") {
      fail(slug, `metrics[${i}]는 { label, value } 형태여야 합니다`);
    }
    return { label: (m as CaseMetric).label, value: (m as CaseMetric).value };
  });

  const tagsRaw = data.tags ?? [];
  if (!Array.isArray(tagsRaw) || tagsRaw.some((t) => typeof t !== "string")) {
    fail(slug, "tags는 string 배열이어야 합니다");
  }

  return {
    title: data.title as string,
    summary: data.summary as string,
    featured: data.featured === true,
    order: typeof data.order === "number" ? data.order : 999,
    tags: tagsRaw as string[],
    metrics,
    demo:
      data.demo === "column-pager" ||
      data.demo === "blackhole" ||
      data.demo === "range-editor"
        ? data.demo
        : undefined,
    demoUrl:
      typeof data.demoUrl === "string" && data.demoUrl.trim() !== ""
        ? data.demoUrl
        : undefined,
    date: typeof data.date === "string" ? data.date : undefined,
  };
}
