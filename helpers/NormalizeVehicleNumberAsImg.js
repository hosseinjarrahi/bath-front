export default function (v, type = 'iran', edit = false) {
  try {
    if (type === 'iran-regular') type = 'iran'

    if (type !== 'iran' && type !== 'afghan') {
      return `<span class="d-flex flex-row-reverse align-center"style="justify-content: flex-end">
      <span>
        ${v}
      </span>`
    }

    if (type === 'afghan') {
      return afghan(v, type, edit)
    }

    const st = converto(v.substring(2, v.length - 5))

    const ein = `<span style="height: 17px;margin-bottom: 3px; font-size: 14px; margin-right:3px; margin-left:4px">${st}</span>`

    return (
      `<span style="
background-image: url(/img/${pickImage(edit, st)});
    background-size: contain;
        padding-left: 15px;
    font-weight: bold;
    max-width: fit-content;
    font-size: 16px;
    padding-top: 9px;
    padding-bottom: 8px;
    padding-right: 30px;
    background-position: center;
    background-position-x: center;
    background-position-y: center;
    position: relative;
    min-width: 120px;
    " class="d-flex flex-row-reverse  align-center" style="justify-content: flex-end">
        <span style="margin-top: 2px;padding-right: 2px">
          ${v.substring(0, 2)}
        </span >` +
      ein +
      `<span style='padding-left: 2px; margin-top: 2px;'
        ">
        <span style="font-size: 14px;
    margin-top: 6px;
    right: 0px;
    top: 9px;
    width: 24px;
    position: absolute;
    text-align: center;">
        ${v.substring(v.length - 2, v.length)}
        </span>
        ${v.substring(v.length - 5, v.length - 2)}
        </span>
      </span>`
    )
  } catch (e) {}
}

export function converto(t) {
  switch (t) {
    case 'ein':
      return 'ع'
    case 'ta':
      return 'ط'
    case 'n':
      return 'ن'
    case 'alef':
      return 'الف'
    case 'v':
      return 'و'
    case 'sad':
      return 'ص'
    case 'q':
      return 'ق'
    case 'l':
      return 'ل'
    case 's':
      return 'س'
    case 'y':
      return 'ی'
    case 'h':
      return 'ه'
    case 'd':
      return 'د'
    case 'm':
      return 'م'
    case 'b':
      return 'ب'
    default:
      return t
  }
}

export function pickImage(edit, st) {
  if (edit) return 'pelakGreen.png'
  if (st === 'ع') return 'pelak.png'
  return 'pelakNormal.png'
}

export function afghan(v, type, edit) {
  let split = v.split(',')
  let get_city = getCity(split[0])
  let get_leter = getLeter(split[2])
  let image = '/img/afghan.png'
  if (edit) {
    image = '/img/afghanGreen.png'
  }
  let x = `<span style="
background-image: url(${image});
    background-size: contain;
    font-weight: bold;
    max-width: fit-content;
    font-size: 16px;
    padding-top: 12px;
    padding-bottom: 12px;
    background-position: center;
    background-position-x: center;
    background-position-y: center;
    position: relative;
    min-width: 120px;
    " class="d-flex flex-row-reverse  align-center" style="justify-content: flex-end">
        <span style="    left: 8px;
        position: absolute;
        justify-content: space-between;
        margin-top: 2px;
        padding-right: 2px;
        font-size: 10px;
        display: flex;
        flex-direction: column;
        height: 66%;
        text-align: center;">
        <span>${get_city[1]}</span>
        <span>${get_city[0]}</span>
        </span >
        <span style="display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center; margin-left: 13px;">
        <span>
       ${split[1]}
       </span>
       <span style="font-family: sans-serif;">
       ${split[1]}
       </span>
    </span>

    <span style="right: 10px;
    position: absolute;
    justify-content: space-between;
    margin-top: 2px;
    padding-right: 2px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    height: 57%;
    text-align: center;">
    <span>${get_leter[1]}</span>
    <span>${get_leter[0]}</span>
    </span >
        </span>
        </span>
     `
  return x
}

export function getCity(i) {
  switch (i) {
    case 'BDG':
      return ['BDG', 'بادغیس']
    case 'BAG':
      return ['BAG', 'بغلان']
    case 'LGM':
      return ['LGM', 'لغمان']
    case 'BLH':
      return ['BLH', 'بلخ']
    case 'LGR':
      return ['LGR', 'لوگر']
    case 'BAM':
      return ['BAM', 'بامیان']
    case 'NGR':
      return ['NGR', 'ننگرهار']
    case 'DYK':
      return ['DYK', 'دایکندی']
    case 'NRZ':
      return ['NRZ', 'نیمروز']
    case 'NUR':
      return ['NUR', 'نورستان']
    case 'FYB':
      return ['FYB', 'فریاب']
    case 'PAK':
      return ['PAK', 'پکتیا']
    case 'GAZ':
      return ['GAZ', 'غزنی']
    case 'GHR':
      return ['GHR', 'غور']
    case 'PJR':
      return ['PJR', 'پنجیشیر']
    case 'PRN':
      return ['PRN', 'پروان']
    case 'SAM':
      return ['SAM', 'سمنگان']
    case 'JZJ':
      return ['JZJ', 'جوزجان']
    case 'SRP':
      return ['SRP', 'سرپل']
    case 'ORZ':
      return ['ORZ', 'اروزگان']
    case 'KPS':
      return ['KPS', 'کپیسا']
    case 'WDK':
      return ['WDK', 'وردک']
    case 'PTA':
      return ['PTA', 'پکیتا']
    case 'BDN':
      return ['BDN', 'بدخشان']
    case 'KNR':
      return ['KNR', 'کونر']
    case 'ZBL':
      return ['ZBL', 'زابل']
    case 'NAZ':
      return ['NAZ', 'نیمروز']
    case 'KDR':
      return ['KDR', 'کندهار']
    case 'HRT':
      return ['HRT', 'هرات']
    case 'HEL':
      return ['HEL', 'هلمند']
    case 'KST':
      return ['KST', 'خوست']
    case 'KDZ':
      return ['KDZ', 'کندز']
    case 'FRH':
      return ['FRH', 'فراه']
    case 'TAK':
      return ['TAK', 'تخار']
    case 'LGH':
      return ['LGH', 'تخار']
    case 'KBL':
      return ['KBL', 'کابل']
    case 'LOG':
      return ['LOG', 'لوگر']
    default:
      return [i, '-']
  }
}

export function getLeter(i) {
  switch (i) {
    case 'L':
      return ['L', 'ل']
    default:
      return ['L', 'ل']
  }
}
