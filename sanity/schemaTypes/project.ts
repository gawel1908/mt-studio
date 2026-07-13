import { defineType, defineField } from 'sanity'

export const projectSchema = defineType({
  name: 'project',
  title: 'Projekt',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title_pl' }, validation: r => r.required() }),
    defineField({ name: 'title_pl', title: 'Tytuł (PL)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'title_en', title: 'Tytuł (EN)', type: 'string' }),
    defineField({ name: 'year', title: 'Rok', type: 'number' }),
    defineField({ name: 'location', title: 'Lokalizacja', type: 'string' }),
    defineField({ name: 'area', title: 'Długość / Rozpiętość', type: 'string' }),
    defineField({ name: 'featured', title: 'Wyróżniony', type: 'boolean', initialValue: false }),
    defineField({ name: 'coverImage', title: 'Zdjęcie główne', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'images', title: 'Galeria', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'description_pl', title: 'Opis (PL)', type: 'text', rows: 4 }),
    defineField({ name: 'description_en', title: 'Opis (EN)', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { title: 'title_pl', media: 'coverImage', subtitle: 'location' },
  },
})
