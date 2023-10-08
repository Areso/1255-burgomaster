const artid = {
  title: 'artid',
  type: 'object',
  description: 'Todo item sent by the artifacts',
  required: ['id', 'img', 'name', 'desc', 'attr', 'change', 'slots', 'priceBuy', 'chance', 'type'],
  properties: {
    id: {
      type: 'string',
      description: 'Todo text, like "id Artifact"',
      pattern: '^artid[0-9]{2}$'
    },
    img: {
      type: 'string',
      description: 'Todo text, like "name img"',
      pattern: '.\\.png$'
    },
    name: {
      type: 'object',
      description: 'Todo item sent by the artifacts.name',
      required: ['default', 'en-US', 'ru-RU'],
      properties: {
        "default": {
          type: 'string',
          description: 'Todo text, like "name default language"',
        },
        "en-US": {
          type: 'string',
          description: 'Todo text, like "name en-US language"',
        },
        "ru-RU": {
          type: 'string',
          description: 'Todo text, like "name ru-RU language"',
        },
      },
    },
    desc: {
      type: 'object',
      description: 'Todo item sent by the artifacts.name',
      required: ['default', 'en-US', 'ru-RU'],
      properties: {
        "default": {
          type: 'string',
          description: 'Todo text, like "description default language"',
        },
        "en-US": {
          type: 'string',
          description: 'Todo text, like "description en-US language"',
        },
        "ru-RU": {
          type: 'string',
          description: 'Todo text, like "description ru-RU language"',
        },
      },
    },
    attr: {
      type: 'array',
      uniqueItems: true,
      description: 'Todo array [object or string], like "attr"',
      // items: {
      //   type: 'object'
      // }
    },
    change: {
      type: 'array',
      description: 'Todo array [number], like "change"',
      items: {
        type: 'number'
      }
    },
    slots: {
      type: 'array',
      uniqueItems: true,
      description: 'Todo array [string], like "slots"',
      items: {
        type: 'string'
      }
    },
    priceBuy: {
      type: 'number',
      description: 'Todo number, like "Cost price"',
      minimum: 1
    },
    chance: {
      type: 'number',
      description: 'Todo number, like "Chance"',
    },
    type: {
      type: 'string',
      description: 'Todo text, like "type Artifact"',
    },
    artefactsWorn: {
      type: 'number',
      description: 'Todo number, like "artefactsWorn"',
      minimum: 1
    },
    comment: {
      type: 'string',
      description: 'Todo text, like "type comment"',
    }
  }
}
export const artSchema = artid;