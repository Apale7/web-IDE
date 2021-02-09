function set(k: string, v: string) {
  localStorage.setItem(`web_ide_${k}`, v)
}

function get(k: string) {
  const v = localStorage.getItem(`web_ide_${k}`)
  if (!v)
    return ''
  return v
}

function storeLanguage(language: number) {
  set(`language`, `${language}`);
}

function getLanguage(): number {
  const l = get('language')
  if (l === '' || isNaN(Number(l)))
    return 0;
  return Number(l);
}

function storeCode(language: number, code: string) {
  set(String(language), code)
}

function getCode(language: number) {
  return get(String(language))
}


export {
  storeLanguage,
  getLanguage,
  storeCode,
  getCode
}