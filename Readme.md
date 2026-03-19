# Sauce Demo - Automated Testing Suite

Pruebas automatizadas para [Sauce Demo](https://www.saucedemo.com/) con **Playwright** y **Cucumber**.

## 🛠️ Tecnologías

- **Playwright** - Automatización de navegador
- **Cucumber** - Framework BDD con Gherkin
- **TypeScript** - Tipado estático
- **Page Object Model** - Patrón de diseño

## 🚀 Instalación
```bash
# Clonar repositorio
git clone https://github.com/Papit4/InetumFrom-CastroPerez.git
cd InetumFrom-CastroPerez

# Instalar dependencias
npm install

# Instalar navegador
npx playwright install chromium
```

## ▶️ Ejecutar Tests
```bash
# Modo headless
npm test

# Ver navegador
npm run test:headed

# Generar reporte HTML
npm run test:report
```

## ⚙️ Configuración

El archivo `.env` contiene la configuración:
```env
BASE_URL=https://www.saucedemo.com
HEADLESS=true
TIMEOUT=30000
```

## 📝 Escenarios de Prueba

### Login
- ✅ Login exitoso con credenciales válidas
- ✅ Login fallido con usuario bloqueado
- ✅ Login fallido con credenciales inválidas

### Carrito de Compras
- ✅ Agregar productos al carrito
- ✅ Ver productos en el carrito
- ✅ Eliminar productos del carrito

### Checkout
- ✅ Completar compra con información válida
- ✅ Validación de campos requeridos
- ✅ Verificar resumen del pedido

## 🏗️ Estructura del Proyecto
```
src/
├── features/       # Archivos .feature con Gherkin
├── pages/          # Page Object Model
├── steps/          # Step definitions
├── support/        # Hooks y configuración
└── config/         # Variables de entorno
```

## 🎯 Patrones de Diseño

- **Page Object Model**: Encapsula elementos y acciones de cada página
- **Cucumber World**: Comparte contexto entre steps
- **Hooks**: Gestiona ciclo de vida del navegador

## 📊 Reportes

Después de ejecutar `npm run test:report`:
```bash
# Windows
start reports/cucumber-report.html
```

Los screenshots de fallos se guardan en `screenshots/`

## 🧪 Credenciales de Prueba

| Usuario | Password |
|---------|----------|
| `standard_user` | `secret_sauce` |
| `locked_out_user` | `secret_sauce` |

## 👤 Autor

**Enrique Castro**  
GitHub: [@Papit4](https://github.com/Papit4)