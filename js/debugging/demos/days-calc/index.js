// Демо

let name = 'John'

// @TODO: сделать показ дебагера по условию через if
// debugger

console.log(name)

// Пример 1
/**
* Синхронный код
* Несколько функций, одна передается в другую в качестве коллбека
* складывать числа, ошибка в приведении типов
*
* @param taxInPercent
* @returns {function(*): *}
* */
function configureNetSalaryCalculator (taxInPercent) {
  return function (salary) {
    return salary - (salary * (taxInPercent / 100))
  }
}

const netSalaryCalculator = configureNetSalaryCalculator(35)
const netSalary = netSalaryCalculator('4545,80')

console.log('netSalary: ', netSalary) // NaN

// Пример 2

/**
 * Асинхронный код
 * @param countryCode
 * @returns {Promise<unknown>}
 */
const requestTaxesByCountyMock = (countryCode) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (countryCode) {
        case 'AB':
          resolve(5)
          break
        case 'CD':
          resolve(15)
          break
        case 'REJECT':
          reject('Country Code error')
          break
        default:
          resolve(35)
      }
    }, 3000)
  })
}

const taxValue = requestTaxesByCountyMock('AB')
  .then((res) => {
    console.log("res: ", res); // eslint-disable-line
  })
  .catch(err => {
    console.log("err: ", err); // eslint-disable-line
  })

const getRaxValueReal = (countryCode) => fetch('./countries-taxes.json').then(response => response.json())
  .then((res) => {
    console.log("res: ", res[countryCode]); // eslint-disable-line
  })
  .catch(err => {
    console.log("err: ", err); // eslint-disable-line
  })

const getNetSalary = async (salaryGross) => {
  const taxValueReal = await getRaxValueReal('AB')

  const netSalaryCalculator = configureNetSalaryCalculator(taxValueReal)
  const netSalary = netSalaryCalculator(salaryGross)

  return netSalary
}


(async function () {
  const netSalaryAsync = await getNetSalary(4500)

  console.log("netSalaryAsync: ", netSalaryAsync); // eslint-disable-line
} ())
