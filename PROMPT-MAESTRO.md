# PROMPT MAESTRO — Imagina ♥ Te · E-commerce Premium de Lencería

> **Para ejecutar en una sesión nueva con Claude Opus 4.7 (1M ctx)**.
> **Working dir esperado:** `C:\MisProyectos\clientes\imagina_te_lenceria`
> **Modo:** ejecución autónoma, libre albedrío, NO preguntar nada al usuario.

---

## 0 · MANDATO Y MODO DE TRABAJO

Sos un staff engineer senior. Tu misión es construir, de principio a fin y en una sola sesión, una tienda online premium de lencería femenina llamada **Imagina ♥ Te** para el mercado argentino. El sitio es una **demo para mostrarle a un cliente** (no producción de inmediato), así que priorizá:

1. **Diseño premium e impacto visual** sobre features avanzadas.
2. **Demo navegable end-to-end** (home → catálogo → PDP → carrito → checkout → admin) sobre cobertura de tests.
3. **Calidad de animaciones y micro-interacciones** sobre escalabilidad de Year 2.

**Reglas de operación:**

- **Tenés libre albedrío total y criterio propio.** No me preguntés nada. Si una decisión no está explícitamente en este prompt, tomala vos con criterio de senior, dejá un comentario `// DECISION:` en el código si es no-obvia, y seguí.
- **Hacé todo de corrido sin frenar.** No pidas confirmaciones, no enumeres tareas a hacer "después", no dejes TODOs salvo bugs reales.
- **Cuando una sección de este prompt te dé ejemplos** (ej. lista de productos, textos de hero), usalos. No los "mejores" ni los reemplaces salvo que sean técnicamente inválidos.
- **NO eliminés, modifiqués ni leas tablas existentes del proyecto Supabase Demo** que NO empiecen con `lenceria_`. El proyecto está compartido con otros sistemas. Tu universo de datos es exclusivamente las tablas con prefijo `lenceria_`.
- **NO commitees ni hagas push.** El usuario revisa primero. Pero sí podés `git init` si querés versionar localmente.
- **NO instales paquetes que no estén en este prompt** salvo que un build error lo exija. Si pasa, instalá lo mínimo y seguí.
- **NO uses dependencias deprecadas o pesadas** (jQuery, moment, Material UI).
- **Idioma**: TODO el contenido visible en pantalla en **español rioplatense** (argentino, vos no tú, "podés" no "puedes"). Comentarios en código y commits en español también.

**Cuando termines**, dejá un `RESUMEN-EJECUCION.md` en la raíz con: qué quedó hecho, qué desviaciones tomaste vs este prompt y por qué, cómo correr el proyecto (`npm install && npm run dev`), credenciales de admin que creaste, URL del Supabase Demo, screenshots-text-descriptions de las páginas clave.

---

## 1 · CONTEXTO DEL NEGOCIO

**Marca:** Imagina ♥ Te (estilizado con corazón entre las palabras)
**Tagline original:** "Renueva tu interior" (de la tarjeta de presentación física que existe)
**Ubicación física real:** Bynnon 3623 esq. Martín Arín. Tel: 2067-6665. Cel: 15 6175 5668 (Valeria). Instagram: @lenceria_imaginate

**Audiencia primaria:**
- Mujer argentina 22-55 años
- Comprando para sí misma (autocomplacencia, autoestima) Y para regalar
- Sensibilidad estética media-alta: aprecia lo bonito, no es de masa
- Mobile-first: 70%+ del tráfico será iPhone/Android
- Compra con Mercado Pago, valora la discreción del envío

**Posicionamiento:** "Lujo accesible y femenino, sensualidad sin caer en hipersexualización, empoderamiento del cuerpo real."

**Tono editorial:**
- Cálido, íntimo, cómplice (no porno ni medico)
- Sensorial ("seda fría contra la piel", "el roce del encaje francés")
- Empoderamiento sutil ("para vos, primero")
- NO usar emojis en el copy del sitio (sí ♥ como símbolo de marca)
- NO usar "señoras", "damas", lenguaje envejecido
- SÍ usar "vos", "tu", "imagina te" como mantra

**Competencia local que querés superar:**
- Selú, Promesse, Sweet Lady, Caro Cuore (argentinas masivas)
- Tu diferencial: diseño premium tipo Honey Birdette / Fleur du Mal pero hablado en porteño.

---

## 2 · PROYECTO DE REFERENCIA (DE DONDE COPIAR Y APRENDER)

**Path:** `C:\MisProyectos\demos\e-commerce_mujer`
**Nombre original:** "Maison Élara"
**Es un proyecto Next.js 14 + Supabase + Tailwind + Framer Motion + Zustand que YO (Manuel) hice antes para ropa femenina de lujo.**

### 2.1 — Lo que SÍ tenés que copiar (con adaptaciones)

| Qué | Archivo origen | Adaptación |
|---|---|---|
| **Animación bolita al carrito** | `src/lib/store/cart-animation.ts` + `src/components/store/CartFlyEffect.tsx` | Copiar tal cual. Color de la bolita puede quedar champagne (`#c9a96e`) o cambiarlo a rosa polvo si combina mejor con la paleta final. |
| **Carrito Zustand persistente** | `src/lib/store/cart.ts` | Copiar tal cual |
| **ProductCard hover crossfade** | `src/components/store/ProductCard.tsx` | Copiar; ajustar a la nueva paleta y agregar badge "NEW" en dorado |
| **Supabase SSR setup (3 clients)** | `src/lib/supabase/{client,server,admin}.ts` | Copiar tal cual; cambiar env vars al proyecto Demo |
| **Site config con React cache** | `src/lib/site-config.ts` + `site-config-context.tsx` | Copiar; adaptar a `lenceria_site_settings` |
| **ProductForm admin completo** | `src/components/admin/ProductForm.tsx` | Copiar; agregar campos específicos de lencería (talla copa, sostén push-up sí/no, etc. si tiene sentido) |
| **Esquema route groups** | `src/app/(store)/...` + `src/app/admin/...` + `src/app/auth/...` | Copiar la organización |
| **Tailwind config con tokens** | `tailwind.config.ts` | Como base; cambiar paleta y keyframes |
| **Skeleton loaders** | `src/components/ui/Skeleton.tsx` + `loading.tsx` por ruta | Copiar patrón |
| **Order number trigger** (ME-00001) | `supabase-schema.sql:122-136` | Adaptar a `IT-00001` (Imagina Te) |
| **Drag-drop inventory** | `src/components/admin/AdminInventory.tsx` + `@dnd-kit` | Copiar tal cual |
| **Stats cards + Recharts dashboard** | `src/app/admin/page.tsx` + `RevenueChart.tsx` + `OrdersDonut.tsx` + `TopProducts.tsx` | Copiar |
| **CartDrawer side panel** | `src/components/store/CartDrawer.tsx` | Copiar |
| **CheckoutPage layout** | `src/components/store/CheckoutPage.tsx` | Copiar; agregar campos AR (DNI, CP argentino), método de pago Mercado Pago (UI placeholder) |
| **Cliente SSR + Server Action upsert producto** | `src/app/admin/products/actions.ts` | Copiar |

### 2.2 — Lo que NO copies (problemas conocidos del demo)

- ❌ **NO** copies el `next.config.js` tal cual; revisalo. El demo tiene `recharts` importado pero faltante de `package.json` — **agregalo vos** desde el inicio.
- ❌ **NO** copies las RLS policies con `USING (true)` en `authenticated`. Implementá role check si te queda tiempo (ver sección 3.3).
- ❌ **NO** uses Service Role Key en código del cliente. Solo en server actions / route handlers.
- ❌ **NO** copies el ProductCatalog tal cual (filtra client-side, no escala). Hacé filtros server-side con searchParams.
- ❌ **NO** copies el patrón inseguro de inyección de estilos en AdminSettings del demo (inyecta CSS sin sanitizar). Si necesitás aplicar colores dinámicos del admin, **inyectalos como CSS variables en `<html style={{...}}>` o usando una `<style>` tag con valores validados por regex `/^#[0-9a-fA-F]{6}$/`**, nunca strings sin validar.
- ❌ **NO** copies el `clientes/` folder ni el script `onboard-client.ts` — no aplica.

### 2.3 — Animación carrito (CÓDIGO EXACTO A COPIAR)

`src/lib/store/cart-animation.ts` (Zustand store con `triggerFly`, `triggerBurst`, `bagGlowCount`) — **copialo entero**. Es el cerebro de la animación.

`src/components/store/CartFlyEffect.tsx` — **copialo entero**. Tiene:
- `getBagIconRect()` que busca `[data-cart-bag]` en el DOM
- `FlyBall` con trayectoria parabólica: `arcLift = Math.min(Math.abs(dy) * 0.6 + 75, 155)`, `arcDrift = dx * 0.18`, duración 1.1s, easing `[0.2, 0.55, 0.35, 0.96]`
- `ImpactBurst` con flash central + 2 anillos concéntricos al destino
- `createPortal` a `document.body`

**Disparo**: en `ProductCard` y `ProductInfo`, al hacer click en "Agregar al carrito", capturás `getBoundingClientRect()` del botón y llamás:
```ts
const rect = e.currentTarget.getBoundingClientRect()
triggerFly(rect.left + rect.width / 2, rect.top + rect.height / 2)
addItem(product, variant, 1)
```

**Importante**: en el `Navbar`, el icono de la bolsa debe tener `data-cart-bag` para que `getBagIconRect()` lo encuentre. El badge del contador debe animar bounce cuando `bagGlowCount` incrementa (mirá el código original en Navbar.tsx línea ~61-67 del demo).

**Color de la bolita**: mantenelo en `#c9a96e` (champagne) — combina perfecto con la paleta de Imagina Te que verás abajo.

---

## 3 · SUPABASE (PROYECTO "DEMO")

### 3.1 — Conexión

- **Project ID / Ref:** `zrzpmgyafuesmakkoysn`
- **Nombre:** Demo
- **Región:** us-east-1
- **Host:** db.zrzpmgyafuesmakkoysn.supabase.co
- **URL pública:** `https://zrzpmgyafuesmakkoysn.supabase.co`

**Para conectarte usá el MCP de Supabase**. Cuando tengas que ejecutar SQL, usá `mcp__70d9e470-49b9-42e9-8795-0e7b7617562a__apply_migration` para DDL y `mcp__70d9e470-49b9-42e9-8795-0e7b7617562a__execute_sql` para seeds o queries. Las claves anon y publishable las conseguís con `mcp__70d9e470-49b9-42e9-8795-0e7b7617562a__get_publishable_keys`.

**En `.env.local`** (creálo) poné:
```
NEXT_PUBLIC_SUPABASE_URL=https://zrzpmgyafuesmakkoysn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<obtener via MCP get_publishable_keys>
SUPABASE_SERVICE_ROLE_KEY=<pediselo al usuario si la necesitás; si no, opera sin esto>
```

### 3.2 — Tablas a crear (TODAS con prefijo `lenceria_`)

⚠️ **CRÍTICO**: el proyecto Supabase "Demo" ya tiene tablas de otros sistemas (categories, products, professionals, jobs, users, etc.). **NO TOQUES NINGUNA QUE NO EMPIECE CON `lenceria_`**. Las tuyas son:

```
lenceria_categories
lenceria_collections
lenceria_products
lenceria_product_images
lenceria_product_variants
lenceria_orders
lenceria_order_items
lenceria_order_audit_log
lenceria_site_settings
lenceria_reviews
lenceria_size_guide_entries
lenceria_wishlist_items  (opcional, si te queda tiempo)
```

**Storage buckets** (también con prefijo):
```
lenceria-products
lenceria-categories
lenceria-collections
```

### 3.3 — Schema SQL completo (aplicalo via `apply_migration`)

```sql
-- ============================================================
-- IMAGINA TE LENCERIA — Schema completo (prefijo lenceria_)
-- ============================================================

CREATE TABLE lenceria_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  parent_id uuid REFERENCES lenceria_categories(id) ON DELETE SET NULL,
  position int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE lenceria_collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  hero_image_url text,
  is_active boolean DEFAULT true,
  season text,
  position int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE lenceria_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  short_description text,
  care_instructions text,
  composition text,
  price decimal(10,2) NOT NULL,
  compare_at_price decimal(10,2),
  category_id uuid REFERENCES lenceria_categories(id) ON DELETE SET NULL,
  collection_id uuid REFERENCES lenceria_collections(id) ON DELETE SET NULL,
  is_featured boolean DEFAULT false,
  is_new boolean DEFAULT true,
  is_bestseller boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  rating_avg decimal(3,2) DEFAULT 0,
  rating_count int DEFAULT 0,
  view_count int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE lenceria_product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES lenceria_products(id) ON DELETE CASCADE,
  url text NOT NULL,
  alt text,
  position int DEFAULT 0,
  is_primary boolean DEFAULT false
);

CREATE TABLE lenceria_product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES lenceria_products(id) ON DELETE CASCADE,
  size text NOT NULL,
  cup text,
  color text NOT NULL,
  color_hex text NOT NULL,
  stock int DEFAULT 0,
  sku text UNIQUE NOT NULL,
  weight_grams int DEFAULT 100
);

CREATE TABLE lenceria_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE,
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  customer_phone text,
  customer_dni text,
  subtotal decimal(10,2),
  shipping decimal(10,2) DEFAULT 0,
  shipping_method text,
  discount decimal(10,2) DEFAULT 0,
  total decimal(10,2),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_method text,
  payment_status text DEFAULT 'pending',
  shipping_address jsonb,
  discreet_packaging boolean DEFAULT true,
  notes text,
  internal_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE lenceria_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES lenceria_orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES lenceria_products(id) ON DELETE SET NULL,
  variant_id uuid REFERENCES lenceria_product_variants(id) ON DELETE SET NULL,
  product_name text,
  variant_size text,
  variant_cup text,
  variant_color text,
  product_image_url text,
  quantity int NOT NULL,
  unit_price decimal(10,2) NOT NULL,
  line_total decimal(10,2)
);

CREATE TABLE lenceria_order_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES lenceria_orders(id) ON DELETE CASCADE,
  actor text,
  action text,
  from_value jsonb,
  to_value jsonb,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE lenceria_site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE lenceria_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES lenceria_products(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  customer_email text,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text,
  body text,
  size_purchased text,
  is_verified boolean DEFAULT false,
  is_published boolean DEFAULT true,
  photo_urls text[],
  created_at timestamptz DEFAULT now()
);

CREATE TABLE lenceria_size_guide_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  size_label text NOT NULL,
  underbust_cm_min int,
  underbust_cm_max int,
  bust_cm_min int,
  bust_cm_max int,
  cup text,
  hip_cm_min int,
  hip_cm_max int,
  notes text
);

-- INDEXES
CREATE INDEX idx_lenceria_products_slug ON lenceria_products(slug);
CREATE INDEX idx_lenceria_products_category_id ON lenceria_products(category_id);
CREATE INDEX idx_lenceria_products_collection_id ON lenceria_products(collection_id);
CREATE INDEX idx_lenceria_products_status ON lenceria_products(status);
CREATE INDEX idx_lenceria_products_is_featured ON lenceria_products(is_featured);
CREATE INDEX idx_lenceria_products_is_bestseller ON lenceria_products(is_bestseller);
CREATE INDEX idx_lenceria_variants_product_id ON lenceria_product_variants(product_id);
CREATE INDEX idx_lenceria_variants_sku ON lenceria_product_variants(sku);
CREATE INDEX idx_lenceria_orders_order_number ON lenceria_orders(order_number);
CREATE INDEX idx_lenceria_orders_status ON lenceria_orders(status);
CREATE INDEX idx_lenceria_orders_created_at ON lenceria_orders(created_at);
CREATE INDEX idx_lenceria_categories_slug ON lenceria_categories(slug);
CREATE INDEX idx_lenceria_reviews_product_id ON lenceria_reviews(product_id);
CREATE INDEX idx_lenceria_reviews_is_published ON lenceria_reviews(is_published);

-- FUNCTIONS & TRIGGERS
CREATE SEQUENCE lenceria_order_number_seq START 1;

CREATE OR REPLACE FUNCTION lenceria_generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'IT-' || LPAD(nextval('lenceria_order_number_seq')::text, 5, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_lenceria_generate_order_number
  BEFORE INSERT ON lenceria_orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL)
  EXECUTE FUNCTION lenceria_generate_order_number();

CREATE OR REPLACE FUNCTION lenceria_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_lenceria_products_updated_at
  BEFORE UPDATE ON lenceria_products
  FOR EACH ROW
  EXECUTE FUNCTION lenceria_update_updated_at();

CREATE TRIGGER trg_lenceria_orders_updated_at
  BEFORE UPDATE ON lenceria_orders
  FOR EACH ROW
  EXECUTE FUNCTION lenceria_update_updated_at();

CREATE OR REPLACE FUNCTION lenceria_calc_line_total()
RETURNS TRIGGER AS $$
BEGIN
  NEW.line_total = NEW.quantity * NEW.unit_price;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_lenceria_line_total
  BEFORE INSERT OR UPDATE ON lenceria_order_items
  FOR EACH ROW
  EXECUTE FUNCTION lenceria_calc_line_total();

CREATE OR REPLACE FUNCTION lenceria_update_product_rating()
RETURNS TRIGGER AS $$
DECLARE
  v_product_id uuid;
BEGIN
  v_product_id := COALESCE(NEW.product_id, OLD.product_id);
  UPDATE lenceria_products
  SET
    rating_avg = (SELECT COALESCE(AVG(rating), 0) FROM lenceria_reviews WHERE product_id = v_product_id AND is_published = true),
    rating_count = (SELECT COUNT(*) FROM lenceria_reviews WHERE product_id = v_product_id AND is_published = true)
  WHERE id = v_product_id;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_lenceria_review_rating
  AFTER INSERT OR UPDATE OR DELETE ON lenceria_reviews
  FOR EACH ROW
  EXECUTE FUNCTION lenceria_update_product_rating();

-- RLS
ALTER TABLE lenceria_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE lenceria_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE lenceria_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE lenceria_product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE lenceria_product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE lenceria_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE lenceria_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE lenceria_order_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE lenceria_site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE lenceria_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE lenceria_size_guide_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lenceria_public_read_categories" ON lenceria_categories FOR SELECT USING (true);
CREATE POLICY "lenceria_public_read_collections" ON lenceria_collections FOR SELECT USING (true);
CREATE POLICY "lenceria_public_read_products" ON lenceria_products FOR SELECT USING (status = 'active');
CREATE POLICY "lenceria_public_read_product_images" ON lenceria_product_images FOR SELECT USING (true);
CREATE POLICY "lenceria_public_read_product_variants" ON lenceria_product_variants FOR SELECT USING (true);
CREATE POLICY "lenceria_public_read_reviews" ON lenceria_reviews FOR SELECT USING (is_published = true);
CREATE POLICY "lenceria_public_read_size_guide" ON lenceria_size_guide_entries FOR SELECT USING (true);
CREATE POLICY "lenceria_public_read_site_settings" ON lenceria_site_settings FOR SELECT USING (true);

CREATE POLICY "lenceria_anon_create_orders" ON lenceria_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "lenceria_anon_create_order_items" ON lenceria_order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "lenceria_anon_create_reviews" ON lenceria_reviews FOR INSERT WITH CHECK (is_published = false);

CREATE POLICY "lenceria_auth_all_categories" ON lenceria_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "lenceria_auth_all_collections" ON lenceria_collections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "lenceria_auth_all_products" ON lenceria_products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "lenceria_auth_all_product_images" ON lenceria_product_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "lenceria_auth_all_product_variants" ON lenceria_product_variants FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "lenceria_auth_all_orders" ON lenceria_orders FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "lenceria_auth_all_order_items" ON lenceria_order_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "lenceria_auth_all_audit" ON lenceria_order_audit_log FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "lenceria_auth_update_settings" ON lenceria_site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "lenceria_auth_all_reviews" ON lenceria_reviews FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "lenceria_auth_all_size_guide" ON lenceria_size_guide_entries FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public) VALUES ('lenceria-products', 'lenceria-products', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('lenceria-categories', 'lenceria-categories', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('lenceria-collections', 'lenceria-collections', true) ON CONFLICT DO NOTHING;

CREATE POLICY "lenceria_public_read_products_bucket" ON storage.objects FOR SELECT USING (bucket_id = 'lenceria-products');
CREATE POLICY "lenceria_auth_write_products_bucket" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'lenceria-products') WITH CHECK (bucket_id = 'lenceria-products');
CREATE POLICY "lenceria_public_read_categories_bucket" ON storage.objects FOR SELECT USING (bucket_id = 'lenceria-categories');
CREATE POLICY "lenceria_auth_write_categories_bucket" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'lenceria-categories') WITH CHECK (bucket_id = 'lenceria-categories');
CREATE POLICY "lenceria_public_read_collections_bucket" ON storage.objects FOR SELECT USING (bucket_id = 'lenceria-collections');
CREATE POLICY "lenceria_auth_write_collections_bucket" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'lenceria-collections') WITH CHECK (bucket_id = 'lenceria-collections');
```

### 3.4 — Seed data (insertá después del schema)

**Categorías** (9):
```
Corpiños · Bombachas · Conjuntos · Bodysuits · Ropa de Dormir · Robes & Kimonos · Babydolls · Lencería Deportiva · Accesorios
```

**Colecciones** (4):
```
- "Diario" (slug: diario) — comfort y suavidad, algodón, cortes funcionales
- "Seducción" (slug: seduccion) — encaje, transparencias, nocturno
- "Romance" (slug: romance) — pastel, bordados, regalo
- "Liberté" (slug: liberte) — deportivo elevado, microfibra técnica
```

**Productos** — Seedeá 12 productos como mínimo, mix de categorías. Usá imágenes de **Unsplash** (libres) con URLs como `https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=1200&q=85`. Buscá en Unsplash con términos como "lingerie", "underwear", "intimates", "boudoir" — la API de Unsplash con `auto=format&fit=crop` te sirve. Si una URL no anda, sustituí. Productos sugeridos (sentite libre de adaptar):

1. **Corpiño Renacer Encaje Negro** — $24.900 (con compare_at $29.900) — collection: Seducción — tallas 85B, 90B, 90C, 95B, 95C, 100C
2. **Bombacha Vedetina Microtul** — $9.800 — collection: Diario — S, M, L, XL en blanco y negro
3. **Conjunto Lumière Encaje Francés** — $42.500 — featured: true, bestseller: true — collection: Romance — 85B-95C
4. **Bodysuit Etérea Bordado** — $28.700 — featured: true — collection: Seducción — S, M, L
5. **Camisón Seda Aurora** — $35.000 — collection: Romance — S, M, L en rosa polvo + negro
6. **Robe Kimono Lirio** — $48.900 — featured: true — collection: Romance — One Size, satén champagne y borgoña
7. **Babydoll Promesa Tul** — $19.500 — collection: Seducción — S, M, L, XL
8. **Conjunto Aura Deportivo** — $26.400 — collection: Liberté — S, M, L, XL (top + culotte)
9. **Bombachón Algodón Esencial (pack 3)** — $14.200 — bestseller: true — collection: Diario — S, M, L
10. **Corpiño Strapless Innata Push-Up** — $27.800 — 85B-100C — collection: Diario
11. **Liguero Femme Fatale** — $16.900 — collection: Seducción — S, M, L
12. **Pijama Satén Mariposa (2 piezas)** — $39.500 — featured: true — collection: Romance — S, M, L, XL

Para cada producto: 2-3 imágenes en `lenceria_product_images`, 4-8 variantes (size × color) en `lenceria_product_variants`. Stock entre 0-15 por variante (dejá 1-2 variantes con stock=0 para que se vea el "agotado").

**Reviews seed** — 1 a 4 reviews por cada producto destacado. Nombres argentinos (Sofía, Camila, Florencia, Valentina, Martina, Lucía, Agostina). Rating mix 4-5 estrellas con algunos 3. Body realista, 2-4 oraciones, mencionando talla.

**Site settings seed**:
```sql
INSERT INTO lenceria_site_settings (key, value) VALUES
  ('store_name', '"Imagina te"'::jsonb),
  ('store_tagline', '"Renueva tu interior"'::jsonb),
  ('store_currency', '"ARS"'::jsonb),
  ('free_shipping_threshold', '35000'::jsonb),
  ('announcement_bar', '{"text": "Envío gratis a todo el país en compras desde $35.000", "active": true}'::jsonb),
  ('brand_colors', '{"primary": "#C9A96E", "accent": "#C99E9A", "ink": "#0E0B0A", "cream": "#F5EFE7"}'::jsonb),
  ('contact_phone', '"+54 9 11 6175-5668"'::jsonb),
  ('contact_address', '"Bynnon 3623 esq. Martín Arín"'::jsonb),
  ('instagram_url', '"https://instagram.com/lenceria_imaginate"'::jsonb),
  ('whatsapp_number', '"5491161755668"'::jsonb);
```

**Size guide seed** — al menos 6 entradas:
```
Categoría: corpiño · 85A (75-79 underbust, 79-83 bust)
Categoría: corpiño · 85B (75-79 underbust, 83-86 bust)
Categoría: corpiño · 90B (80-84 underbust, 88-91 bust)
Categoría: corpiño · 90C (80-84 underbust, 91-94 bust)
Categoría: corpiño · 95C (85-89 underbust, 96-99 bust)
Categoría: corpiño · 100C (90-94 underbust, 101-104 bust)
Categoría: bombacha · S (hip 85-90)
Categoría: bombacha · M (hip 91-96)
Categoría: bombacha · L (hip 97-102)
Categoría: bombacha · XL (hip 103-108)
```

### 3.5 — Crear usuario admin

Después de aplicar el schema, creá un usuario admin via Supabase Dashboard o con SQL:
```
Email: admin@imaginate.local
Password: ImaginaTe2026!
```

Si no tenés Service Role Key, dejá las instrucciones en `RESUMEN-EJECUCION.md` para que Manuel lo cree manualmente desde el dashboard de Supabase. El login admin después es vía `/auth/login`.

---

## 4 · IDENTIDAD VISUAL

### 4.1 — Logo "imagina ♥ te"

Hacelo **inline en SVG** (componente `<Logo />`). Tres variantes:

- **Variante A · Horizontal serif (RECOMENDADA, default)**:
  - "imagina" en serif italic delicada (Cormorant Garamond Italic 500)
  - ♥ entre las palabras, dorado champagne `#C9A96E`, ligeramente elevado verticalmente
  - "te" en serif italic 500, alineado con "imagina"
  - Spacing aireado, kerning negativo sutil

- **Variante B · Stacked (para footer / mobile collapsed)**:
  - "imagina" arriba
  - ♥ centrado en el medio
  - "te" abajo
  - Centrado, decorativo

- **Variante C · Monograma I♥T (para favicon, app icon, redondito)**:
  - Las letras I y T entrelazadas alrededor del ♥
  - En círculo o cuadrado redondeado
  - Fondo charcoal `#0E0B0A`, letras y corazón en champagne

Todas en SVG inline. Animá el ♥ con un latido sutil (scale 1 → 1.06 → 1) cada ~4 segundos con CSS keyframes o Framer Motion — sutil, no chillón.

### 4.2 — Paleta de colores (CSS variables)

```css
:root {
  /* Tintas */
  --ink: #0E0B0A;           /* Charcoal cálido, casi negro */
  --noir: #1A1A1A;          /* Negro suave para fondos secundarios */
  --soft-black: #2A2522;

  /* Crema y nudes */
  --cream: #F5EFE7;         /* Fondo principal claro */
  --ivory: #FAF6F0;
  --linen: #ECE4D9;
  --bone: #E8DFD2;

  /* Acentos cálidos (firma de la marca) */
  --champagne: #C9A96E;     /* Dorado cálido — bolita carrito, CTAs hover, badges */
  --champagne-light: #D4B98C;
  --rose: #C99E9A;          /* Rosa polvo — acento femenino */
  --rose-deep: #B47A75;
  --blush: #EAD5C8;
  --burgundy: #6B1F2E;      /* Vino — alertas elegantes, sale */

  /* Grises funcionales */
  --warm-gray-500: #8A8175;
  --warm-gray-300: #BFB6A8;
  --warm-gray-100: #E5DED1;

  /* Estados */
  --success: #5A7A52;
  --error: #9B1B30;
}
```

**Uso:**
- Fondo default: `--cream` (claro)
- Fondo oscuro (hero alterno, footer, modo nocturno): `--ink`
- Texto sobre cream: `--ink`
- Texto sobre ink: `--cream`
- CTA primario: fondo `--ink`, texto `--cream`, hover `--champagne`
- Accent decorativo: `--champagne` (corazón del logo, líneas divisorias, badges)
- Rosa polvo `--rose`: precios sale, tags, micro-acentos
- Burgundy `--burgundy`: solo para "SALE" badges, urgencias elegantes

### 4.3 — Tipografía

Usá **Google Fonts** (Next.js `next/font/google`):

- **Display** (titulares, hero, nombres de producto en grid):
  `Cormorant Garamond` — pesos 300, 400, 500, 700, italic. Serif elegante, romántico.
- **Body** (párrafos, navegación, UI):
  `Inter` — 400, 500, 600, 700.
- **Accent** (taglines decorativos, scripts cortos):
  `Italiana` — solo 400. Solo para "Renueva tu interior" en hero y un par de detalles. NO la uses para body.

Tailwind extends:
```ts
fontFamily: {
  display: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
  body: ['var(--font-inter)', 'Inter', 'sans-serif'],
  accent: ['var(--font-italiana)', 'serif'],
}
```

**Escala tipográfica:**
- H1 hero: `font-display`, 64-96px, weight 400, italic, tracking -0.02em
- H2 sección: `font-display`, 40-56px, weight 400, italic
- H3 card: `font-display`, 22-28px, weight 400
- Body: `font-body`, 15-16px, weight 400, leading 1.6
- Caption/Eyebrow: `font-body`, 11-12px, weight 500, uppercase, tracking 0.18em
- Precio: `font-body`, 16-18px, weight 500
- Botón: `font-body`, 13px, weight 500, uppercase, tracking 0.14em

### 4.4 — Iconografía

`lucide-react` (ya en demo). Stroke 1.5px, color hereda. Para `data-cart-bag` usá `ShoppingBag`. Para wishlist usá `Heart`. Para user usá `User`. Para search usá `Search`. Para menú mobile `Menu`. Para close `X`.

### 4.5 — Mood fotográfico

Para imágenes de productos en seed, priorizá Unsplash con estos términos: `intimate apparel`, `luxury lingerie`, `silk robe`, `bedroom editorial`. Color grading cálido. Fotos verticales preferentemente (3:4 o 4:5 ratio).

**IMPORTANTE**: Priorizá editoriales sofisticadas, lifestyle, flat lays, sombras suaves. Evitá imágenes explícitas. Si una foto no funciona o es inapropiada, sustituí por una flat-lay o detalle de tela.

---

## 5 · STACK TÉCNICO (VERSIONES EXACTAS)

```json
{
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@supabase/ssr": "^0.5.2",
    "@supabase/supabase-js": "^2.47.10",
    "clsx": "^2.1.1",
    "embla-carousel-autoplay": "^8.3.1",
    "embla-carousel-react": "^8.3.1",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.468.0",
    "next": "14.2.21",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "recharts": "^2.15.4",
    "sonner": "^2.0.7",
    "tailwind-merge": "^2.6.0",
    "zustand": "^5.0.2"
  },
  "devDependencies": {
    "@types/node": "^22.10.2",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.1",
    "eslint-config-next": "14.2.21",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.16",
    "typescript": "^5.7.2"
  }
}
```

**No upgrades a Next 15** salvo que tengas tiempo de sobra al final. La idea es que copie de un demo que ya funciona en Next 14.

`next.config.js`: habilitá `images.remotePatterns` para `images.unsplash.com` y para `*.supabase.co`.

---

## 6 · ESTRUCTURA DE CARPETAS Y RUTAS

```
src/
├── app/
│   ├── (store)/
│   │   ├── layout.tsx               # Navbar + Footer + CartFlyEffect portal
│   │   ├── page.tsx                 # / — Home
│   │   ├── productos/page.tsx       # /productos — Catálogo
│   │   ├── productos/[slug]/page.tsx # /productos/[slug] — PDP
│   │   ├── colecciones/page.tsx     # /colecciones
│   │   ├── colecciones/[slug]/page.tsx
│   │   ├── carrito/page.tsx         # /carrito
│   │   ├── checkout/page.tsx        # /checkout
│   │   ├── checkout/confirmacion/page.tsx
│   │   ├── guia-talles/page.tsx     # /guia-talles
│   │   ├── envios-devoluciones/page.tsx
│   │   ├── nosotros/page.tsx
│   │   ├── contacto/page.tsx
│   │   ├── buscar/page.tsx          # /buscar?q=
│   │   ├── loading.tsx
│   │   └── not-found.tsx
│   ├── admin/
│   │   ├── layout.tsx               # Auth check
│   │   ├── page.tsx                 # Dashboard
│   │   ├── productos/page.tsx
│   │   ├── productos/[id]/page.tsx
│   │   ├── productos/actions.ts
│   │   ├── categorias/page.tsx
│   │   ├── colecciones/page.tsx
│   │   ├── inventario/page.tsx
│   │   ├── ordenes/page.tsx
│   │   ├── ordenes/[id]/page.tsx
│   │   ├── reviews/page.tsx
│   │   └── configuracion/page.tsx
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── callback/route.ts
│   ├── layout.tsx                   # Root layout (fonts, providers)
│   ├── globals.css
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── store/  ...                  (ver listado completo abajo)
│   ├── admin/  ...
│   └── ui/     ...
├── lib/
│   ├── constants.ts
│   ├── utils.ts                     # cn, formatPriceARS, slugify
│   ├── supabase/
│   ├── store/
│   │   ├── cart.ts
│   │   ├── cart-animation.ts
│   │   └── wishlist.ts
│   ├── queries/                     # products, categories, collections, orders, reviews, settings
│   ├── site-config.ts
│   └── site-config-context.tsx
├── types/
│   └── index.ts
├── styles/
│   └── globals.css
└── middleware.ts                    # Auth refresh + /admin gate
```

**Componentes store:**
Navbar, Footer, AnnouncementBar, HeroSection, CategoriesGrid, FeaturedProducts, BestSellers, CollectionsShowcase, EditorialSection, ReviewsCarousel, InstagramFeed, NewsletterCTA, ProductCard, ProductGallery, ProductInfo, ProductReviews, RelatedProducts, ProductFilters, ProductGrid, CartDrawer, CartFlyEffect, CartPage, CheckoutForm, OrderSummary, SizeGuideModal, FindMySize, SearchOverlay, DiscreetPackagingBadge, Logo.

**Componentes admin:**
Sidebar, TopBar, StatsCard, RevenueChart, OrdersDonut, TopProducts, DataTable, ProductForm, ProductImageUploader, AdminInventory, AdminOrdersList, OrderDetail, AdminCategoriesCollections, AdminReviewsList, AdminSettings.

**Componentes ui:**
Button, Input, Textarea, Select, Modal, Drawer, Tabs, Badge, Skeleton, Toggle.

---

## 7 · ESPECIFICACIÓN DE PÁGINAS

### 7.1 — Homepage `/`

**Above the fold (100vh mobile, 80vh desktop):**
- `<AnnouncementBar>` arriba: "Envío gratis a todo el país en compras desde $35.000 ♥"
- `<Navbar>` (transparente sobre el hero, se vuelve sólido al hacer scroll)
- `<HeroSection>`:
  - Imagen full-bleed (Unsplash, lencería editorial moody, oscura/sensual)
  - Overlay degradado de `var(--ink)` con 30% opacity para legibilidad
  - Centrado vertical:
    - Eyebrow en `font-accent` (Italiana): "Nueva colección · 2026"
    - H1 en `font-display` italic: "Imagina te"
    - Sub en `font-display` 400, más chiquita: "Renueva tu interior"
    - CTA primario: "Descubrí la colección" (botón ink con texto cream, hover champagne underline)
  - Scroll indicator abajo (flecha animada bouncy)

**Bajo el hero (secciones en orden):**

1. **Categorías destacadas** — grid 3 columnas desktop / 2x2 mobile con 4 categorías top (Conjuntos, Corpiños, Robes, Nuevos). Cada card: imagen + nombre + "Ver →"
2. **Featured Products** — H2 "Nuestros favoritos"; grid 4 productos featured con ProductCard y animación fade-in on scroll
3. **Colección destacada (editorial)** — split 50/50: imagen grande izq + texto narrativo derecha con CTA "Ver la colección"
4. **Best Sellers** — H2 "Las más amadas"; carousel embla con 6-8 bestsellers
5. **"Encontrá tu talle"** — banner que abre el modal de quiz `<FindMySize>` (3 preguntas)
6. **Reviews carousel** — H2 "Lo que dicen ellas"; carousel embla con reviews destacadas (5 estrellas + foto si tienen)
7. **Beneficios** — strip horizontal con 4 íconos: "Envío discreto · Cuotas sin interés · Cambios fáciles · Atención por WhatsApp"
8. **Instagram feed** — H2 "Imagina te en Instagram"; mock grid 6 imágenes
9. **Newsletter** — fondo `var(--ink)`, copy "Sé la primera en enterarte de nuevas colecciones, ofertas exclusivas y consejos de estilo." + input email + botón "Suscribirme"
10. **Footer** — 4 columnas: Marca · Tienda · Ayuda · Contacto · redes; abajo legal mini

### 7.2 — Catálogo `/productos`

- Sidebar/drawer filtros: Categoría, Colección, Talla, Color, Rango precio, "Solo nuevos", "En oferta"
- Sort dropdown: Más nuevos · Precio menor a mayor · Precio mayor a menor · Más vendidos · Mejor rating
- Grid productos 4 cols desktop / 2 cols mobile
- Filtrado **server-side** con searchParams (no client-side)
- Paginación 24 productos por página
- Empty state si no hay productos: ilustración + "No encontramos lo que buscás. Probá con otros filtros."

### 7.3 — PDP `/productos/[slug]`

Layout 60% galería izq / 40% info derecha (desktop). Mobile: galería arriba, info abajo.

**Galería:**
- Imagen principal grande con click → lightbox modal
- Thumbnails verticales (desktop) / horizontales swipeables (mobile)
- Zoom on hover desktop (cursor crosshair)
- Indicador "1 / 3"

**Info (sticky en desktop):**
- Eyebrow: nombre de colección (link)
- H1: nombre producto en `font-display` italic
- Rating estrellas + "(X reviews)"
- Precio (con compare_at_price tachado en `--warm-gray-500` si aplica + badge "-XX%" en `--burgundy`)
- Selector color (swatches circulares con color_hex, borde + check cuando activo)
- Selector talla con dropdown o pills (gris si sin stock, link "Avisame cuando vuelva" debajo)
- Link "¿Cuál es tu talle? Encontralo en 30 seg →" → abre `<FindMySize>` modal
- Botón AGREGAR AL CARRITO (full width, ink → champagne hover, disparador de animación bolita)
- Botón secundario "♥ Guardar en favoritos"
- Tabs colapsables: "Descripción" · "Composición y cuidado" · "Envíos y cambios"
- Trust signals strip: "Envío discreto" · "Cuotas sin interés" · "Cambios gratis"

**Bajo el fold:**
- Sección "Completá tu look" — 3 productos relacionados (mismo collection_id o categoría)
- Reviews completas (filtrables por estrellas, ordenables, expandibles)
- "También te puede gustar" — 4 productos más

### 7.4 — Carrito `/carrito`

- Tabla items: imagen, nombre + variante, qty stepper, precio, subtotal, trash icon
- Cupón: input "¿Tenés un código de descuento?" (mock, no implementar lógica real)
- Resumen lateral: subtotal · envío estimado · descuento · TOTAL
- Botón "Ir al checkout" full width
- "Seguí mirando →" link
- Empty state si vacío

### 7.5 — Checkout `/checkout`

**Single page** con 3 secciones colapsables o steps (a tu criterio):

1. **Información de contacto**: email, nombre, apellido, teléfono, DNI
2. **Envío**:
   - Radio: Andreani Estándar (3-5 días, $4.500) · Andreani Express (1-2 días, $7.800) · OCA (3-5 días, $4.200) · Retiro en local (Bynnon 3623, gratis)
   - Si envío a domicilio: dirección (calle, número, piso/depto, ciudad, provincia, CP)
   - Checkbox prominente "Envío en packaging discreto ♥" (default ON, con tooltip "Tu compra viaja en caja neutra sin nombre de la marca")
3. **Pago**:
   - Radio: Mercado Pago (UI placeholder con logo + "Pagá en cuotas sin interés") · Transferencia · Tarjeta (UI mock)
   - Submit "Confirmar pedido" → crea orden en `lenceria_orders` + items en `lenceria_order_items` con status `pending` → redirige a `/checkout/confirmacion?order=IT-XXXXX`

Resumen sticky lateral derecho desktop / top mobile.

### 7.6 — Confirmación `/checkout/confirmacion?order=IT-XXXXX`

- Hero centrado con ♥ animado (bloom in)
- "Gracias [nombre], tu pedido fue recibido"
- Número de orden destacado: "IT-00001"
- "Te enviamos un email con los detalles" (mock, no enviar real)
- Resumen del pedido
- CTA "Seguí explorando"

### 7.7 — Admin

Copiar estructura y patrones del demo. Adaptaciones:
- Sidebar items: Dashboard · Productos · Categorías · Colecciones · Inventario · Órdenes · Reviews · Configuración
- Dashboard con stats reales calculadas desde Supabase:
  - Ingresos últimos 30 días (RevenueChart línea + área)
  - Órdenes por estado (OrdersDonut)
  - Top 5 productos vendidos (TopProducts)
  - StatsCards: Total ingresos · Órdenes este mes · Productos activos · Reviews pendientes
- Productos CRUD completo con imagen upload a bucket `lenceria-products`
- Órdenes con cambio de status (pending → confirmed → paid → shipped → delivered) + audit log en `lenceria_order_audit_log`
- Reviews: aprobar/rechazar, marcar verified
- Configuración: editar settings con preview en vivo (paleta, anuncio, redes)

---

## 8 · MICROINTERACCIONES Y ANIMACIONES (OBLIGATORIAS)

1. **Bolita voladora al carrito** (sección 2.3) — IMPRESCINDIBLE, copiar exacto.
2. **ProductCard hover**: imagen primaria crossfade a imagen secundaria (300ms ease-out), overlay slide-up con quick-add button.
3. **Navbar**: transparente sobre hero, se vuelve sólido con shadow al hacer scroll (Framer Motion `useScroll`).
4. **Page transitions**: fade-in + leve scale (0.985 → 1) usando Framer Motion en `template.tsx`.
5. **Reveal on scroll**: secciones del home aparecen con stagger (Framer Motion `whileInView`).
6. **Add to cart button**: pulse + scale subtle al click antes del fly.
7. **Cart drawer**: slide-in desde la derecha, backdrop fade.
8. **Logo ♥ heartbeat**: scale 1 → 1.06 → 1 cada 4s, infinitamente.
9. **Skeleton shimmer**: en grids mientras cargan productos.
10. **Toast sonner**: usar `toast.success("Agregado al carrito")` con estilo custom (fondo ink, texto cream, borde champagne).
11. **Badge "NEW"** en ProductCard: rotación sutil (-3deg), color champagne, font-accent italica.
12. **Heart wishlist**: al hacer click, animación de "burst" tipo Twitter old (scale up + partículas pequeñas opcional).

---

## 9 · QUIZ "ENCONTRÁ TU TALLE" (`<FindMySize>`)

Modal de 3 pasos:

1. **Paso 1**: "¿Qué buscás?" — radio: Corpiño · Bombacha · Conjunto
2. **Paso 2** (si corpiño): "Tu medida bajo busto en cm" — input numérico + ilustración. Si bombacha: "Tu medida de cadera en cm".
3. **Paso 3** (si corpiño): "Tu medida de busto en cm" — input numérico.

Resultado: "Tu talle estimado es **90B**. Tené en cuenta que cada estilo puede variar. Mirá la guía de talles completa para más detalle →"

Botón "Ver productos en mi talle →" filtra el catálogo por esa talla.

Lógica: usar tabla `lenceria_size_guide_entries` para hacer match. Si no hay match exacto, devolver el más cercano.

---

## 10 · MOBILE Y RESPONSIVE

- Diseño **mobile-first**. Empezá por 375px y escalá.
- Breakpoints Tailwind defaults: sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536.
- Navbar mobile: logo centrado, hamburger izq, bolsa der.
- Hamburger drawer: slide desde la izquierda, opacity backdrop.
- Tap targets mínimo 44px.
- Cart drawer: 100vw mobile, 480px desktop.
- PDP mobile: galería arriba (swipe horizontal), info abajo, CTA "Agregar al carrito" sticky en el bottom (siempre visible).
- Catálogo mobile: 2 columnas, filtros en drawer.

---

## 11 · ACCESIBILIDAD MÍNIMA

- Todos los `<img>` con `alt` descriptivo
- Color contrast mínimo WCAG AA (4.5:1 para texto normal)
- `aria-label` en botones icon-only
- Focus visible (ring champagne en focus)
- Skip-to-content link en root layout
- `<form>` con labels asociados
- `prefers-reduced-motion` respetado: si está activado, desactivá la animación bolita y page transitions

---

## 12 · ROADMAP DE EJECUCIÓN (EN ORDEN)

1. **Bootstrap proyecto** — `npx create-next-app@14.2.21 . --typescript --tailwind --app --src-dir --import-alias "@/*"` (o crealo manual si el wizard interfiere)
2. **Copiar `package.json` deps** y `npm install`
3. **Configurar Tailwind** con paleta y tipografías
4. **Configurar `next.config.js`** con `images.remotePatterns` para Unsplash + Supabase
5. **Crear `.env.local`** con vars del Supabase Demo
6. **Aplicar schema SQL** en Supabase Demo via MCP `apply_migration` (sección 3.3)
7. **Seed data** via `execute_sql` o un script `scripts/seed.ts` (sección 3.4)
8. **Configurar fonts** en `app/layout.tsx` con `next/font/google`
9. **Crear `lib/supabase/{client,server,admin,storage}.ts`** (copiar del demo)
10. **Crear `lib/utils.ts`** con `cn`, `formatPriceARS` (formato `$24.900,00`), `slugify`
11. **Crear `lib/store/cart.ts`** y `cart-animation.ts` (copiar exacto del demo)
12. **Crear `lib/queries/*.ts`** (products, categories, etc.) usando server client
13. **Crear `<Logo>` SVG** componente
14. **Crear `<Navbar>`, `<Footer>`, `<AnnouncementBar>`** con responsive
15. **Crear `<CartFlyEffect>`** y agregar al `(store)/layout.tsx` como portal
16. **Crear `<HeroSection>`, `<CategoriesGrid>`, `<FeaturedProducts>`** y demás secciones del home
17. **Construir homepage** `/` ensamblando las secciones
18. **Construir `<ProductCard>`** con hover crossfade y trigger fly
19. **Construir catálogo** `/productos` con filtros server-side
20. **Construir PDP** `/productos/[slug]` con galería, info, reviews, related
21. **Construir `<CartDrawer>`** y página `/carrito`
22. **Construir `<CheckoutForm>`** y `/checkout` + confirmación
23. **Construir `<FindMySize>` quiz**
24. **Construir páginas estáticas** (guía-talles, envíos, nosotros, contacto)
25. **Construir admin layout** con Sidebar + TopBar + auth check
26. **Construir admin dashboard** con stats + charts
27. **Construir admin productos** (list + form) con upload de imágenes a `lenceria-products` bucket
28. **Construir admin categorías, colecciones, inventario, órdenes, reviews, configuración**
29. **Login admin** en `/auth/login`
30. **Polish final**: skeletons, loading states, animaciones, responsive testing
31. **Crear `RESUMEN-EJECUCION.md`** con todo lo que hiciste

**No esperés a "estar listo" para empezar. Empezá. Iterá. Si algo se rompe arreglalo y seguí. No vuelvas atrás a perfeccionar lo que ya quedó OK.**

---

## 13 · CRITERIOS DE ÉXITO

Cuando termines, el proyecto debe:

- [ ] Compilar sin errores (`npm run build` exitoso)
- [ ] Levantar con `npm run dev` sin warnings críticos
- [ ] Mostrar la homepage con todas las secciones funcionando
- [ ] Permitir navegar al catálogo, filtrar y entrar a una PDP
- [ ] Agregar al carrito con la animación de la bolita funcionando perfectamente
- [ ] Completar un checkout (mock) que cree una orden real en `lenceria_orders`
- [ ] Loguearse al admin y ver el dashboard con datos reales
- [ ] Crear/editar un producto desde el admin con upload de imagen
- [ ] Ser navegable en mobile (375px) sin overflow horizontal
- [ ] Tener TODOS los textos en español rioplatense, sin "tú"
- [ ] No tocar NINGUNA tabla que no empiece con `lenceria_`

---

## 14 · ANTI-PATRONES (NO HACER)

- ❌ NO uses Material UI, Chakra, Bootstrap, daisyUI. Solo Tailwind + componentes custom.
- ❌ NO uses styled-components ni CSS-in-JS. Solo Tailwind classes.
- ❌ NO uses Redux. Zustand alcanza.
- ❌ NO uses react-query/swr. Server components + revalidate alcanza para esta demo.
- ❌ NO uses moment, date-fns está bien si la necesitás.
- ❌ NO uses shadcn/ui. El demo no lo usa y vos tampoco. Componentes custom mantienen consistencia.
- ❌ NO copies imágenes de competencia. Solo Unsplash o assets generados.
- ❌ NO uses lorem ipsum. Todo el copy en español argentino, con voz de marca.
- ❌ NO uses placeholders genéricos. Escribí copy real.
- ❌ NO dejes `console.log` en producción ni `@ts-ignore` salvo justificadísimo.
- ❌ NO uses cookies de tracking ni analytics. La demo no las necesita.
- ❌ NO toques las tablas existentes del Supabase Demo que no empiezan con `lenceria_`.

---

## 15 · COSAS QUE MANUEL NO PIDIÓ PERO TE SUGIERO AGREGAR (criterio propio)

Si te queda tiempo después del MVP, agregá una o varias de:

- **Modo nocturno toggle** (light/dark) — guardado en localStorage. La paleta ya está pensada para soportarlo (ink ↔ cream).
- **Lookbook editorial** página `/lookbook` con imágenes grandes verticales scrolleables y leyendas poéticas. Tipo editorial de revista.
- **Lista de regalo / wishlist compartible** — link que la persona puede mandar a su pareja: "Mis favoritos de Imagina Te"
- **Bot WhatsApp CTA flotante** abajo a la derecha que abre `https://wa.me/5491161755668?text=Hola%2C%20quer%C3%ADa%20preguntarte%20sobre%20...`
- **Banner cookies** mínimo (no invasivo, dismissable, sin tracking real)
- **Animación de cursor custom** en desktop (corazón sutil que sigue al mouse) — solo si te queda tiempo y queda elegante.
- **Página "Nuestra historia"** con fotos de la tarjeta de presentación física (Bynnon 3623, Valeria), conexión emocional con que es un local físico real con una persona detrás.
- **Códigos de descuento mock** — input en checkout que reconoce `IMAGINATE10` y aplica 10% off.
- **Newsletter modal exit-intent** que aparece solo 1 vez (localStorage flag) con "10% off tu primera compra".

**No te excedas.** Si no llegás, no llegás. Lo importante es que el flujo crítico (home → catálogo → PDP → carrito → checkout → admin) quede impecable y premium.

---

## 16 · CIERRE

Manuel construyó antes el demo "Maison Élara" y le funcionó. Este proyecto reutiliza esa base pero con identidad propia, copy argentino, paleta cálida femenina y adaptaciones para el rubro lencería. El cliente potencial al que se le va a mostrar tiene que decir "wow, esto es premium, esto vende". Tu rol es lograr ese wow.

**Tenés todo lo que necesitás en este documento. Empezá ahora. Hacé todo. No preguntés. Cuando termines, dejá el `RESUMEN-EJECUCION.md` y avisás.**

♥
