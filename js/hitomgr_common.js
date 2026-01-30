function hitomgr() {
  const form = document.querySelector('.search_form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // =========================
    // 基本設定
    // =========================
    const DB = 'dsaiyo';
    const COMPANY = 'm8ca';

    const device = window.innerWidth <= 768 ? 'sp_job' : 'pc_job';

    // =========================
    // エリアコード
    // =========================
    const prefectureSelect = form.querySelector('select[name="area"]');
    const prefecture = prefectureSelect?.value || 'all';

    const areaMap = {
      hokkaido: 'hkdo',
      aomori: 'toho',
      iwate: 'toho',
      miyagi: 'toho',
      akita: 'toho',
      yamagata: 'toho',
      fukushima: 'toho',
      ibaraki: 'knto',
      tochigi: 'knto',
      gunma: 'knto',
      saitama: 'knto',
      chiba: 'knto',
      tokyo: 'knto',
      kanagawa: 'knto',
      niigata: 'kosh',
      toyama: 'kosh',
      ishikawa: 'kosh',
      fukuiken: 'kosh',
      yamanashi: 'kosh',
      nagano: 'kosh',
      gifu: 'toki',
      shizuoka: 'toki',
      aichi: 'toki',
      mie: 'toki',
      shiga: 'kink',
      kyoto: 'kink',
      osaka: 'kink',
      hyogo: 'kink',
      nara: 'kink',
      wakayama: 'kink',
      tottori: 'cgsk',
      shimane: 'cgsk',
      okayama: 'cgsk',
      hiroshima: 'cgsk',
      yamaguchi: 'cgsk',
      tokushima: 'cgsk',
      kagawa: 'cgsk',
      ehime: 'cgsk',
      kochi: 'cgsk',
      fukuoka: 'kyuo',
      saga: 'kyuo',
      nagasaki: 'kyuo',
      kumamoto: 'kyuo',
      oita: 'kyuo',
      miyazaki: 'kyuo',
      kagoshima: 'kyuo',
      okinawa: 'kyuo'
    };

    const area = areaMap[prefecture] || 'all';

    // =========================
    // KEYWORDS (sk)
    // =========================
    let skValues = [];

    // select 職種
    form.querySelectorAll('select[name="job"]').forEach(select => {
      if (select.value) skValues.push(select.value);
    });

    // checkbox
    form.querySelectorAll('input[type="checkbox"][name="merit"]:checked')
      .forEach(cb => skValues.push(cb.value));

    // freeword
    const freewordInput = form.querySelector('input[name="search_keyword"]');
    if (freewordInput && freewordInput.value.trim() !== '') {
      skValues.push(freewordInput.value.trim());
    }

    const skParam = skValues.length
      ? '?sk=' + encodeURIComponent(skValues.join(','))
      : '';

    // =========================
    // FINAL URL
    // =========================
    const finalUrl =
      `https://hitomgr.jp/${DB}/${COMPANY}/${device}/list/all/${area}/${prefecture}${skParam}`;

    // =========================
    // REDIRECT
    // =========================
    window.open(finalUrl, '_blank');
    console.log(finalUrl);
  });
}

$(document).ready(function() {
  hitomgr();
});
