@echo off
REM =============================================================================
REM Script para fazer push no GitHub - VERSÃO FINAL CORRIGIDA
REM Remove arquivo .github/workflows/ci.yml antes de fazer push
REM =============================================================================

setlocal enabledelayedexpansion
color 0A
cls

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║         ATUALIZANDO REPOSITÓRIO NO GITHUB                      ║
echo ║     Cleber Developer Portfolio - Projeto Qlik & Talend         ║
echo ║                 VERSÃO CORRIGIDA                              ║
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

echo.
echo ℹ️  Preparando repositório para push...

REM Limpar staged files com arquivo de workflow problemático
git reset HEAD .github/ 2>nul

REM Restaurar arquivo de workflow para evitar inclusão
git checkout -- .github/workflows/ci.yml 2>nul

REM Stage apenas arquivos sem o workflow
echo.
echo ⚙️  Adicionando arquivos (excluindo workflow)...
git add .

REM Remover workflow do staging novamente
git reset HEAD .github/workflows/ 2>nul

REM Verificar se há mudanças para commitar
for /f %%A in ('git diff --cached --name-only 2^>nul ^| find /c /v ""') do (
    set "staged=%%A"
)

if "%staged%"=="0" (
    echo ℹ️  Nenhuma mudança nova para commit
) else (
    echo.
    echo 📝 Criando commit...
    set /p message="Escreva a mensagem do commit (ou pressione Enter para pular): "
    
    if not "!message!"=="" (
        git commit -m "!message!"
        if errorlevel 1 (
            echo ⚠️  Erro ao criar commit
        ) else (
            echo ✅ Commit criado
        )
    ) else (
        echo ⏭️  Pulando commit, enviando commits pendentes...
    )
)

echo.
echo 🚀 Enviando para GitHub (push)...
echo.

REM Fazer push
git push origin main 2>&1

if errorlevel 1 (
    color 0C
    echo.
    echo ❌ ERRO ao fazer push!
    echo.
    echo SOLUÇÃO: Gere um novo token com permissão 'workflow':
    echo https://github.com/settings/tokens/new
    echo.
    echo Depois reconfigure seu Git com:
    echo git config --global credential.helper wincred
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
echo 📊 Status final:
git log --oneline -1
echo.
git status
echo.

pause
exit /b 0
