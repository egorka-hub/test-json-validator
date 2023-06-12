import {describe, test, vi, afterEach, vitest} from 'vitest'
import {logSafelyJson} from "./logSafelyJson.ts";
import ls from "../utils/localStorage.ts";

describe('logSafelyJson', () => {
  const setErrorFn = vi.fn()
  const consoleFn  = vi.spyOn(console, 'log')
  const lsClearFn = vi.spyOn(ls, 'clear')
  const lsSetFn = vi.spyOn(ls, 'set')

  afterEach(() => {
    vitest.clearAllMocks();
  })

  afterAll(() => {
    vitest.clearAllMocks();
    vitest.resetAllMocks();
    vitest.restoreAllMocks();
  })


  test('Если нет ошибки и валидный json', () => {
    logSafelyJson('{"a": "test"}' , setErrorFn)
    expect(setErrorFn).not.toBeCalled()
    expect(consoleFn).toBeCalledTimes(1)
    expect(lsSetFn).toBeCalledTimes(1)
    expect(lsClearFn).not.toBeCalled()
  })

  test('Если есть ошибка и валидный json', () => {
    logSafelyJson('{"a": "test"}' , setErrorFn, true)
    expect(setErrorFn).toBeCalledWith(false)
    expect(consoleFn).toBeCalledTimes(1)
    expect(lsSetFn).toBeCalledTimes(1)
    expect(lsClearFn).not.toBeCalled()
  })

  test('Невалидный json', () => {
    logSafelyJson('{"a": test}' , setErrorFn)
    expect(setErrorFn).toBeCalledWith(true)
    expect(consoleFn).not.toBeCalled()
    expect(lsSetFn).toBeCalledTimes(1)
    expect(lsClearFn).not.toBeCalled()
  })

  test('Пустая строка', () => {
    logSafelyJson('' , setErrorFn)
    expect(setErrorFn).toBeCalledWith(false)
    expect(lsClearFn).toBeCalledTimes(1)
    expect(lsSetFn).toBeCalledTimes(1)
    expect(consoleFn).not.toBeCalled()
  })
})
