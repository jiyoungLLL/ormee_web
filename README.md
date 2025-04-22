## 📚 개발 가이드

- [Storybook 작성 가이드](#Storybook-작성-및-관리-가이드)
- [Git 컨벤션](#Git-컨벤션)

## Storybook 작성 및 관리 가이드

- [스토리북 배포 사이트 바로가기](https://ormee-storybook.vercel.app/?path=/docs/configure-your-project--docs)

### 1. 컴포넌트 및 스토리 구성 규칙

- **컴포넌트 파일과 동일한 경로에 `.stories.tsx` 파일을 생성**합니다.
- 100% 커버리지는 요구하지 않지만, **핵심 로직 및 주요 UI 상호작용 중심으로 Story를 작성**합니다.
- 페이지 구현 시에도 **중요 기능이 포함된 경우 별도의 페이지 단위 Story 작성**을 권장합니다.
- 각 컴포넌트에는 **JSDoc 주석을 활용하여 props 정보를 명확히 설명**합니다.

### 2. 테스트 및 병합 정책

- 모든 Story는 Storybook 내에서 실행 가능한 상태여야 하며, **빌드 및 테스트 실패 시 상위 브랜치로의 병합을 금지**합니다.
- **PR 생성 시, 변경된 컴포넌트에 Storybook이 존재할 경우, PR 본문에 Storybook Preview 링크를 필수로 첨부**합니다.

<br/>
<br/>

## Git 컨벤션

### 1. 커밋 타입

| 타입       | 설명                            |
| ---------- | ------------------------------- |
| `feat`     | 기능 구현                       |
| `style`    | 스타일링 변경만 있을 때         |
| `chore`    | 기능 변경 없이 설정 등 변경 시  |
| `refactor` | 성능 개선 또는 코드 구조 개선   |
| `fix`      | 버그 수정                       |
| `test`     | 테스트 코드, 스토리북 관련 커밋 |

### 2. 브랜치 전략

- main → develop → feat/구현할 기능 (ex. feat/text-editor)

### 3. PR 규칙

- PR 템플릿 사용
- 간단한 요약과 스크린샷 첨부
- Story가 있을 경우 Storybook 프리뷰 링크 포함
- **1명 이상 리뷰 후 `develop` 브랜치로 머지**
