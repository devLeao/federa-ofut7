export type AtletaCarteirinha = {
  nome: string
  rg: string
  cpf: string
  dataNascimento: string // yyyy-mm-dd
  registro: number | null
}

export function onlyDigits(value: string) {
  return value.replace(/\D/g, '')
}

// 53498739620 -> 534.987.396-20 (aplica a máscara enquanto digita)
export function formatCpf(value: string) {
  const d = onlyDigits(value).slice(0, 11)
  return d
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2')
}

export function isValidCpf(value: string) {
  const cpf = onlyDigits(value)
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

  const digito = (base: string) => {
    let soma = 0
    for (let i = 0; i < base.length; i++) soma += Number(base[i]) * (base.length + 1 - i)
    const resto = (soma * 10) % 11
    return resto === 10 ? 0 : resto
  }

  return digito(cpf.slice(0, 9)) === Number(cpf[9]) && digito(cpf.slice(0, 10)) === Number(cpf[10])
}

// 1 -> 000001
export function formatRegistro(registro: number | null) {
  return registro ? String(registro).padStart(6, '0') : '------'
}

// 1963-12-27 -> 27/12/1963
export function formatData(iso: string) {
  if (!iso) return ''
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}
