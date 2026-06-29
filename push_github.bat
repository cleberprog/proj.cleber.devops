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

REM Verificar se há mudanças
echo.
echo 🔍 Verificando mudanças...
git status --porcelain > nul
if errorlevel 1 goto :push_only

REM Contar mudanças
for /f %%A in ('git diff --cached --name-only ^| find /c /v ""') do set staged=%%A
for /f %%A in ('git diff --name-only ^| find /c /v ""') do set unstaged=%%A

if "%staged%"=="0" if "%unstaged%"=="0" (
    echo ℹ️  Nenhuma mudança detectada
    echo.
    goto :push_only
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
    set message=chore: atualização de conteúdo e scripts
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

REM Remover arquivo de workflow do commit (requer permissão especial do token)
echo.
echo 🔧 Removendo arquivo de workflow (permissão especial necessária)...
git reset --soft HEAD~1
git reset HEAD .github/workflows/ci.yml 2>nul
git commit --amend -m "%message%" 2>nul

:push_only
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

REM Exibir últimos commits
echo 📊 Últimos commits:
git log --oneline -3
echo.

pause
exit /b 0
