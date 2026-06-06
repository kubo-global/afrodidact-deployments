import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'school',
  title: 'School',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Short name',
      description: 'Shown on the map nav pills and menu (e.g. "The Swallow").',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'Full name',
      description: 'Full official name, shown as the sidebar heading.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      description: 'Used to group schools by country.',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      description: 'Pin location on the map.',
      type: 'geopoint',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'zoom',
      title: 'Zoom (desktop)',
      type: 'number',
      initialValue: 18,
      validation: (rule) => rule.required().min(0).max(22),
    }),
    defineField({
      name: 'zoomMobile',
      title: 'Zoom (mobile)',
      type: 'number',
      initialValue: 17,
      validation: (rule) => rule.required().min(0).max(22),
    }),
    defineField({
      name: 'numberOfStudents',
      title: 'Number of pupils',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'numberOfClients',
      title: 'KUBO X installed',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'numberOfStaff',
      title: 'Staff using the lab',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'images',
      title: 'Photos',
      description: 'Class / installation photos. The first is shown first.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      description: 'Lower numbers appear first in the nav.',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Sort order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'fullName', media: 'image' },
  },
})
