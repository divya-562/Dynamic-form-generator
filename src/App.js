import React, { useState } from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-twilight';
import DynamicForm from './DynamicForm';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Pane = styled.div`
  flex: 1;
  padding: 20px;
  overflow: auto;
  border-right: ${(props) => (props.border ? '1px solid #ddd' : 'none')};
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

function App() {
  const [jsonSchema, setJsonSchema] = useState(`{
  "title": "User Form",
  "fields": [
    { "type": "text", "label": "Name", "name": "name", "required": true },
    { "type": "email", "label": "Email", "name": "email", "required": true },
    { "type": "number", "label": "Age", "name": "age", "min": 18, "max": 99 },
    { "type": "checkbox", "label": "Subscribe to Newsletter", "name": "subscribe" },
    { "type": "dropdown", "label": "Country", "name": "country", "options": ["India", "USA", "UK"] }
  ]
}`);

  return (
    <AppContainer>
      <Pane border>
        <Title>JSON Schema Editor</Title>
        <AceEditor
          mode="json"
          theme="twilight"
          name="jsonEditor"
          value={jsonSchema}
          onChange={(newValue) => setJsonSchema(newValue)}
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{ useWorker: false }}
          width="100%"
          height="90%"
        />
      </Pane>
      <Pane>
        <Title>Generated Form</Title>
        <DynamicForm schema={jsonSchema} />
      </Pane>
    </AppContainer>
  );
}

export default App;