# hoonjo portfolio

7년차 프론트엔드 개발자의 이직용 포트폴리오 사이트.

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

핵심: Editorial Minimal + instrument 톤. 시그니처 = "문제지 책자 스크롤"(세로 1열, 케이스=문제 한 장).
단일 최강 차별점 = column-count 창의적 해결("AI·동료가 못 푼 걸 해결") → featured 케이스 + 라이브 데모.
히어로 = PDF 성능 수치(639,000ms→1,310ms, 488배).

## Skill routing
When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.
- 제품 아이디어/브레인스토밍 → /office-hours
- 디자인 시스템/플랜 리뷰 → /design-consultation or /plan-design-review
- 아키텍처 → /plan-eng-review
- 버그/에러 → /investigate
- QA/사이트 동작 테스트 → /qa or /qa-only
- 비주얼 폴리시 → /design-review
- 배포/PR → /ship or /land-and-deploy
