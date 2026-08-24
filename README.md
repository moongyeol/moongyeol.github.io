# 문결 정신건강의학과 홈페이지

`moongyeol.github.io` 로 배포되는 정적 원페이지 웹사이트입니다.

## 구조

```
index.html          메인 페이지 (전체 섹션)
assets/css/style.css 스타일
assets/js/main.js    모바일 메뉴, 스크롤 효과
```

## 반영해야 할 실제 정보 (현재 placeholder)

- [ ] 대표전화 / tel: 링크 (`index.html` 내 `tel:0000000000`)
- [ ] 주소, 진료시간 (footer)
- [ ] 실제 예약 링크(네이버 예약 등)로 `#cta` 버튼 교체
- [ ] `.ph` 플레이스홀더 이미지들을 실제 사진으로 교체
  - 대표원장 사진 (`.ph-portrait`)
  - 검사 장비 사진 4장 (`.ph-square`: QEEG, HRV, 인지·주의력, 수면평가)
  - 치료실 사진 5장 (`.ph-wide`: 약물치료, Biofeedback, TMS, 이완·명상, Esketamine)
  - 공간 사진 5장 (`.ph-space`: Reception, Assessment Room, Biofeedback Room, TMS & Relaxation Room, Private Treatment Room)

이미지 교체 방법: 해당 `<div class="ph ...">` 를 `<img src="assets/img/파일명.jpg" alt="...">` 로 바꾸면 됩니다.

## 로컬 미리보기

`index.html` 파일을 브라우저로 열면 바로 확인 가능합니다.

## 배포

`main` 브랜치에 push하면 GitHub Pages(`https://moongyeol.github.io`)에 자동 반영됩니다.
