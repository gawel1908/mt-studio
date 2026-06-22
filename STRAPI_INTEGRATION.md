# Integracja ze Strapi

## 1. Instalacja Strapi

```bash
npx create-strapi-app@latest cms --quickstart
cd cms && npm run develop
```

## 2. Kolekcje do stworzenia w Strapi

### Project
| Pole | Typ | Uwagi |
|------|-----|-------|
| title | Short Text | |
| slug | UID | z pola title |
| category | Enumeration | Mieszkaniowe, Komercyjne, Wnętrza, Użyteczność publiczna |
| year | Integer | |
| location | Short Text | |
| coverImage | Media (single) | |
| images | Media (multiple) | |
| description | Long Text | |
| area | Short Text | opcjonalne |
| featured | Boolean | |

### Studio (Single Type)
| Pole | Typ |
|------|-----|
| headline | Short Text |
| subheadline | Short Text |
| about | Long Text |
| email | Email |
| phone | Short Text |
| address | Short Text |

## 3. Zmienne środowiskowe

Utwórz plik `.env.local` w folderze Next.js:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

## 4. Zamiana mock danych na Strapi API

W pliku `lib/mockData.ts` zamień funkcje na fetch:

```typescript
export async function getAllProjects(): Promise<Project[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?populate=*&sort=year:desc`,
    { next: { revalidate: 60 } } // ISR co 60 sekund
  )
  const data = await res.json()
  return data.data.map((item: any) => ({
    id: item.id,
    slug: item.attributes.slug,
    title: item.attributes.title,
    category: item.attributes.category,
    year: item.attributes.year,
    location: item.attributes.location,
    coverImage: `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.coverImage.data.attributes.url}`,
    images: item.attributes.images.data.map(
      (img: any) => `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.attributes.url}`
    ),
    description: item.attributes.description,
    area: item.attributes.area,
    featured: item.attributes.featured,
  }))
}
```

## 5. Strapi permissions

W Strapi Admin → Settings → Roles → Public:
- Zaznacz `find` i `findOne` dla kolekcji Project
- Zaznacz `find` dla Studio
