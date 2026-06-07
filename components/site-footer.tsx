// 푸터 랜드마크 (Pass 1: 연락처는 nav + 푸터 양쪽). 터치타깃 44px 확보.
export function SiteFooter() {
  return (
    <footer className="border-t border-hairline mt-24">
      <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="font-mono text-xs text-gray-2">hoonjo — frontend engineer</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-sm">
          {/* TODO(T0): 개인 이메일로 교체 */}
          <li>
            <a className="inline-flex items-center min-h-[44px] text-accent hover:underline underline-offset-4" href="mailto:TODO@example.com">
              Email
            </a>
          </li>
          <li>
            <a className="inline-flex items-center min-h-[44px] text-accent hover:underline underline-offset-4" href="https://github.com/H8njo" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a className="inline-flex items-center min-h-[44px] text-accent hover:underline underline-offset-4" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
