@echo off
setlocal

set "MAVEN_PROJECTBASEDIR=%~dp0"
set "WRAPPER_DIR=%MAVEN_PROJECTBASEDIR%.mvn\wrapper"
set "WRAPPER_JAR=%WRAPPER_DIR%\maven-wrapper.jar"
set "WRAPPER_MAIN=org.apache.maven.wrapper.MavenWrapperMain"
set "WRAPPER_URL=https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.3.2/maven-wrapper-3.3.2.jar"

if defined JAVA_HOME (
  set "JAVA_EXE=%JAVA_HOME%\bin\java.exe"
) else (
  for %%i in (java.exe) do set "JAVA_EXE=%%~$PATH:i"
)
if not exist "%JAVA_EXE%" (
  echo JAVA_HOME is not set and no java executable found in PATH.
  exit /b 1
)

if not exist "%WRAPPER_DIR%" mkdir "%WRAPPER_DIR%"

if not exist "%WRAPPER_JAR%" (
  echo Downloading Maven Wrapper...
  where curl >NUL 2>&1
  if "%ERRORLEVEL%"=="0" (
    curl -L -o "%WRAPPER_JAR%" "%WRAPPER_URL%"
  ) else (
    powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -Command ^
      "$ProgressPreference='SilentlyContinue';" ^
      "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12;" ^
      "(New-Object Net.WebClient).DownloadFile('%WRAPPER_URL%','%WRAPPER_JAR%')"
  )
  if not exist "%WRAPPER_JAR%" (
    echo Failed to download %WRAPPER_JAR%
    exit /b 1
  )
)

"%JAVA_EXE%" -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR%" -cp "%WRAPPER_JAR%" %WRAPPER_MAIN% %*
endlocal
