/**
 * Пример отладки асинхронного кода
 * */

(async function () {
  const GROSS_SALARY = 4500

  try {
    const netSalary = await getNetSalary(GROSS_SALARY)

    console.log("Зарплата после налогов: ", netSalary);
  } catch (error) {
    console.warn("Ошибка при вычислении зарплаты после налогов: ", error);
  }
}())

/**
 * @param {number} salaryGross
 * @returns {Promise<*>}
 */
async function getNetSalary (salaryGross) {
  const taxValueRealResult = await getTaxValueReal('AB')

  if (!taxValueRealResult.error) {
    /**
     * Для удобной отладки и возможности поставить точку останова
     * @type {number}
     */
    const netSalary = salaryGross - (salaryGross * (taxValueRealResult.data / 100))

    return netSalary
  } else {
    return Promise.reject(taxValueRealResult.error)
  }
}

/**
 * @param {string} countryCode
 * @returns {Promise<{data: number, error: null} | {data: null, error: object}>}
 */
async function  getTaxValueReal (countryCode) {
  return fetch('./countries-taxes.json')
    .then(response => response.json())
    .then((data) => {
      /**
       * Для удобной отладки и возможности поставить точку останова
       * @type {{data: number, error: null}}
       */
      const taxValueRealResult = {
        data: data[countryCode],
        error: null
      }

      return taxValueRealResult
    })
    .catch(error => {
      return {
        data: null,
        error
      }
    })
}
