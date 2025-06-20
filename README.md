# DevThink - AI 기반 커리어 블로그 플랫폼

이 프로젝트는 블로그 포스팅을 기반으로 AI가 당신의 커리어를 분석하고 보여주는 혁신적인 블로그 플랫폼입니다. Next.js를 기반으로 현대적인 아키텍처 패턴을 적용하여, 견고한 백엔드 설계와 확장 가능한 프론트엔드 구조를 결합했습니다.

## 기술 스택

- **프론트엔드**: Next.js (App Router), React, TypeScript
- **백엔드**: Node.js, Prisma
- **아키텍처**:
  - 프론트엔드: Feature Sliced Design (FSD)
  - 백엔드: Hexagonal Architecture
- **의존성 주입**: tsyringe
- **데이터베이스 트랜잭션**: AsyncLocalStorage 기반 커스텀 구현
- **인증**: NextAuth.js

## 프로젝트 구조

```
.
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # 인증 관련 페이지
│   │   ├── (dev)/             # 개발 도구 및 디자인 시스템
│   │   ├── api/               # API 라우트
│   │   └── page.tsx           # 메인 페이지
│   │
│   ├── client/                # 프론트엔드 (FSD 아키텍처)
│   │   ├── app/              # 애플리케이션 레이어 - 앱 전역 설정 및 프로바이더
│   │   ├── entities/         # 비즈니스 엔티티
│   │   ├── features/         # 기능 구현
│   │   │   └── auth/         # 인증 기능
│   │   ├── pages/            # 페이지 컴포넌트
│   │   ├── shared/           # 공유 컴포넌트 및 유틸리티
│   │   │   ├── css/         # 전역 스타일 및 CSS 모듈
│   │   │   └── ui/          # 공유 UI 컴포넌트
│   │   └── widgets/          # 복합 컴포넌트
│   │
│   ├── server/               # 백엔드 (헥사고날 아키텍처)
│   │   ├── adapter/         # 어댑터 (Primary/Secondary)
│   │   │   └── in/         # 인바운드 어댑터 (Primary)
│   │   ├── application/     # 애플리케이션 레이어
│   │   │   ├── dto/        # Data Transfer Objects
│   │   │   ├── mappers/    # 엔티티-DTO 매퍼
│   │   │   ├── port/       # 포트 정의
│   │   │   └── services/   # 애플리케이션 서비스
│   │   ├── domain/         # 도메인 레이어
│   │   │   └── aggregate/  # 도메인 애그리게이트 및 엔티티
│   │   └── infra/          # 인프라 레이어
│   │       ├── core/       # 핵심 인프라 컴포넌트
│   │       ├── database/   # 데이터베이스 설정 (Prisma)
│   │       ├── di/        # 의존성 주입 설정
│   │       └── transaction/ # 트랜잭션 관리
│   │
│   ├── shared/              # 클라이언트-서버 간 공유 코드
│   └── types/               # TypeScript 타입 정의
│
├── prisma/                   # Prisma 스키마 및 마이그레이션
└── [설정 파일들]             # 각종 설정 파일 (next, typescript 등)
```

## 아키텍처 상세 설명

### 프론트엔드 (Feature Sliced Design)

FSD 방법론을 따르는 프론트엔드는 다음과 같은 레이어로 구성됩니다:

- **app**: 전역 프로바이더 및 설정
- **entities**: 비즈니스 로직 및 데이터 모델
- **features**: 독립적인 비즈니스 기능
- **shared**: 재사용 가능한 컴포넌트 및 유틸리티
- **widgets**: 복합 컴포넌트
- **pages**: 페이지 레벨 컴포넌트

### 백엔드 (헥사고날 아키텍처)

클린 헥사고날 아키텍처를 구현한 백엔드는 다음과 같이 구성됩니다:

- **도메인 레이어**: 핵심 비즈니스 로직 및 엔티티
- **애플리케이션 레이어**: 유스케이스, 포트, 애플리케이션 서비스
- **어댑터 레이어**: 외부 통신을 위한 인터페이스 어댑터
- **인프라 레이어**: DI 및 트랜잭션을 포함한 기술적 구현

### 주요 기술 구현

#### 의존성 주입 (DI)

- `tsyringe`를 활용한 의존성 주입
- `infra/di`에서 중앙 집중식 컨테이너 설정
- 데코레이터 기반 주입 패턴

#### 트랜잭션 관리

- `AsyncLocalStorage`를 사용한 커스텀 구현
- 데이터베이스 작업을 위한 트랜잭션 컨텍스트 관리
- 데코레이터 기반 트랜잭션 경계 설정

## 현재 개발 상태

프로젝트는 현재 다음과 같은 개발 상태입니다:

- ✅ 백엔드 CRUD 작업 구현 완료
- ✅ 기본 인증 설정 완료
- ✅ 인프라 및 아키텍처 기반 구축
- 🚧 프론트엔드 구현 (진행 중)
- 🚧 AI 통합 (계획됨)

## 시작하기

개발 서버 실행:

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 결과를 확인할 수 있습니다.

## 개발 가이드라인

### 백엔드 개발

- 헥사고날 아키텍처 원칙 준수
- 새로운 기능은 포트와 어댑터 패턴 사용
- 적절한 트랜잭션 경계 구현
- 유스케이스에 대한 단위 테스트 작성

### 프론트엔드 개발

- FSD 방법론에 따른 기능 구현
- 레이어 간 적절한 격리 유지
- 디자인 시스템의 공유 UI 컴포넌트 활용
- 적절한 상태 관리 구현

## 더 알아보기

사용된 기술에 대해 자세히 알아보기:

- [Next.js 문서](https://nextjs.org/docs)
- [Feature Sliced Design](https://feature-sliced.design/)
- [헥사고날 아키텍처](https://alistair.cockburn.us/hexagonal-architecture/)
- [Prisma 문서](https://www.prisma.io/docs/)
