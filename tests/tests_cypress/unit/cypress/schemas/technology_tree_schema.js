const technology = {
  title: 'technologyTree',
  type: 'object',
  description: 'Todo item sent by the technology_tree',
  required: ['id', 'img', 'name', 'descr', 'attrs', 'attrs_type', 'year', 'season', 'prereqs', 'priceResearch','upkeep','switchable', 'type'],
  properties: {
    id: {
      type: 'string',
      description: 'Todo text, like "id Artifact"'
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
    descr: {
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
    attrs: {
      type: 'object',
      description: 'Todo item sent by the attrs',
      required: ['hire cost', 'upkeep cost'],
      properties: {
        "hire cost": {
          type: 'number',
          description: 'Todo number, like "hire cost"',
        },
        "upkeep cost": {
          type: 'number',
          description: 'Todo number, like "upkeep cost"',
        }
      }
    },
    attrs_type: {
      type: 'object',
      description: 'Todo item sent by the attrs',
      required: ['hire_cost', 'upkeep_cost'],
      properties: {
        "hire_cost": {
          type: 'string',
          description: 'Todo string, like type "hire cost"',
        },
        "upkeep_cost": {
          type: 'string',
          description: 'Todo string, like type "upkeep cost"',
        }
      }
    },
    year: {
      type: 'number',
      description: 'Todo number, like "year"',
      minimum: 1255
    },
    season: {
      type: 'number',
      description: 'Todo number, like "season"',
      minimum: 1,
      maximum: 4
    },
    prereqs: {
        type: 'array',
        uniqueItems: true,
        description: 'Todo array [string], like "prereqs"',
        items: {
          type: 'string'
        }
      },
    priceResearch: {
        type: 'number',
        description: 'Todo number, like "priceResearch"',
        minimum: 1
      },
    upkeep: {
        type: 'number',
        description: 'Todo number, like "upkeep"',
        minimum: 1
      },
    switchable: {
        type: 'boolean',
        description: 'Todo number, like "switchable"'
      },
    type: {
      type: 'string',
      description: 'Todo text, like "type technolgy"'
    }
  }
}
export const technologySchema = technology;