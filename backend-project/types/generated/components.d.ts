import type { Schema, Struct } from '@strapi/strapi';

export interface BodyCategoryBodyText extends Struct.ComponentSchema {
  collectionName: 'components_body_category_body_texts';
  info: {
    description: '';
    displayName: 'BodyText';
    icon: 'code';
  };
  attributes: {
    BodyText: Schema.Attribute.JSON;
    BText: Schema.Attribute.Blocks;
    Display: Schema.Attribute.Boolean;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'body-category.body-text': BodyCategoryBodyText;
    }
  }
}
