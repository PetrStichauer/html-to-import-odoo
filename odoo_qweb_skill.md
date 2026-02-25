# Odoo 19 QWeb Conversion Skill

> Tento soubor slouží jako kompletní referenční příručka pro převod libovolné HTML stránky do formátu kompatibilního s Odoo 19 Website Builder (QWeb). Výsledek musí být copy-paste ready – bez úprav, bez chyb v editoru.

---

## PRAVIDLO #1 – XML, nikoli HTML

Odoo HTML editor zpracovává kód jako **XML**, ne jako HTML5. To znamená:
- Všechny tagy **musí** být uzavřené: `<br/>`, `<img/>`, `<input/>`, `<hr/>`
- Znaky `&` v textu musí být `&amp;`
- Uvozovky uvnitř atributů: použít `&quot;` nebo jednoduché uvozovky
- Žádné `<script>` tagy (Odoo je odstraní nebo vyhodí chybu)
- Žádné `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` tagy

---

## SEKCE 1 – Povinná vnější struktura každé stránky

```xml
<t name="Název stránky" t-name="website.nazev-stranky">
    <t t-call="website.layout">
        <div id="wrap" class="oe_structure oe_empty">

            <!-- JEDNOTLIVÉ SEKCE / SNIPPETY ZDE -->

        </div>
    </t>
</t>
```

**Vysvětlení:**
- `t-name="website.nazev-stranky"` – jedinečný identifikátor šablony (URL-friendly, bez diakritiky)
- `t-call="website.layout"` – vloží header, footer, navigaci z Odoo tématu
- `id="wrap"` – povinné ID pro Odoo website engine
- `class="oe_structure oe_empty"` – umožňuje editaci stránky v Website Builderu

---

## SEKCE 2 – QWeb direktivy (přehled)

| Direktiva | Použití | Příklad |
|-----------|---------|---------|
| `t-call="template"` | Volá jinou šablonu (subtemplate) | `<t t-call="website.layout"/>` |
| `t-if="podmínka"` | Podmíněné zobrazení | `<div t-if="user.name">...</div>` |
| `t-elif="podmínka"` | Else-if větev | `<p t-elif="x == 2">...</p>` |
| `t-else=""` | Else větev | `<p t-else="">Výchozí</p>` |
| `t-foreach="kolekce" t-as="item"` | Smyčka | `<t t-foreach="items" t-as="i">` |
| `t-out="proměnná"` | Výstup s HTML escapováním | `<t t-out="jmeno"/>` |
| `t-set="nazev" t-value="hodnota"` | Nastavení proměnné | `<t t-set="x" t-value="42"/>` |
| `t-att-class="výraz"` | Dynamický atribut | `<div t-att-class="'active' if ok else ''">` |
| `t-attf-class="text {{výraz}}"` | Atribut s formátem | `<div t-attf-class="row {{cls}}">` |
| `<t>...</t>` | Wrapper bez renderování | `<t t-if="x"><p>ok</p></t>` |

**Pro statické stránky v Website Builderu se QWeb direktivy téměř nepoužívají** – stránky jsou čistě HTML uvnitř QWeb wrapperu.

---

## SEKCE 3 – Struktura snippetu (POVINNÉ atributy)

Každý viditelný blok musí mít na kořenovém elementu:

```xml
<section class="s_NAZEV [barevné třídy] [spacing třídy] o_colored_level"
         data-snippet="s_NAZEV"
         data-name="Lidsky čitelný název">
    <!-- obsah -->
</section>
```

**POVINNÉ:**
- `data-snippet="s_nazev"` – identifikuje typ snippetu pro editor
- `data-name="Název"` – zobrazuje se v panelu editoru

**Použít `<section>` pro obsahové sekce, `<div>` pro utility bloky (HR, embed).**

---

## SEKCE 4 – Katalog snippetů (data-snippet hodnoty)

### Intro (hero sekce, úvod)
| data-snippet | Popis |
|--------------|-------|
| `s_banner` | Banner s textem a CTA tlačítkem |
| `s_cover` | Cover s pozadím a centrovým textem |
| `s_text_cover` | Text nad obrázkem/videem |
| `s_carousel` | Karusel obrázků |
| `s_carousel_intro` | Intro karusel s textem |
| `s_motto` | Motto/slogan sekce |
| `s_kickoff` | Úvodní obrázek s textem |
| `s_discovery` | Odkrývání obsahu |
| `s_empowerment` | Hero s CTA |
| `s_framed_intro` | Intro s rámečkem |
| `s_adventure` | Journey/adventure hero |
| `s_striped_center_top` | Proužkovaný hero centrovaný |

### Columns (sloupce, mřížky)
| data-snippet | Popis |
|--------------|-------|
| `s_three_columns` | 3 sloupce (flexibilní 1-6) |
| `s_features_wall` | Zeď s features/ikonami |
| `s_key_benefits` | Klíčové výhody s ikonami |
| `s_product_list` | Seznam produktů/položek |
| `s_freegrid` | Volný grid layout |
| `s_cards_grid` | Mřížka karet |
| `s_key_images` | Klíčové obrázky v sloupcích |
| `s_wavy_grid` | Vlnitá mřížka |
| `s_card_offset` | Karta s odsazením |
| `s_cards_soft` | Měkké karty |
| `s_color_blocks_2` | Velké barevné bloky vedle sebe |

### Content (obsah)
| data-snippet | Popis |
|--------------|-------|
| `s_text_image` | Text vlevo, obrázek vpravo |
| `s_image_text` | Obrázek vlevo, text vpravo |
| `s_shape_image` | Obrázek s tvarovou dekorací |
| `s_call_to_action` | CTA sekce s tlačítkem |
| `s_cta_box` | CTA v boxu |
| `s_cta_card` | CTA karta se seznamem výhod |
| `s_features` | Sekce s features/výhodami |
| `s_features_wave` | Features s vlnovou dekorací |
| `s_media_list` | Seznam s médii (blog, feed) |
| `s_showcase` | Showcase produktu/služby |
| `s_comparisons` | Srovnávací tabulka |
| `s_numbers` | Statistiky/čísla |
| `s_numbers_grid` | Mřížka čísel |
| `s_big_number` | Velké číslo/statistika |
| `s_timeline` | Časová osa |
| `s_timeline_list` | Časová osa jako seznam |
| `s_tabs` | Záložky |
| `s_accordion` | Rozbalovací seznam (FAQ) |
| `s_faq_collapse` | FAQ s collapse |
| `s_embed_code` | Vložený kód (iframe, video) |
| `s_countdown` | Odpočítávání |
| `s_popup` | Popup okno |
| `s_striped` | Proužkovaná sekce |
| `s_color_blocks_2` | Velké barevné bloky |
| `s_image_text_overlap` | Překrývající se obr. a text |

### Images (galerie, obrázky)
| data-snippet | Popis |
|--------------|-------|
| `s_picture` | Titulek + obrázek |
| `s_masonry_block` | Masonry galerie |
| `s_image_gallery` | Galerie s thumbnaily |
| `s_images_wall` | Zeď obrázků |
| `s_parallax` | Parallax obrázek |
| `s_image_title` | Obrázek s titulkem |
| `s_image_frame` | Obrázek v rámečku |
| `s_images_mosaic` | Mozaika obrázků |

### People (tým, reference)
| data-snippet | Popis |
|--------------|-------|
| `s_company_team` | Tým v sloupcích |
| `s_company_team_grid` | Tým v mřížce |
| `s_company_team_basic` | Základní tým |
| `s_company_team_shapes` | Tým s tvary |
| `s_references` | Loga zákazníků/partnerů |
| `s_references_grid` | Loga v mřížce |
| `s_quotes_carousel` | Karusel recenzí/citátů |
| `s_quotes_carousel_minimal` | Minimální citáty |

### Text (textové bloky)
| data-snippet | Popis |
|--------------|-------|
| `s_title` | Nadpis sekce |
| `s_text_block` | Textový odstavec |
| `s_faq_list` | FAQ jako seznam |
| `s_table_of_content` | Obsah stránky |
| `s_faq_horizontal` | FAQ horizontální |
| `s_product_catalog` | Ceník/katalog |

### Forms & Utilities
| data-snippet | Popis |
|--------------|-------|
| `s_newsletter_subscribe_form` | Newsletter formulář |
| `s_newsletter_centered` | Centrovaný newsletter |
| `s_website_form` | Kontaktní formulář |
| `s_hr` | Vodorovný oddělovač |
| `s_card` | Karta (dceřiný snippet) |

---

## SEKCE 5 – Barevný systém (Color Combinations)

Odoo používá 5 barevných kombinací (`o_cc1` až `o_cc5`). Každá kombinace definuje pozadí, text, nadpisy, tlačítka a linky.

### Použití
```xml
<section class="s_banner o_cc o_cc1 o_colored_level pt48 pb48" ...>
```

Vždy přidat **všechny tři třídy**: `o_cc`, `o_ccX`, `o_colored_level`

### Referenční barvy projektu TULIO
| Třída | Barva | Hex | Použití |
|-------|-------|-----|---------|
| `o_cc1` | Lime zelená | #A5BE00 | Primární sekce, CTA |
| `o_cc2` | Béžová/Linen | #F3E9DC | Sekundární sekce |
| `o_cc3` | (3. barva) | – | Doplňkové sekce |
| `o_cc4` | Bílá | #FFFFFF | Světlé sekce |
| `o_cc5` | Tmavá/White bg | #FFFFFF bg + tmavý text | Čitelné sekce |

### CSS proměnné pro inline barvy
```xml
style="color: var(--o-color-1);"   <!-- primární -->
style="color: var(--o-color-2);"   <!-- sekundární -->
style="background-color: var(--o-color-3);"
```

### Bez barevné třídy
Pokud sekce nemá vlastní barvu (dědí od rodiče):
```xml
<div class="o_colored_level col-lg-6">
```
Přidat `o_colored_level` i bez `o_cc` – zajistí správné dědění barev.

---

## SEKCE 6 – Spacing (odsazení)

Odoo má vlastní spacing utility **místo Bootstrap `py-X`/`pt-X`**:

| Třída | px | Třída | px |
|-------|----|-------|----|
| `pt0` | 0 | `pb0` | 0 |
| `pt8` | 8 | `pb8` | 8 |
| `pt16` | 16 | `pb16` | 16 |
| `pt24` | 24 | `pb24` | 24 |
| `pt32` | 32 | `pb32` | 32 |
| `pt40` | 40 | `pb40` | 40 |
| `pt48` | 48 | `pb48` | 48 |
| `pt56` | 56 | `pb56` | 56 |
| `pt64` | 64 | `pb64` | 64 |
| `pt80` | 80 | `pb80` | 80 |

**Konverze z CSS:** `padding-top: 48px` → třída `pt48`

Bootstrap margin třídy (`mt-X`, `mb-X`) lze použít normálně.

---

## SEKCE 7 – Layout (Bootstrap Grid)

### Standardní grid
```xml
<div class="container">
    <div class="row align-items-center">
        <div class="col-lg-6 pt16 pb16 o_colored_level">
            <!-- levý obsah -->
        </div>
        <div class="col-lg-6 pt16 pb16 o_colored_level">
            <!-- pravý obsah -->
        </div>
    </div>
</div>
```

### Container varianty
- `container` – standardní (maximální šířka)
- `container-fluid` – full-width

### Sloupce
- `col-lg-X` kde X = 1–12 (součet = 12)
- `offset-lg-X` – odsazení zleva
- `col-10 offset-1` pro mobilní verzi (s `offset-lg-0`)

### Odoo Grid Mode (pro přesné pozicování elementů)
```xml
<div class="row o_grid_mode" data-row-count="10">
    <div class="o_grid_item g-col-lg-6 g-height-8 col-lg-6 order-lg-0"
         style="grid-area: 1 / 1 / 9 / 7; z-index: 1;">
        <!-- obsah -->
    </div>
    <div class="o_grid_item g-col-lg-6 g-height-8 col-lg-6 order-lg-0"
         style="grid-area: 1 / 7 / 9 / 13; z-index: 2;">
        <!-- obsah -->
    </div>
</div>
```

**grid-area:** `řádek-start / sloupec-start / řádek-end / sloupec-end`
- Sloupce: 1–12 (celkem 12 sloupců)
- Řádky: 1 až `data-row-count + 1`

---

## SEKCE 8 – Obrázky

### Základní obrázek
```xml
<img src="/web/image/ID-hash/nazev.webp"
     alt="Popis obrázku"
     class="img img-fluid o_we_custom_image"
     loading="lazy"/>
```

### Obrázek v kartě (s poměrem stran)
```xml
<figure class="o_card_img_wrapper mb-0 ratio ratio-16x9">
    <img src="/web/image/ID/nazev.webp"
         alt="Popis"
         class="o_card_img img img-fluid card-img-top o_we_custom_image"
         loading="lazy"/>
</figure>
```

### Poměry stran
- `ratio ratio-16x9` – widescreen
- `ratio ratio-1x1` – čtvercové (pro portréty lidí)
- `ratio ratio-4x3` – klasické

### Zaoblení
- `rounded` – standardní zaoblení
- `rounded-circle` – kruh (pro portréty)

### Obrázek z externího URL
```xml
<img src="https://example.com/image.jpg"
     alt="Popis"
     class="img img-fluid o_we_custom_image"
     loading="lazy"/>
```
Externí URL jsou povolena v Odoo editoru.

---

## SEKCE 9 – Tlačítka

```xml
<!-- Primární -->
<a class="btn btn-primary" href="/url">Text tlačítka</a>

<!-- Sekundární -->
<a class="btn btn-secondary" href="/url">Sekundární</a>

<!-- S velikostí -->
<a class="btn btn-primary btn-lg" href="/url">Velké tlačítko</a>
<a class="btn btn-primary btn-sm" href="/url">Malé tlačítko</a>
```

**Nikdy nepoužívat `<button>` pro navigační tlačítka** – jen `<a>`.
Pro formulářové odesílání: `<a role="button" href="#" class="btn btn-primary o_submit">`.

---

## SEKCE 10 – Font Awesome ikony

```xml
<!-- Span varianta -->
<span class="fa fa-check fa-3x" role="presentation"/>

<!-- I varianta (centrovaná) -->
<i class="fa fa-heart fa-5x d-block mx-auto" role="presentation"/>

<!-- S barvou -->
<i class="fa fa-star fa-3x" style="color: var(--o-color-1);" role="presentation"/>
```

### Velikosti: `fa-1x` `fa-2x` `fa-3x` `fa-4x` `fa-5x`

### Časté ikony
```
fa-check, fa-times, fa-star, fa-heart, fa-home, fa-user, fa-phone, fa-envelope
fa-arrow-right, fa-chevron-right, fa-plus, fa-minus
fa-facebook, fa-twitter, fa-instagram, fa-linkedin
fa-clock-o, fa-calendar, fa-map-marker, fa-search
fa-external-link, fa-flash, fa-edit, fa-heartbeat
fa-check-circle-o, fa-info-circle, fa-warning
```

---

## SEKCE 11 – Oddělovač (HR)

```xml
<div class="s_hr pt32 pb32 o_colored_level"
     data-snippet="s_hr"
     data-name="Oddělovač">
    <hr class="w-100 mx-auto"/>
</div>
```

S barevnou linkou:
```xml
<hr class="w-100 mx-auto" style="border-top-color: var(--o-color-1); border-top-width: 4px !important;"/>
```

---

## SEKCE 12 – Karta (s_card)

Karty se vkládají jako dceřiné prvky do `s_three_columns`, `s_cards_grid` apod.

### Karta bez obrázku
```xml
<div class="col-lg-4 pt16 pb16">
    <div class="s_card card h-100 o_cc o_cc5 my-0 o_colored_level shadow rounded"
         data-snippet="s_card"
         data-name="Card">
        <div class="card-body">
            <h3 class="card-title h5-fs">Název</h3>
            <p class="card-text">Popis obsahu karty.</p>
        </div>
    </div>
</div>
```

### Karta s obrázkem nahoře
```xml
<div class="col-lg-4 pt16 pb16">
    <div class="s_card card h-100 o_cc o_cc1 my-0 o_colored_level o_card_img_top shadow rounded"
         data-snippet="s_card"
         data-name="Card"
         style="--box-border-bottom-left-radius: 25px; --box-border-bottom-right-radius: 25px;
                --box-border-top-right-radius: 25px; --box-border-top-left-radius: 25px;">
        <figure class="o_card_img_wrapper mb-0 ratio ratio-16x9">
            <img src="/web/image/123/photo.webp"
                 alt="Popis"
                 class="o_card_img img img-fluid card-img-top o_we_custom_image"
                 loading="lazy"/>
        </figure>
        <div class="card-body">
            <h2 class="card-title h5-fs">Název karty</h2>
            <p class="card-text">Popis.</p>
        </div>
    </div>
</div>
```

---

## SEKCE 13 – Newsletter formulář

### Inline (uvnitř jiné sekce)
```xml
<div data-vxml="001"
     data-list-id="1"
     data-name="Newsletter"
     data-snippet="s_newsletter_subscribe_form"
     class="s_newsletter_subscribe_form s_newsletter_list js_subscribe">
    <div class="js_subscribed_wrap d-none">
        <p class="h4-fs text-center text-success">
            <i role="img" class="fa fa-check-circle-o"/> Děkujeme za registraci!
        </p>
    </div>
    <div class="js_subscribe_wrap">
        <div class="input-group">
            <input type="email" name="email"
                   placeholder="Emailová adresa"
                   class="s_newsletter_subscribe_form_input js_subscribe_value form-control"/>
            <a role="button" href="#"
               class="js_subscribe_btn o_submit btn btn-primary">
                Odebírat
            </a>
        </div>
    </div>
</div>
```

### Centrovaný newsletter jako vlastní sekce
```xml
<section class="s_newsletter_centered s_newsletter_list o_colored_level pt32 pb32"
         data-name="Newsletter Centered"
         data-snippet="s_newsletter_centered"
         data-list-id="1">
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-8 offset-lg-2">
                <div class="s_card card o_cc o_cc1 my-0 o_colored_level shadow rounded"
                     data-snippet="s_card" data-name="Card">
                    <div class="card-body p-md-5">
                        <h3 class="card-title" style="text-align: center;">Nadpis</h3>
                        <p style="text-align: center;">Popis newsletteru.</p>
                        <!-- vložit inline newsletter formulář zde -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

## SEKCE 14 – Typografické helper třídy

Tyto třídy mění **jen velikost písma** (font-size), ne sémantiku HTML tagu:

| Třída | Odpovídá |
|-------|----------|
| `h1-fs` | font-size h1 (2.9375rem) |
| `h2-fs` | font-size h2 (2rem) |
| `h3-fs` | font-size h3 (1.375rem) |
| `h4-fs` | font-size h4 |
| `h5-fs` | font-size h5 |
| `h6-fs` | font-size h6 |
| `display-1-fs` | display-1 size |
| `display-2-fs` | display-2 size |
| `display-3-fs` | display-3 size |
| `display-4-fs` | display-4 size |
| `o_small-fs` | malý text |

**Příklady použití:**
```xml
<!-- Velký text uvnitř odstavce -->
<p><span class="h2-fs">Velký text</span> normální text</p>

<!-- Nadpis s jiným vizuálním stylem -->
<h2 class="h3-fs">Vizuálně jako h3, sémanticky h2</h2>

<!-- Span pro inline velikost -->
<span class="h1-fs">Velký nadpis jako span</span>
```

---

## SEKCE 15 – Viditelnost (Responsive)

### Jen desktop (skrýt na mobilu)
```xml
<section class="... d-none d-lg-block o_snippet_mobile_invisible" data-invisible="1">
```

### Jen mobil (skrýt na desktopu)
```xml
<section class="... d-lg-none o_snippet_desktop_invisible" data-invisible="1">
```

### Vždy zobrazit
Žádné speciální třídy – standardní Bootstrap responsive třídy.

**`data-invisible="1"` přidat vždy, když je sekce podmíněně skrytá** (informuje editor).

---

## SEKCE 16 – Specifické snippet vzory

### s_text_image (text vlevo, obrázek vpravo)
```xml
<section class="s_text_image pt80 pb48 o_colored_level"
         data-snippet="s_text_image" data-name="Text - Obrázek">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-5 pt16 pb16 o_colored_level">
                <h2>Nadpis sekce</h2>
                <p>Popis obsahu.</p>
                <a class="btn btn-primary" href="/url">CTA tlačítko</a>
            </div>
            <div class="col-lg-6 offset-lg-1 pt16 pb16 o_colored_level">
                <img src="..." alt="..." class="img img-fluid o_we_custom_image rounded" loading="lazy"/>
            </div>
        </div>
    </div>
</section>
```

### s_key_benefits (výhody s ikonami)
```xml
<section class="s_key_benefits o_colored_level pt48 pb48"
         data-snippet="s_key_benefits" data-name="Klíčové výhody">
    <div class="container">
        <h2 style="text-align: center;">Nadpis sekce</h2>
        <div class="row">
            <div class="col-lg-4 pt32 pb16 o_colored_level o_cc o_cc5">
                <span class="fa fa-check fa-4x mx-auto d-block" style="color: var(--o-color-1);"/>
                <h3 class="h4-fs" style="text-align: center;">Výhoda 1</h3>
                <p style="text-align: center;">Popis výhody.</p>
            </div>
            <!-- další výhody -->
        </div>
    </div>
</section>
```

### s_color_blocks_2 (velké barevné bloky vedle sebe)
```xml
<section class="s_color_blocks_2 o_colored_level"
         data-snippet="s_color_blocks_2" data-name="Velké boxy">
    <div class="container-fluid">
        <div class="row">
            <div class="o_cc col-lg-5 offset-lg-1 pt40 pb48 o_colored_level o_cc1">
                <h2>Levý blok</h2>
                <p>Obsah levého bloku.</p>
                <a class="btn btn-primary" href="/url">CTA</a>
            </div>
            <div class="o_cc o_colored_level pt32 pb40 col-lg-5 o_cc2">
                <h2>Pravý blok</h2>
                <p>Obsah pravého bloku.</p>
                <a class="btn btn-primary" href="/url">CTA</a>
            </div>
        </div>
    </div>
</section>
```

### s_motto (motto/quote sekce)
```xml
<section class="s_motto o_cc o_cc1 o_colored_level pt24 pb24"
         data-snippet="s_motto" data-name="Motto">
    <div class="container">
        <div class="row">
            <div class="o_colored_level col-lg-12">
                <h2 class="display-4" style="text-align: center;">
                    <strong>Motto nebo citát</strong>
                </h2>
            </div>
        </div>
    </div>
</section>
```

### s_company_team_grid (tým v mřížce)
```xml
<section class="s_company_team_grid o_colored_level o_cc pt32 pb32 o_cc1"
         data-snippet="s_company_team_grid" data-name="Tým">
    <div class="container">
        <h2 style="text-align: center;">Náš tým</h2>
        <div class="row">
            <div data-name="Team Member" class="col-lg-4 pt16 pb16">
                <div class="s_card card o_cc o_cc2 o_colored_level"
                     data-snippet="s_card" data-name="Card">
                    <figure class="o_card_img_wrapper ratio ratio-1x1 mb-0">
                        <img src="..." alt="Jméno" class="o_card_img card-img-top rounded img img-fluid o_we_custom_image"/>
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title h5-fs" style="text-align: center;">Jméno Příjmení</h3>
                        <p class="card-text" style="text-align: center;"><em>Pozice</em></p>
                        <p class="card-text">Popis.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

## SEKCE 17 – Krok-za-krokem konverzní postup

### Krok 1: Analyzuj HTML stránku
- Identifikuj všechny vizuální sekce (hero, výhody, galerie, tým, CTA, footer)
- Poznač obsah každé sekce (nadpisy, texty, obrázky, tlačítka)

### Krok 2: Mapuj na Odoo snippety
Pro každou sekci vyber nejbližší `data-snippet` z katalogu výše.

| HTML vzor | Odoo snippet |
|-----------|-------------|
| Hero s textem + CTA | `s_banner` nebo `s_cover` |
| Text vlevo, obrázek vpravo | `s_text_image` |
| 3 sloupce s ikonami | `s_key_benefits` nebo `s_three_columns` |
| Karty s obrázky | `s_three_columns` + `s_card` |
| Tým | `s_company_team_grid` |
| Recenze/citáty | `s_quotes_carousel` |
| FAQ | `s_faq_collapse` nebo `s_accordion` |
| Newsletter | `s_newsletter_centered` |
| Oddělovač | `s_hr` |
| Velký nadpis/quote | `s_motto` |
| Embed video | `s_embed_code` |

### Krok 3: Wrap do layout
```xml
<t name="Název" t-name="website.nazev">
    <t t-call="website.layout">
        <div id="wrap" class="oe_structure oe_empty">
            <!-- sekce -->
        </div>
    </t>
</t>
```

### Krok 4: Každá sekce
```xml
<section class="[snippet-class] [cc-class] o_colored_level [spacing]"
         data-snippet="[snippet-id]"
         data-name="[Název]">
    <div class="container">
        <div class="row">
            <!-- obsah -->
        </div>
    </div>
</section>
```

### Krok 5: XML validace
- `<br/>` ne `<br>`
- `<img src="..."/>` ne `<img src="...">`
- `<input type="email"/>` ne `<input type="email">`
- `<hr/>` ne `<hr>`
- `&amp;` místo `&` v textu
- `&quot;` nebo `'` místo `"` uvnitř atributů

### Krok 6: Barevné třídy
- Přidat `o_cc o_ccX o_colored_level` na každou sekci s vlastní barvou
- Na child elementy se změnou barvy: `o_colored_level`
- Bez barvy (dědí): jen `o_colored_level`

### Krok 7: Spacing
- Nahradit CSS `padding-top: Xpx` → `ptX`
- Nahradit CSS `padding-bottom: Xpx` → `pbX`
- Zaokrouhlit na nejbližší: 0, 8, 16, 24, 32, 40, 48, 56, 64, 80

### Krok 8: Obrázky a média
- Zachovat původní URL (externí i interní)
- Přidat třídu `o_we_custom_image` + `img img-fluid`
- Přidat `loading="lazy"`
- Přidat `alt` atribut

---

## SEKCE 18 – Tabulka chyb a řešení

| Symptom | Příčina | Řešení |
|---------|---------|--------|
| "Invalid XML" v editoru | Neuzavřené HTML tagy | Použít `<br/>`, `<img/>`, `<hr/>`, `<input/>` |
| Snippet není v panelu editoru | Chybí `data-snippet` nebo `data-name` | Přidat oba atributy na kořen sekce |
| Barvy se nezobrazují správně | Chybí `o_colored_level` | Přidat na každý barevný element |
| Stránka nemá header/footer | Chybí `t-call="website.layout"` | Obalit do layout wrapperu |
| Sekce nejde editovat v builder | Chybí `oe_structure` na `#wrap` | Přidat třídu na wrapper div |
| `&` způsobí chybu parsování | Nezaescapovaný znak | Nahradit `&amp;` |
| Tlačítko vypadá jako link | Inline CSS styl | Použít `btn btn-primary` třídy |
| Video se nezobrazí | `<script>` tag odstraněn | Použít `s_embed_code` snippet |
| Fonty se nenačtou | Vlastní @font-face v HTML | Fonty spravuje Odoo téma, neimportovat |
| CSS animace nefungují | Vlastní CSS třídy chybí | Použít Odoo třídy nebo inline style |
| Obrázek je deformovaný | Chybí `ratio` wrapper | Použít `<figure class="ratio ratio-16x9">` |

---

## SEKCE 19 – Kompletní příklad konverze

### Vstup (AI-generovaná HTML stránka):
```html
<!DOCTYPE html>
<html>
<body>
  <section style="background: #A5BE00; padding: 80px 0;">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <h1>Modulární domy pro moderní život</h1>
          <p>Rychlá výstavba, pasivní standard, férová cena.</p>
          <a href="/kontakt" class="btn btn-primary">Zjistit více</a>
        </div>
        <div class="col-6">
          <img src="https://example.com/hero.jpg" alt="Hero">
        </div>
      </div>
    </div>
  </section>

  <hr>

  <section style="padding: 48px 0;">
    <div class="container">
      <h2 style="text-align: center">Proč my?</h2>
      <div class="row">
        <div class="col-4">
          <i class="fa fa-clock-o fa-3x"></i>
          <h3>Rychlost</h3>
          <p>Dům za 2 měsíce.</p>
        </div>
        <div class="col-4">
          <i class="fa fa-check fa-3x"></i>
          <h3>Kvalita</h3>
          <p>Pasivní standard.</p>
        </div>
        <div class="col-4">
          <i class="fa fa-euro fa-3x"></i>
          <h3>Cena</h3>
          <p>Od 1,2 mil. Kč.</p>
        </div>
      </div>
    </div>
  </section>
</body>
</html>
```

### Výstup (Odoo 19 QWeb):
```xml
<t name="Modulární domy" t-name="website.modularni-domy">
    <t t-call="website.layout">
        <div id="wrap" class="oe_structure oe_empty">

            <section class="s_banner o_cc o_cc1 o_colored_level pt80 pb80"
                     data-snippet="s_banner" data-name="Hero sekce">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-6 pt16 pb16 o_colored_level">
                            <h1>Modulární domy pro moderní život</h1>
                            <p>Rychlá výstavba, pasivní standard, férová cena.</p>
                            <a href="/kontakt" class="btn btn-primary">Zjistit více</a>
                        </div>
                        <div class="col-lg-6 pt16 pb16 o_colored_level">
                            <img src="https://example.com/hero.jpg"
                                 alt="Hero"
                                 class="img img-fluid o_we_custom_image rounded"
                                 loading="lazy"/>
                        </div>
                    </div>
                </div>
            </section>

            <div class="s_hr pt32 pb32 o_colored_level"
                 data-snippet="s_hr" data-name="Oddělovač">
                <hr class="w-100 mx-auto"/>
            </div>

            <section class="s_key_benefits o_colored_level pt48 pb48"
                     data-snippet="s_key_benefits" data-name="Proč my?">
                <div class="container">
                    <h2 style="text-align: center;">Proč my?</h2>
                    <div class="row">
                        <div class="col-lg-4 pt32 pb16 o_colored_level o_cc o_cc5">
                            <i class="fa fa-clock-o fa-3x mx-auto d-block"
                               style="color: var(--o-color-1);" role="presentation"/>
                            <h3 class="h4-fs" style="text-align: center;">Rychlost</h3>
                            <p style="text-align: center;">Dům za 2 měsíce.</p>
                        </div>
                        <div class="col-lg-4 pt32 pb16 o_colored_level o_cc o_cc5">
                            <i class="fa fa-check fa-3x mx-auto d-block"
                               style="color: var(--o-color-1);" role="presentation"/>
                            <h3 class="h4-fs" style="text-align: center;">Kvalita</h3>
                            <p style="text-align: center;">Pasivní standard.</p>
                        </div>
                        <div class="col-lg-4 pt32 pb16 o_colored_level o_cc o_cc5">
                            <i class="fa fa-euro fa-3x mx-auto d-block"
                               style="color: var(--o-color-1);" role="presentation"/>
                            <h3 class="h4-fs" style="text-align: center;">Cena</h3>
                            <p style="text-align: center;">Od 1,2 mil. Kč.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </t>
</t>
```

---

## SEKCE 20 – Referenční soubory projektu

- **Hotová stránka:** `Příklady z Odoo/priklad_xml_html.xml` – kompletní příklad Odoo 19 stránky
- **Snippet katalog:** `Příklady z Odoo/snippets.xml` – všechny snippety a jejich konfigurace
- **Barvy tématu:** `Příklady z Odoo/priklad_user_values.scss` – SCSS proměnné
- **Paleta barev:** `Příklady z Odoo/priklad_user_color_palette.scss` – o-color-X hodnoty

---

*Verze: Odoo 19 | Aktualizováno na základě skutečné implementace TULIO projektu*
