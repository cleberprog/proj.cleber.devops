@echo off
echo ====================================================
echo Iniciando Servidor de Teste Local...
echo ====================================================
echo.
echo O seu navegador deve abrir automaticamente em instantes.
echo Caso nao abra, acesse manualmente: http://localhost:8080
echo.
echo Para encerrar o servidor, feche esta janela ou aperte Ctrl+C.
echo.

:: Tenta abrir o navegador (ele vai carregar assim que o server subir)
start http://localhost:8080

:: Tenta usar Python primeiro (muito comum ter instalado)
python -m http.server 8080

:: Se Python falhar, tenta usar Node.js (npx)
if %errorlevel% neq 0 (
    echo Python nao encontrado. Tentando via Node.js (npx)...
    npx http-server -p 8080
)

pause
