// ── TABS ──
function setTab(el) {
  const tab = el.dataset.tab;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('[data-section]').forEach(s => {
    s.style.display = (tab === 'all' || s.dataset.section === tab) ? '' : 'none';
  });
}

// ── ACCORDION ──
document.querySelectorAll('.acc-head').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const body = item.querySelector('.acc-body');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.acc-body').style.maxHeight = '0';
      i.querySelector('.acc-head').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ── DRAG SCROLL (desktop) ──
function makeDraggable(el) {
  let isDown = false, startX, scrollLeft;
  el.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
    e.stopPropagation();
  });
  el.addEventListener('mouseleave', () => isDown = false);
  el.addEventListener('mouseup', () => isDown = false);
  el.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    e.stopPropagation();
    el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX);
  });
}

document.querySelectorAll('.projects-scroll-wrap').forEach(makeDraggable);
document.querySelectorAll('.project-images').forEach(makeDraggable);
