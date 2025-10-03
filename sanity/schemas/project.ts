import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'A number to manually sort projects. Lower numbers appear first.',
      validation: Rule => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (README.md content)',
      type: 'text',
      description: "The full content of the project's README.md file.",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      description: 'A brief, one-sentence summary of the project for the card view.',
      validation: Rule => Rule.required().max(150),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Technologies or concepts used in the project.',
    }),
    defineField({
      name: 'githubLink',
      title: 'GitHub Link',
      type: 'url',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'demoLink',
      title: 'Demo Link',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      order: 'order',
    },
    prepare(selection) {
      const {title, media, order} = selection
      return {
        title: title,
        subtitle: `Order: ${order}`,
        media: media,
      }
    },
  },
})
