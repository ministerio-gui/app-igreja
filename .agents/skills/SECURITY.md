# SKILL — Segurança do Projeto
> Líderes AD · Regras de segurança inegociáveis
> Revisar antes de qualquer deploy

---

## 1. VARIÁVEIS DE AMBIENTE

```bash
# ✅ Sempre em .env.local — NUNCA no código
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

# ✅ .env.local no .gitignore (verificar sempre)
echo ".env.local" >> .gitignore

# ❌ NUNCA fazer isso
const supabase = createClient(
  'https://meuapp.supabase.co',  // ❌ hardcoded
  'eyJhbGci...'                   // ❌ hardcoded
)
```

---

## 2. SUPABASE — ROW LEVEL SECURITY (RLS)

**REGRA ABSOLUTA:** RLS habilitado em TODAS as tabelas. Sem exceção.

```sql
-- Verificar se RLS está ativo (rodar no Supabase SQL Editor)
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
-- Todas as linhas devem ter rowsecurity = TRUE

-- Template de política para tabelas que só líderes autenticados acessam
CREATE POLICY "authenticated_access" ON nome_da_tabela
  FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
```

### Políticas por tabela

```sql
-- profiles: usuário vê e edita apenas o próprio perfil
-- (admin vê todos — implementar via role check)
CREATE POLICY "profiles_select" ON profiles
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- events, notes, cantina_*: qualquer líder autenticado acessa tudo
-- (todos são colaboradores — sem restrição por ownership)
CREATE POLICY "lideres_full_access" ON events
  FOR ALL USING (auth.uid() IS NOT NULL);

-- absences: qualquer líder lê, mas só o criador ou admin deleta
CREATE POLICY "absences_select" ON absences
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "absences_insert" ON absences
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "absences_delete_own" ON absences
  FOR DELETE USING (
    auth.uid() = created_by OR
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

---

## 3. AUTENTICAÇÃO — BOAS PRÁTICAS

```typescript
// ✅ Sempre verificar sessão no cliente Supabase
const { data: { session } } = await supabase.auth.getSession()

// ✅ Listener para mudanças de auth state
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    // Limpar estado local, redirecionar para login
    queryClient.clear()
    navigate('/login')
  }
})

// ✅ Rotas protegidas no frontend
function RequireAuth({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth()
  
  if (loading) return <SplashScreen />
  if (!session) return <Navigate to="/login" replace />
  return <>{children}</>
}

// ❌ NUNCA armazenar senha em qualquer state ou localStorage
// ❌ NUNCA logar dados de sessão no console em produção
```

---

## 4. DADOS SENSÍVEIS NO FRONTEND

```typescript
// ✅ Nunca expor service_role key no frontend
// A anon key é pública por design — RLS protege os dados

// ✅ Sanitizar inputs antes de enviar ao Supabase
function sanitizeText(input: string): string {
  return input.trim().slice(0, 500) // limite de tamanho
}

// ✅ Validar tipos antes de inserir
if (typeof amount !== 'number' || amount <= 0 || amount > 999999) {
  throw new Error('Valor inválido')
}
```

---

## 5. DEPENDÊNCIAS

```bash
# ✅ Auditar regularmente
npm audit

# ✅ Manter dependências atualizadas
npm outdated

# ✅ Só instalar pacotes necessários — avaliar bundle size
# Verificar em: bundlephobia.com antes de adicionar qualquer lib

# ❌ Nunca instalar pacotes sem verificar:
# - Última atualização (< 1 ano desatualizado = cuidado)
# - Número de downloads semanais
# - Issues abertas de segurança
```

---

## 6. CHECKLIST PRÉ-DEPLOY

- [ ] Todas as tabelas têm RLS habilitado
- [ ] Políticas RLS testadas com usuário de teste
- [ ] `.env.local` NÃO está no repositório
- [ ] Nenhuma key/secret hardcoded no código
- [ ] `npm audit` sem vulnerabilidades críticas
- [ ] Console.logs de debug removidos
- [ ] Variáveis de ambiente configuradas no Vercel/Netlify
- [ ] URL do app adicionada em "Allowed Redirect URLs" no Supabase
- [ ] Auth email confirmação desabilitada (líderes por convite)

---

*SKILL Segurança — Líderes AD · Revisar antes de qualquer deploy em produção*
