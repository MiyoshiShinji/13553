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
    // 職種 + メリット（複数）
    // =========================
    let skValues = [];

    // 職種（select）
    form.querySelectorAll('select[name="job"]').forEach(select => {
      if (select.value) {
        skValues.push(select.value);
      }
    });

    // メリット（checkbox → sk）
    form
      .querySelectorAll('input[type="checkbox"][name="merit"]:checked')
      .forEach(cb => {
        skValues.push(cb.value);
      });

    // ★ 重要：スペース区切り → %20
    const skParam = skValues.length
      ? 'sk=' + encodeURIComponent(skValues.join(' '))
      : '';

    // =========================
    // SEARCH TAG (st)
    // フリーワード（単数）
    // =========================
    let stParam = '';

    const freewordInput = form.querySelector('input[name="search_keyword"]');
    if (freewordInput && freewordInput.value.trim() !== '') {
      stParam = 'st=' + encodeURIComponent(freewordInput.value.trim());
    }

    // =========================
    // QUERY STRING
    // =========================
    let queryParams = [];
    if (skParam) queryParams.push(skParam);
    if (stParam) queryParams.push(stParam);

    const queryString = queryParams.length
      ? '?' + queryParams.join('&')
      : '';

    // =========================
    // FINAL URL
    // =========================
    const finalUrl =
      `https://hitomgr.jp/${DB}/${COMPANY}/${device}/list/all/${area}/${prefecture}${queryString}`;

    // =========================
    // REDIRECT
    // =========================
    window.open(finalUrl, '_blank');
  });
}

$(document).ready(function () {
  hitomgr();
});
