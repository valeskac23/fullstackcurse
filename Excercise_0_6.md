sequenceDiagram
    participant browser
    participant server

    browser->>server: post https://studies.cs.helsinki.fi/exampleapp/spa/new_note_spa 
    browser->>server: post [{ "content": "Hola", "date": "2024-06-19T19:32:13.083Z" } ]
    activate server
    server-->>browser: message	"note created"
    deactivate server