import { el, setChildren } from "redom";

export function createAccountSkeleton() {
  const section = el("section.container.skeleton-section");
  const container = el("div.row.g-5");
  for (let i = 0; i < 9; i++) {
    const elem = el("div.skeleton-card skeleton col-sm-4");
    elem.innerHTML = `
    <div class="skeleton-text skeleton"></div>
    <div class="skeleton-text skeleton"></div>
    <div class="skeleton-btn skeleton"></div>`;

    container.append(elem);
  }
  section.append(container);

  showSkeleton(section);

  return section;
}

export function showSkeleton(section) {
  section.classList.add("show");
}

export function hideSkeleton(section) {
  if (section == null) return;
  section.remove();
}

export function createOneAccountSkeleton() {
  const section = el("section.container.skeleton-section");
  const container = el("div.row.g-5");
  const colRight = el("div.col-6");
  const colLeft = el("div.col-6");
  const colBottom = el("div.col-12");

  colLeft.innerHTML = `<div class="skeleton-account skeleton">
  <div class="skeleton-form skeleton-account-form skeleton">
    <div class="skeleton-text skeleton"></div>
    <div class="skeleton-text skeleton"></div>
    <div class="skeleton-block skeleton"></div>
  </div>`;
  colRight.innerHTML = ` <div class="skeleton-chart skeleton">
  <div class="skeleton-text skeleton"></div>
  <div class="skeleton-block skeleton"></div>
</div>`;
  colBottom.innerHTML = `<div class="skeleton-table skeleton">
<div class="skeleton-text skeleton"></div>
<div class="skeleton-block skeleton"></div>
</div>`;

  setChildren(container, [colLeft, colRight, colBottom]);
  setChildren(section, container);
  showSkeleton(section);

  return section;
}

export function createHistorySkeleton() {
  const section = el("section.container.skeleton-section");
  const container = el("div.row");
  const colTop = el("div.col-12");
  const colMiddle = el("div.col-12");
  const colBottom = el("div.col-12");

  colTop.innerHTML = `<div class="skeleton-chart--size skeleton mb-5">
  <div class="skeleton-text skeleton"></div>
  <div class="skeleton-block skeleton"></div>
</div>`;

  colMiddle.innerHTML = `<div class="skeleton-chart--size skeleton mb-5">
<div class="skeleton-text skeleton"></div>
<div class="skeleton-block skeleton"></div>
</div>`;

  colBottom.innerHTML = `<div class="skeleton-table skeleton">
<div class="skeleton-text skeleton"></div>
<div class="skeleton-block skeleton"></div>
</div>`;

  setChildren(container, [colTop, colMiddle, colBottom]);
  setChildren(section, container);
  showSkeleton(section);

  return section;
}

export function createExchangeSkeleton() {
  const section = el("section.container.skeleton-section");
  const title = el("div.skeleton-text.skeleton.mb-5");

  const container = el("div.row");
  const colLeft = el("div.col-5.me-5");
  const colRight = el("div.col-6");

  colLeft.innerHTML = `
  <div class="skeleton-chart skeleton mb-4">
    <div class="skeleton-text skeleton"></div>
    <div class="skeleton-block skeleton"></div>
  </div>
  <div class="skeleton-form skeleton">
  <div class="skeleton-text skeleton"></div>
  <div class="skeleton-text skeleton"></div>
  <div class="skeleton-block skeleton"></div>
</div>`;

  colRight.innerHTML = ` <div class="skeleton-table skeleton-table-history skeleton">
  <div class="skeleton-text skeleton"></div>
  <div class="skeleton-block skeleton"></div>
</div>`;

  setChildren(container, [colLeft, colRight]);
  setChildren(section, [title, container]);

  showSkeleton(section);

  return section;
}
