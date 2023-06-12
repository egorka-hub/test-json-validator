import ls from "../utils/localStorage.ts";
import {LS_KEY} from "../consts.ts";

export function logSafelyJson(str: string, setError: (val: boolean) => void, error?: boolean): void {
  let parsedEl
  // Сохраняем любую строку
  ls.set(LS_KEY, str)

  if (error) {
    setError(false)
  }

  try {
    if (str !== '') {
      parsedEl = JSON.parse(str)
      console.log(parsedEl)
    } else {
      ls.clear()
      setError(false)
    }
  } catch (e) {
    setError(true)
  }
}
