@echo off
REM =============================================================================
REM Script para fazer commit e push no GitHub
REM Cleber Developer Portfolio - Atualizar Repositório
REM =============================================================================

color 0A
cls

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║         ATUALIZANDO REPOSITÓRIO NO GITHUB                      ║
echo ║     Cleber Developer Portfolio - Projeto Qlik & Talend         ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Verificar se está em um repositório Git
if not exist .git (
    color 0C
    echo ❌ ERRO: Este diretório não é um repositório Git!
    echo.
    echo Execute este script dentro da pasta do projeto.
    pause
    exit /b 1
)

REM Exibir status atual
echo 📁 Status do repositório:
echo.
git status
echo.

REM Perguntar se deseja continuar
set /p continue="Deseja fazer commit e push? (S/N): "
if /i not "%continue%"=="S" (
    echo.
    color 0E
    echo ⏸️  Operação cancelada pelo usuário.
    echo.
    pause
    exit /b 0
)

REM Fazer add de todos os arquivos
echo.
echo ⚙️  Fazendo staging dos arquivos...
git add .
echo ✅ Arquivos adicionados

REM Fazer commit
echo.
echo 📝 Criando commit...
set /p message="Escreva a mensagem do commit (ou pressione Enter para usar padrão): "

if "%message%"=="" (
    set message=refactor: remove card Qlik NPrinting dos Pilares de Atuação
)

git commit -m "%message%"

if errorlevel 1 (
    color 0C
    echo.
    echo ❌ ERRO ao fazer commit!
    echo.
    pause
    exit /b 1
)

REM Fazer push
echo.
echo 🚀 Enviando para GitHub (push)...
echo.
git push origin main

if errorlevel 1 (
    color 0C
    echo.
    echo ❌ ERRO ao fazer push!
    echo.
    echo Possíveis problemas:
    echo - Token expirado ou sem permissões
    echo - Problemas de conexão com internet
    echo - Conflitos no repositório
    echo.
    pause
    exit /b 1
)

REM Sucesso
color 0B
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                    ✅ SUCESSO!                                ║
echo ║         Alterações enviadas para GitHub com sucesso!          ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Exibir último commit
echo 📊 Último commit:
git log --oneline -1
echo.

pause
exit /b 0
