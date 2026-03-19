# Estrategia de Automatización

## 1. Alcance

**Incluye:**
- Autenticación de usuarios
- Gestión del carrito de compras
- Proceso de checkout completo

**Excluye:**
- Pruebas de performance
- Pruebas de seguridad
- Testing responsive mobile

## 2. Tecnologías Seleccionadas

### Playwright
**Razones:**
- Auto-wait automático (menos tests flaky)
- Rápida ejecución
- Excelentes herramientas de debug

### Cucumber
**Razones:**
- Sintaxis Gherkin legible para stakeholders
- Documentación viva
- Separación entre lógica de negocio y técnica

### TypeScript
**Razones:**
- Detección de errores en desarrollo
- Mejor autocompletado en IDE
- Código más mantenible

## 3. Patrones de Diseño

### Page Object Model (POM)
Encapsula elementos y acciones por página:
```typescript
export class LoginPage {
  readonly usernameInput: Locator;
  
  async login(username: string, password: string) {
    // Lógica centralizada
  }
}
```

**Beneficios:**
- Cambios en UI solo afectan un archivo
- Reutilización de código
- Tests más legibles

### Cucumber World
Comparte contexto (browser, page) entre steps sin variables globales.

## 4. Estrategia de Testing

### Priorización por Riesgo

| Prioridad | Escenario | Justificación |
|-----------|-----------|---------------|
| **Crítica** | Login exitoso | Sin login no hay acceso |
| **Crítica** | Completar compra | Objetivo principal del negocio |
| **Alta** | Agregar al carrito | Paso previo a compra |
| **Media** | Remover del carrito | Funcionalidad secundaria |

### Datos de Prueba
- Hard-coded en feature files
- Usuarios dedicados de test
- Futuro: archivos JSON externos

## 5. Ejecución

**Actual:**
- Secuencial (workers: 1)
- Headless por defecto
- ~13 segundos para 10 scenarios

**Futuro:**
- Ejecución paralela cuando crezca la suite
- Integración con CI/CD (GitHub Actions, Jenkins)

## 6. Reportes y Observabilidad

**Generados:**
- Reporte HTML de Cucumber (legible)
- Reporte JSON (para CI/CD)
- Screenshots automáticos en fallos

**Ubicación:**
```
reports/cucumber-report.html
screenshots/failed-*.png
```

## 7. Mantenibilidad

**Prácticas aplicadas:**
- TypeScript para type safety
- Configuración externa (.env)
- Estructura modular clara
- Commits descriptivos

**Facilita:**
- Debugging rápido
- Onboarding de nuevos QAs
- Escalamiento del framework

## 8. Mejoras Futuras

**Corto plazo:**
- [ ] Testing cross-browser (Firefox, Safari)
- [ ] Visual regression testing
- [ ] Tests de API

**Mediano plazo:**
- [ ] CI/CD pipeline completo
- [ ] Integración con Allure Reports
- [ ] Testing de accesibilidad

## 9. Métricas

**Cobertura actual:**
- ✅ 100% de flujos críticos
- ✅ 10 scenarios automatizados
- ✅ 3 tipos de usuario diferentes

**Tiempo de ejecución:**
- Headless: ~11 segundos
- Headed: ~13 segundos

## 10. Conclusión

Framework robusto y escalable que:
- ✅ Cubre todos los flujos críticos
- ✅ Es fácil de mantener (POM, TypeScript)
- ✅ Genera reportes claros
- ✅ Está listo para CI/CD

**Próximo paso:** Integrar con pipeline de deployment para testing continuo.

---

**Autor:** Enrique Castro  
**Fecha:** Marzo 2026  
**Versión:** 1.0