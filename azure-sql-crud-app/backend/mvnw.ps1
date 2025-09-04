$ErrorActionPreference = 'Stop'

# The folder where this script lives
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectBaseDir = $ScriptDir

$WrapperDir  = Join-Path $ProjectBaseDir ".mvn\wrapper"
$WrapperJar  = Join-Path $WrapperDir "maven-wrapper.jar"
$WrapperUrl  = "https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.3.2/maven-wrapper-3.3.2.jar"
$WrapperMain = "org.apache.maven.wrapper.MavenWrapperMain"

# --- Find java.exe ---
$java = $null
if ($env:JAVA_HOME) {
    $javaCandidate = Join-Path $env:JAVA_HOME "bin\java.exe"
    if (Test-Path $javaCandidate) { $java = $javaCandidate }
}
if (-not $java) {
    $javaCandidate = Get-Command java -ErrorAction SilentlyContinue
    if ($javaCandidate) { $java = $javaCandidate.Source }
}
if (-not $java) { throw "JAVA_HOME is not set and no 'java' in PATH." }

# --- Ensure wrapper dir ---
New-Item -ItemType Directory -Force -Path $WrapperDir | Out-Null

# --- Download wrapper jar if missing ---
if (-not (Test-Path $WrapperJar)) {
    Write-Host "Downloading Maven Wrapper..."
    try {
        $ProgressPreference = 'SilentlyContinue'
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        Invoke-WebRequest -Uri $WrapperUrl -OutFile $WrapperJar
    } catch {
        (New-Object Net.WebClient).DownloadFile($WrapperUrl, $WrapperJar)
    }
    if (-not (Test-Path $WrapperJar)) { throw "Failed to download $WrapperJar" }
}

# --- Run wrapper ---
& $java "-Dmaven.multiModuleProjectDirectory=$ProjectBaseDir" "-cp" "$WrapperJar" $WrapperMain @args
