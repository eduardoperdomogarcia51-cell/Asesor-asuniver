# Configuración de GitHub Pages para AsesoríasUniver

## Paso 1: Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `asesoriasuniver`
3. Selecciona "Public"
4. Haz clic en "Create repository"

## Paso 2: Subir el Archivo

### Opción A: Por Web (Más fácil)

1. En tu nuevo repositorio, haz clic en "Add file" → "Create new file"
2. Nombre del archivo: `index.html`
3. Copia y pega el contenido de abajo
4. Haz clic en "Commit new file"

### Opción B: Por Git (Si tienes Git instalado)

```bash
git clone https://github.com/TU_USUARIO/asesoriasuniver.git
cd asesoriasuniver
cp /mnt/okcomputer/output/app/dist/index-redirect.html index.html
git add index.html
git commit -m "Initial commit"
git push origin main
```

## Paso 3: Activar GitHub Pages

1. En tu repositorio, ve a "Settings" (pestaña superior)
2. En el menú lateral izquierdo, haz clic en "Pages"
3. En "Source", selecciona "Deploy from a branch"
4. En "Branch", selecciona "main" y carpeta "/ (root)"
5. Haz clic en "Save"

## Paso 4: Esperar

- GitHub Pages tarda 1-5 minutos en activarse
- Tu URL será: `https://asesoriasuniver.github.io`

---

## Contenido del archivo index.html

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="0; url=https://ie37ycbp7yjx6.ok.kimi.link/">
    <title>AsesoríasUniver - Aprende. Crea. Publica.</title>
    <meta name="description" content="Asesorías académicas, talleres de escritura y recursos digitales.">
</head>
<body>
    <p>Redirigiendo a <a href="https://ie37ycbp7yjx6.ok.kimi.link/">AsesoríasUniver</a>...</p>
</body>
</html>
```

---

## URLs Finales

| Servicio | URL |
|----------|-----|
| Sitio Principal (Kimi) | https://ie37ycbp7yjx6.ok.kimi.link |
| GitHub Pages | https://asesoriasuniver.github.io |

---

## Contacto del Sitio

- **Email:** univerasesorias@gmail.com
- **WhatsApp:** 350 254 3277
