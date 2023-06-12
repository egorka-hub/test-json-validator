import React, {useCallback, useEffect, useState} from "react";
import { Input, Row, Col, Alert } from 'antd';
import {logSafelyJson} from "./services/logSafelyJson";
import ls from './utils/localStorage'
import {LS_KEY} from './consts'

import './App.css'

function App() {
  const { TextArea } = Input;
  const lsValue = ls.get(LS_KEY)
  // const initialQuery = lsValue ? JSON.stringify(lsValue) : ""

  const [isError, setIsError] = useState<boolean>(false)
  const [query, setQuery] = useState<string>(lsValue || '')

  useEffect(() => {
    logSafelyJson(query, setIsError, isError)
  }, [query, setIsError, isError])

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const str = e.target?.value
    setQuery(str)
  }, [setQuery])

  return (
    <>
      <Row justify='center'>
        <Col span={24}>
          <TextArea
            onChange={handleOnChange}
            rows={16}
            value={query}
            placeholder="Введи строку в JSON формате"
            status={isError ? "error" : ""}
            showCount
          />
        </Col>
      </Row>
      {isError &&
        <Row style={{marginTop: 24}} justify='center'>
            <Alert message="Ошибка! Неверный формат JSON." type="error" banner />
        </Row>
      }
    </>
  )
}

export default App
