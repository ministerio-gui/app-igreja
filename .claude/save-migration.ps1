# save-migration.ps1
# Lê o tool_input do Supabase MCP via stdin e salva DDL como migration
# Acionado por hook PostToolUse em mcp__supabase__execute_sql e apply_migration

$raw = $input | Out-String
if (-not $raw.Trim()) { exit 0 }

try {
    $json = $raw | ConvertFrom-Json
} catch {
    exit 0
}

# Extrai SQL dos campos possíveis dependendo da tool
$sql = if ($json.tool_input.query)    { $json.tool_input.query }
  elseif ($json.tool_input.sql)       { $json.tool_input.sql }
  elseif ($json.tool_input.migration) { $json.tool_input.migration }
  else                                { $null }

if (-not $sql) { exit 0 }

# Só salva se for DDL (CREATE, ALTER, DROP, etc.)
$isDDL = $sql -match '(?i)\b(CREATE|ALTER|DROP|TRUNCATE|RENAME|CREATE\s+OR\s+REPLACE)\b'
if (-not $isDDL) { exit 0 }

$migrationsDir = "C:\Users\PC Gamer\Desktop\Projetos-Reais\Igreja-missao\lideres-ad\supabase\migrations"

# Gera nome: YYYYMMDDHHMMSS_auto.sql
$timestamp = Get-Date -Format 'yyyyMMddHHmmss'
$filename  = "${timestamp}_auto.sql"
$filepath  = Join-Path $migrationsDir $filename

# Cabeçalho informativo no arquivo
$content = @"
-- Auto-gerado pelo hook save-migration
-- Data: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
-- Tool: $($json.tool_name)

$sql
"@

$content | Out-File -FilePath $filepath -Encoding utf8

# Retorna mensagem visível no Claude Code
@{ systemMessage = "Migration salva: $filename" } | ConvertTo-Json -Compress
